'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from '../hooks/useSession';

export function AuthGuard({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { data: session, isLoading } = useSession();

  useEffect(() => {
    if (!isLoading && session === null) {
      router.replace('/connect');
    }
  }, [isLoading, router, session]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white text-secondary">
        <p>Loading session...</p>
      </div>
    );
  }

  if (!session) {
    return null;
  }

  return <>{children}</>;
}
