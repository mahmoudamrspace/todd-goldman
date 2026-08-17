"use client";

import {
  createContext,
  useCallback,
  useContext,
  useRef,
  type ReactNode,
  type RefObject,
} from "react";
import { useScroll, useTransform, type MotionValue } from "motion/react";

export type HeroScrollContextValue = {
  scrollYProgress: MotionValue<number>;
  introRef: RefObject<HTMLElement | null>;
  setIntroElement: (node: HTMLElement | null) => void;
};

const HeroScrollContext = createContext<HeroScrollContextValue | null>(null);

export function useHeroScroll() {
  return useContext(HeroScrollContext);
}

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

/** Shares Intro-anchored scroll progress for Hero scatter/collect transforms. */
export function HeroIntroRegion({ children }: { children: ReactNode }) {
  const introRef = useRef<HTMLElement | null>(null);
  const setIntroElement = useCallback((node: HTMLElement | null) => {
    introRef.current = node;
  }, []);
  const { scrollY } = useScroll();
  const scrollYProgress = useTransform(scrollY, (latest) => {
    const intro = introRef.current;
    if (!intro) return 0;

    const introTop = intro.offsetTop;
    const viewportHeight = window.innerHeight;
    const rangeStart = Math.max(0, introTop - viewportHeight * 1.08);
    const rangeEnd = introTop - viewportHeight * 0.06;
    const span = rangeEnd - rangeStart;

    if (span <= 1) {
      return latest >= rangeEnd ? 1 : 0;
    }

    return clamp((latest - rangeStart) / span, 0, 1);
  });

  return (
    <HeroScrollContext.Provider value={{ scrollYProgress, introRef, setIntroElement }}>
      {children}
    </HeroScrollContext.Provider>
  );
}
