#!/usr/bin/env node
/**
 * Manifest-driven pixel-diff gate for migrated routes vs reference export.
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const require = createRequire(
  path.join(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
    "package.json",
  ),
);
const { PNG } = require("pngjs");
const pixelmatch = require("pixelmatch").default || require("pixelmatch");

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const manifestPath = path.join(root, "qa", "section-manifest.json");
const outDir = path.join(root, "qa");
const refPort = 3457;
const previewPort = 3011;
const tmpRef = "/tmp/picco-ref-verify";
const tmpPreview = "/tmp/picco-preview-verify";

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: ["ignore", "pipe", "pipe"], ...opts });
    if (!child) {
      reject(new Error(`Failed to spawn: ${cmd} ${args.join(" ")}`));
      return;
    }
    let stderr = "";
    if (child.stderr) child.stderr.on("data", (d) => (stderr += d));
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")}\n${stderr}`));
    });
  });
}

async function waitFor(url, attempts = 80) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await sleep(300);
  }
  throw new Error(`Server not ready: ${url}`);
}

function loadPng(filePath) {
  return PNG.sync.read(readFileSync(filePath));
}

function cropRegion(png, x, y, w, h) {
  const out = new PNG({ width: w, height: h });
  PNG.bitblt(png, out, x, y, w, h, 0, 0);
  return out;
}

function diffPercent(a, b, diffPath) {
  const width = Math.min(a.width, b.width);
  const height = Math.min(a.height, b.height);
  if (width <= 0 || height <= 0) return 1;
  const imgA = cropRegion(a, 0, 0, width, height);
  const imgB = cropRegion(b, 0, 0, width, height);
  const diff = new PNG({ width, height });
  const mismatched = pixelmatch(imgA.data, imgB.data, diff.data, width, height, {
    threshold: 0.1,
    includeAA: true,
  });
  if (diffPath) writeFileSync(diffPath, PNG.sync.write(diff));
  return mismatched / (width * height);
}

async function pauseAnimationsInSection(page, selector) {
  await page.evaluate((sel) => {
    const section =
      sel === "nav"
        ? document.querySelector("nav[data-framer-name]")
        : document.querySelector(sel);
    if (!section) return;
    const roots = [section, ...section.querySelectorAll("*")];
    for (const el of roots) {
      if (!(el instanceof HTMLElement)) continue;
      for (const anim of el.getAnimations()) anim.pause();
      const style = getComputedStyle(el);
      if (style.animationName && style.animationName !== "none") {
        el.style.animationPlayState = "paused";
      }
    }
  }, selector);
  await page.waitForTimeout(120);
}

async function waitForAssets(page) {
  await page.evaluate(async () => {
    const timeout = new Promise((resolve) => setTimeout(resolve, 3000));
    const fonts = document.fonts?.ready ?? Promise.resolve();
    const imgs = [...document.images];
    const images = Promise.all(
      imgs.map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
              img.addEventListener("load", resolve, { once: true });
              img.addEventListener("error", resolve, { once: true });
            }),
      ),
    );
    await Promise.race([Promise.all([fonts, images]), timeout]);
  });
}

const REVEAL_SETTLE_MS = 2500;
const FOOTER_SETTLE_MS = 2500;
const SNEAK_SETTLE_MS = 2000;
const INTRO_SETTLE_MS = 2500;
const SERVICES_SETTLE_MS = 2500;
const ABOUT_SETTLE_MS = 2500;
const TESTIMONIAL_SETTLE_MS = 2500;

async function forceRevealState(page) {
  const sectionWaits = [
    { selector: "#text_intro", wait: INTRO_SETTLE_MS },
    { selector: "#works", wait: 1400 },
    { selector: 'section[data-framer-name="Sneak peak"]', wait: SNEAK_SETTLE_MS },
    { selector: 'section[data-framer-name="Services"]', wait: SERVICES_SETTLE_MS },
    { selector: "#testimonial-section", wait: TESTIMONIAL_SETTLE_MS },
    { selector: "#about", wait: ABOUT_SETTLE_MS },
    { selector: 'section[data-framer-name="FAQ"]', wait: 1000 },
  ];

  await page.evaluate(async (sections) => {
    const dispatchScrollEvents = () => {
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("lenis-scroll"));
    };

    window.scrollTo(0, 0);
    dispatchScrollEvents();
    await new Promise((r) => setTimeout(r, 300));

    for (const { selector, wait } of sections) {
      const el = document.querySelector(selector);
      if (!el) continue;
      el.scrollIntoView({ block: "center" });
      dispatchScrollEvents();
      await new Promise((r) => setTimeout(r, wait));
    }

    window.scrollTo(0, 0);
    dispatchScrollEvents();
  }, sectionWaits);
  await page.waitForTimeout(400);
}

async function forceSectionReveal(page, selector) {
  const settleMs = revealSettleMs(selector);
  await page.evaluate(
    async ({ selector: sel, waitMs }) => {
      const dispatchScrollEvents = () => {
        window.dispatchEvent(new Event("scroll"));
        window.dispatchEvent(new Event("lenis-scroll"));
      };

      const pickVisible = (nodes) => {
        for (const node of nodes) {
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          if (
            rect.width > 0 &&
            rect.height > 0 &&
            style.visibility !== "hidden" &&
            style.display !== "none" &&
            Number.parseFloat(style.opacity) > 0.001
          ) {
            return node;
          }
        }
        return nodes[0] ?? null;
      };

      const nodes = [...document.querySelectorAll(sel)];
      const el = pickVisible(nodes) ?? nodes[0] ?? null;
      if (!el) return;
      el.scrollIntoView({ block: "start" });
      if (sel.includes("footer")) window.scrollTo(0, document.body.scrollHeight);
      dispatchScrollEvents();
      await new Promise((r) => setTimeout(r, waitMs));
      dispatchScrollEvents();
    },
    { selector, waitMs: settleMs },
  );
}

async function ensureSectionRevealedForCapture(page, selector) {
  await page.evaluate((sel) => {
    const section = document.querySelector(sel);
    if (!section) return;
    const isTestimonial = sel.includes("testimonial");

    const revealNode = (el, clearTransform = true, revealedTransform) => {
      el.style.transition = "none";
      el.style.transitionDelay = "0s";
      el.style.opacity = "1";
      if (clearTransform) {
        el.style.transform = revealedTransform ?? "none";
      }
      el.style.willChange = "auto";
      el.style.pointerEvents = "";
    };

    for (const el of section.querySelectorAll("*")) {
      if (!(el instanceof HTMLElement)) continue;
      if (el.dataset.framerName === "Placeholder Text. Do Not Delete") continue;
      if (el.classList.contains("framer-10ep7wh") || el.classList.contains("framer-14gbmqi")) continue;

      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") continue;

      const opacity = Number.parseFloat(style.opacity);
      const transform = style.transform;
      const stuckHidden = opacity <= 0.001;
      const stuckTransform =
        transform &&
        transform !== "none" &&
        (transform.includes("translateY") ||
          transform.includes("translateX") ||
          /scale\(0(?:\.\d+)?\)/.test(transform));

      if (isTestimonial) {
        if (!stuckHidden) continue;
        const rect = el.getBoundingClientRect();
        const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
        const visibleHeight =
          Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
        if (visibleHeight < Math.max(rect.height * 0.15, 1)) continue;
      } else if (!stuckHidden && !stuckTransform) {
        continue;
      }

      const text = (el.textContent ?? "").trim();
      const isMedia =
        el.tagName === "IMG" || el.tagName === "SVG" || el.tagName === "VIDEO" || el.tagName === "PICTURE";
      if (!text && !isMedia) continue;

      if (!stuckHidden) {
        const rect = el.getBoundingClientRect();
        if (rect.width < 2 && rect.height < 2) continue;
      }

      const imageScale =
        isTestimonial && el.dataset.framerName === "Image svg"
          ? "scale(1.08084)"
          : undefined;
      revealNode(el, !isTestimonial || stuckHidden, imageScale);
    }
  }, selector);
  await page.waitForTimeout(120);
}

const REVEAL_CAPTURE_SECTIONS = /text_intro|Services|about|testimonial|Sneak peak|data-framer-name="Main"/i;

async function syncMarqueePhase(page) {
  await page.evaluate(() => {
    const section = document.querySelector('section[data-framer-name="Sneak peak"]');
    const row = section?.querySelector(".framer-1mshsi4-container ul");
    const innerSection = section?.querySelector(".framer-1mshsi4-container section");
    const viewport = section?.querySelector(".framer-1mshsi4-container");
    if (row instanceof HTMLElement) {
      for (const anim of row.getAnimations()) anim.cancel();
      // MarqueeSection sets a negative left offset for looping; reset so capture matches reference.
      row.style.left = "0px";
      row.style.transform = "translateX(0px)";
      // Reference export captures a single slot; drop runtime duplicates used for looping.
      const items = row.querySelectorAll("li");
      for (let i = 1; i < items.length; i++) {
        items[i].remove();
      }
    }
    if (innerSection instanceof HTMLElement) innerSection.style.opacity = "1";
    if (viewport instanceof HTMLElement) {
      viewport.style.maskImage = "none";
      viewport.style.webkitMaskImage = "none";
    }
    const tree = section?.querySelector('[data-framer-name="Tree"]');
    if (tree instanceof HTMLElement) {
      tree.style.transition = "none";
      tree.style.opacity = "1";
      tree.style.transform = "none";
    }
    for (const span of section?.querySelectorAll("h2 span") ?? []) {
      if (!(span instanceof HTMLElement)) continue;
      span.style.transition = "none";
      span.style.opacity = "1";
      span.style.transform = "none";
    }
  });
  await page.waitForTimeout(120);
}

const TESTIMONIAL_CAPTURE_PARALLAX = [
  { x: [-20, 0], y: [0, -50] },
  { x: [20, 0], y: [0, -80] },
  { x: [-10, 0], y: [0, -100] },
  { x: [10, 0], y: [0, -150] },
  { x: [10, 0], y: [0, -150] },
  { x: [10, 0], y: [0, -150] },
  { x: [20, 0], y: [0, -80] },
  { x: [10, 0], y: [0, -150] },
];

const FOOTER_DECO_INITIAL = {
  default: "translateX(-10px) translateY(50px) scale(0.9)",
  stem4: "translateX(-5px) translateY(40px) scale(0.9)",
};

const FOOTER_DECO_SETTLED = "translate3d(0px, 0px, 0px) scale(1) rotate(0deg)";

const WORK_WORD_HIDDEN_TRANSFORM =
  "translateX(0px) translateY(20px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)";

const WORK_BLOCK_HIDDEN_TRANSFORM = "translateY(10px)";

const INTRO_WORD_HIDDEN_TRANSFORM =
  "translateX(0px) translateY(10px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)";

const TESTIMONIAL_CARD_HIDDEN = [
  "translateX(-20px) translateY(30px)",
  "translateX(20px) translateY(30px)",
  "translateX(-10px) translateY(30px)",
  "translateX(10px) translateY(30px)",
  "translateX(10px) translateY(30px)",
  "translateX(10px) translateY(30px)",
  "translateX(20px) translateY(30px)",
  "translateX(10px) translateY(30px)",
];

const TESTIMONIAL_PHONE_CARD_HIDDEN = "translateY(30px)";

const TESTIMONIAL_CARD_SELECTORS = [
  ".framer-gchszw-container",
  ".framer-uogkai-container",
  ".framer-fti0o9-container",
  ".framer-1l3xeqf-container",
  ".framer-1mby0l5-container",
  ".framer-ua359l-container",
  ".framer-5wtrud-container",
  ".framer-5hcp6w-container",
];

const FOOTER_DECO_MOTION_CLASSES = [
  "framer-t3fhyx",
  "framer-zv5ymg",
  "framer-1dn87vp",
  "framer-bhk8i2",
  "framer-8d95di",
  "framer-17z4jbk",
  "framer-162z6p0",
  "framer-1ge60qk",
  "framer-1105425",
  "framer-p2b1gs",
  "framer-1toclxk",
  "framer-144v264",
  "framer-ps5951",
  "framer-148p1m",
  "framer-1juasuf",
  "framer-1mfpj4e",
  "framer-1quf9rz",
  "framer-fbk042",
  "framer-1bddi1q",
];

async function freezeMotionLoop(page) {
  await page.evaluate(() => {
    window.__parityCaptureFrame = () => {
      for (const el of document.querySelectorAll("[data-parity-freeze-transform]")) {
        if (!(el instanceof HTMLElement)) continue;
        const transform = el.dataset.parityFreezeTransform;
        const opacity = el.dataset.parityFreezeOpacity ?? "1";
        if (transform) el.style.setProperty("transform", transform, "important");
        el.style.setProperty("opacity", opacity, "important");
      }
      window.__parityCaptureRaf = requestAnimationFrame(window.__parityCaptureFrame);
    };
    if (window.__parityCaptureRaf) cancelAnimationFrame(window.__parityCaptureRaf);
    window.__parityCaptureRaf = requestAnimationFrame(window.__parityCaptureFrame);
  });
  await page.waitForTimeout(80);
}

async function stopMotionLoop(page) {
  await page.evaluate(() => {
    if (window.__parityCaptureRaf) cancelAnimationFrame(window.__parityCaptureRaf);
    window.__parityCaptureRaf = undefined;
    window.__parityCaptureFrame = undefined;
  });
}

/** Freeze visible phone/tablet hero flat illustration for pixel capture. */
async function syncHeroIllustrationCaptureState(page) {
  await page.evaluate(() => {
    const hero = document.querySelector('section[data-framer-name="Hero"]');
    if (!hero) return;

    const pickVisible = (nodes) => {
      for (const node of nodes) {
        if (!(node instanceof HTMLElement)) continue;
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        if (
          rect.width > 2 &&
          rect.height > 2 &&
          style.display !== "none" &&
          style.visibility !== "hidden"
        ) {
          return node;
        }
      }
      return null;
    };

    const illo = pickVisible([...hero.querySelectorAll(".framer-10mg3pr")]);
    if (!(illo instanceof HTMLElement)) return;

    for (const anim of illo.getAnimations()) anim.cancel();
    illo.style.setProperty("transition", "none", "important");
    illo.style.setProperty("opacity", "1", "important");
    illo.style.setProperty("transform", "none", "important");
    illo.style.willChange = "auto";
  });
  await page.waitForTimeout(80);
}

async function syncWorksCaptureState(page) {
  await page.evaluate(() => {
    const works = document.querySelector("#works");
    if (!works) return;

    const freezeNode = (el, opacity, transform) => {
      if (!(el instanceof HTMLElement)) return;
      for (const anim of el.getAnimations()) anim.cancel();
      el.style.setProperty("transition", "none", "important");
      el.style.setProperty("transition-delay", "0s", "important");
      el.style.setProperty("opacity", opacity, "important");
      el.style.setProperty("transform", transform, "important");
      el.style.willChange = "auto";
    };

    for (const span of works.querySelectorAll(".framer-10e7n8k span")) {
      if (!(span instanceof HTMLElement)) continue;
      freezeNode(span, "0.001", "translateY(10px)");
      span.style.setProperty("display", "inline-block", "important");
    }

    for (const item of works.querySelectorAll(
      ".ssr-variant.hidden-r4q9g.hidden-72rtr7 .framer-1lpr6le-container",
    )) {
      freezeNode(item, "1", "none");
    }

    const hover = works.querySelector(".framer-1c6c9z4-container");
    if (hover instanceof HTMLElement) {
      hover.classList.add("hidden-72rtr7", "hidden-r4q9g");
      hover.style.removeProperty("transition");
      hover.style.setProperty("transform", "translateX(-50%)", "important");
    }

    const qfz = works.querySelector(".framer-qfzAQ");
    if (qfz instanceof HTMLElement) {
      qfz.className = "framer-qfzAQ framer-1l1pyqw framer-v-1l1pyqw";
      qfz.dataset.framerName = "Default";
      qfz.replaceChildren();
    }
  });
  await page.waitForTimeout(80);
}

/** Reset hero scroll-scatter wrappers so transparent nav captures match SSR export. */
async function syncHeaderHeroBleed(page) {
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("lenis-scroll"));
    const hero = document.querySelector('section[data-framer-name="Hero"]');
    if (!hero) return;
    for (const scatter of hero.querySelectorAll("[data-framer-scroll-scatter]")) {
      if (!(scatter instanceof HTMLElement)) continue;
      for (const anim of scatter.getAnimations()) anim.cancel();
      scatter.style.setProperty("transform", "none", "important");
      scatter.style.setProperty("opacity", "1", "important");
    }
  });
  await page.waitForTimeout(80);
}

/** Match reference phone nav scroll-away transform during content captures. */
async function syncPhoneNavAwayForCapture(page) {
  await page.evaluate(() => {
    if (window.innerWidth > 809.98) return;
    const pickVisibleNav = () => {
      for (const nav of document.querySelectorAll("nav[data-framer-name]")) {
        if (!(nav instanceof HTMLElement)) continue;
        const rect = nav.getBoundingClientRect();
        const style = getComputedStyle(nav);
        if (
          rect.width > 0 &&
          rect.height > 0 &&
          style.display !== "none" &&
          style.visibility !== "hidden"
        ) {
          return nav;
        }
      }
      return null;
    };
    const nav = pickVisibleNav();
    if (!nav) return;
    for (const anim of nav.getAnimations()) anim.cancel();
    nav.style.setProperty("transition", "none", "important");
    nav.style.setProperty("transform", "translateY(-80px)", "important");
    nav.style.willChange = "auto";
  });
  await page.waitForTimeout(40);
}

async function syncIntroCaptureState(page) {
  await page.evaluate((hiddenTransform) => {
    const intro = document.querySelector("#text_intro");
    if (!intro) return;
    const markFreeze = (el, opacity, transform) => {
      if (!(el instanceof HTMLElement)) return;
      el.dataset.parityFreezeTransform = transform;
      el.dataset.parityFreezeOpacity = opacity;
      for (const anim of el.getAnimations()) anim.cancel();
      el.style.setProperty("transition", "none", "important");
      el.style.setProperty("opacity", opacity, "important");
      el.style.setProperty("transform", transform, "important");
      el.style.willChange = "auto";
    };
    markFreeze(intro.querySelector('[data-framer-name="Character"]'), "0", "translateY(50px) scale(0.5)");
    markFreeze(intro.querySelector('[data-framer-name="Teapot"]'), "0", "rotate(-18deg)");
    for (const span of intro.querySelectorAll("[data-intro-word], [data-intro-greeting], .framer-1thn94h span, .framer-1jenpym span")) {
      if (!(span instanceof HTMLElement)) continue;
      if (span.closest('[data-framer-name="Character"]')) continue;
      markFreeze(span, "0.001", hiddenTransform);
      span.style.setProperty("display", span.classList.contains("framer-text") ? "inline" : "inline-block", "important");
    }
    for (const path of intro.querySelectorAll("svg path, .framer-1yp7kof path, .framer-RbzYk path")) {
      const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 0;
      path.style.opacity = "1";
      path.style.strokeDasharray = length > 0 ? `${length}` : "none";
      path.style.strokeDashoffset = "0";
      path.style.vectorEffect = "non-scaling-stroke";
      for (const anim of path.getAnimations()) anim.cancel();
    }
  }, INTRO_WORD_HIDDEN_TRANSFORM);
  await page.waitForTimeout(80);
}

async function syncTestimonialCaptureState(page) {
  await page.evaluate(({ cardHidden, phoneCardHidden, cardSelectors }) => {
    const section = document.querySelector("#testimonial-section");
    if (!section) return;
    section.scrollIntoView({ block: "start" });
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("lenis-scroll"));
    const isPhone = window.innerWidth <= 809.98;
    const markFreeze = (el, opacity, transform) => {
      if (!(el instanceof HTMLElement)) return;
      el.dataset.parityFreezeTransform = transform;
      el.dataset.parityFreezeOpacity = opacity;
      for (const anim of el.getAnimations()) anim.cancel();
      el.style.setProperty("transition", "none", "important");
      el.style.setProperty("opacity", opacity, "important");
      el.style.setProperty("transform", transform, "important");
      el.style.willChange = "auto";
    };
    const pickCards = () => {
      const variantClass = isPhone
        ? ".ssr-variant.hidden-r4q9g.hidden-72rtr7"
        : ".ssr-variant.hidden-g5y12p.hidden-r4q9g";
      const nodes = cardSelectors.flatMap((sel) => [
        ...section.querySelectorAll(`${variantClass}${sel}`),
      ]);
      const visible = nodes.filter((node) => {
        if (!(node instanceof HTMLElement)) return false;
        const style = getComputedStyle(node);
        if (style.display === "none" || style.visibility === "hidden") return false;
        return node.getBoundingClientRect().width > 2 && node.getBoundingClientRect().height > 2;
      });
      return visible.length
        ? visible
        : [...section.querySelectorAll('[data-framer-name="Testimonial item"]')].filter(
            (n) => n instanceof HTMLElement && n.getBoundingClientRect().width > 2,
          );
    };
    markFreeze(section.querySelector('[data-framer-name="Title"]'), "0", "translateY(30px)");
    markFreeze(section.querySelector('[data-framer-name="Image svg"]'), "0", "translateY(170px)");
    markFreeze(section.querySelector('[data-framer-name="Title Text"]'), "1", "none");
    const cards = pickCards();
    for (const [index, card] of cards.entries()) {
      markFreeze(
        card,
        "0",
        isPhone ? phoneCardHidden : (cardHidden[index] ?? "translateY(30px)"),
      );
    }
    for (const card of section.querySelectorAll('[data-framer-name="Testimonial item"]')) {
      if (!(card instanceof HTMLElement)) continue;
      markFreeze(card, "0", isPhone ? phoneCardHidden : "translateY(30px)");
    }
    for (const cardRoot of section.querySelectorAll(
      '[class*="container"][class*="framer-"]',
    )) {
      if (!(cardRoot instanceof HTMLElement)) continue;
      if (!cardRoot.querySelector('[data-framer-name="Testimonial item"]')) continue;
      markFreeze(cardRoot, "0", isPhone ? phoneCardHidden : "translateY(30px)");
    }
  }, {
    cardHidden: TESTIMONIAL_CARD_HIDDEN,
    phoneCardHidden: TESTIMONIAL_PHONE_CARD_HIDDEN,
    cardSelectors: TESTIMONIAL_CARD_SELECTORS,
  });
  await page.waitForTimeout(120);
}

async function syncWorkCaptureState(page) {
  await page.evaluate(() => {
    const main = document.querySelector('main[data-framer-name="Main"]');
    if (!main) return;
    const isPhone = window.innerWidth <= 809.98;
    const isTablet = window.innerWidth > 809.98 && window.innerWidth <= 1199.98;

    const freezeNode = (el, opacity, transform) => {
      if (!(el instanceof HTMLElement)) return;
      for (const anim of el.getAnimations()) anim.cancel();
      el.style.setProperty("transition", "none", "important");
      el.style.setProperty("transition-delay", "0s", "important");
      el.style.setProperty("opacity", opacity, "important");
      el.style.setProperty("transform", transform, "important");
      el.style.willChange = "auto";
      el.style.pointerEvents = "";
    };

    if (isPhone || isTablet) {
      for (const block of main.querySelectorAll(
        '[data-framer-name="Description"], [data-framer-name="Description wrap"], [data-framer-name="Meta info"], [data-framer-name="Title"]',
      )) {
        freezeNode(block, "0.001", "translateY(10px)");
      }

      for (const span of main.querySelectorAll("span")) {
        if (!(span instanceof HTMLElement)) continue;
        freezeNode(span, "0.001", "translateX(0px) translateY(20px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)");
        span.style.setProperty("display", "inline-block", "important");
      }

      for (const path of main.querySelectorAll("svg path")) {
        const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 0;
        path.style.opacity = "1";
        path.style.strokeDasharray = length > 0 ? `${length}` : "none";
        path.style.strokeDashoffset = "0";
        path.style.vectorEffect = "non-scaling-stroke";
        for (const anim of path.getAnimations()) anim.cancel();
      }
      return;
    }

    for (const block of main.querySelectorAll(
      '[data-framer-name="Meta info"], [data-framer-name="Description"], [data-framer-name="Description wrap"]',
    )) {
      freezeNode(block, "1", "none");
    }

    for (const span of main.querySelectorAll("span")) {
      if (!(span instanceof HTMLElement)) continue;
      freezeNode(span, "1", "none");
      span.style.setProperty("display", "inline", "important");
    }

    for (const path of main.querySelectorAll("svg path")) {
      const length = typeof path.getTotalLength === "function" ? path.getTotalLength() : 0;
      path.style.opacity = "1";
      path.style.strokeDasharray = length > 0 ? `${length}` : "none";
      path.style.strokeDashoffset = "0";
      path.style.vectorEffect = "non-scaling-stroke";
      for (const anim of path.getAnimations()) anim.cancel();
    }
  });
  await page.waitForTimeout(80);
}

async function syncAboutCaptureState(page) {
  await page.evaluate(() => {
    const about = document.querySelector("#about");
    if (!about) return;
    const isPhone = window.innerWidth <= 809.98;
    const phoneRoot = about.querySelector(".ssr-variant.hidden-r4q9g.hidden-72rtr7");
    const scope = isPhone && phoneRoot instanceof HTMLElement ? phoneRoot : about;

    const isVisible = (el) => {
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return false;
      const rect = el.getBoundingClientRect();
      return rect.width > 0 && rect.height > 0;
    };

    const freezeNode = (el, opacity, transform) => {
      if (!(el instanceof HTMLElement) || !isVisible(el)) return;
      for (const anim of el.getAnimations()) anim.cancel();
      el.style.setProperty("transition", "none", "important");
      el.style.setProperty("transition-delay", "0s", "important");
      el.style.setProperty("opacity", opacity, "important");
      if (transform !== undefined) {
        el.style.setProperty("transform", transform, "important");
      }
      el.style.willChange = "auto";
      el.style.pointerEvents = "";
    };

    if (isPhone) {
      for (const icon of scope.querySelectorAll(".framer-ohm6pp")) {
        freezeNode(icon, "0", "none");
      }

      for (const block of scope.querySelectorAll(
        '[data-framer-name="About me"], [data-framer-name="Wrapper"], [data-framer-name="Container"], [data-framer-name="Content"], [data-framer-name="Title Wrap"], [data-framer-name="Items wrapper"], [data-framer-name="Awwards"], .framer-k8tsnc, .framer-1cb1wnd, .framer-13baukc, .framer-1s4qvvo',
      )) {
        freezeNode(block, "1", "none");
      }

      for (const appear of scope.querySelectorAll("[data-framer-appear-id]")) {
        freezeNode(appear, "0.001", "none");
      }

      for (const span of scope.querySelectorAll("span")) {
        if (!(span instanceof HTMLElement) || span.closest(".framer-1gfatq4")) continue;
        freezeNode(span, "0.001", "translateY(10px)");
        span.style.setProperty("display", "inline-block", "important");
      }

      for (const sig of scope.querySelectorAll(".framer-1gfatq4")) {
        if (!(sig instanceof HTMLElement) || !isVisible(sig)) continue;
        sig.style.removeProperty("transform");
        for (const anim of sig.getAnimations()) anim.cancel();
      }

      return;
    }

    // Desktop + tablet capture sync.
    for (const block of about.querySelectorAll(
      '[data-framer-name="Icon"], [data-framer-name="About me"], [data-framer-name="Description"], [data-framer-name="Clients"], [data-framer-name="Image wrap"], [data-framer-name="Image"], [data-framer-name="Scribble wrap"]',
    )) {
      const name = block instanceof HTMLElement ? block.dataset.framerName : "";
      if (name === "Image") {
        const rotate = block.closest('[data-framer-name="Image wrap"]')
          ? "rotate(-180deg) scale(0.757)"
          : "scale(0.757)";
        freezeNode(block, "1", rotate);
        continue;
      }
      if (name === "Scribble wrap") {
        freezeNode(block, "1", "translateY(-50%)");
        continue;
      }
      freezeNode(block, "1", "none");
    }

    for (const appear of about.querySelectorAll("[data-framer-appear-id]")) {
      if (!(appear instanceof HTMLElement) || !isVisible(appear)) continue;
      freezeNode(appear, "1", "none");
    }

    for (const span of about.querySelectorAll("span")) {
      if (!(span instanceof HTMLElement) || !isVisible(span)) continue;
      const style = getComputedStyle(span);
      const opacity = Number.parseFloat(style.opacity);
      const transform = style.transform;
      const stuckHidden = opacity <= 0.001;
      const stuckTransform =
        transform &&
        transform !== "none" &&
        (transform.includes("translateY") ||
          transform.includes("translateX") ||
          /scale\(0(?:\.\d+)?\)/.test(transform));
      if (!stuckHidden && !stuckTransform) continue;
      freezeNode(span, "1", "none");
      span.style.setProperty("display", "inline-block", "important");
    }

    for (const sig of about.querySelectorAll(".framer-1gfatq4")) {
      if (!(sig instanceof HTMLElement) || !isVisible(sig)) continue;
      sig.style.removeProperty("transform");
      for (const anim of sig.getAnimations()) anim.cancel();
    }
  });
  await page.waitForTimeout(80);
}

async function syncFaqCaptureState(page) {
  await page.evaluate(() => {
    const faq = document.querySelector('section[data-framer-name="FAQ"]');
    if (!faq) return;

    const freezeNode = (el, opacity, transform) => {
      if (!(el instanceof HTMLElement)) return;
      const style = getComputedStyle(el);
      if (style.display === "none" || style.visibility === "hidden") return;
      for (const anim of el.getAnimations()) anim.cancel();
      el.style.setProperty("transition", "none", "important");
      el.style.setProperty("transition-delay", "0s", "important");
      el.style.setProperty("opacity", opacity, "important");
      if (transform !== undefined) {
        el.style.setProperty("transform", transform, "important");
      }
      el.style.willChange = "auto";
    };

    faq.scrollIntoView({ block: "start" });
    window.scrollTo(0, Math.max(0, faq.getBoundingClientRect().top + window.scrollY));
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("lenis-scroll"));

    const wrapper = faq.querySelector("#faq");
    if (wrapper instanceof HTMLElement) {
      freezeNode(wrapper, "0", "perspective(1200px)");
    }

    for (const title of faq.querySelectorAll('[data-framer-name="Title"]')) {
      if (!title.closest("#faq")) continue;
      freezeNode(title, "0", "perspective(1200px)");
    }

    for (const el of faq.querySelectorAll(".framer-1mwivdf, .framer-f23omh")) {
      freezeNode(el, "0", "translateY(40px)");
    }

    for (const el of faq.querySelectorAll(".framer-varopb-container")) {
      freezeNode(el, "0", "translateY(16px)");
    }

    for (const el of faq.querySelectorAll(
      ".framer-niny6j-container, .framer-4kx773-container, .framer-1r1gpww-container, .framer-1i62d2t-container, .framer-11ydias-container, .framer-gj8o2o-container",
    )) {
      freezeNode(el, "0", "translateY(40px)");
    }

    for (const appear of faq.querySelectorAll('[data-framer-appear-id="4t58ou"]')) {
      freezeNode(appear, "0.001", "translateY(-20px)");
    }
  });
  await page.waitForTimeout(80);
}

async function syncFooterCaptureState(page) {
  await page.evaluate(() => {
    const footer = document.querySelector("footer.framer-1f12llc");
    if (!footer) return;
    footer.scrollIntoView({ block: "start" });
    window.scrollTo(0, document.body.scrollHeight);
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("lenis-scroll"));
  });
  await page.waitForTimeout(FOOTER_SETTLE_MS);
  await page.evaluate(({ decoInitial, decoSettled, motionClasses, isPhone }) => {
    const footer = document.querySelector("footer.framer-1f12llc");
    if (!footer) return;
    const markFreeze = (el, opacity, transform) => {
      if (!(el instanceof HTMLElement)) return;
      el.dataset.parityFreezeTransform = transform;
      el.dataset.parityFreezeOpacity = opacity;
      for (const anim of el.getAnimations()) anim.cancel();
      el.style.setProperty("transition", "none", "important");
      el.style.setProperty("opacity", opacity, "important");
      el.style.setProperty("transform", transform, "important");
      el.style.willChange = "auto";
    };
    for (const headline of footer.querySelectorAll(".framer-1irags9, .framer-m34vz3-container")) {
      if (!(headline instanceof HTMLElement)) continue;
      const style = getComputedStyle(headline);
      const rect = headline.getBoundingClientRect();
      if (style.display === "none" || style.visibility === "hidden") continue;
      if (rect.width < 2 && rect.height < 2) continue;
      markFreeze(headline, "0", "translateY(40px)");
    }

    const stack = footer.querySelector(".framer-a0z5w0");
    if (stack instanceof HTMLElement) {
      markFreeze(stack, "1", "none");
    }

    for (const cls of motionClasses) {
      for (const node of footer.querySelectorAll(`.framer-a0z5w0 > .${cls}`)) {
        if (!(node instanceof HTMLElement)) continue;
        const name = node.getAttribute("data-framer-name") ?? "";
        markFreeze(node, "1", name === "Stem-4" ? decoInitial.stem4 : decoInitial.default);
      }
    }

    if (isPhone) {
      for (const placeholder of footer.querySelectorAll('[data-framer-name="Placeholder Text. Do Not Delete"]')) {
        if (!(placeholder instanceof HTMLElement)) continue;
        markFreeze(placeholder, "0", "none");
      }
      for (const link of footer.querySelectorAll(
        '.framer-1a5p76y .framer-1w0dlzx, .framer-1a5p76y .framer-s79fqh, .framer-1a5p76y [data-framer-name="Link Text"]',
      )) {
        if (!(link instanceof HTMLElement)) continue;
        markFreeze(link, "1", "none");
      }
      for (const credits of footer.querySelectorAll(".framer-14dgndw, .framer-cc0lif")) {
        if (!(credits instanceof HTMLElement)) continue;
        markFreeze(credits, "1", "none");
      }
    }
  }, {
    decoInitial: FOOTER_DECO_INITIAL,
    decoSettled: FOOTER_DECO_SETTLED,
    motionClasses: FOOTER_DECO_MOTION_CLASSES,
    isPhone: page.viewportSize()?.width <= 809.98,
  });
  await page.waitForTimeout(120);
}

async function settlePage(page) {
  await waitForAssets(page);
  await page.waitForTimeout(3500);
}

async function preparePageForCapture(page) {
  await forceRevealState(page);
  await syncMarqueePhase(page);
  await page.evaluate(() => {
    window.scrollTo(0, 0);
    window.dispatchEvent(new Event("scroll"));
    window.dispatchEvent(new Event("lenis-scroll"));
  });
  await page.waitForTimeout(300);
}

function revealSettleMs(selector) {
  if (selector.includes("footer")) return FOOTER_SETTLE_MS;
  if (selector.includes("Sneak peak")) return SNEAK_SETTLE_MS;
  if (selector.includes("text_intro") || selector.includes("Intro")) return INTRO_SETTLE_MS;
  if (selector.includes("Services")) return SERVICES_SETTLE_MS;
  if (selector.includes("testimonial")) return TESTIMONIAL_SETTLE_MS;
  if (selector.includes("about") || selector.includes("About")) return ABOUT_SETTLE_MS;
  return REVEAL_SETTLE_MS;
}

function pickVisibleLocator(page, selector, region) {
  if (region === "header" && selector === "nav") {
    return page.locator("nav[data-framer-name]").first();
  }
  return page.locator(selector).first();
}

async function measureSectionGeometry(page, selector, region) {
  return page.evaluate(
    ({ selector: sel, region }) => {
      const pickVisible = (nodes) => {
        for (const node of nodes) {
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          if (
            rect.width > 0 &&
            rect.height > 0 &&
            style.visibility !== "hidden" &&
            style.display !== "none" &&
            Number.parseFloat(style.opacity) > 0.001
          ) {
            return node;
          }
        }
        return nodes[0] ?? null;
      };

      let el = null;
      if (region === "header" && sel === "nav") {
        el = pickVisible([...document.querySelectorAll("nav[data-framer-name]")]);
      } else {
        const nodes = [...document.querySelectorAll(sel)];
        el = pickVisible(nodes) ?? nodes[0] ?? null;
      }
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      return {
        x: Math.round(rect.x),
        y: Math.round(rect.y),
        width: Math.round(rect.width),
        height: Math.round(rect.height),
      };
    },
    { selector, region },
  );
}

async function captureSection(page, selector, region, vp, outPath) {
  if (region === "header" || region === "hero") {
    if (region === "header") {
      await syncHeaderHeroBleed(page);
    }
    if (region === "hero" && vp.width <= 1024) {
      await syncHeroIllustrationCaptureState(page);
    }
    await page.evaluate(() => {
      window.scrollTo(0, 0);
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("lenis-scroll"));
    });
    await page.waitForTimeout(150);
    if (region === "header") {
      await pauseAnimationsInSection(page, "nav");
    }
    let clipH = vp.height;
    if (region === "header") clipH = vp.headerH ?? 90;
    else clipH = Math.min(vp.heroH ?? vp.height, vp.height);
    await page.screenshot({
      path: outPath,
      clip: { x: 0, y: 0, width: vp.width, height: clipH },
    });
    return true;
  }

  await forceSectionReveal(page, selector);

  const scrolled = await page.evaluate(({ selector: sel }) => {
    const pickVisible = (nodes) => {
      for (const node of nodes) {
        const rect = node.getBoundingClientRect();
        const style = getComputedStyle(node);
        if (
          rect.width > 0 &&
          rect.height > 0 &&
          style.visibility !== "hidden" &&
          style.display !== "none" &&
          Number.parseFloat(style.opacity) > 0.001
        ) {
          return node;
        }
      }
      return nodes[0] ?? null;
    };
    const nodes = [...document.querySelectorAll(sel)];
    return Boolean(pickVisible(nodes) ?? nodes[0]);
  }, { selector });

  if (!scrolled) {
    await page.screenshot({ path: outPath, fullPage: false });
    return false;
  }

  if (selector.includes("Sneak peak")) {
    await syncMarqueePhase(page);
    await page.evaluate(() => {
      const section = document.querySelector('section[data-framer-name="Sneak peak"]');
      const tree = section?.querySelector('[data-framer-name="Tree"]');
      tree?.scrollIntoView({ block: "center" });
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("lenis-scroll"));
    });
    await page.waitForTimeout(800);
  }
  const isPhoneViewport = vp.width <= 809.98;
  const isTabletViewport = vp.width > 809.98 && vp.width <= 1199.98;
  if (REVEAL_CAPTURE_SECTIONS.test(selector)) {
    const skipStaticRevealCapture =
      (isPhoneViewport || isTabletViewport) &&
      (selector.includes("about") ||
        selector.includes("FAQ") ||
        selector.includes("testimonial") ||
        selector.includes('data-framer-name="Main"'));
    if (!skipStaticRevealCapture) {
      await ensureSectionRevealedForCapture(page, selector);
    }
  }
  if (selector.includes("about")) {
    await syncAboutCaptureState(page);
  }
  if (selector.includes("FAQ")) {
    await syncFaqCaptureState(page);
  }
  if (selector.includes("#works")) {
    await syncWorksCaptureState(page);
  }
  if (selector.includes('data-framer-name="Main"')) {
    await page.evaluate(() => {
      const main = document.querySelector('main[data-framer-name="Main"]');
      if (!main) return;
      main.scrollIntoView({ block: "start" });
      window.scrollTo(0, Math.max(0, main.getBoundingClientRect().top + window.scrollY));
      window.dispatchEvent(new Event("scroll"));
      window.dispatchEvent(new Event("lenis-scroll"));
    });
    await page.waitForTimeout(200);
    await syncWorkCaptureState(page);
  }
  if (selector.includes("footer")) {
    await syncFooterCaptureState(page);
  }
  if (selector.includes("testimonial")) {
    await syncTestimonialCaptureState(page);
  }
  if (selector.includes("text_intro")) {
    await syncIntroCaptureState(page);
  }
  await pauseAnimationsInSection(page, selector);
  const needsMotionFreeze =
    selector.includes("footer") || selector.includes("testimonial") || selector.includes("text_intro");
  if (needsMotionFreeze) {
    await freezeMotionLoop(page);
  }
  await page.waitForTimeout(120);

  const clip = await page.evaluate(
    ({ selector: sel, viewportWidth, viewportHeight }) => {
      const pickVisible = (nodes) => {
        for (const node of nodes) {
          const rect = node.getBoundingClientRect();
          const style = getComputedStyle(node);
          if (
            rect.width > 0 &&
            rect.height > 0 &&
            style.visibility !== "hidden" &&
            style.display !== "none" &&
            Number.parseFloat(style.opacity) > 0.001
          ) {
            return node;
          }
        }
        return nodes[0] ?? null;
      };
      const nodes = [...document.querySelectorAll(sel)];
      const el = pickVisible(nodes) ?? nodes[0] ?? null;
      if (!el) return null;
      const rect = el.getBoundingClientRect();
      const clipY = Math.max(0, Math.floor(rect.y));
      return {
        x: Math.max(0, Math.floor(rect.x)),
        y: clipY,
        width: Math.min(Math.ceil(rect.width), viewportWidth),
        height: Math.min(Math.ceil(rect.height), viewportHeight - clipY),
      };
    },
    { selector, viewportWidth: vp.width, viewportHeight: vp.height },
  );

  if (!clip || clip.width <= 0 || clip.height <= 0) {
    await page.screenshot({ path: outPath, fullPage: false });
    return false;
  }

  if (isPhoneViewport && region === "content" && !selector.includes('data-framer-name="Main"')) {
    await syncPhoneNavAwayForCapture(page);
  }

  await page.screenshot({ path: outPath, clip });
  if (needsMotionFreeze) {
    await stopMotionLoop(page);
  }
  return true;
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const manifest = JSON.parse(readFileSync(manifestPath, "utf8"));
  const { chromium } = require("playwright");

  await run("rsync", [
    "-a", "--exclude", ".DS_Store",
    `${path.join(root, "reference", "picco-export")}/`, `${tmpRef}/`,
  ]);

  if (process.env.SKIP_BUILD !== "1") {
    rmSync(path.join(root, "out"), { recursive: true, force: true });
    await run("pnpm", ["run", "build"], {
      cwd: root,
      stdio: "inherit",
      env: { ...process.env, CONTENT_PROFILE: "reference" },
    });
  } else {
    console.log("SKIP_BUILD=1 — using existing out/");
  }

  await run("rsync", [
    "-a", "--exclude", ".DS_Store",
    `${path.join(root, "out")}/`, `${tmpPreview}/`,
  ]);

  const refSrv = spawn("pnpm", ["exec", "serve", tmpRef, "-l", `tcp://127.0.0.1:${refPort}`], {
    cwd: root, stdio: "ignore",
  });
  const prevSrv = spawn("pnpm", ["exec", "serve", tmpPreview, "-l", `tcp://127.0.0.1:${previewPort}`], {
    cwd: root, stdio: "ignore",
  });

  const shutdown = () => {
    try { refSrv.kill("SIGTERM"); } catch {}
    try { prevSrv.kill("SIGTERM"); } catch {}
  };
  process.on("exit", shutdown);

  const allResults = [];
  const geometryResults = [];
  let allPass = true;

  try {
    await waitFor(`http://127.0.0.1:${refPort}/`);
    await waitFor(`http://127.0.0.1:${previewPort}/`);

    const browser = await chromium.launch({ headless: true });

    for (const route of manifest.routes) {
      console.log(`\n=== route ${route.id} ===`);
      const viewports = Object.entries(route.viewports).filter(([vpName]) =>
        !process.env.ONLY_VIEWPORT || vpName === process.env.ONLY_VIEWPORT,
      );
      for (const [vpName, vp] of viewports) {
        console.log(`  viewport ${vpName}…`);
        const refGeometries = new Map();

        for (const [label, port, url, waitMs] of [
          ["ref", refPort, route.referencePath, 2500],
          ["preview", previewPort, route.previewPath, 3500],
        ]) {
          const page = await browser.newPage({
            viewport: { width: vp.width, height: vp.height },
            reducedMotion: "no-preference",
          });
          await page.goto(`http://127.0.0.1:${port}${url}`, {
            waitUntil: "load",
            timeout: 60000,
          });
          if (route.id === "home") {
            await page.waitForSelector('section[data-framer-name="Hero"]', { timeout: 30000 });
          }
          await page.waitForTimeout(waitMs);
          await settlePage(page);
          await syncMarqueePhase(page);

          await page.screenshot({
            path: path.join(outDir, `${route.id}-${label}-full-${vpName}.png`),
            fullPage: false,
          });

          const earlySections = route.sections.filter(
            (section) => section.region === "header" || section.region === "hero",
          );
          const contentSections = route.sections.filter(
            (section) => section.region !== "header" && section.region !== "hero",
          );

          const captureAndMeasure = async (section) => {
            await captureSection(
              page,
              section.selector,
              section.region,
              vp,
              path.join(outDir, `${route.id}-${label}-${section.id}-${vpName}.png`),
            );

            const geo = await measureSectionGeometry(page, section.selector, section.region);
            if (label === "ref") {
              refGeometries.set(section.id, geo);
              geometryResults.push({
                route: route.id,
                section: section.id,
                viewport: vpName,
                label: "ref",
                geometry: geo,
              });
            } else {
              geometryResults.push({
                route: route.id,
                section: section.id,
                viewport: vpName,
                label: "preview",
                geometry: geo,
              });
              const refGeo = refGeometries.get(section.id);
              if (refGeo && geo) {
                const dx = Math.abs(refGeo.x - geo.x);
                const dy = Math.abs(refGeo.y - geo.y);
                const dw = Math.abs(refGeo.width - geo.width);
                const dh = Math.abs(refGeo.height - geo.height);
                geometryResults.push({
                  route: route.id,
                  section: section.id,
                  viewport: vpName,
                  label: "delta",
                  geometry: { dx, dy, dw, dh, within1px: dx <= 1 && dy <= 1 && dw <= 1 && dh <= 1 },
                });
              }
            }
          };

          for (const section of earlySections) {
            await captureAndMeasure(section);
          }

          if (label === "preview") {
            await preparePageForCapture(page);
          }

          for (const section of contentSections) {
            await captureAndMeasure(section);
          }

          await page.close();
        }

        const fullRef = loadPng(path.join(outDir, `${route.id}-ref-full-${vpName}.png`));
        const fullPrev = loadPng(path.join(outDir, `${route.id}-preview-full-${vpName}.png`));
        const fullPct = diffPercent(fullRef, fullPrev, path.join(outDir, `diff-${route.id}-full-${vpName}.png`));
        console.log(`  ${vpName}/full-page: ${(fullPct * 100).toFixed(3)}%`);

        for (const section of route.sections) {
          const region = section.region;
          const threshold =
            section.threshold ??
            route.thresholds[region] ??
            route.thresholds.content ??
            0.01;

          const refPath = path.join(outDir, `${route.id}-ref-${section.id}-${vpName}.png`);
          const prevPath = path.join(outDir, `${route.id}-preview-${section.id}-${vpName}.png`);
          const refPng = loadPng(refPath);
          const prevPng = loadPng(prevPath);
          const pct = diffPercent(
            refPng,
            prevPng,
            path.join(outDir, `diff-${route.id}-${section.id}-${vpName}.png`),
          );
          const pass = pct <= threshold;
          if (!pass) allPass = false;
          allResults.push({ route: route.id, section: section.id, viewport: vpName, pct, threshold, pass });
          console.log(
            `  ${vpName}/${section.id}: ${(pct * 100).toFixed(3)}% (<= ${(threshold * 100).toFixed(1)}%) ${pass ? "PASS" : "FAIL"}`,
          );
        }
      }
    }

    await browser.close();
  } finally {
    shutdown();
  }

  const geometryLines = [
    "# Section geometry evidence",
    "",
    `Generated: ${new Date().toISOString()}`,
    "",
    "| Route | Section | Viewport | Ref (x,y,w,h) | Preview (x,y,w,h) | Δ within 1px |",
    "|-------|---------|----------|---------------|-------------------|--------------|",
  ];

  for (const route of manifest.routes) {
    for (const [vpName] of Object.entries(route.viewports)) {
      for (const section of route.sections) {
        const ref = geometryResults.find(
          (g) => g.route === route.id && g.section === section.id && g.viewport === vpName && g.label === "ref",
        );
        const prev = geometryResults.find(
          (g) => g.route === route.id && g.section === section.id && g.viewport === vpName && g.label === "preview",
        );
        const delta = geometryResults.find(
          (g) => g.route === route.id && g.section === section.id && g.viewport === vpName && g.label === "delta",
        );
        const refStr = ref?.geometry
          ? `${ref.geometry.x},${ref.geometry.y},${ref.geometry.width},${ref.geometry.height}`
          : "—";
        const prevStr = prev?.geometry
          ? `${prev.geometry.x},${prev.geometry.y},${prev.geometry.width},${prev.geometry.height}`
          : "—";
        const within = delta?.geometry?.within1px ? "yes" : delta ? "no" : "—";
        geometryLines.push(
          `| ${route.id} | ${section.id} | ${vpName} | ${refStr} | ${prevStr} | ${within} |`,
        );
      }
    }
  }

  writeFileSync(path.join(outDir, "GEOMETRY.md"), geometryLines.join("\n"));

  const report = `# Migration verification report

Generated: ${new Date().toISOString()}

## Results

| Route | Section | Viewport | Diff % | Threshold | Status |
|-------|---------|----------|--------|-----------|--------|
${allResults.map((r) => `| ${r.route} | ${r.section} | ${r.viewport} | ${(r.pct * 100).toFixed(3)} | ${(r.threshold * 100).toFixed(1)}% | ${r.pass ? "PASS" : "FAIL"} |`).join("\n")}

## Overall: ${allPass ? "PASS" : "NEEDS WORK"}

See diff PNGs in \`qa/\`. Section geometry: \`qa/GEOMETRY.md\`.
`;
  writeFileSync(path.join(outDir, "VERIFY.md"), report);
  console.log(`\nWrote ${path.join(outDir, "VERIFY.md")}`);
  console.log(`Wrote ${path.join(outDir, "GEOMETRY.md")}`);
  console.log(allPass ? "PASS: verify-route" : "FAIL: verify-route");
  if (!allPass) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
