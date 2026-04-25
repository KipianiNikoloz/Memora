## Context

The suite is intentionally split into foundation, core memory, AI/insights/public UI, safety, audits, comprehensive testing, complete documentation, and demo readiness changes. The orchestrator coordinates them.

## Goals / Non-Goals

**Goals:**

- Execute every MVP implementation spec in order.
- Run audit specs at checkpoint boundaries.
- Require comprehensive automated testing.
- Require complete maintainer and feature documentation.
- Verify final acceptance against `docs/memora/roadmap-and-acceptance.md`.
- Prevent project completion from being declared while any spec remains unapplied or unverified.

**Non-Goals:**

- No new feature requirements beyond the suite.
- No replacement of individual spec validation.
- No post-MVP roadmap implementation.

## Decisions

- Use the hybrid dependency order from the suite plan.
- Treat audit specs as mandatory gates.
- Run the comprehensive testing suite after product and safety readiness.
- Complete documentation after the implemented MVP has stabilized, then verify docs before demo completion.
- Treat hackathon demo readiness as the final completion gate.

## Risks / Trade-offs

- Orchestration can mask individual failures -> Require each change's own validation before moving forward.
