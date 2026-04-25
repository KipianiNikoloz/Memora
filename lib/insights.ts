import type { Emotion, MemoryEntry } from "./types";

export type InsightSummary = {
  moodCounts: Record<string, number>;
  milestones: MemoryEntry[];
  revisit: MemoryEntry[];
  lowData: boolean;
};

export function buildInsights(entries: MemoryEntry[]): InsightSummary {
  const moodCounts = entries.reduce<Record<Emotion, number>>((acc, entry) => {
    acc[entry.emotion] = (acc[entry.emotion] || 0) + 1;
    return acc;
  }, {} as Record<Emotion, number>);

  const milestones = entries
    .filter((entry) => entry.emotion === "Proud" || entry.lifePhase === "Milestones")
    .slice(0, 3);

  const revisit = [...entries]
    .sort((a, b) => a.createdAt.localeCompare(b.createdAt))
    .slice(0, 3);

  return {
    moodCounts,
    milestones,
    revisit,
    lowData: entries.length < 2
  };
}

export function moodLabel(moodCounts: Record<string, number>): string {
  const top = Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0];
  if (!top) return "No pattern yet";
  return `${top[0]} appears most often`;
}
