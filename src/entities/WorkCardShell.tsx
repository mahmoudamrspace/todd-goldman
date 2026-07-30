"use client";

import type { ReactNode } from "react";

export interface WorkCardShellProps {
  slug: string;
  activeSlug: string | null;
  onHover: (slug: string | null) => void;
  children: ReactNode;
  className: string;
  style: Record<string, string | number>;
  framerName?: string;
}

/** Hover-enabled work card shell preserving Framer project item classes. */
export function WorkCardShell({
  slug,
  activeSlug,
  onHover,
  children,
  className,
  style,
  framerName = "Desktop",
}: WorkCardShellProps) {
  const hovered = activeSlug === slug;

  return (
    <div
      className={`${className}${hovered ? " framer-v-hover" : ""}`}
      data-framer-name={framerName}
      data-framer-hover={hovered ? "true" : undefined}
      data-highlight={true}
      data-work-slug={slug}
      onMouseEnter={() => onHover(slug)}
      onMouseLeave={() => onHover(null)}
      style={style}
    >
      {children}
    </div>
  );
}
