"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppChrome } from "@/components/AppChrome";
import { useMemora } from "@/components/MemoraClient";
import { requestAiLibrarian } from "@/lib/ai-client";
import { tones, type Tone } from "@/lib/types";

export default function LibrarianPage() {
  const { entries, user } = useMemora();
  const [tone, setTone] = useState<Tone>(user?.defaultTone ?? "Wise");
  const [query, setQuery] = useState("");

  const matched = useMemo(() => {
    if (!query.trim()) return entries[0];
    const needle = query.toLowerCase();
    return entries.find((entry) => `${entry.title} ${entry.memory} ${entry.lesson} ${entry.tags.join(" ")}`.toLowerCase().includes(needle)) ?? entries[0];
  }, [entries, query]);

  const [response, setResponse] = useState("Your first shelf is waiting. Add one memory and the library can begin reflecting back.");

  useEffect(() => {
    let active = true;
    const request = query.trim()
      ? {
        entry: { title: "Support note", memory: query, lesson: "", emotion: "Stressed" as const, lifePhase: "Challenges" as const, tags: [] },
        tone
      }
      : { entries: matched ? [matched] : entries, tone };
    const task = query.trim() ? "reflect" : "revisitPrompt";

    void requestAiLibrarian(task, request).then((result) => {
      if (active) setResponse(result.text);
    });
    return () => {
      active = false;
    };
  }, [entries, matched, query, tone]);

  return (
    <AppChrome>
      <div className="split">
        <div>
          <h1 className="app-title">AI Librarian</h1>
          <p className="muted">Ask for a memory, browse by theme, or let the librarian surprise you.</p>
          <div className="form-card">
            <label className="field">
              <span>What would you like to revisit?</span>
              <input className="input" value={query} onChange={(event) => setQuery(event.target.value)} placeholder="confidence, support, new beginnings..." />
            </label>
            <div className="field">
              <span>Tone</span>
              <div className="chip-row">
                {tones.map((item) => (
                  <button key={item} type="button" className={`chip ${tone === item ? "chip-active" : ""}`} onClick={() => setTone(item)}>
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
        <aside className="panel">
          <h3>{tone} reflection</h3>
          <p>{response}</p>
          {matched ? <Link className="button button-secondary" href={`/entry/${matched.id}`}>Open chapter</Link> : <Link className="button button-primary" href="/new-entry">Add your first entry</Link>}
        </aside>
      </div>
    </AppChrome>
  );
}
