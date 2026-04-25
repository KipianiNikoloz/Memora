## 1. Test Infrastructure

- [x] 1.1 Select and configure unit/component test runner for the Next.js stack.
- [x] 1.2 Select and configure browser E2E test runner.
- [x] 1.3 Add test scripts for unit, integration, e2e, coverage, and full-suite execution.
- [x] 1.4 Add deterministic fixtures, test data builders, and mock AI provider setup.

## 2. Unit and Component Tests

- [x] 2.1 Test memory-entry validation, emotion/tag/shelf helpers, and domain utilities.
- [x] 2.2 Test AI librarian tone selection, prompt shaping, mock outputs, and safety boundaries.
- [x] 2.3 Test insight calculation helpers and low-data behavior.
- [x] 2.4 Test reusable UI components for states, focus, disabled behavior, and validation rendering.

## 3. Integration Tests

- [x] 3.1 Test Supabase auth/session behavior in the test environment.
- [x] 3.2 Test private entry CRUD through server actions or API boundaries.
- [x] 3.3 Test RLS cross-user denial.
- [x] 3.4 Test AI provider abstraction and mock fallback.

## 4. End-to-End Tests

- [x] 4.1 Test public homepage to sign-up/login path.
- [x] 4.2 Test New Entry creation and save flow.
- [x] 4.3 Test Library search, filters, shelves, and entry detail revisit.
- [x] 4.4 Test AI Librarian mock title/reflection/revisit behavior.
- [x] 4.5 Test Insights dashboard populated and low-data states.
- [x] 4.6 Test Settings privacy, tone preference, and data-control surfaces.

## 5. Quality Gates

- [x] 5.1 Add coverage reporting with documented thresholds.
- [x] 5.2 Add accessibility and keyboard/focus checks for critical journeys.
- [x] 5.3 Add responsive smoke checks for mobile and desktop viewports.
- [x] 5.4 Document local and CI test commands.
- [x] 5.5 Run the full suite and fix failures until it passes.
