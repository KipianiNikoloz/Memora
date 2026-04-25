import { describe, expect, it } from "vitest";
import {
  mapBadgeRow,
  mapBadgeToUpsert,
  mapMemoryEntryRow,
  mapMemoryEntryToRow,
  mapProfileRow,
  mapProfileToUpsert
} from "@/lib/supabase/mappers";
import type { MemoryEntry } from "@/lib/types";
import type { MilestoneBadge } from "@/lib/xrpl-badges";

describe("Supabase mappers", () => {
  it("maps memory entry rows to app entries", () => {
    expect(mapMemoryEntryRow({
      id: "entry-1",
      user_id: "user-1",
      title: "A clear moment",
      memory: "I noticed what mattered and wrote it down.",
      lesson: "Small notes become useful evidence.",
      emotion: "Grateful",
      tags: ["notes", "care"],
      life_phase: "Growth and Learning",
      event_date: "2026-04-25",
      ai_tone: "Wise",
      ai_title: "Growth and Learning of notes",
      ai_response: null,
      created_at: "2026-04-25T10:00:00.000Z",
      updated_at: "2026-04-25T10:05:00.000Z"
    })).toEqual({
      id: "entry-1",
      userId: "user-1",
      title: "A clear moment",
      memory: "I noticed what mattered and wrote it down.",
      lesson: "Small notes become useful evidence.",
      emotion: "Grateful",
      tags: ["notes", "care"],
      lifePhase: "Growth and Learning",
      eventDate: "2026-04-25",
      aiTone: "Wise",
      aiTitle: "Growth and Learning of notes",
      aiResponse: undefined,
      createdAt: "2026-04-25T10:00:00.000Z",
      updatedAt: "2026-04-25T10:05:00.000Z"
    });
  });

  it("maps app entries to insert rows", () => {
    const entry: MemoryEntry = {
      id: "entry-2",
      userId: "user-2",
      title: "A useful chapter",
      memory: "This moment should be stored in Supabase.",
      lesson: "Persistence changes the product.",
      emotion: "Proud",
      tags: ["supabase"],
      lifePhase: "Milestones",
      eventDate: "2026-04-25",
      aiTone: "Motivational",
      aiTitle: "Milestones of supabase",
      aiResponse: "A useful reflection.",
      createdAt: "2026-04-25T11:00:00.000Z",
      updatedAt: "2026-04-25T11:00:00.000Z"
    };

    expect(mapMemoryEntryToRow(entry)).toEqual({
      id: "entry-2",
      user_id: "user-2",
      title: "A useful chapter",
      memory: "This moment should be stored in Supabase.",
      lesson: "Persistence changes the product.",
      emotion: "Proud",
      tags: ["supabase"],
      life_phase: "Milestones",
      event_date: "2026-04-25",
      ai_tone: "Motivational",
      ai_title: "Milestones of supabase",
      ai_response: "A useful reflection.",
      created_at: "2026-04-25T11:00:00.000Z",
      updated_at: "2026-04-25T11:00:00.000Z"
    });
  });

  it("maps profile rows in both directions", () => {
    expect(mapProfileRow({ id: "user-3", email: "user@example.com", default_tone: "Humorous" })).toEqual({
      id: "user-3",
      email: "user@example.com",
      defaultTone: "Humorous"
    });

    expect(mapProfileToUpsert({ id: "user-3", email: "user@example.com", defaultTone: "Wise" })).toEqual({
      id: "user-3",
      email: "user@example.com",
      default_tone: "Wise"
    });
  });

  it("maps XRPL milestone badge rows in both directions", () => {
    const badge: MilestoneBadge = {
      id: "badge-entry-1",
      userId: "user-1",
      entryId: "entry-1",
      status: "issued",
      recipientAddress: "rRecipient",
      issuerAddress: "rIssuer",
      nftokenId: "00080000ABC",
      offerId: "offer-1",
      mintTxHash: "mint-hash",
      offerTxHash: "offer-hash",
      acceptTxHash: "accept-hash",
      metadataUri: "data:application/json,%7B%7D",
      issuedAt: "2026-04-25T12:05:00.000Z",
      createdAt: "2026-04-25T12:00:00.000Z",
      updatedAt: "2026-04-25T12:05:00.000Z"
    };

    expect(mapBadgeToUpsert(badge)).toEqual({
      id: "badge-entry-1",
      user_id: "user-1",
      entry_id: "entry-1",
      status: "issued",
      recipient_address: "rRecipient",
      issuer_address: "rIssuer",
      nftoken_id: "00080000ABC",
      offer_id: "offer-1",
      mint_tx_hash: "mint-hash",
      offer_tx_hash: "offer-hash",
      accept_tx_hash: "accept-hash",
      metadata_uri: "data:application/json,%7B%7D",
      issued_at: "2026-04-25T12:05:00.000Z",
      created_at: "2026-04-25T12:00:00.000Z",
      updated_at: "2026-04-25T12:05:00.000Z",
      error: null
    });

    expect(mapBadgeRow({
      id: "badge-entry-1",
      user_id: "user-1",
      entry_id: "entry-1",
      status: "failed",
      recipient_address: "rRecipient",
      issuer_address: null,
      nftoken_id: null,
      offer_id: null,
      mint_tx_hash: null,
      offer_tx_hash: null,
      accept_tx_hash: null,
      metadata_uri: "data:application/json,%7B%7D",
      issued_at: null,
      created_at: "2026-04-25T12:00:00.000Z",
      updated_at: "2026-04-25T12:05:00.000Z",
      error: "Issuer missing"
    })).toMatchObject({
      id: "badge-entry-1",
      userId: "user-1",
      entryId: "entry-1",
      status: "failed",
      recipientAddress: "rRecipient",
      error: "Issuer missing"
    });
  });
});
