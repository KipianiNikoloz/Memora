"use client";

import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";
import { AppChrome } from "@/components/AppChrome";
import { useMemora } from "@/components/MemoraClient";
import { MotionItem, MotionPanel, controlMotion, listVariants, revealVariants, m } from "@/components/Motion";
import { createEntryFromDraft, type EntryDraft, validateEntryDraft } from "@/lib/validation";
import { emotions, lifePhases, tones } from "@/lib/types";

const initialDraft: EntryDraft = {
  title: "",
  memory: "",
  lesson: "",
  emotion: "Happy",
  tags: "",
  lifePhase: "Growth and Learning",
  aiTone: "Wise"
};

export default function NewEntryPage() {
  const router = useRouter();
  const { user, addEntry } = useMemora();
  const [draft, setDraft] = useState<EntryDraft>(initialDraft);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  function update<K extends keyof EntryDraft>(key: K, value: EntryDraft[K]) {
    setDraft((current) => ({ ...current, [key]: value }));
  }

  async function submit(event: FormEvent) {
    event.preventDefault();
    const result = validateEntryDraft(draft);
    setErrors(result.errors);
    if (!result.ok || !user) return;
    setSaving(true);
    try {
      const entry = await addEntry(createEntryFromDraft(draft, user.id));
      router.push(`/entry/${entry.id}`);
    } catch (cause) {
      setErrors({ title: cause instanceof Error ? cause.message : "Unable to save this entry." });
    } finally {
      setSaving(false);
    }
  }

  return (
    <AppChrome>
      <MotionItem className="split">
        <div>
          <MotionItem>
            <h1 className="app-title">New Entry</h1>
            <p className="muted">Capture a moment. Reflect. Grow.</p>
          </MotionItem>
          <m.form
            animate="animate"
            className="form-card"
            initial="initial"
            onSubmit={submit}
            variants={listVariants}
          >
            <m.label className="field" variants={revealVariants}>
              <span>Moment title</span>
              <input className="input" value={draft.title} onChange={(event) => update("title", event.target.value)} placeholder="e.g., A small win at work" />
              {errors.title ? <span className="error">{errors.title}</span> : null}
            </m.label>

            <MotionItem className="field">
              <span>How did you feel?</span>
              <div className="chip-row">
                {emotions.map((emotion) => (
                  <m.button className={`chip ${draft.emotion === emotion ? "chip-active" : ""}`} type="button" key={emotion} layout {...controlMotion} onClick={() => update("emotion", emotion)}>
                    {emotion}
                  </m.button>
                ))}
              </div>
            </MotionItem>

            <m.label className="field" variants={revealVariants}>
              <span>What happened?</span>
              <textarea className="textarea" value={draft.memory} onChange={(event) => update("memory", event.target.value)} placeholder="Write a few lines about what happened..." />
              {errors.memory ? <span className="error">{errors.memory}</span> : null}
            </m.label>

            <m.label className="field" variants={revealVariants}>
              <span>What did I learn?</span>
              <textarea className="textarea" value={draft.lesson} onChange={(event) => update("lesson", event.target.value)} placeholder="What did this moment teach you?" />
              {errors.lesson ? <span className="error">{errors.lesson}</span> : null}
            </m.label>

            <MotionItem className="grid-3">
              <label className="field">
                <span>Life phase</span>
                <select className="select" value={draft.lifePhase} onChange={(event) => update("lifePhase", event.target.value as EntryDraft["lifePhase"])}>
                  {lifePhases.map((phase) => <option key={phase}>{phase}</option>)}
                </select>
              </label>
              <label className="field">
                <span>AI tone</span>
                <select className="select" value={draft.aiTone} onChange={(event) => update("aiTone", event.target.value as EntryDraft["aiTone"])}>
                  {tones.map((tone) => <option key={tone}>{tone}</option>)}
                </select>
              </label>
              <label className="field">
                <span>Tags</span>
                <input className="input" value={draft.tags} onChange={(event) => update("tags", event.target.value)} placeholder="work, courage" />
              </label>
            </MotionItem>
            <MotionItem>
              <m.button className="button button-primary" disabled={saving || !user} type="submit" {...controlMotion}>
                {saving ? "Organizing your library..." : !user ? "Opening your library..." : "Save to library"}
              </m.button>
            </MotionItem>
          </m.form>
        </div>
        <MotionPanel className="panel">
          <h3>Chapter title after save</h3>
          <p className="muted">The AI librarian will suggest a title and reflection once the entry is saved.</p>
        </MotionPanel>
      </MotionItem>
    </AppChrome>
  );
}
