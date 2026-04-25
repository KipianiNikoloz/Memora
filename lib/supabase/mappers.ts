import type { Emotion, LifePhase, MemoryEntry, Tone, UserProfile } from "@/lib/types";

export type MemoryEntryRow = {
  id: string;
  user_id: string;
  title: string;
  memory: string;
  lesson: string;
  emotion: string;
  tags: string[];
  life_phase: string;
  event_date: string;
  ai_tone: string;
  ai_title: string | null;
  ai_response: string | null;
  created_at: string;
  updated_at: string;
};

export type MemoryEntryInsert = Omit<MemoryEntryRow, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export type MemoraProfileRow = {
  id: string;
  email: string;
  default_tone: string;
  created_at?: string;
};

export type MemoraProfileUpsert = {
  id: string;
  email: string;
  default_tone: string;
};

export function mapMemoryEntryRow(row: MemoryEntryRow): MemoryEntry {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    memory: row.memory,
    lesson: row.lesson,
    emotion: row.emotion as Emotion,
    tags: row.tags,
    lifePhase: row.life_phase as LifePhase,
    eventDate: row.event_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    aiTone: row.ai_tone as Tone,
    aiTitle: row.ai_title ?? undefined,
    aiResponse: row.ai_response ?? undefined
  };
}

export function mapMemoryEntryToRow(entry: MemoryEntry): MemoryEntryInsert {
  return {
    id: entry.id,
    user_id: entry.userId,
    title: entry.title,
    memory: entry.memory,
    lesson: entry.lesson,
    emotion: entry.emotion,
    tags: entry.tags,
    life_phase: entry.lifePhase,
    event_date: entry.eventDate,
    ai_tone: entry.aiTone,
    ai_title: entry.aiTitle ?? null,
    ai_response: entry.aiResponse ?? null,
    created_at: entry.createdAt,
    updated_at: entry.updatedAt
  };
}

export function mapProfileRow(row: MemoraProfileRow): UserProfile {
  return {
    id: row.id,
    email: row.email,
    defaultTone: row.default_tone as Tone
  };
}

export function mapProfileToUpsert(profile: UserProfile): MemoraProfileUpsert {
  return {
    id: profile.id,
    email: profile.email,
    default_tone: profile.defaultTone
  };
}
