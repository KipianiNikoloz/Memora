import { mockAiLibrarian, type AiResult, type AiTask, type LibrarianRequest } from "./ai";

export async function requestAiLibrarian(task: AiTask, request: LibrarianRequest): Promise<AiResult> {
  try {
    const response = await fetch("/api/ai/librarian", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ task, ...request })
    });

    if (!response.ok) {
      throw new Error(`AI request failed with ${response.status}`);
    }

    return await response.json() as AiResult;
  } catch {
    const fallback = await mockAiLibrarian[task](request);
    return {
      text: fallback,
      provider: "mock",
      fallbackUsed: true
    };
  }
}
