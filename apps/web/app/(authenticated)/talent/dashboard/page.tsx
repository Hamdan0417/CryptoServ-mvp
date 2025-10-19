import Link from 'next/link';
import { Button, Section } from '@crypto-serv/ui';
import { PersonaGate } from '../../../../components/persona-gate';

export default function TalentDashboardPage() {
  return (
    <PersonaGate requiredPersona="TALENT">
      <main className="flex min-h-screen flex-col bg-white text-secondary">
        <Section
          title="Talent mission control"
          description="Track your profile strength, discover curated roles, and monitor application velocity across SERV-aligned employers."
        >
          <div className="grid gap-4 md:grid-cols-3">
            <Button asChild variant="outline" className="justify-between">
              <Link href="/talent/profile">Update profile</Link>
            </Button>
            <Button asChild variant="outline" className="justify-between">
              <Link href="/talent/jobs">Browse jobs</Link>
            </Button>
            <Button asChild variant="outline" className="justify-between">
              <Link href="/talent/applications">Application tracker</Link>
            </Button>
          </div>
        </Section>
      </main>
    </PersonaGate>
  );
}
