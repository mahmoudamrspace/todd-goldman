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
  { id: "testimonial-section", selector: "#testimonial-section, .todd-testimonials" },
  { id: "about", selector: ".todd-about" },
  { id: "faq", selector: ".todd-faq, #faq" },
  { id: "contact", selector: ".todd-footer, #contact" },
] as const;

type WorksGeometryResult =
  | { ok: true }
  | { ok: false; reason: string; [key: string]: unknown };

function assertWorksGeometry(viewportWidth: number): WorksGeometryResult {
  const gutterRaw = getComputedStyle(document.documentElement)
    .getPropertyValue("--card-gutter")
    .trim();
  const gutter = Number.parseFloat(gutterRaw) || 16;
  const viewport = window.innerWidth;
  const main = document.querySelector("#main");
  const works = document.querySelector("#works");
  const inner = document.querySelector(".todd-works__inner");
  const title = document.querySelector(".todd-works__title");
  const chapter = document.querySelector("#works-chapter");
  const line = document.querySelector("#works-chapter .todd-chapter__line");

  if (!main || !works || !inner || !title || !chapter || !line) {
    return { ok: false, reason: "missing works layout nodes" };
  }

  const mainRect = main.getBoundingClientRect();
  const worksRect = works.getBoundingClientRect();
  const innerRect = inner.getBoundingClientRect();
  const titleRect = title.getBoundingClientRect();
  const lineRect = line.getBoundingClientRect();

  if (mainRect.x < -1 || mainRect.right > viewport + 1) {
    return { ok: false, reason: "main outside viewport", mainRect: { x: mainRect.x, right: mainRect.right } };
  }
  if (worksRect.x < -1 || worksRect.right > viewport + 1) {
    return { ok: false, reason: "works outside viewport", worksRect: { x: worksRect.x, right: worksRect.right } };
  }
  if (titleRect.x < gutter - 2) {
    return { ok: false, reason: "title missing gutter", titleX: titleRect.x, gutter };
  }
  const expectedTitleX = innerRect.x + gutter;
  if (Math.abs(titleRect.x - expectedTitleX) > 3) {
    return {
      ok: false,
      reason: "title gutter mismatch",
      titleX: titleRect.x,
      expectedTitleX,
      gutter,
    };
  }
  if (innerRect.x < -1 || innerRect.right > viewport + 1) {
    return {
      ok: false,
      reason: "inner outside viewport",
      innerRect: { x: innerRect.x, right: innerRect.right },
    };
  }

  const titleTopGap = titleRect.top - lineRect.bottom;
  const maxTitleGap = viewportWidth <= 809 ? 48 : 40;
  if (titleTopGap > maxTitleGap) {
    return { ok: false, reason: "excessive chapter rhythm", titleTopGap, maxTitleGap };
  }

  return { ok: true };
}

type TestimonialTitleColorResult =
  | { ok: true }
  | { ok: false; reason: string; [key: string]: unknown };

function assertTestimonialTitleColors(): TestimonialTitleColorResult {
  const colorsClose = (a: string, b: string, tolerance = 2): boolean => {
    const parse = (value: string) => value.match(/\d+/g)?.slice(0, 3).map(Number);
    const left = parse(a);
    const right = parse(b);
    if (!left || !right || left.length < 3 || right.length < 3) return a === b;
    return left.every((channel, index) => Math.abs(channel - right[index]!) <= tolerance);
  };

  const resolveCssColor = (token: string): string => {
    const probe = document.createElement("span");
    probe.style.color = token;
    document.body.appendChild(probe);
    const resolved = getComputedStyle(probe).color;
    probe.remove();
    return resolved;
  };

  const words = document.querySelectorAll(
    "#testimonial-section .todd-testimonials__title-word",
  );
  if (words.length !== 3) {
    return { ok: false, reason: "expected three title words", count: words.length };
  }

  const paperColor = getComputedStyle(document.body).backgroundColor;
  const inkColor = resolveCssColor("var(--todd-ink)");
  const redColor = resolveCssColor("var(--todd-red)");

  for (const word of words) {
    const el = word as HTMLElement;
    const color = getComputedStyle(el).color;
    const text = el.textContent?.trim() ?? "";
    const isAccent = el.classList.contains("todd-testimonials__title-word--accent");

    if (colorsClose(color, paperColor)) {
      return { ok: false, reason: "word blends with paper background", text, color, paperColor };
    }

    if (isAccent) {
      if (!colorsClose(color, redColor)) {
        return { ok: false, reason: "accent word not red", text, color, redColor };
      }
      continue;
    }

    if (!colorsClose(color, inkColor)) {
      return { ok: false, reason: "non-accent word not ink", text, color, inkColor };
    }
  }

  return { ok: true };
}

type AboutMobileGeometryResult =
  | { ok: true }
  | { ok: false; reason: string; [key: string]: unknown };

function assertAboutMobileGeometry(): AboutMobileGeometryResult {
  const tolerance = 2;

  const assertCardTextWithinBounds = (cardSelector: string): AboutMobileGeometryResult => {
    const card = document.querySelector(cardSelector);
    if (!card) {
      return { ok: false, reason: "missing card", cardSelector };
    }

    const cardRect = card.getBoundingClientRect();
    for (const node of card.querySelectorAll("*")) {
      const element = node as HTMLElement;
      const rect = element.getBoundingClientRect();
      if (!rect.width || !element.textContent?.trim()) continue;

      if (rect.right > cardRect.right + tolerance) {
        return {
          ok: false,
          reason: "text exceeds card right edge",
          cardSelector,
          text: element.textContent.trim().slice(0, 40),
          nodeRight: rect.right,
          cardRight: cardRect.right,
        };
      }

      if (rect.left < cardRect.left - tolerance) {
        return {
          ok: false,
          reason: "text exceeds card left edge",
          cardSelector,
          text: element.textContent.trim().slice(0, 40),
          nodeLeft: rect.left,
          cardLeft: cardRect.left,
        };
      }
    }

    return { ok: true };
  };

  const header = document.querySelector(".todd-about__title-4");
  const art = document.querySelector(".todd-about__twisted-mind-art");

  if (!header || !art) {
    return { ok: false, reason: "missing about header layout nodes" };
  }

  const headerRect = header.getBoundingClientRect();
  const artRect = art.getBoundingClientRect();

  if (artRect.right > headerRect.right + tolerance) {
    return {
      ok: false,
      reason: "twisted mind art exceeds header column",
      artRight: artRect.right,
      headerRight: headerRect.right,
    };
  }

  const bioResult = assertCardTextWithinBounds("#about-1 .todd-about__card");
  if (!bioResult.ok) return bioResult;

  const timelineResult = assertCardTextWithinBounds(
    "#selected-talks .todd-intro__wrapper-24",
  );
  if (!timelineResult.ok) return timelineResult;

  return { ok: true };
}

const TESTIMONIAL_TITLE_VIEWPORTS = [
  { width: 768, height: 900, label: "tablet" },
  { width: 1024, height: 900, label: "medium" },
] as const;

const MOBILE_BOOK_VIEWPORTS = [
  { width: 390, height: 900, label: "mobile" },
  { width: 768, height: 900, label: "wide mobile" },
] as const;

const MOBILE_SERVICES_VIEWPORTS = [
  { width: 390, height: 900, label: "mobile" },
  { width: 768, height: 900, label: "wide mobile" },
] as const;

test.describe("social share metadata", () => {
  test("exposes a platform-safe Open Graph and Twitter cover image", async ({ page, request }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");

    const tags = await page.evaluate(() => ({
      ogImage: document.querySelector('meta[property="og:image"]')?.getAttribute("content") ?? "",
      ogWidth: document.querySelector('meta[property="og:image:width"]')?.getAttribute("content") ?? "",
      ogHeight: document.querySelector('meta[property="og:image:height"]')?.getAttribute("content") ?? "",
      ogType: document.querySelector('meta[property="og:image:type"]')?.getAttribute("content") ?? "",
      ogAlt: document.querySelector('meta[property="og:image:alt"]')?.getAttribute("content") ?? "",
      twitterCard: document.querySelector('meta[name="twitter:card"]')?.getAttribute("content") ?? "",
      twitterImage: document.querySelector('meta[name="twitter:image"]')?.getAttribute("content") ?? "",
    }));

    expect(tags.ogImage).toContain("/social-cover-og.png");
    expect(tags.ogWidth).toBe("1200");
    expect(tags.ogHeight).toBe("630");
    expect(tags.ogType).toBe("image/png");
    expect(tags.ogAlt.length).toBeGreaterThan(0);
    expect(tags.twitterCard).toBe("summary_large_image");
    expect(tags.twitterImage).toContain("/social-cover-og.png");

    const imagePath = tags.ogImage.includes("/social-cover-og.png")
      ? "/social-cover-og.png"
      : new URL(tags.ogImage, BASE_URL).pathname;
    const response = await request.get(`${BASE_URL}${imagePath}`);

    expect(response.ok()).toBe(true);
    expect(response.headers()["content-type"]).toContain("image/png");
  });
});

test.describe("services hierarchy (1024px)", () => {
  test.use({
    viewport: { width: 1024, height: 667 },
    colorScheme: "light",
  });

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/#services`);
    await page.waitForLoadState("networkidle");
  });

  test("keeps service rows readable and separated", async ({ page }) => {
    const result = await page.evaluate(() => {
      const rows = Array.from(document.querySelectorAll(".todd-service-row"));
      const subtitles = rows.map((row) =>
        row.querySelector<HTMLElement>(".todd-service-row__subtitle"),
      );
      const titles = rows.map((row) =>
        row.querySelector<HTMLElement>(".todd-service-row__title"),
      );
      const compass = document.querySelector(".todd-services__ompass");

      if (
        rows.length !== 4 ||
        subtitles.some((subtitle) => !subtitle) ||
        titles.some((title) => !title) ||
        !compass
      ) {
        return null;
      }

      const rowRects = rows.map((row) => row.getBoundingClientRect());
      const titleRects = titles.map((title) => title!.getBoundingClientRect());
      const subtitleStyles = subtitles.map((subtitle) => getComputedStyle(subtitle!));
      const rowGaps = rowRects.slice(0, -1).map(
        (rect, index) => rowRects[index + 1]!.top - rect.bottom,
      );
      const lastRowBottom = rowRects.at(-1)!.bottom;

      return {
        documentOverflows:
          document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
        rowGaps,
        titlesInsideViewport: titleRects.every(
          (rect) => rect.left >= 0 && rect.right <= window.innerWidth,
        ),
        maxTitleSize: Math.max(
          ...titles.map((title) => Number.parseFloat(getComputedStyle(title!).fontSize)),
        ),
        subtitlesUseInk: subtitleStyles.every(
          (style) => style.color === "rgb(15, 15, 15)",
        ),
        subtitlesHaveSurface: subtitleStyles.every(
          (style) => style.backgroundColor !== "rgba(0, 0, 0, 0)",
        ),
        subtitlesHavePadding: subtitleStyles.every(
          (style) => Number.parseFloat(style.paddingInlineStart) >= 8,
        ),
        compassGap: compass.getBoundingClientRect().top - lastRowBottom,
      };
    });

    expect(result).not.toBeNull();
    expect(result!.documentOverflows).toBe(false);
    expect(Math.min(...result!.rowGaps)).toBeGreaterThanOrEqual(10);
    expect(result!.titlesInsideViewport).toBe(true);
    expect(result!.maxTitleSize).toBeLessThanOrEqual(72);
    expect(result!.subtitlesUseInk).toBe(true);
    expect(result!.subtitlesHaveSurface).toBe(true);
    expect(result!.subtitlesHavePadding).toBe(true);
    expect(result!.compassGap).toBeGreaterThanOrEqual(8);
  });

  test("shows a clear keyboard focus treatment", async ({ page }) => {
    const firstLink = page.locator(".todd-service-row__link").first();
    await firstLink.focus();
    await page.waitForTimeout(220);

    const focusedStyle = await firstLink.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        backgroundColor: style.backgroundColor,
        transform: style.transform,
      };
    });

    expect(focusedStyle.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
    expect(focusedStyle.transform).not.toBe("none");
  });
});

test.describe("services hierarchy (1440px)", () => {
  test.use({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
  });

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/#services`);
    await page.waitForLoadState("networkidle");
  });

  test("keeps section title and compass fully inside the card", async ({ page }) => {
    const result = await page.evaluate(() => {
      const container = document.querySelector(".todd-services__container");
      const sectionTitle = document.querySelector("#todd-services-title");
      const compass = document.querySelector(".todd-services__ompass");

      if (!container || !sectionTitle || !compass) {
        return { ok: false, reason: "missing services card nodes" };
      }

      const containerRect = container.getBoundingClientRect();
      const titleRect = sectionTitle.getBoundingClientRect();
      const compassRect = compass.getBoundingClientRect();
      const titleTopInset = titleRect.top - containerRect.top;
      const compassBottomInset = containerRect.bottom - compassRect.bottom;
      const tolerance = 2;

      const ok =
        titleRect.height > 0 &&
        titleTopInset >= 16 - tolerance &&
        titleRect.top >= containerRect.top + 16 - tolerance &&
        titleRect.bottom <= containerRect.bottom + tolerance &&
        compassRect.height > 0 &&
        compassBottomInset >= 8 - tolerance &&
        compassRect.bottom <= containerRect.bottom + tolerance &&
        container.scrollHeight <= container.clientHeight + 1;

      return {
        ok,
        titleTopInset,
        titleHeight: titleRect.height,
        compassBottomInset,
        compassHeight: compassRect.height,
        containerScrollHeight: container.scrollHeight,
        containerClientHeight: container.clientHeight,
      };
    });

    expect(result.ok, JSON.stringify(result)).toBe(true);
  });
});

for (const viewport of MOBILE_SERVICES_VIEWPORTS) {
  test.describe(`mobile services card (${viewport.label} ${viewport.width}px)`, () => {
    test.use({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: "light",
    });

    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`${BASE_URL}/#services`);
      await page.waitForLoadState("networkidle");
    });

    test("keeps every service readable, tappable, and inside the card", async ({ page }) => {
      const result = await page.evaluate(() => {
        const card = document.querySelector<HTMLElement>(
          ".todd-services__container.todd-card-shell",
        );
        const sectionTitle = document.querySelector<HTMLElement>("#todd-services-title");
        const links = Array.from(
          document.querySelectorAll<HTMLElement>(".todd-service-row__link"),
        );
        const titles = Array.from(
          document.querySelectorAll<HTMLElement>(".todd-service-row__title"),
        );
        const subtitles = Array.from(
          document.querySelectorAll<HTMLElement>(".todd-service-row__subtitle"),
        );
        const compass = document.querySelector<HTMLElement>(".todd-services__ompass");

        if (
          !card ||
          !sectionTitle ||
          links.length !== 4 ||
          titles.length !== 4 ||
          subtitles.length !== 4 ||
          !compass
        ) {
          return null;
        }

        const cardRect = card.getBoundingClientRect();
        const titleRect = sectionTitle.getBoundingClientRect();
        const linkRects = links.map((link) => link.getBoundingClientRect());
        const titleRects = titles.map((title) => title.getBoundingClientRect());
        const subtitleRects = subtitles.map((subtitle) => subtitle.getBoundingClientRect());
        const compassRect = compass.getBoundingClientRect();
        const arrowStyles = links.map((link) => getComputedStyle(link, "::after"));

        return {
          documentOverflows:
            document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          cardClipsContent: card.scrollHeight > card.clientHeight + 1,
          titleInsideCard:
            titleRect.left >= cardRect.left &&
            titleRect.right <= cardRect.right &&
            titleRect.top >= cardRect.top,
          linksInsideCard: linkRects.every(
            (rect) => rect.left >= cardRect.left && rect.right <= cardRect.right,
          ),
          minimumTapHeight: Math.min(...linkRects.map((rect) => rect.height)),
          rowsDoNotOverlap: linkRects.slice(0, -1).every(
            (rect, index) => linkRects[index + 1]!.top >= rect.bottom - 1,
          ),
          titlesStayClearOfArrow: titleRects.every(
            (rect, index) => rect.right <= linkRects[index]!.right - 44,
          ),
          subtitlesAreVisible: subtitleRects.every(
            (rect) => rect.width > 0 && rect.height >= 24,
          ),
          arrowsAreVisible: arrowStyles.every(
            (style) =>
              style.content.includes("→") &&
              Number.parseFloat(style.width) >= 32 &&
              Number.parseFloat(style.height) >= 32,
          ),
          compassInsideCard:
            compassRect.left >= cardRect.left &&
            compassRect.right <= cardRect.right &&
            compassRect.bottom <= cardRect.bottom,
          compassBottomInset: cardRect.bottom - compassRect.bottom,
        };
      });

      expect(result).not.toBeNull();
      expect(result!.documentOverflows).toBe(false);
      expect(result!.cardClipsContent).toBe(false);
      expect(result!.titleInsideCard).toBe(true);
      expect(result!.linksInsideCard).toBe(true);
      expect(result!.minimumTapHeight).toBeGreaterThanOrEqual(44);
      expect(result!.rowsDoNotOverlap).toBe(true);
      expect(result!.titlesStayClearOfArrow).toBe(true);
      expect(result!.subtitlesAreVisible).toBe(true);
      expect(result!.arrowsAreVisible).toBe(true);
      expect(result!.compassInsideCard).toBe(true);
      expect(result!.compassBottomInset).toBeGreaterThanOrEqual(24);
    });

    test("uses stable keyboard focus feedback without shifting the row", async ({ page }) => {
      const firstLink = page.locator(".todd-service-row__link").first();
      await firstLink.focus();

      const focusedStyle = await firstLink.evaluate((node) => {
        const style = getComputedStyle(node);
        const arrowStyle = getComputedStyle(node, "::after");

        return {
          backgroundColor: style.backgroundColor,
          outlineWidth: style.outlineWidth,
          transform: style.transform,
          arrowTransform: arrowStyle.transform,
        };
      });

      expect(focusedStyle.backgroundColor).not.toBe("rgba(0, 0, 0, 0)");
      expect(Number.parseFloat(focusedStyle.outlineWidth)).toBeGreaterThanOrEqual(2);
      expect(focusedStyle.transform).toBe("none");
      expect(focusedStyle.arrowTransform).not.toBe("none");
    });
  });
}

for (const viewport of MOBILE_BOOK_VIEWPORTS) {
  test.describe(`mobile books carousel (${viewport.label} ${viewport.width}px)`, () => {
    test.use({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: "light",
    });

    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`${BASE_URL}/#books`);
      await page.waitForLoadState("networkidle");
    });

    test("uses readable snap cards without page overflow", async ({ page }) => {
      const geometry = await page.evaluate(() => {
        const shelf = document.querySelector(".todd-books__shelf");
        const feature = document.querySelector(".todd-books__feature");
        const items = Array.from(
          document.querySelectorAll(".todd-books__shelf > .todd-book-card-reveal-wrap"),
        );
        if (!shelf || !feature || items.length < 2) return null;

        const shelfRect = shelf.getBoundingClientRect();
        const featureRect = feature.getBoundingClientRect();
        const firstRect = items[0]!.getBoundingClientRect();
        const secondRect = items[1]!.getBoundingClientRect();
        const firstStyle = getComputedStyle(items[0]!);

        return {
          documentOverflows:
            document.documentElement.scrollWidth > document.documentElement.clientWidth + 1,
          shelfScrollable: shelf.scrollWidth > shelf.clientWidth + 1,
          shelfInViewport: shelfRect.left >= -1 && shelfRect.right <= window.innerWidth + 1,
          featureInViewport:
            featureRect.left >= 14 && featureRect.right <= window.innerWidth - 14,
          firstWidth: firstRect.width,
          secondVisible:
            secondRect.left > firstRect.left && secondRect.left < window.innerWidth,
          snapAlign: firstStyle.scrollSnapAlign,
        };
      });

      expect(geometry).not.toBeNull();
      expect(geometry!.documentOverflows).toBe(false);
      expect(geometry!.shelfScrollable).toBe(true);
      expect(geometry!.shelfInViewport).toBe(true);
      expect(geometry!.featureInViewport).toBe(true);
      expect(geometry!.firstWidth).toBeGreaterThanOrEqual(220);
      expect(geometry!.firstWidth).toBeLessThanOrEqual(265);
      expect(geometry!.secondVisible).toBe(true);
      expect(geometry!.snapAlign).toBe("start");
    });

    test("selection updates and reveals the featured panel", async ({ page }) => {
      const feature = page.locator("#todd-books-feature-panel");
      const target = page.locator(".todd-book-card[aria-pressed='false']").first();
      const targetTitle = (await target.locator(".todd-book-card__copy strong").textContent())?.trim();
      const targetLabel = await target.getAttribute("aria-label");

      expect(targetTitle).toBeTruthy();
      expect(targetLabel).toBeTruthy();
      await target.scrollIntoViewIfNeeded();
      await target.click();

      await expect(feature.locator("h3")).toHaveText(targetTitle!);
      await expect(
        page.getByRole("button", { name: targetLabel!, exact: true }),
      ).toHaveAttribute("aria-pressed", "true");

      const featureTop = await feature.evaluate((node) => node.getBoundingClientRect().top);
      expect(featureTop).toBeGreaterThanOrEqual(0);
      expect(featureTop).toBeLessThan(140);
    });
  });
}

test.describe("about mobile overflow (390px)", () => {
  test.use({
    viewport: { width: 390, height: 900 },
    colorScheme: "light",
  });

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/#about`);
    await page.waitForLoadState("networkidle");
  });

  test("keeps illustration and card copy within column bounds", async ({ page }) => {
    const result = await page.evaluate(assertAboutMobileGeometry);
    expect(result.ok, JSON.stringify(result)).toBe(true);
  });

  test("keeps about card borders consistent across the stack", async ({ page }) => {
    await page.goto(`${BASE_URL}/#about-1`);
    await page.waitForLoadState("networkidle");

    const result = await page.evaluate(() => {
      const stickyBlocks = ["#about-1", "#selected-talks", "#selected-clients"].map((selector) => {
        const block = document.querySelector(selector);
        if (!block) return { selector, ok: false, reason: "missing sticky block" };
        const style = getComputedStyle(block);
        return {
          selector,
          ok: true,
          blockRadius: style.borderRadius,
          blockOverflow: style.overflow,
        };
      });

      const cards = [
        { id: "bio", block: "#about-1", shell: "#about-1 .todd-about__card", wrapper: "#about-1 [data-todd-name=\"Wrapper\"]" },
        {
          id: "timeline",
          block: "#selected-talks",
          shell: "#selected-talks .todd-intro__wrapper-24",
          wrapper: "#selected-talks [data-todd-name=\"Wrapper\"]",
        },
        {
          id: "clients",
          block: "#selected-clients",
          shell: "#selected-clients .todd-about__container-2",
          wrapper: "#selected-clients [data-todd-name=\"Wrapper\"]",
        },
      ];

      const measurements = cards.map(({ id, block, shell, wrapper }) => {
        const blockEl = document.querySelector(block);
        const shellEl = document.querySelector(shell);
        const wrapperEl = document.querySelector(wrapper);
        if (!blockEl || !shellEl || !wrapperEl) {
          return { id, ok: false, reason: "missing card nodes" };
        }

        const blockStyle = getComputedStyle(blockEl);
        const shellStyle = getComputedStyle(shellEl);
        const wrapperStyle = getComputedStyle(wrapperEl);
        const wrapperAfter = getComputedStyle(wrapperEl, "::after");
        const shellRect = shellEl.getBoundingClientRect();
        const wrapperRect = wrapperEl.getBoundingClientRect();
        const insetLeft = wrapperRect.left - shellRect.left;
        const insetRight = shellRect.right - wrapperRect.right;

        return {
          id,
          ok: true,
          blockRadius: blockStyle.borderRadius,
          blockOverflow: blockStyle.overflow,
          shellRadius: shellStyle.borderRadius,
          wrapperRadius: wrapperStyle.borderRadius,
          wrapperBackground: wrapperStyle.backgroundColor,
          dashedBorder: wrapperAfter.borderTopStyle,
          insetLeft,
          insetRight,
        };
      });

      if (stickyBlocks.some((entry) => !entry.ok) || measurements.some((entry) => !entry.ok)) {
        return { ok: false, stickyBlocks, measurements };
      }

      const typedSticky = stickyBlocks as Array<{
        selector: string;
        ok: true;
        blockRadius: string;
        blockOverflow: string;
      }>;
      const typedMeasurements = measurements as Array<{
        id: string;
        ok: true;
        blockRadius: string;
        blockOverflow: string;
        shellRadius: string;
        wrapperRadius: string;
        wrapperBackground: string;
        dashedBorder: string;
        insetLeft: number;
        insetRight: number;
      }>;
      const bio = typedMeasurements[0];
      const timeline = typedMeasurements[1];
      const clients = typedMeasurements[2];
      if (!bio || !timeline || !clients) {
        return { ok: false, reason: "missing card measurement entries" };
      }

      const sharedBlockRadius = bio.blockRadius;
      const sharedShellRadius = bio.shellRadius;
      const sharedInset = bio.insetLeft;
      const clipOverflow = (value: string) => value === "clip" || value === "hidden";

      const consistent =
        typedSticky.every((entry) => entry.blockRadius === sharedBlockRadius) &&
        typedSticky.every((entry) => clipOverflow(entry.blockOverflow)) &&
        timeline.blockRadius === sharedBlockRadius &&
        clients.blockRadius === sharedBlockRadius &&
        bio.shellRadius === sharedBlockRadius &&
        timeline.shellRadius === sharedShellRadius &&
        clients.shellRadius === sharedShellRadius &&
        bio.shellRadius === bio.blockRadius &&
        clipOverflow(bio.blockOverflow) &&
        Math.abs(timeline.insetLeft - sharedInset) < 1 &&
        Math.abs(clients.insetLeft - sharedInset) < 1 &&
        Math.abs(bio.insetRight - bio.insetLeft) < 1 &&
        bio.wrapperBackground === "rgb(255, 255, 255)" &&
        timeline.wrapperBackground === "rgb(255, 255, 255)" &&
        clients.wrapperBackground === "rgb(255, 255, 255)" &&
        bio.dashedBorder === "dashed" &&
        timeline.dashedBorder === "dashed" &&
        clients.dashedBorder === "dashed";

      return {
        ok: consistent,
        stickyBlocks: typedSticky,
        measurements,
      };
    });

    expect(result.ok, JSON.stringify(result)).toBe(true);
  });

  test("rounds orange about container and background layer", async ({ page }) => {
    const result = await page.evaluate(() => {
      const container = document.querySelector(".todd-about .todd-about__container");
      const background = document.querySelector(
        ".todd-about .todd-about__container > .todd-about__section-background",
      );
      const wrapper = document.querySelector(
        ".todd-about .todd-about__container > .todd-about__section-background [data-todd-background-image-wrapper]",
      );

      if (!container || !background || !wrapper) {
        return { ok: false, reason: "missing about container nodes" };
      }

      const containerStyle = getComputedStyle(container);
      const backgroundStyle = getComputedStyle(background);
      const wrapperStyle = getComputedStyle(wrapper);

      const parseRadius = (value: string) => {
        const match = value.match(/([\d.]+)px/);
        return match?.[1] ? Number.parseFloat(match[1]) : 0;
      };

      const containerRadius = containerStyle.borderRadius;
      const backgroundRadius = backgroundStyle.borderRadius;
      const wrapperRadius = wrapperStyle.borderRadius;
      const containerRadiusPx = parseRadius(containerRadius);
      const clipOverflow = (value: string) => value === "clip" || value === "hidden";

      const ok =
        containerRadiusPx > 0 &&
        containerRadius === backgroundRadius &&
        containerRadius === wrapperRadius &&
        clipOverflow(containerStyle.overflow) &&
        clipOverflow(backgroundStyle.overflow) &&
        clipOverflow(wrapperStyle.overflow);

      return {
        ok,
        containerRadius,
        backgroundRadius,
        wrapperRadius,
        containerOverflow: containerStyle.overflow,
        backgroundOverflow: backgroundStyle.overflow,
        wrapperOverflow: wrapperStyle.overflow,
      };
    });

    expect(result.ok, JSON.stringify(result)).toBe(true);
  });
});

for (const viewport of TESTIMONIAL_TITLE_VIEWPORTS) {
  test.describe(`testimonial title colors (${viewport.label} ${viewport.width}px)`, () => {
    test.use({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: "light",
    });

    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
    });

    test("title words contrast with page background", async ({ page }) => {
      await page.goto(`${BASE_URL}/#testimonial-section`);
      await page.waitForLoadState("networkidle");

      const result = await page.evaluate(assertTestimonialTitleColors);
      expect(result.ok, JSON.stringify(result)).toBe(true);
    });
  });
}

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

    test("works section stays within viewport gutters", async ({ page }) => {
      await page.goto(`${BASE_URL}/#works`);
      await page.waitForLoadState("networkidle");

      const result = await page.evaluate(assertWorksGeometry, viewport.width);
      expect(result.ok, JSON.stringify(result)).toBe(true);
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


const WORKS_LAYOUT_VIEWPORTS = [
  { width: 390, height: 900, label: "mobile", maxHeight: 7600 },
  { width: 768, height: 900, label: "wide mobile", maxHeight: 6000 },
  { width: 1024, height: 900, label: "tablet", maxHeight: 5200 },
  { width: 1440, height: 900, label: "desktop", maxHeight: 4200 },
] as const;

for (const viewport of WORKS_LAYOUT_VIEWPORTS) {
  test.describe(`works layout rhythm (${viewport.label} ${viewport.width}px)`, () => {
    test.use({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: "light",
    });

    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`${BASE_URL}/#works`);
      await page.waitForLoadState("networkidle");
    });

    test("keeps section height and card geometry within guardrails", async ({ page }) => {
      const result = await page.evaluate(
        ({ maxHeight, viewportWidth }) => {
          const works = document.querySelector("#works");
          const grid = document.querySelector(".todd-art-grid");
          if (!works) return { ok: false, reason: "missing works section" };
          if (!grid) return { ok: false, reason: "missing art preview grid" };

          const worksHeight = works.getBoundingClientRect().height;
          if (worksHeight > maxHeight) {
            return { ok: false, reason: "works section too tall", worksHeight, maxHeight };
          }

          const columnCount = getComputedStyle(grid).gridTemplateColumns
            .split(" ")
            .filter(Boolean).length;
          const expectedColumns = viewportWidth <= 809 ? 1 : 2;
          if (columnCount !== expectedColumns) {
            return {
              ok: false,
              reason: "unexpected art preview column count",
              columns: getComputedStyle(grid).gridTemplateColumns,
              columnCount,
              expectedColumns,
            };
          }

          const cards = Array.from(document.querySelectorAll("#works .todd-art-card"));
          if (cards.length !== 4) {
            return { ok: false, reason: "expected four featured art cards", count: cards.length };
          }

          return { ok: true };
        },
        {
          maxHeight: viewport.maxHeight,
          viewportWidth: viewport.width,
        },
      );

      expect(result.ok, JSON.stringify(result)).toBe(true);
    });
  });
}

const BOOKS_SHELF_VIEWPORTS = [
  { width: 768, height: 900, label: "wide mobile", expectColumns: 0 },
  { width: 1024, height: 900, label: "tablet", expectColumns: 3, maxHeight: 3400 },
] as const;

for (const viewport of BOOKS_SHELF_VIEWPORTS) {
  test.describe(`books shelf rhythm (${viewport.label} ${viewport.width}px)`, () => {
    test.use({
      viewport: { width: viewport.width, height: viewport.height },
      colorScheme: "light",
    });

    test.beforeEach(async ({ page }) => {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.goto(`${BASE_URL}/#books`);
      await page.waitForLoadState("networkidle");
    });

    test("uses readable shelf layout without overflow", async ({ page }) => {
      const result = await page.evaluate(
        ({ expectColumns, maxHeight }) => {
          const books = document.querySelector("#books");
          const shelf = document.querySelector(".todd-books__shelf");
          if (!books || !shelf) return { ok: false, reason: "missing books shelf nodes" };

          const booksHeight = books.getBoundingClientRect().height;
          if (maxHeight && booksHeight > maxHeight) {
            return { ok: false, reason: "books section too tall", booksHeight, maxHeight };
          }

          const shelfStyle = getComputedStyle(shelf);
          if (expectColumns > 0) {
            const columnCount = shelfStyle.gridTemplateColumns
              .split(" ")
              .filter(Boolean).length;
            if (columnCount !== expectColumns) {
              return {
                ok: false,
                reason: "unexpected books shelf columns",
                columnCount,
                expectColumns,
              };
            }

            const shelfRect = shelf.getBoundingClientRect();
            const cards = Array.from(document.querySelectorAll(".todd-book-card"));
            if (cards.length === 0) {
              return { ok: false, reason: "missing book cards" };
            }

            for (const card of cards) {
              const rect = card.getBoundingClientRect();
              if (rect.right > shelfRect.right + 2 || rect.left < shelfRect.left - 2) {
                return { ok: false, reason: "book card exceeds shelf bounds" };
              }
            }
          } else if (shelfStyle.display === "flex") {
            const documentOverflows =
              document.documentElement.scrollWidth >
              document.documentElement.clientWidth + 1;
            if (documentOverflows) {
              return { ok: false, reason: "mobile books carousel caused page overflow" };
            }
          }

          return { ok: true };
        },
        {
          expectColumns: viewport.expectColumns,
          maxHeight: "maxHeight" in viewport ? viewport.maxHeight : undefined,
        },
      );

      expect(result.ok, JSON.stringify(result)).toBe(true);
    });
  });
}

test.describe("homepage semantics and accessibility", () => {
  test.use({
    viewport: { width: 1024, height: 900 },
    colorScheme: "light",
  });

  test.beforeEach(async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
  });

  test("uses a single h1 as the first heading in main", async ({ page }) => {
    const result = await page.evaluate(() => {
      const main = document.querySelector("#main");
      if (!main) return { ok: false, reason: "missing main landmark" };

      const headings = Array.from(main.querySelectorAll("h1, h2, h3, h4, h5, h6"));
      if (headings.length === 0) {
        return { ok: false, reason: "no headings in main" };
      }

      const first = headings[0];
      if (!first || first.tagName !== "H1") {
        return {
          ok: false,
          reason: "first heading in main is not h1",
          tag: first?.tagName ?? null,
        };
      }

      return { ok: true };
    });

    expect(result.ok, JSON.stringify(result)).toBe(true);
  });

  test("names the books feature region from section and active book titles", async ({ page }) => {
    await page.goto(`${BASE_URL}/#books`);
    await page.waitForLoadState("networkidle");

    const labelledBy = await page
      .locator("#todd-books-feature-panel")
      .getAttribute("aria-labelledby");
    expect(labelledBy).toContain("todd-books-title");
    expect(labelledBy).toContain("todd-books-feature-title");
  });

  test("scrolls to the canonical testimonial hash", async ({ page }) => {
    await page.goto(`${BASE_URL}/#testimonial-section`);
    await page.waitForLoadState("networkidle");

    const inView = await page.locator("#testimonial-section").evaluate((node) => {
      const rect = node.getBoundingClientRect();
      return rect.top >= -24 && rect.top <= 180;
    });
    expect(inView).toBe(true);
  });

  test("shows featured art preview and links to the archive", async ({ page }) => {
    await page.goto(`${BASE_URL}/#works`);
    await page.waitForLoadState("networkidle");

    await expect(page.locator("#works .todd-art-grid__item")).toHaveCount(4);
    await expect(page.getByRole("link", { name: /See all art/ })).toHaveAttribute(
      "href",
      "/art/",
    );
  });

  test("keeps verified text contrast on key surfaces", async ({ page }) => {
    await page.goto(`${BASE_URL}/#works`);
    await page.waitForLoadState("networkidle");

    const audit = await page.evaluate(() => {
      const parse = (value: string): [number, number, number] => {
        const channels = value.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
        return [channels[0] ?? 0, channels[1] ?? 0, channels[2] ?? 0];
      };
      const contrastRatioLocal = (foreground: string, background: string) => {
        const luminance = ([r, g, b]: [number, number, number]) => {
          const channels = [r, g, b].map((channel) => {
            const normalized = channel / 255;
            return normalized <= 0.03928
              ? normalized / 12.92
              : ((normalized + 0.055) / 1.055) ** 2.4;
          });
          return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722;
        };
        const fg = luminance(parse(foreground));
        const bg = luminance(parse(background));
        return (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
      };

      const paper = getComputedStyle(document.body).backgroundColor;
      const checks = [
        {
          selector: ".todd-art-card__title",
          min: 4.5,
          background: paper,
        },
        {
          selector: ".desktop-nav-links__link--services .desktop-nav-links__label",
          min: 4.5,
          background: paper,
        },
        {
          selector: ".todd-books__eyebrow",
          min: 4.5,
          background: paper,
        },
      ];

      for (const check of checks) {
        const node = document.querySelector(check.selector);
        if (!node) return { ok: false, reason: `missing ${check.selector}` };
        const color = getComputedStyle(node).color;
        const ratio = contrastRatioLocal(color, check.background);
        if (ratio < check.min) {
          return {
            ok: false,
            reason: "contrast below threshold",
            selector: check.selector,
            ratio,
            min: check.min,
            color,
            background: check.background,
          };
        }
      }

      return { ok: true };
    });

    expect(audit.ok, JSON.stringify(audit)).toBe(true);

    await page.goto(`${BASE_URL}/#testimonial-section`);
    await page.waitForLoadState("networkidle");
    const testimonialContrast = await page.evaluate(() => {
      const node = document.querySelector(".todd-testimonial-card__role");
      if (!node) return { ok: false, reason: "missing testimonial role" };
      const color = getComputedStyle(node).color;
      const parse = (value: string): [number, number, number] => {
        const channels = value.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
        return [channels[0] ?? 0, channels[1] ?? 0, channels[2] ?? 0];
      };
      const luminance = ([r, g, b]: [number, number, number]) => {
        const channels = [r, g, b].map((channel) => {
          const normalized = channel / 255;
          return normalized <= 0.03928
            ? normalized / 12.92
            : ((normalized + 0.055) / 1.055) ** 2.4;
        });
        return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722;
      };
      const fg = luminance(parse(color));
      const bg = luminance(parse("rgb(255, 255, 255)"));
      const measured = (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
      return measured >= 4.5 ? { ok: true } : { ok: false, reason: "testimonial role contrast", measured, color };
    });
    expect(testimonialContrast.ok, JSON.stringify(testimonialContrast)).toBe(true);

    await page.goto(`${BASE_URL}/#about`);
    await page.waitForLoadState("networkidle");
    const aboutContrast = await page.evaluate(() => {
      const node = document.querySelector(".todd-about-heading__accent");
      if (!node) return { ok: false, reason: "missing about accent" };
      const color = getComputedStyle(node).color;
      const paper = getComputedStyle(document.body).backgroundColor;
      const parse = (value: string): [number, number, number] => {
        const channels = value.match(/[\d.]+/g)?.slice(0, 3).map(Number) ?? [0, 0, 0];
        return [channels[0] ?? 0, channels[1] ?? 0, channels[2] ?? 0];
      };
      const luminance = ([r, g, b]: [number, number, number]) => {
        const channels = [r, g, b].map((channel) => {
          const normalized = channel / 255;
          return normalized <= 0.03928
            ? normalized / 12.92
            : ((normalized + 0.055) / 1.055) ** 2.4;
        });
        return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722;
      };
      const fg = luminance(parse(color));
      const bg = luminance(parse(paper));
      const measured = (Math.max(fg, bg) + 0.05) / (Math.min(fg, bg) + 0.05);
      return measured >= 4.5 ? { ok: true } : { ok: false, reason: "about accent contrast", measured, color, paper };
    });
    expect(aboutContrast.ok, JSON.stringify(aboutContrast)).toBe(true);
  });

  test("keeps footer links at mobile touch-target size", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(`${BASE_URL}/#contact`);
    await page.waitForLoadState("networkidle");

    const sizes = await page.evaluate(() => {
      const nodes = [
        ...document.querySelectorAll(".todd-footer__phone-11"),
        ...document.querySelectorAll(".todd-contact-email"),
      ];
      return nodes.map((node) => node.getBoundingClientRect());
    });

    expect(sizes.length).toBeGreaterThan(0);
    for (const rect of sizes) {
      expect(Math.min(rect.width, rect.height)).toBeGreaterThanOrEqual(44);
    }
  });

  test("keeps mobile menu email fully visible when open", async ({ page }) => {
    for (const width of [390, 768]) {
      await page.setViewportSize({ width, height: 900 });
      await page.goto(`${BASE_URL}/`);
      await page.waitForLoadState("networkidle");

      const menuButton = page.getByRole("button", { name: "Open menu" });
      await menuButton.click();
      await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

      const emailVisibility = await page.evaluate(() => {
        const nav = document.querySelector("nav[data-nav-open='true']");
        const link = document.querySelector(".nav-phone-contact__link");
        if (!nav || !link) return { ok: false, reason: "missing open menu email link" };

        const navRect = nav.getBoundingClientRect();
        const linkRect = link.getBoundingClientRect();
        const fullyVisible =
          linkRect.top >= navRect.top &&
          linkRect.bottom <= navRect.bottom + 1 &&
          linkRect.height >= 44;

        return fullyVisible
          ? { ok: true }
          : {
              ok: false,
              reason: "menu email clipped or undersized",
              navBottom: navRect.bottom,
              linkTop: linkRect.top,
              linkBottom: linkRect.bottom,
              linkHeight: linkRect.height,
            };
      });

      expect(emailVisibility.ok, JSON.stringify({ width, ...emailVisibility })).toBe(true);

      await page.getByRole("button", { name: "Close menu" }).click();
    }
  });

  test("restores focus after closing the mobile menu with Escape", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");

    const menuButton = page.getByRole("button", { name: "Open menu" });
    await menuButton.focus();
    await menuButton.click();
    await expect(page.getByRole("button", { name: "Close menu" })).toBeVisible();

    await page.keyboard.press("Escape");
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(menuButton).toBeFocused();
  });

  test("keeps FAQ items keyboard operable", async ({ page }) => {
    await page.goto(`${BASE_URL}/#faq`);
    await page.waitForLoadState("networkidle");

    const trigger = page.locator(".faq-accordion__trigger").first();
    await trigger.focus();
    await page.keyboard.press("Enter");
    await expect(trigger).toHaveAttribute("aria-expanded", "true");
  });
});

test.describe("homepage polish affordances", () => {
  test("uses a wider desktop FAQ composition", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/#faq`);
    await page.waitForLoadState("networkidle");

    const layout = await page.evaluate(() => {
      const list = document.querySelector(".todd-faq__list.todd-faq__list-layout");
      const illustration = document.querySelector(
        ".todd-faq__list .todd-intro__wrapper-16",
      );
      if (!list || !illustration) return null;

      const listStyle = getComputedStyle(list);
      const listRect = list.getBoundingClientRect();
      const illustrationRect = illustration.getBoundingClientRect();
      return {
        columns: listStyle.gridTemplateColumns,
        listWidth: listRect.width,
        sideBySide:
          illustrationRect.left > listRect.left + listRect.width * 0.45,
      };
    });

    expect(layout).not.toBeNull();
    expect(layout!.listWidth).toBeGreaterThan(700);
    expect(layout!.columns.split(" ").filter(Boolean).length).toBeGreaterThanOrEqual(3);
    expect(layout!.sideBySide).toBe(true);
  });

  test("keeps the testimonial title to two lines on desktop", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/#testimonial-section`);
    await page.waitForLoadState("networkidle");

    const result = await page.evaluate(() => {
      const title = document.querySelector(
        "#testimonial-section .testimonial-section-title",
      );
      if (!title) return { ok: false, reason: "missing testimonial title" };

      const style = getComputedStyle(title);
      const rect = title.getBoundingClientRect();
      const lineHeight = Number.parseFloat(style.lineHeight) || 1;
      const fontSize = Number.parseFloat(style.fontSize) || 1;
      const estimatedLines = Math.round(rect.height / (lineHeight * fontSize));
      const width = rect.width;

      return {
        ok: estimatedLines <= 2 && width >= 420,
        estimatedLines,
        width,
      };
    });

    expect(result.ok, JSON.stringify(result)).toBe(true);
  });

  test("signals horizontal scroll on mobile books carousels", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/#books`);
    await page.waitForLoadState("networkidle");

    const hints = await page.evaluate(() => {
      const filterReveal = document.querySelector(".todd-books__filter-reveal");
      const shelf = document.querySelector(".todd-books__shelf");
      if (!filterReveal || !shelf) return null;

      const filterHint = getComputedStyle(filterReveal, "::after").content;
      const shelfHint = getComputedStyle(shelf, "::after").content;
      return {
        filterHint,
        shelfHint,
        shelfScrollable: shelf.scrollWidth > shelf.clientWidth + 1,
      };
    });

    expect(hints).not.toBeNull();
    expect(hints!.filterHint).not.toBe("none");
    expect(hints!.shelfHint).not.toBe("none");
    expect(hints!.shelfScrollable).toBe(true);
  });
});

test.describe("homepage nav active section", () => {
  test("marks desktop nav links active after click without reload", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");

    const servicesLink = page.locator(".desktop-nav-links__link--services");
    await servicesLink.click();
    await expect(page).toHaveURL(/#services$/);

    await expect(servicesLink).toHaveClass(/desktop-nav-links__link--active/);
    await expect(servicesLink).toHaveAttribute("aria-current", "page");
    await expect(page.locator(".desktop-nav-links__link--active")).toHaveCount(1);
  });

  test("updates the marker while scrolling without changing the URL hash", async ({
    page,
  }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.goto(`${BASE_URL}/#books`);
    await page.waitForLoadState("networkidle");
    await expect(page.locator(".desktop-nav-links__link--books")).toHaveClass(
      /desktop-nav-links__link--active/,
    );

    await page.evaluate(() => {
      const services = document.querySelector("#services");
      if (!services) return;
      const top = services.getBoundingClientRect().top + window.scrollY - 80;
      window.scrollTo({ top, behavior: "instant" });
    });

    await page.waitForFunction(() => {
      const active = document.querySelector(".desktop-nav-links__link--active");
      return active instanceof HTMLAnchorElement && active.getAttribute("href") === "/#services";
    });

    const state = await page.evaluate(() => {
      const active = document.querySelector(".desktop-nav-links__link--active");
      return {
        hash: window.location.hash,
        activeHref: active instanceof HTMLAnchorElement ? active.getAttribute("href") : null,
      };
    });

    expect(state.hash).toBe("#books");
    expect(state.activeHref).toBe("/#services");
  });

  test("restores the active marker through browser history", async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");

    await page.locator(".desktop-nav-links__link--books").click();
    await expect(page).toHaveURL(/#books$/);
    await expect(page.locator(".desktop-nav-links__link--books")).toHaveClass(
      /desktop-nav-links__link--active/,
    );

    await page.locator(".desktop-nav-links__link--about").click();
    await expect(page).toHaveURL(/#about$/);
    await expect(page.locator(".desktop-nav-links__link--about")).toHaveClass(
      /desktop-nav-links__link--active/,
    );

    await page.goBack();
    await expect(page).toHaveURL(/#books$/);
    await expect(page.locator(".desktop-nav-links__link--books")).toHaveClass(
      /desktop-nav-links__link--active/,
    );
  });

  test("marks the mobile nav link active after selecting a section", async ({ page }) => {
    await page.setViewportSize({ width: 390, height: 900 });
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");

    await page.getByRole("button", { name: "Open menu" }).click();
    await page.locator('#todd-nav-menu a[href="/#about"]').click();
    await expect(page.getByRole("button", { name: "Open menu" })).toBeVisible();
    await expect(page).toHaveURL(/#about$/);

    await expect(page.locator('#todd-nav-menu a[href="/#about"]')).toHaveAttribute(
      "aria-current",
      "page",
    );
  });
});

test.describe("todd global cursor (1440px)", () => {
  test.use({
    viewport: { width: 1440, height: 900 },
    colorScheme: "light",
  });

  test.beforeEach(async ({ page }) => {
    await page.goto(`${BASE_URL}/`);
    await page.waitForLoadState("networkidle");
  });

  test("shows the middle finger after movement over ordinary content", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.mouse.move(640, 420);
    await page.waitForTimeout(180);

    const result = await page.evaluate(() => ({
      hasCursor: Boolean(document.querySelector(".custom-cursor")),
      activeClass: document.documentElement.classList.contains("custom-cursor-active"),
      hasLabel: Boolean(document.querySelector(".custom-cursor__label")),
      cursorZIndex: Number.parseInt(
        getComputedStyle(document.querySelector(".custom-cursor")!).zIndex,
        10,
      ),
      headerZIndex: Number.parseInt(
        getComputedStyle(document.querySelector(".site-header-bar")!).zIndex,
        10,
      ),
      highlighted: document.querySelector(".custom-cursor")?.classList.contains(
        "custom-cursor--highlighted",
      ),
    }));

    expect(result.hasCursor).toBe(true);
    expect(result.activeClass).toBe(true);
    expect(result.hasLabel).toBe(false);
    expect(result.highlighted).toBe(false);
    expect(result.cursorZIndex).toBeGreaterThan(result.headerZIndex);
  });

  test("uses restrained feedback on ordinary interactive controls", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    const navLink = page.locator(".desktop-nav-links__link").first();
    await navLink.hover();
    await page.waitForTimeout(180);

    await expect(page.locator(".custom-cursor")).toHaveClass(/custom-cursor--interactive/);
    await expect(page.locator(".custom-cursor")).not.toHaveClass(
      /custom-cursor--highlighted/,
    );
    await expect(page.locator(".custom-cursor__label")).toHaveCount(0);
  });

  test("shows contextual label on highlight targets", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`${BASE_URL}/#services`);
    await page.waitForLoadState("networkidle");

    const target = page.locator("#services .todd-service-row__link[data-highlight]").first();
    await target.scrollIntoViewIfNeeded();
    await target.hover();
    await page.waitForTimeout(180);

    await expect(page.locator(".custom-cursor")).toHaveClass(/custom-cursor--highlighted/);
    await expect(page.locator(".custom-cursor__label")).toBeVisible();
    await expect(page.locator(".custom-cursor__label")).toHaveText("View");
  });

  test("keeps contextual labels inside viewport edges", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.evaluate(() => {
      const target = document.createElement("button");
      target.type = "button";
      target.dataset.highlight = "true";
      target.dataset.cursorLabel = "Open";
      target.setAttribute("aria-label", "Cursor edge test");
      Object.assign(target.style, {
        position: "fixed",
        right: "0",
        bottom: "0",
        width: "48px",
        height: "48px",
        zIndex: "2",
      });
      document.body.append(target);
    });

    await page.getByRole("button", { name: "Cursor edge test" }).hover();
    await page.waitForTimeout(180);

    await expect(page.locator(".custom-cursor")).toHaveClass(/custom-cursor--flip-x/);
    await expect(page.locator(".custom-cursor")).toHaveClass(/custom-cursor--flip-y/);
    await expect(page.locator(".custom-cursor__label")).toHaveText("Open");
  });

  test("hides when the pointer leaves the document", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.mouse.move(640, 420);
    await page.waitForTimeout(120);
    await page.mouse.move(-20, -20);
    await page.waitForTimeout(120);

    const result = await page.evaluate(() => ({
      hasCursor: Boolean(document.querySelector(".custom-cursor")),
      activeClass: document.documentElement.classList.contains("custom-cursor-active"),
    }));

    expect(result.hasCursor).toBe(false);
    expect(result.activeClass).toBe(false);
  });

  test("stays disabled in forced-colors mode", async ({ page }) => {
    await page.emulateMedia({
      reducedMotion: "no-preference",
      forcedColors: "active",
    });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.mouse.move(640, 420);
    await page.waitForTimeout(180);

    const result = await page.evaluate(() => ({
      hasCursor: Boolean(document.querySelector(".custom-cursor")),
      activeClass: document.documentElement.classList.contains("custom-cursor-active"),
    }));

    expect(result.hasCursor).toBe(false);
    expect(result.activeClass).toBe(false);
  });

  test("stays disabled with reduced motion", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "reduce" });
    await page.reload();
    await page.waitForLoadState("networkidle");
    await page.mouse.move(640, 420);
    await page.waitForTimeout(180);

    const result = await page.evaluate(() => ({
      hasCursor: Boolean(document.querySelector(".custom-cursor")),
      activeClass: document.documentElement.classList.contains("custom-cursor-active"),
    }));

    expect(result.hasCursor).toBe(false);
    expect(result.activeClass).toBe(false);
  });

  test("restores native cursor over native escape zones", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.goto(`${BASE_URL}/#contact`);
    await page.waitForLoadState("networkidle");

    const email = page.locator(".todd-contact-email[data-native-cursor]").first();
    const box = await email.boundingBox();
    expect(box).not.toBeNull();
    await page.mouse.move(box!.x + box!.width / 2, box!.y + box!.height / 2);
    await page.waitForTimeout(180);

    const result = await page.evaluate(() => {
      const emailEl = document.querySelector(".todd-contact-email");
      return {
        hasCursor: Boolean(document.querySelector(".custom-cursor")),
        activeClass: document.documentElement.classList.contains("custom-cursor-active"),
        emailCursor: emailEl ? getComputedStyle(emailEl).cursor : null,
      };
    });

    expect(result.hasCursor).toBe(false);
    expect(result.activeClass).toBe(false);
    expect(result.emailCursor).not.toBe("none");
  });

  test("keeps keyboard focus visible without custom cursor override", async ({ page }) => {
    await page.emulateMedia({ reducedMotion: "no-preference" });
    await page.keyboard.press("Tab");

    const focused = page.locator(":focus-visible");
    await expect(focused).toBeVisible();

    const focusStyle = await focused.evaluate((node) => {
      const style = getComputedStyle(node);
      return {
        outlineWidth: style.outlineWidth,
        outlineStyle: style.outlineStyle,
        cursor: style.cursor,
      };
    });

    expect(Number.parseFloat(focusStyle.outlineWidth)).toBeGreaterThan(0);
    expect(focusStyle.outlineStyle).not.toBe("none");
    expect(focusStyle.cursor).not.toBe("none");
  });
});
