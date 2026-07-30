#!/usr/bin/env node
/**
 * Wraps or replaces Framer SSR hidden nodes with Appear/HiddenReveal/AnimatedSpan.
 * Idempotent where possible — skips already-wrapped nodes.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");
const appearIds = new Set(Object.keys(JSON.parse(fs.readFileSync(path.join(root, "framer/data/appear.json"), "utf8"))));

const SECTION_DIR = "src/widgets/sections";
const WRAPPER_TAGS = new Set(["div", "nav", "a", "section"]);
const SKIP_ANCESTOR = new Set(["Appear", "HiddenReveal", "AnimatedSpan", "AnimatedWords", "motion.div", "motion.span"]);

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function write(rel, content) {
  fs.writeFileSync(path.join(root, rel), content);
}

function ensureImports(content, needs) {
  let next = content;
  const importLine = 'import { AnimatedSpan, HiddenReveal } from "@/features/HiddenReveal";';
  const appearLine = 'import { Appear } from "@/features/Appear";';

  if (needs.hiddenReveal || needs.animatedSpan) {
    if (!next.includes("@/features/HiddenReveal")) {
      const useClient = next.match(/^"use client";\n\n/);
      if (useClient) {
        next = next.replace(useClient[0], `${useClient[0]}${importLine}\n`);
      } else {
        next = `${importLine}\n${next}`;
      }
    } else if (needs.animatedSpan && !next.includes("AnimatedSpan")) {
      next = next.replace(
        /import \{([^}]+)\} from "@\/features\/HiddenReveal";/,
        (_, names) => {
          const set = new Set(names.split(",").map((s) => s.trim()));
          set.add("AnimatedSpan");
          set.add("HiddenReveal");
          return `import { ${[...set].join(", ")} } from "@/features/HiddenReveal";`;
        },
      );
    }
  }
  if (needs.appear && !next.includes("@/features/Appear")) {
    const useClient = next.match(/^"use client";\n\n/);
    if (useClient) {
      next = next.replace(useClient[0], `${useClient[0]}${appearLine}\n`);
    }
  }
  return next;
}

function extractFramerHash(className) {
  const m = className?.match(/framer-([a-z0-9]+)/);
  return m?.[1] ?? null;
}

function hasHiddenOpacity(styleStr) {
  return /"opacity":\s*"0(\.001)?"/.test(styleStr) || /"opacity":\s*0(\.001)?[,}]/.test(styleStr);
}

function isWordStaggerSpan(openTag) {
  return (
    openTag.startsWith("<span") &&
    /"display":\s*"inline-block"/.test(openTag) &&
    /"opacity":\s*"0\.001"/.test(openTag) &&
    /translateY\(\d+px\)/.test(openTag)
  );
}

function getTranslateY(openTag) {
  const m = openTag.match(/translateY\((\d+)px\)/);
  return m ? Number(m[1]) : 10;
}

function stripOpacityFromStyle(styleStr) {
  return styleStr
    .replace(/,?\s*"opacity":\s*"0(\.001)?"/g, "")
    .replace(/,?\s*"opacity":\s*0(\.001)?/g, "")
    .replace(/\{\s*,/g, "{")
    .replace(/,\s*\}/g, "}");
}

function transformFile(rel, { aboutMode = false } = {}) {
  let content = read(rel);
  const needs = { hiddenReveal: false, animatedSpan: false, appear: false };

  // Unwrap redundant spans around AnimatedWords
  content = content.replace(
    /<span style=\{\{"display": "inline-block", "opacity": "0\.001", "transform": "translateX\(0px\) translateY\(\d+px\) scale\(1\) rotate\(0deg\) skewX\(0deg\) skewY\(0deg\)"\}\}>\s*(<AnimatedWords[\s\S]*?<\/AnimatedWords>)\s*<\/span>/g,
    "$1",
  );

  // Replace word stagger spans with AnimatedSpan
  content = content.replace(
    /<span style=\{\{"display": "inline-block", "opacity": "0\.001", "transform": "translateX\(0px\) translateY\((\d+)px\) scale\(1\) rotate\(0deg\) skewX\(0deg\) skewY\(0deg\)"\}\}>([\s\S]*?)<\/span>/g,
    (_, y, inner) => {
      if (inner.includes("<AnimatedWords") || inner.includes("<AnimatedSpan")) return `<span style={{"display": "inline-block", "opacity": "0.001", "transform": "translateX(0px) translateY(${y}px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)"}}>${inner}</span>`;
      needs.animatedSpan = true;
      const trimmed = inner.trim();
      return `<AnimatedSpan y={${y}}>${trimmed}</AnimatedSpan>`;
    },
  );

  // Strip opacity from placeholder text inside animated parents
  content = content.replace(
    /(<div className=\{"framer-10ep7wh"\}[^>]*style=\{\{)([\s\S]*?"opacity": "0"[\s\S]*?)(\}\}>)/g,
    (_, pre, style, post) => `${pre}${stripOpacityFromStyle(style)}${post}`,
  );
  content = content.replace(
    /(<div className=\{"framer-jkk7dd"\}[^>]*style=\{\{)([\s\S]*?"opacity": "0"[\s\S]*?)(\}\}>)/g,
    (_, pre, style, post) => `${pre}${stripOpacityFromStyle(style)}${post}`,
  );

  // Parse tags and wrap hidden containers
  const lines = content.split("\n");
  const out = [];
  const stack = []; // { tag, replaced, indent }
  const ancestorStack = []; // component names

  for (let i = 0; i < lines.length; i++) {
    let line = lines[i];

    // Track ancestors
    const openComponent = line.match(/^(\s*)<(Appear|HiddenReveal|AnimatedSpan|AnimatedWords|motion\.div|motion\.span)\b/);
    if (openComponent) {
      ancestorStack.push(openComponent[2]);
    }
    const closeComponent = line.match(/^(\s*)<\/(Appear|HiddenReveal|AnimatedSpan|AnimatedWords|motion\.div|motion\.span)>/);
    if (closeComponent) {
      ancestorStack.pop();
    }

    const openMatch = line.match(/^(\s*)<(div|nav|a|section)(\s[^>]*)>/);
    if (openMatch && !line.includes("<HiddenReveal") && !line.includes("<Appear")) {
      const [, indent, tag, rest] = openMatch;
      const styleMatch = rest.match(/style=\{\{([\s\S]*?)\}\}/);
      const insideWrapper = ancestorStack.some((a) => SKIP_ANCESTOR.has(a));

      if (styleMatch && hasHiddenOpacity(styleMatch[1]) && !insideWrapper) {
        const classMatch = rest.match(/className=\{"([^"]+)"\}/);
        const framerName = rest.match(/data-framer-name=\{"([^"]+)"\}/);
        const hash = extractFramerHash(classMatch?.[1] ?? "");
        const appearId = hash && appearIds.has(hash) ? hash : null;

        if (appearId && tag === "div") {
          needs.appear = true;
          line = `${indent}<Appear id="${appearId}"${rest}>`;
          stack.push({ tag, replaced: "Appear" });
        } else if (WRAPPER_TAGS.has(tag)) {
          needs.hiddenReveal = true;
          line = `${indent}<HiddenReveal${rest.replace(/^ /, " ")}>`;
          stack.push({ tag, replaced: "HiddenReveal" });
        } else {
          stack.push({ tag, replaced: null });
        }
      } else if (styleMatch && hasHiddenOpacity(styleMatch[1]) && insideWrapper) {
        // Strip opacity only
        const newStyle = stripOpacityFromStyle(styleMatch[1]);
        line = line.replace(/style=\{\{[\s\S]*?\}\}/, `style={{${newStyle}}}`);
        stack.push({ tag, replaced: null });
      } else {
        stack.push({ tag: openMatch ? tag : null, replaced: null });
      }
    } else if (line.match(/^(\s*)<\/(div|nav|a|section)>/)) {
      const closeMatch = line.match(/^(\s*)<\/(div|nav|a|section)>/);
      const frame = stack.pop();
      if (frame?.replaced) {
        line = `${closeMatch[1]}</${frame.replaced}>`;
      }
    } else if (openMatch === null && line.includes("<div")) {
      // self-closing or other div patterns - push if opening
      if (line.match(/<div[^>]*>/) && !line.includes("</div>")) {
        stack.push({ tag: "div", replaced: null });
      }
    }

    out.push(line);
  }

  content = out.join("\n");
  content = ensureImports(content, needs);
  write(rel, content);
  console.log(`wired reveal: ${rel}${aboutMode ? " (about)" : ""}`);
}

const files = fs.readdirSync(path.join(root, SECTION_DIR)).filter((f) => f.endsWith(".tsx"));

for (const file of files) {
  if (file === "About.tsx") continue;
  transformFile(`${SECTION_DIR}/${file}`);
}

// About separately
transformFile(`${SECTION_DIR}/About.tsx`, { aboutMode: true });

console.log("Reveal motion wiring complete.");
