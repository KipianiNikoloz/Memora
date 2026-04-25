export function LibraryIllustration() {
  return (
    <div className="library-visual" aria-label="Illustrated library shelf">
      <p className="muted">Personal library preview</p>
      <div className="shelf">
        <div className="book-row">
          <span className="book">New beginnings</span>
          <span className="book">Growth</span>
          <span className="book">Challenges</span>
          <span className="book">Gratitude</span>
        </div>
      </div>
      <div className="panel" style={{ marginTop: 20 }}>
        <h3>AI Librarian</h3>
        <p className="muted">"There is evidence here that you kept becoming yourself."</p>
      </div>
    </div>
  );
}
