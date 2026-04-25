import { describe, expect, it } from "vitest";
import { createEntryFromDraft } from "@/lib/validation";

function entriesForUser<T extends { userId: string }>(entries: T[], userId: string) {
  return entries.filter((entry) => entry.userId === userId);
}

describe("private data ownership", () => {
  it("keeps representative user entries isolated", () => {
    const draft = {
      title: "Private chapter",
      memory: "This memory belongs to one signed-in user only.",
      lesson: "Ownership should be enforced everywhere.",
      emotion: "Proud" as const,
      tags: "privacy",
      lifePhase: "Milestones" as const,
      aiTone: "Wise" as const,
    };
    const userOne = createEntryFromDraft(draft, "user-one");
    const userTwo = createEntryFromDraft({ ...draft, title: "Other chapter" }, "user-two");

    expect(entriesForUser([userOne, userTwo], "user-one")).toHaveLength(1);
    expect(entriesForUser([userOne, userTwo], "user-one")[0].title).toBe("Private chapter");
  });
});
