import { describe, expect, it } from "vitest";
import { hasCrisisLikeInput, mockAiLibrarian } from "@/lib/ai";
import { seedEntries } from "@/lib/demo-data";

describe("AI librarian", () => {
  it("generates tone-controlled supportive reflections", () => {
    const entry = seedEntries[0];
    expect(mockAiLibrarian.reflect({ entry, tone: "Motivational" })).toContain("progress");
    expect(mockAiLibrarian.reflect({ entry, tone: "Humorous" })).toContain("plot twist");
    expect(mockAiLibrarian.reflect({ entry, tone: "Wise" })).toContain("quiet lesson");
  });

  it("detects crisis-like input and avoids pretending to be enough support", () => {
    expect(hasCrisisLikeInput("I want to hurt myself")).toBe(true);
    const response = mockAiLibrarian.reflect({
      entry: {
        title: "Hard night",
        memory: "I want to hurt myself",
        lesson: "",
        emotion: "Stressed",
        lifePhase: "Challenges",
        tags: []
      },
      tone: "Wise"
    });
    expect(response).toContain("emergency");
    expect(response).not.toContain("diagnose");
  });

  it("generates title, revisit, and low-data summaries for demo mode", () => {
    expect(mockAiLibrarian.suggestTitle({ tone: "Wise" })).toBe("A Chapter Worth Keeping");
    expect(mockAiLibrarian.suggestTitle({ entry: seedEntries[1], tone: "Wise" })).toContain("Challenges");
    expect(mockAiLibrarian.revisitPrompt({ entries: [], tone: "Wise" })).toContain("first shelf");
    expect(mockAiLibrarian.revisitPrompt({ entries: [seedEntries[2]], tone: "Humorous" })).toContain("Revisit");
    expect(mockAiLibrarian.summarize({ entries: [], tone: "Wise" })).toContain("shelves are still quiet");
  });

  it("summarizes pressure-heavy libraries without scoring the user", () => {
    const stressedEntries = [
      { ...seedEntries[1], id: "stress-1", emotion: "Stressed" as const },
      { ...seedEntries[1], id: "stress-2", emotion: "Anxious" as const }
    ];

    const summary = mockAiLibrarian.summarize({ entries: stressedEntries, tone: "Wise" });
    expect(summary).toContain("pressure");
    expect(summary).not.toContain("score");
  });
});
