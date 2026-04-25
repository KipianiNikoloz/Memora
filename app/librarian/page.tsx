"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { AppChrome } from "@/components/AppChrome";
import { useMemora } from "@/components/MemoraClient";
import { AnimatePresence, MotionItem, MotionPanel, controlMotion, m } from "@/components/Motion";
import { requestAiLibrarian } from "@/lib/ai-client";
import { findLibrarianMatch, selectLibrarianRequest } from "@/lib/library-selectors";
import { tones, type Tone } from "@/lib/types";

export default function LibrarianPage() {
  const { entries, user } = useMemora();
  const [tone, setTone] = useState<Tone>(user?.defaultTone ?? "Wise");
  const [query, setQuery] = useState("");

  const matched = useMemo(() => findLibrarianMatch(entries, query), [entries, query]);

  const [response, setResponse] = useState(
    "Your first shelf is waiting. Add one memory and the library can begin reflecting back.",
  );

  useEffect(() => {
    let active = true;
    const { request, task } = selectLibrarianRequest(entries, query, tone);

    void requestAiLibrarian(task, request).then((result) => {
      if (active) setResponse(result.text);
    });
    return () => {
      active = false;
    };
  }, [entries, matched, query, tone]);

  return (
    <AppChrome>
      <MotionItem className="split">
        <div>
          <MotionItem>
            <h1 className="app-title">AI Librarian</h1>
            <p className="muted">Ask for a memory, browse by theme, or let the librarian surprise you.</p>
          </MotionItem>
          <MotionPanel className="form-card">
            <label className="field">
              <span>What would you like to revisit?</span>
              <input
                className="input"
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="confidence, support, new beginnings..."
              />
            </label>
            <div className="field">
              <span>Tone</span>
              <div className="chip-row">
                {tones.map((item) => (
                  <m.button
                    key={item}
                    type="button"
                    layout
                    className={`chip ${tone === item ? "chip-active" : ""}`}
                    {...controlMotion}
                    onClick={() => setTone(item)}
                  >
                    {item}
                  </m.button>
                ))}
              </div>
            </div>
          </MotionPanel>
        </div>
        <MotionPanel className="panel">
          <h3>{tone} reflection</h3>
          <AnimatePresence mode="wait">
            <m.p
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              initial={{ opacity: 0, y: 8 }}
              key={`${tone}-${response}`}
              transition={{ duration: 0.24, ease: "easeOut" }}
            >
              {response}
            </m.p>
          </AnimatePresence>
          <AnimatePresence mode="wait">
            {matched ? (
              <m.span key="matched" {...controlMotion}>
                <Link className="button button-secondary" href={`/entry/${matched.id}`}>
                  Open chapter
                </Link>
              </m.span>
            ) : (
              <m.span key="empty" {...controlMotion}>
                <Link className="button button-primary" href="/new-entry">
                  Add your first entry
                </Link>
              </m.span>
            )}
          </AnimatePresence>
        </MotionPanel>
      </MotionItem>
    </AppChrome>
  );
}
