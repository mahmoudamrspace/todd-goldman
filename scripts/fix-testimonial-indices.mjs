#!/usr/bin/env node
/** Align testimonial tone indices with author/quote index per Item block. */
import { readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const file = path.join(
  path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
  "src/widgets/sections/Testimonial.tsx",
);

let src = readFileSync(file, "utf8");
const itemRe = /data-framer-name=\{"Item (\d{2})"\}/g;
const parts = src.split(itemRe);

if (parts.length < 3) {
  console.error("No Item blocks found");
  process.exit(1);
}

const out = [parts[0]];
for (let i = 1; i < parts.length; i += 2) {
  const itemNum = parts[i];
  let block = parts[i + 1] ?? "";
  const index = Number.parseInt(itemNum, 10) - 1;
  block = block.replace(/toneClass\(content\.items\[\d+\]/g, `toneClass(content.items[${index}]`);
  block = block.replace(/content\.items\[\d+\]/g, `content.items[${index}]`);
  out.push(itemNum, block);
}

writeFileSync(file, out.join(""));
console.log("fix-testimonial-indices: OK");
