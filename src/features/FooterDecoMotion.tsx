"use client";

import {
  motion,
  useInView,
  useReducedMotion,
  type Transition,
  type TargetAndTransition,
} from "motion/react";
import {
  useRef,
  useState,
  type CSSProperties,
  type ReactNode,
} from "react";

export type FooterDecoPreset = "default" | "stem4" | "stem6";

/** Loop phase-0 pose for footer decoration motion. */
export const FOOTER_DECO_SETTLED_TRANSFORM = "translate3d(0px, 0px, 0px) scale(1) rotate(0deg)";

const ENTER_DEFAULT = { x: -10, y: 50, scale: 0.9, opacity: 1 };
const ENTER_STEM4 = { x: -5, y: 40, scale: 0.9, opacity: 1 };

const LOOP_DEFAULT = { x: [0, 3, 0], y: [0, 3, 0], rotate: [0, 1, 0] };
const LOOP_STEM4 = { x: [0, 1, 0], y: [0, 3, 0], rotate: [0, 1, 0] };
const LOOP_STEM6 = { x: [0, -1, 0], y: [0, 3, 0], rotate: [0, 1, 0] };

const LOOP_TRANSITION: Transition = {
  duration: 4.5,
  repeat: Infinity,
  repeatType: "mirror",
  ease: [0.44, 0, 0.56, 1],
};

function presetInitial(preset: FooterDecoPreset): TargetAndTransition {
  return preset === "stem4" ? ENTER_STEM4 : ENTER_DEFAULT;
}

function presetEnterTransition(preset: FooterDecoPreset): Transition {
  return preset === "stem4"
    ? { type: "spring", bounce: 0.5, delay: 0, duration: 1.3 }
    : { type: "spring", bounce: 0.5, delay: 0.1, duration: 1.3 };
}

function presetLoop(preset: FooterDecoPreset): TargetAndTransition {
  if (preset === "stem4") return LOOP_STEM4;
  if (preset === "stem6") return LOOP_STEM6;
  return LOOP_DEFAULT;
}

export function FooterDecoMotion({
  children,
  className,
  preset = "default",
  "data-todd-name": dataToddName,
  style,
}: {
  children: ReactNode;
  className?: string;
  preset?: FooterDecoPreset;
  "data-todd-name"?: string;
  style?: CSSProperties;
}) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { amount: 0.5 });
  const [hasEntered, setHasEntered] = useState(false);

  if (reduced) {
    return (
      <div
        ref={ref}
        className={className}
        data-todd-name={dataToddName}
        style={style}
      >
        {children}
      </div>
    );
  }

  const initial = presetInitial(preset);
  const loopTarget = presetLoop(preset);

  let animate: TargetAndTransition = initial;
  let transition: Transition = presetEnterTransition(preset);

  if (isInView && hasEntered) {
    animate = { x: 0, y: 0, scale: 1, opacity: 1, ...loopTarget };
    transition = LOOP_TRANSITION;
  } else if (isInView) {
    animate = { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 };
  } else if (hasEntered) {
    animate = { x: 0, y: 0, scale: 1, opacity: 1, rotate: 0 };
    transition = { duration: 0 };
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      data-todd-name={dataToddName}
      data-footer-deco-motion=""
      style={{ ...style, transform: undefined, willChange: "transform" }}
      initial={initial}
      animate={animate}
      transition={transition}
      onAnimationComplete={() => {
        if (isInView && !hasEntered) setHasEntered(true);
      }}
    >
      {children}
    </motion.div>
  );
}
