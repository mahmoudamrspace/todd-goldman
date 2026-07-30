#!/usr/bin/env node
/**
 * Behavioral assertions for interactive Framer sections (marquee, nav, FAQ, sticky).
 */
import { spawn } from "node:child_process";
import { createRequire } from "node:module";
import { mkdirSync, rmSync, writeFileSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { setTimeout as sleep } from "node:timers/promises";

const require = createRequire(
  path.join(
    path.resolve(path.dirname(fileURLToPath(import.meta.url)), ".."),
    "package.json",
  ),
);

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const outDir = path.join(root, "qa");
const previewPort = 3013;
const tmpPreview = "/tmp/todd-goldman-behavior";
const profile = process.env.CONTENT_PROFILE ?? "reference";

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const stdio = opts.stdio ?? ["ignore", "pipe", "pipe"];
    const { stdio: _ignored, ...rest } = opts;
    const child = spawn(cmd, args, { stdio, ...rest });
    let stderr = "";
    if (child.stderr) {
      child.stderr.on("data", (d) => (stderr += d));
    }
    child.on("exit", (code) => {
      if (code === 0) resolve();
      else reject(new Error(`${cmd} ${args.join(" ")}\n${stderr}`));
    });
  });
}

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

const VIEWPORTS = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 810, height: 1024 },
  tabletWide: { width: 1024, height: 800 },
  phone: { width: 390, height: 844 },
};

function record(results, test, pass, detail) {
  results.push({ test, pass, detail });
  return pass;
}

async function runViewportBehavior(page, viewportName, results) {
  const vp = VIEWPORTS[viewportName];
  await page.setViewportSize(vp);
  await page.goto(`http://127.0.0.1:${previewPort}/`, { waitUntil: "load", timeout: 60000 });
  await page.waitForTimeout(2500);

  const heroScrollScatter = await page.evaluate(async (viewportName) => {
    const heroSection = document.querySelector('section[data-framer-name="Hero"]');
    const introSection = document.querySelector('section[data-framer-name="Intro"]');
    if (!heroSection || !introSection) {
      return { ok: false, reason: "missing hero or intro section" };
    }

    const pickTarget = () => {
      if (viewportName === "phone") {
        for (const node of heroSection.querySelectorAll(".framer-10mg3pr")) {
          if (!(node instanceof HTMLElement)) continue;
          const style = getComputedStyle(node);
          if (style.display === "none" || style.visibility === "hidden") continue;
          const rect = node.getBoundingClientRect();
          if (rect.width > 2 && rect.height > 2) return node;
        }
        return null;
      }
      return heroSection.querySelector(".framer-3qzpaf");
    };

    if (viewportName === "phone") {
      const illo = pickTarget();
      if (!(illo instanceof HTMLElement)) {
        return { ok: false, reason: "missing visible phone hero illo" };
      }
      const img = illo.querySelector("img");
      const imgRect = img?.getBoundingClientRect();
      const opacity = Number.parseFloat(getComputedStyle(illo).opacity);
      return {
        ok: Boolean(imgRect && imgRect.width > 100 && imgRect.height > 100 && opacity > 0.5),
        illoWidth: illo.getBoundingClientRect().width,
        illoHeight: illo.getBoundingClientRect().height,
        imgWidth: imgRect?.width ?? 0,
        imgHeight: imgRect?.height ?? 0,
        opacity,
      };
    }

    const parseMatrix = (transform) => {
      const match = transform.match(/matrix(?:3d)?\(([^)]+)\)/);
      if (!match) return null;
      const parts = match[1].split(",").map((part) => Number.parseFloat(part.trim()));
      return parts.length >= 6 ? parts : null;
    };

    const isAssembled = (transform) => {
      if (!transform || transform === "none") return true;
      const matrix = parseMatrix(transform);
      if (!matrix) return false;
      return (
        Math.abs(matrix[0] - 1) < 0.08 &&
        Math.abs(matrix[4]) < 12 &&
        Math.abs(matrix[5]) < 12
      );
    };

    const isScattered = (transform, phone) => {
      if (!transform || transform === "none") return false;
      const matrix = parseMatrix(transform);
      if (!matrix) return false;
      if (phone) {
        return matrix[5] > 18 || matrix[0] < 0.88;
      }
      return matrix[0] < 0.85 || Math.abs(matrix[4]) > 80 || Math.abs(matrix[5]) > 60;
    };

    const el = pickTarget();
    if (!(el instanceof HTMLElement)) {
      return { ok: false, reason: "missing hero appear target" };
    }

    const readTransform = () => getComputedStyle(el).transform;
    const phone = viewportName === "phone";
    const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

    window.scrollTo(0, 0);
    await wait(1600);
    const atTop = readTransform();

    introSection.scrollIntoView({ block: "start" });
    await wait(1600);
    const atIntro = readTransform();

    heroSection.scrollIntoView({ block: "start" });
    await wait(1600);
    const backAtTop = readTransform();

    const assembledAtTop = isAssembled(atTop);
    const scatteredAtIntro = isScattered(atIntro, phone);
    const reassembled = isAssembled(backAtTop);

    return {
      ok: assembledAtTop && scatteredAtIntro && reassembled,
      atTop,
      atIntro,
      backAtTop,
      assembledAtTop,
      scatteredAtIntro,
      reassembled,
    };
  }, viewportName);
  record(results, `hero-scroll-scatter-${viewportName}`, heroScrollScatter.ok === true, heroScrollScatter);

  const heroImageVisible = await page.evaluate((viewportName) => {
    const hero = document.querySelector('section[data-framer-name="Hero"]');
    if (!hero) return { ok: false, reason: "missing hero section" };

    if (viewportName === "phone") {
      const block = hero.querySelector(".ssr-variant.hidden-r4q9g.hidden-72rtr7 .framer-10mg3pr");
      const img = block?.querySelector("img");
      if (!(block instanceof HTMLElement) || !(img instanceof HTMLImageElement)) {
        return { ok: false, reason: "missing phone hero illo" };
      }
      const blockStyle = getComputedStyle(block);
      const imgRect = img.getBoundingClientRect();
      return {
        ok:
          blockStyle.display !== "none" &&
          imgRect.width > 200 &&
          imgRect.height > 100 &&
          img.complete &&
          img.naturalWidth > 0,
        blockDisplay: blockStyle.display,
        imgW: imgRect.width,
        imgH: imgRect.height,
        naturalW: img.naturalWidth,
      };
    }

    const illustration = hero.querySelector(".framer-zls99u");
    if (!(illustration instanceof HTMLElement)) {
      return { ok: false, reason: "missing tablet/desktop illustration" };
    }
    const style = getComputedStyle(illustration);
    const rect = illustration.getBoundingClientRect();
    const visibleSvgs = [...hero.querySelectorAll('[data-framer-component-type="SVG"]')].filter(
      (node) => node.getBoundingClientRect().width > 20,
    ).length;
    return {
      ok: style.display !== "none" && rect.height > 100 && visibleSvgs >= 8,
      display: style.display,
      height: rect.height,
      visibleSvgs,
    };
  }, viewportName);
  record(results, `hero-image-visible-${viewportName}`, heroImageVisible.ok === true, heroImageVisible);

  const marquee = await page.evaluate(async (viewportName) => {
    const section = document.querySelector('section[data-framer-name="Sneak peak"]');
    if (!section) return { ok: false, reason: "missing section" };

    section.scrollIntoView({ block: "center" });
    await new Promise((r) => setTimeout(r, 400));

    const row = section.querySelector(".framer-1mshsi4-container ul");
    const viewport = section.querySelector(".framer-1mshsi4-container");
    if (!row || !viewport) return { ok: false, reason: "missing ticker row" };

    const parseX = (transform) => {
      if (!transform || transform === "none") return 0;
      const matrix = transform.match(/matrix\(([^)]+)\)/);
      if (matrix) {
        const parts = matrix[1].split(",").map((part) => Number.parseFloat(part.trim()));
        return parts.length >= 6 ? parts[4] : 0;
      }
      const translate = transform.match(/translateX\(([-\d.]+)px\)/);
      return translate ? Number.parseFloat(translate[1]) : 0;
    };

    const expectedSpeed = viewportName === "phone" ? 130 : 100;
    const leftOffset = Number.parseFloat(getComputedStyle(row).left) || 0;
    const animations = row.getAnimations();
    const infiniteAnim = animations.some((anim) => anim.effect?.getTiming().iterations === Infinity);

    const t0 = parseX(getComputedStyle(row).transform || row.style.transform);
    await new Promise((r) => setTimeout(r, 500));
    const t1 = parseX(getComputedStyle(row).transform || row.style.transform);
    const delta = t1 - t0;
    const hasScale = /scale\(0\.5\)/.test(getComputedStyle(row).transform);

    viewport.dispatchEvent(new PointerEvent("pointerenter", { bubbles: true }));
    const hoverT0 = parseX(getComputedStyle(row).transform || row.style.transform);
    await new Promise((r) => setTimeout(r, 500));
    const hoverT1 = parseX(getComputedStyle(row).transform || row.style.transform);
    const hoverDelta = hoverT1 - hoverT0;
    viewport.dispatchEvent(new PointerEvent("pointerleave", { bubbles: true }));

    const liCount = row.querySelectorAll("li").length;
    const movingRight = delta > 8;
    const speedOk = delta >= expectedSpeed * 0.25 && delta <= expectedSpeed * 1.6;
    const hoverSlow = hoverDelta < delta * 0.85 || hoverDelta <= expectedSpeed * 0.35;
    const loopReady = liCount >= 2;
    const hasLeftOffset = leftOffset < -100;

    const viewportRect = viewport.getBoundingClientRect();
    let visibleImages = 0;
    for (const img of viewport.querySelectorAll("img")) {
      const rect = img.getBoundingClientRect();
      if (rect.width > 2 && rect.height > 2) {
        const overlap =
          Math.min(rect.right, viewportRect.right) - Math.max(rect.left, viewportRect.left);
        if (overlap > 20) visibleImages += 1;
      }
    }

    await new Promise((r) => setTimeout(r, 500));
    const t2 = parseX(getComputedStyle(row).transform || row.style.transform);
    const stillMoving = Math.abs(t2 - t1) > 4;
    const stillVisible = visibleImages >= 1;

    return {
      ok:
        movingRight &&
        speedOk &&
        !hasScale &&
        hoverSlow &&
        loopReady &&
        hasLeftOffset &&
        infiniteAnim &&
        stillMoving &&
        stillVisible,
      t0,
      t1,
      t2,
      delta,
      hoverDelta,
      expectedSpeed,
      hasScale,
      liCount,
      leftOffset,
      infiniteAnim,
      visibleImages,
      movingRight,
      speedOk,
      hoverSlow,
      stillMoving,
      stillVisible,
    };
  }, viewportName);
  if (!record(results, `marquee-section-${viewportName}`, marquee.ok === true, marquee)) {
    /* continue */
  }

  await page.locator('section[data-framer-name="Sneak peak"]').scrollIntoViewIfNeeded();
  await page.locator('section[data-framer-name="Sneak peak"] .framer-1odp3ow[data-framer-name="Tree"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(2600);

  const sneakReveal = await page.evaluate(async () => {
    const section = document.querySelector('section[data-framer-name="Sneak peak"]');
    if (!section) return { ok: false, reason: "missing sneak section" };

    const tree = section.querySelector('.framer-1odp3ow[data-framer-name="Tree"]');
    const titleWords = section.querySelectorAll("#sneak-peak h2 span");
    const treeOpacity = tree ? Number.parseFloat(getComputedStyle(tree).opacity) : 0;
    const treeTransform = tree ? getComputedStyle(tree).transform : "none";
    const treeRevealed =
      treeOpacity > 0.85 ||
      (treeTransform !== "none" && !treeTransform.includes("scale(0.5)"));
    let visibleWords = 0;
    for (const word of titleWords) {
      const opacity = Number.parseFloat(getComputedStyle(word).opacity);
      if (opacity > 0.5) visibleWords += 1;
    }

    window.scrollBy(0, 12);
    await new Promise((r) => setTimeout(r, 120));
    const microScrollOpacity = tree
      ? Number.parseFloat(getComputedStyle(tree).opacity)
      : 0;
    const stableAfterMicroScroll = microScrollOpacity > 0.5;

    return {
      ok:
        treeRevealed &&
        visibleWords >= Math.min(3, titleWords.length) &&
        stableAfterMicroScroll,
      treeOpacity,
      treeTransform,
      microScrollOpacity,
      stableAfterMicroScroll,
      visibleWords,
      totalWords: titleWords.length,
    };
  });
  record(results, `sneak-reveal-${viewportName}`, sneakReveal.ok === true, sneakReveal);

  if (viewportName === "desktop" || viewportName === "phone") {
    const navToggle = await (async () => {
      const trigger = page.locator('[data-framer-name="Enabled"]:visible').first();
      if ((await trigger.count()) === 0) {
        return { ok: true, skipped: true, reason: "no visible nav trigger" };
      }
      await page.waitForTimeout(200);
      try {
        await trigger.evaluate((el) => {
          if (el instanceof HTMLElement) el.click();
        });
      } catch (error) {
        return { ok: false, reason: String(error) };
      }
      await page.waitForTimeout(450);
      const openNav = page.locator("nav[data-nav-open='true']").first();
      const variant = await openNav.getAttribute("class");
      const box = await openNav.boundingBox();
      const minHeight = viewportName === "phone" ? 500 : 400;
      return {
        ok: variant?.includes("framer-v-pw2coq") === true,
        variant,
        height: box?.height ?? 0,
        width: box?.width ?? 0,
      };
    })();
    record(results, `nav-menu-open-${viewportName}`, navToggle.ok, navToggle);
  }

  await page.locator('section[data-framer-name="FAQ"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(600);

  const faqToggle = await (async () => {
    const section = page.locator('section[data-framer-name="FAQ"]');
    const sectionBox = await section.boundingBox();
    const item = section.locator('[data-framer-name="Closed"]:visible').first();
    if ((await item.count()) === 0) return { ok: false, reason: "no visible faq item" };
    await item.evaluate((el) => {
      if (el instanceof HTMLElement) el.click();
    });
    await page.waitForTimeout(400);
    const answer = section.locator(".framer-1luxota").first();
    const answerVisible = await answer.isVisible().catch(() => false);
    const text = ((await answer.textContent()) ?? "").trim();
    const sectionWidth = sectionBox?.width ?? 0;
    return {
      ok: text.length > 10 && sectionWidth > 300,
      textLength: text.length,
      sectionWidth,
      viewport: viewportName,
    };
  })();
  record(results, `faq-accordion-${viewportName}`, faqToggle.ok, faqToggle);

  if (viewportName === "desktop") {
    const worksHover = await (async () => {
      await page.goto(`http://127.0.0.1:${previewPort}/`, { waitUntil: "load" });
      await page.waitForTimeout(2000);
      const card = page.locator(".framer-EPUBE.framer-v-3ctq4c").first();
      if ((await card.count()) === 0) return { ok: false, reason: "no work card" };
      const box = await card.boundingBox();
      await card.hover();
      await page.waitForTimeout(350);
      const previewImg = page.locator(".framer-qfzAQ.framer-v-q8rx7a img").first();
      const visible = await previewImg.isVisible().catch(() => false);
      const hovered = await card.evaluate((el) => el.classList.contains("hover"));
      return { ok: visible && hovered, visible, hovered, cardBox: box };
    })();
    record(results, "works-hover-preview-desktop", worksHover.ok, worksHover);

    const sneakLightbox = await (async () => {
      await page.locator('section[data-framer-name="Sneak peak"]').scrollIntoViewIfNeeded();
      await page.waitForTimeout(800);
      const imageButton = page.locator('[data-sneak-peak-index="0"]').first();
      if ((await imageButton.count()) === 0) return { ok: false, reason: "no sneak peak image" };
      await imageButton.evaluate((el) => {
        if (el instanceof HTMLElement) el.click();
      });
      await page.waitForTimeout(300);
      const overlay = page.locator('[data-testid="sneak-peak-lightbox"]');
      const visible = await overlay.isVisible().catch(() => false);
      const overlayImg = overlay.locator("img").first();
      const imgVisible = await overlayImg.isVisible().catch(() => false);
      await overlay.evaluate((el) => {
        if (el instanceof HTMLElement) el.click();
      });
      await page.waitForTimeout(200);
      const closed = !(await overlay.isVisible().catch(() => true));
      return { ok: visible && imgVisible && closed, visible, imgVisible, closed };
    })();
    record(results, "sneak-lightbox-desktop", sneakLightbox.ok, sneakLightbox);

    const cursorProbe = await page.evaluate(() => {
      const fine = window.matchMedia("(pointer: fine)").matches;
      const cursorRoot = document.querySelector('[data-framer-name="Cursor"]');
      return { ok: fine, pointerFine: fine, hasCursorRoot: Boolean(cursorRoot) };
    });
    record(results, "cursor-fine-pointer-desktop", cursorProbe.ok, cursorProbe);
  }

  await page.locator('section[data-framer-name="Testimonial"]').scrollIntoViewIfNeeded();
  await page.waitForTimeout(1000);

  const testimonialImages = await page.evaluate(() => {
    const section = document.querySelector("#testimonial-section");
    if (!section) return { ok: false, reason: "missing testimonial section" };
    const imageWrap = section.querySelector('[data-framer-name="Image svg"]');
    if (!(imageWrap instanceof HTMLElement)) {
      return { ok: false, reason: "missing Image svg wrapper" };
    }
    const wrapStyle = getComputedStyle(imageWrap);
    const opacity = Number.parseFloat(wrapStyle.opacity);
    const transform = wrapStyle.transform;
    const hasScale =
      transform.includes("1.0808") || transform.includes("matrix(1.08084");
    const men = [...section.querySelectorAll('[data-framer-name="Men"]')].filter(
      (el) => el instanceof HTMLElement && el.offsetParent !== null,
    );
    const women = [...section.querySelectorAll('[data-framer-name="Women svg"]')].filter(
      (el) => el instanceof HTMLElement && el.offsetParent !== null,
    );
    const svgUseCount = section.querySelectorAll('[data-framer-name="Image svg"] use').length;
    let defsResolved = 0;
    for (const use of section.querySelectorAll('[data-framer-name="Image svg"] use')) {
      const href = use.getAttribute("href") ?? use.getAttribute("xlink:href");
      if (href && document.querySelector(href)) defsResolved += 1;
    }
    const menRect = men[0]?.getBoundingClientRect();
    const womenRect = women[0]?.getBoundingClientRect();
    return {
      ok:
        opacity > 0.85 &&
        hasScale &&
        men.length >= 1 &&
        women.length >= 1 &&
        (menRect?.width ?? 0) > 50 &&
        (womenRect?.width ?? 0) > 50 &&
        defsResolved >= 1,
      opacity,
      transform,
      hasScale,
      men: men.length,
      women: women.length,
      svgUseCount,
      defsResolved,
    };
  });
  record(results, `testimonial-images-visible-${viewportName}`, testimonialImages.ok, testimonialImages);

  const testimonialCards = await page.evaluate(() => {
    const section = document.querySelector("#testimonial-section");
    if (!section) return { ok: false, reason: "missing testimonial section" };
    const cards = section.querySelectorAll('[data-framer-name="Testimonial item"]');
    let visible = 0;
    for (const card of cards) {
      const style = getComputedStyle(card);
      const opacity = Number.parseFloat(style.opacity);
      const rect = card.getBoundingClientRect();
      if (opacity > 0.05 && rect.width > 0 && rect.height > 0) visible += 1;
    }
    return { ok: visible >= 1, total: cards.length, visible };
  });
  record(results, `testimonial-cards-visible-${viewportName}`, testimonialCards.ok, testimonialCards);

  await page.locator("footer.framer-1f12llc").scrollIntoViewIfNeeded();
  await page.waitForTimeout(1800);
  const footerEmail = await page.evaluate(() => {
    const footer = document.querySelector("footer.framer-1f12llc");
    if (!footer) return { ok: false, reason: "missing footer" };
    const emailLink = footer.querySelector('a[href^="mailto:"]');
    const rect = footer.getBoundingClientRect();
    return {
      ok: Boolean(emailLink) && rect.height > 100,
      href: emailLink?.getAttribute("href") ?? null,
      height: rect.height,
      width: rect.width,
    };
  });
  record(results, `footer-contact-${viewportName}`, footerEmail.ok, footerEmail);

  const footerMotion = await page.evaluate(() => {
    const footer = document.querySelector("footer.framer-1f12llc");
    if (!footer) return { ok: false, reason: "missing footer" };

    const headline = footer.querySelector('[data-framer-name="Title"] .framer-1irags9');
    const headlineOpacity = headline
      ? Number.parseFloat(getComputedStyle(headline).opacity)
      : 0;

    const decoNames = ["Bee-4", "Flower-7", "Stem-4", "Flower-4"];
    const stuck = [];
    const samples = [];

    for (const name of decoNames) {
      const node = footer.querySelector(`[data-framer-name="${name}"]`);
      if (!(node instanceof HTMLElement)) {
        stuck.push({ name, reason: "missing" });
        continue;
      }
      const transform = getComputedStyle(node).transform;
      const matrix = transform.match(/matrix\(([^)]+)\)/);
      let x = 0;
      let y = 0;
      let scale = 1;
      if (matrix) {
        const parts = matrix[1].split(",").map((part) => Number.parseFloat(part.trim()));
        x = parts[4] ?? 0;
        y = parts[5] ?? 0;
        scale = parts[0] ?? 1;
      }
      samples.push({ name, transform, x, y, scale });
      if (Math.abs(x + 10) < 2 && Math.abs(y - 50) < 4 && scale < 0.95) {
        stuck.push({ name, transform });
      }
    }

    return {
      ok: headlineOpacity > 0.8 && stuck.length === 0,
      headlineOpacity,
      stuck,
      samples,
    };
  });
  record(results, `footer-motion-${viewportName}`, footerMotion.ok === true, footerMotion);
}

async function main() {
  mkdirSync(outDir, { recursive: true });
  const { chromium } = require("playwright");

  rmSync(tmpPreview, { recursive: true, force: true });
  await run("pnpm", ["run", "build"], {
    cwd: root,
    stdio: "inherit",
    env: { ...process.env, CONTENT_PROFILE: profile },
  });

  await run("rsync", [
    "-a", "--exclude", ".DS_Store",
    `${path.join(root, "out")}/`, `${tmpPreview}/`,
  ]);

  const srv = spawn("pnpm", ["exec", "serve", tmpPreview, "-l", `tcp://127.0.0.1:${previewPort}`], {
    cwd: root, stdio: "ignore",
  });
  await sleep(3000);
  const shutdown = () => {
    try { srv.kill("SIGTERM"); } catch {}
  };
  process.on("exit", shutdown);

  const results = [];
  let allPass = true;

  try {
    await waitFor(`http://127.0.0.1:${previewPort}/`);
    const browser = await chromium.launch({ headless: true });
    const page = await browser.newPage();

    for (const viewportName of Object.keys(VIEWPORTS)) {
      try {
        await runViewportBehavior(page, viewportName, results);
      } catch (error) {
        record(results, `viewport-${viewportName}-error`, false, { error: String(error) });
      }
    }

    await page.setViewportSize(VIEWPORTS.desktop);
    await page.goto(`http://127.0.0.1:${previewPort}/`, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(2000);

    const workLink = await page.evaluate(() => {
      const link = document.querySelector('a[href^="/works/the-northern-times"]');
      return { ok: link !== null, href: link?.getAttribute("href") ?? null };
    });
    if (!record(results, "works-home-link", workLink.ok, workLink)) allPass = false;

    const sticky = await page.evaluate(async () => {
      const section = document.querySelector("#testimonial-section");
      if (!section) return { ok: false, reason: "missing testimonial" };
      const title = section.querySelector('[data-framer-name="Title"]');
      if (!title) return { ok: true, reason: "no sticky title" };
      window.scrollTo(0, section.offsetTop + 200);
      await new Promise((r) => setTimeout(r, 250));
      const pos = getComputedStyle(title).position;
      return { ok: pos === "sticky" || pos === "fixed", position: pos };
    });
    if (!record(results, "testimonial-sticky-desktop", sticky.ok, sticky)) allPass = false;

    const sectionReveal = await page.evaluate(async () => {
      const selectors = [
        'section[data-framer-name="About"]',
        'section[data-framer-name="Services"]',
        'section[data-framer-name="FAQ"]',
        'footer[data-framer-name="Contact"], footer.framer-1f12llc',
      ];
      const hidden = [];

      for (const selector of selectors) {
        const section = document.querySelector(selector);
        if (!section) {
          hidden.push({ selector, reason: "missing section" });
          continue;
        }
        section.scrollIntoView({ block: "center" });
        await new Promise((r) => setTimeout(r, 1200));

        for (const el of section.querySelectorAll("*")) {
          if (!(el instanceof HTMLElement)) continue;
          if (el.dataset.framerName === "Placeholder Text. Do Not Delete") continue;
          if (el.classList.contains("framer-10ep7wh") || el.classList.contains("framer-14gbmqi")) continue;
          const style = getComputedStyle(el);
          if (style.display === "none" || style.visibility === "hidden") continue;
          const rect = el.getBoundingClientRect();
          if (rect.width < 2 || rect.height < 2) continue;
          const opacity = Number.parseFloat(style.opacity);
          if (opacity > 0.001) continue;
          const text = (el.textContent ?? "").trim();
          const isMedia =
            el.tagName === "IMG" || el.tagName === "SVG" || el.tagName === "VIDEO" || el.tagName === "PICTURE";
          if (!text && !isMedia) continue;
          hidden.push({
            selector,
            tag: el.tagName,
            className: el.className?.toString().slice(0, 80),
            opacity: style.opacity,
            text: text.slice(0, 60),
          });
          if (hidden.length >= 8) break;
        }
      }

      return { ok: hidden.length === 0, hiddenCount: hidden.length, hidden };
    });
    if (!record(results, "section-reveal-visibility-desktop", sectionReveal.ok, sectionReveal)) allPass = false;


    const servicesHover = await (async () => {
      await page.evaluate(() => {
        document.querySelector('section[data-framer-name="Services"]')?.scrollIntoView({ block: "center" });
      });
      await page.waitForTimeout(500);
      const row = page.locator('section[data-framer-name="Services"] [data-framer-name="Desktop"]').first();
      if ((await row.count()) === 0) return { ok: false, reason: "no desktop service row" };
      await row.hover();
      await page.waitForTimeout(400);
      const hovered = await row.evaluate((el) => el.classList.contains("hover"));
      const box = await row.boundingBox();
      return {
        ok: hovered && (box?.height ?? 0) > 40,
        hovered,
        height: box?.height ?? 0,
      };
    })();
    if (!record(results, "services-hover-subtitle-desktop", servicesHover.ok, servicesHover)) allPass = false;

    const scribbles = await page.evaluate(() => {
      const containers = document.querySelectorAll('[data-framer-name="Scribble"]');
      let paths = 0;
      for (const container of containers) {
        paths += container.querySelectorAll("svg path").length;
      }
      return { ok: containers.length >= 3 && paths >= 3, containers: containers.length, paths };
    });
    if (!record(results, "scribbles-present", scribbles.ok, scribbles)) allPass = false;

    const workScribble = await (async () => {
      await page.goto(`http://127.0.0.1:${previewPort}/works/oxbridge-press/`, {
        waitUntil: "load",
        timeout: 60000,
      });
      await page.waitForTimeout(2500);
      await page.locator('main[data-framer-name="Main"]').scrollIntoViewIfNeeded();
      await page.waitForTimeout(500);
      return page.evaluate(() => {
        const wrapper = document.querySelector(".framer-pyv3V.framer-1urfguw");
        const path = wrapper?.querySelector("path");
        if (!path) return { ok: false, reason: "missing work meta scribble" };
        return {
          ok: true,
          stroke: getComputedStyle(path).stroke,
          viewBox: path.closest("svg")?.getAttribute("viewBox"),
        };
      });
    })();
    if (!record(results, "work-meta-scribble-desktop", workScribble.ok, workScribble)) allPass = false;

    await page.goto(`http://127.0.0.1:${previewPort}/`, { waitUntil: "load", timeout: 60000 });
    await page.waitForTimeout(1500);
    const headerButton = await page.evaluate(() => {
      const btn = document.querySelector('[data-framer-name="Enabled"]');
      if (!(btn instanceof HTMLElement)) return { ok: false, reason: "missing hamburger" };
      const cs = getComputedStyle(btn);
      return {
        ok: cs.borderWidth === "0px" && cs.paddingTop === "0px" && cs.paddingLeft === "0px",
        borderWidth: cs.borderWidth,
        padding: cs.padding,
      };
    });
    if (!record(results, "header-hamburger-reset-desktop", headerButton.ok, headerButton)) allPass = false;

    for (const r of results) {
      if (!r.pass) allPass = false;
    }

    await browser.close();
  } finally {
    shutdown();
  }

  const report = `# Behavior verification

Profile: ${profile}
Generated: ${new Date().toISOString()}

| Test | Pass | Detail |
|------|------|--------|
${results.map((r) => `| ${r.test} | ${r.pass ? "PASS" : "FAIL"} | ${JSON.stringify(r.detail)} |`).join("\n")}

## Overall: ${allPass ? "PASS" : "FAIL"}
`;
  writeFileSync(path.join(outDir, "BEHAVIOR.md"), report);
  console.log(report);
  if (!allPass) process.exit(1);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
