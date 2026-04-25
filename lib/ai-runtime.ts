import { getRuntimeMode } from "./runtime-mode";
import { type AiLibrarian, type AiProvider, type AiResult, type AiTask, type LibrarianRequest, mockAiLibrarian } from "./ai";
import { callGoogleGenAi } from "./ai-google";
import { runAiWorkflow } from "./ai-workflow";

export type AiRuntimeConfig = {
  provider: AiProvider;
  model: string;
  timeoutMs: number;
  apiKey?: string;
};

export function getAiRuntimeConfig(): AiRuntimeConfig {
  const requestedProvider = process.env.MEMORA_AI_PROVIDER === "google" ? "google" : "mock";
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || undefined;
  const provider = requestedProvider === "google" && apiKey ? "google" : "mock";
  const parsedTimeout = Number.parseInt(process.env.MEMORA_AI_TIMEOUT_MS ?? "8000", 10);

  return {
    provider: getRuntimeMode() === "demo" ? "mock" : provider,
    model: process.env.MEMORA_AI_MODEL || "gemma-4-26b-a4b-it",
    timeoutMs: Number.isFinite(parsedTimeout) ? parsedTimeout : 8000,
    apiKey
  };
}

export async function runAiLibrarianTask(task: AiTask, request: LibrarianRequest, config = getAiRuntimeConfig()): Promise<AiResult> {
  const result = await runAiWorkflow(task, request, {
    provider: config.provider,
    model: config.model,
    callModel: config.provider === "google" && config.apiKey
      ? (prompt) => callGoogleGenAi({ prompt, model: config.model, apiKey: config.apiKey!, timeoutMs: config.timeoutMs })
      : undefined
  });

  if (result.fallbackUsed && config.provider === "google") {
    console.warn(`Memora AI fell back to mock provider for task ${task}.`);
  }

  return result;
}

export function getAiLibrarian(): AiLibrarian {
  return {
    async suggestTitle(request) {
      return (await runAiLibrarianTask("suggestTitle", request)).text;
    },
    async reflect(request) {
      return (await runAiLibrarianTask("reflect", request)).text;
    },
    async revisitPrompt(request) {
      return (await runAiLibrarianTask("revisitPrompt", request)).text;
    },
    async summarize(request) {
      return (await runAiLibrarianTask("summarize", request)).text;
    }
  };
}

export { mockAiLibrarian };
