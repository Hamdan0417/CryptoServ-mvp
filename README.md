# CheasyInvest: Official Project Repository & Contribution Guide

Welcome to the official home of the CheasyInvest project! This document is your central hub for understanding our vision, exploring our technical architecture, and learning how to contribute. We've designed this guide to be accessible for everyone, from potential investors to seasoned developers.

---

## 1. Vision at a Glance
CheasyInvest (code name: Crypto Serv) is a vertically integrated Web3 services ecosystem. We connect talent, employers, service providers, and investors through a single trust-first platform powered by the SERV utility token.

### 1.1 Value Proposition
| Stakeholder | Core Value | Supporting Features |
| --- | --- | --- |
| Talent | Curated job market with crypto-native employers and instant Web3 identity. | Wallet login, verified profiles, application tracking, SERV-backed incentives. |
| Projects & Service Providers | Operational support to launch, certify, and scale Web3 ventures. | Licensing concierge, quality assurance audits, recovery playbooks, escrowed payouts. |
| Investors | Access to vetted opportunities and data-driven insights. | Deal room access, due diligence dashboards, SERV staking tiers for gated content. |
| Ecosystem Partners | Extend trusted services through a shared framework. | API integrations, co-branded landing pages, DAO governance hooks. |

### 1.2 Ecosystem Pillars
1. **Trusted Identity & Compliance** – Wallet-first authentication, KYC/AML orchestration, attestations.
2. **Services Marketplace** – Multi-vertical catalog with milestone-based escrow and SLA automation.
3. **Career Acceleration** – Talent profiles, role matching, mentorship, and credentialing.
4. **Investor Intelligence** – Token-gated analytics, curated deal flow, and governance participation.
5. **SERV Token Utility** – Payments, staking, rewards, and governance flows powering the economy.

---

## 2. Experience Architecture
```
[ Landing Page ] --> [ Wallet Connect ] --> [ Persona Selection ]
          |                    |                     |
          v                    v                     v
   [Public Marketing]   [Identity Services]   [Compliance Screening]
          |                    |                     |
          v                    v                     v
   +----------------------+-------------------------------+
   | Personalized Dashboards (Talent / Employer / Investor)|
   +----------------------+-------------------------------+
          |                    |                     |
   [Job Discovery]    [Marketplace Booking]    [Investor Deal Room]
```

- **Dashboards:** Dedicated experiences for talent, employers, investors, and administrators.
- **Marketplace:** Scoped engagements, milestone tracking, and escrow release flows.
- **Deal Room:** Token-gated insights aligned with SERV staking tiers.

---

## 3. Technical Blueprint

### 3.1 Platform Modules
| Module | Description | Key Capabilities |
| --- | --- | --- |
| Unified Onboarding | Wallet connect + progressive profiling. | Multi-wallet support, persona selection, attestations, guided KYC. |
| Talent Hub | Profiles, job board, applications, mentorship. | Smart search, AI matching (future), application tracker. |
| Employer Console | Hiring and workforce analytics. | Job CMS, pipeline dashboard, secure messaging. |
| Services Marketplace | Certified partner offerings. | Service listings, proposals, milestone tracking, escrow payments. |
| Recovery Desk | Distressed project workflows. | Intake triage, assessment templates, expert routing. |
| Investor Network | Vetted deals and governance. | Tiered access control, data rooms, proposal voting. |
| SERV Token Hub | Token mechanics. | Staking pools, airdrops, vesting schedules, loyalty analytics. |
| Admin & Analytics | Operational controls. | RBAC, audit logs, anomaly detection, KPI dashboards. |

### 3.2 Target Architecture
```
crypto-serv/
├── apps/
│   ├── web/        # Next.js (marketing + dashboards)
│   ├── admin/      # Next.js admin console
│   └── api/        # NestJS REST + GraphQL gateway
├── packages/
│   ├── ui/         # shadcn/ui + Radix component library
│   ├── config/     # ESLint, Prettier, Tailwind, tsconfig
│   └── utils/      # Shared TS utilities
├── contracts/      # Hardhat + Foundry smart contracts
├── docs/           # ADRs, API specs, runbooks
├── infra/          # Terraform, Helm charts, CI pipelines
└── tools/          # Dev scripts, seeds, migrations
```

- **Monorepo Tooling:** Turborepo + pnpm for task orchestration.
- **Styling:** Tailwind CSS with shadcn/ui tokens and Radix primitives.
- **State:** React Query on the client, Prisma + PostgreSQL on the backend.
- **Storage:** Redis for sessions and rate limiting, MinIO for compliance docs.

---

## 4. Smart Contract Suite
| Contract | Purpose | Key Considerations |
| --- | --- | --- |
| `SERVToken` | Core ERC-20 utility token. | Mint/burn controls, pausability, anti-whale rules. |
| `StakingPools` | Staking with reward schedules. | Adjustable APR, slash protection, auto-compounding. |
| `AirdropVault` | Campaign orchestration. | Merkle proofs, claim windows, bot mitigation. |
| `VestingVault` | Team/advisor vesting. | Linear & milestone vesting, revocation controls. |
| `EscrowService` | Marketplace escrow. | Milestone release, dispute resolution, oracle hooks. |
| `GovernanceModule` | DAO participation. | Delegated voting, proposal lifecycle, timelock executor. |

Initial PRs focus on scaffolding; advanced logic arrives in later milestones per the roadmap.

---

## 5. Data Model Snapshot
| Table | Description | Relationships |
| --- | --- | --- |
| `users` | Wallet, persona flags, compliance status. | 1:N with profiles, job_applications, services. |
| `profiles` | Persona-specific metadata. | Belongs to users; references companies. |
| `companies` | Employers & service providers. | Linked to users; owns jobs/services. |
| `jobs` | Listings metadata. | Has many job_applications. |
| `job_applications` | Application lifecycle. | Joins jobs and users. |
| `services` | Marketplace catalog. | Linked to companies; references escrow contracts. |
| `engagements` | Active service contracts. | Connects buyers, providers, milestones. |
| `stakes` | SERV staking positions. | References users and staking pools. |
| `governance_votes` | DAO participation. | Joins users and proposals. |

---

## 6. Security, Compliance & Risk Guardrails
- RBAC enforced across apps and API.
- SIWE nonce management, short-lived JWTs, secure session cookies.
- KYC/AML provider abstraction with webhook stubs.
- Rate limiting backed by Redis; audit logs streaming to SIEM sinks.
- Disaster recovery with multi-region replication and backup validation.

---

## 7. Delivery Roadmap
| Phase | Focus | Highlights |
| --- | --- | --- |
| PR0 – Foundations | Tooling bootstrap. | Turborepo, pnpm, configs, Docker Compose, env templates. |
| PR1 – UI Kit & Landing | Visual identity. | shadcn/ui setup, Storybook, landing page. |
| PR2 – Auth & Identity | Wallet onboarding. | SIWE, sessions, RBAC, persona selection UI. |
| PR3 – Data Model | Persistence. | Prisma schema, migrations, seeds. |
| PR4 – Talent Hub | Core UX. | Profiles, jobs, applications, end-to-end tests. |
| PR5 – Marketplace & Escrow | Services economy. | Engagement APIs, escrow contract interfaces. |
| PR6 – Investor Network | Token gating. | Staking tiers, deal room skeleton. |
| PR7 – Admin Console | Ops enablement. | Approvals, KPI dashboards, audit logs. |
| PR8 – Token & Staking | On-chain utility. | ERC20 + staking contracts, Foundry tests, API balance read. |
| PR9 – Governance | DAO tooling. | Proposal APIs, governance module integration. |
| PR10 – Docs & CI | Hardening. | ADRs, API specs, CI coverage, runbooks. |

---

## 8. Getting Started (Step-by-Step)

1. **Install pnpm & Taskfile (optional):**
   ```bash
   corepack enable
   npm install -g pnpm@8.15.4
   brew install go-task/tap/go-task # optional convenience wrapper
   ```
2. **Clone and bootstrap:**
   ```bash
   git clone <repo-url>
   cd crypto-serv
   pnpm install
   ```
3. **Prepare environment variables:**
   ```bash
   cp .env.example .env
   # adjust secrets such as JWT_SECRET, KYC_PROVIDER_API_KEY, etc.
   ```
4. **Start data services:**
   ```bash
   docker compose up -d
   ```
5. **Launch all apps (web, admin, api) in parallel:**
   ```bash
   pnpm dev:all
   # or `task dev:all` if you installed go-task
   ```
6. **Run targeted workflows:**
   ```bash
   pnpm --filter @crypto-serv/api prisma migrate dev   # once schema exists
   pnpm --filter @crypto-serv/contracts test            # run Hardhat tests
   pnpm --filter @crypto-serv/web dev                   # marketing app only
   pnpm --filter @crypto-serv/admin dev                 # admin console only
   ```

> **Tip:** Each workspace ships with its own README for package-specific commands.

---

## 9. Contribution Checklist
1. Follow [Conventional Commits](https://www.conventionalcommits.org/).
2. Keep PRs small, reviewable, and aligned with the roadmap increments.
3. Update documentation (README, ADRs, specs) alongside code changes.
4. Ensure lint, test, and build tasks succeed (`turbo run lint/test/build`).
5. Run security linters (ESLint, npm audit, Slither) where relevant.
6. Document architectural decisions in `/docs/adr` as features mature.

---

## 10. License
CheasyInvest is released under the [MIT License](LICENSE). Update the license if business requirements change.
