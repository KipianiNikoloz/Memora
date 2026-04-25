import { describe, expect, it } from "vitest";
import { seedEntries } from "@/lib/demo-data";
import { buildInsights, moodLabel } from "@/lib/insights";

describe("insights", () => {
  it("builds non-diagnostic summaries from private entries", () => {
    const insights = buildInsights(seedEntries);
    expect(insights.lowData).toBe(false);
    expect(insights.milestones[0].title).toBe("A Small Win at Work");
    expect(moodLabel(insights.moodCounts)).toContain("appears most often");
  });

  it("uses a low-data state for sparse libraries", () => {
    expect(buildInsights(seedEntries.slice(0, 1)).lowData).toBe(true);
  });
});
