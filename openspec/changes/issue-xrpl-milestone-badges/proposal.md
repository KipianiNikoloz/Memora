## Why

Memora already highlights personal milestones, but users do not yet have a verifiable keepsake for moments they choose to commemorate. XRPL Testnet badges let the demo show user-owned proof without turning private reflection into a public social feed.

## What Changes

- Add user-confirmed XRPL milestone badge issuance for Proud or Milestones entries.
- Issue badges as XRPL Testnet non-transferable NFTs with minimal public metadata.
- Add demo recipient wallet support and badge lifecycle state.
- Persist badge state separately from memory entries in demo and Supabase runtimes.
- Surface badge actions and status on Insights and entry detail screens.

## Capabilities

### New Capabilities

- `xrpl-milestone-badges`: Provides private-safe XRPL Testnet milestone badge issuance for eligible memory entries.

### Modified Capabilities

- None.

## Impact

- Adds XRPL dependency and server-side issuer configuration.
- Adds a Supabase migration for user-owned badge records.
- Adds badge state/actions to the shared Memora runtime provider.
- Keeps live ledger calls outside deterministic tests through mocks and demo fallbacks.
