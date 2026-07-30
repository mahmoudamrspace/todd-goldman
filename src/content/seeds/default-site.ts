import type { SiteSettings } from "@/content/types";
import { referenceSiteSeed } from "@/content/seeds/reference-site";

/** Production content profile — Todd Goldman branding. */
export const defaultSiteSeed: SiteSettings = {
  ...referenceSiteSeed,
  artistName: "Todd Goldman",
  heroGreeting: "Never Grow Up.",
  heroHeadline:
    "I draw like a fifth grader, think like a smart-ass, and make art that makes people laugh.",
  aboutTitle: "The twisted mind behind the work",
  aboutHeading: "Never Grow Up",
  aboutName: "Todd Goldman",
  about:
    "Artist, designer, and lifelong doodler. Todd built David & Goliath into a pop-art brand worn by millions, then kept going — paintings, books, apparel, and collaborations that turn adult humor into childlike joy. His goal is simple: make people laugh.",
  email: "studio@toddgoldman.com",
  phone: "",
  nav: [
    { label: "Art", href: "/#works" },
    { label: "About", href: "/#about" },
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
  worksTitleWords: ["Selected", "art"],
  sneakPeakTitleWords: ["Sketchbook", "wall"],
  faqTitle: "FAQ",
  faqSubtitleLead: "Questions, ",
  faqSubtitleEmphasis: "answered",
  faqSubtitleTail: " with a straight face",
  aboutTalksTitle: "Creative timeline",
  aboutClientsTitle: "Where art lives",
  aboutAwardsTitle: "BY THE NUMBERS",
  workNavPrevFull: "Previous piece",
  workNavNextFull: "Next piece",
  workNavPrevShort: "Previous",
  workNavNextShort: "Next",
  faqs: [
    {
      question: "What kind of art do you make?",
      answer:
        "Bold, childlike illustration with dry humor and pop-culture punchlines — originals, prints, books, and licensed merchandise.",
    },
    {
      question: "Can I license your work?",
      answer:
        "Yes. Reach out through the contact form with your project details and we'll talk about licensing, collaborations, and custom work.",
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
        "This site showcases Todd's creative worlds. Placeholder artwork is used in development until final assets are loaded.",
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
    { city: "2000", event: "David & Goliath founded", year: "Clearwater, FL" },
    { city: "2005", event: "First book published", year: "Boys Are Stupid…" },
    { city: "2010s", event: "Gallery & retail expansion", year: "Los Angeles" },
    { city: "Today", event: "Todd Art™ continues", year: "Never Grow Up" },
  ],
  awards: [
    { name: "Paintings sold", result: "4,000+", year: "Originals" },
    { name: "Books published", result: "50+", year: "Titles" },
    { name: "Prints sold", result: "250,000+", year: "Collectors" },
    { name: "Retail reach", result: "Global", year: "Merchandise" },
  ],
  footerMadeBy: "LAX ART STUDIO",
  footerCopyright: "Copyright © 2026, Todd Goldman",
  footerPromo: "",
  footerPromoHref: "",
  metaTitle: "Todd Goldman — Never Grow Up",
  metaDescription:
    "Official portfolio of Todd Goldman — bold illustration, humor, licensing, and creative collaborations.",
};
