"use client";

import type { SiteSettings } from "@/content/types";

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
      return "framer-mxbDt framer-UENfp framer-1by6t1 framer-v-1iesd0j";
    case "green":
      return "framer-mxbDt framer-UENfp framer-1by6t1 framer-v-1wv5hh2";
    default:
      return "framer-mxbDt framer-UENfp framer-1by6t1 framer-v-1by6t1";
  }
}

function avatarClass(index: number) {
  return index % 2 === 1 ? "framer-RaAOo framer-16ldkq7" : "framer-Fjt7A framer-16ldkq7";
}

export interface TestimonialCardProps {
  item: TestimonialItem;
  index: number;
  width?: "full" | "fluid";
}

/** Single testimonial card with semantic quote markup. */
export function TestimonialCard({ item, index, width = "full" }: TestimonialCardProps) {
  const widthStyle =
    width === "fluid"
      ? { width: "100%" }
      : { maxWidth: "100%", width: "100%" };

  return (
    <figure
      className={toneClass(item.tone)}
      data-border={true}
      data-framer-name={toneName(item.tone)}
      style={{ ...CARD_BORDER_STYLE, ...widthStyle }}
    >
      <div className="framer-ouh49u" data-framer-name="Top">
        <div className="framer-1mdcqwk" data-framer-name="Name">
          <div
            className="framer-p3pcx6"
            data-framer-component-type="RichTextContainer"
            style={{
              "--extracted-1of0zx5":
                "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
              transform: "none",
            }}
          >
            <p
              dir="auto"
              className="framer-text"
              style={{
                "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=",
                "--framer-font-family": '"Averia Serif Libre", sans-serif',
                "--framer-font-size": "24px",
                "--framer-text-alignment": "left",
                "--framer-text-color":
                  "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))",
              }}
            >
              {item.author}
            </p>
          </div>
          <div
            className="framer-t3jff2"
            data-framer-component-type="RichTextContainer"
            style={{
              "--extracted-r6o4lv":
                "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))",
              transform: "none",
            }}
          >
            <p
              dir="auto"
              className="framer-text"
              style={{
                "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==",
                "--framer-font-family": '"Averia Serif Libre", sans-serif',
                "--framer-font-size": "14px",
                "--framer-font-style": "italic",
                "--framer-text-alignment": "left",
                "--framer-text-color":
                  "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))",
                "--framer-text-transform": "lowercase",
              }}
            >
              {item.role}
            </p>
          </div>
        </div>
        <div className="framer-30s6rf" data-framer-name="Avatar" aria-hidden={true}>
          <svg
            className={avatarClass(index)}
            role="presentation"
            viewBox="0 0 515 497"
            style={{ transform: "translateX(-50%)" }}
          >
            <use href={AVATAR_IDS[index % AVATAR_IDS.length]} />
          </svg>
        </div>
      </div>
      <blockquote
        className="framer-1rv0nxo"
        data-framer-component-type="RichTextContainer"
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
          className="framer-text framer-styles-preset-gg9u5z"
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
