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

## CI/CD Gate

The `CI` GitHub Actions workflow runs on pull requests to `main`, pushes to `main`, and manual dispatch. It installs dependencies with `npm ci`, then runs typecheck, coverage tests, documentation checks, a production build, and Playwright E2E tests.

The `Deploy Production` workflow runs after successful `main` CI or by manual dispatch. It requires GitHub secrets for Supabase and Vercel, applies pending Supabase migrations, and deploys prebuilt production artifacts to Vercel. Vercel production must define `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_MEMORA_DEMO_MODE=false`.

Production deployment does not add live Supabase-backed app behavior by itself; the current implementation still uses the existing local/demo client data path.
