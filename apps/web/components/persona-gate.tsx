'use client';

import { ReactNode, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Persona, useSession } from '../hooks/useSession';

export function PersonaGate({ requiredPersona, children }: { requiredPersona: Exclude<Persona, null>; children: ReactNode }) {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (!session) {
      router.replace('/connect');
      return;
    }
    if (!session.persona) {
      router.replace('/onboarding/persona');
      return;
    }
    if (session.persona !== requiredPersona) {
      router.replace('/dashboard');
    }
  }, [requiredPersona, router, session]);

  if (!session || session.persona !== requiredPersona) {
    return null;
  }

  return <>{children}</>;
}
