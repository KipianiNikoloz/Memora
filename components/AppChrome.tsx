import { AppSidebar } from "./AppSidebar";
import { TopNav } from "./TopNav";

export function AppChrome({ children }: { children: React.ReactNode }) {
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
