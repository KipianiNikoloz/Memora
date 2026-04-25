import { GoogleGenAI, Type } from "@google/genai";

export type GoogleAiCallOptions = {
  prompt: string;
  model: string;
  apiKey: string;
  timeoutMs: number;
};

export async function callGoogleGenAi({ apiKey, model, prompt, timeoutMs }: GoogleAiCallOptions): Promise<string> {
  const ai = new GoogleGenAI({ apiKey });
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await ai.models.generateContent({
      model,
      contents: prompt,
      config: {
        abortSignal: controller.signal,
        maxOutputTokens: 220,
        responseMimeType: "application/json",
        responseJsonSchema: {
          type: Type.OBJECT,
          properties: {
            text: {
              type: Type.STRING,
              description: "The user-facing Memora AI Librarian response."
            }
          },
          required: ["text"],
          propertyOrdering: ["text"]
        },
        temperature: 0.6
      }
    });

    const parsed = JSON.parse(response.text ?? "{}") as { text?: unknown };
    if (typeof parsed.text !== "string") {
      throw new Error("Google GenAI returned JSON without a text field.");
    }
    return parsed.text;
  } finally {
    clearTimeout(timeout);
  }
}
