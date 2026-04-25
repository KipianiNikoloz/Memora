## Context

Memora is a Next.js App Router application using npm, TypeScript checks, Vitest coverage gates, Playwright E2E tests, documentation checks, and Supabase migration files. The app is intended to deploy to Vercel and use Supabase production credentials, while the current client data path still relies on the existing local/demo provider.

## Goals / Non-Goals

**Goals:**

- Run deterministic CI checks on pull requests and pushes to `main`.
- Keep production deployment gated by successful `main` CI.
- Apply Supabase migrations automatically before Vercel production deployment.
- Build and deploy Vercel prebuilt artifacts from GitHub Actions.
- Document required secrets, environment variables, and operating expectations.

**Non-Goals:**

- No PR preview deployments in the first pipeline.
- No release tagging, changelog automation, or branch-environment promotion flow.
- No full Supabase-backed auth/data implementation work.
- No production monitoring or analytics buildout.

## Decisions

- Use GitHub Actions as the CI/CD runner.
- Use Node 24 with npm cache because the project already uses npm and modern Next.js dependencies.
- Use the existing scripts as gates: `lint`, `test:coverage`, `docs:check`, `build`, and `test:e2e`.
- Trigger production deployment through `workflow_run` after the `CI` workflow succeeds on `main`.
- Use Supabase CLI in CI with `SUPABASE_ACCESS_TOKEN`, `SUPABASE_DB_PASSWORD`, and `SUPABASE_PROJECT_ID` secrets.
- Use Vercel CLI with `VERCEL_TOKEN`, `VERCEL_ORG_ID`, and `VERCEL_PROJECT_ID` secrets.
- Store production public Supabase variables in Vercel, not GitHub workflow YAML.

## Risks / Trade-offs

- E2E checks can be slower than unit checks -> Keep the suite focused on the existing critical flows and reuse the current Playwright config.
- Automatic production migrations can affect live data -> Only run migrations after `main` CI succeeds and require production Supabase secrets.
- Missing secrets can be confusing -> Add explicit preflight checks that fail with named missing secret messages.
- Supabase CLI expects project config -> Initialize/link the Supabase project in the ephemeral runner before pushing migrations.
