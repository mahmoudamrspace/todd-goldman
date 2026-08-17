"use client";

import { AnimatedSpan } from "@/features/HiddenReveal";
import type { SiteSettings } from "@/content/types";

type TimelineEntry = SiteSettings["talks"][number];

function AnimatedWords({ text }: { text: string }) {
  const words = text.split(/\s+/).filter(Boolean);
  return (
    <>
      {words.map((word, wi) => (
        <AnimatedSpan key={`${text}-${wi}`} y={10}>
          {word}
          {wi < words.length - 1 ? " " : ""}
        </AnimatedSpan>
      ))}
    </>
  );
}

export interface AboutTimelineRowProps {
  entry: TimelineEntry;
  index: number;
  variant: "desktop" | "tablet" | "mobile";
}

/** One timeline milestone row for the About section. */
export function AboutTimelineRow({ entry, index, variant }: AboutTimelineRowProps) {
  const yearClass =
    variant === "mobile"
      ? "todd-layout__utility-001"
      : variant === "tablet"
        ? "todd-layout__utility-001"
        : "todd-layout__utility-001";

  return (
    <div
      className={yearClass}
      data-todd-name={`Timeline ${String(index + 1).padStart(2, "0")}`}
      data-about-timeline-index={index}
    >
      <div
        className="todd-nav-overlay-content__desktop-4-2"
        data-todd-component-type="RichTextContainer"
        style={{ transform: "none" }}
      >
        <p className="todd-text" dir="auto">
          <AnimatedWords text={entry.year} />
        </p>
      </div>
      <div
        className="todd-nav-overlay-content__desktop-4-3"
        data-todd-component-type="RichTextContainer"
        style={{ transform: "none" }}
      >
        <p className="todd-text" dir="auto">
          <AnimatedWords text={entry.milestone} />
        </p>
      </div>
      <div
        className="todd-nav-overlay-content__desktop-4-2"
        data-todd-component-type="RichTextContainer"
        style={{ transform: "none" }}
      >
        <p className="todd-text" dir="auto">
          <AnimatedSpan y={10}>{entry.location}</AnimatedSpan>
        </p>
      </div>
    </div>
  );
}
