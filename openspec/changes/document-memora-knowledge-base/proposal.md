## Why

Memora currently has its product intent split across a report PDF and static UI reference images, which makes future implementation depend on reinterpreting source material. This change creates a persistent, decision-complete Markdown knowledge base so future builders can implement the product consistently.

## What Changes

- Add a docs-only Memora knowledge base under `docs/memora/`.
- Synthesize the project report into product definition, personas, use cases, scope, and success criteria.
- Synthesize the UI reference deck into UX, design system, component, state, and flow decisions.
- Document the intended future technical architecture, domain model, AI librarian behavior, privacy model, safety boundaries, roadmap, and acceptance checklist.
- Add no application code, runtime configuration, package dependencies, generated assets, database migrations, or UI implementation.

## Capabilities

### New Capabilities

- `project-knowledge-base`: Defines the required Markdown knowledge base for Memora, including product, UX, design, architecture, AI, safety, and acceptance documentation.

### Modified Capabilities

- None.

## Impact

- Adds OpenSpec change artifacts under `openspec/changes/document-memora-knowledge-base/`.
- Adds Markdown documentation under `docs/memora/`.
- Does not affect public APIs, application code, dependencies, build output, database schema, or runtime behavior.
