"use client";

import type { ReactNode } from "react";

export interface WorkCardShellProps {
  slug: string;
  activeSlug: string | null;
  onHover: (slug: string | null) => void;
  children: ReactNode;
  className: string;
  style: Record<string, string | number>;
  toddName?: string;
}

/** Hover-enabled work card shell preserving legacy export project item classes. */
export function WorkCardShell({
  slug,
  activeSlug,
  onHover,
  children,
  className,
  style,
  toddName = "Desktop",
}: WorkCardShellProps) {
  const hovered = activeSlug === slug;

  return (
    <div
      className={`${className}${hovered ? " todd-nav-overlay-content__desktop-4-6-hover" : ""}`}
      data-todd-name={toddName}
      data-todd-hover={hovered ? "true" : undefined}
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
