## Why

Memora's core product is the private memory entry. The app needs a durable domain model and CRUD behavior before entry, library, AI, and insights experiences can be built.

## What Changes

- Add data model for memory entries, emotions, tags, shelves/life phases, AI response metadata, and timestamps.
- Add private CRUD behavior for authenticated users.
- Add validation and ownership checks.
- Do not build final user-facing entry or library screens in this change.

## Capabilities

### New Capabilities

- `memory-entry-domain`: Provides private memory-entry persistence, validation, and domain operations.

### Modified Capabilities

- None.

## Impact

- Adds database migrations and domain access layer.
- Establishes the data contract used by entry flow, library, AI, and insights specs.
