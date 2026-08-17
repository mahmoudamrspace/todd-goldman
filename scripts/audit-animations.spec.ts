import { expect, test } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3010";

const CHECKS = [
  {
    name: "intro never-grow-up decor animations",
    selector: ".todd-intro-art .todd-ngu-eye__iris",
    section: "#text_intro",
  },
  {
    name: "intro snowball animation",
    selector: ".todd-intro-snow-scene .todd-intro-snowball",
    section: "#text_intro",
    skipPlayState: true,
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
