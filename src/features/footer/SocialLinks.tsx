import type { FooterContent } from "@/content/section-types";
import { externalLinkAriaLabel } from "@/shared/lib/external-link-label";
import { FOOTER_SOCIAL_LINK_WRAPPER_CLASSES } from "./footer-styles";

const SOCIAL_LINK_BLUR_STYLE = {
  backdropFilter: "blur(5px)",
  WebkitBackdropFilter: "blur(5px)",
} as const;

const SOCIAL_LINK_BASE_STYLE = {
  "--extracted-a0htzi":
    "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
  "--todd-link-text-color": "rgb(0, 153, 255)",
  "--todd-link-text-decoration": "underline",
} as const;

function SocialLinkItem({
  label,
  href,
  wrapperClassName,
}: {
  label: string;
  href: string;
  wrapperClassName: string;
}) {
  return (
    <li className={wrapperClassName}>
      <a
        className="todd-footer__phone-11 todd-footer__phone-2 todd-footer__variant todd-footer__phone-3 todd-footer__phone-6"
        data-todd-name="Primary"
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={externalLinkAriaLabel(label)}
        style={SOCIAL_LINK_BLUR_STYLE}
      >
        <div className="todd-footer__text" data-todd-name="Text">
          <div
            className="todd-footer__placeholder-text-do-not-delete-2"
            data-todd-name="Placeholder Text. Do Not Delete"
            data-todd-component-type="RichTextContainer"
            style={{
              ...SOCIAL_LINK_BASE_STYLE,
              opacity: "0",
              transform: "none",
            }}
          >
            <span
              aria-hidden={true}
              dir="auto"
              className="todd-text"
              style={{
                "--font-selector": "SW50ZXItTWVkaXVt",
                "--todd-font-open-type-features":
                  "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                "--todd-font-size": "14px",
                "--todd-font-weight": "500",
                "--todd-text-color":
                  "var(--extracted-a0htzi, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))",
              }}
            >
              {label}
            </span>
          </div>
          <div className="todd-footer__link-text-2" data-todd-name="Link Text">
            <div
              className="todd-footer__phone-8"
              data-todd-component-type="RichTextContainer"
              style={{
                "--extracted-tcooor":
                  "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
                "--todd-link-text-color": "rgb(0, 153, 255)",
                "--todd-link-text-decoration": "underline",
                transform: "none",
              }}
            >
              <div
                dir="auto"
                className="todd-text"
                style={{
                  "--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==",
                  "--todd-font-family":
                    '"Inter Display", "Inter Display Placeholder", sans-serif',
                  "--todd-font-open-type-features":
                    "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                  "--todd-font-size": "14px",
                  "--todd-font-weight": "500",
                  "--todd-text-color":
                    "var(--extracted-tcooor, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))",
                }}
              >
                {label}
              </div>
            </div>
            <div
              className="todd-footer__phone-10"
              data-todd-component-type="RichTextContainer"
              style={{
                "--extracted-a0htzi":
                  "var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0))",
                "--todd-link-text-color": "rgb(0, 153, 255)",
                "--todd-link-text-decoration": "underline",
                transform: "none",
              }}
            >
              <span
                aria-hidden={true}
                dir="auto"
                className="todd-text"
                style={{
                  "--font-selector": "RlM7Q2FiaW5ldCBHcm90ZXNrLW1lZGl1bQ==",
                  "--todd-font-family":
                    '"Cabinet Grotesk", "Cabinet Grotesk Placeholder", sans-serif',
                  "--todd-font-open-type-features":
                    "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                  "--todd-font-size": "14px",
                  "--todd-font-weight": "500",
                  "--todd-text-color":
                    "var(--extracted-a0htzi, var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0)))",
                }}
              >
                {label}
              </span>
            </div>
          </div>
        </div>
      </a>
    </li>
  );
}

export function SocialLinks({ social }: { social: FooterContent["social"] }) {
  return (
    <ul className="todd-footer__links" data-todd-name="Links">
      {social.map((link, index) => {
        const wrapperClassName =
          FOOTER_SOCIAL_LINK_WRAPPER_CLASSES[index] ??
          FOOTER_SOCIAL_LINK_WRAPPER_CLASSES.at(-1) ??
          "todd-footer__phone-5";

        return (
          <SocialLinkItem
            key={`${link.label}-${link.href}`}
            label={link.label}
            href={link.href}
            wrapperClassName={wrapperClassName}
          />
        );
      })}
    </ul>
  );
}
