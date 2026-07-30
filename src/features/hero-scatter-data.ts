/** Reference Framer scroll-scatter targets for Hero illustration pieces. */
export type HeroScatterTarget = {
  x: number;
  y: number;
  scale: number;
  opacity?: number;
  rotate?: number;
  spring?: {
    damping: number;
    stiffness: number;
    mass: number;
    bounce?: number;
  };
};

export const HERO_SCROLL_SPRING = {
  damping: 60,
  stiffness: 500,
  mass: 1,
} as const;

export const HERO_SCATTER: Record<string, HeroScatterTarget> = {
  "3qzpaf": { x: -5000, y: 150, scale: 0.7 },
  n9n09q: { x: 5000, y: -1000, scale: 0.7 },
  "1g0zmg": { x: -700, y: -40, scale: 0.8 },
  "1wtum60": { x: 1000, y: -400, scale: 0.8 },
  "1ozh6tg": { x: -1000, y: 150, scale: 1 },
  ns8z4n: { x: -1000, y: -90, scale: 0.8 },
  rerrkv: { x: 1000, y: 200, scale: 0.6 },
  "1yoksqx": { x: 1000, y: 300, scale: 0.7 },
  "10opn74": { x: 200, y: -500, scale: 0.6 },
  "1s805jf": { x: -1000, y: 20, scale: 0.8 },
  zirx0w: { x: 7000, y: 0, scale: 10, opacity: 0 },
  "1lfi89o": {
    x: 1000,
    y: 190,
    scale: 0.7,
    spring: { damping: 60, stiffness: 500, mass: 1, bounce: 0.2 },
  },
  veyci6: { x: -1000, y: -700, scale: 0.8 },
  gavoov: { x: -1000, y: -300, scale: 1 },
  "6p0dr7": { x: -2000, y: 200, scale: 0.6 },
  bo9u2x: { x: 1000, y: 150, scale: 0.6 },
  knv5yl: { x: 1000, y: -1000, scale: 0.6 },
  "1r8yshf": { x: 1000, y: 1000, scale: 0.8 },
  cp2fuo: { x: 1000, y: -1000, scale: 0.6 },
  "16k6tuj": { x: -1000, y: 150, scale: 0.6 },
  "1trszxh": { x: -500, y: -300, scale: 0.8 },
  t8jd8q: { x: 2000, y: 0, scale: 0.8 },
};
