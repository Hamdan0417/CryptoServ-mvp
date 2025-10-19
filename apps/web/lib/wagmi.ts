'use client';

import { createConfig, http } from 'wagmi';
import { sepolia } from 'wagmi/chains';
import { injected, mock } from 'wagmi/connectors';
import { privateKeyToAccount } from 'viem/accounts';

const transports = {
  [sepolia.id]: http(process.env.NEXT_PUBLIC_SEPOLIA_RPC_URL ?? 'https://rpc.sepolia.org')
};

const connectors = [injected({ shimDisconnect: true })];

if (process.env.NEXT_PUBLIC_ENABLE_MOCK_WALLET === 'true') {
  connectors.push(
    mock({
      accounts: [
        privateKeyToAccount('0x59c6995e998f97a5a0044966f0945389dc9e86dae88c7a8412f4603b6b78690d')
      ]
    })
  );
}

export const wagmiConfig = createConfig({
  chains: [sepolia],
  transports,
  connectors,
  ssr: true
});
