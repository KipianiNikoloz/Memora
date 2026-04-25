"use client";

import { usePathname, useRouter } from "next/navigation";
import { useEffect } from "react";
import { AppSidebar } from "./AppSidebar";
import { useMemora } from "./MemoraClient";
import { TopNav } from "./TopNav";

export function AppChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const { error, loading, mode, user } = useMemora();

  useEffect(() => {
    if (mode === "supabase" && !loading && !user) {
      router.replace(`/auth?next=${encodeURIComponent(pathname)}`);
    }
  }, [loading, mode, pathname, router, user]);

  if (mode === "supabase" && (loading || !user)) {
    return (
      <div className="page-shell">
        <TopNav />
        <main className="section" style={{ maxWidth: 640, margin: "0 auto" }}>
          <div className="panel">
            <h1 className="app-title">Opening your library</h1>
            <p className="muted">{error ?? "Checking your private session..."}</p>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="page-shell">
      <TopNav />
      <div className="app-layout">
        <AppSidebar />
        <main className="app-main">{children}</main>
      </div>
    </div>
  );
}
