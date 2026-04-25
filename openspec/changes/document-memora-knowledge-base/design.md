## Context

Memora's source material exists as a project report and a UI reference deck. The project needs a durable knowledge base before application implementation begins so product, design, AI, privacy, and architecture decisions are not lost or re-decided later.

The implementation surface for this change is intentionally documentation-only. The OpenSpec artifacts define the change, while the delivered product knowledge base lives under `docs/memora/` as Markdown.

## Goals / Non-Goals

**Goals:**

- Create a decision-complete Markdown knowledge base for Memora.
- Preserve the report's product concept, problem, solution, value proposition, use cases, and future potential.
- Preserve the UI deck's personas, journeys, information architecture, visual language, components, states, and constraints.
- Document intended future implementation decisions for Next.js, Supabase, and an abstracted AI librarian without implementing them.
- Make privacy, wellness, and non-clinical AI boundaries explicit before product work begins.

**Non-Goals:**

- Do not build the web application.
- Do not create runtime code, package manifests, migrations, generated assets, tests, or configuration.
- Do not modify existing static source files.
- Do not treat AI output as medical, diagnostic, or therapeutic advice.

## Decisions

- Store documentation in `docs/memora/`.
  - Rationale: Keeps the knowledge base grouped, discoverable, and easy to extend.
  - Alternative considered: Flat files directly under `docs/`; rejected because multiple product areas would become harder to navigate.
- Create one OpenSpec capability named `project-knowledge-base`.
  - Rationale: This change introduces documentation capability rather than app behavior.
  - Alternative considered: Separate specs for product, UX, AI, and safety; rejected because the implementation is one cohesive docs-only deliverable.
- Document future architecture at conceptual level only.
  - Rationale: The user wants a persistent project definition now, not a code scaffold.
  - Alternative considered: Add schema or route stubs; rejected because they would violate the docs-only constraint.
- Treat individual users as the MVP audience.
  - Rationale: The report and UI deck repeatedly frame individual self-reflection as primary, with corporate/HR as future expansion.
  - Alternative considered: Design for organizations first; rejected because privacy and trust needs would dominate the MVP.
- Define AI librarian as supportive reflection.
  - Rationale: The report specifies motivational, humorous, and wise responses; the UI deck requires supportive, non-therapeutic guidance.
  - Alternative considered: Therapeutic coaching; rejected because it creates safety and regulatory risk outside project scope.

## Risks / Trade-offs

- Documentation may become stale -> Include source references, decision status, and an acceptance checklist to guide updates.
- Future builders may over-interpret conceptual architecture as implementation detail -> Label architecture as intended future design, not shipped code.
- The library metaphor could become decorative rather than functional -> Document concrete mappings from memories, shelves, archives, emotions, and entries to product behavior.
- Sensitive emotional data may be underprotected in future work -> Make private defaults, user control, and wellness boundaries explicit in the knowledge base.
