import { HiddenReveal } from "@/features/HiddenReveal";
import type { FooterContent } from "@/content/section-types";
import { FOOTER_EMPHASIS_STYLE, FOOTER_HEADLINE_BASE } from "./footer-styles";

export function FooterHeadline({
  headline,
}: {
  headline: FooterContent["headline"];
}) {
  return (
    <h2 id="todd-footer-headline" dir="auto" style={FOOTER_HEADLINE_BASE} className="todd-text">
      <span>{headline.lead.trim()}</span>{" "}
      <span style={FOOTER_EMPHASIS_STYLE} className="todd-text todd-contact-headline__emphasis">
        {headline.emphasis.trim()}
      </span>
      <br className="todd-contact-headline__mobile-break" />
      <span className="todd-contact-headline__middle"> {headline.middle.trim()}</span>{" "}
      <span style={FOOTER_EMPHASIS_STYLE} className="todd-text todd-contact-headline__emphasis">
        {headline.secondEmphasis.trim()}
      </span>
      {headline.tail ? ` ${headline.tail.trim()}` : null}
    </h2>
  );
}

export function FooterHeadlineReveal({
  headline,
  delay = 0.16,
}: {
  headline: FooterContent["headline"];
  delay?: number;
}) {
  return (
    <HiddenReveal
      variant="section-heading"
      delay={delay}
      className="todd-footer__phone-4"
      data-todd-component-type="RichTextContainer"
      style={{ willChange: "transform", opacity: "0", transform: "translateY(40px)" }}
    >
      <FooterHeadline headline={headline} />
    </HiddenReveal>
  );
}
