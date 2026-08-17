import type { SiteSettings } from "@/content/types";
import {
  aboutNeverGrowLayers,
  contactSceneLayers,
  heroSceneLayers,
  toddSceneArt,
} from "@/content/todd-scenes";
import { toddHeroIllustration } from "@/content/todd-hero-pieces";

/** Production Todd Goldman site content. */
export const defaultSiteSeed: SiteSettings = {
  artistName: "Todd Goldman",
  heroGreeting: "Never Grow Up.",
  heroHeadline:
    "I draw like a fifth grader, think like a smart-ass, and make art that makes people laugh.",
  heroIllustration: toddHeroIllustration,
  heroLayers: heroSceneLayers,
  aboutTitle: "The twisted mind behind the work",
  aboutHeading: "Never Grow Up",
  aboutName: "Todd Goldman",
  about:
    "Artist, designer, and lifelong doodler. Todd built David & Goliath into a pop-art brand worn by millions, then kept going — paintings, books, apparel, and collaborations that turn adult humor into childlike joy. His goal is simple: make people laugh.",
  aboutImages: [
    toddSceneArt.neverGrowUpCard,
    toddSceneArt.timelineCard,
    toddSceneArt.byTheNumbersCard,
    toddSceneArt.whereArtCard,
  ],
  aboutTwistedMind: toddSceneArt.twistedMind,
  aboutNeverGrowLayers: aboutNeverGrowLayers,
  email: "studio@toddgoldman.com",
  phone: "",
  nav: [
    { label: "Art", href: "/#works" },
    { label: "About", href: "/#about" },
    { label: "Shop", href: "https://www.toddart.com/" },
    { label: "Contact", href: "/#contact" },
  ],
  social: [
    { label: "Instagram", href: "https://www.instagram.com/toddartshop/" },
    { label: "Shop", href: "https://www.toddart.com/" },
    { label: "Facebook", href: "https://www.facebook.com/artoftoddgoldman/" },
  ],
  services: [
    "ORIGINAL ART",
    "BOOKS & PUBLISHING",
    "APPAREL & LICENSING",
    "COLLABORATIONS",
  ],
  servicesDecor: "/assets/images/image-51a40ab0.svg",
  servicesTitle: "Ways the art lives",
  servicesSubtitles: [
    "/ Canvas & prints",
    "/ 50+ titles",
    "/ David & Goliath",
    "/ Brand partners",
  ],
  servicesHeadlines: [
    "ORIGINAL ART",
    "BOOKS & PUBLISHING",
    "APPAREL & LICENSING",
    "COLLABORATIONS",
  ],
  serviceLinks: [
    { href: "/#works" },
    { href: "/works/monochrome-journal" },
    { href: "https://www.toddart.com/" },
    { href: "mailto:studio@toddgoldman.com?subject=Collaboration%20inquiry" },
  ],
  worksTitleWords: ["Selected", "art"],
  sneakPeakTitleWords: ["Sketchbook", "wall"],
  sneakPeakDecor: toddSceneArt.sneakPeakDecor,
  testimonialTitleWords: ["What", "nice", "People say"],
  faqTitle: "FAQ",
  faqSubtitleLead: "Questions, ",
  faqSubtitleEmphasis: "answered",
  faqSubtitleTail: " with a straight face",
  faqDecor: toddSceneArt.faqDecor,
  aboutTalksTitle: "Creative timeline",
  aboutClientsTitle: "Where art lives",
  aboutAwardsTitle: "BY THE NUMBERS",
  workNavPrevFull: "Previous piece",
  workNavNextFull: "Next piece",
  workNavPrevShort: "Previous",
  workNavNextShort: "Next",
  testimonials: [
    {
      author: "Retail partner",
      role: "licensing & merchandise",
      quote:
        "Todd's characters travel everywhere — from gallery walls to mugs on kitchen counters. The humor lands instantly and keeps selling season after season.",
      tone: "white",
    },
    {
      author: "Gallery director",
      role: "exhibitions & originals",
      quote:
        "There's a fearless honesty in the work. Childlike on the surface, razor-sharp underneath — collectors respond to that balance immediately.",
      tone: "blue",
    },
    {
      author: "Publishing editor",
      role: "books & media",
      quote:
        "Fifty-plus titles and counting. Todd turns blunt one-liners into worlds people want to live inside — on the page, on a shirt, everywhere.",
      tone: "white",
    },
    {
      author: "Brand collaborator",
      role: "custom projects",
      quote:
        "He shows up with the doodle energy of a kid and the discipline of a studio that has shipped millions of units. Rare combination.",
      tone: "green",
    },
  ],
  faqs: [
    {
      question: "What kind of art do you make?",
      answer:
        "Bold, childlike illustration with dry humor and pop-culture punchlines — originals, prints, books, and licensed merchandise.",
    },
    {
      question: "Can I license your work?",
      answer:
        "Yes. Email studio@toddgoldman.com with your project details and we'll talk about licensing, collaborations, and custom work.",
    },
    {
      question: "Do you take commissions?",
      answer:
        "Select commissions and collaborations are considered. Share your idea, timeline, and budget to get the conversation started.",
    },
    {
      question: "Where can I buy originals and prints?",
      answer:
        "Visit toddart.com for current collections, prints, and merchandise from the Todd Art shop.",
    },
    {
      question: "Is this the official portfolio?",
      answer:
        "Yes — this site showcases Todd's creative worlds across originals, books, apparel, and collaborations.",
    },
    {
      question: "How do I get in touch?",
      answer:
        "Email studio@toddgoldman.com or use the contact section below for licensing, press, and collaboration inquiries.",
    },
  ],
  clients: [
    "Original paintings",
    "Limited prints",
    "Books & publishing",
    "David & Goliath apparel",
    "Licensed merchandise",
    "Gallery exhibitions",
    "Brand collaborations",
    "Custom commissions",
  ],
  talks: [
    { year: "2000", milestone: "David & Goliath founded", location: "Clearwater, FL" },
    { year: "2005", milestone: "First book published", location: "Boys Are Stupid…" },
    { year: "2010s", milestone: "Gallery & retail expansion", location: "Los Angeles" },
    { year: "Today", milestone: "Todd Art™ continues", location: "Never Grow Up" },
  ],
  awards: [
    { name: "Paintings sold", result: "4,000+", year: "Originals" },
    { name: "Books published", result: "50+", year: "Titles" },
    { name: "Prints sold", result: "250,000+", year: "Collectors" },
    { name: "Retail reach", result: "Global", year: "Merchandise" },
  ],
  awardsMark: toddSceneArt.byTheNumbersCard,
  sneakPeakImages: [
    toddSceneArt.neverGrowUpCard,
    toddSceneArt.timelineCard,
    toddSceneArt.whereArtCard,
    toddSceneArt.byTheNumbersCard,
    toddSceneArt.twistedMind,
    toddSceneArt.faqDecor,
    toddSceneArt.sneakPeakDecor,
    "/assets/todd-scenes/hero/base.svg",
    ...toddSceneArt.testimonialIcons,
  ],
  sneakPeakImageAlts: [
    "Todd artwork — Never Grow Up",
    "Todd artwork — creative timeline",
    "Todd artwork — where art lives",
    "Todd artwork — by the numbers",
    "Todd artwork — the twisted mind",
    "Todd artwork — FAQ characters",
    "Todd artwork — smiling paint palette",
    "Todd artwork — welcome scene",
    "Todd artwork — testimonial character one",
    "Todd artwork — testimonial character two",
    "Todd artwork — testimonial character three",
    "Todd artwork — testimonial character four",
  ],
  testimonialIcons: [...toddSceneArt.testimonialIcons],
  footerHeadlineLead: "Got ",
  footerHeadlineEmphasis: "a ridiculous idea?",
  footerHeadlineMiddle: " Perfect. ",
  footerHeadlineSecondEmphasis: "Let's make it fun.",
  footerHeadlineTail: "",
  footerMadeBy: "LAX ART STUDIO",
  footerCopyright: "Copyright © 2026, Todd Goldman",
  footerPromo: "Visit the Todd Art shop",
  footerPromoHref: "https://www.toddart.com/",
  footerMark: "/assets/todd-scenes/contact/scene.svg",
  footerSceneLayers: contactSceneLayers,
  metaTitle: "Todd Goldman — Never Grow Up",
  metaDescription:
    "Official portfolio of Todd Goldman — bold illustration, humor, licensing, and creative collaborations.",
};
