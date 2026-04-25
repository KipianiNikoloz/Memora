import { afterEach, describe, expect, it, vi } from "vitest";
import type { AiResult } from "@/lib/ai";
import { seedEntries } from "@/lib/demo-data";

describe("AI librarian route", () => {
  afterEach(() => {
    vi.resetModules();
    vi.doUnmock("@/lib/ai-runtime");
  });

  it("returns AI task results from the runtime", async () => {
    vi.doMock("@/lib/ai-runtime", () => ({
      runAiLibrarianTask: vi.fn(async () => ({
        text: "A live-feeling reflection.",
        provider: "google",
        model: "test-model",
        fallbackUsed: false
      } satisfies AiResult))
    }));
    const { POST } = await import("@/app/api/ai/librarian/route");

    const response = await POST(new Request("http://localhost/api/ai/librarian", {
      method: "POST",
      body: JSON.stringify({
        task: "reflect",
        entry: seedEntries[0],
        tone: "Wise"
      })
    }));

    await expect(response.json()).resolves.toEqual({
      text: "A live-feeling reflection.",
      provider: "google",
      model: "test-model",
      fallbackUsed: false
    });
  });

  it("rejects invalid requests", async () => {
    vi.doMock("@/lib/ai-runtime", () => ({
      runAiLibrarianTask: vi.fn()
    }));
    const { POST } = await import("@/app/api/ai/librarian/route");

    const response = await POST(new Request("http://localhost/api/ai/librarian", {
      method: "POST",
      body: JSON.stringify({
        task: "unknown",
        tone: "Wise"
      })
    }));

    expect(response.status).toBe(400);
  });

  it("rejects malformed JSON bodies", async () => {
    vi.doMock("@/lib/ai-runtime", () => ({
      runAiLibrarianTask: vi.fn()
    }));
    const { POST } = await import("@/app/api/ai/librarian/route");

    const response = await POST(new Request("http://localhost/api/ai/librarian", {
      method: "POST",
      body: "{not-json"
    }));

    await expect(response.json()).resolves.toEqual({ error: "Invalid JSON body." });
    expect(response.status).toBe(400);
  });

  it("passes valid entry arrays to summary tasks", async () => {
    const runAiLibrarianTask = vi.fn(async () => ({
      text: "Summary",
      provider: "mock",
      fallbackUsed: false
    } satisfies AiResult));
    vi.doMock("@/lib/ai-runtime", () => ({ runAiLibrarianTask }));
    const { POST } = await import("@/app/api/ai/librarian/route");

    const response = await POST(new Request("http://localhost/api/ai/librarian", {
      method: "POST",
      body: JSON.stringify({
        task: "summarize",
        entries: seedEntries,
        tone: "Wise"
      })
    }));

    expect(response.status).toBe(200);
    expect(runAiLibrarianTask).toHaveBeenCalledWith("summarize", {
      tone: "Wise",
      entry: undefined,
      entries: seedEntries
    });
  });
});
