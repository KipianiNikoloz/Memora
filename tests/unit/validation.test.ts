import { describe, expect, it } from "vitest";
import { createEntryFromDraft, parseTags, validateEntryDraft } from "@/lib/validation";

describe("memory entry validation", () => {
  it("accepts a complete draft and creates a structured entry", () => {
    const draft = {
      title: "A small win",
      memory: "I shared an idea even though it felt uncomfortable.",
      lesson: "I can be brave before I feel ready.",
      emotion: "Proud" as const,
      tags: "work, courage, work",
      lifePhase: "Growth and Learning" as const,
      aiTone: "Wise" as const,
    };

    expect(validateEntryDraft(draft).ok).toBe(true);
    const entry = createEntryFromDraft(draft, "user-1");
    expect(entry.userId).toBe("user-1");
    expect(entry.tags).toEqual(["work", "courage", "work"]);
  });

  it("returns calm validation messages for incomplete drafts", () => {
    const result = validateEntryDraft({
      title: "",
      memory: "short",
      lesson: "",
      emotion: "Happy",
      tags: "",
      lifePhase: "New Beginnings",
      aiTone: "Wise",
    });

    expect(result.ok).toBe(false);
    expect(result.errors.title).toContain("chapter");
    expect(result.errors.memory).toContain("few more words");
  });

  it("parses tag lists safely", () => {
    expect(parseTags(" growth, support, , confidence ")).toEqual(["growth", "support", "confidence"]);
  });

  it("rejects invalid controlled values", () => {
    const result = validateEntryDraft({
      title: "A real title",
      memory: "This memory is long enough to be valid.",
      lesson: "There was a lesson.",
      emotion: "Impossible" as never,
      tags: "",
      lifePhase: "Nowhere" as never,
      aiTone: "Clinical" as never,
    });

    expect(result.ok).toBe(false);
    expect(result.errors.emotion).toContain("emotion");
    expect(result.errors.lifePhase).toContain("shelf");
    expect(result.errors.aiTone).toContain("AI librarian");
  });
});
