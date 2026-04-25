## Context

This audit runs after `scaffold-memora-web-app` and `implement-auth-and-private-data-foundation`.

## Goals / Non-Goals

**Goals:**

- Verify the app builds and boots.
- Verify auth and route protection.
- Verify RLS/private-data assumptions.
- Fix foundation gaps found during audit.

**Non-Goals:**

- No memory-entry UX.
- No AI or insights behavior.
- No visual redesign beyond foundation correctness.

## Decisions

- Treat audit findings as implementation work inside this change.
- Use the docs as the standard for privacy and tone.
- Require passing validation before product specs begin.

## Risks / Trade-offs

- Audit can expand endlessly -> Limit fixes to scaffold, auth, environment, and private-data foundation.
