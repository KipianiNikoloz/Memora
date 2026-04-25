"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import { mockAiLibrarian } from "@/lib/ai";
import { demoUser, seedEntries } from "@/lib/demo-data";
import { getRuntimeMode, type RuntimeMode } from "@/lib/runtime-mode";
import { createSupabaseBrowserClient } from "@/lib/supabase/client";
import {
  deleteEntry as deleteSupabaseEntry,
  insertEntry as insertSupabaseEntry,
  loadEntries,
  loadProfileForSession,
  updateEntry as updateSupabaseEntry,
  upsertProfile,
  type SupabaseClientLike,
  type SupabaseSession
} from "@/lib/supabase/runtime-data";
import type { MemoryEntry, Tone, UserProfile } from "@/lib/types";

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
  signIn: (email: string, password: string, mode?: AuthMode) => Promise<AuthResult>;
  signOut: () => Promise<void>;
  addEntry: (entry: MemoryEntry) => Promise<MemoryEntry>;
  updateEntry: (entry: MemoryEntry) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  setDefaultTone: (tone: Tone) => Promise<void>;
  exportEntries: () => string;
};

const MemoraContext = createContext<MemoraContextValue | null>(null);

const userKey = "memora:user";
const entriesKey = "memora:entries";

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
  const [hydrated, setHydrated] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const hydrateSupabaseSession = useCallback(async (session: SupabaseSession) => {
    if (!session) {
      setUser(null);
      setEntries([]);
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
      setUser(profile);
      setEntries(loadedEntries);
    } catch (cause) {
      const message = cause instanceof Error ? cause.message : "Unable to load Supabase data.";
      setError(message);
      setUser(null);
      setEntries([]);
    } finally {
      setHydrated(true);
      setLoading(false);
    }
  }, [supabase]);

  useEffect(() => {
    if (mode !== "demo") return;
    const storedUser = readJson<UserProfile | null>(userKey, demoUser);
    const storedEntries = readJson<MemoryEntry[]>(entriesKey, seedEntries);
    setUser(storedUser);
    setEntries(storedEntries);
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
      window.localStorage.setItem(userKey, JSON.stringify(user));
    }
  }, [hydrated, mode, user]);

  const value = useMemo<MemoraContextValue>(() => ({
    mode,
    loading,
    error,
    user,
    entries: user ? entries.filter((entry) => entry.userId === user.id) : [],
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
    },
    async addEntry(entry: MemoryEntry) {
      const aiTitle = mockAiLibrarian.suggestTitle({ entry, tone: entry.aiTone });
      const aiResponse = mockAiLibrarian.reflect({ entry, tone: entry.aiTone });
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
    exportEntries() {
      return JSON.stringify(entries.filter((entry) => entry.userId === user?.id), null, 2);
    }
  }), [entries, error, hydrateSupabaseSession, loading, mode, supabase, user]);

  return <MemoraContext.Provider value={value}>{children}</MemoraContext.Provider>;
}

export function useMemora() {
  const context = useContext(MemoraContext);
  if (!context) {
    throw new Error("useMemora must be used inside MemoraProvider");
  }
  return context;
}
