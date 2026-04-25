"use client";

import Link from "next/link";
import { Search } from "lucide-react";
import { useMemo, useState } from "react";
import { AppChrome } from "@/components/AppChrome";
import { useMemora } from "@/components/MemoraClient";
import { emotions, lifePhases } from "@/lib/types";

export default function LibraryPage() {
  const { entries } = useMemora();
  const [query, setQuery] = useState("");
  const [emotion, setEmotion] = useState("All");
  const [phase, setPhase] = useState("All");

  const filtered = useMemo(() => entries.filter((entry) => {
    const text = `${entry.title} ${entry.memory} ${entry.lesson} ${entry.tags.join(" ")}`.toLowerCase();
    return text.includes(query.toLowerCase())
      && (emotion === "All" || entry.emotion === emotion)
      && (phase === "All" || entry.lifePhase === phase);
  }), [emotion, entries, phase, query]);

  const shelves = lifePhases.map((shelf) => ({
    shelf,
    entries: filtered.filter((entry) => entry.lifePhase === shelf)
  })).filter((group) => group.entries.length > 0);

  return (
    <AppChrome>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 className="app-title">My Library</h1>
          <p className="muted">Browse the chapters that prove you have been learning all along.</p>
        </div>
        <Link className="button button-primary" href="/new-entry">Add memory</Link>
      </div>

      <div className="toolbar" role="search">
        <label style={{ flex: "1 1 280px" }}>
          <span className="muted"><Search size={15} /> Search memories</span>
          <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search by title, lesson, or tag" />
        </label>
        <label>
          <span className="muted">Emotion</span>
          <select className="select" value={emotion} onChange={(event) => setEmotion(event.target.value)}>
            <option>All</option>
            {emotions.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
        <label>
          <span className="muted">Life phase</span>
          <select className="select" value={phase} onChange={(event) => setPhase(event.target.value)}>
            <option>All</option>
            {lifePhases.map((item) => <option key={item}>{item}</option>)}
          </select>
        </label>
      </div>

      {filtered.length === 0 ? (
        <div className="panel">
          <h3>Empty</h3>
          <p className="muted">Your first shelf is waiting.</p>
          <Link className="button button-primary" href="/new-entry">Add your first entry</Link>
        </div>
      ) : (
        <div className="split">
          <div>
            {shelves.map((group) => (
              <section key={group.shelf} style={{ marginBottom: 30 }}>
                <h2 className="display" style={{ color: "var(--burgundy)" }}>{group.shelf}</h2>
                <div className="entry-grid">
                  {group.entries.map((entry) => (
                    <Link className="entry-card" data-emotion={entry.emotion} href={`/entry/${entry.id}`} key={entry.id}>
                      <p className="muted">{entry.emotion} · {entry.eventDate}</p>
                      <h3>{entry.title}</h3>
                      <p>{entry.lesson}</p>
                      <div className="chip-row">
                        {entry.tags.map((tag) => <span className="chip" key={tag}>{tag}</span>)}
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            ))}
          </div>
          <aside className="panel">
            <h3>AI Librarian</h3>
            <p className="muted">Find a memory, browse by theme, or let the librarian surprise you with a chapter worth revisiting.</p>
            <div className="chip-row">
              <Link className="chip" href="/librarian">Find a memory</Link>
              <Link className="chip" href="/librarian">Browse by theme</Link>
              <Link className="chip chip-active" href="/librarian">Surprise me</Link>
            </div>
          </aside>
        </div>
      )}
    </AppChrome>
  );
}
