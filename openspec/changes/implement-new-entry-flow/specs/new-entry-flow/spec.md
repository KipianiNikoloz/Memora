## ADDED Requirements

### Requirement: New entry form
The system SHALL provide an authenticated New Entry screen with moment title, emotion, memory text, lesson/reflection, tags, and life phase controls.

#### Scenario: User views form
- **WHEN** an authenticated user opens New Entry
- **THEN** the app shows the documented capture prompts and save action

### Requirement: Entry save
The system SHALL save valid new entries to the user's private library.

#### Scenario: User saves valid entry
- **WHEN** the user submits a valid entry
- **THEN** the entry is persisted for that user and the app confirms the save

### Requirement: Entry form states
The system SHALL provide loading, validation, and error states using calm Memora language.

#### Scenario: Save fails
- **WHEN** the entry cannot be saved
- **THEN** the app explains the failure and offers a retry path
