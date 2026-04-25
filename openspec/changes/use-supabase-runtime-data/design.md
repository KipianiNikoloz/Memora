## Context

Supabase recommends `@supabase/ssr` browser and server clients for Next.js. This change keeps the current client-shell architecture and uses the browser client for v1 CRUD because the existing schema already has RLS policies that enforce user ownership.

## Decisions

- `NEXT_PUBLIC_MEMORA_DEMO_MODE=false` is the only production-mode switch. Any other value, including unset, keeps demo mode active.
- Demo mode continues to seed from `demo-data.ts` and persist only to `localStorage`.
- Supabase mode creates a browser client, restores the auth session, listens for auth state changes, and loads `memora_profiles` and `memory_entries` for the authenticated user.
- Auth UI exposes explicit `Sign in` and `Create account` tabs. Sign-up without an immediate session shows a check-email state.
- The provider exposes `loading` and `error` so app pages can avoid acting before session resolution.
- Client-side route protection lives in `AppChrome` for now. Middleware/proxy protection is intentionally deferred to a later hardening change.
- Mappers live outside React so camelCase/snake_case conversion can be tested without rendering the app.

## Risks

- Client-only route protection can briefly render loading UI before redirect. This is acceptable for v1 and documented as deferred hardening.
- Supabase email confirmation behavior depends on project settings, so the auth result needs to support both immediate-session and check-email flows.
- If production mode is enabled without URL/key configuration, the app must surface a clear runtime error instead of silently falling back to demo storage.

## Verification

- Unit-test database mappers.
- Test demo provider behavior and localStorage persistence.
- Test Supabase provider behavior with a mocked client, including auth, session restore, entry CRUD, profile upsert, and absence of app localStorage writes.
- Keep Playwright E2E in demo mode.
- Document manual production checks for deployed Supabase network calls and database rows.
