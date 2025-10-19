# @crypto-serv/ui

Shared UI component library composed of Radix primitives, shadcn/ui tokens, and Tailwind CSS utilities.

## Features
- `Placeholder` scaffolding component for early layout work.
- `cn` utility for combining Tailwind classes with `tailwind-merge`.
- Storybook configuration placeholder (Storybook setup arrives in PR1).

## Local Development
1. Install workspace dependencies from the repo root:
   ```bash
   pnpm install
   ```
2. Build the library:
   ```bash
   pnpm --filter @crypto-serv/ui build
   ```
3. (Upcoming PR) Run Storybook once stories are added:
   ```bash
   pnpm --filter @crypto-serv/ui dev
   ```

## Scripts
- `pnpm --filter @crypto-serv/ui build` – bundle TypeScript via `tsup`.
- `pnpm --filter @crypto-serv/ui lint` – lint source files.
- `pnpm --filter @crypto-serv/ui test` – execute Vitest suites (to be implemented).
