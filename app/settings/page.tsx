"use client";

import { useState } from "react";
import { AppChrome } from "@/components/AppChrome";
import { useMemora } from "@/components/MemoraClient";
import { tones, type Tone } from "@/lib/types";

export default function SettingsPage() {
  const { user, setDefaultTone, exportEntries } = useMemora();
  const [exportText, setExportText] = useState("");

  return (
    <AppChrome>
      <h1 className="app-title">Settings</h1>
      <p className="muted">Privacy, preferences, and boundaries for your library.</p>

      <div className="grid-3" style={{ marginTop: 22 }}>
        <section className="panel">
          <h3>AI tone default</h3>
          <p className="muted">You can still override tone on each interaction.</p>
          <div className="chip-row">
            {tones.map((tone) => (
              <button className={`chip ${user?.defaultTone === tone ? "chip-active" : ""}`} key={tone} type="button" onClick={() => setDefaultTone(tone as Tone)}>
                {tone}
              </button>
            ))}
          </div>
        </section>

        <section className="panel">
          <h3>Privacy</h3>
          <p className="muted">Memories are private by default. Demo mode stores entries in this browser; Supabase mode enforces user ownership with RLS.</p>
          <button className="button button-secondary" type="button" onClick={() => setExportText(exportEntries())}>Export entries</button>
        </section>

        <section className="panel">
          <h3>Wellness boundary</h3>
          <p className="muted">Memora supports reflection. It does not diagnose, treat, or replace emergency or clinical support.</p>
        </section>
      </div>

      {exportText ? (
        <section className="panel" style={{ marginTop: 22 }}>
          <h3>Export preview</h3>
          <textarea className="textarea" readOnly value={exportText} style={{ minHeight: 260 }} />
        </section>
      ) : null}
    </AppChrome>
  );
}
