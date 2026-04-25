## 1. OpenSpec Artifacts

- [x] 1.1 Add proposal, design, tasks, and supabase-runtime-data spec artifacts.

## 2. Runtime Mode And Mapping

- [x] 2.1 Add mode detection and Supabase database mappers for entries and profiles.
- [x] 2.2 Add tests for camelCase/snake_case conversion.

## 3. Provider And Persistence

- [x] 3.1 Refactor `MemoraProvider` into demo and Supabase runtime behavior.
- [x] 3.2 Persist entry insert/update/delete operations to Supabase in production mode.
- [x] 3.3 Persist profile/default tone to Supabase in production mode.
- [x] 3.4 Keep demo mode seeded and localStorage-backed.

## 4. Auth UX And Route Protection

- [x] 4.1 Add sign-in/create-account tabs on `/auth`.
- [x] 4.2 Route successful authenticated sessions to `/library` and show a check-email state when confirmation is required.
- [x] 4.3 Add client-side production route protection for authenticated app routes.

## 5. Tests And Verification

- [x] 5.1 Add integration tests for Supabase-mode auth/session restore, CRUD, profile tone, and no app localStorage writes.
- [x] 5.2 Keep Playwright E2E explicitly in demo mode.
- [x] 5.3 Add production verification checklist.
- [x] 5.4 Run typecheck, unit/integration tests, and build.
