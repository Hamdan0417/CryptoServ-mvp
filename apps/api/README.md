# CheasyInvest API Gateway

NestJS service providing REST and (future) GraphQL access to CheasyInvest modules such as Auth, Identity, Marketplace, and Governance.

## Capabilities Delivered in PR0
- ConfigModule bootstrap with environment-driven configuration.
- `/health` endpoint for uptime monitoring.
- Jest unit and E2E test harnesses.

## Running Locally
1. Install dependencies from the repository root:
   ```bash
   pnpm install
   ```
2. Prepare environment variables:
   ```bash
   cp ../../.env.example ../../.env
   ```
3. Start infrastructure dependencies:
   ```bash
   docker compose up -d
   ```
4. (Optional) Prepare Prisma client once the schema is defined:
   ```bash
   pnpm --filter @crypto-serv/api prisma migrate dev
   ```
5. Launch the API in watch mode:
   ```bash
   pnpm --filter @crypto-serv/api dev
   ```
   The service listens on port `3002` by default.

## Testing & Linting
- `pnpm --filter @crypto-serv/api test` – run unit tests.
- `pnpm --filter @crypto-serv/api test:e2e` – run end-to-end tests with Supertest.
- `pnpm --filter @crypto-serv/api lint` – execute ESLint rules.

## Roadmap Hooks
Upcoming PRs will add Prisma integration (PR3), SIWE authentication flows (PR2), Talent Hub APIs (PR4), and Escrow endpoints (PR5).
