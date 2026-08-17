"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { AnimatedSpan, HiddenReveal } from "@/features/HiddenReveal";
import { TestimonialCard } from "@/features/TestimonialCard";
import { TestimonialCardReveal, TestimonialScrollProvider } from "@/features/StickySection";
import type { TestimonialContent } from "@/content/section-types";
import { toddSceneArt } from "@/content/todd-scenes";
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

function revealStyle(
  desktopX: number,
  variant: "desktop" | "stack",
): CSSProperties {
  if (variant === "desktop") {
    return {
      willChange: "transform",
      opacity: "0",
      transform: `translateX(${desktopX}px) translateY(30px)`,
    };
  }
  return {
    willChange: "transform",
    opacity: "0",
    transform: "translateY(30px)",
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
  const card = <TestimonialCard item={item} index={index} iconSrc={iconSrc} />;

  const desktopReveal = (children: ReactNode) => (
    <TestimonialCardReveal
      index={index}
      className={layout.container}
      data-todd-name="Testimonial item"
      style={revealStyle(layout.desktopX, "desktop")}
    >
      {children}
    </TestimonialCardReveal>
  );

  const stackReveal = (children: ReactNode) => (
    <HiddenReveal
      variant="testimonial-card"
      delay={index * 0.08}
      className={layout.container}
      style={revealStyle(0, "stack")}
    >
      {children}
    </HiddenReveal>
  );

  return (
    <div
      className={layout.wrapper}
      data-todd-name={`Item ${String(index + 1).padStart(2, "0")}`}
    >
      <div className="ssr-variant todd-hide-mobile todd-hide-tablet">
        {desktopReveal(card)}
      </div>
      <div className="ssr-variant todd-hide-tablet todd-hide-desktop">
        {stackReveal(<TestimonialCard item={item} index={index} width="fluid" iconSrc={iconSrc} />)}
      </div>
      <div className="ssr-variant todd-hide-mobile todd-hide-desktop">
        {stackReveal(card)}
      </div>
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
                <div className="ssr-variant todd-hide-mobile todd-hide-tablet">
                  <div
                    data-todd-component-type="SVG"
                    data-todd-name="Men"
                    data-todd-shadows
                    className="todd-testimonial__men"
                    aria-hidden={true}
                    style={{ imageRendering: "pixelated", flexShrink: "0" }}
                  >
                    <div
                      className="svgContainer"
                      style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
                    >
                      <svg style={{ width: "100%", height: "100%" }}>
                        <use href="#svg-59833478_2778" />
                        </svg>
                    </div>
                  </div>
                </div>
                <div className="ssr-variant todd-hide-tablet todd-hide-desktop">
                  <div
                    data-todd-component-type="SVG"
                    data-todd-name="Men"
                    data-todd-shadows
                    className="todd-testimonial__men"
                    aria-hidden={true}
                    style={{ imageRendering: "pixelated", flexShrink: "0" }}
                  >
                    <div
                      className="svgContainer"
                      style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
                    >
                      <svg style={{ width: "100%", height: "100%" }}>
                        <use href="#svg-1970339206_2864" />
                        </svg>
                    </div>
                  </div>
                </div>
                <div className="ssr-variant todd-hide-mobile todd-hide-desktop">
                  <div
                    data-todd-component-type="SVG"
                    data-todd-name="Men"
                    data-todd-shadows
                    className="todd-testimonial__men"
                    aria-hidden={true}
                    style={{ imageRendering: "pixelated", flexShrink: "0" }}
                  >
                    <div
                      className="svgContainer"
                      style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
                    >
                      <svg style={{ width: "100%", height: "100%" }}>
                        <use href="#svg269641803_3015" />
                        </svg>
                    </div>
                  </div>
                </div>
                <div className="ssr-variant todd-hide-mobile todd-hide-tablet">
                  <div
                    data-todd-component-type="SVG"
                    data-todd-name="Women svg"
                    data-todd-shadows
                    className="todd-testimonial__women-svg"
                    aria-hidden={true}
                    style={{ imageRendering: "pixelated", flexShrink: "0" }}
                  >
                    <div
                      className="svgContainer"
                      style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
                    >
                      <svg style={{ width: "100%", height: "100%" }}>
                        <use href="#svg1725171633_3475" />
                        </svg>
                    </div>
                  </div>
                </div>
                <div className="ssr-variant todd-hide-tablet todd-hide-desktop">
                  <div
                    data-todd-component-type="SVG"
                    data-todd-name="Women svg"
                    data-todd-shadows
                    className="todd-testimonial__women-svg"
                    aria-hidden={true}
                    style={{ imageRendering: "pixelated", flexShrink: "0" }}
                  >
                    <div
                      className="svgContainer"
                      style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
                    >
                      <svg style={{ width: "100%", height: "100%" }}>
                        <use href="#svg715276639_3470" />
                        </svg>
                    </div>
                  </div>
                </div>
                <div className="ssr-variant todd-hide-mobile todd-hide-desktop">
                  <div
                    data-todd-component-type="SVG"
                    data-todd-name="Women svg"
                    data-todd-shadows
                    className="todd-testimonial__women-svg"
                    aria-hidden={true}
                    style={{ imageRendering: "pixelated", flexShrink: "0" }}
                  >
                    <div
                      className="svgContainer"
                      style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}
                    >
                      <svg style={{ width: "100%", height: "100%" }}>
                        <use href="#svg1716952079_3688" />
                        </svg>
                    </div>
                  </div>
                </div>
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
                <div className="ssr-variant todd-hide-mobile todd-hide-tablet">
                  <div
                    className="todd-testimonial__rich-text-container"
                    data-todd-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <h2
                      id={titleId}
                      dir="auto"
                      style={{
                        "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
                        "--todd-font-family":
                          '"Inter Display", "Inter Display Placeholder", sans-serif',
                        "--todd-font-size": "72px",
                        "--todd-font-weight": "700",
                        "--todd-letter-spacing": "-0.03em",
                        "--todd-line-height": "1em",
                        "--todd-text-alignment": "center",
                        "--todd-text-color":
                          "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                      }}
                      className="todd-text"
                    >
                      <TestimonialTitle words={content.titleWords} />
                          </h2>
                  </div>
                </div>
                <div className="ssr-variant todd-hide-tablet todd-hide-desktop">
                  <div
                    className="todd-testimonial__rich-text-container"
                    data-todd-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <h2
                      dir="auto"
                      style={{
                        "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
                        "--todd-font-family":
                          '"Inter Display", "Inter Display Placeholder", sans-serif',
                        "--todd-font-size": "36px",
                        "--todd-font-weight": "700",
                        "--todd-letter-spacing": "-0.03em",
                        "--todd-line-height": "1em",
                        "--todd-text-alignment": "center",
                        "--todd-text-color":
                          "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
                      }}
                      className="todd-text"
                    >
                      <TestimonialTitle words={content.titleWords} />
                          </h2>
                  </div>
                </div>
                <div className="ssr-variant todd-hide-mobile todd-hide-desktop">
                  <div
                    className="todd-testimonial__rich-text-container"
                    data-todd-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <h2
                      dir="auto"
                      style={{
                        "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
                        "--todd-font-family":
                          '"Inter Display", "Inter Display Placeholder", sans-serif',
                        "--todd-font-size": "57px",
                        "--todd-font-weight": "700",
                        "--todd-letter-spacing": "-0.03em",
                        "--todd-line-height": "1em",
                        "--todd-text-alignment": "center",
                        "--todd-text-color":
                          "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                      }}
                      className="todd-text"
                    >
                      <TestimonialTitle words={content.titleWords} />
                          </h2>
                  </div>
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
