"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Brand } from "./Brand";
import { controlMotion, m } from "./Motion";

export function TopNav() {
  const pathname = usePathname();
  const links = [
    { href: "/#how", label: "How it works", active: pathname === "/" },
    { href: "/library", label: "Library", active: pathname.startsWith("/library") || pathname.startsWith("/entry") },
    { href: "/insights", label: "Insights", active: pathname.startsWith("/insights") },
    { href: "/#about", label: "About", active: false }
  ] as const;

  return (
    <nav className="top-nav" aria-label="Primary navigation">
      <Brand />
      <div className="nav-links">
        {links.map((link) => (
          <m.span key={link.href} {...controlMotion}>
            <Link className={`nav-link ${link.active ? "nav-link-active" : ""}`} href={link.href}>
              {link.label}
            </Link>
          </m.span>
        ))}
      </div>
      <m.span {...controlMotion}>
        <Link className="button button-primary" href="/auth">
          Start your library
        </Link>
      </m.span>
    </nav>
  );
}
