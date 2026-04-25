## Context

The MVP is split across foundation, auth, private data, memory flows, AI, insights, public UI, settings, safety, and demo readiness specs. This testing pass verifies those pieces together.

## Goals / Non-Goals

**Goals:**

- Establish unit tests for pure logic, validation, domain helpers, AI prompt behavior, and utilities.
- Establish integration tests for Supabase-facing data flows, auth/session behavior, RLS assumptions, and server actions/API boundaries.
- Establish end-to-end tests for critical user journeys.
- Add coverage reporting with meaningful thresholds.
- Make tests runnable locally and in CI.

**Non-Goals:**

- No new product features.
- No production monitoring or analytics.
- No dependence on a live AI provider for normal test success.

## Decisions

- Use fast unit tests for domain logic and component behavior.
- Use integration tests for persistence, auth, and provider boundaries.
- Use browser E2E tests for full journeys across public, auth, app, AI mock, insights, and settings.
- Use deterministic mock AI for all automated tests.
- Require coverage thresholds for statements, branches, functions, and lines, with stricter coverage for domain and safety logic than decorative UI.

## Risks / Trade-offs

- Full E2E can become flaky -> Keep E2E focused on critical journeys and use stable selectors/fixtures.
- Supabase integration tests can be slow -> Separate local integration tests from fast unit tests while keeping a single full-suite command.
- Coverage can incentivize shallow tests -> Require behavior-oriented scenarios from OpenSpec, not just percentage targets.
