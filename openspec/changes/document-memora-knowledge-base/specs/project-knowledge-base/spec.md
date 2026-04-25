## ADDED Requirements

### Requirement: Docs-only knowledge base
The change SHALL deliver Memora's persistent project knowledge base as Markdown files under `docs/memora/` and MUST NOT implement application code, runtime configuration, migrations, generated assets, or package changes.

#### Scenario: Documentation files are created
- **WHEN** the change is implemented
- **THEN** the repository contains Memora knowledge base Markdown files under `docs/memora/`

#### Scenario: No application implementation is introduced
- **WHEN** the change is reviewed
- **THEN** product implementation changes are limited to `docs/**/*.md`

### Requirement: Product source synthesis
The knowledge base SHALL synthesize `static/Report.pdf` into product documentation covering the vision, problem, solution, value proposition, use cases, goals, non-goals, and future potential.

#### Scenario: Report concepts are represented
- **WHEN** a reader opens the product documentation
- **THEN** they can understand Memora as a personal library of memories, emotions, life phases, archives, and self-reflection

### Requirement: UI source synthesis
The knowledge base SHALL synthesize the `static/ui` reference deck into UX and design documentation covering personas, journeys, information architecture, screens, visual identity, components, interaction states, and critical constraints.

#### Scenario: UI deck decisions are represented
- **WHEN** a future implementer reads the UX and design documentation
- **THEN** they can reproduce the intended warm, structured, reflective Memora experience without reopening the UI images

### Requirement: Future implementation guidance
The knowledge base SHALL document the intended future architecture, conceptual domain model, and acceptance criteria without creating executable implementation.

#### Scenario: Builder guidance is decision-complete
- **WHEN** implementation begins in a later change
- **THEN** the implementer can identify the intended stack, core entities, major screens, data flows, and MVP acceptance criteria from the docs

### Requirement: AI librarian and safety guidance
The knowledge base SHALL document AI librarian behavior, tone modes, user controls, privacy expectations, and wellness safety boundaries.

#### Scenario: AI behavior is constrained
- **WHEN** a future AI feature is implemented
- **THEN** the docs define supportive motivational, humorous, and wise tones while excluding diagnostic, therapeutic, or crisis-authoritative responses
