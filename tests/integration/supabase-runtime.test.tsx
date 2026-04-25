import { act, render, screen, waitFor } from "@testing-library/react";
import { useEffect } from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { MemoraProvider, type AuthResult, useMemora } from "@/components/MemoraClient";
import { mapMemoryEntryToRow, type MemoraProfileRow, type MemoryEntryRow } from "@/lib/supabase/mappers";
import type { SupabaseClientLike, SupabaseSession } from "@/lib/supabase/runtime-data";
import type { MemoryEntry, Tone } from "@/lib/types";

type ContextValue = ReturnType<typeof useMemora>;

const session: NonNullable<SupabaseSession> = {
  user: {
    id: "user-1",
    email: "user@example.com"
  }
};

function entryFixture(overrides: Partial<MemoryEntry> = {}): MemoryEntry {
  return {
    id: "entry-1",
    userId: "user-1",
    title: "A production memory",
    memory: "This entry is saved through the Supabase runtime.",
    lesson: "Persistence proves the private library works.",
    emotion: "Proud",
    tags: ["runtime"],
    lifePhase: "Milestones",
    eventDate: "2026-04-25",
    createdAt: "2026-04-25T10:00:00.000Z",
    updatedAt: "2026-04-25T10:00:00.000Z",
    aiTone: "Wise",
    ...overrides
  };
}

class MockSupabaseClient implements SupabaseClientLike {
  profiles: MemoraProfileRow[] = [];
  entries: MemoryEntryRow[] = [];
  calls: string[] = [];
  signUpReturnsSession = true;
  private currentSession: SupabaseSession;
  private listener?: (event: string, session: SupabaseSession) => void;

  constructor(initialSession: SupabaseSession = null) {
    this.currentSession = initialSession;
  }

  auth = {
    getSession: async () => {
      this.calls.push("auth.getSession");
      return { data: { session: this.currentSession }, error: null };
    },
    onAuthStateChange: (callback: (event: string, session: SupabaseSession) => void) => {
      this.calls.push("auth.onAuthStateChange");
      this.listener = callback;
      return { data: { subscription: { unsubscribe: () => this.calls.push("auth.unsubscribe") } } };
    },
    signInWithPassword: async (credentials: { email: string; password: string }) => {
      this.calls.push(`auth.signInWithPassword:${credentials.email}`);
      this.currentSession = { user: { id: "user-1", email: credentials.email } };
      return { data: { session: this.currentSession }, error: null };
    },
    signUp: async (credentials: { email: string; password: string }) => {
      this.calls.push(`auth.signUp:${credentials.email}`);
      this.currentSession = this.signUpReturnsSession ? { user: { id: "user-1", email: credentials.email } } : null;
      return { data: { session: this.currentSession, user: { id: "user-1", email: credentials.email } }, error: null };
    },
    signOut: async () => {
      this.calls.push("auth.signOut");
      this.currentSession = null;
      this.listener?.("SIGNED_OUT", null);
      return { error: null };
    }
  };

  from(table: "memora_profiles" | "memory_entries") {
    if (table === "memora_profiles") {
      return {
        select: () => ({
          eq: (_column: string, value: string) => ({
            maybeSingle: async () => {
              this.calls.push("profiles.select.maybeSingle");
              return { data: this.profiles.find((profile) => profile.id === value) ?? null, error: null };
            }
          })
        }),
        upsert: (row: Record<string, unknown>) => ({
          select: () => ({
            single: async () => {
              this.calls.push("profiles.upsert");
              const profile = row as MemoraProfileRow;
              this.profiles = [profile, ...this.profiles.filter((item) => item.id !== profile.id)];
              return { data: profile, error: null };
            }
          })
        }),
        insert: () => this.unsupported(),
        update: () => this.unsupported(),
        delete: () => this.unsupported()
      };
    }

    return {
      select: () => ({
        order: async () => {
          this.calls.push("entries.select.order");
          return { data: this.entries, error: null };
        }
      }),
      insert: (row: Record<string, unknown>) => ({
        select: () => ({
          single: async () => {
            this.calls.push("entries.insert");
            const entry = row as MemoryEntryRow;
            this.entries = [entry, ...this.entries.filter((item) => item.id !== entry.id)];
            return { data: entry, error: null };
          }
        })
      }),
      update: (row: Record<string, unknown>) => ({
        eq: (_column: string, value: string) => ({
          select: () => ({
            single: async () => {
              this.calls.push("entries.update");
              const entry = row as MemoryEntryRow;
              this.entries = this.entries.map((item) => (item.id === value ? entry : item));
              return { data: entry, error: null };
            }
          })
        })
      }),
      delete: () => ({
        eq: async (_column: string, value: string) => {
          this.calls.push("entries.delete");
          this.entries = this.entries.filter((entry) => entry.id !== value);
          return { data: null, error: null };
        }
      }),
      upsert: () => this.unsupported()
    };
  }

  private unsupported(): never {
    throw new Error("Unsupported mock operation.");
  }
}

function ContextProbe({ onValue }: { onValue: (value: ContextValue) => void }) {
  const value = useMemora();

  useEffect(() => {
    onValue(value);
  }, [onValue, value]);

  return (
    <div>
      <span>{value.mode}</span>
      <span>{value.loading ? "loading" : "ready"}</span>
      <span>{value.user?.email ?? "no-user"}</span>
      <span>entries:{value.entries.length}</span>
    </div>
  );
}

async function renderRuntime(client: MockSupabaseClient, onValue: (value: ContextValue) => void) {
  render(
    <MemoraProvider runtimeMode="supabase" supabaseClient={client}>
      <ContextProbe onValue={onValue} />
    </MemoraProvider>
  );

  await screen.findByText("ready");
}

describe("Supabase runtime provider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("restores a Supabase session, loads rows, upserts profile, and avoids app localStorage writes", async () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    const client = new MockSupabaseClient(session);
    client.entries = [mapMemoryEntryToRow(entryFixture()) as MemoryEntryRow];
    let context = null as unknown as ContextValue;

    await renderRuntime(client, (value) => {
      context = value;
    });

    expect(screen.getByText("user@example.com")).toBeVisible();
    expect(screen.getByText("entries:1")).toBeVisible();
    expect(client.calls).toContain("auth.getSession");
    expect(client.calls).toContain("profiles.upsert");
    expect(client.calls).toContain("entries.select.order");
    expect(context.entries[0].title).toBe("A production memory");
    expect(setItem.mock.calls.filter(([key]) => String(key).startsWith("memora:"))).toHaveLength(0);
  });

  it("runs sign-in, entry CRUD, profile tone updates, and sign-out through Supabase", async () => {
    const client = new MockSupabaseClient(null);
    let context = null as unknown as ContextValue;

    await renderRuntime(client, (value) => {
      context = value;
    });

    let signInResult: AuthResult | null = null;
    await act(async () => {
      signInResult = await context.signIn("user@example.com", "password-1", "sign-in");
    });

    expect((signInResult as AuthResult | null)?.status).toBe("signed-in");
    expect(client.calls).toContain("auth.signInWithPassword:user@example.com");

    await act(async () => {
      const saved = await context.addEntry(entryFixture({ id: "entry-2" }));
      await context.updateEntry({ ...saved, lesson: "Updated through Supabase." });
      await context.setDefaultTone("Humorous" as Tone);
      await context.deleteEntry(saved.id);
    });

    expect(client.calls).toContain("entries.insert");
    expect(client.calls).toContain("entries.update");
    expect(client.calls).toContain("profiles.upsert");
    expect(client.calls).toContain("entries.delete");
    expect(client.entries).toHaveLength(0);
    expect(client.profiles[0].default_tone).toBe("Humorous");

    await act(async () => {
      await context.signOut();
    });

    await waitFor(() => expect(screen.getByText("no-user")).toBeVisible());
    expect(client.calls).toContain("auth.signOut");
  });

  it("returns check-email when Supabase sign-up requires confirmation", async () => {
    const client = new MockSupabaseClient(null);
    client.signUpReturnsSession = false;
    let context = null as unknown as ContextValue;

    await renderRuntime(client, (value) => {
      context = value;
    });

    let result: AuthResult | null = null;
    await act(async () => {
      result = await context.signIn("new@example.com", "password-1", "sign-up");
    });

    expect(result).toMatchObject({
      ok: true,
      status: "check-email"
    });
    expect(client.calls).toContain("auth.signUp:new@example.com");
    expect(screen.getByText("no-user")).toBeVisible();
  });
});

describe("demo runtime provider", () => {
  beforeEach(() => {
    window.localStorage.clear();
    vi.restoreAllMocks();
  });

  it("seeds demo data and persists it to localStorage", async () => {
    const setItem = vi.spyOn(Storage.prototype, "setItem");
    let context = null as unknown as ContextValue;

    render(
      <MemoraProvider runtimeMode="demo">
        <ContextProbe onValue={(value) => {
          context = value;
        }} />
      </MemoraProvider>
    );

    await screen.findByText("demo@memora.local");
    await waitFor(() => expect(context?.entries).toHaveLength(3));
    expect(setItem.mock.calls.some(([key]) => key === "memora:entries")).toBe(true);
    expect(setItem.mock.calls.some(([key]) => key === "memora:user")).toBe(true);
  });
});
