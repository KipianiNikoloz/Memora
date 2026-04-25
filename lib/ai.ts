import type { MemoryEntry, Tone } from "./types";

export type AiTask = "suggestTitle" | "reflect" | "revisitPrompt" | "summarize";

export type AiProvider = "mock" | "google";

export type LibrarianEntryContext = Pick<MemoryEntry, "title" | "memory" | "lesson" | "emotion" | "lifePhase" | "tags">;

export type LibrarianRequest = {
  entry?: LibrarianEntryContext;
  tone: Tone;
  entries?: MemoryEntry[];
};

export type AiResult = {
  text: string;
  provider: AiProvider;
  model?: string;
  fallbackUsed: boolean;
};

export type AiLibrarian = {
  suggestTitle(request: LibrarianRequest): Promise<string>;
  reflect(request: LibrarianRequest): Promise<string>;
  revisitPrompt(request: LibrarianRequest): Promise<string>;
  summarize(request: LibrarianRequest): Promise<string>;
};

const crisisPattern = /\b(kill myself|suicide|end my life|hurt myself|self harm|can't go on)\b/i;

export function hasCrisisLikeInput(text: string): boolean {
  return crisisPattern.test(text);
}

export function requestText(request: LibrarianRequest): string {
  const entryText = request.entry ? `${request.entry.title} ${request.entry.memory} ${request.entry.lesson}` : "";
  const entriesText = request.entries?.map((entry) => `${entry.title} ${entry.memory} ${entry.lesson}`).join(" ") ?? "";
  return `${entryText} ${entriesText}`.trim();
}

export function safetyResponse() {
  return "This sounds urgent and heavy. Please reach out to someone you trust now, or contact local emergency services if you might be in immediate danger. Memora can hold the note, but it is not enough support for a crisis by itself.";
}

function toneLine(tone: Tone, entry?: LibrarianRequest["entry"]) {
  const subject = entry?.title || "this chapter";
  if (tone === "Humorous") {
    return `Tiny plot twist: ${subject} was not just a scene, it was evidence that you kept going.`;
  }
  if (tone === "Wise") {
    return `There is a quiet lesson in ${subject}: growth often becomes visible only after you return to the page.`;
  }
  return `${subject} shows progress in motion. You met the moment, learned from it, and added another shelf to your own library.`;
}

export function runMockAiTask(task: AiTask, request: LibrarianRequest): string {
  if (hasCrisisLikeInput(requestText(request))) {
    return task === "suggestTitle" ? "A Moment That Needs Support" : safetyResponse();
  }

  if (task === "suggestTitle") {
    const entry = request.entry;
    if (!entry) return "A Chapter Worth Keeping";
    const tag = entry.tags[0] ? ` of ${entry.tags[0]}` : "";
    return `${entry.lifePhase}${tag}`;
  }

  if (task === "reflect") {
    return `${toneLine(request.tone, request.entry)} Keep this close for the future version of you who may need proof.`;
  }

  if (task === "revisitPrompt") {
    const entry = request.entries?.[0];
    if (!entry) {
      return "Your first shelf is waiting. Add one memory and the library can begin reflecting back.";
    }
    return `${toneLine(request.tone, entry)} Revisit "${entry.title}" and notice what feels different now.`;
  }

  if (!request.entries?.length) {
    return "The shelves are still quiet. Add a few memories and Memora will help you notice patterns gently.";
  }
  const proud = request.entries.filter((entry) => entry.emotion === "Proud").length;
  const stressed = request.entries.filter(
    (entry) => entry.emotion === "Stressed" || entry.emotion === "Anxious",
  ).length;
  const base =
    proud >= stressed
      ? "Your recent library leans toward momentum and earned confidence."
      : "Your recent library carries some pressure, but also evidence that you keep moving through it.";
  return `${base} ${toneLine(request.tone, request.entries[0])}`;
}

export const mockAiLibrarian: AiLibrarian = {
  async suggestTitle(request) {
    return runMockAiTask("suggestTitle", request);
  },
  async reflect(request) {
    return runMockAiTask("reflect", request);
  },
  async revisitPrompt(request) {
    return runMockAiTask("revisitPrompt", request);
  },
  async summarize(request) {
    return runMockAiTask("summarize", request);
  },
};
