import { readdir } from "node:fs/promises";
import path from "node:path";

const root = path.resolve("out");
const blocked = [];

async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    const rel = path.relative(root, full);
    if (entry.isDirectory()) {
      if (entry.name === ".git" || entry.name === "node_modules") {
        blocked.push(rel);
      } else {
        await walk(full);
      }
      continue;
    }
    const lower = entry.name.toLowerCase();
    if (
      lower === ".git" ||
      lower.startsWith(".env") ||
      lower.endsWith(".map") ||
      lower.endsWith(".md")
    ) {
      blocked.push(rel);
    }
  }
}

await walk(root);

if (blocked.length > 0) {
  console.error("out/ contiene archivos que no deben publicarse:");
  for (const file of blocked) console.error(` - ${file}`);
  process.exit(1);
}

console.log("out/ sin .env, .git, .map ni .md");
