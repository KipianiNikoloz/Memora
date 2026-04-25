## Why

Memora currently behaves like a demo even when Supabase credentials are configured. Production deployments need real Supabase Auth sessions and database-backed memories so private user data survives across browsers and devices.

## What Changes

- Keep demo mode localStorage-only when `NEXT_PUBLIC_MEMORA_DEMO_MODE=true`.
- Use Supabase Auth and RLS-backed database persistence when `NEXT_PUBLIC_MEMORA_DEMO_MODE=false`.
- Add sign-in and create-account auth paths, including an email-confirmation state.
- Persist memory entries and profile tone to Supabase in production mode.
- Add client-side production route protection while deferring SSR middleware hardening.

## Capabilities

### New Capabilities

- `supabase-runtime-data`: Provides mode-aware Supabase Auth, memory persistence, profile persistence, and production verification.

### Modified Capabilities

- `auth-private-data-foundation`: Production mode now uses the existing Supabase foundation at runtime.
- `memory-entry-domain`: Entry CRUD now persists to Supabase outside demo mode.

## Impact

- Context methods that can persist data become async.
- App routes wait for hydration/session resolution before acting on private state.
- Existing demo E2E remains credential-free.
