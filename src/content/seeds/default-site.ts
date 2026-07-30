import type { SiteSettings } from "@/content/types";
import { referenceSiteSeed } from "@/content/seeds/reference-site";

/** Production content profile — Todd Goldman branding. */
export const defaultSiteSeed: SiteSettings = {
  ...referenceSiteSeed,
  artistName: "Todd Goldman",
  aboutName: "Todd Goldman",
  about:
    "Artist and entrepreneur known for bold, humorous illustration and pop-culture-driven visual storytelling. Todd Goldman’s work spans licensing, publishing, and brand collaborations worldwide.",
  heroHeadline:
    "I am an artist and illustrator creating bold, playful work for brands, publishers, and collectors.",
  email: "studio@toddgoldman.com",
  footerMadeBy: "LAX ART STUDIO",
  footerCopyright: "Copyright © 2026, Todd Goldman",
  footerPromo: "",
  footerPromoHref: "",
  metaTitle: "Todd Goldman — Artist & Illustrator",
  metaDescription:
    "Official portfolio of Todd Goldman — bold illustration, licensing, and creative collaborations.",
};
