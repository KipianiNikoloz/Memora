## Context

The UI reference defines New Entry with moment title, emotion chips, what happened, what did I learn, and save to library.

## Goals / Non-Goals

**Goals:**

- Make entry capture fast and emotionally gentle.
- Persist valid entries through the domain layer.
- Show loading, success, validation, and error states.
- Leave a clear integration point for AI title suggestions.

**Non-Goals:**

- No full library browsing.
- No live AI generation unless provided by a later spec.
- No complex rich-text editor.

## Decisions

- Use simple text inputs and textarea prompts for MVP.
- Use documented emotion chips with an Other option.
- Keep the save action primary and clear.
- Redirect or link to the saved entry/library after success.

## Risks / Trade-offs

- Too many fields can slow capture -> Keep required inputs minimal and optional metadata lightweight.
- Emotional errors can feel harsh -> Use calm copy for validation and save failures.
