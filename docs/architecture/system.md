# System Architecture

Memora is implemented as a Next.js App Router application with a demo/local data path and Supabase-ready boundaries.

```mermaid
flowchart LR
  Visitor[Visitor] --> Home[Public Home]
  Home --> Auth[Auth Flow]
  Auth --> App[Authenticated App Shell]
  App --> Entry[New Entry]
  App --> Library[Library Explorer]
  App --> Insights[Insights]
  App --> Settings[Settings]
  Entry --> Store[(Private Entry Store)]
  Library --> Store
  Insights --> Store
  Store --> AI[AI Librarian Adapter]
  AI --> Mock[Mock Provider]
  AI -. optional .-> Live[Live AI Provider]
  Store -. cloud mode .-> Supabase[(Supabase Postgres + RLS)]
```

## Data Flow

1. User signs in through demo mode or Supabase-backed auth.
2. User creates a memory entry with title, memory, lesson, emotion, tags, life phase, and tone.
3. The entry is persisted to the private store.
4. AI librarian mock behavior adds title and reflection.
5. Library, Insights, and Settings read only the current user's entries.

## Auth and RLS Flow

```mermaid
sequenceDiagram
  participant U as User
  participant A as Next.js App
  participant S as Supabase Auth
  participant DB as Postgres RLS
  U->>A: Submit email auth
  A->>S: Create or restore session
  S-->>A: User identity
  A->>DB: Query rows with user_id
  DB-->>A: Rows where auth.uid() = user_id
```

## Boundaries

- Demo mode uses local browser storage for hackathon reliability.
- Supabase helpers and migrations define the cloud path.
- AI behavior goes through a provider abstraction and defaults to deterministic mock behavior.
