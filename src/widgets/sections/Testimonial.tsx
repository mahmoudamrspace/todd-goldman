"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { HiddenReveal } from "@/features/HiddenReveal";
import { TestimonialCard } from "@/features/TestimonialCard";
import { TestimonialCardReveal, TestimonialScrollProvider } from "@/features/StickySection";
import type { TestimonialContent } from "@/content/section-types";

const TESTIMONIAL_LAYOUT = [
  { wrapper: "framer-y8llkh", container: "framer-gchszw-container", desktopX: -10 },
  { wrapper: "framer-wqj7jz", container: "framer-uogkai-container", desktopX: 10 },
  { wrapper: "framer-5prhlu", container: "framer-fti0o9-container", desktopX: -6 },
  { wrapper: "framer-yg6igt", container: "framer-1l3xeqf-container", desktopX: 6 },
] as const;

function TestimonialTitle({ words }: { words: readonly string[] }) {
  return (
    <>
      {words[0]}
      <span
        style={{
          "--font-selector": "SW50ZXItQm9sZA==",
          "--framer-font-family": '"Inter", "Inter Placeholder", sans-serif',
        }}
        className="framer-text"
      >
        {" "}
      </span>
      <span
        style={{
          "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMGl0YWxpYw==",
          "--framer-font-family": '"Averia Serif Libre", sans-serif',
          "--framer-font-style": "italic",
          "--framer-font-weight": "300",
        }}
        className="framer-text"
      >
        {words[1]}
      </span>
      <span
        style={{
          "--font-selector": "SW50ZXItQm9sZA==",
          "--framer-font-family": '"Inter", "Inter Placeholder", sans-serif',
        }}
        className="framer-text"
      >
        {" "}
      </span>
      {words[2]}
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
}: {
  index: number;
  layout: (typeof TESTIMONIAL_LAYOUT)[number];
  item: TestimonialContent["items"][number];
}) {
  const card = <TestimonialCard item={item} index={index} />;

  const desktopReveal = (children: ReactNode) => (
    <TestimonialCardReveal
      index={index}
      className={layout.container}
      data-framer-name="Testimonial item"
      style={revealStyle(layout.desktopX, "desktop")}
    >
      {children}
    </TestimonialCardReveal>
  );

  const stackReveal = (children: ReactNode) => (
    <HiddenReveal className={layout.container} style={revealStyle(0, "stack")}>
      {children}
    </HiddenReveal>
  );

  return (
    <div
      className={layout.wrapper}
      data-framer-name={`Item ${String(index + 1).padStart(2, "0")}`}
    >
      <div className="ssr-variant hidden-g5y12p hidden-r4q9g">
        {desktopReveal(card)}
      </div>
      <div className="ssr-variant hidden-r4q9g hidden-72rtr7">
        {stackReveal(<TestimonialCard item={item} index={index} width="fluid" />)}
      </div>
      <div className="ssr-variant hidden-g5y12p hidden-72rtr7">
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
        className="framer-1dlgf8z"
        data-framer-name="Testimonial"
        id="testimonial-section"
        aria-labelledby={titleId}
      >
        <div className="framer-238cdp" data-framer-name="Container">
          <div className="framer-1bkzeql" data-framer-name="Sticky Item">
            <HiddenReveal
              variant="testimonial-title"
              className="framer-omuc15"
              data-framer-name="Title"
              style={{
                willChange: "transform",
                opacity: "0",
                transform: "translateY(30px)",
              }}
            >
              <HiddenReveal
                variant="testimonial-image"
                className="framer-1l7dmyb"
                data-framer-name="Image svg"
                style={{
                  willChange: "transform",
                  opacity: "0",
                  transform: "translateY(170px)",
                }}
              >
                <div className="ssr-variant hidden-g5y12p hidden-r4q9g">
                  <div
                    data-framer-component-type="SVG"
                    data-framer-name="Men"
                    data-framer-shadows
                    className="framer-cb1aqr"
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
                <div className="ssr-variant hidden-r4q9g hidden-72rtr7">
                  <div
                    data-framer-component-type="SVG"
                    data-framer-name="Men"
                    data-framer-shadows
                    className="framer-cb1aqr"
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
                <div className="ssr-variant hidden-g5y12p hidden-72rtr7">
                  <div
                    data-framer-component-type="SVG"
                    data-framer-name="Men"
                    data-framer-shadows
                    className="framer-cb1aqr"
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
                <div className="ssr-variant hidden-g5y12p hidden-r4q9g">
                  <div
                    data-framer-component-type="SVG"
                    data-framer-name="Women svg"
                    data-framer-shadows
                    className="framer-1b8ib2c"
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
                <div className="ssr-variant hidden-r4q9g hidden-72rtr7">
                  <div
                    data-framer-component-type="SVG"
                    data-framer-name="Women svg"
                    data-framer-shadows
                    className="framer-1b8ib2c"
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
                <div className="ssr-variant hidden-g5y12p hidden-72rtr7">
                  <div
                    data-framer-component-type="SVG"
                    data-framer-name="Women svg"
                    data-framer-shadows
                    className="framer-1b8ib2c"
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
              <div
                className="framer-vx2vf4"
                data-framer-name="Title Text"
                style={{ willChange: "transform", opacity: "1", transform: "none" }}
              >
                <div className="ssr-variant hidden-g5y12p hidden-r4q9g">
                  <div
                    className="framer-14ig1wu"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <h2
                      id={titleId}
                      dir="auto"
                      style={{
                        "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
                        "--framer-font-family":
                          '"Inter Display", "Inter Display Placeholder", sans-serif',
                        "--framer-font-size": "72px",
                        "--framer-font-weight": "700",
                        "--framer-letter-spacing": "-0.03em",
                        "--framer-line-height": "1em",
                        "--framer-text-alignment": "center",
                        "--framer-text-color":
                          "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                      }}
                      className="framer-text"
                    >
                      <TestimonialTitle words={content.titleWords} />
                    </h2>
                  </div>
                </div>
                <div className="ssr-variant hidden-r4q9g hidden-72rtr7">
                  <div
                    className="framer-14ig1wu"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <h2
                      dir="auto"
                      style={{
                        "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
                        "--framer-font-family":
                          '"Inter Display", "Inter Display Placeholder", sans-serif',
                        "--framer-font-size": "36px",
                        "--framer-font-weight": "700",
                        "--framer-letter-spacing": "-0.03em",
                        "--framer-line-height": "1em",
                        "--framer-text-alignment": "center",
                        "--framer-text-color":
                          "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
                      }}
                      className="framer-text"
                    >
                      <TestimonialTitle words={content.titleWords} />
                    </h2>
                  </div>
                </div>
                <div className="ssr-variant hidden-g5y12p hidden-72rtr7">
                  <div
                    className="framer-14ig1wu"
                    data-framer-component-type="RichTextContainer"
                    style={{ transform: "none" }}
                  >
                    <h2
                      dir="auto"
                      style={{
                        "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
                        "--framer-font-family":
                          '"Inter Display", "Inter Display Placeholder", sans-serif',
                        "--framer-font-size": "57px",
                        "--framer-font-weight": "700",
                        "--framer-letter-spacing": "-0.03em",
                        "--framer-line-height": "1em",
                        "--framer-text-alignment": "center",
                        "--framer-text-color":
                          "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                      }}
                      className="framer-text"
                    >
                      <TestimonialTitle words={content.titleWords} />
                    </h2>
                  </div>
                </div>
              </div>
            </HiddenReveal>
            <div className="framer-1of63no" data-framer-name="List" id="list">
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
