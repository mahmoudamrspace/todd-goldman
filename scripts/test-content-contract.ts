import { readFileSync, readdirSync, statSync } from "node:fs";
import { join } from "node:path";
import { defaultContentRepository } from "@/content/adapters/default";
import {
  appearMapSchema,
  bookSchema,
  HOMEPAGE_APPEAR_IDS,
  HOMEPAGE_SECTION_IDS,
  siteSettingsSchema,
  workSchema,
} from "@/content/schemas";
import appearData from "@/content/data/appear.json";

const FORBIDDEN_PLACEHOLDERS = [
  "Designer cover goes here",
  "Link coming soon",
  "toSneakPeakContent",
  "SneakPeakContent",
  "footerPromo",
] as const;

const HOMEPAGE_SOURCE_DIRS = [
  "src/widgets",
  "src/features",
  "src/content/section-types.ts",
  "src/app/page.tsx",
] as const;

const ROOT = process.cwd();

function assertUniqueIds<T extends { id: string }>(label: string, items: T[]) {
  const seen = new Set<string>();
  for (const item of items) {
    if (seen.has(item.id)) {
      throw new Error(`Duplicate ${label} id: ${item.id}`);
    }
    seen.add(item.id);
  }
}

function isValidHref(href: string): boolean {
  if (href.startsWith("mailto:")) return href.length > "mailto:".length;
  if (href.startsWith("http")) {
    try {
      new URL(href);
      return true;
    } catch {
      return false;
    }
  }
  if (href.startsWith("/#")) return href.length > 2;
  if (href.startsWith("/works/")) return href.length > "/works/".length;
  return href.startsWith("/");
}

function assertNavTargets(nav: { href: string }[]) {
  for (const link of nav) {
    if (!isValidHref(link.href)) {
      throw new Error(`Invalid nav href: ${link.href}`);
    }
    if (link.href.startsWith("http") || link.href.startsWith("mailto:")) continue;
    if (!link.href.startsWith("/#")) {
      throw new Error(`Internal nav href must be an in-page anchor: ${link.href}`);
    }
    const fragment = link.href.split("#")[1];
    if (
      !fragment ||
      !HOMEPAGE_SECTION_IDS.includes(fragment as (typeof HOMEPAGE_SECTION_IDS)[number])
    ) {
      throw new Error(`Nav href targets unknown homepage section: ${link.href}`);
    }
  }
}

function scanPath(absPath: string) {
  if (!statSync(absPath).isDirectory()) {
    const source = readFileSync(absPath, "utf8");
    for (const phrase of FORBIDDEN_PLACEHOLDERS) {
      if (source.includes(phrase)) {
        throw new Error(`Forbidden production placeholder "${phrase}" found in ${absPath}`);
      }
    }
    return;
  }

  for (const entry of readdirSync(absPath)) {
    if (entry.endsWith(".tsx") || entry.endsWith(".ts")) {
      scanPath(join(absPath, entry));
    }
  }
}

function assertNoPlaceholders() {
  for (const rel of HOMEPAGE_SOURCE_DIRS) {
    scanPath(join(ROOT, rel));
  }
}

function collectAnimationComponentIds(absPath: string, ids: Set<string>) {
  if (!statSync(absPath).isDirectory()) {
    const source = readFileSync(absPath, "utf8");
    const componentPattern =
      /<(Appear|HiddenReveal)\b[^>]*\bid=["']([a-zA-Z0-9_-]+)["']/g;
    if (typeof source.matchAll === "function") {
      for (const match of source.matchAll(componentPattern)) {
        if (match[2]) ids.add(match[2]);
      }
    }
    return;
  }

  for (const entry of readdirSync(absPath)) {
    if (entry.endsWith(".tsx")) {
      collectAnimationComponentIds(join(absPath, entry), ids);
    }
  }
}

function assertAppearCoverage() {
  const used = new Set<string>();
  collectAnimationComponentIds(join(ROOT, "src/widgets/sections"), used);
  collectAnimationComponentIds(join(ROOT, "src/widgets/compositions"), used);
  collectAnimationComponentIds(join(ROOT, "src/features"), used);

  const parsedAppear = appearMapSchema.parse(appearData);

  for (const id of used) {
    if (!(id in parsedAppear)) {
      throw new Error(`Appear/HiddenReveal id "${id}" is missing from appear.json`);
    }
    if (!HOMEPAGE_APPEAR_IDS.includes(id as (typeof HOMEPAGE_APPEAR_IDS)[number])) {
      throw new Error(
        `Appear/HiddenReveal id "${id}" is used on the homepage but missing from HOMEPAGE_APPEAR_IDS`,
      );
    }
  }

  for (const id of HOMEPAGE_APPEAR_IDS) {
    if (!(id in parsedAppear)) {
      throw new Error(`Missing appear.json preset for homepage id: ${id}`);
    }
  }
}

function assertHomepageSourceGuards() {
  const servicesSource = readFileSync(
    join(ROOT, "src/widgets/sections/Services.tsx"),
    "utf8",
  );
  const serviceRowSource = readFileSync(
    join(ROOT, "src/features/services/ServiceRow.tsx"),
    "utf8",
  );
  if (/<h1[\s>]/.test(servicesSource) || /<h1[\s>]/.test(serviceRowSource)) {
    throw new Error("Services section must not render service h1 headings");
  }
  if (!/todd-service-row__title/.test(serviceRowSource)) {
    throw new Error("ServiceRow must expose todd-service-row__title class hook");
  }
  if (!/<h3[^>]*todd-service-row__title/.test(serviceRowSource)) {
    throw new Error("ServiceRow must render one h3 title per service");
  }
  if ((serviceRowSource.match(/<a\b/g) ?? []).length !== 1) {
    throw new Error("ServiceRow must render exactly one anchor per service");
  }

  const worksSource = readFileSync(
    join(ROOT, "src/widgets/sections/WorksGallery.tsx"),
    "utf8",
  );
  if (!/todd-works__title/.test(worksSource)) {
    throw new Error("WorksGallery must preserve todd-works__title class contract");
  }
  if (!/todd-works__subtitle/.test(worksSource)) {
    throw new Error("WorksGallery must preserve todd-works__subtitle class contract");
  }
  if (/isMobile\s*\?\s*\(/.test(worksSource)) {
    throw new Error("WorksGallery must not branch markup on isMobile");
  }
  if (!/responsiveVisibleOnly\("mobile"\)/.test(worksSource)) {
    throw new Error("WorksGallery must render mobile list via responsiveVisibleOnly");
  }
  if (!/role="group"/.test(worksSource)) {
    throw new Error("WorksGallery must preserve filter role=group contract");
  }

  const booksSource = readFileSync(
    join(ROOT, "src/widgets/sections/BooksSection.tsx"),
    "utf8",
  );
  if (!/todd-books__title-reveal/.test(booksSource)) {
    throw new Error("BooksSection must preserve todd-books__title-reveal class hook");
  }
  if (!/todd-books__heading-copy/.test(booksSource)) {
    throw new Error("BooksSection must preserve todd-books__heading-copy class hook");
  }
  if (!/aria-controls="todd-books-feature-panel"/.test(booksSource)) {
    throw new Error("BooksSection must associate filters with the feature panel");
  }

  const socialLinksSource = readFileSync(
    join(ROOT, "src/features/footer/SocialLinks.tsx"),
    "utf8",
  );
  if (!/<ul className="todd-footer__links"/.test(socialLinksSource)) {
    throw new Error("SocialLinks must render a list container for footer social links");
  }
  if (/<h3[\s>]/.test(socialLinksSource)) {
    throw new Error("SocialLinks must not use heading elements for social labels");
  }

  const aboutBackgroundSource = readFileSync(
    join(ROOT, "src/features/about/AboutMobileBackground.tsx"),
    "utf8",
  );
  if (/\?width=|\?scale-down-to=/.test(aboutBackgroundSource)) {
    throw new Error("AboutMobileBackground must not use fake static asset query transforms");
  }
  if (!/DecorativeImage/.test(aboutBackgroundSource)) {
    throw new Error("AboutMobileBackground must use DecorativeImage");
  }

  const testimonialSource = readFileSync(
    join(ROOT, "src/widgets/sections/Testimonial.tsx"),
    "utf8",
  );
  if (!/testimonial-section-title/.test(testimonialSource)) {
    throw new Error("Testimonial must preserve testimonial-section-title class contract");
  }
  const testimonialCardCount = (testimonialSource.match(/<TestimonialCard\b/g) ?? []).length;
  if (testimonialCardCount !== 1) {
    throw new Error(
      `Testimonial must render one TestimonialCard per item slot helper, found ${testimonialCardCount}`,
    );
  }

  const footerCreditsSource = readFileSync(
    join(ROOT, "src/features/footer/FooterCredits.tsx"),
    "utf8",
  );
  if (
    /className="[^"]*todd-footer__desktop[^"]*todd-footer__phone[^"]*"/.test(
      footerCreditsSource,
    )
  ) {
    throw new Error(
      "FooterCredits must not combine todd-footer__desktop and todd-footer__phone on one node",
    );
  }

  const faqSource = readFileSync(join(ROOT, "src/widgets/sections/Faq.tsx"), "utf8");
  if (/content\.items\[[0-9]+\]/.test(faqSource)) {
    throw new Error("FAQ section must map items dynamically, not hardcode indexes");
  }
}

async function main() {
  const site = siteSettingsSchema.parse(await defaultContentRepository.getSite());
  const works = (await defaultContentRepository.getWorks()).map((work) =>
    workSchema.parse(work),
  );
  const books = (await defaultContentRepository.getBooks()).map((book) =>
    bookSchema.parse(book),
  );
  appearMapSchema.parse(appearData);

  if (works.length < 8) {
    throw new Error(`Expected at least 8 works, got ${works.length}`);
  }
  if (site.serviceItems.length === 0) {
    throw new Error("Expected at least one service item");
  }
  if (books.length === 0) {
    throw new Error("Expected at least one book");
  }
  if (site.testimonialTitleWords.length !== 3) {
    throw new Error("Expected exactly three testimonial title words");
  }

  assertUniqueIds("work", works);
  assertUniqueIds("book", books);

  for (const work of works) {
    if (!work.gridThumbnail.src || !work.gridThumbnail.alt.trim()) {
      throw new Error(`Work ${work.slug} is missing grid thumbnail alt text`);
    }
  }

  for (const book of books) {
    if (!book.coverAlt.trim()) {
      throw new Error(`Book ${book.id} is missing coverAlt`);
    }
    if (book.href && !isValidHref(book.href)) {
      throw new Error(`Book ${book.id} has invalid href: ${book.href}`);
    }
  }

  for (const service of site.serviceItems) {
    if (!service.href.trim() || !isValidHref(service.href)) {
      throw new Error(`Service "${service.title}" has invalid href: ${service.href}`);
    }
    if (!service.subtitle.trim()) {
      throw new Error(`Service "${service.title}" is missing subtitle`);
    }
  }

  assertNavTargets(site.nav);
  assertAppearCoverage();
  assertNoPlaceholders();
  assertHomepageSourceGuards();

  console.log(
    `PASS: todd (artist=${site.artistName}, works=${works.length}, books=${books.length}, services=${site.serviceItems.length})`,
  );
  console.log("PASS: content contract");
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
});
