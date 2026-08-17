import type { Book, SiteSettings, Work } from "@/content/types";
import type { SceneLayer } from "@/content/todd-scenes";

/** Narrow section interfaces (Interface Segregation). */

export interface HeroContent {
  illustration: string;
}

export interface IntroContent {
  artistName: string;
  greeting: string;
  headline: string;
  email: string;
  phone: string;
  social: SiteSettings["social"];
  nav: SiteSettings["nav"];
}

export interface AboutContent {
  title: string;
  heading: string;
  name: string;
  body: string;
  images: {
    neverGrow: string;
    timeline: string;
    byTheNumbers: string;
    whereArt: string;
  };
  twistedMind: string;
  neverGrowLayers: SceneLayer[];
  email: string;
  phone: string;
  social: SiteSettings["social"];
  clients: string[];
  talks: SiteSettings["talks"];
  awards: SiteSettings["awards"];
  awardsMark: string;
  talksTitle: string;
  clientsTitle: string;
  awardsTitle: string;
}

export interface ServiceItem {
  title: string;
  subtitle: string;
  href: string;
}

export interface ServicesContent {
  items: ServiceItem[];
  decor: string;
  title: string;
}

export interface TestimonialContent {
  items: SiteSettings["testimonials"];
  titleWords: string[];
  icons: string[];
}

export interface FaqContent {
  items: SiteSettings["faqs"];
  title: string;
  subtitleLead: string;
  subtitleEmphasis: string;
  subtitleTail: string;
  decor: string;
}

export interface FooterContent {
  headline: {
    lead: string;
    emphasis: string;
    middle: string;
    secondEmphasis: string;
    tail: string;
  };
  madeBy: string;
  copyright: string;
  mark: string;
  sceneLayers: SceneLayer[];
  email: string;
  phone: string;
  nav: SiteSettings["nav"];
  social: SiteSettings["social"];
}

export interface BooksContent {
  eyebrow: string;
  titleLead: string;
  titleEmphasis: string;
  description: string;
  decor: string;
  books: Book[];
}

export interface WorksContent {
  works: Work[];
  titleWords: string[];
  subtitle: string;
}

export interface WorkDetailNavLabels {
  prevFull: string;
  nextFull: string;
  prevShort: string;
  nextShort: string;
}

export function toHeroContent(site: SiteSettings): HeroContent {
  return {
    illustration: site.heroIllustration,
  };
}

export function toAboutContent(site: SiteSettings): AboutContent {
  return {
    title: site.aboutTitle,
    heading: site.aboutHeading,
    name: site.aboutName,
    body: site.about,
    images: site.aboutImages,
    twistedMind: site.aboutTwistedMind,
    neverGrowLayers: site.aboutNeverGrowLayers,
    email: site.email,
    phone: site.phone,
    social: site.social,
    clients: site.clients,
    talks: site.talks,
    awards: site.awards,
    awardsMark: site.awardsMark,
    talksTitle: site.aboutTalksTitle,
    clientsTitle: site.aboutClientsTitle,
    awardsTitle: site.aboutAwardsTitle,
  };
}

export function toServicesContent(site: SiteSettings): ServicesContent {
  return {
    items: site.serviceItems,
    decor: site.servicesDecor,
    title: site.servicesTitle,
  };
}

export function toTestimonialContent(site: SiteSettings): TestimonialContent {
  return {
    items: site.testimonials,
    titleWords: site.testimonialTitleWords,
    icons: site.testimonialIcons,
  };
}

export function toFaqContent(site: SiteSettings): FaqContent {
  return {
    items: site.faqs,
    title: site.faqTitle,
    subtitleLead: site.faqSubtitleLead,
    subtitleEmphasis: site.faqSubtitleEmphasis,
    subtitleTail: site.faqSubtitleTail,
    decor: site.faqDecor,
  };
}

export function toFooterContent(site: SiteSettings): FooterContent {
  return {
    headline: {
      lead: site.footerHeadlineLead,
      emphasis: site.footerHeadlineEmphasis,
      middle: site.footerHeadlineMiddle,
      secondEmphasis: site.footerHeadlineSecondEmphasis,
      tail: site.footerHeadlineTail,
    },
    madeBy: site.footerMadeBy,
    copyright: site.footerCopyright,
    mark: site.footerMark,
    sceneLayers: site.footerSceneLayers,
    email: site.email,
    phone: site.phone,
    nav: site.nav,
    social: site.social,
  };
}

export function toBooksContent(site: SiteSettings, books: Book[]): BooksContent {
  return {
    eyebrow: site.booksEyebrow,
    titleLead: site.booksTitleLead,
    titleEmphasis: site.booksTitleEmphasis,
    description: site.booksDescription,
    decor: site.booksDecor,
    books,
  };
}

export function toWorksContent(works: Work[], site: SiteSettings): WorksContent {
  return {
    works,
    titleWords: site.worksTitleWords,
    subtitle: site.worksSubtitle,
  };
}

export function toIntroContent(site: SiteSettings): IntroContent {
  return {
    artistName: site.artistName,
    greeting: site.heroGreeting,
    headline: site.heroHeadline,
    email: site.email,
    phone: site.phone,
    social: site.social,
    nav: site.nav,
  };
}

export function toWorkDetailNavLabels(site: SiteSettings): WorkDetailNavLabels {
  return {
    prevFull: site.workNavPrevFull,
    nextFull: site.workNavNextFull,
    prevShort: site.workNavPrevShort,
    nextShort: site.workNavNextShort,
  };
}
