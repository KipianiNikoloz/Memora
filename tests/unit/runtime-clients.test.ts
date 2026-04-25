import { afterEach, describe, expect, it, vi } from "vitest";
import { seedEntries } from "@/lib/demo-data";

describe("runtime mode", () => {
  const originalDemoMode = process.env.NEXT_PUBLIC_MEMORA_DEMO_MODE;

  afterEach(() => {
    process.env.NEXT_PUBLIC_MEMORA_DEMO_MODE = originalDemoMode;
    vi.resetModules();
  });

  it("defaults to demo mode unless explicitly disabled", async () => {
    delete process.env.NEXT_PUBLIC_MEMORA_DEMO_MODE;
    const { getRuntimeMode } = await import("@/lib/runtime-mode");

    expect(getRuntimeMode()).toBe("demo");
  });

  it("uses supabase mode when demo mode is false", async () => {
    process.env.NEXT_PUBLIC_MEMORA_DEMO_MODE = "false";
    const { getRuntimeMode } = await import("@/lib/runtime-mode");

    expect(getRuntimeMode()).toBe("supabase");
  });
});

describe("Supabase browser client", () => {
  const originalUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const originalKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  afterEach(() => {
    process.env.NEXT_PUBLIC_SUPABASE_URL = originalUrl;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = originalKey;
    vi.resetModules();
    vi.doUnmock("@supabase/ssr");
  });

  it("returns null without both public Supabase values", async () => {
    delete process.env.NEXT_PUBLIC_SUPABASE_URL;
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
    const { createSupabaseBrowserClient } = await import("@/lib/supabase/client");

    expect(createSupabaseBrowserClient()).toBeNull();
  });

  it("creates a browser client when public Supabase config exists", async () => {
    const client = { from: vi.fn() };
    const createBrowserClient = vi.fn(() => client);
    vi.doMock("@supabase/ssr", () => ({ createBrowserClient }));
    process.env.NEXT_PUBLIC_SUPABASE_URL = "https://example.supabase.co";
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY = "anon-key";
    const { createSupabaseBrowserClient } = await import("@/lib/supabase/client");

    expect(createSupabaseBrowserClient()).toBe(client);
    expect(createBrowserClient).toHaveBeenCalledWith("https://example.supabase.co", "anon-key");
  });
});

describe("AI client", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
    vi.restoreAllMocks();
  });

  it("returns the server AI response when the request succeeds", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response(JSON.stringify({
      text: "Server response",
      provider: "google",
      fallbackUsed: false
    }), { status: 200 })));
    const { requestAiLibrarian } = await import("@/lib/ai-client");

    await expect(requestAiLibrarian("reflect", {
      entry: seedEntries[0],
      tone: "Wise"
    })).resolves.toEqual({
      text: "Server response",
      provider: "google",
      fallbackUsed: false
    });
  });

  it("falls back to the mock librarian when the server request fails", async () => {
    vi.stubGlobal("fetch", vi.fn(async () => new Response("Nope", { status: 503 })));
    const { requestAiLibrarian } = await import("@/lib/ai-client");

    const result = await requestAiLibrarian("suggestTitle", {
      entry: seedEntries[0],
      tone: "Wise"
    });

    expect(result.provider).toBe("mock");
    expect(result.fallbackUsed).toBe(true);
    expect(result.text.length).toBeGreaterThan(0);
  });
});
