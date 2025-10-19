import { Section } from '@crypto-serv/ui';
import { PersonaGate } from '../../../../components/persona-gate';

export default function InvestorDashboardPage() {
  return (
    <PersonaGate requiredPersona="INVESTOR">
      <main className="flex min-h-screen flex-col bg-white text-secondary">
        <Section
          title="Investor network overview"
          description="Stake SERV to unlock deal rooms, diligence reports, and real-time governance insights."
        >
          <div className="rounded-3xl border border-secondary/10 bg-secondary/5 p-6 text-sm text-secondary/70">
            Investor gating dashboards and deal room metrics will surface here as staking logic is expanded.
          </div>
        </Section>
      </main>
    </PersonaGate>
  );
}
