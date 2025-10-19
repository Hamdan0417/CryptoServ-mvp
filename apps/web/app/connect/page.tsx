'use client';

import { useMutation } from '@tanstack/react-query';
import { useSearchParams, useRouter } from 'next/navigation';
import { useEffect, useMemo, useState } from 'react';
import { SiweMessage } from 'siwe';
import { Button, Section } from '@crypto-serv/ui';
import { useAccount, useConnect, useDisconnect, useSignMessage, useChainId } from 'wagmi';
import { mock } from 'wagmi/connectors';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

async function fetchNonce(address: string) {
  const response = await fetch(`${API_URL}/auth/nonce?address=${address}`, {
    credentials: 'include'
  });
  if (!response.ok) {
    throw new Error('Failed to fetch nonce');
  }
  const data = await response.json();
  return data.nonce as string;
}

async function verifySiwe(payload: { message: string; signature: string }) {
  const response = await fetch(`${API_URL}/auth/siwe`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify(payload)
  });
  if (!response.ok) {
    throw new Error('Failed to verify SIWE message');
  }
  return response.json();
}

async function mockSignIn(address: string) {
  const response = await fetch(`${API_URL}/auth/mock`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ address })
  });
  if (!response.ok) {
    throw new Error('Mock sign in not available');
  }
  return response.json();
}

export default function ConnectPage() {
  const { address, isConnected } = useAccount();
  const { connect, connectors, error: connectError, pendingConnector } = useConnect();
  const { disconnect } = useDisconnect();
  const { signMessageAsync } = useSignMessage();
  const chainId = useChainId();
  const router = useRouter();
  const params = useSearchParams();
  const [status, setStatus] = useState<string | null>(null);

  const mockEnabled = process.env.NEXT_PUBLIC_ENABLE_MOCK_WALLET === 'true';

  const siweMutation = useMutation({
    mutationFn: verifySiwe,
    onSuccess: () => {
      router.push('/onboarding/persona');
    },
    onError: (err: Error) => {
      setStatus(err.message);
    }
  });

  const mockMutation = useMutation({
    mutationFn: mockSignIn,
    onSuccess: () => {
      router.push('/onboarding/persona');
    },
    onError: (err: Error) => {
      setStatus(err.message);
    }
  });

  useEffect(() => {
    if (params?.get('mock') === '1' && mockEnabled) {
      const mockConnector = connectors.find((connector) => connector.id === mock.id);
      if (mockConnector && !isConnected && pendingConnector?.uid !== mockConnector.uid) {
        connect({ connector: mockConnector });
      }

      if (address && !mockMutation.isPending && mockMutation.status !== 'success') {
        mockMutation.mutate(address);
        return;
      }

      if (!address && !mockMutation.isPending && mockMutation.status !== 'success') {
        mockMutation.mutate('0x000000000000000000000000000000000000dEaD');
      }
    }
  }, [address, connect, connectors, isConnected, mockEnabled, mockMutation, params, pendingConnector]);

  const availableConnectors = useMemo(
    () => connectors.filter((connector) => connector.ready),
    [connectors]
  );

  const handleSiwe = async () => {
    if (!address) {
      setStatus('Wallet not connected');
      return;
    }
    try {
      setStatus('Requesting nonce...');
      const nonce = await fetchNonce(address);
      const message = new SiweMessage({
        domain: window.location.host,
        address,
        statement: 'Sign-In with Ethereum to access Crypto Serv.',
        uri: window.location.origin,
        version: '1',
        chainId,
        nonce
      });
      setStatus('Awaiting signature...');
      const signature = await signMessageAsync({ message: message.prepareMessage() });
      setStatus('Verifying session...');
      await siweMutation.mutateAsync({ message: message.prepareMessage(), signature });
    } catch (error) {
      const err = error as Error;
      setStatus(err.message);
    }
  };

  return (
    <main className="flex min-h-screen flex-col bg-white text-secondary">
      <Section
        align="center"
        title="Connect your wallet"
        description="Authenticate with Sign-In with Ethereum to unlock persona-driven dashboards, marketplace services, and investor deal rooms."
      >
        <div className="mx-auto flex max-w-2xl flex-col items-center gap-6">
          <div className="grid w-full gap-3 md:grid-cols-2">
            {availableConnectors.map((connector) => (
              <Button
                key={connector.uid}
                disabled={!connector.ready || pendingConnector?.uid === connector.uid}
                onClick={() => connect({ connector })}
                className="w-full justify-center"
              >
                {connector.name}
              </Button>
            ))}
          </div>
          {mockEnabled && (
            <Button
              variant="outline"
              onClick={() => {
                if (address) {
                  mockMutation.mutate(address);
                } else if (!mockMutation.isPending && mockMutation.status !== 'success') {
                  mockMutation.mutate('0x000000000000000000000000000000000000dEaD');
                }
              }}
            >
              Use mock wallet
            </Button>
          )}
          {isConnected ? (
            <div className="space-y-3 text-sm">
              <p>
                Connected as <span className="font-semibold">{address}</span>
              </p>
              <div className="flex items-center gap-3">
                <Button onClick={handleSiwe} disabled={siweMutation.isPending}>
                  Sign message
                </Button>
                <Button variant="ghost" onClick={() => disconnect()}>
                  Disconnect
                </Button>
              </div>
            </div>
          ) : (
            <p className="text-sm text-secondary/70">Select a wallet above to begin the SIWE flow.</p>
          )}
          {connectError && <p className="text-sm text-red-600">{connectError.message}</p>}
          {status && <p className="text-sm text-secondary/70">{status}</p>}
        </div>
      </Section>
    </main>
  );
}
