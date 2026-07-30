#!/usr/bin/env node
/**
 * Wires hardcoded Framer export strings to React content props.
 * Idempotent — safe to re-run after manual edits.
 */
import fs from "node:fs";
import path from "node:path";

const root = path.resolve(import.meta.dirname, "..");

function read(rel) {
  return fs.readFileSync(path.join(root, rel), "utf8");
}

function write(rel, content) {
  fs.writeFileSync(path.join(root, rel), content);
}

function replaceH1Inner(html, replacement) {
  return html.replace(/(<h1[^>]*>)([\s\S]*?)(<\/h1>)/g, `$1${replacement}$3`);
}

function replaceH3ServiceTitle(html, oldLabel, replacement) {
  const escaped = oldLabel.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
  const re = new RegExp(
    `(<h[13][^>]*>[\\s\\S]*?<span[^>]*>\\s*)${escaped}(\\s*</span>[\\s\\S]*?</h[13]>)`,
    "g",
  );
  return html.replace(re, `$1${replacement}$2`);
}

// --- Hero ---
{
  let hero = read("src/widgets/sections/Hero.tsx");
  if (hero.includes("void _content")) {
    hero = hero.replace(
      `export function Hero({ content: _content }: { content: HeroContent }) {
  void _content;`,
      `export function Hero({ content }: { content: HeroContent }) {
  const illustration = content.illustration;`,
    );
    hero = hero.replaceAll("/assets/images/image-78438678.png", "${illustration}");
    hero = hero.replace(
      /src=\{"(\$\{illustration\}[^"]*)"\}/g,
      "src={`$1`}",
    );
    hero = hero.replace(
      /srcSet=\{"([^"]*)"\}/g,
      (match, value) => {
        if (!value.includes("${illustration}")) return match;
        return `srcSet={\`${value}\`}`;
      },
    );
    write("src/widgets/sections/Hero.tsx", hero);
    console.log("wired Hero.tsx");
  }
}

// --- Intro ---
{
  let intro = read("src/widgets/sections/Intro.tsx");
  if (intro.includes("void _content")) {
    intro = intro.replace(
      `import type { IntroContent } from "@/content/section-types";`,
      `import type { IntroContent } from "@/content/section-types";
import { AnimatedWords } from "@/shared/lib/animated-text";`,
    );
    intro = intro.replace(
      `export function Intro({ content: _content }: { content: IntroContent }) {
  void _content;`,
      `export function Intro({ content }: { content: IntroContent }) {`,
    );
    intro = intro.replace(
      `<h2 className={"framer-text framer-styles-preset-1ir8ahu"} data-styles-preset={"RGebQr53Z"} dir={"auto"}>
                  <span style={{"display": "inline-block", "opacity": "0.001", "transform": "translateX(0px) translateY(10px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)"}}>
                    Hi
                  </span>
                  <span style={{"display": "inline-block", "opacity": "0.001", "transform": "translateX(0px) translateY(10px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)"}}>
                    There!
                  </span>
                </h2>`,
      `<h2 className={"framer-text framer-styles-preset-1ir8ahu"} data-styles-preset={"RGebQr53Z"} dir={"auto"}>
                  <AnimatedWords text={content.greeting} />
                </h2>`,
    );
    intro = replaceH1Inner(intro, `<AnimatedWords text={content.headline} />`);
    write("src/widgets/sections/Intro.tsx", intro);
    console.log("wired Intro.tsx");
  }
}

// --- Services ---
{
  let services = read("src/widgets/sections/Services.tsx");
  if (services.includes("void _content")) {
    services = services.replace(
      `import { Appear } from "@/features/Appear";`,
      `import { Appear } from "@/features/Appear";
import { AnimatedWords } from "@/shared/lib/animated-text";`,
    );
    services = services.replace(
      `export function Services({ content: _content }: { content: ServicesContent }) {
  void _content;`,
      `export function Services({ content }: { content: ServicesContent }) {`,
    );

    const serviceReplacements = [
      ["BRANDING", "<AnimatedWords text={content.items[0] ?? \"\"} />"],
      ["ILLUSTRATIONS", "<AnimatedWords text={content.items[2] ?? \"\"} />"],
      ["PACKAGING", "<AnimatedWords text={content.items[3] ?? \"\"} />"],
    ];

    for (const [label, jsx] of serviceReplacements) {
      services = replaceH3ServiceTitle(services, label, jsx);
    }

    services = services.replace(
      /<span style=\{\{"display": "inline-block", "opacity": "0.001", "transform": "translateX\(0px\) translateY\(10px\) scale\(1\) rotate\(0deg\) skewX\(0deg\) skewY\(0deg\)"\}\}>\s*BRAND\s*<\/span>\s*<span style=\{\{"display": "inline-block", "opacity": "0.001", "transform": "translateX\(0px\) translateY\(10px\) scale\(1\) rotate\(0deg\) skewX\(0deg\) skewY\(0deg\)"\}\}>\s*IDENTITY\s*<\/span>/g,
      "<AnimatedWords text={content.items[0] ?? \"\"} />",
    );
    services = services.replace(
      /<span style=\{\{"display": "inline-block", "opacity": "0.001", "transform": "translateX\(0px\) translateY\(10px\) scale\(1\) rotate\(0deg\) skewX\(0deg\) skewY\(0deg\)"\}\}>\s*GRAPHIC\s*<\/span>\s*<span style=\{\{"display": "inline-block", "opacity": "0.001", "transform": "translateX\(0px\) translateY\(10px\) scale\(1\) rotate\(0deg\) skewX\(0deg\) skewY\(0deg\)"\}\}>\s*DESIGN\s*<\/span>/g,
      "<AnimatedWords text={content.items[1] ?? \"\"} />",
    );

    services = services.replaceAll(
      'src={"/assets/images/image-51a40ab0.svg?width=172&height=106"}',
      "src={`${content.decor}?width=172&height=106`}",
    );

    write("src/widgets/sections/Services.tsx", services);
    console.log("wired Services.tsx");
  }
}

// --- SneakPeak ---
{
  let sneak = read("src/widgets/sections/SneakPeak.tsx");
  if (sneak.includes("void _content")) {
    const imageIds = [
      "image-3057b619",
      "image-57b50b25",
      "image-817d57df",
      "image-431c59fd",
      "image-6a3bd1b1",
      "image-7fb09da3",
      "image-38decee6",
      "image-f00bacf4",
      "image-78b8d432",
      "image-c54e57a6",
      "image-b6e2ba92",
      "image-3a1db525",
    ];
    sneak = sneak.replace(
      `export function SneakPeak({ content: _content }: { content: SneakPeakContent }) {
  void _content;`,
      `export function SneakPeak({ content }: { content: SneakPeakContent }) {`,
    );
    imageIds.forEach((id, index) => {
      const fallback = `/assets/images/${id}.png`;
      sneak = sneak.replace(
        new RegExp(`src=\\{"${fallback.replace(/\./g, "\\.")}([^"]*)"\\}`, "g"),
        `src={\`\${content.images[${index}] ?? "${fallback}"}$1\`}`,
      );
      sneak = sneak.replace(
        new RegExp(`srcSet=\\{"${fallback.replace(/\./g, "\\.")}([^"]*)"\\}`, "g"),
        `srcSet={\`\${content.images[${index}] ?? "${fallback}"}$1\`}`,
      );
    });
    write("src/widgets/sections/SneakPeak.tsx", sneak);
    console.log("wired SneakPeak.tsx");
  }
}

// --- Testimonial ---
{
  let testimonial = read("src/widgets/sections/Testimonial.tsx");
  if (testimonial.includes("void _content")) {
    testimonial = testimonial.replace(
      `export function Testimonial({ content: _content }: { content: TestimonialContent }) {
  void _content;`,
      `export function Testimonial({ content }: { content: TestimonialContent }) {`,
    );
    const authors = [
      "Leo Bennett",
      "Nina Carter",
      "Ethan Brooks",
      "Maya Flores",
      "Miles Rivera",
      "Sofia Grant",
      "Gillian Anderson",
      "Tom Turner",
    ];
    const quotes = [
      "They brought structure and personality to our brand in a way that immediately made everything feel more confident, polished, and cohesive.",
      "Working together felt effortless from start to finish. They translated a rough idea into a visual identity that felt clear, expressive, and genuinely memorable.",
      "They have a rare ability to make complex ideas feel simple and beautiful. The final result was thoughtful, strategic, and full of character.",
      "The new visuals gave our launch a completely different energy. Everything felt intentional, distinctive, and much more aligned with the audience we wanted to reach.",
      "The illustrations added warmth and personality without losing professionalism. It made the whole brand feel more human, modern, and engaging.",
      "From the first concepts to the final files, every detail was handled with care. The work felt refined, playful, and incredibly easy to build a brand around.",
      "What stood out most was the balance between creativity and clarity. The system felt original, but it also worked beautifully across every touchpoint.",
      "They helped us move from scattered inspiration to a brand that finally felt unified. The result looked distinctive and instantly more mature.",
    ];
    const rolePatterns = [
      ['{"creative lead, form &amp; co"}', "{content.items[0]?.role ?? \"\"}"],
      ["founder, north studio", "{content.items[1]?.role ?? \"\"}"],
      ["co founder, fieldwave", "{content.items[2]?.role ?? \"\"}"],
      ["marketing manager, lune labs", "{content.items[3]?.role ?? \"\"}"],
      ["product marketing lead, orbit supply", "{content.items[4]?.role ?? \"\"}"],
      ["brand manager, kinfolk agency", "{content.items[5]?.role ?? \"\"}"],
      ["art director, north avenue", "{content.items[6]?.role ?? \"\"}"],
      ["founder, ember house", "{content.items[7]?.role ?? \"\"}"],
    ];

    authors.forEach((author, i) => {
      testimonial = testimonial.replaceAll(
        author,
        `{content.items[${i}]?.author ?? ""}`,
      );
    });
    quotes.forEach((quote, i) => {
      testimonial = testimonial.replaceAll(
        quote,
        `{content.items[${i}]?.quote ?? ""}`,
      );
    });
    rolePatterns.forEach(([from, to]) => {
      testimonial = testimonial.replaceAll(from, to);
    });

    write("src/widgets/sections/Testimonial.tsx", testimonial);
    console.log("wired Testimonial.tsx");
  }
}

// --- Footer ---
{
  let footer = read("src/widgets/sections/Footer.tsx");
  if (footer.includes("void _content")) {
    footer = footer.replace(
      `export function Footer({ content: _content }: { content: FooterContent }) {
  void _content;`,
      `export function Footer({ content }: { content: FooterContent }) {`,
    );
    footer = footer.replaceAll("haidutski@gmail.com", "{content.email}");
    footer = footer.replaceAll('href={"mailto:haidutski@gmail.com"}', 'href={`mailto:${content.email}`}');
    footer = footer.replaceAll("Ivan Haidutski", "{content.madeBy}");
    footer = footer.replaceAll("Copyrights @ 2026, Haidutski", "{content.copyright}");
    footer = footer.replaceAll(
      'href={"https://www.behance.net/ivanhaidutski"}',
      "href={content.social[2]?.href ?? \"#\"}",
    );
    footer = footer.replaceAll(
      "Create a free website with Framer, the website builder loved by startups, designers and agencies.",
      "{content.promo}",
    );
    footer = footer.replaceAll(
      'href={"https://www.framer.com"}',
      "href={content.promoHref || \"#\"}",
    );
    footer = footer.replaceAll(
      'src={"/assets/images/image-3a2fc861.png',
      "src={`${content.mark}",
    );
    write("src/widgets/sections/Footer.tsx", footer);
    console.log("wired Footer.tsx");
  }
}

// --- Header / WorkHeader contact + social ---
for (const rel of ["src/widgets/sections/Header.tsx", "src/widgets/sections/WorkHeader.tsx"]) {
  let header = read(rel);
  header = header.replaceAll("haidutski@gmail.com", "{content.email}");
  header = header.replaceAll('href={"mailto:rosyidqoim@gmail.com"}', 'href={`mailto:${content.email}`}');
  header = header.replaceAll("+1 877-975-3786", "{content.phone}");
  header = header.replaceAll('href={"tel:+6281325309058"}', 'href={`tel:${content.phone.replace(/\\s/g, "")}`}');
  header = header.replaceAll('href={"https://www.instagram.com/"}', "href={content.social[0]?.href ?? \"#\"}");
  header = header.replaceAll(
    'href={"https://www.linkedin.com/in/ivan-haidutski-456b43121/"}',
    "href={content.social[1]?.href ?? \"#\"}",
  );
  header = header.replaceAll(
    'href={"https://www.behance.net/ivanhaidutski"}',
    "href={content.social[2]?.href ?? \"#\"}",
  );
  write(rel, header);
  console.log(`wired ${rel}`);
}

console.log("Content wiring complete.");
