import { NextResponse } from "next/server";
import { runAiLibrarianTask } from "@/lib/ai-runtime";
import { isAiResult, parseLibrarianRequestBody } from "@/lib/ai-contract";

export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = parseLibrarianRequestBody(body);
  if (!parsed) {
    return NextResponse.json({ error: "Invalid AI librarian request." }, { status: 400 });
  }

  const result = await runAiLibrarianTask(parsed.task, parsed.request);
  if (!isAiResult(result)) {
    return NextResponse.json({ error: "Invalid AI librarian response." }, { status: 502 });
  }

  return NextResponse.json(result);
}
