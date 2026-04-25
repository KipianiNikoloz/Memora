"use client";

import { BarChart3, BookOpen, Plus, Settings, Sparkles } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { controlMotion, m } from "./Motion";

export function AppSidebar() {
  const pathname = usePathname();
  const links = [
    {
      href: "/library",
      label: "Library",
      icon: BookOpen,
      active: pathname.startsWith("/library") || pathname.startsWith("/entry"),
    },
    { href: "/new-entry", label: "New Entry", icon: Plus, active: pathname.startsWith("/new-entry") },
    { href: "/insights", label: "Insights", icon: BarChart3, active: pathname.startsWith("/insights") },
    { href: "/librarian", label: "AI Librarian", icon: Sparkles, active: pathname.startsWith("/librarian") },
    { href: "/settings", label: "Settings", icon: Settings, active: pathname.startsWith("/settings") },
  ] as const;

  return (
    <aside className="sidebar" aria-label="App navigation">
      {links.map((link) => {
        const Icon = link.icon;

        return (
          <m.div key={link.href} {...controlMotion}>
            <Link className={`sidebar-link ${link.active ? "sidebar-link-active" : ""}`} href={link.href}>
              <Icon size={17} /> {link.label}
            </Link>
          </m.div>
        );
      })}
    </aside>
  );
}
