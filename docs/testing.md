# Testing Strategy

Memora uses layered testing so the MVP is not dependent on one fragile end-to-end path.

## Commands

```bash
npm run lint
npm run test:unit
npm run test:integration
npm run test:coverage
npm run test:e2e
npm run test:full
```

## Unit Tests

Unit tests cover:

- Entry validation and tag parsing.
- AI librarian tone and safety behavior.
- Insight calculations and low-data states.
- Reusable UI behavior where useful.

## Integration Tests

Integration tests cover representative private-data ownership and provider boundaries. Supabase RLS is also documented in `supabase/migrations/0001_memora_entries.sql`.

## E2E Tests

Browser tests cover:

- Homepage to auth to library.
- New Entry creation and Library revisit.
- Insights, Settings, and AI Librarian surfaces.

## Coverage Gate

Coverage thresholds are configured in `vitest.config.ts`. The full suite should pass before the orchestrator declares completion.
