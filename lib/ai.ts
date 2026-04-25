import type { MemoryEntry, Tone } from "./types";

export type LibrarianRequest = {
  entry?: Pick<MemoryEntry, "title" | "memory" | "lesson" | "emotion" | "lifePhase" | "tags">;
  tone: Tone;
  entries?: MemoryEntry[];
};

export type AiLibrarian = {
  suggestTitle(request: LibrarianRequest): string;
  reflect(request: LibrarianRequest): string;
  revisitPrompt(request: LibrarianRequest): string;
  summarize(request: LibrarianRequest): string;
};

const crisisPattern = /\b(kill myself|suicide|end my life|hurt myself|self harm|can't go on)\b/i;

export function hasCrisisLikeInput(text: string): boolean {
  return crisisPattern.test(text);
}

function safetyResponse() {
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

export const mockAiLibrarian: AiLibrarian = {
  suggestTitle({ entry }) {
    if (!entry) return "A Chapter Worth Keeping";
    if (hasCrisisLikeInput(`${entry.title} ${entry.memory} ${entry.lesson}`)) {
      return "A Moment That Needs Support";
    }
    const tag = entry.tags[0] ? ` of ${entry.tags[0]}` : "";
    return `${entry.lifePhase}${tag}`;
  },
  reflect({ entry, tone }) {
    if (entry && hasCrisisLikeInput(`${entry.title} ${entry.memory} ${entry.lesson}`)) {
      return safetyResponse();
    }
    return `${toneLine(tone, entry)} Keep this close for the future version of you who may need proof.`;
  },
  revisitPrompt({ entries, tone }) {
    const entry = entries?.[0];
    if (!entry) {
      return "Your first shelf is waiting. Add one memory and the library can begin reflecting back.";
    }
    return `${toneLine(tone, entry)} Revisit "${entry.title}" and notice what feels different now.`;
  },
  summarize({ entries, tone }) {
    if (!entries?.length) {
      return "The shelves are still quiet. Add a few memories and Memora will help you notice patterns gently.";
    }
    const proud = entries.filter((entry) => entry.emotion === "Proud").length;
    const stressed = entries.filter((entry) => entry.emotion === "Stressed" || entry.emotion === "Anxious").length;
    const base = proud >= stressed
      ? "Your recent library leans toward momentum and earned confidence."
      : "Your recent library carries some pressure, but also evidence that you keep moving through it.";
    return `${base} ${toneLine(tone, entries[0])}`;
  }
};
