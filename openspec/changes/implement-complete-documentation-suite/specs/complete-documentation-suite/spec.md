## ADDED Requirements

### Requirement: Main project README
The system SHALL provide a root-level README that explains Memora, setup, scripts, architecture, testing, demo flow, and links to the full documentation suite.

#### Scenario: New contributor opens repository
- **WHEN** a contributor opens the main README
- **THEN** they can understand what Memora is, how to run it, how to test it, where docs live, and how OpenSpec changes are organized

### Requirement: Feature documentation
The system SHALL provide detailed README-style documentation for each major MVP feature area.

#### Scenario: Developer studies a feature
- **WHEN** a developer opens a feature README
- **THEN** they can understand the feature purpose, user flows, implementation boundaries, important files, tests, and related OpenSpec specs

### Requirement: Architecture and data-flow documentation
The system SHALL document system architecture, data model, auth flow, private data ownership, AI provider flow, and key user journeys with visual aids.

#### Scenario: Architecture docs are viewed
- **WHEN** a reader opens the architecture documentation
- **THEN** they see text explanations plus diagrams that clarify system structure and data flow

### Requirement: Testing documentation
The system SHALL document the testing strategy, commands, coverage gates, fixtures, CI expectations, and how to debug failing tests.

#### Scenario: Developer runs tests
- **WHEN** a developer follows the testing docs
- **THEN** they can run unit, integration, E2E, coverage, and full-suite commands successfully

### Requirement: Safety and privacy documentation
The system SHALL document privacy expectations, RLS ownership model, AI safety boundaries, crisis-like input handling, and non-clinical product language.

#### Scenario: Safety behavior is reviewed
- **WHEN** a maintainer reviews AI or privacy behavior
- **THEN** the docs explain the intended boundaries and link to relevant implementation and tests

### Requirement: Documentation visual aids
The system SHALL include visual aids and graphs for important architecture, flow, dependency, and execution concepts.

#### Scenario: Visual aid is needed
- **WHEN** a concept spans multiple components or specs
- **THEN** the documentation includes a Mermaid diagram or equivalent visual aid

### Requirement: Documentation maintenance
The system SHALL include guidance for keeping documentation current as OpenSpec changes are applied.

#### Scenario: Feature changes later
- **WHEN** a future spec changes feature behavior
- **THEN** maintainers can identify which docs must be updated
