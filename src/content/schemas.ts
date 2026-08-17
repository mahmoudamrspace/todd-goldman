import { z } from "zod";

export const workImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string(),
});

export const sceneLayerSchema = z.object({
  src: z.string().min(1),
  role: z.enum(["base", "mid", "particle"]).optional(),
  idle: z.enum(["none", "bob", "wiggle"]).optional(),
  delay: z.number().optional(),
  scatter: z
    .object({
      x: z.number(),
      y: z.number(),
      scale: z.number().optional(),
      rotate: z.number().optional(),
    })
    .optional(),
  inlineAnim: z.boolean().optional(),
});

export const workAccentToneSchema = z.enum(["red", "yellow", "blue", "green"]);

export const bookAccentSchema = z.enum([
  "red",
  "yellow",
  "blue",
  "green",
  "orange",
  "pink",
  "purple",
  "aqua",
]);

export const bookSchema = z.object({
  id: z.string().min(1),
  title: z.string().min(1),
  year: z.string(),
  category: z.string(),
  credit: z.string(),
  description: z.string(),
  cover: z.string(),
  coverAlt: z.string(),
  accent: bookAccentSchema,
  isbn: z.string(),
  href: z.string(),
  featured: z.boolean(),
});

export const serviceItemSchema = z.object({
  title: z.string().min(1),
  subtitle: z.string(),
  href: z.string().min(1),
});

export const navLinkSchema = z.object({
  label: z.string().min(1),
  href: z.string().min(1),
});

/** Motion preset fields validated for appear.json breakpoint entries. */
export const appearBreakpointPresetSchema = z
  .object({
    initial: z.record(z.string(), z.unknown()).optional(),
    animate: z.record(z.string(), z.unknown()).optional(),
    exit: z.record(z.string(), z.unknown()).optional(),
    transition: z.record(z.string(), z.unknown()).optional(),
    viewport: z
      .object({
        once: z.boolean().optional(),
        amount: z.number().optional(),
        margin: z.string().optional(),
      })
      .optional(),
  })
  .passthrough();

export const appearPresetSchema = z.record(
  z.string(),
  z.union([appearBreakpointPresetSchema, z.null()]),
);

/** Motion preset map keyed by Appear id. */
export const appearMapSchema = z.record(z.string(), appearPresetSchema);

export const aboutImagesSchema = z.object({
  neverGrow: z.string().min(1),
  timeline: z.string().min(1),
  byTheNumbers: z.string().min(1),
  whereArt: z.string().min(1),
});

export const workSchema = z.object({
  id: z.string(),
  slug: z.string().min(1),
  title: z.string().min(1),
  describe: z.string(),
  client: z.string(),
  date: z.string(),
  services: z.string(),
  gridThumbnail: workImageSchema,
  hoverPreview: workImageSchema,
  detailHero: workImageSchema,
  gallery: z.array(workImageSchema),
  prevSlug: z.string().nullable(),
  nextSlug: z.string().nullable(),
  relatedTitle: z.string(),
  category: z.string().optional(),
  hook: z.string().optional(),
  accentTone: workAccentToneSchema.optional(),
  featured: z.boolean().optional(),
  ctaHref: z.string().optional(),
  ctaLabel: z.string().optional(),
});

export const siteSettingsSchema = z.object({
  artistName: z.string(),
  heroGreeting: z.string(),
  heroHeadline: z.string(),
  heroIllustration: z.string(),
  heroLayers: z.array(sceneLayerSchema),
  aboutTitle: z.string(),
  aboutHeading: z.string(),
  aboutName: z.string(),
  about: z.string(),
  aboutImages: aboutImagesSchema,
  aboutTwistedMind: z.string(),
  aboutNeverGrowLayers: z.array(sceneLayerSchema),
  email: z.string(),
  phone: z.string(),
  nav: z.array(navLinkSchema).min(1),
  social: z.array(navLinkSchema),
  serviceItems: z.array(serviceItemSchema).min(1),
  servicesDecor: z.string(),
  servicesTitle: z.string(),
  worksTitleWords: z.array(z.string()).min(1),
  worksSubtitle: z.string(),
  booksEyebrow: z.string(),
  booksTitleLead: z.string(),
  booksTitleEmphasis: z.string(),
  booksDescription: z.string(),
  booksDecor: z.string(),
  testimonialTitleWords: z.array(z.string()).length(3),
  faqTitle: z.string(),
  faqSubtitleLead: z.string(),
  faqSubtitleEmphasis: z.string(),
  faqSubtitleTail: z.string(),
  faqDecor: z.string(),
  aboutTalksTitle: z.string(),
  aboutClientsTitle: z.string(),
  aboutAwardsTitle: z.string(),
  workNavPrevFull: z.string(),
  workNavNextFull: z.string(),
  workNavPrevShort: z.string(),
  workNavNextShort: z.string(),
  testimonials: z.array(
    z.object({
      quote: z.string(),
      author: z.string(),
      role: z.string(),
      tone: z.enum(["white", "blue", "green"]),
    }),
  ),
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })).min(1),
  clients: z.array(z.string()),
  talks: z.array(
    z.object({ year: z.string(), milestone: z.string(), location: z.string() }),
  ),
  awards: z.array(
    z.object({ name: z.string(), result: z.string(), year: z.string() }),
  ),
  awardsMark: z.string(),
  testimonialIcons: z.array(z.string()),
  footerHeadlineLead: z.string(),
  footerHeadlineEmphasis: z.string(),
  footerHeadlineMiddle: z.string(),
  footerHeadlineSecondEmphasis: z.string(),
  footerHeadlineTail: z.string(),
  footerMadeBy: z.string(),
  footerCopyright: z.string(),
  footerMark: z.string(),
  footerSceneLayers: z.array(sceneLayerSchema),
  metaTitle: z.string(),
  metaDescription: z.string(),
});

/** Homepage Appear animation ids that must exist in appear.json. */
export const HOMEPAGE_APPEAR_IDS = [
  "10mg3pr",
  "1xtpeth",
  "10d8ozj",
  "i446vz",
  "zq3mu5",
  "17sob6t",
  "qj8w5o",
  "1vmjjvi",
  "1okuu50",
  "10qxt3k",
  "15capyb",
  "1i8t5dv",
  "87ac2n",
  "yxvyew",
  "1i5tzip",
  "1mevtjy",
  "4t58ou",
] as const;

/** Required in-page navigation anchors for homepage nav links. */
export const HOMEPAGE_SECTION_IDS = [
  "works",
  "books",
  "services",
  "about",
  "contact",
  "faq",
  "testimonial-section",
  "text_intro",
] as const;
