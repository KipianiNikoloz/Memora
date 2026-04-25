# AI Librarian

The AI Librarian is a supportive reflection companion. It is not a therapist or diagnostic system.

Capabilities:

- Suggest chapter titles.
- Generate reflections.
- Recommend memories to revisit.
- Summarize patterns gently.

## Implementation

- `lib/ai.ts` defines the task contract and deterministic mock provider.
- `lib/ai-prompts.ts` builds live-provider prompts and validates output length and safety.
- `lib/ai-workflow.ts` runs the LangGraph workflow, safety gate, model call, validation, and fallback.
- `lib/ai-runtime.ts` chooses mock or Google provider from runtime mode and environment variables.
- `app/api/ai/librarian/route.ts` validates request shape and returns an `AiResult`.
- `lib/ai-client.ts` is the browser-facing helper for AI route calls.

```mermaid
flowchart TD
  UI[Feature UI] --> Client[requestAiLibrarian]
  Client --> Route[/api/ai/librarian]
  Route --> Runtime[runAiLibrarianTask]
  Runtime --> Workflow[LangGraph workflow]
  Workflow --> Prompt[Prompt builder]
  Prompt --> Provider[Google provider or mock]
  Provider --> Safety[Output validation]
  Safety --> Result[AiResult]
```

Tone modes:

- Motivational
- Humorous
- Wise

Safety:

- Crisis-like input receives urgent supportive copy.
- Responses must not diagnose, treat, or claim clinical authority.

## Runtime Configuration

- Demo mode always uses the mock provider.
- Supabase mode can use Google when `MEMORA_AI_PROVIDER=google` and an API key is configured.
- `MEMORA_AI_MODEL` defaults to `gemma-4-26b-a4b-it`.
- `MEMORA_AI_TIMEOUT_MS` defaults to `8000`.
- Failed or invalid live output falls back to mock behavior.

## Tests

- `tests/unit/ai.test.ts` covers tone behavior and safety boundaries.
- `tests/unit/ai-workflow.test.ts` covers workflow fallback and validation.
- `tests/integration/ai-route.test.ts` covers API route validation.
- `tests/unit/runtime-clients.test.ts` covers browser AI client behavior.

Related OpenSpec change:

- `implement-ai-librarian`
