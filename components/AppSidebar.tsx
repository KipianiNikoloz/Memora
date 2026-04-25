import { BarChart3, BookOpen, Plus, Settings, Sparkles } from "lucide-react";
import Link from "next/link";

export function AppSidebar() {
  return (
    <aside className="sidebar" aria-label="App navigation">
      <Link href="/library"><BookOpen size={17} /> Library</Link>
      <Link href="/new-entry"><Plus size={17} /> New Entry</Link>
      <Link href="/insights"><BarChart3 size={17} /> Insights</Link>
      <Link href="/librarian"><Sparkles size={17} /> AI Librarian</Link>
      <Link href="/settings"><Settings size={17} /> Settings</Link>
    </aside>
  );
}
