## 1. OpenSpec Artifacts

- [x] 1.1 Create the `add-ci-cd-pipeline` OpenSpec change.
- [x] 1.2 Add proposal, design, task list, and CI/CD capability spec.

## 2. CI Workflow

- [x] 2.1 Add a GitHub Actions CI workflow for pull requests and `main`.
- [x] 2.2 Configure Node, npm install, typecheck, coverage, docs, build, and Playwright E2E gates.
- [x] 2.3 Use CI-safe environment defaults that do not require production secrets.

## 3. Production Deployment

- [x] 3.1 Add a production deploy workflow gated by successful `main` CI.
- [x] 3.2 Add explicit GitHub secret preflight checks.
- [x] 3.3 Apply Supabase migrations before web deployment.
- [x] 3.4 Deploy prebuilt Vercel production artifacts.

## 4. Documentation and Verification

- [x] 4.1 Document required GitHub secrets, Vercel env vars, and pipeline behavior.
- [x] 4.2 Validate the OpenSpec change.
- [x] 4.3 Run the local verification commands and fix any failures.
