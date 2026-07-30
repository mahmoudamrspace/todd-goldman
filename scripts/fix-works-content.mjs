#!/usr/bin/env node
/** Fix Works.tsx mobile cardClass slugs and hardcoded titles/hrefs. */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const file = path.join(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  "src/widgets/sections/Works.tsx",
);

let src = readFileSync(file, "utf8");

const slugs = [
  "the-northern-times",
  "nitty-craft-co",
  "oxbridge-press",
  "barcelona-civic-office",
  "südstadt-zeitung",
  "monochrome-journal",
  "the-economic-review",
  "the-chronicle",
];

for (const slug of slugs) {
  src = src.replace(
    new RegExp(`href=\\{"/works/${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}"\\}`, "g"),
    `href={\`/works/${slug}\`}`,
  );
}

for (const slug of slugs) {
  const blockRe = new RegExp(
    `(href=\\{\`/works/${slug.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\`\\}[\\s\\S]*?data-framer-name=\\{"Mobile"\\}[\\s\\S]*?cardClass\\([^,]+,\\s*")([^"]+)(")`,
  );
  src = src.replace(blockRe, `$1${slug}$3`);
}

const titleMap = {
  "The Northern Times": "the-northern-times",
  "Nitty Craft Co.": "nitty-craft-co",
  "Oxbridge Press": "oxbridge-press",
  "Barcelona Civic Office": "barcelona-civic-office",
  "Südstadt Zeitung": "südstadt-zeitung",
  "Monochrome Journal": "monochrome-journal",
  "The Economic Review": "the-economic-review",
  "The Chronicle": "the-chronicle",
};

for (const [title, slug] of Object.entries(titleMap)) {
  src = src.replace(
    new RegExp(`\\s+${title.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")}\\s*`, "g"),
    `{workTitle("${slug}")}`,
  );
}

writeFileSync(file, src);
console.log("fix-works-content: OK");
