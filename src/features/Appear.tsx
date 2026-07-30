"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  useSpring,
  useTransform,
  type Transition,
  type TargetAndTransition,
} from "motion/react";
import {
  useEffect,
  useMemo,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import appearData from "@framer/data/appear.json";
import { useHeroScroll } from "@/features/HeroScrollContext";
import {
  HERO_SCATTER,
  HERO_SCROLL_SPRING,
  type HeroScatterTarget,
} from "@/features/hero-scatter-data";

type AppearVariant = {
  initial?: Record<string, unknown>;
  animate?: Record<string, unknown>;
} | null;

type AppearMap = Record<string, Record<string, AppearVariant>>;

const VARIANTS: { key: string; query: string }[] = [
  { key: "default", query: "(min-width: 1200px)" },
  { key: "r4q9g", query: "(min-width: 810px) and (max-width: 1199.98px)" },
  { key: "g5y12p", query: "(max-width: 809.98px)" },
];

function pickVariant(
  entry: Record<string, AppearVariant> | undefined,
  variantKey: string,
) {
  if (!entry) return undefined;
  const candidate = entry[variantKey];
  if (candidate) return candidate;
  if (entry.default) return entry.default;
  return undefined;
}

function splitAnimate(animate: Record<string, unknown> | undefined) {
  if (!animate) return { values: undefined, transition: undefined };
  const { transition, ...values } = animate;
  return {
    values,
    transition: transition as Record<string, unknown> | undefined,
  };
}

function formatAnimateTransform(values: Record<string, unknown> | undefined): string {
  if (!values) return "none";
  if (values.transform !== undefined) return String(values.transform);

  const x = Number(values.x ?? 0);
  const y = Number(values.y ?? 0);
  const scale = Number(values.scale ?? 1);
  const rotate = Number(values.rotate ?? 0);
  const parts: string[] = [];
  if (x !== 0 || y !== 0) parts.push(`translateX(${x}px) translateY(${y}px)`);
  if (scale !== 1) parts.push(`scale(${scale})`);
  if (rotate !== 0) parts.push(`rotate(${rotate}deg)`);
  return parts.length > 0 ? parts.join(" ") : "none";
}

function mergeFinalStyle(
  style: CSSProperties | undefined,
  animateValues: Record<string, unknown> | undefined,
): CSSProperties {
  const next: CSSProperties = { ...(style ?? {}), willChange: "auto" };
  next.opacity =
    animateValues?.opacity !== undefined
      ? (animateValues.opacity as CSSProperties["opacity"])
      : 1;
  next.transform = formatAnimateTransform(animateValues);
  return next;
}

/** Static export HTML must match reference inline styles exactly. */
function staticExportStyle(
  style: CSSProperties | undefined,
  entry: AppearVariant | undefined,
): CSSProperties {
  if (style && Object.keys(style).length > 0) {
    return { ...style };
  }
  const initial = entry?.initial as Record<string, unknown> | undefined;
  if (!initial) return style ?? {};
  const next: CSSProperties = { ...(style ?? {}) };
  if (next.opacity === undefined && initial.opacity !== undefined) {
    next.opacity = String(initial.opacity);
  }
  if (next.transform === undefined) {
    const x = initial.x ?? 0;
    const y = initial.y ?? 0;
    if (x !== 0 || y !== 0) {
      next.transform = `translateX(${x}px) translateY(${y}px)`;
    } else if (initial.transform !== undefined) {
      next.transform = String(initial.transform);
    }
  }
  if (next.willChange === undefined && (next.transform || next.opacity !== undefined)) {
    next.willChange = "transform";
  }
  return next;
}

function prepareMotionStyle(style: CSSProperties | undefined): CSSProperties {
  const motionStyle: CSSProperties = { ...(style ?? {}) };
  if (motionStyle.opacity === 0 || motionStyle.opacity === "0") {
    delete motionStyle.opacity;
  }
  if (motionStyle.opacity === "0.001") {
    delete motionStyle.opacity;
  }
  delete motionStyle.transform;
  return motionStyle;
}

const APPEAR_SAFETY_MS = 2200;

function subscribeNoop() {
  return () => {};
}

function useIsServerRender() {
  return useSyncExternalStore(subscribeNoop, () => false, () => true);
}

function useActiveVariantKey() {
  const [key, setKey] = useState("default");

  useEffect(() => {
    const mqs = VARIANTS.map(({ key: variantKey, query }) => ({
      variantKey,
      mq: window.matchMedia(query),
    }));

    const update = () => {
      const match = mqs.find(({ mq }) => mq.matches);
      setKey(match?.variantKey ?? "default");
    };

    update();
    for (const { mq } of mqs) {
      mq.addEventListener("change", update);
    }
    return () => {
      for (const { mq } of mqs) {
        mq.removeEventListener("change", update);
      }
    };
  }, []);

  return key;
}

function useScatterMotion(scatter: HeroScatterTarget) {
  const heroScroll = useHeroScroll();
  const scrollYProgress = heroScroll!.scrollYProgress;
  const springConfig = scatter.spring ?? HERO_SCROLL_SPRING;

  const rawX = useTransform(scrollYProgress, [0, 1], [0, scatter.x]);
  const rawY = useTransform(scrollYProgress, [0, 1], [0, scatter.y]);
  const rawScale = useTransform(scrollYProgress, [0, 1], [1, scatter.scale]);
  const rawOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    [1, scatter.opacity ?? 1],
  );
  const rawRotate = useTransform(
    scrollYProgress,
    [0, 1],
    [0, scatter.rotate ?? 0],
  );

  const x = useSpring(rawX, springConfig);
  const y = useSpring(rawY, springConfig);
  const scale = useSpring(rawScale, springConfig);
  const opacity = useSpring(rawOpacity, springConfig);
  const rotate = useSpring(rawRotate, springConfig);

  return { x, y, scale, opacity, rotate };
}

type AppearScatterProps = {
  id: string;
  children?: ReactNode;
  className?: string;
  style?: CSSProperties;
  dataFramerName?: string;
  hoverProps: Record<string, unknown>;
  initial: Record<string, unknown> | undefined;
  animateValues: Record<string, unknown> | undefined;
  transition: Record<string, unknown> | undefined;
  scatter: HeroScatterTarget;
};

function AppearScrollScatter({
  id,
  children,
  className,
  style,
  dataFramerName,
  hoverProps,
  initial,
  animateValues,
  transition,
  scatter,
}: AppearScatterProps) {
  const motionStyle = prepareMotionStyle(style);
  const { x, y, scale, opacity, rotate } = useScatterMotion(scatter);

  return (
    <motion.div
      data-framer-appear-id={id}
      data-framer-name={dataFramerName}
      className={className}
      style={{ x, y, scale, opacity, rotate, willChange: "transform" }}
      data-framer-scroll-scatter={id}
      {...hoverProps}
    >
      <motion.div
        style={{
          ...motionStyle,
          position: "relative",
          width: "100%",
          height: "100%",
        }}
        initial={initial as TargetAndTransition | undefined}
        animate={animateValues as TargetAndTransition | undefined}
        transition={transition as Transition | undefined}
      >
        {children}
      </motion.div>
    </motion.div>
  );
}

export interface AppearProps {
  id: string;
  className?: string;
  style?: CSSProperties;
  children?: ReactNode;
  "data-framer-name"?: string;
  onMouseEnter?: React.MouseEventHandler<HTMLDivElement>;
  onMouseLeave?: React.MouseEventHandler<HTMLDivElement>;
  hoverActive?: boolean;
  /** Apply Framer `.hover` variant class to this node (works cards). */
  hoverClassTarget?: boolean;
}

export function Appear({
  id,
  children,
  style,
  className,
  "data-framer-name": dataFramerName,
  onMouseEnter,
  onMouseLeave,
  hoverActive = false,
  hoverClassTarget = false,
}: AppearProps) {
  const mergedClassName = [
    className,
    hoverClassTarget && hoverActive ? "hover" : "",
  ]
    .filter(Boolean)
    .join(" ")
    .trim();

  const hoverProps = {
    onMouseEnter,
    onMouseLeave,
    "data-framer-hover": hoverActive ? "true" : undefined,
  };

  const isServerRender = useIsServerRender();
  const reduced = useReducedMotion();
  const variantKey = useActiveVariantKey();
  const heroScroll = useHeroScroll();
  const scatter = HERO_SCATTER[id];
  const entry = useMemo(
    () => pickVariant((appearData as unknown as AppearMap)[id], variantKey),
    [id, variantKey],
  );
  const { values: animateValues, transition } = useMemo(
    () => splitAnimate(entry?.animate as Record<string, unknown> | undefined),
    [entry],
  );
  const initial = entry?.initial as Record<string, unknown> | undefined;
  const motionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(motionRef, { once: true, amount: 0.1 });
  const [safetyVisible, setSafetyVisible] = useState(false);
  const useScrollScatter = Boolean(heroScroll && scatter && entry);
  const isHeroIllustration = id === "10mg3pr";

  useEffect(() => {
    if (reduced || isServerRender || useScrollScatter) return;
    const safety = window.setTimeout(() => setSafetyVisible(true), APPEAR_SAFETY_MS);
    return () => window.clearTimeout(safety);
  }, [reduced, isServerRender, useScrollScatter]);

  if (isServerRender) {
    return (
      <div
        data-framer-appear-id={id}
        data-framer-name={dataFramerName}
        className={mergedClassName}
        style={staticExportStyle(style, entry)}
        {...hoverProps}
      >
        {children}
      </div>
    );
  }

  if (!entry || reduced) {
    const visibleStyle = entry
      ? mergeFinalStyle(style, animateValues as Record<string, unknown> | undefined)
      : mergeFinalStyle(style, { opacity: 1, transform: "none" });

    return (
      <div
        data-framer-appear-id={id}
        data-framer-name={dataFramerName}
        className={mergedClassName}
        style={visibleStyle}
        {...hoverProps}
      >
        {children}
      </div>
    );
  }

  if (useScrollScatter && scatter) {
    return (
      <AppearScrollScatter
        id={id}
        className={mergedClassName}
        style={style}
        dataFramerName={dataFramerName}
        hoverProps={hoverProps}
        initial={initial}
        animateValues={animateValues as Record<string, unknown> | undefined}
        transition={transition}
        scatter={scatter}
      >
        {children}
      </AppearScrollScatter>
    );
  }

  if (safetyVisible && !isInView) {
    const visibleStyle = mergeFinalStyle(style, animateValues as Record<string, unknown> | undefined);
    return (
      <div
        data-framer-appear-id={id}
        data-framer-name={dataFramerName}
        className={mergedClassName}
        style={visibleStyle}
        {...hoverProps}
      >
        {children}
      </div>
    );
  }

  const motionStyle: CSSProperties = { ...style };
  if (motionStyle.opacity === 0 || motionStyle.opacity === "0") {
    delete motionStyle.opacity;
  }
  if (motionStyle.opacity === "0.001") {
    delete motionStyle.opacity;
  }

  return (
    <motion.div
      ref={motionRef}
      data-framer-appear-id={id}
      data-framer-name={dataFramerName}
      className={mergedClassName}
      style={motionStyle}
      {...hoverProps}
      initial={initial as TargetAndTransition | undefined}
      whileInView={animateValues as TargetAndTransition | undefined}
      viewport={{ once: true, amount: isHeroIllustration ? 0 : 0.15 }}
      transition={transition as Transition | undefined}
    >
      {children}
    </motion.div>
  );
}
