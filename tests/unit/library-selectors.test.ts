import { describe, expect, it } from "vitest";
import { seedEntries } from "@/lib/demo-data";
import {
  filterLibraryEntries,
  findLibrarianMatch,
  groupEntriesByLifePhase,
  selectLibrarianRequest,
} from "@/lib/library-selectors";

describe("library selectors", () => {
  it("filters entries by search text, emotion, and life phase", () => {
    expect(
      filterLibraryEntries(seedEntries, {
        query: "support",
        emotion: "Stressed",
        phase: "Challenges",
      }).map((entry) => entry.id),
    ).toEqual(["entry-2"]);
  });

  it("matches search text across title, memory, lesson, and tags case-insensitively", () => {
    expect(
      filterLibraryEntries(seedEntries, {
        query: "CONFIDENCE",
        emotion: "All",
        phase: "All",
      }).map((entry) => entry.id),
    ).toEqual(["entry-1"]);
  });

  it("groups filtered entries into non-empty shelves in life phase order", () => {
    const grouped = groupEntriesByLifePhase(seedEntries);

    expect(
      grouped.map((group) => ({
        shelf: group.shelf,
        ids: group.entries.map((entry) => entry.id),
      })),
    ).toEqual([
      { shelf: "New Beginnings", ids: ["entry-3"] },
      { shelf: "Growth and Learning", ids: ["entry-1"] },
      { shelf: "Challenges", ids: ["entry-2"] },
    ]);
  });
});

describe("librarian selectors", () => {
  it("selects the first entry when the query is empty", () => {
    expect(findLibrarianMatch(seedEntries, "")?.id).toBe("entry-1");
    expect(findLibrarianMatch([], "")).toBeUndefined();
  });

  it("finds a matching entry by query text and falls back to the first entry", () => {
    expect(findLibrarianMatch(seedEntries, "routine")?.id).toBe("entry-3");
    expect(findLibrarianMatch(seedEntries, "not on any shelf")?.id).toBe("entry-1");
  });

  it("builds a revisit prompt request around the matched entry for an empty query", () => {
    expect(selectLibrarianRequest(seedEntries, "", "Wise")).toEqual({
      task: "revisitPrompt",
      request: {
        entries: [seedEntries[0]],
        tone: "Wise",
      },
    });
  });

  it("builds a support-note reflection request when the query has text", () => {
    expect(selectLibrarianRequest(seedEntries, "confidence", "Humorous")).toEqual({
      task: "reflect",
      request: {
        entry: {
          title: "Support note",
          memory: "confidence",
          lesson: "",
          emotion: "Stressed",
          lifePhase: "Challenges",
          tags: [],
        },
        tone: "Humorous",
      },
    });
  });
});
