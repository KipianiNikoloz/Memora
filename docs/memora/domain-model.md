# Domain Model

This is a conceptual model for future implementation. It is not a database schema.

## User

A person who owns a private Memora library. MVP users are individuals, not organizations.

Important concepts:

- Account identity.
- Private library ownership.
- Preference for AI tone.
- Privacy and export/delete expectations.

## Library

The user's complete collection of entries. A library is browsed through shelves, filters, search, and revisit recommendations.

## Entry

A meaningful memory saved as a titled chapter.

Expected fields:

- Title or AI-suggested chapter title.
- What happened.
- What the user learned.
- Emotional state.
- Life phase or shelf.
- Tags.
- Event date or approximate period.
- Created date.
- Updated date.
- AI librarian response.
- AI tone used.

## Emotion

An emotional label attached to an entry. Initial values should include Happy, Stressed, Proud, and Disappointed, with room for Grateful, Anxious, Frustrated, and Other.

Emotion labels should help structure reflection, not rank or judge the user.

## Life Phase / Shelf

A shelf groups entries by life phase or theme. Example shelves include New Beginnings, Growth and Learning, and Relationships.

## Tag

A flexible user-facing categorization label. Tags support search, filtering, theme browsing, and future insight generation.

## AI Librarian Response

A supportive response generated for an entry or revisit moment. The response should include encouragement or insight, respect the selected tone, and avoid clinical claims.

## Insight

A derived observation about patterns in memories, emotions, milestones, or revisit opportunities. Insights should be framed gently and avoid deterministic interpretation.
