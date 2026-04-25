import Link from "next/link";
import { LibraryIllustration } from "@/components/LibraryIllustration";
import { TopNav } from "@/components/TopNav";

export default function HomePage() {
  return (
    <div className="page-shell">
      <TopNav />
      <section className="hero">
        <div>
          <p className="muted" style={{ fontWeight: 900 }}>Personal reflection library</p>
          <h1>Every life deserves a library.</h1>
          <p>
            Turn your memories into structured knowledge. Store meaningful moments,
            reflect on what they taught you, and revisit your growth with a supportive AI librarian.
          </p>
          <div className="hero-actions">
            <Link className="button button-primary" href="/auth">Start your library</Link>
            <Link className="button button-secondary" href="#how">See how it works</Link>
          </div>
        </div>
        <LibraryIllustration />
      </section>

      <section id="how" className="section">
        <h2>Capture, reflect, revisit.</h2>
        <div className="grid-3">
          <article className="card">
            <h3>Capture</h3>
            <p className="muted">Save the moment, the emotion, and the life phase while it still has texture.</p>
          </article>
          <article className="card">
            <h3>Reflect</h3>
            <p className="muted">Write what happened and what it taught you without turning the product into homework.</p>
          </article>
          <article className="card">
            <h3>Revisit</h3>
            <p className="muted">Return to old chapters and compare yourself to your past self, not to everyone else.</p>
          </article>
        </div>
      </section>

      <section id="about" className="section">
        <div className="split">
          <div>
            <h2>A calm library, not a clinical dashboard.</h2>
            <p className="muted">
              Memora keeps emotional data private and user-controlled. AI guidance is supportive and reflective,
              never diagnostic or therapeutic.
            </p>
          </div>
          <div className="panel">
            <h3>AI Librarian tones</h3>
            <div className="chip-row">
              <span className="chip chip-active">Motivational</span>
              <span className="chip">Humorous</span>
              <span className="chip">Wise</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
