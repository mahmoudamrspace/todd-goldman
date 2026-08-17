import { expect, test } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3010";

for (const width of [1024, 1440]) {
  test.describe(`art scroll-motion audit ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test("ties archive card parallax and clipping to scroll progress", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${BASE_URL}/art/`);
      await page.waitForLoadState("networkidle");

      const card = page.locator(".todd-art-card[data-scroll-motion='active']").first();
      await expect(card).toBeVisible();
      const before = await card.evaluate((node) => {
        const style = window.getComputedStyle(node);
        return { transform: style.transform, clipPath: style.clipPath };
      });

      await card.evaluate((node) => {
        node.scrollIntoView({ block: "center", behavior: "instant" });
      });
      await page.waitForTimeout(900);

      const after = await card.evaluate((node) => {
        const style = window.getComputedStyle(node);
        return { transform: style.transform, clipPath: style.clipPath };
      });
      expect(after.transform).not.toBe(before.transform);
      expect(after.clipPath).not.toBe(before.clipPath);
    });

    test("ties homepage preview card parallax and clipping to scroll progress", async ({
      page,
    }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${BASE_URL}/#works`);
      await page.waitForLoadState("networkidle");

      const card = page.locator("#works .todd-art-card[data-scroll-motion='active']").first();
      await expect(card).toBeVisible();
      const before = await card.evaluate((node) => {
        const style = window.getComputedStyle(node);
        return { transform: style.transform, clipPath: style.clipPath };
      });

      await card.evaluate((node) => {
        node.scrollIntoView({ block: "center", behavior: "instant" });
      });
      await page.waitForTimeout(900);

      const after = await card.evaluate((node) => {
        const style = window.getComputedStyle(node);
        return { transform: style.transform, clipPath: style.clipPath };
      });
      expect(after.transform).not.toBe(before.transform);
      expect(after.clipPath).not.toBe(before.clipPath);
    });

    test("reveals homepage art heading copy on scroll", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");

      await page.evaluate(() => {
        document.querySelector("#works")?.scrollIntoView({ block: "center", behavior: "instant" });
      });
      await page.waitForTimeout(2500);

      await expect(
        page.locator("#works .todd-art-archive__intro-reveal"),
      ).toHaveAttribute("data-revealed", "true");
      const titleOpacity = await page
        .locator("#works .todd-art-archive__title span")
        .first()
        .evaluate((node) => Number.parseFloat(window.getComputedStyle(node).opacity));
      expect(titleOpacity).toBeGreaterThan(0.9);
    });
  });
}

for (const width of [390, 1024]) {
  test.describe(`art archive visibility ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test("shows archive heading and grid at load without scrolling", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${BASE_URL}/art/`);
      await page.waitForLoadState("networkidle");

      const headingOpacity = await page.getByRole("heading", { level: 1 }).evaluate((node) =>
        Number.parseFloat(window.getComputedStyle(node).opacity),
      );
      expect(headingOpacity).toBeGreaterThan(0.9);

      await expect(page.getByRole("button", { name: "All worlds" })).toBeVisible();

      const card = page.locator(".todd-art-card").first();
      await expect(card).toBeVisible();
      const cardOpacity = await card.evaluate((node) =>
        Number.parseFloat(window.getComputedStyle(node).opacity),
      );
      expect(cardOpacity).toBeGreaterThan(0.9);
    });
  });
}

test.describe("art motion fallbacks", () => {
  test("keeps mobile cards static", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`${BASE_URL}/art/`);

    const card = page.locator(".todd-art-card").first();
    await expect(page.locator(".todd-art-grid")).toHaveAttribute(
      "data-layout-motion",
      "static",
    );
    await expect(card).toHaveAttribute("data-scroll-motion", "static");
    await expect(card).toHaveCSS("transform", "none");
    await expect(card).toHaveCSS("clip-path", "none");
  });

  test("keeps reduced-motion cards static and readable", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/art/`);

    const card = page.locator(".todd-art-card").first();
    await expect(page.locator(".todd-art-grid")).toHaveAttribute(
      "data-layout-motion",
      "static",
    );
    await expect(card).toHaveAttribute("data-scroll-motion", "static");
    await expect(card).toBeVisible();
    await expect(card).toHaveCSS("transform", "none");
    await expect(card).toHaveCSS("clip-path", "none");
  });
});

test.describe("twisted mind ground-impact motion", () => {
  for (const width of [390, 1024, 1440]) {
    test(`reveals the animated illustration at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");

      await page.evaluate(() => {
        document
          .querySelector(".todd-about__twisted-mind-art")
          ?.scrollIntoView({ block: "center", behavior: "instant" });
      });
      await page.waitForTimeout(2500);

      const illustration = page.locator(".todd-about__twisted-mind-art");
      await expect(illustration).toHaveAttribute("data-revealed", "true");
      await expect(illustration.locator("img")).toBeVisible();
      const loaded = await illustration.locator("img").evaluate((node) => {
        return node instanceof HTMLImageElement && node.complete && node.naturalWidth > 0;
      });
      expect(loaded).toBe(true);
    });
  }

  test("synchronizes falling drops, splash, stream, and puddle", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`${BASE_URL}/assets/todd-scenes/about/twisted-mind.svg`);

    const drop = page.locator(".twisted-impact-drop--1");
    const splash = page.locator(".twisted-impact-splash");
    const stream = page.locator(".twisted-stream");
    const puddle = page.locator(".twisted-puddle");

    await expect(drop).toHaveCSS("animation-name", "twisted-impact-drop");
    await expect(splash).toHaveCSS("animation-name", "twisted-impact-splash");
    await expect(drop).toHaveCSS("animation-duration", "1.85s");
    await expect(puddle).toHaveCSS("animation-duration", "1.85s");
    await expect(stream).toHaveCSS("animation-duration", "0.925s");

    const before = await drop.evaluate((node) => getComputedStyle(node).transform);
    await page.waitForTimeout(320);
    const after = await drop.evaluate((node) => getComputedStyle(node).transform);
    expect(after).not.toBe(before);
  });

  test("disables transient impact motion for reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/assets/todd-scenes/about/twisted-mind.svg`);

    await expect(page.locator(".twisted-impact--drops")).toHaveCSS("display", "none");
    await expect(page.locator(".twisted-impact--surface")).toHaveCSS("display", "none");
    await expect(page.locator(".twisted-stream")).toHaveCSS("animation-name", "none");
    await expect(page.locator(".twisted-puddle")).toHaveCSS("animation-name", "none");
  });
});

test.describe("never grow up intro motion", () => {
  const scrollToIntro = async (page: import("@playwright/test").Page) => {
    await page.evaluate(() => {
      document.querySelector("#text_intro")?.scrollIntoView({ block: "center", behavior: "instant" });
    });
    await page.waitForTimeout(2500);
  };

  for (const width of [390, 768, 1440]) {
    test(`reveals both illustrations and starts decor motion at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");
      await scrollToIntro(page);

      const firstIllustration = page.locator(".todd-intro-art").first();
      const snowScene = page.locator(".todd-intro-snow-scene").first();

      await expect(firstIllustration).toHaveAttribute("data-revealed", "true");
      await expect(snowScene).toHaveAttribute("data-revealed", "true");
      await expect(firstIllustration.locator(".todd-ngu-eye__iris").first()).toHaveCSS(
        "animation-play-state",
        "running",
      );
      await expect(firstIllustration.locator(".todd-intro-art-stage")).toHaveCSS(
        "animation-play-state",
        "running",
      );
      await expect(firstIllustration.locator(".todd-ngu-ornament--yellow .todd-ngu-ornament__ball")).toHaveCSS(
        "animation-play-state",
        "running",
      );
      await expect(snowScene.locator(".todd-intro-snow-eye__iris").first()).toHaveCSS(
        "animation-play-state",
        "running",
      );
    });
  }

  test("synchronizes the yeti throw, snowball, and child-face impact", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
    await scrollToIntro(page);

    const snowball = page.locator(".todd-intro-snow-scene .todd-intro-snowball").first();
    const impact = page.locator(".todd-intro-snow-scene .todd-intro-snow-impact").first();
    const base = page.locator(".todd-intro-snow-scene .todd-intro-snow-base").first();
    const thrower = page.locator(".todd-intro-snow-scene .todd-intro-snow-actor--thrower").first();
    const launch = page.locator(".todd-intro-snow-scene .todd-intro-snow-launch").first();
    const trail = page.locator(".todd-intro-snow-scene .todd-intro-snow-trail").first();
    const contact = page.locator(".todd-intro-snow-scene .todd-intro-snow-contact").first();
    const particle = page.locator(".todd-intro-snow-scene .todd-intro-snow-particle").first();

    await expect(snowball).toHaveCSS("animation-name", "todd-snowball-throw");
    await expect(impact).toHaveCSS("animation-name", "todd-snow-impact");
    await expect(base).toHaveCSS("animation-name", "none");
    await expect(base).toHaveCSS("transform", "none");
    await expect(thrower).toHaveCSS("animation-name", "todd-snow-thrower");
    await expect(launch).toHaveCSS("animation-name", "todd-snow-launch");
    await expect(trail).toHaveCSS("animation-name", "todd-snow-trail");
    await expect(contact).toHaveCSS("animation-name", "todd-snow-contact");
    await expect(particle).toHaveCSS("animation-name", "todd-snow-particle");

    for (const animatedLayer of [
      snowball,
      impact,
      thrower,
      launch,
      trail,
      contact,
      particle,
    ]) {
      await expect(animatedLayer).toHaveCSS("animation-duration", "5.8s");
      await expect(animatedLayer).toHaveCSS("animation-play-state", "running");
    }

    const actorMotion = await page.evaluate(() => {
      const throwerNode = document.querySelector(".todd-intro-snow-actor--thrower");
      if (!(throwerNode instanceof HTMLElement)) return null;

      const throwerAnimation = throwerNode.getAnimations()[0];
      throwerAnimation?.pause();
      if (throwerAnimation) throwerAnimation.currentTime = 5800 * 0.25;

      return getComputedStyle(throwerNode).transform;
    });

    expect(actorMotion).not.toBeNull();
    expect(actorMotion).not.toBe("none");
  });

  test("keeps the snow sequence paused until its illustration reveals", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");

    const snowScene = page.locator(".todd-intro-snow-scene").first();
    await expect(snowScene).not.toHaveAttribute("data-revealed", "true");
    await expect(snowScene.locator(".todd-intro-snowball")).toHaveCSS(
      "animation-play-state",
      "paused",
    );
    await expect(snowScene.locator(".todd-intro-snow-impact")).toHaveCSS(
      "animation-play-state",
      "paused",
    );
    await expect(snowScene.locator(".todd-intro-snow-actor--thrower")).toHaveCSS(
      "animation-play-state",
      "paused",
    );
  });

  for (const width of [390, 768]) {
    test(`keeps the snow throw static but animates eyes at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");
      await scrollToIntro(page);

      const scene = page.locator(".todd-intro-snow-scene").first();
      await expect(scene.locator(".todd-intro-snow-base")).toBeVisible();
      await expect(scene.locator(".todd-intro-snowball")).toHaveCSS("display", "none");
      await expect(scene.locator(".todd-intro-snow-actor--thrower")).toHaveCSS("display", "none");
      await expect(scene.locator(".todd-intro-snow-impact")).toHaveCSS("display", "none");
      await expect(scene.locator(".todd-intro-snow-eye--yeti-left .todd-intro-snow-eye__iris")).toHaveCSS(
        "animation-name",
        "todd-snow-eye-look-yeti",
      );
      await expect(scene.locator(".todd-intro-snow-eye__iris").first()).toHaveCSS(
        "animation-play-state",
        "running",
      );

      const before = await scene
        .locator(".todd-intro-snow-eye--yeti-left .todd-intro-snow-eye__iris")
        .evaluate((node) => getComputedStyle(node).transform);
      await page.waitForTimeout(1800);
      const after = await scene
        .locator(".todd-intro-snow-eye--yeti-left .todd-intro-snow-eye__iris")
        .evaluate((node) => getComputedStyle(node).transform);
      expect(after).not.toBe(before);
    });
  }

  for (const width of [1024, 1440]) {
    test(`lands the snowball on its target at ${width}px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");
      await scrollToIntro(page);

      const scene = page.locator(".todd-intro-snow-scene").first();
      await expect(scene.locator(".todd-intro-snow-base")).toHaveCount(1);
      await expect(scene.locator(".todd-intro-snow-actor--thrower")).toHaveCount(1);
      await expect(scene.locator(".todd-intro-snow-actor--recipient")).toHaveCount(0);
      await expect(scene.locator(".todd-intro-snow-restoration--recipient")).toHaveCount(0);

      const alignment = await page.evaluate(() => {
        const scene = document.querySelector(".todd-intro-snow-scene");
        const ball = scene?.querySelector(".todd-intro-snowball");
        const impact = scene?.querySelector(".todd-intro-snow-impact");
        if (!(scene instanceof HTMLElement) || !(ball instanceof HTMLElement) || !(impact instanceof HTMLElement)) {
          return null;
        }

        const originRect = ball.getBoundingClientRect();
        const impactRect = impact.getBoundingClientRect();
        const originCenterX = originRect.left + originRect.width / 2;
        const impactCenterX = impactRect.left + impactRect.width / 2;

        const animation = ball.getAnimations()[0];
        animation?.pause();
        if (animation) animation.currentTime = 5800 * 0.54;

        const ballRect = ball.getBoundingClientRect();
        const ballCenter = {
          x: ballRect.left + ballRect.width / 2,
          y: ballRect.top + ballRect.height / 2,
        };
        const impactCenter = {
          x: impactRect.left + impactRect.width / 2,
          y: impactRect.top + impactRect.height / 2,
        };

        return {
          travelsRightToLeft: originCenterX > impactCenterX,
          distance: Math.hypot(ballCenter.x - impactCenter.x, ballCenter.y - impactCenter.y),
          tolerance: Math.max(impactRect.width, 18),
          insideScene:
            ballRect.right > scene.getBoundingClientRect().left &&
            ballRect.left < scene.getBoundingClientRect().right &&
            ballRect.bottom > scene.getBoundingClientRect().top &&
            ballRect.top < scene.getBoundingClientRect().bottom,
        };
      });

      expect(alignment).not.toBeNull();
      expect(alignment?.travelsRightToLeft).toBe(true);
      expect(alignment?.insideScene).toBe(true);
      expect(alignment?.distance).toBeLessThan(alignment?.tolerance ?? 0);
    });
  }

  test("animates decor elements with natural idle motion", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
    await scrollToIntro(page);

    const iris = page.locator(".todd-intro-art .todd-ngu-eye__iris").first();
    const needle = page.locator(".todd-intro-art .todd-ngu-needle").first();
    const yellowBall = page.locator(".todd-intro-art .todd-ngu-ornament--yellow .todd-ngu-ornament__ball").first();

    await expect(iris).toHaveCSS("animation-name", "todd-ngu-look");
    await expect(needle).toHaveCSS("animation-name", "todd-ngu-needle-drift");
    await expect(yellowBall).toHaveCSS("animation-name", "todd-ngu-ball-fall");

    const beforeNeedle = await needle.evaluate((node) => getComputedStyle(node).transform);
    const beforeYellowBall = await yellowBall.evaluate((node) => getComputedStyle(node).transform);
    await page.waitForTimeout(1800);
    const afterNeedle = await needle.evaluate((node) => getComputedStyle(node).transform);
    const afterYellowBall = await yellowBall.evaluate((node) => getComputedStyle(node).transform);

    expect(afterNeedle).not.toBe(beforeNeedle);
    expect(afterYellowBall).not.toBe(beforeYellowBall);
  });

  test("disables intro decor and snow motion for reduced motion", async ({ page }) => {
    await page.setViewportSize({ width: 1024, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
    await scrollToIntro(page);

    await expect(page.locator(".todd-intro-art .todd-ngu-eye__iris").first()).toHaveCSS(
      "animation-name",
      "none",
    );
    await expect(page.locator(".todd-intro-art .todd-ngu-needle").first()).toHaveCSS(
      "display",
      "none",
    );
    await expect(page.locator(".todd-intro-snow-scene .todd-intro-snowball").first()).toHaveCSS(
      "animation-name",
      "none",
    );
    await expect(page.locator(".todd-intro-snow-scene .todd-intro-snow-eye__iris").first()).toHaveCSS(
      "animation-name",
      "none",
    );
    await expect(page.locator(".todd-intro-snow-scene .todd-intro-snow-impact").first()).toHaveCSS(
      "display",
      "none",
    );
    for (const selector of [
      ".todd-intro-snow-restoration",
      ".todd-intro-snow-actor",
      ".todd-intro-snow-launch",
      ".todd-intro-snow-trail",
      ".todd-intro-snow-contact",
      ".todd-intro-snow-particle",
    ]) {
      await expect(page.locator(`.todd-intro-snow-scene ${selector}`).first()).toHaveCSS(
        "display",
        "none",
      );
    }
    await expect(page.locator(".todd-intro-snow-scene .todd-intro-snow-base").first()).toBeVisible();
    await expect(page.locator(".todd-intro-snow-scene .todd-intro-snow-base").first()).toHaveCSS(
      "transform",
      "none",
    );
  });
});

const CHECKS = [
  {
    name: "intro never-grow-up decor animations",
    selector: ".todd-intro-art .todd-ngu-eye__iris",
    section: "#text_intro",
  },
  {
    name: "intro snow scene eye animations",
    selector: ".todd-intro-snow-scene .todd-intro-snow-eye__iris",
    section: "#text_intro",
  },
  {
    name: "footer headline reveal",
    selector: ".todd-contact-headline [data-revealed='true']",
    section: "#contact",
  },
  {
    name: "books doodle reveal",
    selector: ".todd-books__doodle",
    section: "#books",
    attribute: "data-revealed",
    expected: "true",
  },
  {
    name: "books heading reveal",
    selector: ".todd-books__title-reveal",
    section: "#books",
    attribute: "data-revealed",
    expected: "true",
  },
  {
    name: "books feature reveal",
    selector: ".todd-books__feature-reveal",
    section: "#books",
    attribute: "data-revealed",
    expected: "true",
  },
  {
    name: "books shelf reveal",
    selector: ".todd-book-card-reveal",
    section: "#books",
    attribute: "data-revealed",
    expected: "true",
  },
] as const;

for (const width of [390, 768, 1024]) {
  test.describe(`medium/mobile scroll reveal audit ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test("testimonial title and cards reveal on scroll", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");

      await page.evaluate(() => {
        document
          .querySelector("#testimonial-section")
          ?.scrollIntoView({ block: "center", behavior: "instant" });
      });
      await page.waitForTimeout(2500);

      await expect(
        page.locator(".todd-testimonial__title[data-revealed='true']").first(),
      ).toBeVisible();

      const titleOpacity = await page.locator(".todd-testimonial__title").first().evaluate((node) => {
        return Number.parseFloat(window.getComputedStyle(node).opacity);
      });
      expect(titleOpacity).toBeGreaterThan(0.9);

      const revealedCards = await page
        .locator("#testimonial-section .todd-testimonials__card-reveal")
        .evaluateAll((nodes) =>
          nodes.filter((node) => Number.parseFloat(window.getComputedStyle(node).opacity) > 0.9)
            .length,
        );
      expect(revealedCards).toBeGreaterThan(0);
    });

    test("about first card and Appear title reveal on scroll", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");

      await page.evaluate(() => {
        document.querySelector("#about-1")?.scrollIntoView({ block: "center", behavior: "instant" });
      });
      await page.waitForTimeout(2500);

      const revealed = await page
        .locator("#about-1")
        .first()
        .getAttribute("data-revealed");
      expect(revealed).toBe("true");

      const titleOpacity = await page.evaluate(() => {
        const node = document.querySelector("#about-1 .todd-about__title");
        return node ? Number.parseFloat(window.getComputedStyle(node).opacity) : 0;
      });
      expect(titleOpacity).toBeGreaterThan(0.5);
    });
  });
}

for (const width of [390, 768, 1440]) {
  test.describe(`animation audit ${width}px`, () => {
    test.use({ viewport: { width, height: 900 } });

    test("books sequence replays from both scroll directions", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "no-preference" });
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");

      const revealSelectors = [
        ".todd-books__doodle",
        ".todd-books__title-reveal",
        ".todd-books__feature-reveal",
        ".todd-book-card-reveal",
      ];

      const scrollTo = async (selector: string) => {
        await page.evaluate((target) => {
          document.querySelector(target)?.scrollIntoView({ block: "center", behavior: "instant" });
        }, selector);
      };

      const expectBooksRevealed = async () => {
        for (const selector of revealSelectors) {
          await expect(page.locator(selector).first()).toHaveAttribute("data-revealed", "true");
        }
      };

      const expectBooksReset = async () => {
        for (const selector of revealSelectors) {
          await expect(page.locator(selector).first()).not.toHaveAttribute("data-revealed", "true");
        }
      };

      await scrollTo("#books");
      await expectBooksRevealed();

      await scrollTo("#contact");
      await expectBooksReset();
      await scrollTo("#books");
      await expectBooksRevealed();

      await scrollTo("#works");
      await expectBooksReset();
      await scrollTo("#books");
      await expectBooksRevealed();
    });

    test("books content is immediately available with reduced motion", async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");

      await page.evaluate(() => {
        document.querySelector("#books")?.scrollIntoView({ block: "center", behavior: "instant" });
      });

      for (const selector of [
        ".todd-books__doodle",
        ".todd-books__title-reveal",
        ".todd-books__feature-reveal",
        ".todd-book-card-reveal",
      ]) {
        await expect(page.locator(selector).first()).toBeVisible();
      }
    });

    for (const check of CHECKS) {
      test(`${check.name} runs after scroll`, async ({ page }) => {
        await page.emulateMedia({ reducedMotion: "no-preference" });
        await page.goto(`${BASE_URL}/`);
        await page.waitForLoadState("networkidle");

        await page.evaluate((sectionId) => {
          const node = document.querySelector(sectionId);
          if (node) node.scrollIntoView({ block: "center", behavior: "instant" });
        }, check.section);
        await page.waitForTimeout(2000);

        if ("skipPlayState" in check && check.skipPlayState) {
          await expect(page.locator(check.selector).first()).toBeVisible();
          return;
        }

        if ("attribute" in check && check.attribute) {
          await expect(page.locator(check.selector).first()).toHaveAttribute(
            check.attribute,
            check.expected ?? "true",
          );
          return;
        }

        const playState = await page.locator(check.selector).first().evaluate((node) => {
          return window.getComputedStyle(node).animationPlayState;
        });

        expect(playState).toBe("running");
      });
    }
  });
}

const REDUCED_MOTION_SECTIONS = [
  { id: "text_intro", selector: ".todd-intro__headline h1, .todd-intro__wrapper-26 h1" },
  { id: "testimonial-section", selector: "#testimonial-section .todd-testimonial-card" },
  { id: "about-1", selector: "#about-1 .todd-about__card" },
  { id: "services", selector: ".todd-service-row" },
  { id: "faq", selector: ".faq-accordion__trigger" },
] as const;

test.describe("reduced-motion homepage smoke", () => {
  test.use({ viewport: { width: 1024, height: 900 } });

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
  });

  for (const section of REDUCED_MOTION_SECTIONS) {
    test(`exposes readable ${section.id} content without motion`, async ({ page }) => {
      await page.evaluate((target) => {
        document.querySelector(target)?.scrollIntoView({ block: "center", behavior: "instant" });
      }, `#${section.id}`);
      await page.waitForTimeout(300);

      const target = page.locator(section.selector).first();
      await expect(target).toBeVisible();
      const opacity = await target.evaluate((node) =>
        Number.parseFloat(window.getComputedStyle(node).opacity),
      );
      expect(opacity).toBeGreaterThan(0.9);
    });
  }
});
