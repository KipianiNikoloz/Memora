# Insights Dashboard

Insights help users notice growth without scoring or diagnosing them.

Sections:

- Mood trends
- Milestone highlights
- Revisit recommendations
- AI summary
- Low-data state

## Implementation

- `lib/insights.ts` builds mood counts, milestone entries, revisit candidates, and a human-readable mood label.
- `app/insights/page.tsx` renders bars and summary cards from the current user's entries.
- The AI summary uses the `summarize` task through the same client route as the AI Librarian page.
- Low-data copy keeps the feature calm until the user has enough saved entries for useful patterns.

## Boundaries

- Insights are reflective, not diagnostic.
- Mood counts are descriptive and must not become scores, risk labels, or clinical conclusions.
- Revisit suggestions are based on existing private entries, not external behavioral profiling.

## Tests

- `tests/unit/insights.test.ts` covers summary construction.
- `tests/unit/ai.test.ts` and `tests/unit/ai-workflow.test.ts` cover summary tone and safety boundaries.
- `tests/e2e/memora.spec.ts` covers navigation to Insights.

Related OpenSpec change:

- `implement-insights-dashboard`
