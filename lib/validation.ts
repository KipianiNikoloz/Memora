import { emotions, lifePhases, type Emotion, type LifePhase, type MemoryEntry, type Tone, tones } from "./types";

export type EntryDraft = {
  title: string;
  memory: string;
  lesson: string;
  emotion: Emotion;
  tags: string;
  lifePhase: LifePhase;
  aiTone: Tone;
};

export type ValidationResult = {
  ok: boolean;
  errors: Partial<Record<keyof EntryDraft, string>>;
};

export function validateEntryDraft(draft: EntryDraft): ValidationResult {
  const errors: ValidationResult["errors"] = {};

  if (draft.title.trim().length < 3) {
    errors.title = "Give this chapter a short title so you can find it later.";
  }

  if (draft.memory.trim().length < 10) {
    errors.memory = "Write a few more words about what happened.";
  }

  if (draft.lesson.trim().length < 5) {
    errors.lesson = "Add one gentle note about what this moment taught you.";
  }

  if (!emotions.includes(draft.emotion)) {
    errors.emotion = "Choose the emotion that fits closest.";
  }

  if (!lifePhases.includes(draft.lifePhase)) {
    errors.lifePhase = "Choose a shelf for this memory.";
  }

  if (!tones.includes(draft.aiTone)) {
    errors.aiTone = "Choose how the AI librarian should respond.";
  }

  return {
    ok: Object.keys(errors).length === 0,
    errors
  };
}

export function parseTags(value: string): string[] {
  return value
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean)
    .slice(0, 8);
}

export function createEntryFromDraft(draft: EntryDraft, userId: string): MemoryEntry {
  const now = new Date().toISOString();

  return {
    id: crypto.randomUUID(),
    userId,
    title: draft.title.trim(),
    memory: draft.memory.trim(),
    lesson: draft.lesson.trim(),
    emotion: draft.emotion,
    tags: parseTags(draft.tags),
    lifePhase: draft.lifePhase,
    eventDate: now.slice(0, 10),
    createdAt: now,
    updatedAt: now,
    aiTone: draft.aiTone
  };
}
