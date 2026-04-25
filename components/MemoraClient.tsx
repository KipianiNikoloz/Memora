"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { mockAiLibrarian } from "@/lib/ai";
import { demoUser, seedEntries } from "@/lib/demo-data";
import type { MemoryEntry, Tone, UserProfile } from "@/lib/types";

type MemoraContextValue = {
  user: UserProfile | null;
  entries: MemoryEntry[];
  signIn: (email: string) => void;
  signOut: () => void;
  addEntry: (entry: MemoryEntry) => MemoryEntry;
  updateEntry: (entry: MemoryEntry) => void;
  deleteEntry: (id: string) => void;
  setDefaultTone: (tone: Tone) => void;
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

export function MemoraProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const storedUser = readJson<UserProfile | null>(userKey, demoUser);
    const storedEntries = readJson<MemoryEntry[]>(entriesKey, seedEntries);
    setUser(storedUser);
    setEntries(storedEntries);
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (hydrated && typeof window !== "undefined") {
      window.localStorage.setItem(entriesKey, JSON.stringify(entries));
    }
  }, [entries, hydrated]);

  useEffect(() => {
    if (hydrated && typeof window !== "undefined") {
      window.localStorage.setItem(userKey, JSON.stringify(user));
    }
  }, [hydrated, user]);

  const value = useMemo<MemoraContextValue>(() => ({
    user,
    entries: user ? entries.filter((entry) => entry.userId === user.id) : [],
    signIn(email: string) {
      const nextUser = { ...demoUser, email, id: email.trim().toLowerCase() || demoUser.id };
      setUser(nextUser);
      if (!entries.length) setEntries(seedEntries.map((entry) => ({ ...entry, userId: nextUser.id })));
    },
    signOut() {
      setUser(null);
    },
    addEntry(entry: MemoryEntry) {
      const aiTitle = mockAiLibrarian.suggestTitle({ entry, tone: entry.aiTone });
      const aiResponse = mockAiLibrarian.reflect({ entry, tone: entry.aiTone });
      const saved = { ...entry, aiTitle, aiResponse };
      setEntries((current) => [saved, ...current]);
      return saved;
    },
    updateEntry(entry: MemoryEntry) {
      setEntries((current) => current.map((item) => (item.id === entry.id ? { ...entry, updatedAt: new Date().toISOString() } : item)));
    },
    deleteEntry(id: string) {
      setEntries((current) => current.filter((entry) => entry.id !== id));
    },
    setDefaultTone(tone: Tone) {
      setUser((current) => (current ? { ...current, defaultTone: tone } : current));
    },
    exportEntries() {
      return JSON.stringify(entries.filter((entry) => entry.userId === user?.id), null, 2);
    }
  }), [entries, user]);

  return <MemoraContext.Provider value={value}>{children}</MemoraContext.Provider>;
}

export function useMemora() {
  const context = useContext(MemoraContext);
  if (!context) {
    throw new Error("useMemora must be used inside MemoraProvider");
  }
  return context;
}
