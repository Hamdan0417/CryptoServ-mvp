import Link from 'next/link';
import { Button, Section } from '@crypto-serv/ui';

export default function DashboardOverviewPage() {
  return (
    <main className="flex min-h-screen flex-col bg-white text-secondary">
      <Section
        title="Welcome to Crypto Serv"
        description="Access tailored dashboards for talent, employers, and investors. Complete your persona onboarding to unlock the modules below."
      >
        <div className="grid gap-4 md:grid-cols-3">
          <Button asChild variant="outline" className="justify-between">
            <Link href="/talent/dashboard">Talent Hub</Link>
          </Button>
          <Button asChild variant="outline" className="justify-between">
            <Link href="/employer/dashboard">Employer Console</Link>
          </Button>
          <Button asChild variant="outline" className="justify-between">
            <Link href="/investor/dashboard">Investor Network</Link>
          </Button>
        </div>
      </Section>
    </main>
  );
}
