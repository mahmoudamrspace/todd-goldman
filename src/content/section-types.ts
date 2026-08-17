import type { SiteSettings, Work } from "@/content/types";
import type { SceneLayer } from "@/content/todd-scenes";

/** Narrow section interfaces (Interface Segregation). */

export interface HeroContent {
  greeting: string;
  headline: string;
  illustration: string;
  layers: SceneLayer[];
  artistName: string;
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
  images: string[];
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

export interface ServicesContent {
  items: string[];
  decor: string;
  title: string;
  subtitles: string[];
  headlines: string[];
  links: { href: string }[];
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
  promo: string;
  promoHref: string;
  mark: string;
  sceneLayers: SceneLayer[];
  email: string;
  phone: string;
  nav: SiteSettings["nav"];
  social: SiteSettings["social"];
}

export interface SneakPeakContent {
  images: string[];
  imageAlts: string[];
  titleWords: string[];
  decor: string;
}

export interface WorksContent {
  works: Work[];
  titleWords: string[];
}

export interface WorkDetailNavLabels {
  prevFull: string;
  nextFull: string;
  prevShort: string;
  nextShort: string;
}

export function toHeroContent(site: SiteSettings): HeroContent {
  return {
    greeting: site.heroGreeting,
    headline: site.heroHeadline,
    illustration: site.heroIllustration,
    layers: site.heroLayers,
    artistName: site.artistName,
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
    items: site.services,
    decor: site.servicesDecor,
    title: site.servicesTitle,
    subtitles: site.servicesSubtitles,
    headlines: site.servicesHeadlines,
    links: site.serviceLinks,
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
    promo: site.footerPromo,
    promoHref: site.footerPromoHref,
    mark: site.footerMark,
    sceneLayers: site.footerSceneLayers,
    email: site.email,
    phone: site.phone,
    nav: site.nav,
    social: site.social,
  };
}

export function toSneakPeakContent(site: SiteSettings): SneakPeakContent {
  return {
    images: site.sneakPeakImages,
    imageAlts: site.sneakPeakImageAlts,
    titleWords: site.sneakPeakTitleWords,
    decor: site.sneakPeakDecor,
  };
}

export function toWorksContent(works: Work[], site: SiteSettings): WorksContent {
  return { works, titleWords: site.worksTitleWords };
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
