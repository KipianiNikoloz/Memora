## ADDED Requirements

### Requirement: Unit test coverage
The system SHALL include unit tests for domain validation, memory-entry helpers, AI librarian prompt/safety behavior, insight calculations, and reusable UI state logic.

#### Scenario: Unit tests run
- **WHEN** the unit test command is executed
- **THEN** core logic tests run deterministically without live Supabase or live AI dependencies

### Requirement: Integration test coverage
The system SHALL include integration tests for Supabase auth/session behavior, private memory persistence, RLS ownership, server actions or API boundaries, and AI provider abstraction.

#### Scenario: Integration tests run
- **WHEN** the integration test command is executed against the configured test environment
- **THEN** auth, private data, and provider-boundary behavior is verified with controlled fixtures

### Requirement: End-to-end journey coverage
The system SHALL include browser end-to-end tests for the primary Memora MVP journeys.

#### Scenario: E2E tests run
- **WHEN** the end-to-end suite is executed
- **THEN** it verifies homepage, auth, New Entry, Library, entry detail, AI Librarian mock behavior, Insights, Settings, and privacy/safety surfaces

### Requirement: Accessibility and responsive checks
The system SHALL include automated checks for basic accessibility, keyboard focus, and responsive rendering of critical screens.

#### Scenario: Accessibility checks run
- **WHEN** critical UI journeys are tested
- **THEN** the suite verifies keyboard navigation, visible focus, readable content, and no obvious mobile/desktop layout breakage

### Requirement: Coverage gates
The system SHALL report test coverage and enforce documented thresholds before the MVP can be considered complete.

#### Scenario: Coverage gate fails
- **WHEN** coverage falls below the documented threshold
- **THEN** the full test command fails and reports the missing coverage area

### Requirement: CI-ready test commands
The system SHALL provide documented commands for unit, integration, end-to-end, coverage, and full test execution.

#### Scenario: Developer runs full suite
- **WHEN** a developer runs the documented full test command
- **THEN** all required automated checks execute in the expected order and produce actionable output
