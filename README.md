# CheasyInvest: Official Project Repository & Contribution Guide

Welcome to the official home of the CheasyInvest project! This document is your central hub for understanding our vision, exploring our technical architecture, and learning how to contribute. We've designed this guide to be accessible for everyone, from potential investors to seasoned developers.

## Table of Contents
- [1. Project Snapshot](#1-project-snapshot)
- [2. Experience Journey at a Glance](#2-experience-journey-at-a-glance)
- [3. Technical Blueprint](#3-technical-blueprint)
- [4. Step-by-Step Setup Guide](#4-step-by-step-setup-guide)
- [5. Usage Walkthroughs](#5-usage-walkthroughs)
- [6. Repository Layout](#6-repository-layout)
- [7. Delivery Roadmap](#7-delivery-roadmap)
- [8. Contribution Guidelines](#8-contribution-guidelines)
- [9. Security & Compliance Priorities](#9-security--compliance-priorities)
- [10. Licensing](#10-licensing)

---

## 1. Project Snapshot
CheasyInvest is a full-stack Web3 services ecosystem that links talent, employers, service providers, and investors through a unified experience powered by the SERV utility token. Think of it as a platform where:

- **Talent** discover curated roles, build on-chain reputations, and earn rewards for contributing to Web3 projects.
- **Employers and service buyers** access trusted professionals, manage engagements, and release payments through escrow-backed milestones.
- **Investors** review vetted opportunities, unlock gated intelligence with staking tiers, and participate in governance.
- **Platform operators** maintain compliance, risk controls, and growth programs through dedicated admin tooling.

---

## 2. Experience Journey at a Glance
```
[ Landing Page ] → [ Wallet Connect ] → [ Persona Selection ]
        |                   |                    |
        v                   v                    v
 [Public Marketing]   [Identity Services]   [Compliance Screening]
        |                   |                    |
        v                   v                    v
+---------------------------------------------------------------+
| Personalized Dashboards (Talent / Employer / Investor)        |
+---------------------------------------------------------------+
        |                   |                    |
 [Job Discovery]    [Marketplace Booking]    [Investor Deal Room]
        |                   |                    |
        v                   v                    v
 [Applications]      [Service Engagement]    [Governance Portal]
        |                   |                    |
        v                   v                    v
     [SERV Rewards Layer & Analytics Feedback Loop]
```

Each persona experiences tailored onboarding, dashboards, and call-to-actions. The ecosystem pillars supporting this flow are:

1. **Trusted Identity & Compliance** – Wallet-first authentication with KYC/AML checks.
2. **Services Marketplace** – Certified partners with escrowed milestones.
3. **Career Acceleration** – Talent profiles, job board, and mentorship.
4. **Investor Intelligence** – Token-gated data room and analytics.
5. **SERV Token Utility** – Payments, staking, loyalty, and governance.

---

## 3. Technical Blueprint
CheasyInvest is built as a Turborepo monorepo using pnpm for package management. Each layer can be extended independently while sharing consistent tooling.

### Frontend Applications (Next.js + TypeScript + Tailwind)
- `apps/web`: Marketing site and authenticated dashboards.
- `apps/admin`: RBAC-protected admin console for operations, compliance, support, and growth teams.
- Shared UI powered by Radix UI primitives and shadcn/ui, distributed from `packages/ui` with Storybook documentation.

### Backend Services (NestJS + Prisma)
- `apps/api`: Modular API exposing REST and GraphQL endpoints covering Auth, Identity, Compliance, Talent, Employer, Marketplace, Recovery, Investor, Token, and Admin domains.
- Gateway responsibilities include rate limiting, JWT issuance, and EIP-4361 “Sign-In with Ethereum”.
- PostgreSQL (via Prisma), Redis, and S3-compatible storage are configured for persistence, sessions, and document handling.

### Smart Contracts (Solidity + Hardhat + Foundry)
- `packages/contracts`: Contains SERVToken (ERC20), staking pools, vesting, airdrop, escrow, and governance modules.
- Foundry/Hardhat pipelines provide compilation, testing, and coverage reports.

### DevEx & Tooling
- `packages/config`: Centralizes ESLint, Prettier, Tailwind, tsconfig, and commit linting.
- `packages/utils`: Shared TypeScript helpers.
- GitHub Actions (to be expanded) enforce lint/test/build for each workspace.
- Docker Compose stands up PostgreSQL, Redis, and MinIO locally.

---

## 4. Step-by-Step Setup Guide
Whether you are a non-technical stakeholder exploring the platform or an engineer ready to contribute, follow these steps to get a working environment.

### 4.1 Prerequisites
1. **Node.js 20+** – Install from [nodejs.org](https://nodejs.org) or use nvm.
2. **pnpm 8+** – `npm install -g pnpm`.
3. **Docker & Docker Compose** – Required for Postgres, Redis, and MinIO.
4. **Git** – Clone the repository.

### 4.2 Clone the Repository
```bash
git clone https://github.com/your-org/cheasyinvest.git
cd cheasyinvest
```

### 4.3 Install Dependencies
```bash
pnpm install
```
This command bootstraps every workspace (apps and packages) in the monorepo.

### 4.4 Configure Environment Variables
1. Duplicate `.env.example` to `.env` at the repository root.
2. Adjust values as needed (database URLs, JWT secrets, SIWE configuration, S3 credentials). Defaults are designed for local development.

### 4.5 Start Supporting Services
```bash
docker compose up -d
```
PostgreSQL, Redis, and MinIO will run in the background. You can inspect logs with `docker compose logs -f`.

### 4.6 Run the Development Suite
```bash
pnpm dev:all
```
This script concurrently launches:
- `apps/web` on `http://localhost:3000`
- `apps/admin` on `http://localhost:3001`
- `apps/api` on `http://localhost:3002`

When prompted by the web app, connect a wallet (or use the development mock) and explore persona-specific dashboards.

### 4.7 Database Migrations & Seeds
Once the API is running:
```bash
pnpm --filter api prisma migrate dev
pnpm --filter api db:seed   # (placeholder command for upcoming seed scripts)
```
These commands keep your schema aligned with the latest migrations.

### 4.8 Smart Contract Tooling
```bash
pnpm --filter contracts test
```
Executes Hardhat/Foundry unit tests to validate token and staking logic.

---

## 5. Usage Walkthroughs
### 5.1 Non-Technical Tour
1. Visit `http://localhost:3000` for the marketing experience.
2. Explore the landing sections describing Talent, Employer, Marketplace, and Investor journeys.
3. Use the Wallet Connect stub to preview onboarding without needing a crypto wallet.
4. Navigate to persona dashboards to understand the tailored workflows and data insights.

### 5.2 Technical Deep-Dive
1. Inspect API modules within `apps/api/src` to learn how Auth, Talent, Marketplace, and Token services are structured.
2. Review Prisma schema at `apps/api/prisma/schema.prisma` for data relationships (users, profiles, companies, jobs, job_applications, services, engagements, stakes, governance_votes, and more).
3. Open the `packages/ui` Storybook to view reusable components:
   ```bash
   pnpm --filter ui storybook
   ```
4. Analyze smart contracts in `packages/contracts/contracts/` to understand on-chain mechanics.

### 5.3 Testing & Quality Assurance
- **Frontend E2E:** `pnpm --filter web test:e2e`
- **Backend Unit & E2E:** (to be added in future sprints using Jest + Supertest).
- **Contracts:** `pnpm --filter contracts test`

---

## 6. Repository Layout
```
crypto-serv/
  apps/
    web/      # Next.js marketing + dashboards
    admin/    # Next.js admin console with RBAC
    api/      # NestJS REST + GraphQL gateway
  packages/
    ui/       # Shared component library (Radix UI + shadcn/ui)
    config/   # ESLint, Prettier, Tailwind, tsconfig, commitlint
    contracts/# Solidity suite (Hardhat + Foundry)
    utils/    # Shared TypeScript utilities
  docs/       # ADRs, API specs, runbooks
  infra/      # Terraform skeleton, Helm charts, GitHub Actions
  tools/      # Dev scripts, seeds, migrations
```

---

## 7. Delivery Roadmap
We deliver features through focused pull requests:
1. **PR0 – Bootstrap & Tooling:** Turborepo setup, configs, Docker Compose, `.env.example`.
2. **PR1 – UI Kit & Landing:** Storybook, shared components, responsive landing page.
3. **PR2 – Auth & Identity:** Wallet connect, SIWE, persona onboarding, guarded routes.
4. **PR3 – Data Model & Prisma:** Schema definitions, migrations, initial seeds.
5. **PR4 – Talent Hub:** Profiles, job board, applications (API + UI + Playwright E2E).
6. **PR5 – Marketplace & Escrow:** Services, engagements, milestone endpoints and UI stubs.
7. **PR6 – Investor Network:** Staking tiers, deal room skeleton.
8. **PR7 – Admin Console:** KPIs, approvals, audit logging.
9. **PR8 – Contracts Pass 1:** ERC20, staking pools, vesting, airdrop tests.
10. **PR9 – Governance:** Proposal/vote API + contract integrations.
11. **PR10 – Documentation & CI Hardening:** ADRs, runbooks, automation.

---

## 8. Contribution Guidelines
1. **Branching:** Use feature branches derived from `main` (e.g., `feat/talent-hub`).
2. **Conventional Commits:** `feat:`, `fix:`, `docs:`, `chore:`, `test:` prefixes keep history readable.
3. **Small Pull Requests:** Each PR should focus on one sprint milestone and include:
   - Summary of changes
   - Step-by-step local testing instructions
   - Security considerations (auth, data exposure, rate limits)
   - Screenshots for UI changes when applicable
4. **Code Quality:** Lint and test before pushing (`pnpm lint`, `pnpm test`, `pnpm --filter web test:e2e`, etc.).
5. **Review Process:** Provide architectural rationale and link to ADR updates when introducing significant design changes.

---

## 9. Security & Compliance Priorities
- Enforce RBAC for admin access, persona gating, and investor tiers.
- Maintain audit logs for critical actions (approvals, payouts, staking adjustments).
- Implement SIWE nonce handling, CSRF protection, and secure session storage.
- Integrate KYC/AML providers with webhook validations and alerting via SIEM hooks.
- Apply rate limiting and anomaly detection across public endpoints.

---

## 10. Licensing
CheasyInvest is released under a future-to-be-defined license. Until finalized, consider all assets proprietary to the CheasyInvest team. Reach out to the project maintainers for partnership or contribution inquiries.

