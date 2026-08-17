"use client";

import Lenis from "lenis";
import { cancelFrame, frame } from "motion/react";
import { useEffect, type ReactNode } from "react";

export const LENIS_SCROLL_EVENT = "lenis-scroll";

function hashFromHref(href: string) {
  const hashIndex = href.indexOf("#");
  if (hashIndex === -1) return null;
  const hash = href.slice(hashIndex);
  return hash.length > 1 ? hash : null;
}

/** Lenis smooth scroll driven by Motion's frame loop for scroll-synced animations. */
export function SmoothScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    const instance = new Lenis({ duration: 1.0 });
    const root = window.document.documentElement;
    root.classList.add("lenis");

    const onScroll = () => {
      window.dispatchEvent(new Event(LENIS_SCROLL_EVENT));
    };
    instance.on("scroll", onScroll);

    const scrollToHash = (hash: string) => {
      const id = decodeURIComponent(hash.slice(1));
      const target =
        document.getElementById(id) ??
        document.querySelector(`[data-todd-name="${id}"]`);

      if (target instanceof HTMLElement) {
        instance.scrollTo(target, { offset: -80, duration: 1.1 });
        return true;
      }
      return false;
    };

    const onDocumentClick = (event: MouseEvent) => {
      const anchor = (event.target as Element | null)?.closest("a[href]");
      if (!(anchor instanceof HTMLAnchorElement)) return;

      const hash = hashFromHref(anchor.getAttribute("href") ?? "");
      if (!hash) return;

      const isSamePage =
        !anchor.pathname ||
        anchor.pathname === window.location.pathname ||
        anchor.pathname === `${window.location.pathname}/`;

      if (!isSamePage) return;

      if (scrollToHash(hash)) {
        event.preventDefault();
        window.history.pushState(null, "", hash);
      }
    };

    document.addEventListener("click", onDocumentClick);

    const initialHash = window.location.hash;
    if (initialHash) {
      requestAnimationFrame(() => scrollToHash(initialHash));
    }

    function update(data: { timestamp: number }) {
      instance.raf(data.timestamp);
    }

    frame.update(update, true);

    return () => {
      cancelFrame(update);
      document.removeEventListener("click", onDocumentClick);
      instance.off("scroll", onScroll);
      root.classList.remove("lenis");
      instance.destroy();
    };
  }, []);

  return <>{children}</>;
}
