"use client";

import { MotionItem, MotionList, MotionPanel, m } from "./Motion";

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
        <MotionList className="book-row">
          {books.map((book, index) => (
            <m.span
              animate={{ rotate: index % 2 === 0 ? -1.5 : 1.5 }}
              className="book"
              initial={{ opacity: 0, y: -28, rotate: 0 }}
              key={book}
              transition={{
                delay: 0.24 + index * 0.08,
                duration: 0.46,
                ease: "easeOut"
              }}
            >
              {book}
            </m.span>
          ))}
        </MotionList>
      </MotionItem>
      <MotionPanel className="panel" style={{ marginTop: 20 }}>
        <h3>AI Librarian</h3>
        <p className="muted">"There is evidence here that you kept becoming yourself."</p>
      </MotionPanel>
    </MotionPanel>
  );
}
