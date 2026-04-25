## Context

The docs define the AI librarian as a supportive companion that can be motivational, humorous, or wise without becoming therapeutic or diagnostic.

## Goals / Non-Goals

**Goals:**

- Implement provider abstraction and mock provider.
- Generate title suggestions, entry reflections, revisit prompts, and summaries.
- Respect user-selected tone.
- Enforce safety boundaries and crisis-like input handling.

**Non-Goals:**

- No clinical advice.
- No model-provider lock-in.
- No requirement for live AI during hackathon demo.

## Decisions

- Use an `AiLibrarian` style interface with provider-specific adapters behind it.
- Make the mock provider complete enough for demos and tests.
- Pass only necessary entry context to AI calls.
- Centralize safety instructions and crisis-like handling.

## Risks / Trade-offs

- AI can overclaim -> Constrain prompts and add output review tests.
- Live provider can fail -> Mock provider remains a supported runtime path.
