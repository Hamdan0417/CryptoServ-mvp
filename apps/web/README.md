# CheasyInvest Web Experience

This Next.js application delivers both the public marketing site and authenticated dashboards for the CheasyInvest (Crypto Serv) ecosystem.

## Key Capabilities
- Wallet-first onboarding entry point.
- Persona-specific dashboards (Talent, Employer, Investor) – stubs for upcoming PRs.
- Shared Tailwind/shadcn/ui design system via `@crypto-serv/ui`.

## Local Setup
1. Install dependencies from the repository root:
   ```bash
   pnpm install
   ```
2. Ensure infrastructure services are running:
   ```bash
   docker compose up -d
   ```
3. Copy environment variables if you have not already:
   ```bash
   cp ../../.env.example ../../.env
   ```
4. Start the development server:
   ```bash
   pnpm --filter @crypto-serv/web dev
   ```
   The app runs on [http://localhost:3000](http://localhost:3000).

## Available Scripts
- `pnpm --filter @crypto-serv/web dev` – start Next.js in development mode.
- `pnpm --filter @crypto-serv/web build` – create a production build.
- `pnpm --filter @crypto-serv/web start` – serve the production build.
- `pnpm --filter @crypto-serv/web lint` – run ESLint using the shared configuration.

## Roadmap Alignment
This workspace is primarily targeted by PR1 (UI Kit & Landing), PR2 (Auth & Identity), PR4 (Talent Hub), and PR6 (Investor Network).
