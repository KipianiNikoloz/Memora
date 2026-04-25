# Production Supabase Runtime Verification

Use this checklist after deploying Memora with `NEXT_PUBLIC_MEMORA_DEMO_MODE=false`.

- Confirm `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are set for the deployment.
- Open `/auth`, create a new account, and complete email confirmation if the Supabase project requires it.
- Sign in and confirm `/library` opens without seeded demo-only assumptions.
- Create a memory entry and confirm a row appears in `public.memory_entries` for the authenticated user's `auth.uid()`.
- Change the default AI tone in Settings and confirm `public.memora_profiles.default_tone` updates.
- Open browser DevTools Network and confirm authenticated app activity calls the configured `*.supabase.co` project.
- Sign out, revisit `/library`, and confirm the client redirects to `/auth`.
