"use client";

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
  return useMediaQuery("(max-width: 809.98px)");
}
