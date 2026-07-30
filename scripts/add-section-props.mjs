#!/usr/bin/env node
/** Add typed content props to generated section components. */
import { readFileSync, writeFileSync, readdirSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const sectionsDir = path.join(root, "src", "widgets", "sections");

const SECTION_PROPS = {
  About: "AboutContent",
  Faq: "FaqContent",
  Footer: "FooterContent",
  Header: "IntroContent",
  Hero: "HeroContent",
  Intro: "IntroContent",
  Services: "ServicesContent",
  SneakPeak: "SneakPeakContent",
  SvgTemplates: null,
  Testimonial: "TestimonialContent",
  Works: "WorksContent",
  WorkDetail: null,
  WorkHeader: "IntroContent",
};

for (const file of readdirSync(sectionsDir).filter((f) => f.endsWith(".tsx"))) {
  const base = file.replace(/\.tsx$/, "");
  const contentType = SECTION_PROPS[base];
  if (contentType === undefined) continue;

  let src = readFileSync(path.join(sectionsDir, file), "utf8");
  src = src.replace(/^\/\/ @ts-nocheck\s*\n/m, "").replace(/^\/\* eslint-disable \*\/\s*\n/m, "");

  if (base === "WorkDetail") {
    if (!src.includes('import type { Work }')) {
      src = src.replace(
        '"use client";\n',
        '"use client";\n\nimport type { Work } from "@/content/types";\n',
      );
    }
    src = src.replace(
      /export function WorkDetail\(\)/,
      "export function WorkDetail({ work }: { work: Work })",
    );
  } else if (base === "SvgTemplates") {
    src = src.replace(
      /export function SvgTemplates\(\)/,
      "export function SvgTemplates(_props?: Record<string, never>)",
    );
  } else if (base === "Faq") {
    if (!src.includes("FaqContent")) {
      src = src.replace(
        '"use client";\n',
        '"use client";\n\nimport type { FaqContent } from "@/content/section-types";\n',
      );
    }
    src = src.replace(
      /export function Faq\(\)/,
      "export function Faq({ content, openIndex, onToggle }: { content: FaqContent; openIndex: number | null; onToggle: (index: number) => void })",
    );
    void contentType;
  } else if (base === "Works") {
    if (!src.includes("WorksContent")) {
      src = src.replace(
        '"use client";\n',
        '"use client";\n\nimport type { WorksContent } from "@/content/section-types";\n',
      );
    }
    src = src.replace(
      /export function Works\(\)/,
      "export function Works({ content, activeSlug, onHover }: { content: WorksContent; activeSlug: string | null; onHover: (slug: string | null) => void })",
    );
  } else {
    if (!src.includes(`import type { ${contentType}`)) {
      src = src.replace(
        '"use client";\n',
        `"use client";\n\nimport type { ${contentType} } from "@/content/section-types";\n`,
      );
    }
    src = src.replace(
      new RegExp(`export function ${base}\\(\\)`),
      `export function ${base}({ content }: { content: ${contentType} })`,
    );
  }

  writeFileSync(path.join(sectionsDir, file), src);
  console.log("typed:", file);
}
