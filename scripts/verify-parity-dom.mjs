#!/usr/bin/env node
/**
 * Offline DOM parity: compare static export HTML vs reference/picco-export.
 */
import { createRequire } from "node:module";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(
  path.join(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), "package.json"),
);
const { parse } = require("node-html-parser");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const refRoot = path.join(root, "reference", "picco-export");
const outRoot = path.join(root, "out");
const qaDir = path.join(root, "qa");

/** Framer badge chip — intentionally omitted from port. */
const ALLOWED_CLASSES = new Set([
  "framer-6jWyo",
  "framer-n0ccwk",
  "framer-bmpgw8",
  "framer-g7oZR",
  "framer-1um7t9d",
  "framer-hcsc7",
  "framer-e50co",
  "framer-13yxzio",
  "framer-19yaanm",
  "framer-jnuwbw",
  "framer-1kflzx5",
  "framer-slo1sy",
  "framer-j4ugry",
  "framer-v-n0ccwk",
]);

const ALLOWED_NAMES = new Set(["Backdrop", "Border", "Logo", "Light", "Bottom"]);

const ALLOWED_IDS = new Set([
  "__framer-badge-container",
  "__framer__appearAnimationsContent",
  "__framer__breakpoints",
  "__framer__handoverData",
  "overlay",
  "template-overlay",
]);

const STYLE_PROPS = ["opacity", "transform", "background-color", "will-change"];

const ROUTES = [
  { id: "home", ref: "index.html", out: "index.html" },
  { id: "work-oxbridge", ref: "works/oxbridge-press/index.html", out: "works/oxbridge-press/index.html" },
];

function collectFramerClasses(doc) {
  const classes = new Set();
  for (const el of doc.querySelectorAll("[class]")) {
    for (const token of (el.getAttribute("class") ?? "").split(/\s+/)) {
      if (/^framer-[a-zA-Z0-9_-]+$/.test(token)) classes.add(token);
    }
  }
  return classes;
}

function collectClassCounts(doc) {
  const counts = new Map();
  for (const el of doc.querySelectorAll("[class]")) {
    for (const token of (el.getAttribute("class") ?? "").split(/\s+/)) {
      if (/^framer-[a-zA-Z0-9_-]+$/.test(token)) {
        counts.set(token, (counts.get(token) ?? 0) + 1);
      }
    }
  }
  return counts;
}

function collectNames(doc) {
  const names = new Set();
  for (const el of doc.querySelectorAll("[data-framer-name]")) {
    names.add(el.getAttribute("data-framer-name"));
  }
  return names;
}

function collectIds(doc) {
  const ids = new Set();
  for (const el of doc.querySelectorAll("[id]")) {
    const id = el.getAttribute("id");
    if (id) ids.add(id);
  }
  return ids;
}

function normalizeText(text) {
  return text.replace(/\s+/g, "").trim();
}

function sectionText(doc, selector) {
  const el = doc.querySelector(selector);
  if (!el) return null;
  return normalizeText(el.textContent ?? "");
}

const SECTION_SELECTORS = [
  { id: "hero", selector: 'section[data-framer-name="Hero"]' },
  { id: "intro", selector: 'section[data-framer-name="Intro"]' },
  { id: "works", selector: "#works" },
  { id: "sneak", selector: 'section[data-framer-name="Sneak peak"]' },
  { id: "services", selector: 'section[data-framer-name="Services"]' },
  { id: "testimonial", selector: "#testimonial-section" },
  { id: "about", selector: "#about" },
  { id: "faq", selector: 'section[data-framer-name="FAQ"]' },
  { id: "footer", selector: "footer.framer-1f12llc" },
];

function diffSets(refSet, outSet, allow) {
  const missing = [...refSet].filter((v) => !outSet.has(v) && !allow.has(v)).sort();
  const extra = [...outSet].filter((v) => !refSet.has(v)).sort();
  return { missing, extra };
}

function parseStyleProps(styleRaw) {
  const props = new Map();
  if (!styleRaw) return props;
  for (const chunk of styleRaw.split(";")) {
    const trimmed = chunk.trim();
    if (!trimmed || trimmed.startsWith("--")) continue;
    const colon = trimmed.indexOf(":");
    if (colon < 0) continue;
    const key = trimmed.slice(0, colon).trim().toLowerCase();
    const value = trimmed.slice(colon + 1).trim().replace(/\s+/g, "");
    if (STYLE_PROPS.includes(key)) props.set(key, value);
  }
  return props;
}

function isFramerNode(el) {
  const cls = el.getAttribute("class") ?? "";
  return /framer-/.test(cls);
}

function indexedFramerNodes(doc) {
  const nodes = [];
  for (const el of doc.querySelectorAll("*")) {
    if (!isFramerNode(el)) continue;
    nodes.push(el);
  }
  return nodes;
}

function unresolvedUseRefs(refDoc, outDoc) {
  const collect = (doc) => {
    const ids = collectIds(doc);
    const unresolved = [];
    for (const el of doc.querySelectorAll("use")) {
      const href = el.getAttribute("href") ?? el.getAttribute("xlink:href") ?? "";
      if (!href.startsWith("#")) continue;
      const id = href.slice(1);
      if (!ids.has(id)) unresolved.push(id);
    }
    return new Set(unresolved);
  };
  const refUnresolved = collect(refDoc);
  const outUnresolved = collect(outDoc);
  return [...outUnresolved].filter((id) => !refUnresolved.has(id)).sort();
}

function nodeSignature(el) {
  return [
    el.rawTagName,
    (el.getAttribute("class") ?? "").trim(),
    el.getAttribute("data-framer-name") ?? "",
  ].join("|");
}

function groupFramerNodes(doc) {
  const groups = new Map();
  for (const el of doc.querySelectorAll("*")) {
    if (!isFramerNode(el)) continue;
    const key = nodeSignature(el);
    if (!groups.has(key)) groups.set(key, []);
    groups.get(key).push(el);
  }
  return groups;
}

const ALLOWED_GROUP_PATTERNS = [
  /framer-6jWyo/,
  /__framer-badge/,
  /framer-13yxzio/,
  /framer-19yaanm/,
  /framer-j4ugry/,
  /framer-jnuwbw/,
  /framer-1kflzx5/,
  /framer-slo1sy/,
  /framer-hcsc7/,
  /framer-e50co/,
  /framer-g7oZR/,
];

function isAllowedGroupDiff(key, ref, out) {
  if (/framer-S33l9/.test(key)) return true;
  if (!ALLOWED_GROUP_PATTERNS.some((pattern) => pattern.test(key))) return false;
  return ref > 0 && out === 0;
}

function compareInlineStyles(refDoc, outDoc) {
  const refGroups = groupFramerNodes(refDoc);
  const outGroups = groupFramerNodes(outDoc);
  const mismatches = [];
  const keys = new Set([...refGroups.keys(), ...outGroups.keys()]);

  for (const key of [...keys].sort()) {
    const refNodes = refGroups.get(key) ?? [];
    const outNodes = outGroups.get(key) ?? [];
    if (refNodes.length !== outNodes.length) {
      if (isAllowedGroupDiff(key, refNodes.length, outNodes.length)) continue;
      mismatches.push({ kind: "group-count", key, ref: refNodes.length, out: outNodes.length });
      continue;
    }
    for (let i = 0; i < refNodes.length; i++) {
      const refProps = parseStyleProps(refNodes[i].getAttribute("style") ?? "");
      const outProps = parseStyleProps(outNodes[i].getAttribute("style") ?? "");
      for (const prop of STYLE_PROPS) {
        const refVal = refProps.get(prop);
        const outVal = outProps.get(prop);
        if (refVal === undefined) continue;
        if (refVal === outVal) continue;
        mismatches.push({
          kind: "style",
          key,
          index: i,
          prop,
          ref: refVal ?? "(none)",
          out: outVal ?? "(none)",
        });
      }
    }
  }
  return mismatches;
}

function compareClassCounts(refDoc, outDoc) {
  const refCounts = collectClassCounts(refDoc);
  const outCounts = collectClassCounts(outDoc);
  const diffs = [];
  const all = new Set([...refCounts.keys(), ...outCounts.keys()]);

  for (const cls of [...all].sort()) {
    if (ALLOWED_CLASSES.has(cls)) continue;
    const ref = refCounts.get(cls) ?? 0;
    const out = outCounts.get(cls) ?? 0;
    if (ref !== out) diffs.push({ cls, ref, out });
  }
  return diffs;
}

function analyzeRoute(route) {
  const refPath = path.join(refRoot, route.ref);
  const outPath = path.join(outRoot, route.out);
  if (!existsSync(refPath)) throw new Error(`Missing reference: ${refPath}`);
  if (!existsSync(outPath)) throw new Error(`Missing export: ${outPath} — run CONTENT_PROFILE=reference pnpm run build`);

  const refDoc = parse(readFileSync(refPath, "utf8"));
  const outDoc = parse(readFileSync(outPath, "utf8"));

  const refClasses = collectFramerClasses(refDoc);
  const outClasses = collectFramerClasses(outDoc);
  const classDiff = diffSets(refClasses, outClasses, ALLOWED_CLASSES);

  const refNames = collectNames(refDoc);
  const outNames = collectNames(outDoc);
  const nameDiff = diffSets(refNames, outNames, ALLOWED_NAMES);

  const refIds = collectIds(refDoc);
  const outIds = collectIds(outDoc);
  const idMissing = [...refIds].filter((id) => !outIds.has(id) && !ALLOWED_IDS.has(id)).sort();
  const idExtra = [...outIds].filter((id) => !refIds.has(id)).sort();

  const textDiffs = [];
  for (const section of SECTION_SELECTORS) {
    const refText = sectionText(refDoc, section.selector);
    const outText = sectionText(outDoc, section.selector);
    if (refText === null && outText === null) continue;
    if (refText !== outText) {
      textDiffs.push({
        section: section.id,
        refLen: refText?.length ?? 0,
        outLen: outText?.length ?? 0,
        refPreview: (refText ?? "").slice(0, 120),
        outPreview: (outText ?? "").slice(0, 120),
      });
    }
  }

  const styleDiffs = compareInlineStyles(refDoc, outDoc);
  const classCountDiffs = compareClassCounts(refDoc, outDoc);
  const useDiffs = unresolvedUseRefs(refDoc, outDoc);

  const pass =
    classDiff.missing.length === 0 &&
    nameDiff.missing.length === 0 &&
    idMissing.length === 0 &&
    textDiffs.length === 0 &&
    styleDiffs.length === 0 &&
    classCountDiffs.length === 0 &&
    useDiffs.length === 0;

  return {
    route: route.id,
    refClasses: refClasses.size,
    outClasses: outClasses.size,
    classDiff,
    nameDiff,
    idMissing,
    idExtra,
    textDiffs,
    styleDiffs,
    classCountDiffs,
    useDiffs,
    pass,
  };
}

function main() {
  mkdirSync(qaDir, { recursive: true });
  const results = ROUTES.map(analyzeRoute);
  const allPass = results.every((r) => r.pass);

  const lines = [
    "# DOM parity report",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "## Summary",
    "",
    "| Route | Missing classes | Text | Style | Class counts | Unresolved use | Pass |",
    "|-------|-----------------|------|-------|--------------|----------------|------|",
  ];

  for (const r of results) {
    lines.push(
      `| ${r.route} | ${r.classDiff.missing.length} | ${r.textDiffs.length} | ${r.styleDiffs.length} | ${r.classCountDiffs.length} | ${r.useDiffs.length} | ${r.pass ? "PASS" : "FAIL"} |`,
    );
  }

  for (const r of results) {
    lines.push("", `## ${r.route}`, "");
    if (r.classDiff.missing.length) {
      lines.push("### Missing framer classes", "", "```", ...r.classDiff.missing, "```");
    }
    if (r.nameDiff.missing.length) {
      lines.push("### Missing data-framer-name", "", "```", ...r.nameDiff.missing, "```");
    }
    if (r.idMissing.length) {
      lines.push("### Missing ids", "", "```", ...r.idMissing, "```");
    }
    if (r.textDiffs.length) {
      lines.push("### Section text diffs", "");
      for (const t of r.textDiffs) {
        lines.push(`- **${t.section}**: ref(${t.refLen}) vs ours(${t.outLen})`);
        lines.push(`  - ref: \`${t.refPreview}\``);
        lines.push(`  - ours: \`${t.outPreview}\``);
      }
    }
    if (r.styleDiffs.length) {
      lines.push("### Inline style diffs", "");
      for (const s of r.styleDiffs.slice(0, 40)) {
        lines.push(`- ${JSON.stringify(s)}`);
      }
      if (r.styleDiffs.length > 40) lines.push(`- … and ${r.styleDiffs.length - 40} more`);
    }
    if (r.classCountDiffs.length) {
      lines.push("### Class count diffs", "");
      for (const c of r.classCountDiffs.slice(0, 40)) {
        lines.push(`- \`${c.cls}\`: ref ${c.ref} vs ours ${c.out}`);
      }
    }
    if (r.useDiffs.length) {
      lines.push("### Unresolved SVG use refs", "", "```", ...r.useDiffs, "```");
    }
    if (r.pass) lines.push("", "All checks passed for this route.");
  }

  lines.push("", `## Overall: ${allPass ? "PASS" : "FAIL"}`, "");
  const report = lines.join("\n");
  writeFileSync(path.join(qaDir, "PARITY-DOM.md"), report);
  console.log(report);
  if (!allPass) process.exit(1);
}

main();
