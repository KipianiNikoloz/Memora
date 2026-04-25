## Context

The architecture docs lock the MVP stack to Supabase Auth, Supabase Postgres, and RLS. Memory data must be private by default.

## Goals / Non-Goals

**Goals:**

- Implement email auth flows and session-aware routing.
- Configure Supabase clients for browser and server usage.
- Establish a repeatable migration and RLS pattern.
- Protect authenticated app routes.

**Non-Goals:**

- No memory-entry tables beyond required ownership scaffolding.
- No social login unless added by a future spec.
- No organization/team auth.

## Decisions

- Use Supabase Auth as the source of user identity.
- Use server-side session checks for protected app routes.
- Require RLS on user-owned tables from the first migration that introduces them.
- Keep auth copy calm and privacy-forward.

## Risks / Trade-offs

- Misconfigured RLS can expose private memories -> Add verification tasks for cross-user denial.
- Auth flow can feel generic -> Use Memora tone from the UI deck while keeping forms simple.
