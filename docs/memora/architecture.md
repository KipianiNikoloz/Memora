# Architecture

This document records intended future implementation direction. It does not define shipped code in this docs-only change.

## Target Stack

- Next.js App Router for the web application.
- Supabase Auth for email-based accounts.
- Supabase Postgres for private per-user entries and related metadata.
- Row Level Security for user-owned data.
- AI provider adapter for librarian behavior.
- Mock AI provider for tests, demos, and development.

## Application Areas

- Public marketing and trust pages.
- Auth flow.
- Library explorer.
- New entry flow.
- Entry detail and edit flow.
- Insights dashboard.
- AI librarian side panel.
- Settings and privacy controls.

## Data Flow

1. User signs in.
2. User creates a new entry with title, memory, reflection, emotion, tags, and life phase.
3. App saves the private entry.
4. AI provider adapter receives only the necessary entry context.
5. AI librarian returns a title suggestion, reflection, or insight.
6. User revisits entries through search, filters, shelves, recommendations, or AI assistance.

## Security Expectations

- Entries are private by default.
- Users can edit and delete emotional data.
- Database access must enforce user ownership.
- AI calls should minimize sensitive context.
- Settings should make privacy expectations clear.

## Implementation Boundaries

This knowledge base intentionally avoids concrete route, table, and component code. Those details should be created in later implementation changes that reference these docs and introduce their own OpenSpec proposals.
