"use client";

import { useEffect, useRef, type ReactNode } from "react";

const SLOT_WIDTH = 4860;
const GAP = 24;
const TRACK_WIDTH = SLOT_WIDTH + GAP;
const DESKTOP_SPEED = 100;
const MOBILE_SPEED = 130;
const HOVER_FACTOR = 0.5;

type RowWithMarquee = HTMLElement & { __marqueeAnimation?: Animation };

function marqueeSpeedPxPerSec() {
  return window.matchMedia("(max-width: 809.98px)").matches ? MOBILE_SPEED : DESKTOP_SPEED;
}

function parseTranslateX(transform: string) {
  if (!transform || transform === "none") return 0;
  const matrix = transform.match(/matrix\(([^)]+)\)/);
  if (matrix?.[1]) {
    const parts = matrix[1].split(",").map((part) => Number.parseFloat(part.trim()));
    return parts.length >= 6 ? (parts[4] ?? 0) : 0;
  }
  const translate = transform.match(/translateX\(([-\d.]+)px\)/);
  return translate?.[1] ? Number.parseFloat(translate[1]) : 0;
}

/** One slot cycle: slot width + gap, extended per reference loop formula. */
function measureLoopDistance(row: HTMLElement, viewport: HTMLElement) {
  const firstLi = row.querySelector("li");
  if (!firstLi) return TRACK_WIDTH;

  const childrenSpan = (firstLi as HTMLElement).offsetWidth + GAP;
  const parentWidth = viewport.offsetWidth;
  const repeatFactor = Math.round(parentWidth / childrenSpan);
  return childrenSpan + childrenSpan * repeatFactor;
}

function ensureDuplicatedSlots(row: HTMLElement) {
  const items = row.querySelectorAll("li");
  if (items.length >= 2) return;

  const firstLi = items[0];
  if (!firstLi) return;

  const clone = firstLi.cloneNode(true) as HTMLElement;
  clone.setAttribute("aria-hidden", "true");
  row.appendChild(clone);
}

/** Continuous horizontal scroll for sneak-peak image rows. */
export function MarqueeSection({ children }: { children: ReactNode }) {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = rootRef.current?.querySelector(
      'section[data-framer-name="Sneak peak"]',
    );
    if (!section) return;

    const viewport = section.querySelector(".framer-1mshsi4-container") as HTMLElement | null;
    const row = section.querySelector(".framer-1mshsi4-container ul") as RowWithMarquee | null;
    const innerSection = section.querySelector(
      ".framer-1mshsi4-container section",
    ) as HTMLElement | null;

    if (!viewport || !row) return;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) {
      if (innerSection) innerSection.style.opacity = "1";
      return;
    }

    ensureDuplicatedSlots(row);

    const loopDistance = measureLoopDistance(row, viewport);
    const speed = marqueeSpeedPxPerSec();

    row.__marqueeAnimation?.cancel();

    row.style.position = "relative";
    row.style.left = `-${loopDistance}px`;
    row.style.willChange = "transform";
    row.style.transform = "translateX(0px)";

    if (innerSection) innerSection.style.opacity = "1";

    const animation = row.animate(
      [
        { transform: "translateX(0px)" },
        { transform: `translateX(${loopDistance}px)` },
      ],
      {
        duration: (loopDistance / speed) * 1000,
        iterations: Infinity,
        easing: "linear",
      },
    );

    row.__marqueeAnimation = animation;

    const onEnter = () => {
      animation.playbackRate = 0;
    };
    const onLeave = () => {
      animation.playbackRate = 1;
    };

    viewport.addEventListener("pointerenter", onEnter);
    viewport.addEventListener("pointerleave", onLeave);
    viewport.addEventListener("focusin", onEnter);
    viewport.addEventListener("focusout", onLeave);

    return () => {
      animation.cancel();
      row.__marqueeAnimation = undefined;
      viewport.removeEventListener("pointerenter", onEnter);
      viewport.removeEventListener("pointerleave", onLeave);
      viewport.removeEventListener("focusin", onEnter);
      viewport.removeEventListener("focusout", onLeave);
    };
  }, []);

  return (
    <div ref={rootRef} style={{ display: "contents" }}>
      {children}
    </div>
  );
}

export { parseTranslateX, TRACK_WIDTH, DESKTOP_SPEED, MOBILE_SPEED, HOVER_FACTOR };
