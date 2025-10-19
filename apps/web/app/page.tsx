export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <span className="rounded-full border border-primary/40 px-4 py-1 text-sm font-medium uppercase tracking-wide text-primary">
        Crypto Serv MVP
      </span>
      <h1 className="max-w-3xl text-4xl font-display font-semibold text-secondary-foreground sm:text-5xl">
        Unified crypto services platform for talent, builders, and investors.
      </h1>
      <p className="max-w-2xl text-lg text-secondary-foreground/80">
        This is the bootstrap landing shell. Upcoming sprints will bring wallet onboarding, dashboards, and the services
        marketplace to life using this shared design system.
      </p>
    </main>
  );
}
