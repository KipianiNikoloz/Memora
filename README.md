# Memora

Every life deserves a library.

Memora is a personal reflection platform that turns meaningful life moments into structured chapters users can revisit. It is built around a calm library metaphor: memories become entries, emotional tags become categories, life phases become shelves, and the AI Librarian offers supportive reflection without becoming clinical advice.

## Current Status

This repository contains a hackathon-ready MVP implementation plus a full OpenSpec-driven project plan.

Implemented MVP surfaces:

- Public homepage
- Demo-friendly auth flow
- Private memory entry capture
- Shelf-based Library Explorer
- Entry detail and delete flow
- AI Librarian mock provider with tone modes
- Insights dashboard
- Settings, privacy, and safety surfaces
- Supabase-ready helpers and RLS migration
- Unit, integration, coverage, and Playwright E2E tests
- Product, feature, architecture, testing, and demo documentation

## Quick Start

```bash
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:3000
```

The app runs in demo mode without live Supabase or AI credentials. Demo data is stored in browser local storage. To connect Supabase later, copy `.env.example` to `.env.local` and provide the project URL and anon key.

## Core Commands

```bash
npm run dev            # Start local app
npm run build          # Production build
npm run lint           # TypeScript check
npm run test           # Unit and integration tests
npm run test:coverage  # Coverage report
npm run test:e2e       # Playwright browser tests
npm run test:full      # Typecheck + tests + E2E
npm run docs:check     # Documentation structure check
```

## Repository Map

```text
app/                 Next.js App Router routes
components/          Shared UI and app shell components
lib/                 Domain logic, AI mock, insights, validation, Supabase helpers
tests/               Unit, integration, and E2E tests
supabase/            SQL migrations and RLS policies
docs/                Product, feature, architecture, testing, and demo docs
openspec/            OpenSpec change suite and capability specs
static/              Original report and UI reference assets
scripts/             Utility scripts such as docs checks
```

## Documentation

Start here:

- [Documentation Index](docs/README.md)
- [Memora Product Knowledge Base](docs/memora/README.md)
- [System Architecture](docs/architecture/system.md)
- [Testing Strategy](docs/testing.md)
- [Demo Runbook](docs/demo-runbook.md)
- [Feature Documentation](docs/features)

## OpenSpec Workflow

The project is organized through OpenSpec changes in `openspec/changes/`.

The main orchestrator is:

```text
execute-memora-mvp-spec-suite
```

That change sequences the full MVP build: foundation, auth, memory domain, product flows, AI, insights, design system, settings/privacy, audits, testing, documentation, and demo readiness.

Useful commands:

```bash
openspec list
openspec validate execute-memora-mvp-spec-suite --strict
```

## Supabase Path

The MVP can run locally without Supabase, but the repo includes the cloud data path:

- Supabase SSR helpers in `lib/supabase/`
- Environment contract in `.env.example`
- RLS-backed schema in `supabase/migrations/0001_memora_entries.sql`

The intended production invariant is that memory entries are private by default and user-owned through RLS policies.

## AI Librarian

The MVP uses a deterministic mock AI provider so demos and tests do not depend on live AI credentials.

Supported behavior:

- Chapter title suggestions
- Entry reflections
- Revisit prompts
- Insight summaries
- Tone modes: Motivational, Humorous, Wise
- Crisis-like input boundary response

Memora AI must remain supportive and reflective. It must not diagnose, treat, or replace emergency or clinical support.

## Testing Baseline

The implemented suite currently covers:

- Entry validation and tag parsing
- AI tone behavior and safety boundaries
- Insight generation
- Private data ownership behavior
- Homepage to auth to library journey
- New Entry creation and revisit flow
- Insights, Settings, and AI Librarian navigation
- Desktop and mobile Playwright projects

Run the full local gate with:

```bash
npm run test:full
npm run test:coverage
npm run docs:check
```

## CI/CD

GitHub Actions now runs the full quality gate for pull requests to `main` and pushes to `main`:

```bash
npm run lint
npm run test:coverage
npm run docs:check
npm run build
npm run test:e2e
```

When CI succeeds on `main`, the production deployment workflow applies Supabase migrations and deploys prebuilt Vercel production artifacts.

Required GitHub repository secrets:

- `SUPABASE_ACCESS_TOKEN`
- `SUPABASE_DB_PASSWORD`
- `SUPABASE_PROJECT_ID`
- `VERCEL_TOKEN`
- `VERCEL_ORG_ID`
- `VERCEL_PROJECT_ID`

Required Vercel production environment variables:

- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `NEXT_PUBLIC_MEMORA_DEMO_MODE=false`

This pipeline prepares and deploys the production infrastructure path. The current app state layer still uses the existing local/demo provider until a separate Supabase-backed app data flow change is implemented.

## Demo Flow

For a reliable hackathon demo:

1. Run `npm run dev`.
2. Open the homepage.
3. Click `Start your library`.
4. Use the prefilled demo auth form.
5. Browse the seeded Library.
6. Add a New Entry.
7. Open the generated AI reflection.
8. Visit Insights.
9. Visit Settings to show privacy and tone controls.

See [Demo Runbook](docs/demo-runbook.md) for the full path.

## Safety Boundary

Memora is a reflection product, not a medical product. The app should never present AI output as diagnosis, treatment, therapy, or crisis management. If a user enters crisis-like content, the product should respond with care, encourage immediate human or emergency support, and avoid long reflective analysis.
