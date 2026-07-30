"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import {
  motion,
  motionValue,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import { LENIS_SCROLL_EVENT } from "@/features/SmoothScroll";

const ZERO_PROGRESS = motionValue(0);

/** Desktop testimonial card parallax (start → end px from Framer onScrollTarget). */
export const CARD_PARALLAX = [
  { x: [-20, 0] as [number, number], y: [0, -50] as [number, number] },
  { x: [20, 0], y: [0, -80] },
  { x: [-10, 0], y: [0, -100] },
  { x: [10, 0], y: [0, -150] },
  { x: [10, 0], y: [0, -150] },
  { x: [10, 0], y: [0, -150] },
  { x: [20, 0], y: [0, -80] },
  { x: [10, 0], y: [0, -150] },
] as const;

type TestimonialScrollContextValue = {
  scrollYProgress: MotionValue<number>;
};

const TestimonialScrollContext = createContext<TestimonialScrollContextValue | null>(
  null,
);

export function useTestimonialScroll() {
  return useContext(TestimonialScrollContext);
}

/** Provides scroll progress for testimonial card parallax. */
export function TestimonialScrollProvider({
  children,
  targetRef,
}: {
  children: ReactNode;
  targetRef: React.RefObject<HTMLElement | null>;
}) {
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end start"],
  });

  return (
    <TestimonialScrollContext.Provider value={{ scrollYProgress }}>
      {children}
    </TestimonialScrollContext.Provider>
  );
}

export function StickySection({ children }: { children: ReactNode }) {
  return <div style={{ display: "contents" }}>{children}</div>;
}

function subscribeNoop() {
  return () => {};
}

function useIsServerRender() {
  return useSyncExternalStore(subscribeNoop, () => false, () => true);
}

function parseOpacity(style?: CSSProperties): number {
  const raw = style?.opacity;
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") {
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 1;
  }
  return 1;
}

function isElementInView(node: HTMLElement, amount = 0.15): boolean {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || globalThis.document?.documentElement?.clientHeight || 0;
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  return visibleHeight >= rect.height * amount;
}

/** Desktop testimonial card: per-card scroll reveal + section parallax on one node. */
export function TestimonialCardReveal({
  index,
  children,
  className,
  style,
  "data-framer-name": dataFramerName,
}: {
  index: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  "data-framer-name"?: string;
}) {
  const isServerRender = useIsServerRender();
  const reduced = useReducedMotion();
  const ctx = useTestimonialScroll();
  const config = CARD_PARALLAX[index] ?? CARD_PARALLAX[0];
  const scrollYProgress = ctx?.scrollYProgress;

  const x = useTransform(scrollYProgress ?? ZERO_PROGRESS, [0, 1], [config.x[0], config.x[1]]);
  const y = useTransform(scrollYProgress ?? ZERO_PROGRESS, [0, 1], [config.y[0], config.y[1]]);

  const ref = useRef<HTMLDivElement>(null);
  const [inViewNow, setInViewNow] = useState(false);
  const hiddenOpacity = parseOpacity(style) <= 0.001 ? String(parseOpacity(style)) : "0";
  const hiddenTransform =
    typeof style?.transform === "string" && style.transform !== "none"
      ? style.transform
      : undefined;
  const visible = reduced || inViewNow;

  const syncInView = useCallback(() => {
    const node = ref.current;
    const section = document.querySelector("#testimonial-section");
    if (!node || !section) return;
    const sectionRect = section.getBoundingClientRect();
    const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
    const sectionVisible =
      Math.min(sectionRect.bottom, viewportHeight) - Math.max(sectionRect.top, 0);
    if (sectionVisible >= sectionRect.height * 0.1) {
      setInViewNow(true);
      return;
    }
    setInViewNow(isElementInView(node, 0.15));
  }, []);

  useEffect(() => {
    if (reduced) return;
    syncInView();
  }, [reduced, syncInView]);

  useLayoutEffect(() => {
    if (reduced) return;
    syncInView();
  }, [reduced, syncInView]);

  useEffect(() => {
    if (reduced) return;
    window.addEventListener(LENIS_SCROLL_EVENT, syncInView, { passive: true });
    window.addEventListener("scroll", syncInView, { passive: true });
    window.addEventListener("resize", syncInView, { passive: true });
    return () => {
      window.removeEventListener(LENIS_SCROLL_EVENT, syncInView);
      window.removeEventListener("scroll", syncInView);
      window.removeEventListener("resize", syncInView);
    };
  }, [reduced, syncInView]);

  if (isServerRender) {
    return (
      <div
        ref={ref}
        className={className}
        data-framer-name={dataFramerName}
        style={style}
      >
        {children}
      </div>
    );
  }

  if (reduced || !scrollYProgress) {
    return (
      <div
        ref={ref}
        className={className}
        data-framer-name={dataFramerName}
        style={{
          ...style,
          opacity: visible ? 1 : hiddenOpacity,
          transform: visible ? "none" : hiddenTransform,
          pointerEvents: visible ? undefined : "none",
        }}
      >
        {children}
      </div>
    );
  }

  if (!visible) {
    return (
      <div
        ref={ref}
        className={className}
        data-framer-name={dataFramerName}
        style={{
          ...(style ?? {}),
          opacity: hiddenOpacity,
          transform: hiddenTransform,
          pointerEvents: "none",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      data-framer-name={dataFramerName}
      style={{
        willChange: "transform",
        opacity: 1,
        x,
        y,
      }}
    >
      {children}
    </motion.div>
  );
}

export function ParallaxCard({
  index,
  children,
  className,
  style,
}: {
  index: number;
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  const ctx = useTestimonialScroll();
  const config = CARD_PARALLAX[index] ?? CARD_PARALLAX[0];
  const scrollYProgress = ctx?.scrollYProgress;

  const xRange: [number, number] = [config.x[0], config.x[1]];
  const yRange: [number, number] = [config.y[0], config.y[1]];

  const x = useTransform(scrollYProgress ?? ZERO_PROGRESS, [0, 1], xRange);
  const y = useTransform(scrollYProgress ?? ZERO_PROGRESS, [0, 1], yRange);

  if (reduced || !scrollYProgress) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div className={className} style={{ ...(style ?? {}), x, y }}>
      {children}
    </motion.div>
  );
}
