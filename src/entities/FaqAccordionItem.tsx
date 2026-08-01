"use client";

import { useId } from "react";

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

/** Single FAQ accordion row with Framer Open/Closed variant names. */
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
    .replace(/\s*framer-v-195fole\b/g, "")
    .replace(/\s*framer-v-wlit4m\b/g, "")
    .trim();
  const rootClass = `${baseClass} ${isOpen ? "framer-v-wlit4m" : "framer-v-195fole"}`;

  const chevronColor = isOpen ? "var(--color-white)" : "var(--color-cream)";

  return (
    <div
      className={rootClass}
      data-border={true}
      data-framer-name={isOpen ? "Open" : "Closed"}
      data-faq-index={index}
      data-highlight={true}
      style={{
        ...style,
        transition: `opacity 0.4s ${FAQ_EASE}`,
      }}
    >
      <button
        type="button"
        id={buttonId}
        className="framer-1uy0zak faq-accordion__trigger"
        data-framer-name="Title"
        aria-expanded={isOpen}
        aria-controls={panelId}
        onClick={() => onToggle(index)}
      >
        <div
          className="framer-1hl0k4c"
          data-framer-component-type="RichTextContainer"
          style={{
            "--extracted-r6o4lv": "var(--color-cream)",
            transform: "none",
          }}
        >
          <p
            dir="auto"
            className="framer-text"
            style={{
              "--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==",
              "--framer-font-family":
                '"Inter Display", "Inter Display Placeholder", sans-serif',
              "--framer-font-size": "18px",
              "--framer-font-weight": "500",
              "--framer-text-alignment": "left",
              "--framer-text-color": "var(--extracted-r6o4lv, var(--color-cream))",
            }}
          >
            {question}
          </p>
        </div>
        <svg
          className="framer-ohg0r framer-1cx43kf"
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
        className={`framer-1ue276m faq-accordion__panel${isOpen ? " is-open" : ""}`}
      >
        <div
          className="framer-1luxota faq-accordion__panel-inner"
          data-framer-component-type="RichTextContainer"
        >
          <p
            dir="auto"
            className="framer-text faq-accordion__answer"
            style={{
              "--font-selector": "RlI7SW50ZXJEaXNwbGF5",
              "--framer-font-family":
                '"Inter Display", "Inter Display Placeholder", sans-serif',
              "--framer-font-size": "16px",
              "--framer-letter-spacing": "-0.02em",
              "--framer-line-height": "1.5em",
              "--framer-text-alignment": "left",
              "--framer-text-color": "var(--color-cream)",
            }}
          >
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
}

