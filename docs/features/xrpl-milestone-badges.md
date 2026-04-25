# XRPL Milestone Badges

XRPL milestone badges let a user explicitly commemorate a Proud or Milestones entry as a Testnet non-transferable NFT.

The badge is a keepsake, not a score or social feature. Public NFT metadata is intentionally minimal: badge name, category, event date, Memora issuer label, and version. Memory text, lessons, AI responses, email, user id, private tags, and emotional narrative stay inside Memora.

Runtime behavior:

- Demo mode stores the Testnet recipient wallet and badge records in browser localStorage.
- Supabase mode stores badge records in `xrpl_milestone_badges` with user-owned RLS.
- The issuer seed must stay server-side in `XRPL_TESTNET_ISSUER_SEED`.
- The app uses XRPL Testnet only. Mainnet and production wallet connectors are out of scope for this feature.

Related OpenSpec change:

- `issue-xrpl-milestone-badges`
