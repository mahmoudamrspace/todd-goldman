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
    wrapperClass: "framer-xRhCW framer-ozfvi4 framer-v-ozfvi4",
    wrapperStyle: { height: "100%", width: "100%" } satisfies CSSProperties,
  },
  type2: {
    viewBox: "0 0 275 73",
    width: "100%",
    height: "100%",
    path: "M 4 45.478 C 4 45.478 68.5 52 137 45.478 C 205.5 38.956 275 45.478 275 45.478",
    strokeWidth: 5,
    wrapperClass: "framer-RbzYk framer-1yp7kof framer-v-1yp7kof",
  },
  mobile: {
    viewBox: "0 0 276 73",
    width: "100%",
    height: "100%",
    path: "M 48 54.31 C 48 54.31 143.013 46.835 228 54.31",
    strokeWidth: 3,
    wrapperClass: "framer-qfzAQ framer-1l1pyqw framer-v-1l1pyqw",
  },
  type3: {
    viewBox: "0 0 275 73",
    width: "100%",
    height: "100%",
    path: "M 60 53.31 C 60 53.31 137.955 44.31 203 53.31",
    strokeWidth: 5,
    wrapperClass: "framer-Kd6Hd framer-60w5ht framer-v-60w5ht",
  },
  workMeta: {
    viewBox: "0 0 275 73",
    width: "100%",
    height: "100%",
    path: "M 76 52.988 C 76 52.988 141.453 50.738 200 52.988",
    strokeWidth: 3,
    wrapperClass: "framer-pyv3V framer-1urfguw framer-v-nr5uyv",
    innerClass: "framer-17n0gzn-container",
    wrapperStyle: { height: "100%", width: "100%" } satisfies CSSProperties,
    framerName: "Animate",
  },
} as const;

export type ScribbleVariant = keyof typeof VARIANTS;

export interface ScribbleProps {
  variant: ScribbleVariant;
  className?: string;
}

/** Animated SVG scribble underline matching Framer export paths and wrapper classes. */
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
      data-framer-name={"framerName" in config ? config.framerName : "Default"}
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
