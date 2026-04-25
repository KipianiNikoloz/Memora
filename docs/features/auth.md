# Auth and Private Data

Auth has two paths:

- Demo mode: local browser state with prefilled credentials.
- Supabase mode: helpers in `lib/supabase` and SQL RLS policies in `supabase/migrations`.

Private data expectations:

- Entries belong to one user.
- Supabase rows use `user_id`.
- RLS policies restrict CRUD to `auth.uid() = user_id`.

Related OpenSpec changes:

- `implement-auth-and-private-data-foundation`
- `audit-foundation-readiness`
