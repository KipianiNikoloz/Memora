"use client";

import { MemoraProvider } from "@/components/MemoraClient";
import { MotionProvider } from "@/components/Motion";

export function ClientLayout({ children }: { children: React.ReactNode }) {
  return (
    <MotionProvider>
      <MemoraProvider>{children}</MemoraProvider>
    </MotionProvider>
  );
}
