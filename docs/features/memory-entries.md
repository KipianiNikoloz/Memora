# Memory Entries and New Entry

Memory entries are titled chapters in the user's personal library.

Fields:

- Title
- What happened
- What the user learned
- Emotion
- Tags
- Life phase/shelf
- AI tone and response metadata

The New Entry flow is intentionally simple: title, emotion chips, memory prompt, lesson prompt, shelf, tone, tags, and save.

## Implementation

- `lib/types.ts` defines `MemoryEntry`, `Emotion`, `LifePhase`, `Tone`, and allowed value arrays.
- `lib/validation.ts` validates drafts, parses comma-separated tags, and creates timestamped entry records.
- `app/new-entry/page.tsx` owns form state and calls `addEntry`.
- `components/MemoraClient.tsx` enriches new entries by requesting AI title and reflection tasks before persistence.
- `app/entry/[id]/page.tsx` shows a single saved entry, AI response, metadata, and delete flow.

## Persistence

- Demo mode stores entries under `memora:entries` in browser localStorage.
- Supabase mode maps entries through `lib/supabase/mappers.ts` into `memory_entries`.
- `eventDate`, `createdAt`, and `updatedAt` are stored separately so the remembered event and system timestamps can diverge.

## Tests

- `tests/unit/validation.test.ts` covers required fields and tag parsing.
- `tests/unit/supabase-mappers.test.ts` covers row/domain conversion.
- `tests/e2e/memora.spec.ts` covers creating and revisiting an entry in the browser.

Related OpenSpec changes:

- `implement-memory-entry-domain`
- `implement-new-entry-flow`
- `audit-core-memory-readiness`
