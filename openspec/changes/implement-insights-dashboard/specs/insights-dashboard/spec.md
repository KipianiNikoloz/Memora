## ADDED Requirements

### Requirement: Insights dashboard
The system SHALL provide an authenticated Insights dashboard using the user's private memory entries.

#### Scenario: User opens insights
- **WHEN** an authenticated user opens Insights
- **THEN** the app shows reflective insight sections based only on that user's entries

### Requirement: Mood and milestone summaries
The system SHALL show mood trends, milestone highlights, and revisit recommendations without clinical or score-like framing.

#### Scenario: Insights are displayed
- **WHEN** the user has enough entries for insight generation
- **THEN** the app presents patterns as gentle observations rather than judgments

### Requirement: Low-data state
The system SHALL provide a helpful low-data state when insights cannot yet be meaningfully generated.

#### Scenario: Not enough entries
- **WHEN** the user has too few entries
- **THEN** the app explains that more memories are needed and offers a clear add-entry action
