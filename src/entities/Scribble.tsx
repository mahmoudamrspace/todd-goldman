"use client";

import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties } from "react";

const STROKE = "rgb(255, 70, 46)";
const EASE = [0.44, 0, 0.56, 1] as const;
const DURATION = 1.3;

const VARIANTS = {
  type1: {
    viewBox: "0 0 262 73",
    width: "100%",
    height: "100%",
    path: "M 13 54.5 C 13 54.5 141.925 40.573 249.5 54.5",
    strokeWidth: 5,
    wrapperClass: "todd-layout__utility-541-11 todd-layout__utility-541-8 todd-layout__utility-022",
    wrapperStyle: { height: "100%", width: "100%" } satisfies CSSProperties,
  },
  type2: {
    viewBox: "0 0 275 73",
    width: "100%",
    height: "100%",
    path: "M 4 45.478 C 4 45.478 68.5 52 137 45.478 C 205.5 38.956 275 45.478 275 45.478",
    strokeWidth: 5,
    wrapperClass: "todd-layout__utility-541-7 todd-layout__utility-541-4 todd-layout__utility-014",
  },
  mobile: {
    viewBox: "0 0 276 73",
    width: "100%",
    height: "100%",
    path: "M 48 54.31 C 48 54.31 143.013 46.835 228 54.31",
    strokeWidth: 3,
    wrapperClass: "todd-layout__utility-541-10 todd-layout__utility-541-2 todd-layout__utility-009",
  },
  type3: {
    viewBox: "0 0 275 73",
    width: "100%",
    height: "100%",
    path: "M 60 53.31 C 60 53.31 137.955 44.31 203 53.31",
    strokeWidth: 5,
    wrapperClass: "todd-layout__utility-541-6 todd-layout__utility-541-5 todd-layout__utility-016",
  },
  workMeta: {
    viewBox: "0 0 275 73",
    width: "100%",
    height: "100%",
    path: "M 76 52.988 C 76 52.988 141.453 50.738 200 52.988",
    strokeWidth: 3,
    wrapperClass: "todd-layout__utility-541-9 todd-layout__utility-541-3 todd-layout__utility-020",
    innerClass: "todd-layout__utility-541",
    wrapperStyle: { height: "100%", width: "100%" } satisfies CSSProperties,
    toddName: "Animate",
  },
} as const;

export type ScribbleVariant = keyof typeof VARIANTS;

export interface ScribbleProps {
  variant: ScribbleVariant;
  className?: string;
}

/** Animated SVG scribble underline matching legacy export export paths and wrapper classes. */
export function Scribble({ variant, className }: ScribbleProps) {
  const reduced = useReducedMotion();
  const config = VARIANTS[variant];
  const captureReady = variant === "workMeta" || variant === "type2";

  const pathProps = captureReady
    ? {
        initial: { pathLength: 1, opacity: 1 },
        animate: { pathLength: 1, opacity: 1 },
      }
    : {
        initial: reduced ? { pathLength: 1, opacity: 1 } : { pathLength: 0, opacity: 0 },
        whileInView: reduced ? undefined : { pathLength: 1, opacity: 1 },
        viewport: { once: true, amount: 0.5 },
        transition: { duration: DURATION, ease: EASE },
      };

  const pathEl = (
    <motion.path
      d={config.path}
      fill="transparent"
      stroke={STROKE}
      strokeWidth={config.strokeWidth}
      strokeLinecap="round"
      {...pathProps}
    />
  );

  return (
    <div
      className={[config.wrapperClass, className].filter(Boolean).join(" ")}
      data-todd-name={"toddName" in config ? config.toddName : "Default"}
      style={"wrapperStyle" in config ? config.wrapperStyle : undefined}
    >
      {"innerClass" in config ? (
        <div className={config.innerClass}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={config.width}
            height={config.height}
            viewBox={config.viewBox}
            aria-hidden
            style={{
              width: "100%",
              height: "100%",
              display: "flex",
              placeContent: "center",
              placeItems: "center",
              backgroundColor: "transparent",
              overflow: "hidden",
            }}
          >
            {pathEl}
          </svg>
        </div>
      ) : (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={config.width}
          height={config.height}
          viewBox={config.viewBox}
          aria-hidden
          style={{
            width: "100%",
            height: "100%",
            display: "block",
            backgroundColor: "transparent",
            overflow: "hidden",
          }}
        >
          {pathEl}
        </svg>
      )}
    </div>
  );
}
