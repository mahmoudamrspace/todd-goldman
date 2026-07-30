"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { cn } from "@/shared/lib/cn";

export interface ScrollChapterProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Visual accent for chapter divider line */
  accent?: "cream" | "dark" | "paper";
}

/**
 * Todd homepage chapter marker — scroll-linked accent line only.
 * Section content stays a direct layout participant (no wrapper transform/opacity).
 */
export function ScrollChapter({
  children,
  className,
  id,
  accent = "paper",
}: ScrollChapterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const lineScale = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  return (
    <div ref={ref} className={cn("todd-chapter", className)} id={id}>
      {reduced ? (
        <div
          className={cn("todd-chapter__line", `todd-chapter__line--${accent}`, "is-static")}
          aria-hidden="true"
        />
      ) : (
        <motion.div
          className={cn("todd-chapter__line", `todd-chapter__line--${accent}`)}
          aria-hidden="true"
          style={{ scaleX: lineScale }}
        />
      )}
      {children}
    </div>
  );
}
