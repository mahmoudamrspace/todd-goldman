"use client";

import {
  motion,
  motionValue,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "motion/react";
import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
  type Ref,
  type RefObject,
} from "react";
import { useHeroScroll } from "@/features/HeroScrollContext";
import { LENIS_SCROLL_EVENT } from "@/features/SmoothScroll";

const REVEAL_SAFETY_MS = 2000;
const REVEAL_TRANSITION = "opacity 0.6s ease, transform 0.6s ease";
const FOOTER_HEADLINE_TRANSITION =
  "opacity 1s cubic-bezier(0.12, 0.23, 0.17, 0.99), transform 1s cubic-bezier(0.12, 0.23, 0.17, 0.99)";
const SNEAK_TREE_TRANSITION =
  "opacity 0.8s cubic-bezier(0.34, 1.56, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1)";

export type HiddenRevealVariant =
  | "default"
  | "sneak-tree"
  | "footer-headline"
  | "testimonial-card"
  | "testimonial-image"
  | "testimonial-title"
  | "intro-decor"
  | "intro-character"
  | "work-block";

const TESTIMONIAL_IMAGE_REVEAL_SCALE = 1.08084;

function parseOpacity(style?: CSSProperties): number {
  const raw = style?.opacity;
  if (typeof raw === "number") return raw;
  if (typeof raw === "string") {
    const parsed = Number.parseFloat(raw);
    return Number.isFinite(parsed) ? parsed : 1;
  }
  return 1;
}

interface ParsedTransform {
  hidden: boolean;
  needsReveal: boolean;
  hiddenTransform?: string;
}

function parseFramerStyle(style?: CSSProperties): ParsedTransform {
  const opacity = parseOpacity(style);
  const hidden = opacity <= 0.001;
  const transformValue = typeof style?.transform === "string" ? style.transform : undefined;
  const hasTransform = Boolean(transformValue && transformValue !== "none");
  return {
    hidden,
    needsReveal: hidden || hasTransform,
    hiddenTransform: transformValue,
  };
}

type VariantConfig = {
  amount: number;
  once: boolean;
  baseDelay: number;
  transition: string;
  noSafety?: boolean;
  sectionGatedSafety?: boolean;
  sectionSelector?: string;
  revealedTransform?: string;
  revealedTransformOrigin?: string;
};

function variantConfig(variant: HiddenRevealVariant): VariantConfig {
  switch (variant) {
    case "sneak-tree":
      return {
        amount: 1,
        once: false,
        baseDelay: 0,
        transition: SNEAK_TREE_TRANSITION,
      };
    case "footer-headline":
      return {
        amount: 0.5,
        once: true,
        baseDelay: 0.2,
        transition: FOOTER_HEADLINE_TRANSITION,
      };
    case "testimonial-card":
      return {
        amount: 0.15,
        once: true,
        baseDelay: 0,
        transition: REVEAL_TRANSITION,
        noSafety: true,
        revealedTransform: "none",
      };
    case "testimonial-image":
      return {
        amount: 0.1,
        once: true,
        baseDelay: 0,
        transition: REVEAL_TRANSITION,
        noSafety: true,
        sectionGatedSafety: true,
        sectionSelector: "#testimonial-section",
        revealedTransform: `scale(${TESTIMONIAL_IMAGE_REVEAL_SCALE})`,
        revealedTransformOrigin: "50% 50%",
      };
    case "testimonial-title":
      return {
        amount: 0.1,
        once: true,
        baseDelay: 0,
        transition: REVEAL_TRANSITION,
        noSafety: true,
        sectionGatedSafety: true,
        sectionSelector: "#testimonial-section",
        revealedTransform: "none",
      };
    case "intro-decor":
      return {
        amount: 0.15,
        once: true,
        baseDelay: 0,
        transition: REVEAL_TRANSITION,
        noSafety: true,
        revealedTransform: "none",
      };
    case "intro-character":
      return {
        amount: 0.15,
        once: true,
        baseDelay: 0,
        transition: REVEAL_TRANSITION,
        noSafety: true,
        revealedTransform: "none",
      };
    case "work-block":
      return {
        amount: 0.15,
        once: true,
        baseDelay: 0,
        transition: REVEAL_TRANSITION,
        noSafety: true,
        sectionGatedSafety: true,
        sectionSelector: 'main[data-framer-name="Main"]',
        revealedTransform: "none",
      };
    default:
      return {
        amount: 0.15,
        once: true,
        baseDelay: 0,
        transition: REVEAL_TRANSITION,
      };
  }
}

function isElementInView(node: HTMLElement, amount = 0.15): boolean {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || globalThis.document?.documentElement?.clientHeight || 0;
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const threshold = Math.max(rect.height * amount, viewportHeight * amount);
  return visibleHeight >= threshold;
}

function resolveVisibilityTarget(
  ref: RefObject<HTMLElement | null>,
  sectionSelector?: string,
): HTMLElement | null {
  if (sectionSelector) {
    const section = document.querySelector(sectionSelector);
    if (section instanceof HTMLElement) return section;
  }
  return ref.current;
}

function isElementFullyOut(node: HTMLElement): boolean {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || globalThis.document?.documentElement?.clientHeight || 0;
  const viewportWidth = window.innerWidth || globalThis.document?.documentElement?.clientWidth || 0;
  return rect.bottom <= 0 || rect.top >= viewportHeight || rect.right <= 0 || rect.left >= viewportWidth;
}

function isElementMostlyInView(node: HTMLElement, amount = 0.95): boolean {
  const rect = node.getBoundingClientRect();
  const viewportHeight = window.innerHeight || globalThis.document?.documentElement?.clientHeight || 0;
  const viewportWidth = window.innerWidth || globalThis.document?.documentElement?.clientWidth || 0;
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  const visibleWidth = Math.min(rect.right, viewportWidth) - Math.max(rect.left, 0);
  const visibleArea = Math.max(0, visibleHeight) * Math.max(0, visibleWidth);
  const totalArea = Math.max(rect.width * rect.height, 1);
  return visibleArea / totalArea >= amount;
}

/** Hysteresis for sneak-tree: enter at 85% visible, reset only when fully out of viewport. */
function useSneakTreeVisibility(ref: RefObject<HTMLElement | null>) {
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const sync = () => {
      if (isElementMostlyInView(node, 0.85)) {
        setShown(true);
        return;
      }
      if (isElementFullyOut(node)) setShown(false);
    };

    window.addEventListener(LENIS_SCROLL_EVENT, sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    sync();

    return () => {
      window.removeEventListener(LENIS_SCROLL_EVENT, sync);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [ref]);

  return shown;
}

function applyRevealedStyles(
  node: HTMLElement,
  delay: number,
  transition: string,
  revealedTransform = "none",
  revealedTransformOrigin?: string,
) {
  node.style.transition = transition;
  node.style.transitionDelay = `${delay}s`;
  node.style.opacity = "1";
  node.style.transform = revealedTransform;
  if (revealedTransformOrigin) node.style.transformOrigin = revealedTransformOrigin;
  node.style.willChange = "auto";
  node.style.pointerEvents = "";
}

function snapProgress(value: number, steps = 20) {
  return Math.round(value * steps) / steps;
}

/** Teapot decor: opacity/rotation track hero→intro scroll band. */
function HeroIntroDecorReveal({
  children,
  className,
  style,
  dataFramerName,
  transition,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  dataFramerName?: string;
  transition: string;
}) {
  const reduced = useReducedMotion();
  const heroScroll = useHeroScroll();
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduced || !heroScroll) return;
    const sync = () => {
      const progress = heroScroll.scrollYProgress.get();
      setRevealed(snapProgress(progress, 12) >= 0.85);
    };
    const unsubscribe = heroScroll.scrollYProgress.on("change", sync);
    window.addEventListener(LENIS_SCROLL_EVENT, sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      unsubscribe();
      window.removeEventListener(LENIS_SCROLL_EVENT, sync);
      window.removeEventListener("scroll", sync);
    };
  }, [reduced, heroScroll]);

  const hiddenOpacity = parseOpacity(style) <= 0.001 ? String(parseOpacity(style)) : "0";
  const hiddenTransform =
    typeof style?.transform === "string" && style.transform !== "none"
      ? style.transform
      : "rotate(-18deg)";

  return (
    <div
      ref={ref}
      className={className}
      data-framer-name={dataFramerName}
      style={{
        ...style,
        opacity: reduced || revealed ? "1" : hiddenOpacity,
        transform: reduced || revealed ? "none" : hiddenTransform,
        willChange: revealed ? "auto" : style?.willChange,
        transition,
      }}
    >
      {children}
    </div>
  );
}

/** Character stays hidden until the intro section itself scrolls into view. */
function IntroCharacterReveal({
  children,
  className,
  style,
  dataFramerName,
  transition,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  dataFramerName?: string;
  transition: string;
}) {
  const reduced = useReducedMotion();
  const heroScroll = useHeroScroll();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroScroll?.introRef ?? ref,
    offset: ["start start", "end start"],
  });
  const hiddenOpacity = parseOpacity(style) <= 0.001 ? String(parseOpacity(style)) : "0";
  const opacity = useTransform(scrollYProgress, (value) => {
    const p = snapProgress(value, 16);
    if (p <= 0.2) return hiddenOpacity;
    if (p >= 0.55) return 1;
    return String(Math.min(1, (p - 0.2) / 0.35));
  });
  const y = useTransform(scrollYProgress, (value) => {
    const p = snapProgress(value, 16);
    if (p <= 0.2) return 50;
    if (p >= 0.55) return 0;
    return 50 * (1 - (p - 0.2) / 0.35);
  });
  const scale = useTransform(scrollYProgress, (value) => {
    const p = snapProgress(value, 16);
    if (p <= 0.2) return 0.5;
    if (p >= 0.55) return 1;
    return 0.5 + ((p - 0.2) / 0.35) * 0.5;
  });

  if (reduced) {
    return (
      <div
        ref={ref}
        className={className}
        data-framer-name={dataFramerName}
        style={{
          ...style,
          opacity: "1",
          transform: "none",
          transition: "none",
          willChange: "auto",
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
        ...style,
        opacity,
        y,
        scale,
        willChange: "transform",
        transition,
      }}
    >
      {children}
    </motion.div>
  );
}

export interface HiddenRevealProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  delay?: number;
  variant?: HiddenRevealVariant;
  id?: string;
  href?: string;
  as?: "div" | "section";
  "data-framer-name"?: string;
  "data-highlight"?: boolean;
}

/** Reveals Framer SSR pre-animation nodes on scroll. */
export function HiddenReveal(props: HiddenRevealProps) {
  const parsed = parseFramerStyle(props.style);
  const config = variantConfig(props.variant ?? "default");

  if (props.variant === "intro-decor" && parsed.needsReveal) {
    return (
      <HeroIntroDecorReveal
        className={props.className}
        style={props.style}
        dataFramerName={props["data-framer-name"]}
        transition={config.transition}
      >
        {props.children}
      </HeroIntroDecorReveal>
    );
  }

  if (props.variant === "intro-character" && parsed.needsReveal) {
    return (
      <IntroCharacterReveal
        className={props.className}
        style={props.style}
        dataFramerName={props["data-framer-name"]}
        transition={config.transition}
      >
        {props.children}
      </IntroCharacterReveal>
    );
  }

  return <HiddenRevealDefault {...props} />;
}

function HiddenRevealDefault({
  children,
  className,
  style,
  delay = 0,
  variant = "default",
  id,
  href,
  as = "div",
  "data-framer-name": dataFramerName,
  "data-highlight": dataHighlight,
}: HiddenRevealProps) {
  const reduced = useReducedMotion();
  const config = variantConfig(variant);
  const totalDelay = config.baseDelay + delay;
  const ref = useRef<HTMLElement>(null);
  const parsed = parseFramerStyle(style);
  const [revealed, setRevealed] = useState(false);
  const isInView = useInView(ref, { once: config.once, amount: config.amount });
  const sneakTreeShown = useSneakTreeVisibility(ref);

  const reveal = useCallback(() => {
    const node = ref.current;
    if (node) {
      applyRevealedStyles(
        node,
        totalDelay,
        config.transition,
        config.revealedTransform ?? "none",
        config.revealedTransformOrigin,
      );
    }
    setRevealed(true);
  }, [totalDelay, config.transition, config.revealedTransform, config.revealedTransformOrigin]);

  useLayoutEffect(() => {
    if (!parsed.needsReveal || reduced || variant === "sneak-tree") return;
    const target = resolveVisibilityTarget(ref, config.sectionSelector);
    if (target && isElementInView(target, config.amount)) reveal();
  }, [parsed.needsReveal, reduced, reveal, config.amount, config.sectionSelector, variant]);

  useEffect(() => {
    if (!parsed.needsReveal || reduced || variant === "sneak-tree") return;

    if (config.sectionGatedSafety) {
      const tick = () => {
        const target = resolveVisibilityTarget(ref, config.sectionSelector);
        if (target && isElementInView(target, config.amount)) reveal();
      };
      const interval = window.setInterval(tick, 250);
      const stop = window.setTimeout(
        () => window.clearInterval(interval),
        REVEAL_SAFETY_MS + totalDelay * 1000,
      );
      return () => {
        window.clearInterval(interval);
        window.clearTimeout(stop);
      };
    }

    if (config.noSafety) return;
    const safety = window.setTimeout(reveal, REVEAL_SAFETY_MS + totalDelay * 1000);
    return () => window.clearTimeout(safety);
  }, [
    parsed.needsReveal,
    reduced,
    reveal,
    totalDelay,
    variant,
    config.noSafety,
    config.sectionGatedSafety,
    config.sectionSelector,
    config.amount,
  ]);

  useEffect(() => {
    if (!parsed.needsReveal || reduced || variant === "sneak-tree") return;

    const checkVisible = () => {
      const target = resolveVisibilityTarget(ref, config.sectionSelector);
      if (target && isElementInView(target, config.amount)) reveal();
    };

    const onLenisScroll = () => checkVisible();
    window.addEventListener(LENIS_SCROLL_EVENT, onLenisScroll, { passive: true });
    window.addEventListener("scroll", checkVisible, { passive: true });
    window.addEventListener("resize", checkVisible, { passive: true });
    checkVisible();

    return () => {
      window.removeEventListener(LENIS_SCROLL_EVENT, onLenisScroll);
      window.removeEventListener("scroll", checkVisible);
      window.removeEventListener("resize", checkVisible);
    };
  }, [parsed.needsReveal, reduced, reveal, variant, config.amount, config.sectionSelector]);

  const isVisible =
    reduced ||
    (variant === "sneak-tree" ? sneakTreeShown : revealed || isInView);

  if (!parsed.needsReveal) {
    const Tag = as;
    if (href) {
      return (
        <a
          id={id}
          className={className}
          data-framer-name={dataFramerName}
          data-highlight={dataHighlight}
          href={href}
          style={style}
        >
          {children}
        </a>
      );
    }
    return (
      <Tag id={id} className={className} data-framer-name={dataFramerName} style={style}>
        {children}
      </Tag>
    );
  }

  const hiddenOpacity = parsed.hidden ? String(parseOpacity(style)) : "1";
  const nodeStyle: CSSProperties = {
    ...style,
    opacity: isVisible ? "1" : hiddenOpacity,
    transform: isVisible
      ? (config.revealedTransform ?? "none")
      : (parsed.hiddenTransform ?? style?.transform),
    transformOrigin: isVisible ? config.revealedTransformOrigin : style?.transformOrigin,
    willChange: isVisible ? "auto" : style?.willChange,
    pointerEvents: isVisible ? undefined : "none",
    transition: config.transition,
    transitionDelay: isVisible ? `${totalDelay}s` : "0s",
  };

  if (href) {
    return (
      <a
        ref={ref as Ref<HTMLAnchorElement>}
        id={id}
        className={className}
        data-framer-name={dataFramerName}
        data-highlight={dataHighlight}
        href={href}
        style={nodeStyle}
      >
        {children}
      </a>
    );
  }

  const Tag = as;
  return (
    <Tag ref={ref as never} id={id} className={className} data-framer-name={dataFramerName} style={nodeStyle}>
      {children}
    </Tag>
  );
}

const SNEAK_TITLE_TRANSITION =
  "opacity 0.8s cubic-bezier(0.34, 1, 0.64, 1), transform 0.8s cubic-bezier(0.34, 1, 0.64, 1)";

export interface AnimatedSpanProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  framerText?: boolean;
  y?: number;
  variant?: "default" | "sneak-title" | "work-detail";
  inlineDisplay?: boolean;
}

/** Word-level intro animation matching Framer stagger. */
export function AnimatedSpan({
  children,
  delay = 0,
  className,
  framerText = false,
  y = 10,
  variant = "default",
  inlineDisplay = false,
}: AnimatedSpanProps) {
  const reduced = useReducedMotion();
  const heroScroll = useHeroScroll();
  const ref = useRef<HTMLSpanElement>(null);
  const amount = variant === "sneak-title" ? 0.5 : 0.2;
  const isInView = useInView(ref, { once: true, amount });
  const [safetyRevealed, setSafetyRevealed] = useState(false);
  const [sectionRevealed, setSectionRevealed] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    if (reduced || variant === "sneak-title" || variant === "work-detail") return;
    const node = ref.current;
    if (!node?.closest("#text_intro") || !heroScroll) return;

    const sync = () => {
      const progress = heroScroll.scrollYProgress.get();
      if (snapProgress(progress, 12) >= 0.12 + delay * 0.04) setHeroRevealed(true);
    };

    const unsubscribe = heroScroll.scrollYProgress.on("change", sync);
    window.addEventListener(LENIS_SCROLL_EVENT, sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    sync();

    return () => {
      unsubscribe();
      window.removeEventListener(LENIS_SCROLL_EVENT, sync);
      window.removeEventListener("scroll", sync);
    };
  }, [reduced, delay, heroScroll, variant]);

  useEffect(() => {
    if (reduced || variant === "sneak-title") return;
    if (variant === "work-detail") {
      const safety = window.setTimeout(() => setSafetyRevealed(true), REVEAL_SAFETY_MS + delay * 1000);
      return () => window.clearTimeout(safety);
    }
    if (!ref.current?.closest("#text_intro")) {
      const safety = window.setTimeout(() => setSafetyRevealed(true), REVEAL_SAFETY_MS + delay * 1000);
      return () => window.clearTimeout(safety);
    }
  }, [reduced, delay, variant]);

  useEffect(() => {
    if (reduced) return;
    const node = ref.current;
    const introSection = node?.closest("#text_intro") as HTMLElement | null;
    const aboutSection = node?.closest('section[data-framer-name="About"]') as HTMLElement | null;
    const sneakSection = node?.closest('section[data-framer-name="Sneak peak"]') as HTMLElement | null;
    const workMain = node?.closest('main[data-framer-name="Main"]') as HTMLElement | null;
    const gateSection =
      variant === "sneak-title"
        ? sneakSection
        : variant === "work-detail"
          ? workMain
          : introSection ?? aboutSection;
    if (!gateSection) return;

    const sync = () => {
      const threshold = variant === "sneak-title" ? 0.35 : 0.1;
      if (isElementInView(gateSection, threshold)) setSectionRevealed(true);
    };

    window.addEventListener(LENIS_SCROLL_EVENT, sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    sync();

    return () => {
      window.removeEventListener(LENIS_SCROLL_EVENT, sync);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [reduced, variant]);

  useEffect(() => {
    if (reduced || variant === "sneak-title" || variant === "work-detail") return;
    const node = ref.current;
    if (!node || node.closest("#text_intro")) return;

    const sync = () => {
      if (isElementInView(node, amount)) setSafetyRevealed(true);
    };

    window.addEventListener(LENIS_SCROLL_EVENT, sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    sync();

    return () => {
      window.removeEventListener(LENIS_SCROLL_EVENT, sync);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [reduced, amount, variant]);

  const visible =
    reduced ||
    isInView ||
    sectionRevealed ||
    heroRevealed ||
    (variant === "work-detail" && safetyRevealed) ||
    (variant !== "sneak-title" && variant !== "work-detail" && safetyRevealed);
  const spanClass = [framerText ? "framer-text" : "", className].filter(Boolean).join(" ");
  const transition =
    variant === "sneak-title"
      ? `${SNEAK_TITLE_TRANSITION} ${delay}s`
      : `opacity 1.4s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s, transform 1.4s cubic-bezier(0.22, 1, 0.36, 1) ${delay}s`;

  if (visible) {
    return (
      <span
        className={spanClass || undefined}
        style={{ display: inlineDisplay ? "inline" : "inline-block", opacity: 1, transform: "none" }}
      >
        {children}
      </span>
    );
  }

  return (
    <span
      ref={ref}
      className={spanClass || undefined}
      style={{
        display: "inline-block",
        opacity: 0.001,
        transform: `translateY(${y}px)`,
        transition,
      }}
    >
      {children}
    </span>
  );
}

/** Staggered word spans matching Framer intro typography. */
export function AnimatedWords({
  text,
  startDelay = 0,
  y = 10,
  stagger = 0.05,
  variant = "default",
}: {
  text: string;
  startDelay?: number;
  y?: number;
  stagger?: number;
  variant?: "default" | "sneak-title" | "work-detail";
}) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  return words.map((word, index) => (
    <AnimatedSpan
      key={`${word}-${index}`}
      delay={startDelay + index * stagger}
      y={y}
      variant={variant}
    >
      {index > 0 ? " " : ""}
      {word}
    </AnimatedSpan>
  ));
}
