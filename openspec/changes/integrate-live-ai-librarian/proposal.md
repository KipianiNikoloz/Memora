## Why

Memora's AI librarian is currently deterministic mock logic. Production users need live AI reflections while preserving the current safety boundaries, demo reliability, and provider abstraction.

## What Changes

- Add a server-only live AI runtime using Google GenAI.
- Orchestrate AI requests through a small LangGraph workflow.
- Keep the existing mock librarian as the fallback for demo mode, tests, missing credentials, timeouts, and provider failures.
- Convert AI librarian calls to async and route client usage through a server API.
- Keep crisis-like input locally bounded and avoid sending crisis reflection prompts to the live provider.

## Capabilities

### Modified Capabilities

- `ai-librarian`: Adds live AI generation, server-only provider execution, LangGraph orchestration, structured output validation, and mock fallback.

## Impact

- Adds `@google/genai` and `@langchain/langgraph`.
- Adds server route `POST /api/ai/librarian`.
- Updates entry save, insights, and librarian surfaces to await async AI.
- Keeps demo and CI credential-free by default.
