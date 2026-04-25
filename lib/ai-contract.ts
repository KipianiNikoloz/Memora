import type { AiProvider, AiResult, AiTask, LibrarianEntryContext, LibrarianRequest } from "./ai";
import { emotions, lifePhases, tones, type Emotion, type LifePhase, type MemoryEntry, type Tone } from "./types";

export const aiTasks: readonly AiTask[] = ["suggestTitle", "reflect", "revisitPrompt", "summarize"];
export const aiProviders: readonly AiProvider[] = ["mock", "google"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function hasOwn(record: Record<string, unknown>, key: string): boolean {
  return Object.prototype.hasOwnProperty.call(record, key);
}

function isOptionalString(record: Record<string, unknown>, key: string): boolean {
  return !hasOwn(record, key) || record[key] === undefined || typeof record[key] === "string";
}

export function isAiTask(value: unknown): value is AiTask {
  return typeof value === "string" && aiTasks.includes(value as AiTask);
}

export function isAiProvider(value: unknown): value is AiProvider {
  return typeof value === "string" && aiProviders.includes(value as AiProvider);
}

export function isTone(value: unknown): value is Tone {
  return typeof value === "string" && tones.includes(value as Tone);
}

export function isEmotion(value: unknown): value is Emotion {
  return typeof value === "string" && emotions.includes(value as Emotion);
}

export function isLifePhase(value: unknown): value is LifePhase {
  return typeof value === "string" && lifePhases.includes(value as LifePhase);
}

export function isLibrarianEntryContext(value: unknown): value is LibrarianEntryContext {
  return (
    isRecord(value) &&
    typeof value.title === "string" &&
    typeof value.memory === "string" &&
    typeof value.lesson === "string" &&
    isEmotion(value.emotion) &&
    isLifePhase(value.lifePhase) &&
    Array.isArray(value.tags) &&
    value.tags.every((tag) => typeof tag === "string")
  );
}

export function isMemoryEntry(value: unknown): value is MemoryEntry {
  if (!isRecord(value) || !isLibrarianEntryContext(value)) return false;
  const record = value as Record<string, unknown>;

  return (
    typeof record.id === "string" &&
    typeof record.userId === "string" &&
    typeof record.eventDate === "string" &&
    typeof record.createdAt === "string" &&
    typeof record.updatedAt === "string" &&
    isTone(record.aiTone) &&
    isOptionalString(record, "aiTitle") &&
    isOptionalString(record, "aiResponse")
  );
}

export function parseLibrarianRequestBody(body: unknown): { task: AiTask; request: LibrarianRequest } | null {
  if (!isRecord(body) || !isAiTask(body.task) || !isTone(body.tone)) {
    return null;
  }

  let entry: LibrarianRequest["entry"];
  if (hasOwn(body, "entry") && body.entry !== undefined) {
    if (!isLibrarianEntryContext(body.entry)) return null;
    entry = body.entry;
  }

  let entries: LibrarianRequest["entries"];
  if (hasOwn(body, "entries") && body.entries !== undefined) {
    if (!Array.isArray(body.entries) || !body.entries.every(isMemoryEntry)) return null;
    entries = body.entries;
  }

  return {
    task: body.task,
    request: {
      tone: body.tone,
      entry,
      entries,
    },
  };
}

export function isAiResult(value: unknown): value is AiResult {
  return (
    isRecord(value) &&
    typeof value.text === "string" &&
    isAiProvider(value.provider) &&
    typeof value.fallbackUsed === "boolean" &&
    isOptionalString(value, "model")
  );
}
