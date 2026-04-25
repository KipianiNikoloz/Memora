"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { AppChrome } from "@/components/AppChrome";
import { useMemora } from "@/components/MemoraClient";
import { MilestoneBadgeAction } from "@/components/MilestoneBadgeAction";
import { AnimatePresence, MotionItem, MotionList, MotionPanel, controlMotion, m } from "@/components/Motion";
import { requestAiLibrarian } from "@/lib/ai-client";
import { buildInsights, moodLabel } from "@/lib/insights";

export default function InsightsPage() {
  const { entries, user } = useMemora();
  const insights = buildInsights(entries);
  const [summary, setSummary] = useState("The shelves are still quiet. Add a few memories and Memora will help you notice patterns gently.");
  const max = Math.max(1, ...Object.values(insights.moodCounts));

  useEffect(() => {
    let active = true;
    void requestAiLibrarian("summarize", { entries, tone: user?.defaultTone ?? "Wise" }).then((result) => {
      if (active) setSummary(result.text);
    });
    return () => {
      active = false;
    };
  }, [entries, user?.defaultTone]);

  return (
    <AppChrome>
      <MotionItem className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 className="app-title">Your Insights</h1>
          <p className="muted">Gentle patterns from your recent shelves.</p>
        </div>
        <m.span className="chip chip-active" {...controlMotion}>Last 12 months</m.span>
      </MotionItem>

      <AnimatePresence>
        {insights.lowData ? (
          <MotionPanel className="panel">
            <h3>Your shelves are still gathering evidence</h3>
            <p className="muted">Add a few more memories before Memora draws patterns. Nothing is missing; the library is just beginning.</p>
            <m.span {...controlMotion}><Link className="button button-primary" href="/new-entry">Add another memory</Link></m.span>
          </MotionPanel>
        ) : null}
      </AnimatePresence>

      <MotionList className="grid-3" style={{ marginTop: 22 }}>
        <MotionPanel className="panel">
          <h3>Mood Trends</h3>
          <p className="muted">{moodLabel(insights.moodCounts)}</p>
          <div className="stat-bars">
            {Object.entries(insights.moodCounts).map(([emotion, count]) => (
              <div className="bar" key={emotion}>
                <span>{emotion}</span>
                <span>
                  <m.span
                    animate={{ scaleX: count / max }}
                    initial={{ scaleX: 0 }}
                    style={{ display: "block", height: "100%", background: "var(--teal)", borderRadius: 999, originX: 0 }}
                    transition={{ duration: 0.62, ease: "easeOut" }}
                  />
                </span>
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </MotionPanel>
        <MotionPanel className="panel">
          <h3>Milestone Highlights</h3>
          {insights.milestones.length ? insights.milestones.map((entry) => (
            <m.div className="milestone-badge-row" key={entry.id} layout {...controlMotion}>
              <Link href={`/entry/${entry.id}`}>{entry.title}</Link>
              <MilestoneBadgeAction entry={entry} compact />
            </m.div>
          )) : <p className="muted">No milestone shelf yet. Proud and Milestones entries will appear here.</p>}
        </MotionPanel>
        <MotionPanel className="panel">
          <h3>Revisit Recommendations</h3>
          {insights.revisit.map((entry) => (
            <m.p key={entry.id} layout {...controlMotion}><Link href={`/entry/${entry.id}`}>Return to {entry.title}</Link></m.p>
          ))}
        </MotionPanel>
      </MotionList>

      <MotionPanel className="panel" style={{ marginTop: 22 }}>
        <h3>AI Summary</h3>
        <AnimatePresence mode="wait">
          <m.p
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            initial={{ opacity: 0, y: 8 }}
            key={summary}
            transition={{ duration: 0.24, ease: "easeOut" }}
          >
            {summary}
          </m.p>
        </AnimatePresence>
      </MotionPanel>
    </AppChrome>
  );
}
