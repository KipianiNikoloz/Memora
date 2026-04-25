import { isMemoryEntry, isTone } from "./ai-contract";
import type { MemoryEntry, UserProfile } from "./types";
import type { DemoBadgeWallet, MilestoneBadge } from "./xrpl-badges";

type Validator<T> = (value: unknown) => value is T;

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isOptionalString(record: Record<string, unknown>, key: string): boolean {
  return record[key] === undefined || typeof record[key] === "string";
}

function isString(value: unknown): value is string {
  return typeof value === "string";
}

export function readStoredJson<T>(key: string, fallback: T, validate: Validator<T>): T {
  if (typeof window === "undefined") return fallback;

  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;

  try {
    const parsed: unknown = JSON.parse(raw);
    return validate(parsed) ? parsed : fallback;
  } catch {
    return fallback;
  }
}

export function isUserProfile(value: unknown): value is UserProfile {
  return (
    isRecord(value) && typeof value.id === "string" && typeof value.email === "string" && isTone(value.defaultTone)
  );
}

export function isMemoryEntryArray(value: unknown): value is MemoryEntry[] {
  return Array.isArray(value) && value.every(isMemoryEntry);
}

export function isMilestoneBadge(value: unknown): value is MilestoneBadge {
  return (
    isRecord(value) &&
    typeof value.id === "string" &&
    typeof value.userId === "string" &&
    typeof value.entryId === "string" &&
    (value.status === "pending" || value.status === "issued" || value.status === "failed") &&
    typeof value.recipientAddress === "string" &&
    typeof value.metadataUri === "string" &&
    typeof value.createdAt === "string" &&
    typeof value.updatedAt === "string" &&
    isOptionalString(value, "issuerAddress") &&
    isOptionalString(value, "nftokenId") &&
    isOptionalString(value, "offerId") &&
    isOptionalString(value, "mintTxHash") &&
    isOptionalString(value, "offerTxHash") &&
    isOptionalString(value, "acceptTxHash") &&
    isOptionalString(value, "issuedAt") &&
    isOptionalString(value, "error")
  );
}

export function isMilestoneBadgeArray(value: unknown): value is MilestoneBadge[] {
  return Array.isArray(value) && value.every(isMilestoneBadge);
}

export function isDemoBadgeWallet(value: unknown): value is DemoBadgeWallet {
  return (
    isRecord(value) &&
    typeof value.address === "string" &&
    typeof value.seed === "string" &&
    value.network === "testnet" &&
    typeof value.createdAt === "string"
  );
}

export function isNullable<T>(validate: Validator<T>): Validator<T | null> {
  return (value: unknown): value is T | null => value === null || validate(value);
}

export const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every(isString);
