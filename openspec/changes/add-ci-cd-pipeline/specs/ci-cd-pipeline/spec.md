## ADDED Requirements

### Requirement: Pull request CI gates
The system SHALL run automated CI validation for pull requests targeting `main`.

#### Scenario: Pull request checks run
- **WHEN** a pull request targets `main`
- **THEN** GitHub Actions installs dependencies and runs typecheck, coverage tests, documentation checks, production build, and Playwright E2E tests

### Requirement: Main branch quality gates
The system SHALL run the same CI validation when changes are pushed to `main`.

#### Scenario: Main CI fails
- **WHEN** a pushed `main` commit fails any CI gate
- **THEN** production deployment does not run for that commit

### Requirement: Production Supabase migration deployment
The system SHALL apply Supabase migrations to the configured production project before deploying the web app.

#### Scenario: Migration succeeds
- **WHEN** `main` CI succeeds and required Supabase secrets are configured
- **THEN** the production deployment workflow links the configured Supabase project and pushes pending migrations

#### Scenario: Migration fails
- **WHEN** Supabase migration deployment fails
- **THEN** Vercel production deployment does not run

### Requirement: Vercel production deployment
The system SHALL deploy successful `main` builds to Vercel production using prebuilt artifacts.

#### Scenario: Production deployment succeeds
- **WHEN** `main` CI succeeds, Supabase migrations succeed, and Vercel secrets are configured
- **THEN** GitHub Actions builds production artifacts and deploys them to Vercel production

### Requirement: Secret and environment documentation
The system SHALL document the required CI/CD secrets and hosting environment variables.

#### Scenario: Maintainer configures CI/CD
- **WHEN** a maintainer reads the CI/CD documentation
- **THEN** they can identify the required GitHub secrets, required Vercel production variables, and the current limitation that full Supabase-backed app behavior is not part of this pipeline change
