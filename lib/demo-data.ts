import type { MemoryEntry, UserProfile } from "./types";

export const demoUser: UserProfile = {
  id: "demo-user",
  email: "demo@memora.local",
  defaultTone: "Wise",
};

export const seedEntries: MemoryEntry[] = [
  {
    id: "entry-1",
    userId: demoUser.id,
    title: "A Small Win at Work",
    memory: "I presented an idea even though I was nervous, and the team actually built on it.",
    lesson: "Speaking before I feel fully ready can still open a door.",
    emotion: "Proud",
    tags: ["confidence", "work"],
    lifePhase: "Growth and Learning",
    eventDate: "2026-04-14",
    createdAt: "2026-04-14T10:00:00.000Z",
    updatedAt: "2026-04-14T10:00:00.000Z",
    aiTone: "Motivational",
    aiTitle: "Growth and Learning of confidence",
    aiResponse:
      "A Small Win at Work shows progress in motion. You met the moment, learned from it, and added another shelf to your own library.",
  },
  {
    id: "entry-2",
    userId: demoUser.id,
    title: "The Long Week",
    memory: "I felt stretched thin, but I asked for help instead of pretending everything was fine.",
    lesson: "Support works better when I let people know where I am.",
    emotion: "Stressed",
    tags: ["support", "boundaries"],
    lifePhase: "Challenges",
    eventDate: "2026-04-18",
    createdAt: "2026-04-18T11:00:00.000Z",
    updatedAt: "2026-04-18T11:00:00.000Z",
    aiTone: "Wise",
    aiTitle: "Challenges of support",
    aiResponse:
      "There is a quiet lesson in The Long Week: growth often becomes visible only after you return to the page.",
  },
  {
    id: "entry-3",
    userId: demoUser.id,
    title: "Starting Fresh",
    memory: "I reset my morning routine after weeks of feeling scattered.",
    lesson: "Small rituals can make a new beginning feel real.",
    emotion: "Grateful",
    tags: ["routine", "care"],
    lifePhase: "New Beginnings",
    eventDate: "2026-04-21",
    createdAt: "2026-04-21T09:00:00.000Z",
    updatedAt: "2026-04-21T09:00:00.000Z",
    aiTone: "Humorous",
    aiTitle: "New Beginnings of routine",
    aiResponse: "Tiny plot twist: Starting Fresh was not just a scene, it was evidence that you kept going.",
  },
];
