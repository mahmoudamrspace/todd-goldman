"use client";

import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { HiddenReveal } from "@/features/HiddenReveal";
import { AnimatedSpan } from "@/features/HiddenReveal";
import { sectionMotion } from "@/shared/lib/motion";

export interface SectionHeadingProps {
  id?: string;
  eyebrow?: string;
  titleLead: ReactNode;
  titleEmphasis?: ReactNode;
  subtitle?: string;
  /** When true, wraps title words in AnimatedSpan (desktop motion). */
  animateTitle?: boolean;
  /** When set to `books`, coordinates replay with BooksReplayProvider. */
  replayGroup?: "books";
  /** Legacy section class hooks for existing CSS contracts. */
  rootClassName?: string;
  eyebrowClassName?: string;
  titleClassName?: string;
  titleRevealClassName?: string;
  subtitleClassName?: string;
  /** When false, subtitle renders without HiddenReveal (mobile Works parity). */
  revealSubtitle?: boolean;
}

/** Shared section heading with optional reveal motion. */
export function SectionHeading({
  id,
  eyebrow,
  titleLead,
  titleEmphasis,
  subtitle,
  animateTitle = false,
  replayGroup,
  revealSubtitle = true,
  rootClassName,
  eyebrowClassName = "todd-section-heading__eyebrow",
  titleClassName = "todd-section-heading__title",
  titleRevealClassName,
  subtitleClassName = "todd-section-heading__subtitle",
}: SectionHeadingProps) {
  const title = (
    <h2 className={cn("todd-text", titleClassName)} id={id}>
      {animateTitle ? (
        <>
          <AnimatedSpan y={10}>{titleLead}</AnimatedSpan>{" "}
          {titleEmphasis ? (
            <em>
              <AnimatedSpan y={10} delay={0.06}>
                {titleEmphasis}
              </AnimatedSpan>
            </em>
          ) : null}
        </>
      ) : (
        <>
          {titleLead}
          {titleEmphasis ? (
            <>
              {" "}
              <em>{titleEmphasis}</em>
            </>
          ) : null}
        </>
      )}
    </h2>
  );

  const titleReveal = titleRevealClassName ? (
    <HiddenReveal
      variant="section-heading"
      replayGroup={replayGroup}
      delay={sectionMotion.stagger}
      className={titleRevealClassName}
      style={{ opacity: 0, transform: `translateY(${sectionMotion.contentY}px)` }}
    >
      {title}
    </HiddenReveal>
  ) : (
    title
  );

  const subtitleNode = subtitle ? (
    <p className={subtitleClassName}>{subtitle}</p>
  ) : null;

  return (
    <div className={cn("todd-section-heading", rootClassName)}>
      {eyebrow ? (
        <HiddenReveal
          variant="section-row"
          replayGroup={replayGroup}
          delay={0.1}
          style={{ opacity: 0, transform: `translateY(${sectionMotion.softY}px)` }}
        >
          <p className={eyebrowClassName}>{eyebrow}</p>
        </HiddenReveal>
      ) : null}
      {titleReveal}
      {subtitleNode && revealSubtitle ? (
        <HiddenReveal
          variant="section-row"
          replayGroup={replayGroup}
          delay={0.18}
          style={{ opacity: 0, transform: `translateY(${sectionMotion.softY}px)` }}
        >
          {subtitleNode}
        </HiddenReveal>
      ) : subtitleNode ? (
        subtitleNode
      ) : null}
    </div>
  );
}
