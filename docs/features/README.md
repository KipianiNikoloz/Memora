# Feature Documentation

This directory documents Memora's implemented MVP capabilities at feature level. Each page should explain user-facing behavior, implementation touchpoints, runtime constraints, and test coverage.

## Feature Map

- [Auth and Private Data](auth.md): demo auth, Supabase auth readiness, profile ownership, and RLS invariants.
- [Memory Entries and New Entry](memory-entries.md): entry schema, validation, creation flow, AI enrichment, and persistence.
- [Library Explorer](library.md): shelf grouping, filters, search, empty states, and detail navigation.
- [AI Librarian](ai-librarian.md): tasks, runtime providers, workflow validation, fallback behavior, and safety posture.
- [Insights Dashboard](insights.md): mood counts, milestones, revisit suggestions, summaries, and low-data behavior.
- [XRPL Milestone Badges](xrpl-milestone-badges.md): Testnet badge eligibility, metadata minimization, issuance, and storage.
- [Homepage and Design System](design-system.md): visual identity, shell patterns, motion, responsive constraints, and shared UI.
- [Settings, Privacy, and Safety](settings-privacy-safety.md): tone settings, data export, privacy copy, and crisis-like input boundaries.

## Maintenance Rules

- Update the relevant feature page whenever a route, shared component, domain type, API route, migration, or test changes feature behavior.
- Add or update Mermaid diagrams when a flow crosses runtime boundaries such as browser state, API routes, Supabase, AI providers, or XRPL.
- Keep feature docs grounded in the implementation and link broader product intent through `docs/memora/`.
