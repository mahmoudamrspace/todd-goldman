#!/usr/bin/env node
/**
 * Dev-server reveal probe: scroll to FAQ and dump hidden nodes + transform offsets.
 * Usage: pnpm dev (port 3010) then node scripts/diagnose-reveal.mjs [--url http://localhost:3010]
 */
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const require = createRequire(
  path.join(path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."), "package.json"),
);

const baseUrl = process.argv.includes("--url")
  ? process.argv[process.argv.indexOf("--url") + 1]
  : "http://localhost:3010";

const VIEWPORT = { width: 1024, height: 800 };

/** Max FAQ section height before treating layout as collapsed/wrapped. */
const MAX_FAQ_HEIGHT = 2000;

async function waitFor(url, attempts = 120) {
  for (let i = 0; i < attempts; i++) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch {}
    await sleep(300);
  }
  throw new Error(`Server not ready: ${url}`);
}

async function probeFaq(page) {
  await page.goto(`${baseUrl}/`, { waitUntil: "networkidle", timeout: 90000 });
  await page.waitForTimeout(2000);

  await page.locator('section[data-framer-name="FAQ"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2500);

  return page.evaluate((viewportWidth) => {
    const faq = document.querySelector('section[data-framer-name="FAQ"]');
    const targets = [
      ".framer-1mwivdf",
      ".framer-f23omh",
      ".framer-varopb-container",
      "#faq",
    ];
    const transforms = {};
    for (const sel of targets) {
      const el = faq?.querySelector(sel) ?? document.querySelector(sel);
      if (!el) {
        transforms[sel] = { found: false };
        continue;
      }
      const style = getComputedStyle(el);
      transforms[sel] = {
        found: true,
        opacity: style.opacity,
        transform: style.transform,
        display: style.display,
      };
    }

    const hidden = [];
    const section = faq;
    if (section) {
      for (const el of section.querySelectorAll("*")) {
        if (!(el instanceof HTMLElement)) continue;
        const style = getComputedStyle(el);
        if (style.display === "none" || style.visibility === "hidden") continue;
        const rect = el.getBoundingClientRect();
        if (rect.width < 2 && rect.height < 2) continue;
        const opacity = Number.parseFloat(style.opacity);
        if (opacity > 0.05) continue;
        const text = (el.textContent ?? "").trim();
        const isMedia =
          el.tagName === "IMG" ||
          el.tagName === "SVG" ||
          el.tagName === "VIDEO" ||
          el.tagName === "PICTURE";
        if (!text && !isMedia) continue;
        hidden.push({
          tag: el.tagName,
          className: el.className?.toString().slice(0, 80),
          name: el.getAttribute("data-framer-name") ?? "-",
          opacity: style.opacity,
          transform: style.transform,
          text: text.slice(0, 60),
        });
        if (hidden.length >= 20) break;
      }
    }

    const wrapper = document.querySelector("#faq");
    const wrapperOpacity = wrapper ? getComputedStyle(wrapper).opacity : null;

    const sectionRect = faq?.getBoundingClientRect();
    const titleRect = document.querySelector(".framer-w1sxyq")?.getBoundingClientRect();
    const gridRects = [...document.querySelectorAll(".framer-varopb-container")].map((el) =>
      el.getBoundingClientRect(),
    );
    const visibleGrid = gridRects.reduce(
      (best, rect) => (rect.height > best.height ? rect : best),
      { width: 0, height: 0 },
    );

    return {
      url: location.href,
      viewportWidth,
      wrapperOpacity,
      transforms,
      hiddenCount: hidden.length,
      hidden,
      geometry: {
        sectionWidth: sectionRect?.width ?? 0,
        sectionHeight: sectionRect?.height ?? 0,
        titleWidth: titleRect?.width ?? 0,
        titleHeight: titleRect?.height ?? 0,
        gridWidth: visibleGrid.width,
        gridHeight: visibleGrid.height,
      },
    };
  }, VIEWPORT.width);
}

async function main() {
  const { chromium } = require("playwright");
  await waitFor(`${baseUrl}/`);

  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage({ viewport: VIEWPORT });

  const result = await probeFaq(page);
  await browser.close();

  console.log(JSON.stringify(result, null, 2));

  const { geometry } = result;
  const minSectionWidth = VIEWPORT.width * 0.9;
  const geometryFail =
    geometry.sectionWidth < minSectionWidth ||
    geometry.sectionHeight > MAX_FAQ_HEIGHT ||
    geometry.titleWidth < 200 ||
    geometry.gridHeight < 50;

  const revealFail =
    result.hiddenCount > 0 ||
    result.wrapperOpacity === "0" ||
    Number.parseFloat(result.wrapperOpacity ?? "1") <= 0.05;

  if (geometryFail) {
    console.error("\nFAIL: FAQ layout collapsed or abnormally tall");
    console.error(
      `  section: ${geometry.sectionWidth.toFixed(0)}×${geometry.sectionHeight.toFixed(0)}px (expected width ≥${minSectionWidth.toFixed(0)}, height ≤${MAX_FAQ_HEIGHT})`,
    );
    console.error(
      `  title: ${geometry.titleWidth.toFixed(0)}×${geometry.titleHeight.toFixed(0)}px, grid height: ${geometry.gridHeight.toFixed(0)}px`,
    );
    process.exit(1);
  }

  if (revealFail) {
    console.error("\nFAIL: FAQ content still hidden or wrapper at opacity 0");
    process.exit(1);
  }

  console.log("\nPASS: FAQ content visible and layout healthy after scroll");
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
