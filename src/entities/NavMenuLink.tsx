"use client";

import { useReducedMotion } from "motion/react";
import type { CSSProperties, ReactNode } from "react";

export interface NavMenuLinkProps {
  href: string;
  open: boolean;
  index: number;
  className: string;
  "data-framer-name": string;
  children: ReactNode;
}

/** Staggered nav overlay link entrance. */
export function NavMenuLink({
  href,
  open,
  index,
  className,
  "data-framer-name": dataFramerName,
  children,
}: NavMenuLinkProps) {
  const reduced = useReducedMotion();

  const style: CSSProperties = {
    willChange: "transform",
    opacity: open || reduced ? 1 : 0,
    transform: open || reduced ? "none" : "translateY(20px)",
    transition: reduced
      ? undefined
      : `opacity 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${open ? 0.08 * index : 0}s, transform 0.8s cubic-bezier(0.22, 1, 0.36, 1) ${open ? 0.08 * index : 0}s`,
  };

  return (
    <a
      className={className}
      data-framer-name={dataFramerName}
      data-highlight={true}
      href={href}
      style={style}
    >
      {children}
    </a>
  );
}
