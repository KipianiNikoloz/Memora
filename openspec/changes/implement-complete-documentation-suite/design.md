## Context

The repository already has a Memora knowledge base under `docs/memora/`. This change extends documentation from product definition into implementation-ready and maintainer-ready docs after the MVP specs exist.

## Goals / Non-Goals

**Goals:**

- Add a root README that explains the project, status, setup, scripts, architecture, testing, and demo flow.
- Add feature-level READMEs for auth, entries, library, AI librarian, insights, design system, settings/privacy, and demo readiness.
- Add visual diagrams for architecture, data flow, auth flow, memory journey, AI provider flow, and OpenSpec execution order.
- Add testing documentation covering unit, integration, E2E, coverage, fixtures, and CI expectations.
- Keep docs linked, navigable, and aligned with OpenSpec and `docs/memora/`.

**Non-Goals:**

- No marketing-only documentation detached from implementation.
- No generated API reference unless the implementation actually exposes stable APIs.
- No new app behavior.

## Decisions

- Use Markdown as the default documentation format.
- Use Mermaid diagrams for graphs and flows so visuals remain text-editable.
- Keep product knowledge in `docs/memora/` and add implementation/operation docs alongside it.
- Add feature READMEs near feature modules when code exists, or under `docs/features/` if the code structure does not yet support colocated docs.
- Add a documentation index so readers can enter from either root README or `docs/`.

## Risks / Trade-offs

- Documentation can duplicate the knowledge base -> Link to source docs and summarize only what implementers need in feature docs.
- Diagrams can drift -> Prefer Mermaid diagrams close to the docs they explain.
- Feature README locations depend on final code structure -> Default to `docs/features/` unless an implemented module has a natural home.
