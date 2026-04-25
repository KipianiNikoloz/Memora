## Context

The UI deck defines Library Explorer as the core product screen with shelves, filters, entry cards, and an AI librarian side panel.

## Goals / Non-Goals

**Goals:**

- Display private entries in a library-style interface.
- Support search, filters, sort, shelves, and entry detail navigation.
- Provide clear empty and loading states.
- Include an AI librarian panel shell for later behavior.

**Non-Goals:**

- No real AI interactions in this change.
- No advanced analytics.
- No sharing or public library.

## Decisions

- Group entries by shelf/life phase for the main browsing metaphor.
- Provide filters for emotion, tag, and life phase.
- Keep entry cards chapter-like and scannable.
- Include add-entry affordance in empty and populated states.

## Risks / Trade-offs

- Shelf UI can hide entries -> Search and filters must remain visible.
- Large datasets can slow browsing -> Add sensible query boundaries and indexes in the domain layer.
