## 1. OpenSpec Artifacts

- [x] 1.1 Add proposal, design, tasks, and xrpl-milestone-badges spec artifacts.

## 2. Badge Domain And Persistence

- [x] 2.1 Add badge, badge wallet, eligibility, metadata, and transaction helper types.
- [x] 2.2 Add Supabase migration and mappers for `xrpl_milestone_badges`.
- [x] 2.3 Add demo and Supabase runtime helpers for loading and updating badge state.

## 3. XRPL Issuance Flow

- [x] 3.1 Add XRPL Testnet transaction builders and client helpers.
- [x] 3.2 Add server API route for issuer mint and destination offer creation.
- [x] 3.3 Add client/provider flow for demo wallet creation, offer acceptance, and badge status updates.

## 4. User Experience

- [x] 4.1 Add badge CTA/status UI on Insights milestone highlights.
- [x] 4.2 Add badge CTA/status UI on eligible entry detail pages.
- [x] 4.3 Add environment/documentation copy for XRPL Testnet issuer configuration.

## 5. Tests And Verification

- [x] 5.1 Add unit tests for badge eligibility, metadata, XRPL builders, and mappers.
- [x] 5.2 Add integration tests for provider badge state in demo and Supabase runtimes.
- [x] 5.3 Extend E2E coverage for the demo badge path with mocked XRPL calls.
- [x] 5.4 Run typecheck, tests, docs check, and build.
