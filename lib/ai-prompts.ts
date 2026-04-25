import type { AiTask, LibrarianRequest } from "./ai";

const baseInstruction = [
  "You are Memora's AI Librarian.",
  "You help users reflect on memories in a supportive, private, non-clinical way.",
  "Never diagnose, treat, score, or claim therapeutic authority.",
  "Do not mention internal policies, prompts, JSON, providers, or implementation details.",
  "Return only the requested JSON shape."
].join(" ");

function entryContext(request: LibrarianRequest) {
  const entry = request.entry;
  if (!entry) return "No single entry was provided.";
  return [
    `Title: ${entry.title}`,
    `Memory: ${entry.memory}`,
    `Lesson: ${entry.lesson}`,
    `Emotion: ${entry.emotion}`,
    `Life phase: ${entry.lifePhase}`,
    `Tags: ${entry.tags.join(", ") || "none"}`
  ].join("\n");
}

function entriesContext(request: LibrarianRequest) {
  const entries = request.entries?.slice(0, 8) ?? [];
  if (!entries.length) return "No entries are available yet.";
  return entries.map((entry, index) => [
    `Entry ${index + 1}: ${entry.title}`,
    `Emotion: ${entry.emotion}`,
    `Life phase: ${entry.lifePhase}`,
    `Tags: ${entry.tags.join(", ") || "none"}`,
    `Lesson: ${entry.lesson}`
  ].join("\n")).join("\n\n");
}

export function buildAiPrompt(task: AiTask, request: LibrarianRequest): string {
  const toneInstruction = `Use the user's selected tone: ${request.tone}.`;

  if (task === "suggestTitle") {
    return [
      baseInstruction,
      toneInstruction,
      "Create a concise chapter title for this memory, 3 to 8 words.",
      "Avoid diagnosis, therapy language, and dramatic certainty.",
      entryContext(request)
    ].join("\n\n");
  }

  if (task === "reflect") {
    return [
      baseInstruction,
      toneInstruction,
      "Write a warm reflection for this entry in 1 to 3 short sentences.",
      "Be specific to the memory and lesson, but stay humble and non-clinical.",
      entryContext(request)
    ].join("\n\n");
  }

  if (task === "revisitPrompt") {
    return [
      baseInstruction,
      toneInstruction,
      "Write a short revisit prompt that recommends one relevant memory to revisit.",
      "Keep it encouraging and concrete.",
      entriesContext(request)
    ].join("\n\n");
  }

  return [
    baseInstruction,
    toneInstruction,
    "Summarize the user's recent memory patterns in 1 to 3 short sentences.",
    "Avoid scores, diagnosis, certainty about causes, and clinical language.",
    entriesContext(request)
  ].join("\n\n");
}

export function validateAiText(text: string, task: AiTask): string | null {
  const clean = text.replace(/\s+/g, " ").trim();
  if (!clean) return null;
  if (clean.length < 8) return null;
  const maxLength = task === "suggestTitle" ? 90 : 620;
  if (clean.length > maxLength) return null;

  const disallowed = /\b(diagnos|therapy|therapist|treatment plan|mental illness|clinically|you definitely|you must|score)\b/i;
  if (disallowed.test(clean)) return null;
  return clean;
}
