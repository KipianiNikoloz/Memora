## ADDED Requirements

### Requirement: Foundation audit
The system SHALL verify that the scaffold, build, route shell, environment conventions, and Memora visual baseline are ready for product implementation.

#### Scenario: Foundation passes
- **WHEN** the audit is complete
- **THEN** the app builds, boots, and exposes the expected route shells without runtime errors

### Requirement: Auth privacy audit
The system SHALL verify that authentication, protected routes, and private data ownership behave correctly.

#### Scenario: Auth privacy passes
- **WHEN** the audit tests authentication and RLS behavior
- **THEN** unauthenticated access is blocked and cross-user private data access is denied

### Requirement: Gap remediation
The system SHALL fix foundation gaps discovered during the audit without expanding product scope.

#### Scenario: Gap is discovered
- **WHEN** the audit finds missing setup, broken auth, or weak privacy behavior
- **THEN** the change remediates the issue before later specs proceed
