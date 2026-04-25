## ADDED Requirements

### Requirement: Library browsing
The system SHALL display the authenticated user's private memory entries in a library-style explorer with shelves and entry cards.

#### Scenario: User opens library
- **WHEN** an authenticated user opens the Library
- **THEN** the app shows only that user's entries grouped for browsing

### Requirement: Search and filters
The system SHALL support searching and filtering entries by emotion, tag, and life phase or shelf.

#### Scenario: User filters memories
- **WHEN** the user applies a filter
- **THEN** the library updates to show matching private entries

### Requirement: Revisit navigation
The system SHALL allow users to open an entry detail view from the library.

#### Scenario: User opens entry
- **WHEN** the user selects an entry card
- **THEN** the app navigates to a detail view for that entry
