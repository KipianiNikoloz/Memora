export type Emotion =
  | "Happy"
  | "Stressed"
  | "Proud"
  | "Disappointed"
  | "Grateful"
  | "Anxious"
  | "Frustrated"
  | "Other";

export type Tone = "Motivational" | "Humorous" | "Wise";

export type LifePhase =
  | "New Beginnings"
  | "Growth and Learning"
  | "Relationships"
  | "Challenges"
  | "Milestones";

export type MemoryEntry = {
  id: string;
  userId: string;
  title: string;
  memory: string;
  lesson: string;
  emotion: Emotion;
  tags: string[];
  lifePhase: LifePhase;
  eventDate: string;
  createdAt: string;
  updatedAt: string;
  aiTone: Tone;
  aiTitle?: string;
  aiResponse?: string;
};

export type UserProfile = {
  id: string;
  email: string;
  defaultTone: Tone;
};

export const emotions: Emotion[] = [
  "Happy",
  "Stressed",
  "Proud",
  "Disappointed",
  "Grateful",
  "Anxious",
  "Frustrated",
  "Other"
];

export const tones: Tone[] = ["Motivational", "Humorous", "Wise"];

export const lifePhases: LifePhase[] = [
  "New Beginnings",
  "Growth and Learning",
  "Relationships",
  "Challenges",
  "Milestones"
];
