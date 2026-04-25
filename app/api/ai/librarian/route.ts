import { NextResponse } from "next/server";
import { runAiLibrarianTask } from "@/lib/ai-runtime";
import type { AiTask, LibrarianRequest } from "@/lib/ai";
import { tones, type MemoryEntry, type Tone } from "@/lib/types";

export const dynamic = "force-dynamic";

const tasks: AiTask[] = ["suggestTitle", "reflect", "revisitPrompt", "summarize"];

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isAiTask(value: unknown): value is AiTask {
  return typeof value === "string" && tasks.includes(value as AiTask);
}

function isTone(value: unknown): value is Tone {
  return typeof value === "string" && tones.includes(value as Tone);
}

function isEntry(value: unknown): value is LibrarianRequest["entry"] {
  return isRecord(value)
    && typeof value.title === "string"
    && typeof value.memory === "string"
    && typeof value.lesson === "string"
    && typeof value.emotion === "string"
    && typeof value.lifePhase === "string"
    && Array.isArray(value.tags)
    && value.tags.every((tag) => typeof tag === "string");
}

function isMemoryEntry(value: unknown): value is MemoryEntry {
  if (!isRecord(value) || !isEntry(value)) return false;
  const record = value as Record<string, unknown>;
  return typeof record.id === "string"
    && typeof record.userId === "string"
    && typeof record.eventDate === "string"
    && typeof record.createdAt === "string"
    && typeof record.updatedAt === "string"
    && isTone(record.aiTone);
}

function parseBody(body: unknown): { task: AiTask; request: LibrarianRequest } | null {
  if (!isRecord(body) || !isAiTask(body.task) || !isTone(body.tone)) return null;
  const entries = Array.isArray(body.entries) && body.entries.every(isMemoryEntry)
    ? body.entries
    : undefined;

  return {
    task: body.task,
    request: {
      tone: body.tone,
      entry: isEntry(body.entry) ? body.entry : undefined,
      entries
    }
  };
}

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseBody(body);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid AI librarian request." }, { status: 400 });
  }

  const result = await runAiLibrarianTask(parsed.task, parsed.request);
  return NextResponse.json(result);
}
