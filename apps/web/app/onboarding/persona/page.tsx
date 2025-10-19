'use client';

import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { useEffect } from 'react';
import { PersonaCard, Section } from '@crypto-serv/ui';
import { BriefcaseBusiness, LineChart, Users } from 'lucide-react';
import { Persona, useInvalidateSession, useSession } from '../../../hooks/useSession';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

async function updatePersona(persona: Exclude<Persona, null>) {
  const response = await fetch(`${API_URL}/auth/persona`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    credentials: 'include',
    body: JSON.stringify({ persona })
  });
  if (!response.ok) {
    throw new Error('Failed to update persona');
  }
  return response.json();
}

const personaCards = [
  {
    persona: 'TALENT' as const,
    title: 'Talent',
    description: 'Launch or grow your Web3 career with verified credentials and tracked outcomes.',
    highlights: ['Portfolio & attestations', 'Intelligent job matching', 'SERV-backed referrals'],
    icon: <Users className="h-10 w-10 text-accent" />
  },
  {
    persona: 'EMPLOYER' as const,
    title: 'Employers & Buyers',
    description: 'Source elite talent and book certified service providers with escrow and approvals.',
    highlights: ['Job posting pipelines', 'Escrow governance', 'Compliance-ready workflows'],
    icon: <BriefcaseBusiness className="h-10 w-10 text-accent" />
  },
  {
    persona: 'INVESTOR' as const,
    title: 'Investors',
    description: 'Unlock deal rooms, diligence dashboards, and governance participation based on SERV tiers.',
    highlights: ['Stake-based access', 'Deal intelligence', 'Governance voting stream'],
    icon: <LineChart className="h-10 w-10 text-accent" />
  }
];

export default function PersonaSelectionPage() {
  const router = useRouter();
  const invalidateSession = useInvalidateSession();
  const { data: session, isLoading } = useSession();

  const personaMutation = useMutation({
    mutationFn: updatePersona,
    onSuccess: (_, persona) => {
      invalidateSession();
      if (persona === 'TALENT') {
        router.push('/talent/dashboard');
      } else if (persona === 'EMPLOYER') {
        router.push('/employer/dashboard');
      } else {
        router.push('/investor/dashboard');
      }
    }
  });

  useEffect(() => {
    if (!isLoading && session === null) {
      router.replace('/connect');
    }
    if (session?.persona) {
      if (session.persona === 'TALENT') {
        router.replace('/talent/dashboard');
      } else if (session.persona === 'EMPLOYER') {
        router.replace('/employer/dashboard');
      } else if (session.persona === 'INVESTOR') {
        router.replace('/investor/dashboard');
      }
    }
  }, [isLoading, router, session]);

  return (
    <main className="flex min-h-screen flex-col bg-white text-secondary">
      <Section
        align="center"
        title="Choose your starting persona"
        description="We tailor modules, compliance checks, and dashboards to your operating role. You can unlock additional personas later via SERV staking."
      >
        <div className="grid gap-6 md:grid-cols-3">
          {personaCards.map((card) => (
            <PersonaCard
              key={card.persona}
              {...card}
              active={session?.persona === card.persona}
              onSelect={() => personaMutation.mutate(card.persona)}
            />
          ))}
        </div>
      </Section>
    </main>
  );
}
