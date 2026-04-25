import { BookOpen } from "lucide-react";
import Link from "next/link";

export function Brand() {
  return (
    <Link className="brand" href="/">
      <span className="brand-mark" aria-hidden="true">
        <BookOpen size={20} />
      </span>
      <span>Memora</span>
    </Link>
  );
}
