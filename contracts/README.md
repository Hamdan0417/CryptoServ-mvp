# CheasyInvest Smart Contracts

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
3. Compile contracts:
   ```bash
   pnpm --filter @crypto-serv/contracts build
   ```

## What's Next
- PR5 introduces escrow interfaces that align with the marketplace modules.
- PR8 adds SERVToken + staking pool implementations with Foundry/Hardhat tests.
