import type { CSSProperties } from "react";

/** Maps legacy export nav closed variant classes to open variants. */
export const NAV_VARIANTS = {
  desktop: {
    closed: "todd-layout__utility-017",
    open: "todd-layout__utility-023",
    closedName: "Desktop Closed",
    openName: "Desktop Open",
  },
  tablet: {
    closed: "todd-layout__utility-021",
    open: "todd-layout__utility-023",
    closedName: "Tablet Closed",
    openName: "Tablet Open",
  },
  phone: {
    closed: "todd-nav-overlay-content__desktop-4-6-aigtuw",
    open: "todd-nav-overlay-content__desktop-4-6-wwyydj",
    closedName: "Phone Closed",
    openName: "Phone Open",
  },
} as const;

export type NavBreakpoint = keyof typeof NAV_VARIANTS;

export function navShellClass(
  base: string,
  breakpoint: NavBreakpoint,
  open: boolean,
): string {
  const variant = NAV_VARIANTS[breakpoint];
  const token = open ? variant.open : variant.closed;
  const withoutClosed = base.replace(
    /todd-nav-overlay-content__desktop-4-6-(7daz3r|ns08x6|aigtuw|pw2coq|wwyydj)/g,
    "",
  );
  return `${withoutClosed.trim()} ${token}`.replace(/\s+/g, " ").trim();
}

export function navVariantName(breakpoint: NavBreakpoint, open: boolean): string {
  const variant = NAV_VARIANTS[breakpoint];
  return open ? variant.openName : variant.closedName;
}

/** Inline nav shell styles — present state fills viewport, not the fixed header box. */
export function navShellStyle(present: boolean, backgroundColor: string): CSSProperties {
  return {
    backgroundColor: present ? "var(--todd-ink)" : backgroundColor,
    height: present ? "100dvh" : "100%",
    width: "100%",
    willChange: "transform",
    opacity: 1,
    transform: "none",
  };
}
