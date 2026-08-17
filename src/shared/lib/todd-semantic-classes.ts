import { cn } from "@/shared/lib/cn";

/**
 * Semantic class map for the Todd home page.
 * Use these instead of opaque legacy export hash classes in TSX and CSS.
 *
 * Migration status:
 * - Section roots and layout hooks are semantic (`todd-*`).
 * - legacy export hash classes remain as compatibility aliases until layout is fully decoupled.
 * - Responsive visibility uses `responsiveShell` / `responsiveVisibleOnly` helpers.
 * - Typography uses `todd-text`, `todd-heading` from todd-typography.css alongside `todd-text`.
 */
export const TODD = {
  page: {
    shell: "todd-page-shell",
    root: "todd-page-root",
    content: "site-page-content",
    sections: "site-page-sections",
  },
  hero: {
    section: "todd-hero",
    container: "todd-hero__container",
    illustration: "todd-hero__illustration",
    mobileFallback: "todd-hero__mobile-fallback",
  },
  intro: {
    section: "todd-intro",
    container: "todd-intro__container",
    wrapper: "todd-intro__wrapper",
    title: "todd-intro__title",
    greeting: "todd-intro__greeting",
    headline: "todd-intro__headline",
    decorTeapot: "todd-intro__decor-teapot",
    decorNeverGrowUp: "todd-intro__decor-never-grow-up",
    scribble: "todd-intro__scribble",
  },
  books: {
    section: "todd-books",
  },
  services: {
    section: "todd-services",
    container: "todd-services__container",
    title: "todd-services__title",
    list: "todd-services__list",
    row: "todd-services__row",
  },
  testimonial: {
    section: "todd-testimonials",
    container: "todd-testimonials__container",
    title: "todd-testimonials__title",
    stack: "todd-testimonials__stack",
    cardSlot: "todd-testimonials__card-slot",
  },
  about: {
    section: "todd-about",
    container: "todd-about__container",
    block: "todd-about__block",
    card: "todd-about__card",
    cardWrapper: "todd-about__card-wrapper",
    cardContent: "todd-about__card-content",
    cardImage: "todd-about__card-image",
  },
  faq: {
    section: "todd-faq-section",
    container: "todd-faq-section__container",
    wrapper: "todd-faq",
    title: "todd-faq__title",
    list: "todd-faq__list",
    item: "todd-faq__item",
  },
  footer: {
    section: "todd-footer",
    titleArea: "todd-footer__title-area",
    stage: "todd-contact-stage",
    art: "todd-contact-art",
    headline: "todd-contact-headline",
    credits: "todd-contact-credits",
  },
  card: {
    shell: "todd-card-shell",
    shellInset: "todd-card-shell--inset",
    pad: "todd-card-pad",
  },
  typography: {
    body: "todd-text",
    emphasis: "todd-text-emphasis",
  },
} as const;

export type ToddBreakpoint = "mobile" | "tablet" | "desktop";

const BREAKPOINT_HIDE: Record<ToddBreakpoint, string> = {
  mobile: "todd-hide-mobile",
  tablet: "todd-hide-tablet",
  desktop: "todd-hide-desktop",
};

const FOOTER_BREAKPOINT_HIDE: Record<ToddBreakpoint, string> = {
  mobile: "todd-hide-mobile",
  tablet: "todd-hide-tablet",
  desktop: "todd-hide-desktop",
};

/** Hide the shell at a single breakpoint (legacy export `hidden-*` convention). */
export function responsiveHiddenOn(
  breakpoint: ToddBreakpoint,
  ...extra: Array<string | false | null | undefined>
): string {
  return cn(
    "ssr-variant",
    "todd-responsive-variant",
    `todd-responsive-variant--hide-${breakpoint}`,
    BREAKPOINT_HIDE[breakpoint],
    ...extra,
  );
}

/**
 * @deprecated Prefer `responsiveHiddenOn` or `responsiveVisibleOnly` — name reflects legacy export hide class, not visibility.
 */
export const responsiveShell = responsiveHiddenOn;

/** Show content only at the listed breakpoints (hides at all others). */
export function responsiveVisibleOnly(
  ...visibleAt: ToddBreakpoint[]
): string {
  const all: ToddBreakpoint[] = ["mobile", "tablet", "desktop"];
  const hiddenAt = all.filter((bp) => !visibleAt.includes(bp));
  return cn(
    "ssr-variant",
    "todd-responsive-variant",
    ...hiddenAt.map((bp) => BREAKPOINT_HIDE[bp]),
  );
}

/** Footer uses a separate legacy export visibility family. */
export function footerResponsiveShell(
  breakpoint: ToddBreakpoint,
  ...extra: Array<string | false | null | undefined>
): string {
  return cn(
    "ssr-variant",
    "todd-responsive-variant",
    `todd-responsive-variant--footer-${breakpoint}`,
    FOOTER_BREAKPOINT_HIDE[breakpoint],
    ...extra,
  );
}

/** Show footer content only at the listed breakpoints. */
export function footerResponsiveVisibleOnly(
  ...visibleAt: ToddBreakpoint[]
): string {
  const all: ToddBreakpoint[] = ["mobile", "tablet", "desktop"];
  const hiddenAt = all.filter((bp) => !visibleAt.includes(bp));
  return cn(
    "ssr-variant",
    "todd-responsive-variant",
    ...hiddenAt.map((bp) => FOOTER_BREAKPOINT_HIDE[bp]),
  );
}

/** Open/closed state hook for FAQ and nav variants. */
export function toddState(state: string): string {
  return `todd-state--${state}`;
}
