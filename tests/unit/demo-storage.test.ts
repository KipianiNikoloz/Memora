import { describe, expect, it } from "vitest";
import {
  isDemoBadgeWallet,
  isMemoryEntryArray,
  isMilestoneBadge,
  isUserProfile,
  readStoredJson,
} from "@/lib/demo-storage";
import { seedEntries } from "@/lib/demo-data";
import { createPendingBadge } from "@/lib/xrpl-badges";

describe("demo storage validation", () => {
  it("accepts valid stored demo shapes", () => {
    expect(isUserProfile({ id: "user", email: "user@example.com", defaultTone: "Wise" })).toBe(true);
    expect(isMemoryEntryArray(seedEntries)).toBe(true);
    expect(isMilestoneBadge(createPendingBadge(seedEntries[0], "rRecipient"))).toBe(true);
    expect(
      isDemoBadgeWallet({
        address: "rRecipient",
        seed: "sSeed",
        network: "testnet",
        createdAt: "2026-04-25T12:00:00.000Z",
      }),
    ).toBe(true);
  });

  it("rejects corrupt controlled values", () => {
    expect(isUserProfile({ id: "user", email: "user@example.com", defaultTone: "Clinical" })).toBe(false);
    expect(isMemoryEntryArray([{ ...seedEntries[0], emotion: "Excited" }])).toBe(false);
    expect(
      isDemoBadgeWallet({
        address: "rRecipient",
        seed: "sSeed",
        network: "mainnet",
        createdAt: "2026-04-25T12:00:00.000Z",
      }),
    ).toBe(false);
  });

  it("falls back when localStorage data is invalid", () => {
    window.localStorage.setItem("memora:test", JSON.stringify({ defaultTone: "Clinical" }));

    const result = readStoredJson(
      "memora:test",
      { id: "fallback", email: "demo@memora.local", defaultTone: "Wise" },
      isUserProfile,
    );

    expect(result.id).toBe("fallback");
  });
});
