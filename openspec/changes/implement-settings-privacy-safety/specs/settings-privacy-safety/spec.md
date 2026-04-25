## ADDED Requirements

### Requirement: Settings surface
The system SHALL provide an authenticated settings area for user preferences and privacy information.

#### Scenario: User opens settings
- **WHEN** an authenticated user opens Settings
- **THEN** they can view privacy information and manage supported preferences

### Requirement: AI tone preference
The system SHALL allow users to choose a default AI librarian tone while preserving per-interaction tone control.

#### Scenario: Default tone is set
- **WHEN** the user selects a default tone
- **THEN** future AI interactions use that tone unless the user changes it for the interaction

### Requirement: Privacy and safety controls
The system SHALL provide clear controls and copy for private data, deletion expectations, terms/privacy links, and wellness boundaries.

#### Scenario: User reviews privacy
- **WHEN** the user checks privacy or safety information
- **THEN** the app clearly explains private memories, editable data, and non-clinical AI boundaries
