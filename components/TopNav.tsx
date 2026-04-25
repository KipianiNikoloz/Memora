import Link from "next/link";
import { Brand } from "./Brand";

export function TopNav() {
  return (
    <nav className="top-nav" aria-label="Primary navigation">
      <Brand />
      <div className="nav-links">
        <Link href="/#how">How it works</Link>
        <Link href="/library">Library</Link>
        <Link href="/insights">Insights</Link>
        <Link href="/#about">About</Link>
      </div>
      <Link className="button button-primary" href="/auth">
        Start your library
      </Link>
    </nav>
  );
}
