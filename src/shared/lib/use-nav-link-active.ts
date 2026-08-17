"use client";

import { useActiveSectionFragment } from "@/shared/providers/ActiveSectionProvider";
import { usePathname } from "next/navigation";

function normalizePath(path: string): string {
  if (path === "/") return path;
  return path.replace(/\/+$/, "");
}

/** Shared active-state for desktop and overlay nav links. */
export function useNavLinkActive(href: string): boolean {
  const pathname = usePathname();
  const activeFragment = useActiveSectionFragment();

  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return false;
  }

  if (href.includes("#")) {
    const [path = "/", fragment] = href.split("#");
    return normalizePath(pathname) === normalizePath(path) && activeFragment === fragment;
  }

  return normalizePath(pathname) === normalizePath(href);
}
