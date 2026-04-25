import type { AiTask, LibrarianRequest } from "./ai";
import { lifePhases, type Emotion, type LifePhase, type MemoryEntry, type Tone } from "./types";

export type LibraryFilterValue<T extends string> = T | "All";

export type LibraryFilters = {
  query: string;
  emotion: LibraryFilterValue<Emotion>;
  phase: LibraryFilterValue<LifePhase>;
};

export type LibraryShelf = {
  shelf: LifePhase;
  entries: MemoryEntry[];
};

export type LibrarianSelection = {
  task: AiTask;
  request: LibrarianRequest;
};

function searchableText(entry: Pick<MemoryEntry, "title" | "memory" | "lesson" | "tags">) {
  return `${entry.title} ${entry.memory} ${entry.lesson} ${entry.tags.join(" ")}`.toLowerCase();
}

export function filterLibraryEntries(entries: MemoryEntry[], filters: LibraryFilters): MemoryEntry[] {
  const query = filters.query.toLowerCase();
  return entries.filter(
    (entry) =>
      searchableText(entry).includes(query) &&
      (filters.emotion === "All" || entry.emotion === filters.emotion) &&
      (filters.phase === "All" || entry.lifePhase === filters.phase),
  );
}

export function groupEntriesByLifePhase(entries: MemoryEntry[], shelves: LifePhase[] = lifePhases): LibraryShelf[] {
  return shelves
    .map((shelf) => ({
      shelf,
      entries: entries.filter((entry) => entry.lifePhase === shelf),
    }))
    .filter((group) => group.entries.length > 0);
}

export function findLibrarianMatch(entries: MemoryEntry[], query: string): MemoryEntry | undefined {
  if (!query.trim()) return entries[0];
  const needle = query.toLowerCase();
  return entries.find((entry) => searchableText(entry).includes(needle)) ?? entries[0];
}

export function selectLibrarianRequest(entries: MemoryEntry[], query: string, tone: Tone): LibrarianSelection {
  const matched = findLibrarianMatch(entries, query);
  if (query.trim()) {
    return {
      task: "reflect",
      request: {
        entry: {
          title: "Support note",
          memory: query,
          lesson: "",
          emotion: "Stressed",
          lifePhase: "Challenges",
          tags: [],
        },
        tone,
      },
    };
  }

  return {
    task: "revisitPrompt",
    request: { entries: matched ? [matched] : entries, tone },
  };
}
