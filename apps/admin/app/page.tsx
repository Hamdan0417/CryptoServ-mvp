export default function AdminHome() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 p-8 text-center">
      <span className="rounded-full border border-primary/40 px-4 py-1 text-sm font-medium uppercase tracking-wide text-primary">
        Admin Console
      </span>
      <h1 className="max-w-3xl text-4xl font-display font-semibold text-secondary-foreground sm:text-5xl">
        Crypto Serv operations cockpit scaffold is ready.
      </h1>
      <p className="max-w-2xl text-lg text-secondary-foreground/80">
        Upcoming sprints will connect compliance, support, and growth analytics into this workspace using shared tooling.
      </p>
    </main>
  );
}
