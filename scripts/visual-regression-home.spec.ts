import { expect, test } from "@playwright/test";

const BASE_URL = process.env.PLAYWRIGHT_BASE_URL ?? "http://localhost:3010";
const VIEWPORTS = [
  { width: 390, height: 900, label: "mobile" },
  { width: 768, height: 900, label: "tablet" },
  { width: 1024, height: 900, label: "medium" },
  { width: 1440, height: 900, label: "desktop" },
] as const;

const SECTIONS = [
  { id: "works", selector: ".todd-works" },
  { id: "books", selector: ".todd-books" },
  { id: "services", selector: ".todd-services" },
  { id: "testimonials", selector: ".todd-testimonials, #testimonial-section" },
  { id: "about", selector: ".todd-about" },
  { id: "faq", selector: ".todd-faq, #faq" },
  { id: "contact", selector: ".todd-footer, #contact" },
] as const;

for (const viewport of VIEWPORTS) {
  test.describe(`${viewport.label} (${viewport.width}px)`, () => {
    test.use({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: "light",
    });

    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
    });

    test("home page loads without horizontal overflow", async ({ page }) => {
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");

      const overflow = await page.evaluate(() => {
        const doc = document.documentElement;
        return doc.scrollWidth > doc.clientWidth + 1;
      });

      expect(overflow).toBe(false);
    });

    for (const section of SECTIONS) {
      test(`section ${section.id} is visible and sized`, async ({ page }) => {
        await page.goto(`${BASE_URL}/#${section.id}`);
        await page.waitForLoadState("networkidle");

        const target = page.locator(section.selector).first();
        await expect(target).toBeVisible({ timeout: 10_000 });

        const box = await target.boundingBox();
        expect(box).not.toBeNull();
        expect(box!.width).toBeGreaterThan(0);
        expect(box!.height).toBeGreaterThan(0);
      });
    }
  });
}
