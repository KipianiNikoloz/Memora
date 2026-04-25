## Context

The knowledge base defines Memora as a warm, library-like reflection product. The repository currently has docs and OpenSpec artifacts but no app implementation.

## Goals / Non-Goals

**Goals:**

- Create a runnable Next.js App Router app.
- Establish the Memora visual foundation from the docs.
- Add public and app route shells for later specs.
- Provide local build/test/lint conventions.

**Non-Goals:**

- No Supabase integration.
- No real memory data.
- No AI behavior.
- No finished product screens.

## Decisions

- Use Next.js App Router with TypeScript as the locked app stack.
- Use CSS variables for design tokens so later UI specs share one visual source.
- Add route shells for public, auth, and app areas without implementing feature logic.
- Use mock/static placeholder content only where needed to verify layout.

## Risks / Trade-offs

- Early scaffolding can overfit later screens -> Keep components minimal and reusable.
- Visual foundation can drift from docs -> Reference `docs/memora/design-system.md` directly in tasks.
