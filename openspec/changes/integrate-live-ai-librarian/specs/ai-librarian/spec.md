## MODIFIED Requirements

### Requirement: Provider abstraction
The system SHALL expose AI librarian behavior through a provider-agnostic async interface with a mock provider and a live Google GenAI provider.

#### Scenario: Mock provider is used
- **WHEN** demo mode is active, live AI is unconfigured, or the live provider fails
- **THEN** the app can still generate deterministic librarian responses through the mock provider

#### Scenario: Live provider is configured
- **WHEN** `MEMORA_AI_PROVIDER=google` and a Google API key is configured
- **THEN** the app generates supported librarian responses through the server-side Google GenAI provider

### Requirement: Tone-controlled reflection
The system SHALL generate AI responses using user-selected Motivational, Humorous, or Wise tone.

#### Scenario: User selects tone
- **WHEN** the user requests a librarian response with a selected tone
- **THEN** the response reflects that tone while remaining supportive and non-clinical

### Requirement: AI safety boundaries
The system SHALL prevent AI librarian responses from acting as diagnosis, therapy, or crisis-authoritative guidance.

#### Scenario: Crisis-like input appears
- **WHEN** user input suggests immediate harm or crisis
- **THEN** the system returns bounded supportive language that encourages contacting trusted people or local emergency help without sending the crisis reflection prompt to the live provider

## ADDED Requirements

### Requirement: LangGraph AI workflow
The system SHALL route live AI requests through a LangGraph workflow with deterministic safety, prompt building, provider generation, response validation, and fallback steps.

#### Scenario: Provider response is invalid
- **WHEN** the live provider returns malformed JSON, empty text, or disallowed guidance
- **THEN** the workflow falls back to the mock provider response

### Requirement: Server-only AI secrets
The system SHALL keep AI provider credentials and provider prompts server-side.

#### Scenario: Client requests AI output
- **WHEN** a client component needs a title, reflection, revisit prompt, or summary
- **THEN** it calls the server AI API and never imports the live provider or reads provider credentials

### Requirement: Privacy-minimized AI context
The system SHALL send only the minimum memory context needed for each requested AI task.

#### Scenario: Summary request
- **WHEN** the app asks for a library summary
- **THEN** the AI request includes concise entry fields rather than unnecessary private account or auth data
