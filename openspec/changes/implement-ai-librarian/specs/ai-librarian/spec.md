## ADDED Requirements

### Requirement: Provider abstraction
The system SHALL expose AI librarian behavior through a provider-agnostic interface with a mock provider.

#### Scenario: Mock provider is used
- **WHEN** live AI configuration is unavailable
- **THEN** the app can still generate deterministic librarian responses through the mock provider

### Requirement: Tone-controlled reflection
The system SHALL generate AI responses using user-selected Motivational, Humorous, or Wise tone.

#### Scenario: User selects tone
- **WHEN** the user requests a librarian response with a selected tone
- **THEN** the response reflects that tone while remaining supportive and non-clinical

### Requirement: AI safety boundaries
The system SHALL prevent AI librarian responses from acting as diagnosis, therapy, or crisis-authoritative guidance.

#### Scenario: Crisis-like input appears
- **WHEN** user input suggests immediate harm or crisis
- **THEN** the system returns bounded supportive language that encourages contacting trusted people or local emergency help
