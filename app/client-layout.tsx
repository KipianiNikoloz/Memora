"use client";

import { MemoraProvider } from "@/components/MemoraClient";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return <MemoraProvider>{children}</MemoraProvider>;
}
