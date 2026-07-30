#!/usr/bin/env node
/** Normalize generated section TSX for strict TypeScript and ESLint. */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sectionsDir = path.join(root, "src", "widgets", "sections");

function fixSource(src) {
  return src
    .replace(/^\/\/ @ts-nocheck\s*\n/m, "")
    .replace(/^\/\* eslint-disable \*\/\s*\n/m, "")
    .replace(/^\/\* AUTO-GENERATED[\s\S]*?\*\/\s*\n/m, "")
    .replace(/\sparentsize=\{0\}/g, "")
    .replace(/\sconstraints=\{"\[object Object\]"\}/g, "")
    .replace(/\sshadows(?=\s|\/?>)/g, " data-framer-shadows")
    .replace(/\srotation=\{0\}/g, "")
    .replace(/\sname=\{"[^"]*"\}/g, "")
    .replace(/\sas=\{"figure"\}/g, "");
}

for (const file of readdirSync(sectionsDir).filter((f) => f.endsWith(".tsx"))) {
  const full = path.join(sectionsDir, file);
  writeFileSync(full, fixSource(readFileSync(full, "utf8")));
  console.log("fixed:", file);
}
