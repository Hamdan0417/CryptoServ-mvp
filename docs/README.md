# Crypto Serv Documentation

This folder will host architectural decision records (ADRs), API specifications, and operational runbooks.

- `ADRs/` – Decision records (ADR-000 stack selection, ADR-001 authentication, etc.).
- `api/` – REST and GraphQL schemas generated from the NestJS gateway.
- `runbooks/` – Incident response, compliance review, and deployment guides.

Bootstrap sprint (PR0) creates the documentation skeleton. Subsequent sprints will fill in detailed content.

## Updates

- Added UI kit documentation references via Storybook (`packages/ui`) for marketing landing components reflecting the experience architecture.
- Captured Auth + Identity baseline (SIWE, sessions, persona gating) alongside Talent Hub, Marketplace Escrow, and Token staking APIs for PR1–PR5/PR8 scope.
- Playwright and contract coverage entries are now tracked to support runbooks for E2E and on-chain testing.
