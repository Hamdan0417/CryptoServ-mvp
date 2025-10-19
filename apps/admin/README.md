# Crypto Serve Admin Console

The admin console empowers operations, compliance, support, and growth teams to govern the Crypto Serve platform.

## Current Status
This PR seeds the Next.js workspace with Tailwind styling and placeholder content. Future roadmap items will introduce RBAC, approvals, KPI dashboards, and audit logs (see PR7).

## Local Setup
1. Install dependencies at the repo root (only required once):
   ```bash
   pnpm install
   ```
2. Launch shared infrastructure (PostgreSQL, Redis, MinIO):
   ```bash
   docker compose up -d
   ```
3. Start the admin dev server on port 3001:
   ```bash
   pnpm --filter @crypto-serv/admin dev
   ```

## Scripts
- `pnpm --filter @crypto-serv/admin dev` – run in development mode.
- `pnpm --filter @crypto-serv/admin build` – create a production build.
- `pnpm --filter @crypto-serv/admin start` – serve the production build (port 3001 by default).
- `pnpm --filter @crypto-serv/admin lint` – run ESLint checks.

## Upcoming Enhancements
- PR2: Persona-aware gating from the shared auth service.
- PR5+: Escalation workflows for marketplace engagements.
- PR7: Full admin dashboards, audit logging, and RBAC enforcement.
