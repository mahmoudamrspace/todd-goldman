"use client";

import type { FaqContent } from "@/content/section-types";
import { FaqAccordionItem } from "@/entities/FaqAccordionItem";
import { ResponsiveArtwork } from "@/entities/ResponsiveArtwork";
import { FaqIllustration } from "@/features/FaqIllustration";
import { HiddenReveal } from "@/features/HiddenReveal";
import { cn } from "@/shared/lib/cn";
import { TODD } from "@/shared/lib/todd-semantic-classes";

const REVEAL_UP = {
  willChange: "transform",
  opacity: "0",
  transform: "translateY(40px)",
} as const;

const FAQ_ITEM_STYLE = {
  "--border-bottom-width": "3px",
  "--border-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
  "--border-left-width": "0px",
  "--border-right-width": "0px",
  "--border-style": "solid",
  "--border-top-width": "0px",
  width: "100%",
} as const;

export function Faq({
  content,
  openIndex,
  onToggle,
}: {
  content: FaqContent;
  openIndex: number | null;
  onToggle: (index: number) => void;
}) {
  return (
    <section className={cn(TODD.faq.section, "todd-faq-section")} data-todd-name={"FAQ"} aria-labelledby="todd-faq-title">
      <div className={cn(TODD.faq.container, "todd-faq-section__container")} data-todd-name={"Container"}>
        <div className="todd-faq" id="faq" data-todd-name="Wrapper">
          <HiddenReveal
            variant="section-heading"
            className={cn(TODD.faq.title, "todd-faq__title")}
            data-todd-name="Title"
            style={{
              willChange: "transform",
              opacity: "0",
              transform: "translateY(28px)",
            }}
          >
            <div className="todd-faq__title-wrap" data-todd-name="Title Wrap">
              <div
                className="todd-faq__rich-text-container-5"
                data-todd-component-type="RichTextContainer"
              >
                <h2
                  id="todd-faq-title"
                  dir="auto"
                  style={{
                    "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
                    "--todd-font-family":
                      '"Inter Display", "Inter Display Placeholder", sans-serif',
                    "--todd-font-size": "36px",
                    "--todd-font-weight": "700",
                    "--todd-letter-spacing": "-0.03em",
                    "--todd-line-height": "1.1em",
                    "--todd-text-alignment": "center",
                    "--todd-text-color": "rgb(251, 251, 251)",
                  }}
                  className="todd-text"
                >
                  {content.title}
                </h2>
              </div>
              <div
                className="todd-faq__rich-text-container-9"
                data-todd-component-type="RichTextContainer"
              >
                <p
                  dir="auto"
                  className="todd-text todd-faq__subtitle"
                  style={{
                    "--font-selector": "RlI7SW50ZXJEaXNwbGF5LVNlbWlCb2xk",
                    "--todd-font-family":
                      '"Inter Display", "Inter Display Placeholder", sans-serif',
                    "--todd-font-size": "36px",
                    "--todd-font-weight": "600",
                    "--todd-letter-spacing": "-0.03em",
                    "--todd-line-height": "1.1em",
                    "--todd-text-alignment": "center",
                    "--todd-text-color": "rgb(251, 251, 251)",
                  }}
                >
                  {content.subtitleLead}
                  <span
                    style={{
                      "--font-selector":
                        "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==",
                      "--todd-font-family": '"Averia Serif Libre", sans-serif',
                      "--todd-font-style": "italic",
                      "--todd-font-weight": "400",
                    }}
                    className="todd-text"
                  >
                    {content.subtitleEmphasis}
                  </span>
                  {content.subtitleTail}
                </p>
              </div>
            </div>
          </HiddenReveal>
          <div className="todd-faq__variant-2">
            <div
              className={cn(TODD.faq.list, "todd-faq__list", "todd-faq__list-layout")}
              data-todd-name="List"
              style={{ width: "100%" }}
            >
              <div className="todd-faq__rich-text-container-7">
                {content.items.slice(0, Math.ceil(content.items.length / 2)).map((item, index) => (
                  <HiddenReveal
                    key={item.question}
                    variant="faq-item"
                    delay={index * 0.07}
                    className={`todd-faq__rich-text-container-${index === 0 ? "11" : index === 1 ? "8" : "6"}`}
                    style={REVEAL_UP}
                  >
                    <FaqAccordionItem
                      index={index}
                      openIndex={openIndex}
                      onToggle={onToggle}
                      question={item.question}
                      answer={item.answer}
                      className="todd-faq__faq-accordion-item todd-faq__rich-text-container-3 todd-faq__variant"
                      style={FAQ_ITEM_STYLE}
                    />
                  </HiddenReveal>
                ))}
              </div>
              <div className="todd-faq__rich-text-container-2">
                {content.items.slice(Math.ceil(content.items.length / 2)).map((item, offsetIndex) => {
                  const index = Math.ceil(content.items.length / 2) + offsetIndex;
                  const containerClass =
                    offsetIndex === 0
                      ? "todd-faq__rich-text-container-4"
                      : offsetIndex === 1
                        ? "todd-faq__rich-text-container"
                        : "todd-faq__rich-text-container-10";
                  return (
                    <HiddenReveal
                      key={item.question}
                      variant="faq-item"
                      delay={index * 0.07}
                      className={containerClass}
                      style={REVEAL_UP}
                    >
                      <FaqAccordionItem
                        index={index}
                        openIndex={openIndex}
                        onToggle={onToggle}
                        question={item.question}
                        answer={item.answer}
                        className="todd-faq__faq-accordion-item todd-faq__rich-text-container-3 todd-faq__variant"
                        style={FAQ_ITEM_STYLE}
                      />
                    </HiddenReveal>
                  );
                })}
              </div>
              <div className={"todd-intro__wrapper-16"}>
                <HiddenReveal variant="section-artwork" delay={0.4} style={REVEAL_UP}>
                  <FaqIllustration src={content.decor} />
                </HiddenReveal>
              </div>
            </div>
          </div>
          <HiddenReveal variant="section-artwork" delay={0.48} id="4t58ou" className={"todd-intro__wrapper-29"} data-todd-name={"Icon"} style={{"opacity": "0.001", "transform": "translateY(-20px)"}}>
              <ResponsiveArtwork
                desktop={
                  <div data-todd-component-type={"SVG"} data-todd-name={"Icon"} data-todd-shadows className={"todd-faq__icon"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                    <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                      <svg style={{"width": "100%", "height": "100%"}}>
                        <use href={"#svg-1323373682_4208"}>                      </use>
                      </svg>
                    </div>
                  </div>
                }
                mobile={
                  <div data-todd-component-type={"SVG"} data-todd-name={"Icon"} data-todd-shadows className={"todd-faq__icon"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                    <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                      <svg style={{"width": "100%", "height": "100%"}}>
                        <use href={"#svg-805843506_4183"}>                      </use>
                      </svg>
                    </div>
                  </div>
                }
              />
          </HiddenReveal>
        </div>
      </div>
    </section>
  );
}
