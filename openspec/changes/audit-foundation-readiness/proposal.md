## Why

The first implementation phase creates assumptions that every later product feature relies on. A dedicated audit pass should verify the app foundation, auth, environment, and privacy baseline before feature work proceeds.

## What Changes

- Inspect and fix gaps in the scaffold and auth foundations.
- Verify route protection, environment handling, build health, and RLS assumptions.
- Do not add new product scope beyond foundation readiness fixes.

## Capabilities

### New Capabilities

- `foundation-readiness-audit`: Audits and remediates foundation gaps before product feature specs proceed.

### Modified Capabilities

- None.

## Impact

- May update scaffolding, auth, tests, or docs created by earlier specs.
- Blocks later feature implementation until foundation acceptance criteria pass.
