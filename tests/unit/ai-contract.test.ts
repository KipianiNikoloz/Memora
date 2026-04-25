import { describe, expect, it } from "vitest";
import { isAiResult, parseLibrarianRequestBody } from "@/lib/ai-contract";
import { seedEntries } from "@/lib/demo-data";

describe("AI contract validation", () => {
  it("parses valid librarian requests", () => {
    expect(
      parseLibrarianRequestBody({
        task: "summarize",
        tone: "Wise",
        entries: seedEntries,
      }),
    ).toEqual({
      task: "summarize",
      request: {
        tone: "Wise",
        entry: undefined,
        entries: seedEntries,
      },
    });
  });

  it("rejects invalid controlled values in entries", () => {
    expect(
      parseLibrarianRequestBody({
        task: "reflect",
        tone: "Wise",
        entry: {
          title: "Untyped feeling",
          memory: "Something happened.",
          lesson: "Names matter.",
          emotion: "Excited",
          lifePhase: "Growth and Learning",
          tags: [],
        },
      }),
    ).toBeNull();

    expect(
      parseLibrarianRequestBody({
        task: "summarize",
        tone: "Wise",
        entries: [{ ...seedEntries[0], aiTone: "Clinical" }],
      }),
    ).toBeNull();
  });

  it("validates AI result payloads", () => {
    expect(
      isAiResult({
        text: "Useful result",
        provider: "google",
        model: "test-model",
        fallbackUsed: false,
      }),
    ).toBe(true);

    expect(
      isAiResult({
        text: "Not quite",
        provider: "unexpected",
        fallbackUsed: false,
      }),
    ).toBe(false);
  });
});
