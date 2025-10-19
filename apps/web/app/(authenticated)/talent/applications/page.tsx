'use client';

import { useQuery } from '@tanstack/react-query';
import { Section } from '@crypto-serv/ui';
import { PersonaGate } from '../../../../components/persona-gate';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:3333';

type Application = {
  id: string;
  jobTitle: string;
  status: string;
  submittedAt: string;
};

async function fetchApplications(): Promise<Application[]> {
  const response = await fetch(`${API_URL}/talent/applications`, { credentials: 'include' });
  if (!response.ok) {
    throw new Error('Unable to load applications');
  }
  return response.json();
}

export default function TalentApplicationsPage() {
  const { data: applications } = useQuery({ queryKey: ['talent-applications'], queryFn: fetchApplications });

  return (
    <PersonaGate requiredPersona="TALENT">
      <main className="flex min-h-screen flex-col bg-white text-secondary">
        <Section
          title="Application tracker"
          description="Monitor submissions, employer responses, and SERV-based incentives across your pipeline."
        >
          <div className="space-y-4">
            {applications?.map((app) => (
              <div key={app.id} className="rounded-3xl border border-secondary/10 bg-secondary/5 p-6">
                <div className="flex flex-col gap-1">
                  <h3 className="text-lg font-semibold">{app.jobTitle}</h3>
                  <p className="text-sm text-secondary/70">Status: {app.status}</p>
                  <p className="text-xs text-secondary/60">Submitted {new Date(app.submittedAt).toLocaleString()}</p>
                </div>
              </div>
            ))}
            {applications?.length === 0 && (
              <div className="rounded-3xl border border-secondary/10 bg-secondary/5 p-6 text-sm text-secondary/70">
                Your first SERV-aligned application will appear here.
              </div>
            )}
          </div>
        </Section>
      </main>
    </PersonaGate>
  );
}
