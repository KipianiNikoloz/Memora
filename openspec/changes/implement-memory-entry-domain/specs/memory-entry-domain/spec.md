## ADDED Requirements

### Requirement: Private memory entries
The system SHALL allow authenticated users to create, read, update, and delete their own private memory entries.

#### Scenario: Owner manages entry
- **WHEN** an authenticated user creates and edits a memory entry
- **THEN** only that user can read, update, or delete the entry

### Requirement: Entry structure
The system SHALL store each entry with title, memory text, lesson/reflection, emotion, tags, life phase or shelf, timestamps, and optional AI response metadata.

#### Scenario: Entry is saved with structure
- **WHEN** a user saves a valid entry
- **THEN** the system persists the structured fields needed for library browsing, AI reflection, and insights

### Requirement: Entry validation
The system SHALL validate required entry fields and return calm, non-judgmental errors.

#### Scenario: Invalid entry is rejected
- **WHEN** a user submits an entry missing required content
- **THEN** the system rejects the save and explains the issue clearly
