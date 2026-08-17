export type SceneLayerIdle = "none" | "bob" | "wiggle";
export type SceneLayerRole = "base" | "mid" | "particle";

export interface SceneScatter {
  x: number;
  y: number;
  scale?: number;
  rotate?: number;
}

export interface SceneLayer {
  src: string;
  role?: SceneLayerRole;
  idle?: SceneLayerIdle;
  delay?: number;
  scatter?: SceneScatter;
  /** When true, layer renders as inline SVG object so internal CSS animations run. */
  inlineAnim?: boolean;
}

const ROOT = "/assets/todd-scenes";

/** Welcome Page layers — base already embeds the raster plates; stack vectors only. */
export const heroSceneLayers: SceneLayer[] = [
  {
    src: `${ROOT}/hero/base.svg`,
    role: "base",
    delay: 0,
    scatter: { x: 0, y: -16, scale: 0.98 },
  },
  {
    src: `${ROOT}/hero/mid-a.svg`,
    role: "mid",
    idle: "bob",
    delay: 0.18,
    scatter: { x: -80, y: 40, scale: 0.92, rotate: -6 },
  },
  {
    src: `${ROOT}/hero/mid-b.svg`,
    role: "mid",
    idle: "bob",
    delay: 0.22,
    scatter: { x: 90, y: -36, scale: 0.92, rotate: 8 },
  },
  {
    src: `${ROOT}/hero/particle-left-1.svg`,
    role: "particle",
    idle: "wiggle",
    delay: 0.28,
    scatter: { x: -140, y: 60, scale: 0.8, rotate: -12 },
  },
  {
    src: `${ROOT}/hero/particle-left-2.svg`,
    role: "particle",
    idle: "bob",
    delay: 0.32,
    scatter: { x: -120, y: 90, scale: 0.78, rotate: -8 },
  },
  {
    src: `${ROOT}/hero/particle-left-3.svg`,
    role: "particle",
    idle: "wiggle",
    delay: 0.36,
    scatter: { x: -160, y: 40, scale: 0.82, rotate: -16 },
  },
  {
    src: `${ROOT}/hero/particle-right-1.svg`,
    role: "particle",
    idle: "wiggle",
    delay: 0.3,
    scatter: { x: 150, y: -50, scale: 0.8, rotate: 14 },
  },
  {
    src: `${ROOT}/hero/particle-right-2.svg`,
    role: "particle",
    idle: "bob",
    delay: 0.34,
    scatter: { x: 130, y: -80, scale: 0.78, rotate: 10 },
  },
  {
    src: `${ROOT}/hero/particle-right-3.svg`,
    role: "particle",
    idle: "wiggle",
    delay: 0.38,
    scatter: { x: 170, y: -30, scale: 0.82, rotate: 18 },
  },
];

export const aboutNeverGrowLayers: SceneLayer[] = [
  {
    src: `${ROOT}/about/never-grow-up-1.svg`,
    role: "base",
    delay: 0.05,
    scatter: { x: -48, y: 16, scale: 1.04 },
  },
  {
    src: `${ROOT}/about/never-grow-up-2.svg`,
    role: "mid",
    idle: "bob",
    delay: 0.16,
    scatter: { x: 52, y: -20, scale: 1.04 },
  },
];

export const contactSceneLayers: SceneLayer[] = [
  {
    src: `${ROOT}/contact/scene.svg`,
    role: "base",
    delay: 0.05,
  },
  {
    src: `${ROOT}/contact/sun.svg`,
    role: "mid",
    inlineAnim: true,
    delay: 0.12,
  },
  {
    src: `${ROOT}/contact/mid.svg`,
    role: "mid",
    inlineAnim: true,
    delay: 0.16,
  },
  {
    src: `${ROOT}/contact/prop-bee.svg`,
    role: "particle",
    inlineAnim: true,
    delay: 0.22,
  },
];

export const toddSceneArt = {
  neverGrowUpCard: `${ROOT}/about/card-never-grow-up-bg.svg?v=fill`,
  timelineCard: `${ROOT}/about/card-timeline-bg.svg?v=fill`,
  whereArtCard: `${ROOT}/about/card-where-art-bg.svg?v=fill`,
  byTheNumbersCard: `${ROOT}/about/card-by-the-numbers-bg.svg?v=fill`,
  neverGrowUpCardArt: `${ROOT}/about/card-never-grow-up-art.svg`,
  timelineCardArt: `${ROOT}/about/card-timeline-art.svg`,
  whereArtCardArt: `${ROOT}/about/card-where-art-art.svg`,
  byTheNumbersCardArt: `${ROOT}/about/card-by-the-numbers-art.svg`,
  twistedMind: `${ROOT}/about/twisted-mind.svg`,
  introNeverGrowUp: `${ROOT}/about/never-grow-up-part-1.svg`,
  introNeverGrowUpSecond: `${ROOT}/about/never-grow-up-part-2.svg`,
  faqDecor: `${ROOT}/faq/doodle.svg`,
  sneakPeakDecor: `${ROOT}/sneak/doodle.svg`,
  /** @deprecated Use booksDecor — kept for seed migration compatibility. */
  booksDecor: `${ROOT}/sneak/doodle.svg`,
  testimonialMain: `${ROOT}/testimonials/main.svg`,
  testimonialIcons: [
    `${ROOT}/testimonials/icon-1.svg`,
    `${ROOT}/testimonials/icon-2.svg`,
    `${ROOT}/testimonials/icon-3.svg`,
    `${ROOT}/testimonials/icon-4.svg`,
  ],
} as const;
