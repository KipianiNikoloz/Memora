import { existsSync, readFileSync } from "node:fs";
import { join } from "node:path";

const required = [
  "README.md",
  "docs/README.md",
  "docs/architecture/system.md",
  "docs/testing.md",
  "docs/demo-runbook.md",
  "docs/features/README.md",
  "docs/features/auth.md",
  "docs/features/memory-entries.md",
  "docs/features/library.md",
  "docs/features/ai-librarian.md",
  "docs/features/insights.md",
  "docs/features/design-system.md",
  "docs/features/settings-privacy-safety.md",
  "docs/features/xrpl-milestone-badges.md"
];

const missing = required.filter((file) => !existsSync(join(process.cwd(), file)));
if (missing.length) {
  console.error(`Missing docs:\n${missing.join("\n")}`);
  process.exit(1);
}

const diagramDocs = ["docs/architecture/system.md", "docs/demo-runbook.md"];
for (const file of diagramDocs) {
  const content = readFileSync(join(process.cwd(), file), "utf8");
  if (!content.includes("```mermaid")) {
    console.error(`${file} does not include a Mermaid visual aid.`);
    process.exit(1);
  }
}

console.log("Documentation checks passed.");
