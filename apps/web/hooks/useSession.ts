'use client';

import { useQuery, useQueryClient } from '@tanstack/react-query';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

export type Persona = 'TALENT' | 'EMPLOYER' | 'INVESTOR' | null;

export type SessionResponse = {
  id: string;
  walletAddress: string;
  roles: string[];
  persona: Persona;
};

async function fetchSession(): Promise<SessionResponse | null> {
  const response = await fetch(`${API_URL}/auth/session`, {
    credentials: 'include'
  });
  if (response.status === 401) {
    return null;
  }
  if (!response.ok) {
    throw new Error('Failed to fetch session');
  }
  return response.json();
}

export function useSession() {
  return useQuery({
    queryKey: ['session'],
    queryFn: fetchSession,
    staleTime: 1000 * 60
  });
}

export function useInvalidateSession() {
  const client = useQueryClient();
  return () => client.invalidateQueries({ queryKey: ['session'] });
}
