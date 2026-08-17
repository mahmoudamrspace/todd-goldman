import { HiddenReveal } from "@/features/HiddenReveal";
import type { FooterContent } from "@/content/section-types";
import {
  FOOTER_CREDITS_COPYRIGHT_STYLE,
  FOOTER_CREDITS_MADE_BY_STYLE,
} from "./footer-styles";
import { SocialLinks } from "./SocialLinks";

const CREDITS_CONTAINER_STYLE = {
  "--extracted-r6o4lv":
    "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
  "--todd-link-text-color": "rgb(0, 153, 255)",
  "--todd-link-text-decoration": "underline",
  transform: "none",
} as const;

export function FooterCredits({
  madeBy,
  copyright,
  social,
}: {
  madeBy: string;
  copyright: string;
  social: FooterContent["social"];
}) {
  return (
    <div className="todd-contact-credits">
      <HiddenReveal
        variant="section-row"
        delay={0.45}
        style={{ willChange: "transform", opacity: "0", transform: "translateY(16px)" }}
      >
        <div
          className="todd-intro__wrapper-36 todd-footer__credits-shell"
          data-todd-name="Credits"
          style={{ width: "100%" }}
        >
          <div className="todd-footer__credits" data-todd-name="Credits">
            <div
              className="todd-footer__phone"
              data-todd-component-type="RichTextContainer"
              style={CREDITS_CONTAINER_STYLE}
            >
              <p dir="auto" className="todd-text" style={FOOTER_CREDITS_MADE_BY_STYLE}>
                <span
                  className="todd-text"
                  style={{
                    "--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==",
                    "--todd-font-weight": "500",
                  }}
                >
                  Made by{" "}
                </span>
                {madeBy}
              </p>
            </div>
          </div>
          <SocialLinks social={social} />
          <div className="todd-footer__copyrights" data-todd-name="Copyrights">
            <div
              className="todd-footer__phone-15"
              data-todd-component-type="RichTextContainer"
              style={CREDITS_CONTAINER_STYLE}
            >
              <p dir="auto" className="todd-text" style={FOOTER_CREDITS_COPYRIGHT_STYLE}>
                {copyright}
              </p>
            </div>
          </div>
        </div>
      </HiddenReveal>
    </div>
  );
}
