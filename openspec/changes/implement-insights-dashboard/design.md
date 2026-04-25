## Context

The UI reference shows mood trends, milestone highlights, revisit recommendations, and AI summary as the core Insights screen.

## Goals / Non-Goals

**Goals:**

- Visualize emotional patterns over time.
- Highlight milestones and revisit recommendations.
- Generate supportive AI summary through the librarian abstraction.
- Avoid diagnosis, scoring, or deterministic claims.

**Non-Goals:**

- No clinical analytics.
- No organization/team dashboards.
- No complex predictive modeling.

## Decisions

- Compute simple MVP insights from existing private entries.
- Use gentle copy and labels.
- Keep empty state useful when there are too few entries.
- Use AI summary only as supportive narrative.

## Risks / Trade-offs

- Insights can feel judgmental -> Avoid scores and use reflective language.
- Sparse data can mislead -> Use empty/low-data states and cautious wording.
