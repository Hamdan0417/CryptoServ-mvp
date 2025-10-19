# @crypto-serv/utils

TypeScript utility helpers shared across the monorepo.

## Available Helpers
- `PROJECT_SLUG` – canonical string identifier for branding consistency.
- `assertEnv(name, value)` – runtime guard for required environment variables.

## Usage
```ts
import { assertEnv } from '@crypto-serv/utils';

const dbUrl = assertEnv('DATABASE_URL', process.env.DATABASE_URL);
```

## Commands
- `pnpm --filter @crypto-serv/utils build` – emit compiled artifacts to `dist/`.
- `pnpm --filter @crypto-serv/utils lint` – run ESLint using shared presets.
- `pnpm --filter @crypto-serv/utils test` – execute Vitest (tests arrive in later PRs).
