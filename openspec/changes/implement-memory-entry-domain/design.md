## Context

The domain docs define entries as titled chapters containing what happened, what the user learned, emotion, tags, life phase, dates, and AI metadata.

## Goals / Non-Goals

**Goals:**

- Persist private memory entries.
- Support CRUD operations for the owning user.
- Represent emotions, tags, shelves/life phases, and AI metadata.
- Enforce validation and RLS ownership.

**Non-Goals:**

- No polished product screens.
- No real AI generation.
- No analytics or insight calculations.

## Decisions

- Keep entries user-owned and private by default.
- Model emotions and shelves in a way that supports MVP defaults and future extensibility.
- Store AI response metadata without requiring a live AI provider yet.
- Prefer explicit validation at the domain boundary.

## Risks / Trade-offs

- Over-modeling can slow the MVP -> Keep schema focused on documented MVP fields.
- Under-modeling can block insights -> Include timestamps, emotion, tags, and life phase from the start.
