import { mockAiLibrarian, type AiResult, type AiTask, type LibrarianRequest } from "./ai";
import { isAiResult } from "./ai-contract";

export async function requestAiLibrarian(task: AiTask, request: LibrarianRequest): Promise<AiResult> {
  try {
    const response = await fetch("/api/ai/librarian", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ task, ...request }),
    });

    if (!response.ok) {
      throw new Error(`AI request failed with ${response.status}`);
    }

    const result: unknown = await response.json();
    if (!isAiResult(result)) {
      throw new Error("AI response did not match contract.");
    }

    return result;
  } catch {
    const fallback = await mockAiLibrarian[task](request);
    return {
      text: fallback,
      provider: "mock",
      fallbackUsed: true,
    };
  }
}
