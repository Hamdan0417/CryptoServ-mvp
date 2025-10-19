# CheasyInvest: Official Project Repository & Contribution Guide

Welcome to the official home of the CheasyInvest project! This document is your central hub for understanding our vision, exploring our technical architecture, and learning how to contribute. We've designed this guide to be accessible for everyone, from potential investors to seasoned developers.

## Why the `tools/` Directory Matters
This folder aggregates reusable developer scripts that make working on CheasyInvest fast and consistent. Expect it to grow with database seeders, migration helpers, and automation utilities as the product matures.

---

## Current Contents
- **Taskfile.yml integration:** Provides commands like `pnpm dev:all`, `pnpm --filter api prisma migrate dev`, and `pnpm --filter contracts test` through a unified task runner.
- **Placeholder scripts:** Future PRs will populate shell/TypeScript utilities for seeding data, managing test fixtures, and orchestrating CI chores.

---

## Getting Started with Developer Tasks
1. **Install Dependencies:** Ensure `pnpm install` has been executed at the repo root.
2. **Run the Global Taskfile:**
   ```bash
   pnpm dlx task dev:all
   ```
   (Adjust once additional task runners are introduced.)
3. **Extend Scripts:** When adding new commands, document them in this README and ensure they work cross-platform.

---

## Best Practices
- Prefer TypeScript for complex automation so logic can be tested within the monorepo.
- Keep secrets out of scripts; read from environment variables defined in `.env`.
- Provide dry-run modes for destructive operations (database resets, contract deployments).

