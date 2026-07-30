/**
 * Shared HTML → JSX converter for Framer codegen.
 */
export const VOID = new Set([
  "area", "base", "br", "col", "embed", "hr", "img", "input", "link", "meta",
  "param", "source", "track", "wbr",
]);

export const ATTR_RENAME = {
  class: "className",
  for: "htmlFor",
  tabindex: "tabIndex",
  readonly: "readOnly",
  maxlength: "maxLength",
  minlength: "minLength",
  colspan: "colSpan",
  rowspan: "rowSpan",
  autofocus: "autoFocus",
  autoplay: "autoPlay",
  crossorigin: "crossOrigin",
  enctype: "encType",
  formaction: "formAction",
  srcset: "srcSet",
  allowfullscreen: "allowFullScreen",
  preserveaspectratio: "preserveAspectRatio",
  viewbox: "viewBox",
  fillrule: "fillRule",
  cliprule: "clipRule",
  strokewidth: "strokeWidth",
  "stroke-width": "strokeWidth",
  "stroke-linecap": "strokeLinecap",
  "stroke-linejoin": "strokeLinejoin",
  "fill-rule": "fillRule",
  "clip-rule": "clipRule",
  "stop-color": "stopColor",
  "stop-opacity": "stopOpacity",
};

export function camelCaseAttr(name) {
  if (ATTR_RENAME[name]) return ATTR_RENAME[name];
  if (ATTR_RENAME[name.toLowerCase()]) return ATTR_RENAME[name.toLowerCase()];
  if (name.includes("-")) return name.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
  return name;
}

export function escapeJsxText(text) {
  if (!text) return "";
  if (!/[{}<>&]/.test(text)) return text;
  return `{${JSON.stringify(text)}}`;
}

export function cssPropName(key) {
  if (key.startsWith("--")) return key;
  if (!key.includes("-")) return key;
  return key.replace(/-([a-z])/g, (_, c) => c.toUpperCase());
}

export function styleToObject(styleStr) {
  if (!styleStr?.trim()) return null;
  const entries = [];
  for (const part of styleStr.split(";")) {
    const idx = part.indexOf(":");
    if (idx === -1) continue;
    const key = cssPropName(part.slice(0, idx).trim());
    const value = part.slice(idx + 1).trim();
    if (!key) continue;
    entries.push(`${JSON.stringify(key)}: ${JSON.stringify(value)}`);
  }
  if (!entries.length) return null;
  return `{${entries.join(", ")}}`;
}

export function serializeAttr(name, value) {
  const jsxName =
    name.startsWith("data-") || name.startsWith("aria-")
      ? name
      : camelCaseAttr(name);

  if (value === "" && !name.startsWith("data-")) return jsxName;
  if (value === "true") return `${jsxName}={true}`;
  if (value === "false") return `${jsxName}={false}`;
  if (/^\d+$/.test(value) && jsxName !== "data-framer-appear-id") {
    return `${jsxName}={${value}}`;
  }
  if (name === "style") {
    const obj = styleToObject(value);
    return obj ? `style={${obj}}` : null;
  }
  if (name === "href" && value === "./") return `href="/"`;
  if (name === "href" && value.startsWith("./") && value.length > 2) {
    const slug = value.slice(2).replace(/\/$/, "");
    return `href={${JSON.stringify(`/works/${slug}`)}}`;
  }
  if (value === "" || value === undefined) return jsxName;
  return `${jsxName}={${JSON.stringify(value)}}`;
}

export function nodeToJsx(node, NodeType, depth = 0, options = {}) {
  const { useAppear = true } = options;
  const pad = "  ".repeat(depth);

  if (node.nodeType === NodeType.TEXT_NODE) {
    const text = node.rawText;
    if (!text.trim()) return "";
    return `${pad}${escapeJsxText(text)}\n`;
  }

  if (node.nodeType !== NodeType.ELEMENT_NODE) return "";

  const tag = node.rawTagName.toLowerCase();
  if (tag === "script" || tag === "style") return "";

  const appearId = node.getAttribute("data-framer-appear-id");
  const attrParts = [];
  for (const [name, value] of Object.entries(node.attributes)) {
    if (name === "data-framer-appear-id") continue;
    const serialized = serializeAttr(name, value);
    if (serialized) attrParts.push(serialized);
  }

  const childDepth = depth + (appearId && useAppear ? 2 : 1);
  const childJsx = node.childNodes
    .map((child) => nodeToJsx(child, NodeType, childDepth, options))
    .join("")
    .replace(/\n$/, "");

  const attrStr = attrParts.length ? " " + attrParts.join(" ") : "";

  if (appearId && useAppear) {
    const open = `${pad}<Appear id=${JSON.stringify(appearId)}${attrStr}>`;
    const close = `${pad}</Appear>`;
    if (!childJsx.trim()) return `${open}\n${close}\n`;
    return `${open}\n${childJsx}\n${close}\n`;
  }

  if (VOID.has(tag)) return `${pad}<${tag}${attrStr} />\n`;

  const open = `${pad}<${tag}${attrStr}>`;
  const close = `${pad}</${tag}>`;
  if (!childJsx.trim()) return `${open}${close}\n`;
  return `${open}\n${childJsx}\n${close}\n`;
}

export function htmlToComponent(name, html, parse, NodeType, { importAppear = false, extraImports = "" } = {}) {
  const parsed = parse(`<div data-codegen-root>${html}</div>`);
  const wrapper = parsed.querySelector("[data-codegen-root]");
  const roots = wrapper?.childNodes.filter((n) => n.nodeType === NodeType.ELEMENT_NODE) ?? [];
  if (!roots.length) throw new Error(`Empty HTML for ${name}`);

  const body = roots
    .map((rootEl) => nodeToJsx(rootEl, NodeType, 2, { useAppear: importAppear }).trimEnd())
    .join("\n");
  const wrappedBody =
    roots.length > 1
      ? `    <>\n${roots
          .map((rootEl) => nodeToJsx(rootEl, NodeType, 3, { useAppear: importAppear }).trimEnd())
          .join("\n")}\n    </>`
      : body;
  const appearImport = importAppear
    ? `import { Appear } from "@/framer/runtime/Appear";\n`
    : "";

  return `// @ts-nocheck
/* eslint-disable */
/* AUTO-GENERATED by scripts/codegen-framer.mjs — do not edit by hand */
"use client";

${appearImport}${extraImports}
export function ${name}() {
  return (
${wrappedBody}
  );
}
`;
}

export function hasAppear(html) {
  return html.includes("data-framer-appear-id");
}
