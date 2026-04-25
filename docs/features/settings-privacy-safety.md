# Settings, Privacy, and Safety

Settings give users control over tone, privacy understanding, and data export.

## Implementation

- `app/settings/page.tsx` lets the user save a default AI tone and export entries.
- `components/MemoraClient.tsx` persists default tone on the user profile and serializes entries for export.
- Demo mode updates local profile state; Supabase mode upserts the profile row.
- Privacy and safety copy is intentionally visible in Settings so the product boundary is easy to audit during demos.

Privacy expectations:

- Memories are private by default.
- Demo mode stores data in browser local storage.
- Supabase mode is designed around RLS.

Safety expectations:

- AI is supportive and reflective.
- AI is not therapy, diagnosis, or emergency support.
- Crisis-like input should point users toward trusted people or local emergency resources.

## Tests

- `tests/unit/ai.test.ts` covers crisis-like input behavior.
- `tests/unit/runtime-clients.test.ts` covers AI client request handling.
- `tests/e2e/memora.spec.ts` covers Settings navigation and responsive behavior.

Related OpenSpec change:

- `implement-settings-privacy-safety`
