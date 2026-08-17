"use client";

import { AnimatedSpan } from "@/features/HiddenReveal";
import { Appear } from "@/features/Appear";
import type { SiteSettings } from "@/content/types";
import { cn } from "@/shared/lib/cn";
import { responsiveHiddenOn } from "@/shared/lib/todd-semantic-classes";

type TimelineEntry = SiteSettings["talks"][number];

const ROW_APPEAR = [
  { id: "17sob6t", className: "todd-about__rich-text-container-5" },
  { id: "qj8w5o", className: "todd-about__rich-text-container-21" },
  { id: "1vmjjvi", className: "todd-about__rich-text-container-15" },
  { id: "1okuu50", className: "todd-about__rich-text-container-12" },
] as const;

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

function TimelineSeparator() {
  return (
    <>
      <AnimatedSpan y={10}> </AnimatedSpan>
      <AnimatedSpan y={10}> </AnimatedSpan>
      <AnimatedSpan y={10}>/</AnimatedSpan>
      <AnimatedSpan y={10}> </AnimatedSpan>
      <AnimatedSpan y={10}> </AnimatedSpan>
    </>
  );
}

export interface AboutTimelineRowProps {
  entry: TimelineEntry;
  index: number;
}

/** One timeline milestone row for the About section. */
export function AboutTimelineRow({ entry, index }: AboutTimelineRowProps) {
  const appear = ROW_APPEAR[index] ?? ROW_APPEAR[0];
  const hideTrailingColumnsOnMobile = index === 0;

  return (
    <div className="ssr-variant">
      <Appear
        id={appear.id}
        className={appear.className}
        style={{ opacity: "0.001", transform: "none" }}
      >
        <div
          className={cn(
            "todd-about__desktop-4",
            "todd-about__desktop",
            "todd-about__responsive-row",
            "todd-about-timeline__row-border",
          )}
          data-border={true}
          data-todd-name="Desktop"
        >
          <div className="todd-about__rich-text-container-3">
            <div
              className={cn(
                "todd-about__rich-text-container-18",
                "todd-about-timeline__year",
              )}
              data-todd-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p dir="auto" className="todd-text">
                <AnimatedWords text={entry.year} />
              </p>
            </div>
            <div
              className={cn("todd-about__rich-text-container", "todd-about-timeline__sep")}
              data-todd-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p dir="auto" className="todd-text">
                <TimelineSeparator />
              </p>
            </div>
            <div
              className={cn(
                "todd-about__rich-text-container-10",
                "todd-about-timeline__milestone",
              )}
              data-todd-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p dir="auto" className="todd-text">
                <AnimatedWords text={entry.milestone} />
              </p>
            </div>
            <div
              className={cn(
                "todd-about__rich-text-container-7",
                "todd-about-timeline__sep",
                hideTrailingColumnsOnMobile && responsiveHiddenOn("mobile"),
              )}
              data-todd-component-type="RichTextContainer"
              style={{ transform: "none" }}
            >
              <p dir="auto" className="todd-text">
                <TimelineSeparator />
              </p>
            </div>
          </div>
          <div
            className={cn(
              "todd-about__rich-text-container-2",
              "todd-about-timeline__location",
              hideTrailingColumnsOnMobile && responsiveHiddenOn("mobile"),
            )}
            data-todd-component-type="RichTextContainer"
            style={{ transform: "none" }}
          >
            <p dir="auto" className="todd-text">
              <AnimatedSpan y={10}>{entry.location}</AnimatedSpan>
            </p>
          </div>
        </div>
      </Appear>
    </div>
  );
}
