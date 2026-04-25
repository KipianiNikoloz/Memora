import { describe, expect, it } from "vitest";
import { parseXrplBadgeIssueRequest } from "@/lib/xrpl-contract";

const validRequest = {
  entry: {
    id: "entry-1",
    emotion: "Proud",
    lifePhase: "Milestones",
    eventDate: "2026-04-25",
  },
  recipientAddress: "rRecipient",
  recipientSeed: "sSeed",
};

describe("XRPL badge issue contract", () => {
  it("parses valid badge issue requests", () => {
    expect(parseXrplBadgeIssueRequest(validRequest)).toEqual(validRequest);
  });

  it("rejects invalid controlled values and dates", () => {
    expect(
      parseXrplBadgeIssueRequest({
        ...validRequest,
        entry: { ...validRequest.entry, emotion: "Excited" },
      }),
    ).toBeNull();

    expect(
      parseXrplBadgeIssueRequest({
        ...validRequest,
        entry: { ...validRequest.entry, eventDate: "25/04/2026" },
      }),
    ).toBeNull();
  });

  it("rejects missing recipient wallet data", () => {
    expect(
      parseXrplBadgeIssueRequest({
        entry: validRequest.entry,
        recipientAddress: "rRecipient",
      }),
    ).toBeNull();
  });
});
