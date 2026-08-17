import type { CSSProperties } from "react";

export const FOOTER_EMPHASIS_STYLE: CSSProperties = {
  "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMGl0YWxpYw==",
  "--todd-font-family": '"Averia Serif Libre", sans-serif',
  "--todd-font-style": "italic",
  "--todd-font-weight": "300",
};

export const FOOTER_HEADLINE_BASE: CSSProperties = {
  "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
  "--todd-font-family": '"Inter Display", "Inter Display Placeholder", sans-serif',
  "--todd-font-weight": "700",
  "--todd-letter-spacing": "-0.03em",
  "--todd-line-height": "1.1em",
  "--todd-text-alignment": "center",
  "--todd-text-color":
    "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
};

export const FOOTER_CREDITS_MADE_BY_STYLE: CSSProperties = {
  "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
  "--todd-font-family": '"Inter Display", "Inter Display Placeholder", sans-serif',
  "--todd-font-open-type-features": "'ss02' on, 'ss03' on",
  "--todd-font-size": "15px",
  "--todd-font-weight": "700",
  "--todd-letter-spacing": "-0.02em",
  "--todd-line-height": "1.6em",
  "--todd-text-color":
    "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))",
};

export const FOOTER_CREDITS_COPYRIGHT_STYLE: CSSProperties = {
  "--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==",
  "--todd-font-family": '"Inter Display", "Inter Display Placeholder", sans-serif',
  "--todd-font-open-type-features": "'ss02' on, 'ss03' on",
  "--todd-font-size": "14px",
  "--todd-font-weight": "500",
  "--todd-letter-spacing": "-0.02em",
  "--todd-line-height": "1.6em",
  "--todd-text-color":
    "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))",
};

export const FOOTER_SOCIAL_LINK_WRAPPER_CLASSES = [
  "todd-footer__phone-5",
  "todd-footer__phone-13",
  "todd-footer__phone-14",
] as const;
