"use client";

import { navOverlaySpring } from "@/shared/lib/motion";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

export interface NavOverlayPanelProps {
  open: boolean;
  axis?: "x" | "y";
  offset?: number;
  delay?: number;
  className?: string;
  "data-framer-name"?: string;
  style?: CSSProperties;
  children: ReactNode;
}

/** Open-triggered nav overlay panel matching Framer spring entrance. */
export function NavOverlayPanel({
  open,
  axis = "x",
  offset = 20,
  delay = 0.4,
  className,
  "data-framer-name": dataFramerName,
  style,
  children,
}: NavOverlayPanelProps) {
  const reduced = useReducedMotion();
  const hidden =
    axis === "x" ? { opacity: 0, x: offset } : { opacity: 0, y: offset };
  const visible = { opacity: 1, x: 0, y: 0 };

  if (reduced) {
    return (
      <div
        className={className}
        data-framer-name={dataFramerName}
        style={{
          ...style,
          opacity: open ? 1 : 0,
          pointerEvents: open ? undefined : "none",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      className={className}
      data-framer-name={dataFramerName}
      style={style}
      initial={false}
      animate={open ? visible : hidden}
      transition={{ ...navOverlaySpring, delay: open ? delay : 0 }}
    >
      {children}
    </motion.div>
  );
}
