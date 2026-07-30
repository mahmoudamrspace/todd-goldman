"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useTransform,
} from "motion/react";
import { useRef, type ReactNode } from "react";
import { chapterScrollRange } from "@/shared/lib/motion";
import { cn } from "@/shared/lib/cn";

export interface ScrollChapterProps {
  children: ReactNode;
  className?: string;
  id?: string;
  /** Visual accent for chapter divider line */
  accent?: "cream" | "dark" | "paper";
}

/** Subtle section entry/exit tied to scroll — Todd homepage acts only. */
export function ScrollChapter({
  children,
  className,
  id,
  accent = "paper",
}: ScrollChapterProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(
    scrollYProgress,
    [...chapterScrollRange.opacityInput],
    [...chapterScrollRange.opacity],
  );
  const y = useTransform(
    scrollYProgress,
    [...chapterScrollRange.yInput],
    [...chapterScrollRange.y],
  );
  const lineScale = useTransform(scrollYProgress, [0.05, 0.2], [0, 1]);

  if (reduced) {
    return (
      <section ref={ref} className={cn("todd-chapter", className)} id={id}>
        {children}
      </section>
    );
  }

  return (
    <motion.section
      ref={ref}
      className={cn("todd-chapter", className)}
      id={id}
      style={{ opacity, y }}
    >
      <motion.div
        className={cn("todd-chapter__line", `todd-chapter__line--${accent}`)}
        aria-hidden="true"
        style={{ scaleX: lineScale }}
      />
      {children}
    </motion.section>
  );
}
