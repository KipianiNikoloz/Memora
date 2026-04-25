export type RuntimeMode = "demo" | "supabase";

export function getRuntimeMode(): RuntimeMode {
  return process.env.NEXT_PUBLIC_MEMORA_DEMO_MODE === "false" ? "supabase" : "demo";
}
