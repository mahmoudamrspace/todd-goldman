import { z } from "zod";

export const workImageSchema = z.object({
  src: z.string().min(1),
  alt: z.string(),
});

export const workAccentToneSchema = z.enum(["red", "yellow", "blue", "green"]);

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
  /** Todd profile: creative world grouping */
  category: z.string().optional(),
  /** Todd profile: short punchline shown on cards */
  hook: z.string().optional(),
  /** Todd profile: card accent color */
  accentTone: workAccentToneSchema.optional(),
  /** Todd profile: large gallery tile */
  featured: z.boolean().optional(),
  /** Optional outbound CTA (e.g. shop link) */
  ctaHref: z.string().optional(),
  ctaLabel: z.string().optional(),
});

export const siteSettingsSchema = z.object({
  artistName: z.string(),
  heroGreeting: z.string(),
  heroHeadline: z.string(),
  heroIllustration: z.string(),
  aboutTitle: z.string(),
  aboutHeading: z.string(),
  aboutName: z.string(),
  about: z.string(),
  aboutImages: z.array(z.string()),
  email: z.string(),
  phone: z.string(),
  nav: z.array(z.object({ label: z.string(), href: z.string() })),
  social: z.array(z.object({ label: z.string(), href: z.string() })),
  services: z.array(z.string()),
  servicesDecor: z.string(),
  servicesTitle: z.string(),
  servicesSubtitles: z.array(z.string()),
  servicesHeadlines: z.array(z.string()),
  serviceLinks: z.array(z.object({ href: z.string() })),
  worksTitleWords: z.array(z.string()),
  sneakPeakTitleWords: z.array(z.string()),
  testimonialTitleWords: z.array(z.string()),
  faqTitle: z.string(),
  faqSubtitleLead: z.string(),
  faqSubtitleEmphasis: z.string(),
  faqSubtitleTail: z.string(),
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
  faqs: z.array(z.object({ question: z.string(), answer: z.string() })),
  clients: z.array(z.string()),
  talks: z.array(
    z.object({ year: z.string(), milestone: z.string(), location: z.string() }),
  ),
  sneakPeakImageAlts: z.array(z.string()),
  awards: z.array(
    z.object({ name: z.string(), result: z.string(), year: z.string() }),
  ),
  awardsMark: z.string(),
  sneakPeakImages: z.array(z.string()),
  footerMadeBy: z.string(),
  footerCopyright: z.string(),
  footerPromo: z.string(),
  footerPromoHref: z.string(),
  footerMark: z.string(),
  metaTitle: z.string(),
  metaDescription: z.string(),
});
