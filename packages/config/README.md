# @crypto-serv/config

Centralized configuration presets (ESLint, Prettier, Tailwind CSS, and TypeScript) for the Crypto Serve monorepo.

## Usage Examples
- **ESLint:** `extends: ['@crypto-serv/config/eslint']`
- **Prettier:** `module.exports = require('@crypto-serv/config/prettier');`
- **Tailwind:** `import config from '@crypto-serv/config/tailwind';`
- **TypeScript:** extend the shared base via a relative path, for example `"extends": "../../packages/config/tsconfig/base.json"` in apps or `"extends": "../config/tsconfig/base.json"` in workspace packages.

All presets inherit from `tsconfig.base.json` at the repository root, ensuring consistent compiler options and style rules.
