/** Maps Framer nav closed variant classes to open variants. */
export const NAV_VARIANTS = {
  desktop: {
    closed: "framer-v-7daz3r",
    open: "framer-v-pw2coq",
    closedName: "Desktop Closed",
    openName: "Desktop Open",
  },
  tablet: {
    closed: "framer-v-ns08x6",
    open: "framer-v-pw2coq",
    closedName: "Tablet Closed",
    openName: "Tablet Open",
  },
  phone: {
    closed: "framer-v-aigtuw",
    open: "framer-v-wwyydj",
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
    /framer-v-(7daz3r|ns08x6|aigtuw|pw2coq|wwyydj)/g,
    "",
  );
  return `${withoutClosed.trim()} ${token}`.replace(/\s+/g, " ").trim();
}

export function navFramerName(breakpoint: NavBreakpoint, open: boolean): string {
  const variant = NAV_VARIANTS[breakpoint];
  return open ? variant.openName : variant.closedName;
}
