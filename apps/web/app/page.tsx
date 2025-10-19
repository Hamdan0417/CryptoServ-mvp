import Link from 'next/link';
import { Placeholder } from '@crypto-serv/ui';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col gap-12 bg-slate-950 px-6 py-16 text-slate-50">
      <section className="mx-auto flex w-full max-w-5xl flex-col items-center gap-6 text-center">
        <span className="rounded-full border border-brand/40 bg-brand/10 px-4 py-1 text-xs uppercase tracking-[0.3em] text-brand-light">
          Crypto Serv Ecosystem
        </span>
        <h1 className="text-4xl font-semibold sm:text-5xl md:text-6xl">
          Activate trusted Web3 services in one orchestrated platform.
        </h1>
        <p className="max-w-2xl text-base text-slate-200 sm:text-lg">
          Wallet-first onboarding, compliance, marketplace engagements, and investor deal rooms powered by the SERV token. Built for teams that need regulated infrastructure without compromising on Web3 speed.
        </p>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            href="#get-started"
            className="rounded-full bg-brand px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-brand/40 transition hover:bg-brand-dark"
          >
            View Experience Architecture
          </Link>
          <Link
            href="/docs/vision"
            className="rounded-full border border-slate-700 px-6 py-3 text-sm font-semibold text-slate-200 transition hover:border-brand hover:text-brand-light"
          >
            Explore Technical Roadmap
          </Link>
        </div>
      </section>
      <section id="get-started" className="mx-auto grid w-full max-w-5xl grid-cols-1 gap-6 md:grid-cols-3">
        <Placeholder className="bg-slate-900">
          Landing → Wallet Connect → Persona Selection
        </Placeholder>
        <Placeholder className="bg-slate-900">
          Dashboards (Talent / Employer / Investor)
        </Placeholder>
        <Placeholder className="bg-slate-900">
          Job Discovery · Marketplace Booking · Deal Room
        </Placeholder>
      </section>
    </main>
  );
}
