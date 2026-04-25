import type { MemoryEntry, UserProfile } from "@/lib/types";
import {
  mapBadgeRow,
  mapBadgeToUpsert,
  mapMemoryEntryRow,
  mapMemoryEntryToRow,
  mapProfileRow,
  mapProfileToUpsert,
  type MemoraProfileRow,
  type MemoryEntryRow,
  type XrplMilestoneBadgeRow
} from "./mappers";
import type { MilestoneBadge } from "@/lib/xrpl-badges";

type SupabaseError = {
  message: string;
};

export type SupabaseAuthUser = {
  id: string;
  email?: string | null;
};

export type SupabaseSession = {
  user: SupabaseAuthUser;
} | null;

type QueryResult<T> = Promise<{
  data: T | null;
  error: SupabaseError | null;
}>;

export type SupabaseClientLike = {
  auth: {
    getSession: () => Promise<{ data: { session: SupabaseSession }; error: SupabaseError | null }>;
    onAuthStateChange: (
      callback: (event: string, session: SupabaseSession) => void
    ) => { data: { subscription: { unsubscribe: () => void } } };
    signInWithPassword: (credentials: { email: string; password: string }) => Promise<{ data: { session: SupabaseSession }; error: SupabaseError | null }>;
    signUp: (credentials: { email: string; password: string }) => Promise<{ data: { session: SupabaseSession; user?: SupabaseAuthUser | null }; error: SupabaseError | null }>;
    signOut: () => Promise<{ error: SupabaseError | null }>;
  };
  // Supabase query builders are thenable fluent objects. The runtime helpers
  // below own the exact operations; tests provide a narrow fake for those calls.
  from: (table: "memora_profiles" | "memory_entries" | "xrpl_milestone_badges") => any;
};

function assertNoError<T>(result: { data: T | null; error: SupabaseError | null }): T {
  if (result.error) {
    throw new Error(result.error.message);
  }
  if (result.data === null) {
    throw new Error("Supabase returned no data.");
  }
  return result.data;
}

export function profileFromSession(session: NonNullable<SupabaseSession>): UserProfile {
  return {
    id: session.user.id,
    email: session.user.email ?? "",
    defaultTone: "Wise"
  };
}

export async function upsertProfile(client: SupabaseClientLike, profile: UserProfile): Promise<UserProfile> {
  const result = await client
    .from("memora_profiles")
    .upsert(mapProfileToUpsert(profile))
    .select("*")
    .single();

  return mapProfileRow(assertNoError<MemoraProfileRow>(result));
}

export async function loadProfileForSession(client: SupabaseClientLike, session: NonNullable<SupabaseSession>): Promise<UserProfile> {
  const fallbackProfile = profileFromSession(session);
  const existing = await client
    .from("memora_profiles")
    .select("*")
    .eq("id", fallbackProfile.id)
    .maybeSingle();

  if (existing.error) {
    throw new Error(existing.error.message);
  }

  const profile = existing.data ? mapProfileRow(existing.data) : fallbackProfile;
  return upsertProfile(client, { ...profile, email: fallbackProfile.email });
}

export async function loadEntries(client: SupabaseClientLike): Promise<MemoryEntry[]> {
  const result = await client
    .from("memory_entries")
    .select("*")
    .order("created_at", { ascending: false });

  return assertNoError<MemoryEntryRow[]>(result).map(mapMemoryEntryRow);
}

export async function insertEntry(client: SupabaseClientLike, entry: MemoryEntry): Promise<MemoryEntry> {
  const result = await client
    .from("memory_entries")
    .insert(mapMemoryEntryToRow(entry))
    .select("*")
    .single();

  return mapMemoryEntryRow(assertNoError<MemoryEntryRow>(result));
}

export async function updateEntry(client: SupabaseClientLike, entry: MemoryEntry): Promise<MemoryEntry> {
  const result = await client
    .from("memory_entries")
    .update(mapMemoryEntryToRow(entry))
    .eq("id", entry.id)
    .select("*")
    .single();

  return mapMemoryEntryRow(assertNoError<MemoryEntryRow>(result));
}

export async function deleteEntry(client: SupabaseClientLike, id: string): Promise<void> {
  const result = await client
    .from("memory_entries")
    .delete()
    .eq("id", id);

  if (result.error) {
    throw new Error(result.error.message);
  }
}

export async function loadBadges(client: SupabaseClientLike): Promise<MilestoneBadge[]> {
  const result = await client
    .from("xrpl_milestone_badges")
    .select("*")
    .order("created_at", { ascending: false });

  return assertNoError<XrplMilestoneBadgeRow[]>(result).map(mapBadgeRow);
}

export async function upsertBadge(client: SupabaseClientLike, badge: MilestoneBadge): Promise<MilestoneBadge> {
  const result = await client
    .from("xrpl_milestone_badges")
    .upsert(mapBadgeToUpsert(badge))
    .select("*")
    .single();

  return mapBadgeRow(assertNoError<XrplMilestoneBadgeRow>(result));
}
