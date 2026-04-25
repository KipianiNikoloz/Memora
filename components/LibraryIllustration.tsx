"use client";

import { MotionItem, MotionPanel } from "./Motion";

const books = [
  "New beginnings",
  "Growth",
  "Challenges",
  "Gratitude"
];

export function LibraryIllustration() {
  return (
    <MotionPanel className="library-visual" aria-label="Illustrated library shelf">
      <MotionItem>
        <p className="muted">Personal library preview</p>
      </MotionItem>
      <MotionItem className="shelf">
        <div className="book-row">
          {books.map((book, index) => (
            <span
              className="book"
              key={book}
              style={{
                "--book-delay": `${0.18 + index * 0.08}s`,
                "--book-tilt": `${index % 2 === 0 ? -1.5 : 1.5}deg`
              } as React.CSSProperties}
            >
              {book}
            </span>
          ))}
        </div>
      </MotionItem>
      <MotionPanel className="panel" style={{ marginTop: 20 }}>
        <h3>AI Librarian</h3>
        <p className="muted">"There is evidence here that you kept becoming yourself."</p>
      </MotionPanel>
    </MotionPanel>
  );
}
