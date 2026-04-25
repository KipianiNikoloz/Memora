## ADDED Requirements

### Requirement: Repeatable demo path
The system SHALL provide a documented, repeatable path to demonstrate the Memora MVP end to end.

#### Scenario: Demo is run
- **WHEN** a presenter follows the demo checklist
- **THEN** they can show sign-in, entry creation, library browsing, AI reflection, insights, and privacy/settings surfaces

### Requirement: Mock AI demo fallback
The system SHALL support demoing AI librarian behavior without live AI credentials.

#### Scenario: Live AI is unavailable
- **WHEN** the app runs in demo mode without live AI configuration
- **THEN** the mock provider supplies stable AI librarian behavior

### Requirement: Final MVP verification
The system SHALL pass build, test, smoke, and acceptance checklist verification before being considered demo-ready.

#### Scenario: MVP is verified
- **WHEN** final readiness checks run
- **THEN** the app satisfies the Hackathon MVP checklist from `docs/memora/roadmap-and-acceptance.md`
