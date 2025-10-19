# @crypto-serv/config

Centralized configuration presets (ESLint, Prettier, Tailwind CSS, and TypeScript) for the CheasyInvest monorepo.

## Usage Examples
- **ESLint:** `extends: ['@crypto-serv/config/eslint']`
- **Prettier:** `module.exports = require('@crypto-serv/config/prettier');`
- **Tailwind:** `import config from '@crypto-serv/config/tailwind';`
- **TypeScript:** `"extends": "@crypto-serv/config/tsconfig"`

All presets inherit from `tsconfig.base.json` at the repository root, ensuring consistent compiler options and style rules.
