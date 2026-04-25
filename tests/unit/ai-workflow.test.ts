import { describe, expect, it, vi } from "vitest";
import { runAiWorkflow } from "@/lib/ai-workflow";
import { seedEntries } from "@/lib/demo-data";

describe("AI workflow", () => {
  it("routes crisis-like reflection to the local safety response without calling the model", async () => {
    const callModel = vi.fn(async () => JSON.stringify({ text: "unused" }));

    const result = await runAiWorkflow("reflect", {
      entry: {
        title: "Hard night",
        memory: "I want to hurt myself",
        lesson: "",
        emotion: "Stressed",
        lifePhase: "Challenges",
        tags: []
      },
      tone: "Wise"
    }, {
      provider: "google",
      model: "test-model",
      callModel
    });

    expect(result.text).toContain("emergency");
    expect(result.provider).toBe("mock");
    expect(result.fallbackUsed).toBe(false);
    expect(callModel).not.toHaveBeenCalled();
  });

  it("uses live model output when it validates", async () => {
    const callModel = vi.fn(async () => "A gentle reflection that stays grounded and useful.");

    const result = await runAiWorkflow("reflect", {
      entry: seedEntries[0],
      tone: "Wise"
    }, {
      provider: "google",
      model: "test-model",
      callModel
    });

    expect(result).toEqual({
      text: "A gentle reflection that stays grounded and useful.",
      provider: "google",
      model: "test-model",
      fallbackUsed: false
    });
    expect(callModel).toHaveBeenCalledOnce();
  });

  it("falls back to mock when live output is invalid", async () => {
    const result = await runAiWorkflow("summarize", {
      entries: seedEntries,
      tone: "Wise"
    }, {
      provider: "google",
      model: "test-model",
      callModel: async () => "score"
    });

    expect(result.provider).toBe("mock");
    expect(result.fallbackUsed).toBe(true);
    expect(result.text).toContain("recent library");
  });

  it("falls back to mock when the provider throws", async () => {
    const result = await runAiWorkflow("suggestTitle", {
      entry: seedEntries[0],
      tone: "Wise"
    }, {
      provider: "google",
      model: "test-model",
      callModel: async () => {
        throw new Error("network down");
      }
    });

    expect(result.provider).toBe("mock");
    expect(result.fallbackUsed).toBe(true);
    expect(result.text).toContain("Growth and Learning");
  });
});
