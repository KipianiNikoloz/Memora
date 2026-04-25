import { describe, expect, it } from "vitest";
import { seedEntries } from "@/lib/demo-data";
import { buildBadgeMetadataUri, createPendingBadge, isMilestoneBadgeEligible } from "@/lib/xrpl-badges";
import { buildDestinationSellOffer, buildMilestoneNFTokenMint, stringToHex } from "@/lib/xrpl-transactions";

describe("XRPL milestone badges", () => {
  it("limits eligibility to Proud or Milestones entries", () => {
    expect(isMilestoneBadgeEligible(seedEntries[0])).toBe(true);
    expect(isMilestoneBadgeEligible(seedEntries[1])).toBe(false);
    expect(isMilestoneBadgeEligible({ ...seedEntries[1], lifePhase: "Milestones" })).toBe(true);
  });

  it("builds private-safe public metadata", () => {
    const uri = buildBadgeMetadataUri(seedEntries[0]);
    const metadata = JSON.parse(decodeURIComponent(uri.replace("data:application/json,", "")));

    expect(metadata).toMatchObject({
      name: "Memora Milestone Badge",
      category: "Proud",
      eventDate: seedEntries[0].eventDate,
      issuer: "Memora"
    });
    expect(uri).not.toContain(seedEntries[0].memory);
    expect(uri).not.toContain(seedEntries[0].lesson);
    expect(uri).not.toContain(seedEntries[0].title);
    expect(uri).not.toContain(seedEntries[0].userId);
  });

  it("creates pending badge state for an entry and recipient", () => {
    const badge = createPendingBadge(seedEntries[0], "rRecipient", new Date("2026-04-25T12:00:00.000Z"));

    expect(badge).toMatchObject({
      id: "badge-entry-1",
      userId: "demo-user",
      entryId: "entry-1",
      status: "pending",
      recipientAddress: "rRecipient",
      createdAt: "2026-04-25T12:00:00.000Z"
    });
  });

  it("builds non-transferable mint and zero-XRP destination offer transactions", () => {
    const mint = buildMilestoneNFTokenMint({
      account: "rIssuer",
      metadataUri: "data:application/json,%7B%7D"
    });
    const offer = buildDestinationSellOffer({
      account: "rIssuer",
      nftokenId: "00080000ABC",
      destination: "rRecipient"
    });

    expect(mint).toMatchObject({
      TransactionType: "NFTokenMint",
      Account: "rIssuer",
      URI: stringToHex("data:application/json,%7B%7D")
    });
    expect(mint).not.toHaveProperty("Flags");
    expect(offer).toMatchObject({
      TransactionType: "NFTokenCreateOffer",
      Amount: "0",
      Destination: "rRecipient",
      Flags: 1
    });
  });
});
