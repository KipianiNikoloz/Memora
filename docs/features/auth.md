# Auth and Private Data

Auth has two runtime paths:

- Demo mode: local browser state with prefilled credentials.
- Supabase mode: helpers in `lib/supabase` and SQL RLS policies in `supabase/migrations`.

## Implementation

- `components/MemoraClient.tsx` exposes `signIn`, `signOut`, current user state, runtime mode, errors, and loading state to the app.
- `lib/runtime-mode.ts` chooses `demo` unless `NEXT_PUBLIC_MEMORA_DEMO_MODE=false`.
- `lib/supabase/client.ts` and `lib/supabase/server.ts` create browser/server clients only when Supabase env vars are present.
- `lib/supabase/runtime-data.ts` hydrates profiles, entries, and badges for the active Supabase session.
- `app/auth/page.tsx` provides the demo-friendly sign-in/sign-up surface.

Private data expectations:

- Entries belong to one user.
- Supabase rows use `user_id`.
- RLS policies restrict CRUD to `auth.uid() = user_id`.
- Demo mode persists only in the current browser localStorage.
- The UI never presents entries from another profile.

## Supabase Tables

- `memora_profiles`: profile id, email, and default AI tone.
- `memory_entries`: private entry content, shelf metadata, AI tone/title/response, and timestamps.
- `xrpl_milestone_badges`: private badge issuance status connected to one user and one entry.

## Tests

- `tests/unit/runtime-clients.test.ts` covers runtime mode and client setup behavior.
- `tests/integration/private-data.test.ts` covers private ownership expectations.
- `tests/integration/supabase-runtime.test.tsx` covers Supabase-style hydration and mutations through the provider.

Related OpenSpec changes:

- `implement-auth-and-private-data-foundation`
- `audit-foundation-readiness`
