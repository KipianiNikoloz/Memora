"use client";

import { BookOpen } from "lucide-react";
import Link from "next/link";
import { controlMotion, m } from "./Motion";

export function Brand() {
  return (
    <m.span {...controlMotion}>
      <Link className="brand" href="/">
        <span className="brand-mark" aria-hidden="true">
          <BookOpen size={20} />
        </span>
        <span>Memora</span>
      </Link>
    </m.span>
  );
}
