## Why

Memora has a solid local verification suite, but the repository does not yet enforce those checks automatically or deploy successful production builds. A CI/CD pipeline should make pull requests safer, keep `main` deployable, apply Supabase schema migrations through a repeatable path, and publish production builds to Vercel without relying on manual local commands.

## What Changes

- Add GitHub Actions quality gates for pull requests and `main`.
- Add a production deployment workflow that runs only after `main` CI succeeds.
- Apply Supabase migrations automatically before deploying the web app to production.
- Deploy the Next.js app to Vercel using prebuilt production artifacts.
- Document required GitHub secrets, Vercel environment variables, and current production data-path expectations.

## Capabilities

### New Capabilities

- `ci-cd-pipeline`: Provides automated CI validation, Supabase migration deployment, and Vercel production deployment for Memora.

### Modified Capabilities

- None.

## Impact

- Adds GitHub Actions workflow files and CI/CD documentation.
- Uses the existing npm scripts, Playwright config, Supabase migration directory, and Vercel hosting target.
- Does not add Vercel preview deployments or convert the current app state layer from local/demo storage to live Supabase persistence.
