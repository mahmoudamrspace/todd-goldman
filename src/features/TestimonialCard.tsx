"use client";

import type { SiteSettings } from "@/content/types";
import { cn } from "@/shared/lib/cn";

type TestimonialItem = SiteSettings["testimonials"][number];

const CARD_BORDER_STYLE = {
  "--border-bottom-width": "1px",
  "--border-color":
    "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))",
  "--border-left-width": "1px",
  "--border-right-width": "1px",
  "--border-style": "dashed",
  "--border-top-width": "1px",
  backgroundColor:
    "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))",
  borderBottomLeftRadius: "16px",
  borderBottomRightRadius: "16px",
  borderTopLeftRadius: "16px",
  borderTopRightRadius: "16px",
} as const;

const AVATAR_IDS = [
  "#1626674713",
  "#2987541301",
  "#2452161336",
  "#4165719400",
] as const;

function toneName(tone: TestimonialItem["tone"]) {
  switch (tone) {
    case "blue":
      return "Blue";
    case "green":
      return "Green";
    default:
      return "White";
  }
}

function toneClass(tone: TestimonialItem["tone"]) {
  switch (tone) {
    case "blue":
      return "todd-testimonial-card__rich-text-container-7 todd-testimonial-card__rich-text-container-6 todd-testimonial-card__rich-text-container-2 todd-layout__utility-007";
    case "green":
      return "todd-testimonial-card__rich-text-container-7 todd-testimonial-card__rich-text-container-6 todd-testimonial-card__rich-text-container-2 todd-layout__utility-013";
    default:
      return "todd-testimonial-card__rich-text-container-7 todd-testimonial-card__rich-text-container-6 todd-testimonial-card__rich-text-container-2 todd-layout__utility-005";
  }
}

function avatarClass(index: number) {
  return index % 2 === 1 ? "todd-testimonial-card__rich-text-container-5 todd-testimonial-card__rich-text-container" : "todd-testimonial-card__rich-text-container-4 todd-testimonial-card__rich-text-container";
}

export interface TestimonialCardProps {
  item: TestimonialItem;
  index: number;
  width?: "full" | "fluid";
  iconSrc?: string;
}

/** Single testimonial card with semantic quote markup. */
export function TestimonialCard({ item, index, width = "full", iconSrc }: TestimonialCardProps) {
  const widthStyle =
    width === "fluid"
      ? { width: "100%" }
      : { maxWidth: "100%", width: "100%" };

  return (
    <figure
      className={cn("todd-testimonial-card", "todd-card-shell", toneClass(item.tone))}
      data-border={true}
      data-todd-name={toneName(item.tone)}
      style={{ ...CARD_BORDER_STYLE, ...widthStyle }}
    >
      <div className="todd-testimonial-card__top" data-todd-name="Top">
        <div className="todd-testimonial-card__name" data-todd-name="Name">
          <div
            className="todd-testimonial-card__rich-text-container-8"
            data-todd-component-type="RichTextContainer"
            style={{
              "--extracted-1of0zx5":
                "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
              transform: "none",
            }}
          >
            <p
              dir="auto"
              className="todd-text"
              style={{
                "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=",
                "--todd-font-family": '"Averia Serif Libre", sans-serif',
                "--todd-font-size": "24px",
                "--todd-text-alignment": "left",
                "--todd-text-color":
                  "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))",
              }}
            >
              {item.author}
            </p>
          </div>
          <div
            className="todd-testimonial-card__rich-text-container-10"
            data-todd-component-type="RichTextContainer"
            style={{
              "--extracted-r6o4lv":
                "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))",
              transform: "none",
            }}
          >
            <p
              dir="auto"
              className="todd-text"
              style={{
                "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==",
                "--todd-font-family": '"Averia Serif Libre", sans-serif',
                "--todd-font-size": "14px",
                "--todd-font-style": "italic",
                "--todd-text-alignment": "left",
                "--todd-text-color":
                  "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))",
                "--todd-text-transform": "lowercase",
              }}
            >
              {item.role}
            </p>
          </div>
        </div>
        <div className="todd-testimonial-avatar" data-todd-name="Avatar">
          {iconSrc ? (
            <img
              className={avatarClass(index)}
              src={iconSrc}
              alt=""
              draggable={false}
              style={{ transform: "translateX(-50%)" }}
            />
          ) : (
            <svg
              className={avatarClass(index)}
              role="presentation"
              viewBox="0 0 515 497"
              style={{ transform: "translateX(-50%)" }}
            >
              <use href={AVATAR_IDS[index % AVATAR_IDS.length]} />
            </svg>
          )}
        </div>
      </div>
      <blockquote
        className="todd-testimonial-card__rich-text-container-3"
        data-todd-component-type="RichTextContainer"
        style={{
          transform: "none",
          margin: 0,
          padding: 0,
          border: 0,
          maxWidth: "100%",
          boxSizing: "border-box",
        }}
        cite={item.role}
      >
        <p
          className="todd-text todd-testimonial-card__rich-text-container-9"
          data-styles-preset="Y5DlTiI5k"
          dir="auto"
          style={{ maxWidth: "100%", margin: 0 }}
        >
          {item.quote}
        </p>
      </blockquote>
    </figure>
  );
}
