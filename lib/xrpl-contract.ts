import { isEmotion, isLifePhase } from "./ai-contract";

export type XrplBadgeIssueRequest = {
  entry: {
    id: string;
    emotion: string;
    lifePhase: string;
    eventDate: string;
  };
  recipientAddress: string;
  recipientSeed: string;
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null;
}

function isIsoDate(value: unknown): value is string {
  return typeof value === "string" && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

export function parseXrplBadgeIssueRequest(body: unknown): XrplBadgeIssueRequest | null {
  if (!isRecord(body) || !isRecord(body.entry)) return null;

  const { entry } = body;
  if (
    typeof entry.id !== "string" ||
    !isEmotion(entry.emotion) ||
    !isLifePhase(entry.lifePhase) ||
    !isIsoDate(entry.eventDate) ||
    typeof body.recipientAddress !== "string" ||
    typeof body.recipientSeed !== "string"
  ) {
    return null;
  }

  return {
    entry: {
      id: entry.id,
      emotion: entry.emotion,
      lifePhase: entry.lifePhase,
      eventDate: entry.eventDate,
    },
    recipientAddress: body.recipientAddress,
    recipientSeed: body.recipientSeed,
  };
}
