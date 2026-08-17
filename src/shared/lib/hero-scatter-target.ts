/** Scroll-scatter target geometry for hero illustration pieces. */
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
