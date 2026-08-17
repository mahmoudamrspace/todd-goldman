"use client";

import { useRef, type CSSProperties } from "react";
import { AnimatedSpan, HiddenReveal } from "@/features/HiddenReveal";
import { TestimonialCard } from "@/features/TestimonialCard";
import { TestimonialCardReveal, TestimonialScrollProvider } from "@/features/StickySection";
import type { TestimonialContent } from "@/content/section-types";
import { toddSceneArt } from "@/content/todd-scenes";
import { ResponsiveArtwork } from "@/entities/ResponsiveArtwork";
import { cn } from "@/shared/lib/cn";
import { TODD } from "@/shared/lib/todd-semantic-classes";

const TESTIMONIAL_LAYOUT = [
  { wrapper: "todd-testimonials__card-slot todd-testimonial__rich-text-container-8", container: "todd-testimonials__card todd-testimonial__rich-text-container-5", desktopX: -10 },
  { wrapper: "todd-testimonials__card-slot todd-testimonial__rich-text-container-7", container: "todd-testimonials__card todd-testimonial__rich-text-container-6", desktopX: 10 },
  { wrapper: "todd-testimonials__card-slot todd-testimonial__rich-text-container-3", container: "todd-testimonials__card todd-testimonial__rich-text-container-4", desktopX: -6 },
  { wrapper: "todd-testimonials__card-slot todd-testimonial__rich-text-container-9", container: "todd-testimonials__card todd-testimonial__rich-text-container-2", desktopX: 6 },
] as const;

function TestimonialTitle({ words }: { words: readonly string[] }) {
  return (
    <>
      <AnimatedSpan className="todd-testimonials__title-word" delay={0} y={16}>
        {words[0]}
      </AnimatedSpan>{" "}
      <AnimatedSpan
        className="todd-testimonials__title-word todd-testimonials__title-word--accent"
        delay={0.12}
        y={16}
      >
        {words[1]}
      </AnimatedSpan>{" "}
      <AnimatedSpan className="todd-testimonials__title-word" delay={0.24} y={16}>
        {words[2]}
      </AnimatedSpan>
    </>
  );
}

function TestimonialSvgUse({
  href,
  className,
  name,
}: {
  href: string;
  className: string;
  name: string;
}) {
  return (
    <div
      data-todd-component-type="SVG"
      data-todd-name={name}
      data-todd-shadows
      className={className}
      aria-hidden={true}
      style={{ imageRendering: "pixelated", flexShrink: "0" }}
    >
      <div
        className="svgContainer"
        style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
      >
        <svg style={{ width: "100%", height: "100%" }}>
          <use href={href} />
        </svg>
      </div>
    </div>
  );
}

function entryRevealStyle(desktopX: number): CSSProperties {
  return {
    willChange: "transform",
    opacity: "0",
    transform: `translateX(${desktopX}px) translateY(30px)`,
    ["--testimonial-entry-x" as string]: `${desktopX}px`,
  };
}

function TestimonialItemSlot({
  index,
  layout,
  item,
  iconSrc,
}: {
  index: number;
  layout: (typeof TESTIMONIAL_LAYOUT)[number];
  item: TestimonialContent["items"][number];
  iconSrc?: string;
}) {
  return (
    <div
      className={layout.wrapper}
      data-todd-name={`Item ${String(index + 1).padStart(2, "0")}`}
    >
      <TestimonialCardReveal
        index={index}
        className={cn(layout.container, "todd-testimonials__card-reveal")}
        data-todd-name="Testimonial item"
        style={entryRevealStyle(layout.desktopX)}
        revealDelay={index * 0.08}
      >
        <TestimonialCard item={item} index={index} iconSrc={iconSrc} />
      </TestimonialCardReveal>
    </div>
  );
}

export function Testimonial({ content }: { content: TestimonialContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const titleId = "testimonial-section-title";

  return (
    <TestimonialScrollProvider targetRef={sectionRef}>
      <section
        ref={sectionRef}
        className={cn(TODD.testimonial.section, "todd-intro__wrapper-9")}
        data-todd-name="Testimonial"
        id="testimonial-section"
        aria-labelledby={titleId}
      >
        <div className={cn(TODD.testimonial.container, "todd-testimonials__container")} data-todd-name="Container">
          <div className="todd-testimonial__sticky-item" data-todd-name="Sticky Item">
            <HiddenReveal
              variant="testimonial-title"
              className={cn(TODD.testimonial.title, "todd-testimonial__title")}
              data-todd-name="Title"
              style={{
                willChange: "transform",
                opacity: "0",
                transform: "translateY(30px)",
              }}
            >
              <HiddenReveal
                variant="testimonial-image"
                className="todd-testimonials__legacy-art todd-intro__wrapper-14"
                data-todd-name="Image svg"
                style={{
                  willChange: "transform",
                  opacity: "0",
                  transform: "translateY(170px)",
                }}
              >
                <ResponsiveArtwork
                  desktop={
                    <TestimonialSvgUse
                      href="#svg-59833478_2778"
                      className="todd-testimonial__men"
                      name="Men"
                    />
                  }
                  tablet={
                    <TestimonialSvgUse
                      href="#svg269641803_3015"
                      className="todd-testimonial__men"
                      name="Men"
                    />
                  }
                  mobile={
                    <TestimonialSvgUse
                      href="#svg-1970339206_2864"
                      className="todd-testimonial__men"
                      name="Men"
                    />
                  }
                />
                <ResponsiveArtwork
                  desktop={
                    <TestimonialSvgUse
                      href="#svg1725171633_3475"
                      className="todd-testimonial__women-svg"
                      name="Women svg"
                    />
                  }
                  tablet={
                    <TestimonialSvgUse
                      href="#svg1716952079_3688"
                      className="todd-testimonial__women-svg"
                      name="Women svg"
                    />
                  }
                  mobile={
                    <TestimonialSvgUse
                      href="#svg715276639_3470"
                      className="todd-testimonial__women-svg"
                      name="Women svg"
                    />
                  }
                />
              </HiddenReveal>
              <HiddenReveal
                className="todd-testimonials__main-art"
                variant="section-artwork"
                style={{
                  willChange: "transform",
                  opacity: "0",
                  transform: "translateY(40px)",
                }}
              >
                <img src={toddSceneArt.testimonialMain} alt="" aria-hidden={true} />
              </HiddenReveal>
              <div
                className="todd-testimonials__title-copy todd-testimonial__title-text"
                data-todd-name="Title Text"
                style={{ transform: "none" }}
              >
                <div
                  className="todd-testimonial__rich-text-container"
                  data-todd-component-type="RichTextContainer"
                  style={{ transform: "none" }}
                >
                  <h2
                    id={titleId}
                    dir="auto"
                    className="todd-text testimonial-section-title"
                  >
                    <TestimonialTitle words={content.titleWords} />
                  </h2>
                </div>
              </div>
            </HiddenReveal>
            <div className="todd-testimonial__list" data-todd-name="List" id="list">
              {content.items.map((item, index) => {
                const layout =
                  TESTIMONIAL_LAYOUT[index] ??
                  TESTIMONIAL_LAYOUT[index % TESTIMONIAL_LAYOUT.length]!;
                return (
                  <TestimonialItemSlot
                    key={`${item.author}-${index}`}
                    index={index}
                    layout={layout}
                    item={item}
                    iconSrc={content.icons[index % content.icons.length]}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </section>
    </TestimonialScrollProvider>
  );
}
