## ADDED Requirements

### Requirement: Runnable Next.js foundation
The system SHALL provide a runnable Next.js App Router application using TypeScript and project scripts for development, build, lint, and test verification.

#### Scenario: App boots locally
- **WHEN** the developer runs the documented dev command
- **THEN** the Memora app starts and renders the public home route without runtime errors

### Requirement: Memora visual baseline
The system SHALL define global styles, fonts, and design tokens that match the Memora knowledge base.

#### Scenario: Design tokens exist
- **WHEN** a developer inspects the styling foundation
- **THEN** parchment, burgundy, terracotta, dusty rose, gold, teal, Cormorant Garamond, and Inter are available for later screens

### Requirement: Route shell
The system SHALL provide route shells for public pages, auth pages, and authenticated app pages.

#### Scenario: Route groups are available
- **WHEN** later specs add product screens
- **THEN** they can place screens into established public, auth, and app areas without reorganizing the app
