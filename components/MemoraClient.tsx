"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { requestAiLibrarian } from "@/lib/ai-client";
import { demoUser, seedEntries } from "@/lib/demo-data";
import { getRuntimeMode, type RuntimeMode } from "@/lib/runtime-mode";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  deleteEntry as deleteSupabaseEntry,
  loadBadges,
  insertEntry as insertSupabaseEntry,
  loadEntries,
  loadProfileForSession,
  updateEntry as updateSupabaseEntry,
  upsertProfile,
  upsertBadge as upsertSupabaseBadge,
  type SupabaseClientLike,
  type SupabaseSession
} from "@/lib/supabase/runtime-data";
import type { MemoryEntry, Tone, UserProfile } from "@/lib/types";
import {
  createPendingBadge,
  isMilestoneBadgeEligible,
  type DemoBadgeWallet,
  type MilestoneBadge,
  type XrplBadgeIssueResult
} from "@/lib/xrpl-badges";

export type AuthMode = "sign-in" | "sign-up";

export type AuthResult = {
  ok: boolean;
  status: "signed-in" | "check-email" | "error";
  message?: string;
};

type MemoraContextValue = {
  mode: RuntimeMode;
  loading: boolean;
  error: string | null;
  user: UserProfile | null;
  entries: MemoryEntry[];
  badges: MilestoneBadge[];
  demoBadgeWallet: DemoBadgeWallet | null;
  signIn: (email: string, password: string, mode?: AuthMode) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  addEntry: (entry: MemoryEntry) => Promise<MemoryEntry>;
  updateEntry: (entry: MemoryEntry) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  setDefaultTone: (tone: Tone) => Promise<void>;
  createDemoBadgeWallet: () => Promise<DemoBadgeWallet>;
  issueMilestoneBadge: (entryId: string) => Promise<MilestoneBadge>;
  refreshBadgeStatus: (entryId: string) => Promise<MilestoneBadge | undefined>;
  exportEntries: () => string;
};

const MemoraContext = createContext<MemoraContextValue | null>(null);

const userKey = "memora:user";
const entriesKey = "memora:entries";
const badgesKey = "memora:xrpl-badges";
const badgeWalletKey = "memora:xrpl-demo-wallet";

function readJson<T>(key: string, fallback: T): T {
  if (typeof window === "undefined") return fallback;
  const raw = window.localStorage.getItem(key);
  if (!raw) return fallback;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

type MemoraProviderProps = {
  children: React.ReactNode;
  runtimeMode?: RuntimeMode;
  supabaseClient?: SupabaseClientLike | null;
};

export function MemoraProvider({ children, runtimeMode, supabaseClient }: MemoraProviderProps) {
  const mode = runtimeMode ?? getRuntimeMode();
  const supabase = useMemo(() => {
    if (mode !== "supabase") return null;
    return supabaseClient ?? (createSupabaseBrowserClient() as SupabaseClientLike | null);
  }, [mode, supabaseClient]);
  const [user, setUser] = useState<UserProfile | null>(null);
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [badges, setBadges] = useState<MilestoneBadge[]>([]);
  const [demoBadgeWallet, setDemoBadgeWallet] = useState<DemoBadgeWallet | null>(null);
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hydrateSupabaseSession = useCallback(async (session: SupabaseSession) => {
    if (!session) {
      setUser(null);
      setEntries([]);
      setBadges([]);
      setHydrated(true);
      setLoading(false);
      return;
    }

    if (!supabase) {
      setError("Supabase mode is enabled, but Supabase is not configured.");
      setHydrated(true);
      setLoading(false);
      return;
    }

    setLoading(true);
    setError(null);
    try {
      const [profile, loadedEntries] = await Promise.all([
        loadProfileForSession(supabase, session),
        loadEntries(supabase)
      ]);
      const loadedBadges = await loadBadges(supabase);
      setUser(profile);
      setEntries(loadedEntries);
      setBadges(loadedBadges);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Unable to load Supabase data.";
      setError(message);
      setUser(null);
      setEntries([]);
      setBadges([]);
    } finally {
      setHydrated(true);
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (mode !== "demo") return;
    const storedUser = readJson<UserProfile | null>(userKey, demoUser);
    const storedEntries = readJson<MemoryEntry[]>(entriesKey, seedEntries);
    const storedBadges = readJson<MilestoneBadge[]>(badgesKey, []);
    const storedBadgeWallet = readJson<DemoBadgeWallet | null>(badgeWalletKey, null);
    setUser(storedUser);
    setEntries(storedEntries);
    setBadges(storedBadges);
    setDemoBadgeWallet(storedBadgeWallet);
    setHydrated(true);
    setLoading(false);
    setError(null);
  }, [mode]);

  useEffect(() => {
    if (mode !== "supabase") return;

    if (!supabase) {
      setError("Supabase mode is enabled, but `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_ANON_KEY` are required.");
      setHydrated(true);
      setLoading(false);
      return;
    }

    let active = true;

    supabase.auth.getSession().then(({ data, error: sessionError }) => {
      if (!active) return;
      if (sessionError) {
        setError(sessionError.message);
        setHydrated(true);
        setLoading(false);
        return;
      }
      void hydrateSupabaseSession(data.session);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      if (!active) return;
      void hydrateSupabaseSession(session);
    });

    return () => {
      active = false;
      data.subscription.unsubscribe();
    };
  }, [hydrateSupabaseSession, mode, supabase]);

  useEffect(() => {
    if (mode === "demo" && hydrated && typeof window !== "undefined") {
      window.localStorage.setItem(entriesKey, JSON.stringify(entries));
    }
  }, [entries, hydrated, mode]);

  useEffect(() => {
    if (mode === "demo" && hydrated && typeof window !== "undefined") {
      window.localStorage.setItem(badgesKey, JSON.stringify(badges));
    }
  }, [badges, hydrated, mode]);

  useEffect(() => {
    if (mode === "demo" && hydrated && typeof window !== "undefined") {
      window.localStorage.setItem(badgeWalletKey, JSON.stringify(demoBadgeWallet));
    }
  }, [demoBadgeWallet, hydrated, mode]);

  useEffect(() => {
    if (mode === "demo" && hydrated && typeof window !== "undefined") {
      window.localStorage.setItem(userKey, JSON.stringify(user));
    }
  }, [hydrated, mode, user]);

  const saveBadge = useCallback(async (badge: MilestoneBadge): Promise<MilestoneBadge> => {
    if (mode === "supabase") {
      if (!supabase) throw new Error("Supabase mode is enabled, but Supabase is not configured.");
      const saved = await upsertSupabaseBadge(supabase, badge);
      setBadges((current) => [saved, ...current.filter((item) => item.id !== saved.id)]);
      return saved;
    }

    setBadges((current) => [badge, ...current.filter((item) => item.id !== badge.id)]);
    return badge;
  }, [mode, supabase]);

  const createDemoBadgeWallet = useCallback(async (): Promise<DemoBadgeWallet> => {
    if (demoBadgeWallet) return demoBadgeWallet;

    const response = await fetch("/api/xrpl/badges/wallet", { method: "POST" });
    if (!response.ok) {
      throw new Error("Unable to create XRPL Testnet demo wallet.");
    }

    const wallet = await response.json() as DemoBadgeWallet;
    setDemoBadgeWallet(wallet);
    return wallet;
  }, [demoBadgeWallet]);

  const value = useMemo<MemoraContextValue>(() => ({
    mode,
    loading,
    error,
    user,
    entries: user ? entries.filter((entry) => entry.userId === user.id) : [],
    badges: user ? badges.filter((badge) => badge.userId === user.id) : [],
    demoBadgeWallet,
    async signIn(email: string, password: string, authMode: AuthMode = "sign-in") {
      setError(null);

      if (mode === "demo") {
        const nextUser = { ...demoUser, email, id: email.trim().toLowerCase() || demoUser.id };
        setUser(nextUser);
        if (!entries.length) setEntries(seedEntries.map((entry) => ({ ...entry, userId: nextUser.id })));
        return { ok: true, status: "signed-in" };
      }

      if (!supabase) {
        const message = "Supabase mode is enabled, but Supabase is not configured.";
        setError(message);
        return { ok: false, status: "error", message };
      }

      const result = authMode === "sign-up"
        ? await supabase.auth.signUp({ email, password })
        : await supabase.auth.signInWithPassword({ email, password });

      if (result.error) {
        setError(result.error.message);
        return { ok: false, status: "error", message: result.error.message };
      }

      if (result.data.session) {
        await hydrateSupabaseSession(result.data.session);
        return { ok: true, status: "signed-in" };
      }

      return {
        ok: true,
        status: "check-email",
        message: "Check your email to confirm your account before signing in."
      };
    },
    async signOut() {
      setError(null);
      if (mode === "supabase" && supabase) {
        const result = await supabase.auth.signOut();
        if (result.error) {
          setError(result.error.message);
          throw new Error(result.error.message);
        }
      }
      setUser(null);
      setEntries([]);
      setBadges([]);
    },
    async addEntry(entry: MemoryEntry) {
      const [aiTitleResult, aiResponseResult] = await Promise.all([
        requestAiLibrarian("suggestTitle", { entry, tone: entry.aiTone }),
        requestAiLibrarian("reflect", { entry, tone: entry.aiTone })
      ]);
      const aiTitle = aiTitleResult.text;
      const aiResponse = aiResponseResult.text;
      const saved = { ...entry, aiTitle, aiResponse };

      if (mode === "supabase") {
        if (!supabase) throw new Error("Supabase mode is enabled, but Supabase is not configured.");
        try {
          const inserted = await insertSupabaseEntry(supabase, saved);
          setEntries((current) => [inserted, ...current.filter((item) => item.id !== inserted.id)]);
          return inserted;
        } catch (cause) {
          const message = cause instanceof Error ? cause.message : "Unable to save entry.";
          setError(message);
          throw new Error(message);
        }
      }

      setEntries((current) => [saved, ...current]);
      return saved;
    },
    async updateEntry(entry: MemoryEntry) {
      const updated = { ...entry, updatedAt: new Date().toISOString() };

      if (mode === "supabase") {
        if (!supabase) throw new Error("Supabase mode is enabled, but Supabase is not configured.");
        try {
          const saved = await updateSupabaseEntry(supabase, updated);
          setEntries((current) => current.map((item) => (item.id === saved.id ? saved : item)));
          return;
        } catch (cause) {
          const message = cause instanceof Error ? cause.message : "Unable to update entry.";
          setError(message);
          throw new Error(message);
        }
      }

      setEntries((current) => current.map((item) => (item.id === updated.id ? updated : item)));
    },
    async deleteEntry(id: string) {
      if (mode === "supabase") {
        if (!supabase) throw new Error("Supabase mode is enabled, but Supabase is not configured.");
        try {
          await deleteSupabaseEntry(supabase, id);
        } catch (cause) {
          const message = cause instanceof Error ? cause.message : "Unable to delete entry.";
          setError(message);
          throw new Error(message);
        }
      }
      setEntries((current) => current.filter((entry) => entry.id !== id));
    },
    async setDefaultTone(tone: Tone) {
      if (!user) return;
      const nextUser = { ...user, defaultTone: tone };
      setUser(nextUser);

      if (mode === "supabase") {
        if (!supabase) throw new Error("Supabase mode is enabled, but Supabase is not configured.");
        try {
          const saved = await upsertProfile(supabase, nextUser);
          setUser(saved);
        } catch (cause) {
          const message = cause instanceof Error ? cause.message : "Unable to save profile.";
          setError(message);
          throw new Error(message);
        }
      }
    },
    createDemoBadgeWallet,
    async refreshBadgeStatus(entryId: string) {
      if (mode === "supabase" && supabase) {
        const loadedBadges = await loadBadges(supabase);
        setBadges(loadedBadges);
        return loadedBadges.find((badge) => badge.entryId === entryId && badge.userId === user?.id);
      }

      return badges.find((badge) => badge.entryId === entryId && badge.userId === user?.id);
    },
    async issueMilestoneBadge(entryId: string) {
      const entry = entries.find((item) => item.id === entryId && item.userId === user?.id);
      if (!entry) throw new Error("Entry not found.");
      if (!isMilestoneBadgeEligible(entry)) throw new Error("This entry is not eligible for a milestone badge.");

      const existing = badges.find((badge) => badge.entryId === entry.id && badge.userId === entry.userId);
      if (existing?.status === "issued") return existing;

      const wallet = await createDemoBadgeWallet();
      const pending = await saveBadge({
        ...(existing ?? createPendingBadge(entry, wallet.address)),
        status: "pending",
        recipientAddress: wallet.address,
        error: undefined,
        updatedAt: new Date().toISOString()
      });

      try {
        const response = await fetch("/api/xrpl/badges/issue", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            entry: {
              id: entry.id,
              emotion: entry.emotion,
              lifePhase: entry.lifePhase,
              eventDate: entry.eventDate
            },
            recipientAddress: wallet.address,
            recipientSeed: wallet.seed
          })
        });
        const payload = await response.json() as Partial<XrplBadgeIssueResult> & { error?: string };
        if (!response.ok) {
          throw new Error(payload.error ?? "Unable to issue XRPL badge.");
        }

        return saveBadge({
          ...pending,
          status: "issued",
          issuerAddress: payload.issuerAddress,
          recipientAddress: payload.recipientAddress ?? wallet.address,
          nftokenId: payload.nftokenId,
          offerId: payload.offerId,
          mintTxHash: payload.mintTxHash,
          offerTxHash: payload.offerTxHash,
          acceptTxHash: payload.acceptTxHash,
          metadataUri: payload.metadataUri ?? pending.metadataUri,
          issuedAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
          error: undefined
        });
      } catch (cause) {
        const message = cause instanceof Error ? cause.message : "Unable to issue XRPL badge.";
        setError(message);
        return saveBadge({
          ...pending,
          status: "failed",
          error: message,
          updatedAt: new Date().toISOString()
        });
      }
    },
    exportEntries() {
      return JSON.stringify(entries.filter((entry) => entry.userId === user?.id), null, 2);
    }
  }), [badges, createDemoBadgeWallet, demoBadgeWallet, entries, error, hydrateSupabaseSession, loading, mode, saveBadge, supabase, user]);

  return <MemoraContext.Provider value={value}>{children}</MemoraContext.Provider>;
}

export function useMemora() {
  const context = useContext(MemoraContext);
  if (!context) {
    throw new Error("useMemora must be used inside MemoraProvider");
  }
  return context;
}
