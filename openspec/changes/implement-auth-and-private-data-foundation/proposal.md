## Why

Memora stores sensitive emotional memories, so authentication and private data ownership must be established before product features. This change creates the security foundation future specs depend on.

## What Changes

- Add Supabase Auth for email-based accounts.
- Add Supabase client/server integration and session handling.
- Add protected app routing.
- Add database migration structure and RLS baseline for user-owned records.
- Do not implement memory-entry product behavior yet.

## Capabilities

### New Capabilities

- `auth-private-data-foundation`: Provides Supabase authentication, protected routes, and private per-user data ownership infrastructure.

### Modified Capabilities

- None.

## Impact

- Adds auth and Supabase integration surfaces.
- Establishes privacy invariants for every later data-backed feature.
