## Context

Memora stores sensitive emotional memories and already derives milestone highlights from entries where `emotion` is Proud or `lifePhase` is Milestones. Badge issuance must preserve the private-by-default product promise while demonstrating XRPL ownership.

## Goals / Non-Goals

**Goals:**

- Let users explicitly issue a badge for an eligible milestone.
- Use XRPL Testnet non-transferable NFTs.
- Keep public metadata generic and private-safe.
- Persist badge lifecycle state independently from memory entries.
- Support demo mode without requiring production wallet setup.

**Non-Goals:**

- No XRPL mainnet support.
- No marketplace, resale, leaderboard, or social sharing behavior.
- No public publishing of memory text, lessons, AI output, email, or user ids.
- No production wallet connector in this change.

## Decisions

- Eligibility is derived from existing entry semantics: Proud emotion or Milestones shelf.
- Badge records live in `xrpl_milestone_badges`, not on `memory_entries`, because XRPL lifecycle has its own status and transaction identifiers.
- Demo recipient wallets are testnet-only and stored in localStorage with clear labeling.
- Issuer signing remains server-side through `XRPL_TESTNET_ISSUER_SEED`.
- The API mints the NFT and creates a zero-XRP destination sell offer; the demo recipient accepts the offer client-side.
- Successful issuance is recorded only after validated transaction results are observed or explicitly mocked in tests.

## Risks / Trade-offs

- XRPL public Testnet can be unavailable -> Show failed/pending badge states and keep entries usable.
- Testnet wallet seeds in localStorage are not production-safe -> Label the wallet as demo-only and keep production wallet connectors out of scope.
- NFT metadata can leak private data -> Centralize metadata construction and test that private fields are excluded.
- Server issuer configuration may be missing -> Return clear API errors and keep the UI in an unissued state.

## Verification

- Unit-test eligibility, metadata sanitization, and XRPL transaction builders.
- Unit-test Supabase badge mappers.
- Integration-test demo and Supabase provider badge state with mocks.
- E2E-test the badge CTA/status path with mocked issuance.
- Run typecheck, unit/integration tests, docs check, and build.
