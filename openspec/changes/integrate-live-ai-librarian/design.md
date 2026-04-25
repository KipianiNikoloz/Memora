## Context

The existing `AiLibrarian` interface is synchronous and complete enough for demos. The previous design already calls for provider-specific adapters behind an `AiLibrarian` abstraction, minimal context sharing, centralized safety instructions, and a mock fallback when live AI is unavailable.

## Decisions

- Use Google GenAI as the first live provider.
- Configure the provider with server-only env vars: `MEMORA_AI_PROVIDER`, `MEMORA_AI_MODEL`, `GEMINI_API_KEY` or `GOOGLE_API_KEY`, and `MEMORA_AI_TIMEOUT_MS`.
- Default to mock behavior unless `MEMORA_AI_PROVIDER=google` and a Google API key is present.
- Use LangGraph as workflow orchestration only, not an autonomous tool-calling agent.
- Use structured JSON responses from Google GenAI and validate the response before exposing it to the app.
- Keep crisis-like handling deterministic and local; return the bounded safety response without calling the live model.
- Expose client-facing AI through `POST /api/ai/librarian` so keys and prompts stay out of browser bundles.
- Keep stored entry fields unchanged: generated title maps to `aiTitle`, generated reflection maps to `aiResponse`.

## Workflow

`request -> safetyGate -> buildPrompt -> callModel -> validateOutput -> fallbackToMock`

The safety gate can end early with the local safety response. Provider errors, timeouts, missing config, malformed JSON, or invalid text fall back to the mock provider.

## Risks

- Live models can overclaim or drift in tone, so prompts and validation must keep responses supportive, non-clinical, and concise.
- Provider/model availability can change, so `MEMORA_AI_MODEL` must remain configurable.
- Async AI can slow entry save and page summaries, so UI should show existing saving/loading states and avoid blocking demo reliability.
