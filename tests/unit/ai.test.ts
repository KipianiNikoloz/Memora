import { describe, expect, it } from "vitest";
import { hasCrisisLikeInput, mockAiLibrarian } from "@/lib/ai";
import { seedEntries } from "@/lib/demo-data";

describe("AI librarian", () => {
  it("generates tone-controlled supportive reflections", async () => {
    const entry = seedEntries[0];
    await expect(mockAiLibrarian.reflect({ entry, tone: "Motivational" })).resolves.toContain("progress");
    await expect(mockAiLibrarian.reflect({ entry, tone: "Humorous" })).resolves.toContain("plot twist");
    await expect(mockAiLibrarian.reflect({ entry, tone: "Wise" })).resolves.toContain("quiet lesson");
  });

  it("detects crisis-like input and avoids pretending to be enough support", async () => {
    expect(hasCrisisLikeInput("I want to hurt myself")).toBe(true);
    const response = await mockAiLibrarian.reflect({
      entry: {
        title: "Hard night",
        memory: "I want to hurt myself",
        lesson: "",
        emotion: "Stressed",
        lifePhase: "Challenges",
        tags: [],
      },
      tone: "Wise",
    });
    expect(response).toContain("emergency");
    expect(response).not.toContain("diagnose");
  });

  it("generates title, revisit, and low-data summaries for demo mode", async () => {
    await expect(mockAiLibrarian.suggestTitle({ tone: "Wise" })).resolves.toBe("A Chapter Worth Keeping");
    await expect(mockAiLibrarian.suggestTitle({ entry: seedEntries[1], tone: "Wise" })).resolves.toContain(
      "Challenges",
    );
    await expect(mockAiLibrarian.revisitPrompt({ entries: [], tone: "Wise" })).resolves.toContain("first shelf");
    await expect(mockAiLibrarian.revisitPrompt({ entries: [seedEntries[2]], tone: "Humorous" })).resolves.toContain(
      "Revisit",
    );
    await expect(mockAiLibrarian.summarize({ entries: [], tone: "Wise" })).resolves.toContain(
      "shelves are still quiet",
    );
  });

  it("summarizes pressure-heavy libraries without scoring the user", async () => {
    const stressedEntries = [
      { ...seedEntries[1], id: "stress-1", emotion: "Stressed" as const },
      { ...seedEntries[1], id: "stress-2", emotion: "Anxious" as const },
    ];

    const summary = await mockAiLibrarian.summarize({ entries: stressedEntries, tone: "Wise" });
    expect(summary).toContain("pressure");
    expect(summary).not.toContain("score");
  });
});
