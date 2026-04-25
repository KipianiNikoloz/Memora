import { existsSync, readFileSync } from "node:fs";
import { dirname, extname, join, normalize } from "node:path";

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
  "docs/features/xrpl-milestone-badges.md",
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

const linkPattern = /\[[^\]]+\]\(([^)]+)\)/g;
const markdownFiles = required.filter((file) => extname(file) === ".md");
const brokenLinks = [];

for (const file of markdownFiles) {
  const content = readFileSync(join(process.cwd(), file), "utf8");
  for (const match of content.matchAll(linkPattern)) {
    const target = match[1].trim();
    if (
      target.startsWith("http://") ||
      target.startsWith("https://") ||
      target.startsWith("mailto:") ||
      target.startsWith("#")
    ) {
      continue;
    }

    const [pathPart] = target.split("#");
    if (!pathPart) continue;

    const resolved = normalize(join(process.cwd(), dirname(file), decodeURIComponent(pathPart)));
    if (!resolved.startsWith(process.cwd()) || !existsSync(resolved)) {
      brokenLinks.push(`${file} -> ${target}`);
    }
  }
}

if (brokenLinks.length) {
  console.error(`Broken local doc links:\n${brokenLinks.join("\n")}`);
  process.exit(1);
}

console.log("Documentation checks passed.");
