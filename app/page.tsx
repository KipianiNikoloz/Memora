"use client";

import { Sparkles } from "lucide-react";
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
          <MotionPanel className="tone-panel">
            <div className="tone-panel-header">
              <span className="tone-icon" aria-hidden="true"><Sparkles size={18} /></span>
              <div>
                <p className="tone-kicker">AI Librarian tones</p>
                <h3>Choose the voice your memories answer in.</h3>
              </div>
            </div>
            <div className="tone-options" aria-label="AI Librarian tone examples">
              <m.div className="tone-option tone-option-active" {...controlMotion}>
                <span>Motivational</span>
                <p>Turns progress into proof you can return to.</p>
              </m.div>
              <m.div className="tone-option" {...controlMotion}>
                <span>Humorous</span>
                <p>Keeps reflection light without making it shallow.</p>
              </m.div>
              <m.div className="tone-option" {...controlMotion}>
                <span>Wise</span>
                <p>Finds the quiet lesson inside the chapter.</p>
              </m.div>
            </div>
            <p className="tone-note">You can change the tone any time in Settings.</p>
          </MotionPanel>
        </div>
      </MotionPage>
    </div>
  );
}
