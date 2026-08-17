import { expect, test } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3010";
const VIEWPORTS = [
  { width: 390, height: 900, label: "mobile" },
  { width: 1024, height: 900, label: "medium" },
  { width: 1440, height: 900, label: "desktop" },
] as const;

for (const viewport of VIEWPORTS) {
  test.describe(`art archive ${viewport.label} (${viewport.width}px)`, () => {
    test.use({ viewport: { width: viewport.width, height: viewport.height } });

    test.beforeEach(async ({ page }) => {
      await page.goto(`${BASE_URL}/art/`);
      await page.locator(".todd-art-archive").waitFor();
    });

    test("keeps the archive within the viewport", async ({ page }) => {
      await expect(page.getByRole("heading", { level: 1 })).toContainText(
        "Never grow up",
      );
      const hasOverflow = await page.evaluate(
        () => document.documentElement.scrollWidth > window.innerWidth + 1,
      );
      expect(hasOverflow).toBe(false);
    });

    test("shows archive content visibly at load", async ({ page }) => {
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

      const columnCount = await page.locator(".todd-art-grid").evaluate((grid) =>
        getComputedStyle(grid).gridTemplateColumns.split(" ").filter(Boolean).length,
      );
      expect(columnCount).toBe(viewport.width <= 809 ? 1 : 2);

      const mainHeight = await page.locator("#main").evaluate((node) =>
        node instanceof HTMLElement ? node.offsetHeight : 0,
      );
      const headerClearance = await page.evaluate(() => {
        const value = getComputedStyle(document.documentElement).getPropertyValue(
          "--site-header-clearance",
        );
        return Number.parseFloat(value) || 0;
      });
      expect(mainHeight).toBeGreaterThan(headerClearance);
    });

    test("prevents indexing while catalogue is draft", async ({ page }) => {
      await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
        "content",
        /noindex/,
      );
    });

    test("filters by named series and announces the result", async ({ page }) => {
      await page.getByRole("button", { name: "Cat Faces" }).click();
      await expect(page.getByRole("button", { name: "Cat Faces" })).toHaveAttribute(
        "aria-pressed",
        "true",
      );
      await expect(page.locator('[aria-live="polite"]')).toContainText(
        "Showing 2 art pieces in Cat Faces.",
      );
      await expect(page.locator(".todd-art-grid__item")).toHaveCount(2);
      await expect(page.locator(".todd-art-grid")).toHaveAttribute(
        "data-layout-motion",
        viewport.width <= 809 ? "static" : "active",
      );
      if (viewport.width > 809) {
        await expect(page.locator(".todd-art-card").first()).toHaveAttribute(
          "data-scroll-motion",
          "active",
        );
      }
    });
  });
}

test.describe("art archive navigation and motion", () => {
  test.use({ viewport: { width: 1024, height: 900 } });

  test("marks Art as the current desktop destination", async ({ page }) => {
    await page.goto(`${BASE_URL}/art/`);
    await expect(
      page.locator('.desktop-nav-links__link[href="/art/"]'),
    ).toHaveAttribute("aria-current", "page");
  });

  test("keeps filters keyboard operable", async ({ page }) => {
    await page.goto(`${BASE_URL}/art/`);
    const firstFilter = page.getByRole("button", { name: "All worlds" });
    await firstFilter.focus();
    await expect(firstFilter).toBeFocused();
    await page.keyboard.press("Tab");
    await expect(page.getByRole("button", { name: "Never Grow Up" })).toBeFocused();
  });

  test("renders without entrance transforms for reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/art/`);
    const card = page.locator(".todd-art-card").first();
    await expect(page.locator(".todd-art-grid")).toHaveAttribute(
      "data-layout-motion",
      "static",
    );
    await expect(card).toHaveAttribute("data-scroll-motion", "static");
    await expect(card).toHaveCSS("transform", "none");
    await expect(card).toHaveCSS("clip-path", "none");

    const filter = page.getByRole("button", { name: "All worlds" });
    await filter.hover();
    await expect(filter).toHaveCSS("transform", "none");
  });
});

test.describe("homepage art preview", () => {
  test.use({ viewport: { width: 1024, height: 900 } });

  test("shows only featured catalogue items and links to the archive", async ({
    page,
  }) => {
    await page.goto(`${BASE_URL}/#works`);
    await expect(page.locator("#works .todd-art-grid__item")).toHaveCount(4);
    await expect(page.getByRole("link", { name: /See all art/ })).toHaveAttribute(
      "href",
      "/art/",
    );
  });
});
