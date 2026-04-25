## Context

The docs state emotional data must feel private and editable, and AI guidance must remain non-therapeutic.

## Goals / Non-Goals

**Goals:**

- Provide settings for AI tone preference and privacy information.
- Provide delete/export expectations feasible for MVP.
- Make terms/privacy links visible.
- Ensure crisis-like input handling appears where AI responses are generated.

**Non-Goals:**

- No full legal policy authoring.
- No organization privacy model.
- No clinical safety workflow.

## Decisions

- Keep settings simple and user-centered.
- Store AI tone default as a user preference when persistence exists.
- Treat delete as required for private entry data; export can be MVP-basic if feasible.
- Use clear non-clinical wellness boundary copy.

## Risks / Trade-offs

- Privacy controls can overpromise -> Keep copy accurate to actual behavior.
- Safety copy can feel alarming -> Show it contextually and plainly.
