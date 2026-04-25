"use client";

import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import { AppChrome } from "@/components/AppChrome";
import { useMemora } from "@/components/MemoraClient";
import { MilestoneBadgeAction } from "@/components/MilestoneBadgeAction";
import { MotionItem, MotionPanel, controlMotion, m } from "@/components/Motion";
import { isMilestoneBadgeEligible } from "@/lib/xrpl-badges";

export default function EntryDetailPage() {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();
  const { entries, deleteEntry, error } = useMemora();
  const [deleting, setDeleting] = useState(false);
  const entry = entries.find((item) => item.id === id);

  if (!entry) {
    return (
      <AppChrome>
        <MotionPanel className="panel">
          <h1 className="app-title">Entry not found</h1>
          <p className="muted">We could not find that chapter in your library.</p>
          <m.span {...controlMotion}>
            <Link className="button button-primary" href="/library">
              Back to library
            </Link>
          </m.span>
        </MotionPanel>
      </AppChrome>
    );
  }

  return (
    <AppChrome>
      <MotionItem className="split">
        <MotionPanel className="form-card">
          <p className="muted">
            {entry.lifePhase} - {entry.emotion} - {entry.eventDate}
          </p>
          <h1 className="app-title">{entry.title}</h1>
          {entry.aiTitle ? (
            <p>
              <strong>AI chapter title:</strong> {entry.aiTitle}
            </p>
          ) : null}
          <h3 className="display">What happened</h3>
          <p>{entry.memory}</p>
          <h3 className="display">What I learned</h3>
          <p>{entry.lesson}</p>
          <div className="chip-row">
            {entry.tags.map((tag) => (
              <span className="chip" key={tag}>
                {tag}
              </span>
            ))}
          </div>
          <div className="row" style={{ marginTop: 24 }}>
            <m.span {...controlMotion}>
              <Link className="button button-secondary" href="/library">
                Back to library
              </Link>
            </m.span>
            <m.button
              className="button button-ghost"
              disabled={deleting}
              {...controlMotion}
              onClick={async () => {
                setDeleting(true);
                try {
                  await deleteEntry(entry.id);
                  router.push("/library");
                } finally {
                  setDeleting(false);
                }
              }}
            >
              {deleting ? "Deleting..." : "Delete entry"}
            </m.button>
          </div>
          {error ? <p className="error">{error}</p> : null}
        </MotionPanel>
        <MotionPanel className="panel">
          <h3>AI Librarian</h3>
          <p className="muted">{entry.aiResponse}</p>
          <m.span {...controlMotion}>
            <Link className="button button-secondary" href="/librarian">
              Ask for another reflection
            </Link>
          </m.span>
        </MotionPanel>
        {isMilestoneBadgeEligible(entry) ? (
          <MotionPanel className="panel">
            <MilestoneBadgeAction entry={entry} />
          </MotionPanel>
        ) : null}
      </MotionItem>
    </AppChrome>
  );
}
