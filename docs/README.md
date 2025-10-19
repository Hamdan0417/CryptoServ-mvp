# CheasyInvest: Official Project Repository & Contribution Guide

Welcome to the official home of the CheasyInvest project! This document is your central hub for understanding our vision, exploring our technical architecture, and learning how to contribute. We've designed this guide to be accessible for everyone, from potential investors to seasoned developers.

## Documentation Mission
The `docs/` workspace collects everything teams need to operate CheasyInvest responsibly:
- **Architectural Decision Records (ADRs):** Capture the “why” behind foundational choices such as technology stack, authentication model, and staking mechanics.
- **API Specifications:** Auto-generated REST and GraphQL references sourced from the NestJS gateway for both public and internal consumers.
- **Operational Runbooks:** Step-by-step playbooks for incidents, compliance reviews, deployments, and monitoring.

---

## How to Navigate This Folder
1. **Start with ADRs:** Explore `docs/adr/` (to be added) to understand context before proposing major changes.
2. **Review API Specs:** Use files in `docs/api/` when integrating clients or validating contract-to-API interactions.
3. **Follow Runbooks:** When on-call or handling audits, consult `docs/runbooks/` for guided procedures and escalation paths.

Each directory includes README stubs that will expand as PRs introduce more detail.

---

## Step-by-Step Workflow for Contributors
1. **Document Architecture Changes:** When altering core patterns (auth flows, marketplace design, staking logic), draft an ADR template in `docs/adr/ADR-XYZ.md` explaining the problem, decision, and consequences.
2. **Sync API Schemas:** After modifying the API, regenerate OpenAPI and GraphQL SDL outputs so downstream teams stay aligned.
3. **Update Runbooks:** If a new operational process is introduced (e.g., onboarding a KYC provider), create or revise the corresponding runbook with prerequisites, instructions, validation steps, and rollback guidance.

---

## Recommended Tooling
- **Markdown linting:** `pnpm lint:md` (to be added) for consistent formatting.
- **Diagramming:** Prefer Mermaid diagrams for architecture visuals embedded directly in Markdown.
- **Versioning:** Reference ADR identifiers in pull requests to trace decision history.

---

## Getting Help
Unsure where to document something? Open a GitHub Discussion or contact the Docs guild lead. Our goal is to keep knowledge centralized, accessible, and audit-ready.

