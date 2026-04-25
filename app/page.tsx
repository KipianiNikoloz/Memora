"use client";

import Link from "next/link";
import { LibraryIllustration } from "@/components/LibraryIllustration";
import { MotionItem, MotionList, MotionPanel, MotionPage, controlMotion, m } from "@/components/Motion";
import { TopNav } from "@/components/TopNav";

export default function HomePage() {
  return (
    <div className="page-shell">
      <TopNav />
      <MotionPage className="hero">
        <MotionList>
          <p className="muted" style={{ fontWeight: 900 }}>Personal reflection library</p>
          <MotionItem>
            <h1>Every life deserves a library.</h1>
          </MotionItem>
          <MotionItem>
            <p>
            Turn your memories into structured knowledge. Store meaningful moments,
            reflect on what they taught you, and revisit your growth with a supportive AI librarian.
            </p>
          </MotionItem>
          <MotionItem className="hero-actions">
            <m.span {...controlMotion}><Link className="button button-primary" href="/auth">Start your library</Link></m.span>
            <m.span {...controlMotion}><Link className="button button-secondary" href="#how">See how it works</Link></m.span>
          </MotionItem>
        </MotionList>
        <LibraryIllustration />
      </MotionPage>

      <MotionPage id="how" className="section">
        <h2>Capture, reflect, revisit.</h2>
        <MotionList className="grid-3">
          <MotionPanel className="card">
            <h3>Capture</h3>
            <p className="muted">Save the moment, the emotion, and the life phase while it still has texture.</p>
          </MotionPanel>
          <MotionPanel className="card">
            <h3>Reflect</h3>
            <p className="muted">Write what happened and what it taught you without turning the product into homework.</p>
          </MotionPanel>
          <MotionPanel className="card">
            <h3>Revisit</h3>
            <p className="muted">Return to old chapters and compare yourself to your past self, not to everyone else.</p>
          </MotionPanel>
        </MotionList>
      </MotionPage>

      <MotionPage id="about" className="section">
        <div className="split">
          <MotionItem>
            <h2>A calm library, not a clinical dashboard.</h2>
            <p className="muted">
              Memora keeps emotional data private and user-controlled. AI guidance is supportive and reflective,
              never diagnostic or therapeutic.
            </p>
          </MotionItem>
          <MotionPanel className="panel">
            <h3>AI Librarian tones</h3>
            <div className="chip-row">
              <m.span className="chip chip-active" {...controlMotion}>Motivational</m.span>
              <m.span className="chip" {...controlMotion}>Humorous</m.span>
              <m.span className="chip" {...controlMotion}>Wise</m.span>
            </div>
          </MotionPanel>
        </div>
      </MotionPage>
    </div>
  );
}
