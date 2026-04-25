## 1. OpenSpec Artifacts

- [x] 1.1 Add proposal, design, tasks, and ai-librarian spec changes.

## 2. Dependencies And Configuration

- [x] 2.1 Add Google GenAI and LangGraph dependencies.
- [x] 2.2 Add AI environment variable documentation.

## 3. AI Runtime

- [x] 3.1 Convert the AI provider interface and mock implementation to async.
- [x] 3.2 Add server-side Google GenAI provider with structured JSON responses.
- [x] 3.3 Add LangGraph workflow for safety, prompting, provider call, validation, and fallback.
- [x] 3.4 Add server-only provider selection and timeout handling.

## 4. API And App Integration

- [x] 4.1 Add `POST /api/ai/librarian`.
- [x] 4.2 Update entry creation to await generated title and reflection through the server API.
- [x] 4.3 Update Insights and AI Librarian surfaces to use async AI responses.
- [x] 4.4 Preserve demo/mock behavior for CI and local fallback.

## 5. Verification

- [x] 5.1 Update existing AI unit tests for async behavior.
- [x] 5.2 Add unit tests for workflow routing, validation, and fallback.
- [x] 5.3 Add integration tests for the API route with a mocked provider.
- [x] 5.4 Run typecheck, tests, build, and demo-mode Playwright.
