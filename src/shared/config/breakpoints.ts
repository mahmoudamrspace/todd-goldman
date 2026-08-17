/** Site breakpoints — mirrored in CSS media queries (custom properties cannot drive @media). */
export const breakpoints = {
  /** Mobile: max-width 809.98px */
  mobileMax: 809.98,
  /** Tablet: 810px – 1199.98px */
  tabletMin: 810,
  tabletMax: 1199.98,
  /** Desktop: min-width 1200px */
  desktopMin: 1200,
} as const;

export const mediaQueries = {
  mobile: `(max-width: ${breakpoints.mobileMax}px)`,
  tablet: `(min-width: ${breakpoints.tabletMin}px) and (max-width: ${breakpoints.tabletMax}px)`,
  desktop: `(min-width: ${breakpoints.desktopMin}px)`,
  notMobile: `(min-width: ${breakpoints.tabletMin}px)`,
} as const;

/** Responsive image sizes aligned to site breakpoints. */
export const imageSizes = {
  full: `(max-width: ${breakpoints.mobileMax}px) 100vw, (max-width: ${breakpoints.tabletMax}px) 100vw, 50vw`,
  hero: `(max-width: ${breakpoints.mobileMax}px) 100vw, 80vw`,
  card: `(max-width: ${breakpoints.mobileMax}px) 100vw, (max-width: ${breakpoints.tabletMax}px) 50vw, 33vw`,
} as const;
