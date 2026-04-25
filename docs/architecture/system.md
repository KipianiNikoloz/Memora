# System Architecture

Memora is implemented as a Next.js App Router application with a demo/local data path and Supabase-ready production boundaries. The product centers on private memory entries, shelf-based browsing, supportive AI reflection, insights, settings, and optional XRPL Testnet milestone badges.

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

## Runtime Topology

- `app/` contains App Router pages and API routes.
- `components/MemoraClient.tsx` owns client runtime state, demo persistence, Supabase session hydration, and feature actions.
- `lib/` contains domain types, validation, demo data, insights, AI workflow/runtime adapters, Supabase mappers, and XRPL helpers.
- `supabase/migrations/` defines the production tables and RLS policies for profiles, memory entries, and milestone badges.
- `tests/` covers domain behavior, runtime clients, Supabase mapping, integration behavior, and browser journeys.

## Data Flow

1. User signs in through demo mode or Supabase-backed auth.
2. User creates a memory entry with title, memory, lesson, emotion, tags, life phase, and tone.
3. The entry is persisted to the private store.
4. AI librarian mock behavior adds title and reflection.
5. Library, Insights, and Settings read only the current user's entries.

```mermaid
sequenceDiagram
  participant U as User
  participant UI as Memora UI
  participant C as MemoraProvider
  participant AI as AI Runtime
  participant Store as Demo or Supabase Store
  U->>UI: Submit New Entry draft
  UI->>C: validate and create MemoryEntry
  C->>AI: suggestTitle and reflect
  AI-->>C: AiResult text and provider metadata
  C->>Store: Persist entry with AI fields
  Store-->>C: Saved entry
  C-->>UI: Updated Library, Entry Detail, Insights
```

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

## AI Provider Flow

The AI Librarian uses a stable task interface for title suggestions, reflections, revisit prompts, and summaries. Demo mode always uses deterministic mock behavior for reliable demos and tests. Supabase mode can request the Google provider through environment variables, but the LangGraph workflow validates output and falls back to mock behavior when the model path is unavailable or unsafe.

```mermaid
flowchart TD
  Request[AI task request] --> Runtime[getAiRuntimeConfig]
  Runtime --> Mode{Runtime mode}
  Mode -->|demo| Mock[Mock provider]
  Mode -->|supabase| Provider{MEMORA_AI_PROVIDER + API key}
  Provider -->|google configured| Graph[LangGraph workflow]
  Provider -->|missing config| Mock
  Graph --> Prompt[Build prompt]
  Prompt --> Model[Google GenAI]
  Model --> Validate[Validate response length and safety]
  Validate -->|valid| Result[AiResult]
  Validate -->|invalid or failed| Mock
  Mock --> Result
```

## XRPL Badge Flow

Milestone badges are optional user-confirmed keepsakes for eligible Proud or Milestones entries. Private memory content never goes into public NFT metadata.

```mermaid
sequenceDiagram
  participant U as User
  participant UI as Badge Action
  participant API as Next API
  participant XRPL as XRPL Testnet
  participant Store as Badge Store
  U->>UI: Issue milestone badge
  UI->>Store: Create pending badge
  UI->>API: POST entry and recipient seed
  API->>XRPL: Mint NFT from issuer
  API->>XRPL: Create destination sell offer
  API->>XRPL: Accept offer as recipient
  XRPL-->>API: Token and transaction ids
  API-->>UI: Issue result
  UI->>Store: Save issued or failed badge state
```

## Deployment and CI/CD

- Local demo mode requires no external credentials.
- Supabase mode requires `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, and `NEXT_PUBLIC_MEMORA_DEMO_MODE=false`.
- Live AI requires `MEMORA_AI_PROVIDER=google` and either `GEMINI_API_KEY` or `GOOGLE_API_KEY`.
- XRPL issuance requires a server-side `XRPL_TESTNET_ISSUER_SEED`.
- CI is expected to run typecheck, coverage, docs checks, build, and Playwright E2E before production deployment.

## Boundaries

- Demo mode uses local browser storage for hackathon reliability.
- Supabase helpers and migrations define the cloud path.
- AI behavior goes through a provider abstraction and defaults to deterministic mock behavior.
- XRPL is Testnet-only in the current implementation.
- AI output is supportive reflection only; it must not present therapy, diagnosis, clinical scoring, or emergency guidance as product capability.
