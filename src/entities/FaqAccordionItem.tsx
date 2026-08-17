"use client";

import { useId } from "react";
import { cn } from "@/shared/lib/cn";
import { toddState, TODD } from "@/shared/lib/todd-semantic-classes";

const FAQ_EASE = "var(--ease-faq)";

export interface FaqAccordionItemProps {
  index: number;
  openIndex: number | null;
  onToggle: (index: number) => void;
  question: string;
  answer: string;
  className: string;
  style: Record<string, string | number>;
}

/** Single FAQ accordion row with legacy export Open/Closed variant names. */
export function FaqAccordionItem({
  index,
  openIndex,
  onToggle,
  question,
  answer,
  className,
  style,
}: FaqAccordionItemProps) {
  const isOpen = openIndex === index;
  const panelId = useId();
  const buttonId = useId();

  const baseClass = className
    .replace(/\s*todd-faq__variant\b/g, "")
    .replace(/\s*todd-layout__utility-027\b/g, "")
    .trim();
  const rootClass = cn(
    TODD.faq.item,
    TODD.card.shell,
    baseClass,
    isOpen ? cn("todd-layout__utility-027", toddState("open")) : cn("todd-faq__variant", toddState("closed")),
  );

  const chevronColor = isOpen ? "var(--color-white)" : "var(--color-cream)";

  return (
    <div
      className={rootClass}
      data-border={true}
      data-todd-name={isOpen ? "Open" : "Closed"}
      data-faq-index={index}
      style={{
        ...style,
        transition: `opacity 0.4s ${FAQ_EASE}`,
      }}
    >
      <button
        type="button"
        id={buttonId}
        className="todd-faq-accordion-item__title faq-accordion__trigger"
        data-todd-name="Title"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(index)}
      >
        <div
          className="todd-nav-overlay-content__desktop-4-2"
          data-todd-component-type="RichTextContainer"
          style={{
            "--extracted-r6o4lv": "var(--color-cream)",
            transform: "none",
          }}
        >
          <p
            dir="auto"
            className="todd-text"
            style={{
              "--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==",
              "--todd-font-family":
                '"Inter Display", "Inter Display Placeholder", sans-serif',
              "--todd-font-size": "18px",
              "--todd-font-weight": "500",
              "--todd-text-alignment": "left",
              "--todd-text-color": "var(--extracted-r6o4lv, var(--color-cream))",
            }}
          >
            {question}
          </p>
        </div>
        <svg
          className="todd-nav-overlay-content__desktop-4-5 todd-nav-overlay-content__desktop-4"
          role="presentation"
          viewBox="0 0 24 24"
          aria-hidden={true}
          style={{
            transform: isOpen ? "rotate(45deg)" : "none",
            transition: `transform 0.4s ${FAQ_EASE}`,
            color: chevronColor,
          }}
        >
          <use href="#465907804" />
        </svg>
      </button>
      <div
        id={panelId}
        role="region"
        aria-labelledby={buttonId}
        aria-hidden={!isOpen}
        className={`todd-nav-overlay-content__desktop-4-4 faq-accordion__panel${isOpen ? " is-open" : ""}`}
      >
        <div
          className="todd-nav-overlay-content__desktop-4-3 faq-accordion__panel-inner"
          data-todd-component-type="RichTextContainer"
        >
          <p
            dir="auto"
            className="todd-text faq-accordion__answer"
            style={{
              "--font-selector": "RlI7SW50ZXJEaXNwbGF5",
              "--todd-font-family":
                '"Inter Display", "Inter Display Placeholder", sans-serif',
              "--todd-font-size": "16px",
              "--todd-letter-spacing": "-0.02em",
              "--todd-line-height": "1.5em",
              "--todd-text-alignment": "left",
              "--todd-text-color": "var(--color-cream)",
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

