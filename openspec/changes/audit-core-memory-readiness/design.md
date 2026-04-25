## Context

This audit runs after private entries can be created and browsed.

## Goals / Non-Goals

**Goals:**

- Verify entry CRUD and ownership.
- Verify New Entry save behavior.
- Verify Library search, filters, shelves, and detail navigation.
- Fix gaps and missing tests.

**Non-Goals:**

- No AI provider behavior.
- No insights dashboard.
- No homepage work.

## Decisions

- Treat docs alignment as part of the audit.
- Require direct tests for private ownership.
- Keep remediation limited to core memory behavior and states.

## Risks / Trade-offs

- Audit may reveal design gaps -> Fix only gaps that block documented MVP memory workflows.
