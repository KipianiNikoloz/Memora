## Context

The MVP must be demo-ready even when live AI is unavailable. The mock provider and seed data make the end-to-end story reliable.

## Goals / Non-Goals

**Goals:**

- Provide a repeatable demo path.
- Ensure mock AI can power the demo.
- Verify core flows and final build.
- Add demo checklist documentation.

**Non-Goals:**

- No new major product features.
- No production observability buildout.
- No live AI dependency for demo success.

## Decisions

- Use mock AI as the default safe demo fallback.
- Add representative private entries for demo accounts only.
- Keep final fixes limited to demo blockers and acceptance checklist gaps.

## Risks / Trade-offs

- Demo data can leak into production assumptions -> Keep seed/mock behavior explicit and environment-bound.
