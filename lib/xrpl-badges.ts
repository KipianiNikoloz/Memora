import type { MemoryEntry } from "./types";

export type BadgeStatus = "pending" | "issued" | "failed";

export type MilestoneBadge = {
  id: string;
  userId: string;
  entryId: string;
  status: BadgeStatus;
  recipientAddress: string;
  issuerAddress?: string;
  nftokenId?: string;
  offerId?: string;
  mintTxHash?: string;
  offerTxHash?: string;
  acceptTxHash?: string;
  metadataUri: string;
  issuedAt?: string;
  createdAt: string;
  updatedAt: string;
  error?: string;
};

export type DemoBadgeWallet = {
  address: string;
  seed: string;
  network: "testnet";
  createdAt: string;
};

export type BadgeMetadata = {
  name: "Memora Milestone Badge";
  category: "Proud" | "Milestones";
  eventDate: string;
  issuer: "Memora";
  version: "1";
};

export type XrplBadgeIssueResult = {
  issuerAddress: string;
  recipientAddress: string;
  nftokenId: string;
  offerId: string;
  mintTxHash: string;
  offerTxHash: string;
  acceptTxHash: string;
  metadataUri: string;
};

export const XRPL_BADGE_NETWORK = "testnet";
export const XRPL_TESTNET_SERVER = "wss://s.altnet.rippletest.net:51233/";
export const XRPL_MILESTONE_BADGE_TAXON = 20260425;

export function isMilestoneBadgeEligible(entry: { emotion: string; lifePhase: string }): boolean {
  return entry.emotion === "Proud" || entry.lifePhase === "Milestones";
}

export function badgeCategory(entry: { emotion: string; lifePhase: string }): BadgeMetadata["category"] {
  return entry.lifePhase === "Milestones" ? "Milestones" : "Proud";
}

export function buildBadgeMetadata(entry: { emotion: string; lifePhase: string; eventDate: string }): BadgeMetadata {
  return {
    name: "Memora Milestone Badge",
    category: badgeCategory(entry),
    eventDate: entry.eventDate,
    issuer: "Memora",
    version: "1",
  };
}

export function buildBadgeMetadataUri(entry: { emotion: string; lifePhase: string; eventDate: string }): string {
  const metadata = buildBadgeMetadata(entry);
  return `data:application/json,${encodeURIComponent(JSON.stringify(metadata))}`;
}

export function createPendingBadge(entry: MemoryEntry, recipientAddress: string, now = new Date()): MilestoneBadge {
  const timestamp = now.toISOString();
  return {
    id: `badge-${entry.id}`,
    userId: entry.userId,
    entryId: entry.id,
    status: "pending",
    recipientAddress,
    metadataUri: buildBadgeMetadataUri(entry),
    createdAt: timestamp,
    updatedAt: timestamp,
  };
}

export function publicXrplTxUrl(hash?: string): string | undefined {
  return hash ? `https://testnet.xrpl.org/transactions/${hash}` : undefined;
}

export function publicXrplNftUrl(nftokenId?: string): string | undefined {
  return nftokenId ? `https://testnet.xrpl.org/nft/${nftokenId}` : undefined;
}
