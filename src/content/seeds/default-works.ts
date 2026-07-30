import type { Work } from "@/content/types";
import { referenceWorksSeed } from "@/content/seeds/reference-works";

/** Placeholder artwork mapping — same image paths as reference until licensed assets arrive. */
const PLACEHOLDER_NOTE =
  "Placeholder artwork for layout development. Final Todd Goldman pieces will replace these images.";

/** Production works — Todd creative worlds with placeholder media. */
export const defaultWorksSeed: Work[] = [
  {
    ...referenceWorksSeed[0]!,
    title: "Never Grow Up",
    describe: `${PLACEHOLDER_NOTE} A flagship canvas series celebrating childlike humor, blunt punchlines, and the belief that growing up is optional.`,
    client: "Original Art",
    date: "2024",
    services: "Canvas & acrylic",
    category: "Original Art",
    hook: "Growing up is optional.",
    accentTone: "yellow",
    featured: true,
    gridThumbnail: {
      src: referenceWorksSeed[0]!.gridThumbnail.src,
      alt: "Never Grow Up — placeholder artwork",
    },
    hoverPreview: {
      src: referenceWorksSeed[0]!.hoverPreview.src,
      alt: "Never Grow Up preview",
    },
    detailHero: {
      src: referenceWorksSeed[0]!.detailHero.src,
      alt: "Never Grow Up hero",
    },
    gallery: referenceWorksSeed[0]!.gallery.map((img, i) => ({
      ...img,
      alt: `Never Grow Up detail ${i + 1}`,
    })),
  },
  {
    ...referenceWorksSeed[1]!,
    title: "Stupid Factory Characters",
    describe: `${PLACEHOLDER_NOTE} Recurring doodled characters with schoolyard wit — the visual language behind David & Goliath and Todd's pop-art universe.`,
    client: "Characters & Humor",
    date: "2023",
    services: "Character design",
    category: "Characters & Humor",
    hook: "Drawn like a kid. Aimed at adults.",
    accentTone: "red",
    featured: false,
    gridThumbnail: {
      src: referenceWorksSeed[1]!.gridThumbnail.src,
      alt: "Stupid Factory Characters — placeholder",
    },
    hoverPreview: {
      src: referenceWorksSeed[1]!.hoverPreview.src,
      alt: "Stupid Factory Characters preview",
    },
    detailHero: {
      src: referenceWorksSeed[1]!.detailHero.src,
      alt: "Stupid Factory Characters hero",
    },
    gallery: referenceWorksSeed[1]!.gallery.map((img, i) => ({
      ...img,
      alt: `Stupid Factory detail ${i + 1}`,
    })),
  },
  {
    ...referenceWorksSeed[2]!,
    title: "Boys Are Stupid (Book Series)",
    describe: `${PLACEHOLDER_NOTE} Publishing venture that turned irreverent slogans into bestsellers — proof that humor on a page hits as hard as humor on a shirt.`,
    client: "Books & Publishing",
    date: "2022",
    services: "Illustrated books",
    category: "Books & Publishing",
    hook: "50+ titles. Zero art-school pretension.",
    accentTone: "blue",
    featured: true,
    gridThumbnail: {
      src: referenceWorksSeed[2]!.gridThumbnail.src,
      alt: "Book series — placeholder",
    },
    hoverPreview: {
      src: referenceWorksSeed[2]!.hoverPreview.src,
      alt: "Book series preview",
    },
    detailHero: {
      src: referenceWorksSeed[2]!.detailHero.src,
      alt: "Book series hero",
    },
    gallery: referenceWorksSeed[2]!.gallery.map((img, i) => ({
      ...img,
      alt: `Book series detail ${i + 1}`,
    })),
  },
  {
    ...referenceWorksSeed[3]!,
    title: "David & Goliath Apparel",
    describe: `${PLACEHOLDER_NOTE} The global pop-art brand that started on T-shirts — bold graphics, sarcastic slogans, and smart-aleck optimism worn by millions.`,
    client: "Apparel & Licensing",
    date: "2021",
    services: "Merchandise & licensing",
    category: "Apparel & Licensing",
    hook: "From doodles to department stores.",
    accentTone: "green",
    featured: false,
    gridThumbnail: {
      src: referenceWorksSeed[3]!.gridThumbnail.src,
      alt: "Apparel line — placeholder",
    },
    hoverPreview: {
      src: referenceWorksSeed[3]!.hoverPreview.src,
      alt: "Apparel line preview",
    },
    detailHero: {
      src: referenceWorksSeed[3]!.detailHero.src,
      alt: "Apparel line hero",
    },
    gallery: referenceWorksSeed[3]!.gallery.map((img, i) => ({
      ...img,
      alt: `Apparel detail ${i + 1}`,
    })),
  },
  {
    ...referenceWorksSeed[4]!,
    title: "Gallery Pop Art",
    describe: `${PLACEHOLDER_NOTE} Fine-art canvases with Day-Glo palettes and acrylic energy — art you can enjoy seven days a week and it still makes you happy.`,
    client: "Original Art",
    date: "2021",
    services: "Gallery paintings",
    category: "Original Art",
    hook: "Not museum art. Museum-sized laughs.",
    accentTone: "yellow",
    featured: false,
    gridThumbnail: {
      src: referenceWorksSeed[4]!.gridThumbnail.src,
      alt: "Gallery pop art — placeholder",
    },
    hoverPreview: {
      src: referenceWorksSeed[4]!.hoverPreview.src,
      alt: "Gallery pop art preview",
    },
    detailHero: {
      src: referenceWorksSeed[4]!.detailHero.src,
      alt: "Gallery pop art hero",
    },
    gallery: referenceWorksSeed[4]!.gallery.map((img, i) => ({
      ...img,
      alt: `Gallery detail ${i + 1}`,
    })),
  },
  {
    ...referenceWorksSeed[5]!,
    title: "Animal Soup & Kids Books",
    describe: `${PLACEHOLDER_NOTE} Children's titles that keep the doodle spirit alive for younger readers — playful, witty, and emotionally honest.`,
    client: "Books & Publishing",
    date: "2020",
    services: "Children's books",
    category: "Books & Publishing",
    hook: "Kid books. Adult humor optional.",
    accentTone: "blue",
    featured: false,
    gridThumbnail: {
      src: referenceWorksSeed[5]!.gridThumbnail.src,
      alt: "Kids books — placeholder",
    },
    hoverPreview: {
      src: referenceWorksSeed[5]!.hoverPreview.src,
      alt: "Kids books preview",
    },
    detailHero: {
      src: referenceWorksSeed[5]!.detailHero.src,
      alt: "Kids books hero",
    },
    gallery: referenceWorksSeed[5]!.gallery.map((img, i) => ({
      ...img,
      alt: `Kids books detail ${i + 1}`,
    })),
  },
  {
    ...referenceWorksSeed[6]!,
    title: "Licensed Collaborations",
    describe: `${PLACEHOLDER_NOTE} Brand partnerships and licensed products that extend Todd's visual world into retail, gifts, and custom collections.`,
    client: "Collaborations",
    date: "2019",
    services: "Brand licensing",
    category: "Collaborations",
    hook: "Your brand. Todd's twisted mind.",
    accentTone: "red",
    featured: true,
    gridThumbnail: {
      src: referenceWorksSeed[6]!.gridThumbnail.src,
      alt: "Collaborations — placeholder",
    },
    hoverPreview: {
      src: referenceWorksSeed[6]!.hoverPreview.src,
      alt: "Collaborations preview",
    },
    detailHero: {
      src: referenceWorksSeed[6]!.detailHero.src,
      alt: "Collaborations hero",
    },
    gallery: referenceWorksSeed[6]!.gallery.map((img, i) => ({
      ...img,
      alt: `Collaborations detail ${i + 1}`,
    })),
  },
  {
    ...referenceWorksSeed[7]!,
    title: "Todd Art™ Shop",
    describe: `${PLACEHOLDER_NOTE} The current retail home for prints, mugs, and collectibles — playful, witty artwork that feels familiar the moment you see it.`,
    client: "Apparel & Licensing",
    date: "2019",
    services: "Retail & e-commerce",
    category: "Apparel & Licensing",
    hook: "Art you forgot you loved.",
    accentTone: "green",
    featured: false,
    gridThumbnail: {
      src: referenceWorksSeed[7]!.gridThumbnail.src,
      alt: "Todd Art shop — placeholder",
    },
    hoverPreview: {
      src: referenceWorksSeed[7]!.hoverPreview.src,
      alt: "Todd Art shop preview",
    },
    detailHero: {
      src: referenceWorksSeed[7]!.detailHero.src,
      alt: "Todd Art shop hero",
    },
    gallery: referenceWorksSeed[7]!.gallery.map((img, i) => ({
      ...img,
      alt: `Todd Art shop detail ${i + 1}`,
    })),
  },
];
