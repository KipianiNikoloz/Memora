# User Experience

## Experience Principles

Memora should feel like a calm library, not a productivity dashboard. The experience must be reflective rather than clinical, structured without being heavy, fast for capture, deep for revisiting, and guided without taking control away from the user.

## Information Architecture

Public pages:

- Home
- How it works
- Use cases
- Sign up

Application areas:

- Library
- New Entry
- Insights
- AI Librarian
- Settings

## Core Journeys

### Capture a Memory

The user experiences a meaningful moment, adds a new entry, chooses an emotion, writes what happened, writes what they learned, saves the entry as a titled chapter, and receives an AI librarian response.

The New Entry screen should include:

- Moment title input.
- Emotion chips.
- Reflection prompt for what happened.
- Reflection prompt for what the moment taught.
- Save to library action.
- AI-suggested chapter title after save.

### Reconnect With Growth

The user opens the library, filters by emotion or life phase, reads a past entry, compares then-versus-now perspective, and receives encouragement or insight from the AI librarian.

## Product Screens

### Home

The homepage explains the product in one glance, builds emotional trust, and drives users to begin. The hero message is "Every life deserves a library." Supporting copy should explain that users can turn memories into structured knowledge and grow through reflection.

### Library Explorer

The Library is the primary app surface. It should support search, filters, shelves, entry cards styled like books or chapters, an add-memory affordance, and an AI librarian side panel with actions such as find a memory, browse by theme, surprise me, and add a new memory.

Shelves should include examples like New Beginnings, Growth and Learning, and Relationships, while remaining extensible.

### Insights Dashboard

Insights should visualize growth over time without becoming a clinical or productivity dashboard. It should include mood trends, milestone highlights, revisit recommendations, and an AI summary written in a supportive tone.

### Auth

Authentication should feel simple and trustworthy. The reference direction includes email, password, create account, log in, terms, and privacy policy affordances.

## States

- Empty: present a warm first-shelf waiting state with a clear add-first-entry action.
- Loading: use calm library language such as organizing your library.
- Error: clearly state what failed and provide a retry action.
- Disabled: preserve visual clarity and avoid making the user feel blocked without explanation.
- Focus: make keyboard focus visible and consistent.
- Validation: explain the problem in plain language without judgment.
