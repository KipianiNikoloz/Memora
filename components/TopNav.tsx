"use client";

import { Menu, X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Brand } from "./Brand";
import { AnimatePresence, controlMotion, m } from "./Motion";

export function TopNav() {
  const pathname = usePathname();
  const menuId = useId();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const publicLinks = [
    { href: "/#how", label: "How it works", active: pathname === "/" },
    { href: "/library", label: "Library", active: pathname.startsWith("/library") || pathname.startsWith("/entry") },
    { href: "/insights", label: "Insights", active: pathname.startsWith("/insights") }
  ] as const;
  const mobileLinks = [
    { href: "/#how", label: "How it works", active: pathname === "/" },
    { href: "/library", label: "Library", active: pathname.startsWith("/library") || pathname.startsWith("/entry") },
    { href: "/new-entry", label: "New Entry", active: pathname.startsWith("/new-entry") },
    { href: "/insights", label: "Insights", active: pathname.startsWith("/insights") },
    { href: "/librarian", label: "AI Librarian", active: pathname.startsWith("/librarian") },
    { href: "/settings", label: "Settings", active: pathname.startsWith("/settings") }
  ] as const;

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!mobileMenuOpen) return;

    function closeOnEscape(event: KeyboardEvent) {
      if (event.key === "Escape") setMobileMenuOpen(false);
    }

    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [mobileMenuOpen]);

  function closeMenu() {
    setMobileMenuOpen(false);
  }

  return (
    <nav className="top-nav" aria-label="Primary navigation">
      <div className="top-nav-row">
        <Brand />
        <div className="nav-links">
          {publicLinks.map((link) => (
            <m.span key={link.href} {...controlMotion}>
              <Link className={`nav-link ${link.active ? "nav-link-active" : ""}`} href={link.href}>
                {link.label}
              </Link>
            </m.span>
          ))}
        </div>
        <m.span className="desktop-nav-cta" {...controlMotion}>
          <Link className="button button-primary" href="/auth">
            Start your library
          </Link>
        </m.span>
        <m.button
          aria-controls={menuId}
          aria-expanded={mobileMenuOpen}
          aria-label={mobileMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="mobile-menu-button"
          type="button"
          {...controlMotion}
          onClick={() => setMobileMenuOpen((open) => !open)}
        >
          {mobileMenuOpen ? <X size={21} /> : <Menu size={21} />}
        </m.button>
      </div>
      <AnimatePresence>
        {mobileMenuOpen ? (
          <m.div
            animate={{ opacity: 1, y: 0, height: "auto" }}
            className="mobile-nav-panel"
            exit={{ opacity: 0, y: -8, height: 0 }}
            id={menuId}
            initial={{ opacity: 0, y: -8, height: 0 }}
            transition={{ duration: 0.22, ease: "easeOut" }}
          >
            <div className="mobile-nav-section" aria-label="Mobile navigation">
              {mobileLinks.map((link) => (
                <Link className={`mobile-nav-link ${link.active ? "mobile-nav-link-active" : ""}`} href={link.href} key={link.href} onClick={closeMenu}>
                  {link.label}
                </Link>
              ))}
            </div>
            <Link className="button button-primary mobile-nav-cta" href="/auth" onClick={closeMenu}>
              Start your library
            </Link>
          </m.div>
        ) : null}
      </AnimatePresence>
    </nav>
  );
}
