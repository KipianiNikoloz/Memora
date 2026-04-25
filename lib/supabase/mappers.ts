import type { Emotion, LifePhase, MemoryEntry, Tone, UserProfile } from "@/lib/types";
import type { BadgeStatus, MilestoneBadge } from "@/lib/xrpl-badges";

export type MemoryEntryRow = {
  id: string;
  user_id: string;
  title: string;
  memory: string;
  lesson: string;
  emotion: string;
  tags: string[];
  life_phase: string;
  event_date: string;
  ai_tone: string;
  ai_title: string | null;
  ai_response: string | null;
  created_at: string;
  updated_at: string;
};

export type MemoryEntryInsert = Omit<MemoryEntryRow, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export type MemoraProfileRow = {
  id: string;
  email: string;
  default_tone: string;
  created_at?: string;
};

export type MemoraProfileUpsert = {
  id: string;
  email: string;
  default_tone: string;
};

export type XrplMilestoneBadgeRow = {
  id: string;
  user_id: string;
  entry_id: string;
  status: string;
  recipient_address: string;
  issuer_address: string | null;
  nftoken_id: string | null;
  offer_id: string | null;
  mint_tx_hash: string | null;
  offer_tx_hash: string | null;
  accept_tx_hash: string | null;
  metadata_uri: string;
  issued_at: string | null;
  created_at: string;
  updated_at: string;
  error: string | null;
};

export type XrplMilestoneBadgeUpsert = Omit<XrplMilestoneBadgeRow, "created_at" | "updated_at"> & {
  created_at?: string;
  updated_at?: string;
};

export function mapMemoryEntryRow(row: MemoryEntryRow): MemoryEntry {
  return {
    id: row.id,
    userId: row.user_id,
    title: row.title,
    memory: row.memory,
    lesson: row.lesson,
    emotion: row.emotion as Emotion,
    tags: row.tags,
    lifePhase: row.life_phase as LifePhase,
    eventDate: row.event_date,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    aiTone: row.ai_tone as Tone,
    aiTitle: row.ai_title ?? undefined,
    aiResponse: row.ai_response ?? undefined
  };
}

export function mapMemoryEntryToRow(entry: MemoryEntry): MemoryEntryInsert {
  return {
    id: entry.id,
    user_id: entry.userId,
    title: entry.title,
    memory: entry.memory,
    lesson: entry.lesson,
    emotion: entry.emotion,
    tags: entry.tags,
    life_phase: entry.lifePhase,
    event_date: entry.eventDate,
    ai_tone: entry.aiTone,
    ai_title: entry.aiTitle ?? null,
    ai_response: entry.aiResponse ?? null,
    created_at: entry.createdAt,
    updated_at: entry.updatedAt
  };
}

export function mapProfileRow(row: MemoraProfileRow): UserProfile {
  return {
    id: row.id,
    email: row.email,
    defaultTone: row.default_tone as Tone
  };
}

export function mapProfileToUpsert(profile: UserProfile): MemoraProfileUpsert {
  return {
    id: profile.id,
    email: profile.email,
    default_tone: profile.defaultTone
  };
}

export function mapBadgeRow(row: XrplMilestoneBadgeRow): MilestoneBadge {
  return {
    id: row.id,
    userId: row.user_id,
    entryId: row.entry_id,
    status: row.status as BadgeStatus,
    recipientAddress: row.recipient_address,
    issuerAddress: row.issuer_address ?? undefined,
    nftokenId: row.nftoken_id ?? undefined,
    offerId: row.offer_id ?? undefined,
    mintTxHash: row.mint_tx_hash ?? undefined,
    offerTxHash: row.offer_tx_hash ?? undefined,
    acceptTxHash: row.accept_tx_hash ?? undefined,
    metadataUri: row.metadata_uri,
    issuedAt: row.issued_at ?? undefined,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
    error: row.error ?? undefined
  };
}

export function mapBadgeToUpsert(badge: MilestoneBadge): XrplMilestoneBadgeUpsert {
  return {
    id: badge.id,
    user_id: badge.userId,
    entry_id: badge.entryId,
    status: badge.status,
    recipient_address: badge.recipientAddress,
    issuer_address: badge.issuerAddress ?? null,
    nftoken_id: badge.nftokenId ?? null,
    offer_id: badge.offerId ?? null,
    mint_tx_hash: badge.mintTxHash ?? null,
    offer_tx_hash: badge.offerTxHash ?? null,
    accept_tx_hash: badge.acceptTxHash ?? null,
    metadata_uri: badge.metadataUri,
    issued_at: badge.issuedAt ?? null,
    created_at: badge.createdAt,
    updated_at: badge.updatedAt,
    error: badge.error ?? null
  };
}
