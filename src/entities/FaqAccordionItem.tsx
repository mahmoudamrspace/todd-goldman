"use client";

import { useEffect, useState, type CSSProperties, type KeyboardEvent } from "react";

const FAQ_EASE = "cubic-bezier(0.12, 0.23, 0.17, 0.99)";

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
  const [answerShown, setAnswerShown] = useState(false);

  useEffect(() => {
    if (!isOpen) {
      setAnswerShown(false);
      return;
    }
    const frame = requestAnimationFrame(() => setAnswerShown(true));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  const onKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle(index);
    }
  };

  const baseClass = className
    .replace(/\s*framer-v-195fole\b/g, "")
    .replace(/\s*framer-v-wlit4m\b/g, "")
    .trim();
  const rootClass = `${baseClass} ${isOpen ? "framer-v-wlit4m" : "framer-v-195fole"}`;

  const answerStyle: CSSProperties = {
    opacity: answerShown ? 1 : 0,
    pointerEvents: isOpen ? "auto" : "none",
    transition: `opacity 0.6s ${FAQ_EASE}`,
  };

  const chevronColor = isOpen
    ? "rgb(251, 251, 251)"
    : "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))";

  return (
    <div
      className={rootClass}
      data-border={true}
      data-framer-name={isOpen ? "Open" : "Closed"}
      data-faq-index={index}
      data-highlight={true}
      role="button"
      tabIndex={0}
      aria-expanded={isOpen}
      onClick={() => onToggle(index)}
      onKeyDown={onKeyDown}
      style={{
        ...style,
        cursor: "pointer",
        transition: `opacity 0.4s ${FAQ_EASE}`,
      }}
    >
      <div className="framer-1uy0zak" data-framer-name="Title">
        <div
          className="framer-1hl0k4c"
          data-framer-component-type="RichTextContainer"
          style={{
            "--extracted-r6o4lv":
              "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
            "--framer-link-text-color": "rgb(0, 153, 255)",
            "--framer-link-text-decoration": "underline",
            "--framer-paragraph-spacing": "0px",
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
              "--framer-text-color":
                "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))",
            }}
          >
            {question}
          </p>
        </div>
        <svg
          className="framer-ohg0r framer-1cx43kf"
          role="presentation"
          viewBox="0 0 24 24"
          style={{
            "--1m6trwb": "0",
            "--21h8s6": chevronColor,
            "--pgex8v": "3",
            transform: isOpen ? "rotate(45deg)" : "none",
            transition: `transform 0.4s ${FAQ_EASE}`,
          }}
        >
          <use href="#465907804" />
        </svg>
      </div>
      {isOpen ? (
        <div className="framer-1ue276m">
          <div
            className="framer-1luxota"
            data-framer-component-type="RichTextContainer"
            style={{
              "--framer-link-text-color": "rgb(0, 153, 255)",
              "--framer-link-text-decoration": "underline",
              ...answerStyle,
            }}
          >
            <p
              dir="auto"
              className="framer-text"
              style={{
                "--font-selector": "RlI7SW50ZXJEaXNwbGF5",
                "--framer-font-family":
                  '"Inter Display", "Inter Display Placeholder", sans-serif',
                "--framer-font-size": "16px",
                "--framer-letter-spacing": "-0.02em",
                "--framer-line-height": "1.5em",
                "--framer-text-alignment": "left",
                "--framer-text-color":
                  "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))",
              }}
            >
              {answer}
            </p>
          </div>
        </div>
      ) : null}
    </div>
  );
}
