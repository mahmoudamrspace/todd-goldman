"use client";

import { mediaQueries } from "@/shared/config/breakpoints";
import { useSyncExternalStore } from "react";

/** SSR-safe media-query subscription (defaults to `false` on server). */
export function useMediaQuery(query: string): boolean {
  return useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia(query);
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}

/** Matches site mobile breakpoint (≤809.98px). */
export function useIsMobile(): boolean {
  return useMediaQuery(mediaQueries.mobile);
}

/** Matches site tablet breakpoint (810px – 1199.98px). */
export function useIsTablet(): boolean {
  return useMediaQuery(mediaQueries.tablet);
}

/** Matches site desktop breakpoint (≥1200px). */
export function useIsDesktop(): boolean {
  return useMediaQuery(mediaQueries.desktop);
}
