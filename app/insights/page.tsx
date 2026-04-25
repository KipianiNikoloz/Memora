"use client";

import Link from "next/link";
import { AppChrome } from "@/components/AppChrome";
import { useMemora } from "@/components/MemoraClient";
import { mockAiLibrarian } from "@/lib/ai";
import { buildInsights, moodLabel } from "@/lib/insights";

export default function InsightsPage() {
  const { entries, user } = useMemora();
  const insights = buildInsights(entries);
  const summary = mockAiLibrarian.summarize({ entries, tone: user?.defaultTone ?? "Wise" });
  const max = Math.max(1, ...Object.values(insights.moodCounts));

  return (
    <AppChrome>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <div>
          <h1 className="app-title">Your Insights</h1>
          <p className="muted">Gentle patterns from your recent shelves.</p>
        </div>
        <span className="chip chip-active">Last 12 months</span>
      </div>

      {insights.lowData ? (
        <div className="panel">
          <h3>Your shelves are still gathering evidence</h3>
          <p className="muted">Add a few more memories before Memora draws patterns. Nothing is missing; the library is just beginning.</p>
          <Link className="button button-primary" href="/new-entry">Add another memory</Link>
        </div>
      ) : null}

      <div className="grid-3" style={{ marginTop: 22 }}>
        <section className="panel">
          <h3>Mood Trends</h3>
          <p className="muted">{moodLabel(insights.moodCounts)}</p>
          <div className="stat-bars">
            {Object.entries(insights.moodCounts).map(([emotion, count]) => (
              <div className="bar" key={emotion}>
                <span>{emotion}</span>
                <span style={{ "--value": `${(count / max) * 100}%` } as React.CSSProperties} />
                <strong>{count}</strong>
              </div>
            ))}
          </div>
        </section>
        <section className="panel">
          <h3>Milestone Highlights</h3>
          {insights.milestones.length ? insights.milestones.map((entry) => (
            <p key={entry.id}><Link href={`/entry/${entry.id}`}>{entry.title}</Link></p>
          )) : <p className="muted">No milestone shelf yet. Proud and Milestones entries will appear here.</p>}
        </section>
        <section className="panel">
          <h3>Revisit Recommendations</h3>
          {insights.revisit.map((entry) => (
            <p key={entry.id}><Link href={`/entry/${entry.id}`}>Return to {entry.title}</Link></p>
          ))}
        </section>
      </div>

      <section className="panel" style={{ marginTop: 22 }}>
        <h3>AI Summary</h3>
        <p>{summary}</p>
      </section>
    </AppChrome>
  );
}
