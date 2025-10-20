# Crypto Serve Smart Contracts

Hardhat workspace for the SERV token suite (ERC20, staking pools, vesting, airdrop, escrow, governance).

## Getting Started
1. Install dependencies at the repository root:
   ```bash
   pnpm install
   ```
2. Run contract tests:
   ```bash
   pnpm --filter @crypto-serv/contracts test
   ```
   > **Note:** The bootstrap test suite is skipped by default (`--no-compile`) to avoid remote compiler downloads in constrained CI environments. Remove the skip marker in `contracts/test/placeholder.ts` once real Solidity code is available.
3. Compile contracts:
   ```bash
   pnpm --filter @crypto-serv/contracts build
   ```

## What's Next
- PR5 introduces escrow interfaces that align with the marketplace modules.
- PR8 adds SERVToken + staking pool implementations with Foundry/Hardhat tests.
