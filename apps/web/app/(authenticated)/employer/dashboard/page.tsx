import { Section } from '@crypto-serv/ui';
import { PersonaGate } from '../../../../components/persona-gate';

export default function EmployerDashboardPage() {
  return (
    <PersonaGate requiredPersona="EMPLOYER">
      <main className="flex min-h-screen flex-col bg-white text-secondary">
        <Section
          title="Employer command center"
          description="Manage job pipelines, approve service engagements, and monitor escrow-backed milestones."
        >
          <div className="rounded-3xl border border-secondary/10 bg-secondary/5 p-6 text-sm text-secondary/70">
            Employer analytics, approvals, and SLA governance will surface here in subsequent sprints.
          </div>
        </Section>
      </main>
    </PersonaGate>
  );
}
