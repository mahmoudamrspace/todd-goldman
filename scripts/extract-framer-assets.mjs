#!/usr/bin/env node
/**
 * Extract verbatim Framer CSS and animation data from reference/picco-export/index.html
 */
import { mkdirSync, readFileSync, readdirSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const htmlPath = path.join(root, "reference", "picco-export", "index.html");
const exportRoot = path.join(root, "reference", "picco-export");
const outStyles = path.join(root, "framer", "styles");
const outData = path.join(root, "framer", "data");

mkdirSync(outStyles, { recursive: true });
mkdirSync(outData, { recursive: true });

const html = readFileSync(htmlPath, "utf8");

function extractStyleFrom(htmlContent, attr) {
  const re = new RegExp(
    `<style[^>]*${attr}[^>]*>([\\s\\S]*?)<\\/style>`,
    "i",
  );
  const m = htmlContent.match(re);
  if (!m) return null;
  return m[1].trim();
}

function collectHtmlFiles(dir, acc = []) {
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) collectHtmlFiles(full, acc);
    else if (entry.name.endsWith(".html")) acc.push(full);
  }
  return acc;
}

function mergeBreakpointCss() {
  const chunks = new Set();
  for (const file of collectHtmlFiles(exportRoot)) {
    const fileHtml = readFileSync(file, "utf8");
    const css = extractStyleFrom(fileHtml, "data-framer-breakpoint-css");
    if (css) chunks.add(css);
  }
  return [...chunks].join("\n");
}

function extractStyle(attr) {
  const css = extractStyleFrom(html, attr);
  if (!css) throw new Error(`Missing style block: ${attr}`);
  return css;
}

function extractScriptJson(id) {
  const re = new RegExp(
    `<script[^>]*id="${id}"[^>]*>([\\s\\S]*?)<\\/script>`,
    "i",
  );
  const m = html.match(re);
  if (!m) throw new Error(`Missing script: ${id}`);
  return JSON.parse(m[1].trim());
}

const fontsCss = extractStyle("data-framer-font-css");
const breakpointCss = mergeBreakpointCss();
const siteCss = extractStyle("data-framer-css-ssr-minified");
const appear = extractScriptJson("__framer__appearAnimationsContent");
const breakpoints = extractScriptJson("__framer__breakpoints");

writeFileSync(path.join(outStyles, "framer-fonts.css"), fontsCss + "\n");
writeFileSync(path.join(outStyles, "framer-breakpoints.css"), breakpointCss + "\n");
writeFileSync(path.join(outStyles, "framer-site.css"), siteCss + "\n");
writeFileSync(
  path.join(outData, "appear.json"),
  JSON.stringify(appear, null, 2) + "\n",
);
writeFileSync(
  path.join(outData, "breakpoints.json"),
  JSON.stringify(breakpoints, null, 2) + "\n",
);

console.log("extract-framer-assets: OK");
