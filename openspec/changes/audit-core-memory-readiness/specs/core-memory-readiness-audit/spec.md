## ADDED Requirements

### Requirement: Memory workflow audit
The system SHALL verify that private memory creation, persistence, browsing, filtering, and entry detail navigation work end to end.

#### Scenario: Core workflow passes
- **WHEN** the audit exercises create, browse, filter, and revisit behavior
- **THEN** the app completes the workflow using only the signed-in user's private entries

### Requirement: Core state audit
The system SHALL verify empty, loading, validation, and error states for New Entry and Library.

#### Scenario: States pass
- **WHEN** the audit triggers core memory states
- **THEN** the app shows calm Memora-aligned language and clear recovery actions

### Requirement: Core gap remediation
The system SHALL fix missing core memory behavior discovered during the audit without adding AI or insights scope.

#### Scenario: Core gap is found
- **WHEN** the audit finds missing behavior or tests
- **THEN** the change remediates the gap before later specs proceed
