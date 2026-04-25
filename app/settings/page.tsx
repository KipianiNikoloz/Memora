"use client";

import { useState } from "react";
import { AppChrome } from "@/components/AppChrome";
import { useMemora } from "@/components/MemoraClient";
import { AnimatePresence, MotionItem, MotionList, MotionPanel, controlMotion, m } from "@/components/Motion";
import { tones, type Tone } from "@/lib/types";

export default function SettingsPage() {
  const { error, user, setDefaultTone, exportEntries } = useMemora();
  const [exportText, setExportText] = useState("");
  const [savingTone, setSavingTone] = useState<Tone | null>(null);

  async function chooseTone(tone: Tone) {
    setSavingTone(tone);
    try {
      await setDefaultTone(tone);
    } finally {
      setSavingTone(null);
    }
  }

  return (
    <AppChrome>
      <MotionItem>
        <h1 className="app-title">Settings</h1>
        <p className="muted">Privacy, preferences, and boundaries for your library.</p>
      </MotionItem>
      {error ? <p className="error">{error}</p> : null}

      <MotionList className="grid-3" style={{ marginTop: 22 }}>
        <MotionPanel className="panel">
          <h3>AI tone default</h3>
          <p className="muted">You can still override tone on each interaction.</p>
          <div className="chip-row">
            {tones.map((tone) => (
              <m.button className={`chip ${user?.defaultTone === tone ? "chip-active" : ""}`} disabled={savingTone === tone} key={tone} layout type="button" {...controlMotion} onClick={() => void chooseTone(tone as Tone)}>
                {savingTone === tone ? "Saving..." : tone}
              </m.button>
            ))}
          </div>
        </MotionPanel>

        <MotionPanel className="panel">
          <h3>Privacy</h3>
          <p className="muted">Memories are private by default. Demo mode stores entries in this browser; Supabase mode enforces user ownership with RLS.</p>
          <m.button className="button button-secondary" type="button" {...controlMotion} onClick={() => setExportText(exportEntries())}>Export entries</m.button>
        </MotionPanel>

        <MotionPanel className="panel">
          <h3>Wellness boundary</h3>
          <p className="muted">Memora supports reflection. It does not diagnose, treat, or replace emergency or clinical support.</p>
        </MotionPanel>
      </MotionList>

      <AnimatePresence>
        {exportText ? (
          <m.section
            animate={{ opacity: 1, height: "auto", y: 0 }}
            className="panel motion-collapsible"
            exit={{ opacity: 0, height: 0, y: -8 }}
            initial={{ opacity: 0, height: 0, y: -8 }}
            style={{ marginTop: 22 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <h3>Export preview</h3>
            <textarea className="textarea" readOnly value={exportText} style={{ minHeight: 260 }} />
          </m.section>
        ) : null}
      </AnimatePresence>
    </AppChrome>
  );
}
