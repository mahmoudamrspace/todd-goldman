"use client";

import {
  motion,
  useInView,
  useMotionValueEvent,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
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
const SECTION_REVEAL_TRANSITION =
  "opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1), transform 0.8s cubic-bezier(0.22, 1, 0.36, 1)";
const FOOTER_HEADLINE_TRANSITION =
  "opacity 1s cubic-bezier(0.12, 0.23, 0.17, 0.99), transform 1s cubic-bezier(0.12, 0.23, 0.17, 0.99)";

export type HiddenRevealVariant =
  | "default"
  | "footer-headline"
  | "testimonial-card"
  | "testimonial-image"
  | "testimonial-title"
  | "intro-decor"
  | "intro-character"
  | "section-scroll-artwork"
  | "work-block"
  | "services-row"
  | "section-heading"
  | "section-artwork"
  | "section-row"
  | "section-cta"
  | "faq-item";

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

function parseRevealStyle(style?: CSSProperties): ParsedTransform {
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
  replay?: boolean;
  baseDelay: number;
  transition: string;
  noSafety?: boolean;
  sectionGatedSafety?: boolean;
  sectionSelector?: string;
  revealedTransform?: string;
  revealedTransformOrigin?: string;
};

const BooksReplayContext = createContext(false);

export function BooksReplayProvider({
  sectionRef,
  children,
}: {
  sectionRef: RefObject<HTMLElement | null>;
  children: ReactNode;
}) {
  const reduced = useReducedMotion();
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || reduced) return;

    const observer = new IntersectionObserver(
      ([entry]) => setInView(Boolean(entry?.isIntersecting)),
      {
        rootMargin: "-8% 0px -8% 0px",
        threshold: 0,
      },
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, [reduced, sectionRef]);

  return (
    <BooksReplayContext.Provider value={Boolean(reduced || inView)}>
      {children}
    </BooksReplayContext.Provider>
  );
}

function variantConfig(variant: HiddenRevealVariant): VariantConfig {
  switch (variant) {
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
    case "section-scroll-artwork":
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
        sectionSelector: 'main[data-todd-name="Main"]',
        revealedTransform: "none",
      };
    case "services-row":
      return {
        amount: 0.2,
        once: false,
        replay: true,
        baseDelay: 0,
        transition:
          "opacity 1s cubic-bezier(0.22, 1, 0.36, 1), transform 1s cubic-bezier(0.22, 1, 0.36, 1)",
        revealedTransform: "none",
      };
    case "section-heading":
      return {
        amount: 0.2,
        once: true,
        baseDelay: 0,
        transition: SECTION_REVEAL_TRANSITION,
        revealedTransform: "none",
      };
    case "section-artwork":
      return {
        amount: 0.12,
        once: true,
        baseDelay: 0.08,
        transition: SECTION_REVEAL_TRANSITION,
        revealedTransform: "none",
      };
    case "section-row":
    case "faq-item":
      return {
        amount: 0.12,
        once: true,
        baseDelay: 0.12,
        transition: SECTION_REVEAL_TRANSITION,
        revealedTransform: "none",
      };
    case "section-cta":
      return {
        amount: 0.1,
        once: true,
        baseDelay: 0.24,
        transition: SECTION_REVEAL_TRANSITION,
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
  if (rect.width <= 0 || rect.height <= 0) return false;
  const viewportHeight = window.innerHeight || globalThis.document?.documentElement?.clientHeight || 0;
  const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
  if (visibleHeight <= 0) return false;
  const threshold = Math.max(rect.height * amount, 24);
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
  dataToddName,
  transition,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  dataToddName?: string;
  transition: string;
}) {
  const reduced = useReducedMotion();
  const heroScroll = useHeroScroll();
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);
  const inView = useInView(ref, { amount: 0.15, once: true });

  useEffect(() => {
    if (inView) setRevealed(true);
  }, [inView]);

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
      data-todd-name={dataToddName}
      data-revealed={reduced || revealed || inView ? "true" : undefined}
      style={{
        ...style,
        opacity: reduced || revealed || inView ? "1" : hiddenOpacity,
        transform: reduced || revealed || inView ? "none" : hiddenTransform,
        willChange: revealed || inView ? "auto" : style?.willChange,
        transition,
      }}
    >
      {children}
    </div>
  );
}

/** Element-relative artwork reveal shared by Intro and later illustrated sections. */
function ScrollArtworkReveal({
  children,
  className,
  style,
  dataToddName,
  transition,
  initialY = 50,
  initialScale = 0.5,
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  dataToddName?: string;
  transition: string;
  initialY?: number;
  initialScale?: number;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "center center"],
  });
  const hiddenOpacity = parseOpacity(style) <= 0.001 ? String(parseOpacity(style)) : "0";
  const [revealed, setRevealed] = useState(false);
  const inView = useInView(ref, { amount: 0.25, once: true });

  useMotionValueEvent(scrollYProgress, "change", (value) => {
    if (snapProgress(value, 16) >= 0.05) setRevealed(true);
  });

  useEffect(() => {
    if (inView) setRevealed(true);
  }, [inView]);

  useEffect(() => {
    const sync = () => {
      if (snapProgress(scrollYProgress.get(), 16) >= 0.05) setRevealed(true);
    };
    sync();
    window.addEventListener(LENIS_SCROLL_EVENT, sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    return () => {
      window.removeEventListener(LENIS_SCROLL_EVENT, sync);
      window.removeEventListener("scroll", sync);
    };
  }, [scrollYProgress]);
  const opacity = useTransform(scrollYProgress, (value) => {
    const p = snapProgress(value, 16);
    if (p <= 0.05) return hiddenOpacity;
    if (p >= 0.65) return 1;
    return String(Math.min(1, (p - 0.05) / 0.6));
  });
  const y = useTransform(scrollYProgress, (value) => {
    const p = snapProgress(value, 16);
    if (p <= 0.05) return initialY;
    if (p >= 0.65) return 0;
    return initialY * (1 - (p - 0.05) / 0.6);
  });
  const scale = useTransform(scrollYProgress, (value) => {
    const p = snapProgress(value, 16);
    if (p <= 0.05) return initialScale;
    if (p >= 0.65) return 1;
    return initialScale + ((p - 0.05) / 0.6) * (1 - initialScale);
  });

  if (reduced) {
    return (
      <div
        ref={ref}
        className={className}
        data-todd-name={dataToddName}
        data-revealed="true"
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
      data-todd-name={dataToddName}
      data-revealed={revealed || inView ? "true" : undefined}
      data-in-view={inView ? "true" : undefined}
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
  replayGroup?: "books";
  "data-todd-name"?: string;
  "data-highlight"?: boolean;
}

/** Reveals legacy export SSR pre-animation nodes on scroll. */
export function HiddenReveal(props: HiddenRevealProps) {
  const parsed = parseRevealStyle(props.style);
  const config = variantConfig(props.variant ?? "default");

  if (props.variant === "intro-decor" && parsed.needsReveal) {
    return (
      <HeroIntroDecorReveal
        className={props.className}
        style={props.style}
        dataToddName={props["data-todd-name"]}
        transition={config.transition}
      >
        {props.children}
      </HeroIntroDecorReveal>
    );
  }

  if (props.variant === "intro-character" && parsed.needsReveal) {
    return (
      <ScrollArtworkReveal
        className={props.className}
        style={props.style}
        dataToddName={props["data-todd-name"]}
        transition={config.transition}
      >
        {props.children}
      </ScrollArtworkReveal>
    );
  }

  if (props.variant === "section-scroll-artwork" && parsed.needsReveal) {
    return (
      <ScrollArtworkReveal
        className={props.className}
        style={props.style}
        dataToddName={props["data-todd-name"]}
        transition={config.transition}
        initialY={40}
        initialScale={0.9}
      >
        {props.children}
      </ScrollArtworkReveal>
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
  replayGroup,
  "data-todd-name": dataToddName,
  "data-highlight": dataHighlight,
}: HiddenRevealProps) {
  const reduced = useReducedMotion();
  const config = variantConfig(variant);
  const totalDelay = config.baseDelay + delay;
  const ref = useRef<HTMLElement>(null);
  const parsed = parseRevealStyle(style);
  const [revealed, setRevealed] = useState(false);
  const isInView = useInView(ref, { once: config.once, amount: config.amount });
  const booksReplayVisible = useContext(BooksReplayContext);
  const groupedReplay = replayGroup === "books";

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
    if (!parsed.needsReveal || reduced || config.replay || groupedReplay) return;
    const target = resolveVisibilityTarget(ref, config.sectionSelector);
    if (target && isElementInView(target, config.amount)) reveal();
  }, [
    parsed.needsReveal,
    reduced,
    reveal,
    config.amount,
    config.sectionSelector,
    config.replay,
    groupedReplay,
    variant,
  ]);

  useEffect(() => {
    if (!parsed.needsReveal || reduced || config.replay || groupedReplay) return;

    if (config.sectionGatedSafety) {
      const tick = () => {
        const target = resolveVisibilityTarget(ref, config.sectionSelector);
        if (target && isElementInView(target, config.amount)) reveal();
      };
      const interval = window.setInterval(tick, 250);
      return () => window.clearInterval(interval);
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
    config.replay,
    groupedReplay,
  ]);

  useEffect(() => {
    if (!parsed.needsReveal || reduced || config.replay || groupedReplay) return;

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
  }, [
    parsed.needsReveal,
    reduced,
    reveal,
    variant,
    config.amount,
    config.sectionSelector,
    config.replay,
    groupedReplay,
  ]);

  const isVisible =
    reduced ||
    (groupedReplay
      ? booksReplayVisible
      : config.replay
      ? isInView
      : revealed || isInView);

  if (!parsed.needsReveal) {
    const Tag = as;
    if (href) {
      return (
        <a
          id={id}
          className={className}
          data-todd-name={dataToddName}
          data-highlight={dataHighlight}
          href={href}
          style={style}
        >
          {children}
        </a>
      );
    }
    return (
      <Tag id={id} className={className} data-todd-name={dataToddName} style={style}>
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
        data-todd-name={dataToddName}
        data-highlight={dataHighlight}
        href={href}
        style={nodeStyle}
        data-revealed={isVisible ? "true" : undefined}
      >
        {children}
      </a>
    );
  }

  const Tag = as;
  return (
    <Tag
      ref={ref as never}
      id={id}
      className={className}
      data-todd-name={dataToddName}
      data-revealed={isVisible ? "true" : undefined}
      style={nodeStyle}
      onFocusCapture={reveal}
    >
      {children}
    </Tag>
  );
}


const SITE_EASE_OUT = [0.22, 1, 0.36, 1] as const;

export interface AnimatedSpanProps {
  children: ReactNode;
  delay?: number;
  className?: string;
  textClass?: boolean;
  y?: number;
  variant?: "default" | "work-detail" | "services";
  inlineDisplay?: boolean;
}

/** Word-level intro animation matching legacy export stagger. */
export function AnimatedSpan({
  children,
  delay = 0,
  className,
  textClass = false,
  y = 10,
  variant = "default",
  inlineDisplay = false,
}: AnimatedSpanProps) {
  const reduced = useReducedMotion();
  const heroScroll = useHeroScroll();
  const ref = useRef<HTMLSpanElement>(null);
  const amount = variant === "services" ? 0.15 : 0.2;
  const isInView = useInView(ref, { once: variant !== "services", amount });
  const [safetyRevealed, setSafetyRevealed] = useState(false);
  const [sectionRevealed, setSectionRevealed] = useState(false);
  const [heroRevealed, setHeroRevealed] = useState(false);

  useEffect(() => {
    if (reduced || variant === "work-detail" || variant === "services") return;
    const node = ref.current;
    if (!node?.closest("#text_intro") || !heroScroll) return;

    const sync = () => {
      const progress = heroScroll.scrollYProgress.get();
      if (progress >= 0.12 + delay * 0.04) setHeroRevealed(true);
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
    if (reduced || variant === "services") return;
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
    if (reduced || variant === "services") return;
    const node = ref.current;
    const introSection = node?.closest("#text_intro") as HTMLElement | null;
    const aboutSection = node?.closest('section[data-todd-name="About"]') as HTMLElement | null;
    const workMain = node?.closest('main[data-todd-name="Main"]') as HTMLElement | null;
    const gateSection =
      variant === "work-detail" ? workMain : introSection ?? aboutSection;
    if (!gateSection) return;

    const sync = () => {
      if (isElementInView(gateSection, 0.1)) setSectionRevealed(true);
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
    if (reduced || variant === "work-detail" || variant === "services") return;
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
    (variant === "services"
      ? isInView
      : isInView ||
        sectionRevealed ||
        heroRevealed ||
        (variant === "work-detail" && safetyRevealed) ||
        (variant !== "work-detail" && safetyRevealed));
  const spanClass = [textClass ? "todd-text" : "", className].filter(Boolean).join(" ");
  const transition =
    variant === "services"
      ? { duration: 0.85, ease: SITE_EASE_OUT, delay }
      : { duration: 1.4, ease: SITE_EASE_OUT, delay };

  return (
    <motion.span
      ref={ref}
      className={spanClass || undefined}
      initial={false}
      animate={
        visible
          ? { opacity: 1, y: 0 }
          : { opacity: 0.001, y: reduced ? 0 : y }
      }
      transition={reduced ? { duration: 0 } : transition}
      style={{ display: inlineDisplay ? "inline" : "inline-block" }}
    >
      {children}
    </motion.span>
  );
}

/** Staggered word spans matching legacy export intro typography. */
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
  variant?: "default" | "work-detail" | "services";
}) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const wordStagger = variant === "services" ? 0.04 : stagger;
  return words.map((word, index) => (
    <AnimatedSpan
      key={`${word}-${index}`}
      delay={startDelay + index * wordStagger}
      y={y}
      variant={variant}
    >
      {index > 0 ? " " : ""}
      {word}
    </AnimatedSpan>
  ));
}
