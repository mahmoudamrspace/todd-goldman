"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { HiddenReveal } from "@/features/HiddenReveal";
import { LENIS_SCROLL_EVENT } from "@/features/SmoothScroll";
import { useIsMobile } from "@/shared/lib/use-media-query";

const ABOUT_IMAGE_REST_SCALE = 1.06;
const ABOUT_IMAGE_REVEAL_SCALE = 1;
const REVEAL_SOFT = {
  willChange: "transform",
  opacity: "0",
  transform: "translateY(16px)",
} as const;

export function AboutCardImage({ src }: { src: string }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "inherit",
        cornerShape: "inherit",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      data-todd-background-image-wrapper={true}
    >
      <img
        decoding="async"
        loading="lazy"
        width={1920}
        height={1080}
        src={src}
        alt=""
        className="todd-about-card-img"
      />
    </div>
  );
}

export function AboutCardIcon({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  return (
    <HiddenReveal className="todd-about-card-icon-reveal" style={REVEAL_SOFT} delay={0.08}>
      <img
        src={src}
        alt=""
        aria-hidden={true}
        className={`${className} todd-about-card-icon`}
      />
    </HiddenReveal>
  );
}

const ABOUT_BLOCK_SSR_STYLE = {
  willChange: "transform",
  opacity: "1",
  transform: "none",
} as const;
const ABOUT_IMAGE_SSR_STYLE = {
  willChange: "transform",
  opacity: "1",
} as const;
const ABOUT_WRAPPER_SSR_STYLE = {
  willChange: "transform",
  opacity: "1",
  transform: "translateY(-50%) translateY(70px)",
} as const;
const BLOCK_SPRING = { damping: 69, stiffness: 422, mass: 2.3 };
const IMAGE_SPRING = { damping: 60, stiffness: 500, mass: 1 };
const WRAPPER_SPRING = { bounce: 0.2, damping: 30, stiffness: 500 };

function subscribeNoop() {
  return () => {};
}

function useIsServerRender() {
  return useSyncExternalStore(subscribeNoop, () => false, () => true);
}

export type AboutRevealShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  "data-todd-name"?: string;
  "data-border"?: boolean;
  style?: CSSProperties;
};

const AboutBlockRevealedContext = createContext(false);

function useAboutBlockReveal(amount: number) {
  const isServerRender = useIsServerRender();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduced || isServerRender) return;
    const node = ref.current;
    if (!node) return;

    const sync = () => {
      const rect = node.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      // Sticky cards can be substantially covered by the previous card while
      // entering. A small pixel floor is more reliable than requiring a large
      // percentage of the transformed sticky shell.
      const requiredVisible = Math.min(rect.height * amount, 24);
      if (visibleHeight >= requiredVisible) setRevealed(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if ((entry?.intersectionRatio ?? 0) >= amount) setRevealed(true);
      },
      { threshold: [0.01, amount], rootMargin: "0px 0px -4% 0px" },
    );
    observer.observe(node);

    window.addEventListener(LENIS_SCROLL_EVENT, sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    sync();

    return () => {
      observer.disconnect();
      window.removeEventListener(LENIS_SCROLL_EVENT, sync);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [amount, reduced, isServerRender]);

  return {
    ref,
    revealed: reduced || revealed,
    isServerRender,
    reduced,
  };
}

export function AboutBlockReveal({
  children,
  className,
  id,
  "data-todd-name": dataToddName,
  style,
}: AboutRevealShellProps) {
  const isMobile = useIsMobile();
  const { ref, revealed, isServerRender, reduced } = useAboutBlockReveal(
    isMobile ? 0.12 : 0.18,
  );
  const shellStyle: CSSProperties = { ...(style ?? {}), opacity: 1 };

  if (isServerRender) {
    return (
      <AboutBlockRevealedContext.Provider value={false}>
        <div
          ref={ref}
          className={className}
          data-todd-name={dataToddName}
          data-revealed="false"
          id={id}
          style={{ ...shellStyle, ...ABOUT_BLOCK_SSR_STYLE }}
        >
          {children}
        </div>
      </AboutBlockRevealedContext.Provider>
    );
  }

  if (reduced) {
    return (
      <AboutBlockRevealedContext.Provider value={true}>
        <div
          ref={ref}
          className={className}
          data-todd-name={dataToddName}
          data-revealed="true"
          id={id}
          style={{ ...shellStyle, transform: "none" }}
        >
          {children}
        </div>
      </AboutBlockRevealedContext.Provider>
    );
  }

  return (
    <AboutBlockRevealedContext.Provider value={revealed}>
      <motion.div
        ref={ref}
        className={className}
        data-todd-name={dataToddName}
        data-revealed={revealed ? "true" : "false"}
        id={id}
        style={{ ...shellStyle, willChange: "transform" }}
        initial={{ y: 40, scale: 1, opacity: 0.001 }}
        animate={
          revealed
            ? { y: 0, scale: 1, opacity: 1 }
            : { y: 40, scale: 1, opacity: 0.001 }
        }
        transition={{ type: "spring", ...BLOCK_SPRING }}
      >
        {children}
      </motion.div>
    </AboutBlockRevealedContext.Provider>
  );
}

export function AboutImageReveal({
  children,
  className,
  "data-todd-name": dataToddName,
  style,
}: AboutRevealShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const parentRevealed = useContext(AboutBlockRevealedContext);
  const isServerRender = useIsServerRender();
  const reduced = useReducedMotion();
  const baseRotate = style?.transform?.includes("rotate") ? -180 : 0;
  const ssrTransform = style?.transform?.includes("rotate") ? style.transform : "none";
  const motionStyle: CSSProperties = { ...(style ?? {}), ...ABOUT_IMAGE_SSR_STYLE };
  if (style?.transform?.includes("rotate")) delete motionStyle.transform;

  if (isServerRender) {
    return (
      <div
        className={className}
        data-todd-name={dataToddName}
        style={{ ...motionStyle, transform: ssrTransform }}
      >
        {children}
      </div>
    );
  }

  if (reduced) {
    const reducedTransform = baseRotate ? "rotate(-180deg)" : "none";
    return (
      <div
        ref={ref}
        className={className}
        data-todd-name={dataToddName}
        style={{ ...motionStyle, transform: reducedTransform }}
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
      style={motionStyle}
        initial={{ scale: ABOUT_IMAGE_REST_SCALE, rotate: baseRotate }}
        animate={
          parentRevealed
            ? { scale: ABOUT_IMAGE_REVEAL_SCALE, rotate: baseRotate }
            : { scale: ABOUT_IMAGE_REST_SCALE, rotate: baseRotate }
        }
      transition={{ type: "spring", ...IMAGE_SPRING }}
    >
      {children}
    </motion.div>
  );
}

export function AboutWrapperReveal({
  children,
  className,
  "data-todd-name": dataToddName,
  "data-border": dataBorder,
  style,
}: AboutRevealShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const parentRevealed = useContext(AboutBlockRevealedContext);
  const isServerRender = useIsServerRender();
  const reduced = useReducedMotion();
  const isStack = useIsMobile();
  const shellStyle: CSSProperties = { ...(style ?? {}), ...(isStack ? { opacity: 1 } : ABOUT_WRAPPER_SSR_STYLE) };
  delete shellStyle.transform;

  if (isServerRender) {
    return (
      <div
        className={className}
        data-todd-name={dataToddName}
        data-border={dataBorder}
        style={isStack ? { opacity: 1, transform: "none" } : { ...shellStyle, ...ABOUT_WRAPPER_SSR_STYLE }}
      >
        {children}
      </div>
    );
  }

  if (reduced) {
    return (
      <div
        ref={ref}
        className={className}
        data-todd-name={dataToddName}
        data-border={dataBorder}
        style={{
          ...shellStyle,
          willChange: "transform",
          opacity: 1,
          transform: isStack ? "none" : "translateY(-50%)",
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
      data-border={dataBorder}
      style={{ ...shellStyle, willChange: "transform", opacity: 1 }}
      initial={
        isStack
          ? { y: 28 }
          : { transform: "translateY(calc(-50% + 70px))" }
      }
      animate={
        isStack
          ? { y: parentRevealed ? 0 : 28 }
          : {
              transform: parentRevealed
                ? "translateY(-50%)"
                : "translateY(calc(-50% + 70px))",
            }
      }
      transition={{ type: "spring", ...WRAPPER_SPRING }}
    >
      {children}
    </motion.div>
  );
}
