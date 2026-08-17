import type { HeroScatterTarget } from "@/features/hero-scatter-data";

const ROOT = "/assets/todd-scenes/hero";

const SCENE = { cx: 960, cy: 500 } as const;

type PieceTier = "bg" | "mid" | "particle";
export type HeroIdleMotion =
  | "none"
  | "breathe"
  | "tree-sway"
  | "glide"
  | "bike"
  | "flutter"
  | "cloud"
  | "flower";

export interface ToddHeroPiece {
  id: string;
  src: string;
  zIndex: number;
  scatter: HeroScatterTarget;
  /** Staggered load-in delay (seconds). */
  enterDelay?: number;
  /** Initial offset before the piece settles into the scene. */
  enter?: { x?: number; y?: number; scale?: number; rotate?: number };
  /** Subtle motion used after the scene settles. */
  idle?: HeroIdleMotion;
}

function radialScatter(
  cx: number,
  cy: number,
  tier: PieceTier,
  overrides: Partial<HeroScatterTarget> = {},
): HeroScatterTarget {
  const dx = cx - SCENE.cx;
  const dy = cy - SCENE.cy;
  const len = Math.hypot(dx, dy) || 1;
  const nx = dx / len;
  const ny = dy / len;
  const mag = tier === "bg" ? 3400 : tier === "mid" ? 1100 : 720;

  return {
    x: Math.round(nx * mag),
    y: Math.round(ny * mag * 0.82),
    scale: tier === "bg" ? 0.82 : tier === "mid" ? 0.9 : 0.78,
    rotate: Math.round(nx * 6),
    ...overrides,
  };
}

/** Decomposed Welcome Page art — scroll scatter tuned to each layer's position in the scene. */
export const toddHeroPieces: ToddHeroPiece[] = [
  {
    id: "backdrop",
    src: `${ROOT}/backdrop.svg`,
    zIndex: 1,
    scatter: { x: -4200, y: 80, scale: 0.84, rotate: -3, opacity: 0.88 },
    enter: { x: -90, y: 28, scale: 0.94 },
    idle: "none",
  },
  {
    id: "bg-b",
    src: `${ROOT}/bg-b.svg`,
    zIndex: 2,
    scatter: { x: 4000, y: -760, scale: 0.82, rotate: 5, opacity: 0.9 },
    enter: { x: 64, y: 26, scale: 0.94 },
    enterDelay: 0.04,
    idle: "tree-sway",
  },
  {
    id: "bg-c",
    src: `${ROOT}/bg-c.svg`,
    zIndex: 3,
    scatter: radialScatter(661, 637, "bg", { x: -780, y: 360, scale: 0.86 }),
    enter: { y: 32, scale: 0.93 },
    enterDelay: 0.07,
    idle: "glide",
  },
  {
    id: "particle-accent",
    src: `${ROOT}/particle-accent.svg`,
    zIndex: 4,
    scatter: radialScatter(486, 760, "particle", { x: -520, y: 280, scale: 0.84 }),
    enter: { y: 36, scale: 0.93 },
    enterDelay: 0.09,
    idle: "none",
  },
  {
    id: "bg-a",
    src: `${ROOT}/bg-a.svg`,
    zIndex: 5,
    scatter: radialScatter(923, 561, "bg", { x: 1050, y: -280, scale: 0.86 }),
    enter: { x: 40, y: 24, scale: 0.94 },
    enterDelay: 0.11,
    idle: "breathe",
  },
  {
    id: "mid-a",
    src: `${ROOT}/mid-a.svg`,
    zIndex: 6,
    scatter: radialScatter(630, 365, "mid", { x: -920, y: 60, scale: 0.92 }),
    enter: { x: -36, y: 22, scale: 0.93 },
    enterDelay: 0.13,
    idle: "bike",
  },
  {
    id: "mid-b",
    src: `${ROOT}/mid-b.svg`,
    zIndex: 7,
    scatter: { x: 1500, y: -20, scale: 0.88, rotate: 3 },
    enter: { y: 52, scale: 0.91 },
    enterDelay: 0.15,
    idle: "flutter",
  },
  {
    id: "mid-c",
    src: `${ROOT}/mid-c.svg`,
    zIndex: 8,
    scatter: radialScatter(1160, 250, "mid", { x: 1200, y: -440, scale: 0.9 }),
    enter: { x: 28, y: 20, scale: 0.94 },
    enterDelay: 0.17,
    idle: "cloud",
  },
  {
    id: "particle-left-1",
    src: `${ROOT}/particle-left-1.svg`,
    zIndex: 9,
    scatter: radialScatter(260, 422, "particle", { x: -820, y: -520, scale: 0.76, rotate: -12 }),
    enter: { x: -48, y: 16, scale: 0.9, rotate: -8 },
    enterDelay: 0.19,
    idle: "flower",
  },
  {
    id: "particle-left-2",
    src: `${ROOT}/particle-left-2.svg`,
    zIndex: 10,
    scatter: radialScatter(286, 423, "particle", { x: -880, y: 32, scale: 0.8 }),
    enter: { x: -28, y: 24, scale: 0.92 },
    enterDelay: 0.21,
    idle: "flower",
  },
  {
    id: "particle-left-3",
    src: `${ROOT}/particle-left-3.svg`,
    zIndex: 11,
    scatter: radialScatter(304, 434, "particle", { x: -760, y: -640, scale: 0.78, rotate: -8 }),
    enter: { x: -36, y: 14, scale: 0.9 },
    enterDelay: 0.23,
    idle: "flower",
  },
  {
    id: "particle-right-1",
    src: `${ROOT}/particle-right-1.svg`,
    zIndex: 12,
    scatter: radialScatter(1254, 427, "particle", { x: 880, y: -240, scale: 0.82 }),
    enter: { x: 32, y: 20, scale: 0.92 },
    enterDelay: 0.25,
    idle: "flower",
  },
  {
    id: "particle-right-2",
    src: `${ROOT}/particle-right-2.svg`,
    zIndex: 13,
    scatter: radialScatter(1282, 428, "particle", { x: 980, y: 140, scale: 0.76 }),
    enter: { x: 24, y: 26, scale: 0.9 },
    enterDelay: 0.27,
    idle: "flower",
  },
  {
    id: "particle-right-3",
    src: `${ROOT}/particle-right-3.svg`,
    zIndex: 14,
    scatter: radialScatter(1247, 439, "particle", { x: 820, y: 280, scale: 0.78, rotate: 10 }),
    enter: { x: 34, y: 18, scale: 0.9, rotate: 6 },
    enterDelay: 0.29,
    idle: "flower",
  },
];

export const toddHeroIllustration = `${ROOT}/base.svg`;
