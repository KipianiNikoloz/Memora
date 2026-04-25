## Why

Memora needs a runnable web application foundation before product features can be implemented. Establishing the framework, visual foundation, and routing shell first keeps later specs focused on product behavior rather than setup drift.

## What Changes

- Scaffold a Next.js App Router application for the Memora MVP.
- Add baseline styling, font setup, design tokens, shared layout, and route structure aligned with `docs/memora/design-system.md`.
- Add developer scripts and environment conventions needed by later specs.
- Do not implement auth, persistence, AI behavior, or product workflows in this change.

## Capabilities

### New Capabilities

- `web-app-foundation`: Provides the runnable Next.js foundation, route shell, styling baseline, and local developer workflow.

### Modified Capabilities

- None.

## Impact

- Introduces application source structure, package configuration, and styling foundation.
- Creates the base that all later Memora implementation specs depend on.
