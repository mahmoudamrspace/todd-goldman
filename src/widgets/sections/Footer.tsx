"use client";

import { ContactIllustration } from "@/features/ContactIllustration";
import { FooterDecoMotion } from "@/features/FooterDecoMotion";
import { HiddenReveal } from "@/features/HiddenReveal";
import type { CSSProperties, ReactNode } from "react";
import type { FooterContent } from "@/content/section-types";
import { cn } from "@/shared/lib/cn";
import { footerResponsiveVisibleOnly, TODD } from "@/shared/lib/todd-semantic-classes";

const FOOTER_EMPHASIS_STYLE: CSSProperties = {
  "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMGl0YWxpYw==",
  "--todd-font-family": '"Averia Serif Libre", sans-serif',
  "--todd-font-style": "italic",
  "--todd-font-weight": "300",
};

const FOOTER_HEADLINE_BASE: CSSProperties = {
  "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
  "--todd-font-family": '"Inter Display", "Inter Display Placeholder", sans-serif',
  "--todd-font-weight": "700",
  "--todd-letter-spacing": "-0.03em",
  "--todd-line-height": "1.1em",
  "--todd-text-alignment": "center",
  "--todd-text-color":
    "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
};

function FooterHeadline({
  headline,
  fontSize,
}: {
  headline: FooterContent["headline"];
  fontSize: string;
}) {
  return (
    <h2
      dir="auto"
      style={{ ...FOOTER_HEADLINE_BASE, "--todd-font-size": fontSize }}
      className="todd-text"
    >
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

function FooterHeadlineReveal({
  headline,
  fontSize,
  delay = 0.16,
}: {
  headline: FooterContent["headline"];
  fontSize: string;
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
      <FooterHeadline headline={headline} fontSize={fontSize} />
    </HiddenReveal>
  );
}

function FooterHeadlineSlot({
  className,
  headline,
  fontSize,
  children,
}: {
  className: string;
  headline: FooterContent["headline"];
  fontSize: string;
  children?: ReactNode;
}) {
  return (
    <div className={className}>
      <FooterHeadlineReveal headline={headline} fontSize={fontSize} />
      {children}
    </div>
  );
}

function ContactEmailLink({ email }: { email: string }) {
  return (
    <a
      className="todd-contact-email"
      href={`mailto:${email}`}
      aria-label={`Email Todd at ${email}`}
    >
      <span className="todd-contact-email__copy">
        <span className="todd-contact-email__label">Drop Todd a line</span>
        <span className="todd-contact-email__address">{email}</span>
      </span>
      <span className="todd-contact-email__arrow" aria-hidden={true}>
        ↗
      </span>
    </a>
  );
}

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer className={cn(TODD.footer.section, "todd-footer")} data-todd-name={"Footer"} id="contact">
      <div className={cn(TODD.footer.titleArea, "todd-footer__title-area")} data-todd-name={"Title"}>
        <div className={cn(TODD.footer.stage, TODD.card.shell, TODD.card.shellInset)}>
          <HiddenReveal
            variant="section-artwork"
            className="todd-contact-art"
            style={{ opacity: "0", transform: "translateY(32px) scale(0.98)" }}
          >
            <ContactIllustration layers={content.sceneLayers} />
          </HiddenReveal>
          <div className={"todd-contact-headline"}>
          <FooterHeadlineSlot
            className={footerResponsiveVisibleOnly("tablet")}
            headline={content.headline}
            fontSize="66px"
          />
          <FooterHeadlineSlot
            className={footerResponsiveVisibleOnly("mobile")}
            headline={content.headline}
            fontSize="34px"
          />
          <FooterHeadlineSlot
            className={footerResponsiveVisibleOnly("desktop")}
            headline={content.headline}
            fontSize="54px"
          />
          <div className={footerResponsiveVisibleOnly("tablet", "desktop")}>
            <HiddenReveal variant="section-cta" className={"todd-intro__wrapper-38"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(24px)"}}>
              <ContactEmailLink email={content.email} />
            </HiddenReveal>
          </div>
          <div className={footerResponsiveVisibleOnly("mobile")}>
            <HiddenReveal variant="section-cta" className={"todd-intro__wrapper-38"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(24px)"}}>
              <ContactEmailLink email={content.email} />
            </HiddenReveal>
          </div>
        </div>
        <div className={"ssr-variant todd-hide-mobile"}>
          <div className={"todd-contact-credits"}>
            <HiddenReveal variant="section-row" delay={0.45} style={{ willChange: "transform", opacity: "0", transform: "translateY(16px)" }}>
            <section className={"todd-intro__wrapper-36 todd-footer__desktop todd-footer__desktop"} data-todd-name={"Desktop"} style={{"width": "100%"}}>
              <div className={"todd-footer__credits"} data-todd-name={"Credits"}>
                <div className={"todd-footer__phone"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss02' on, 'ss03' on", "--todd-font-size": "15px", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.6em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                    <span className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-weight": "500"}}>
                      Made by{" "}
                    </span>
                    {content.madeBy}
                  </p>
                </div>
              </div>
              <div className={"todd-footer__links"} data-todd-name={"Links"}>
                <div className={"todd-footer__phone-5"}>
                  <a className={"todd-footer__phone-11 todd-footer__phone-2 todd-footer__variant todd-footer__phone-6"} onMouseEnter={(event) => event.currentTarget.classList.add("hover")} onMouseLeave={(event) => event.currentTarget.classList.remove("hover")} data-todd-name={"Primary"} href={content.social[0]?.href ?? "#"} target={"_blank"} rel={"noopener"} style={{"backdropFilter": "blur(5px)", "WebkitBackdropFilter": "blur(5px)"}}>
                    <div className={"todd-footer__text"} data-todd-name={"Text"}>
                      <div className={"todd-footer__placeholder-text-do-not-delete-2"} data-todd-name={"Placeholder Text. Do Not Delete"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "opacity": "0", "transform": "none"}}>
                        <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "SW50ZXItTWVkaXVt", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                          {content.social[0]?.label ?? "Instagram"}
                        </h3>
                      </div>
                      <div className={"todd-footer__link-text-2"} data-todd-name={"Link Text"}>
                        <div className={"todd-footer__phone-8"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <div dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-tcooor, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                            {content.social[0]?.label ?? "Instagram"}
                          </div>
                        </div>
                        <div className={"todd-footer__phone-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlM7Q2FiaW5ldCBHcm90ZXNrLW1lZGl1bQ==", "--todd-font-family": "\"Cabinet Grotesk\", \"Cabinet Grotesk Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0)))"}}>
                            {content.social[0]?.label ?? "Instagram"}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className={"todd-footer__phone-13"}>
                  <a className={"todd-footer__phone-11 todd-footer__phone-2 todd-footer__variant todd-footer__phone-6"} onMouseEnter={(event) => event.currentTarget.classList.add("hover")} onMouseLeave={(event) => event.currentTarget.classList.remove("hover")} data-todd-name={"Primary"} href={content.social[1]?.href ?? "#"} target={"_blank"} rel={"noopener"} style={{"backdropFilter": "blur(5px)", "WebkitBackdropFilter": "blur(5px)"}}>
                    <div className={"todd-footer__text"} data-todd-name={"Text"}>
                      <div className={"todd-footer__placeholder-text-do-not-delete-2"} data-todd-name={"Placeholder Text. Do Not Delete"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "opacity": "0", "transform": "none"}}>
                        <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "SW50ZXItTWVkaXVt", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                          {content.social[1]?.label ?? "LinkedIn"}
                        </h3>
                      </div>
                      <div className={"todd-footer__link-text-2"} data-todd-name={"Link Text"}>
                        <div className={"todd-footer__phone-8"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <div dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-tcooor, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                            {content.social[1]?.label ?? "LinkedIn"}
                          </div>
                        </div>
                        <div className={"todd-footer__phone-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlM7Q2FiaW5ldCBHcm90ZXNrLW1lZGl1bQ==", "--todd-font-family": "\"Cabinet Grotesk\", \"Cabinet Grotesk Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0)))"}}>
                            {content.social[1]?.label ?? "LinkedIn"}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className={"todd-footer__phone-14"}>
                  <a className={"todd-footer__phone-11 todd-footer__phone-2 todd-footer__variant todd-footer__phone-6"} onMouseEnter={(event) => event.currentTarget.classList.add("hover")} onMouseLeave={(event) => event.currentTarget.classList.remove("hover")} data-todd-name={"Primary"} href={content.social[2]?.href ?? "#"} target={"_blank"} rel={"noopener"} style={{"backdropFilter": "blur(5px)", "WebkitBackdropFilter": "blur(5px)"}}>
                    <div className={"todd-footer__text"} data-todd-name={"Text"}>
                      <div className={"todd-footer__placeholder-text-do-not-delete-2"} data-todd-name={"Placeholder Text. Do Not Delete"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "opacity": "0", "transform": "none"}}>
                        <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "SW50ZXItTWVkaXVt", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                          {content.social[2]?.label ?? "Behance"}
                        </h3>
                      </div>
                      <div className={"todd-footer__link-text-2"} data-todd-name={"Link Text"}>
                        <div className={"todd-footer__phone-8"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <div dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-tcooor, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                            {content.social[2]?.label ?? "Behance"}
                          </div>
                        </div>
                        <div className={"todd-footer__phone-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlM7Q2FiaW5ldCBHcm90ZXNrLW1lZGl1bQ==", "--todd-font-family": "\"Cabinet Grotesk\", \"Cabinet Grotesk Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0)))"}}>
                            {content.social[2]?.label ?? "Behance"}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className={"todd-footer__copyrights"} data-todd-name={"Copyrights"}>
                <div className={"todd-footer__phone-15"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss02' on, 'ss03' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.6em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                    {content.copyright}
                  </p>
                </div>
              </div>
            </section>
          </HiddenReveal>
          </div>
        </div>
        <div className={"ssr-variant todd-hide-desktop todd-hide-tablet"}>
          <div className={"todd-contact-credits"}>
            <HiddenReveal variant="section-row" delay={0.45} style={{ willChange: "transform", opacity: "0", transform: "translateY(16px)" }}>
            <section className={"todd-intro__wrapper-36 todd-footer__desktop todd-footer__phone"} data-todd-name={"Phone"} style={{"width": "100%"}}>
              <div className={"todd-footer__credits"} data-todd-name={"Credits"}>
                <div className={"todd-footer__phone"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss02' on, 'ss03' on", "--todd-font-size": "12px", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.6em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                    <span className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-weight": "500"}}>
                      Made by{" "}
                    </span>
                    {content.madeBy}
                  </p>
                </div>
              </div>
              <div className={"todd-footer__links"} data-todd-name={"Links"}>
                <div className={"todd-footer__phone-5"}>
                  <a className={"todd-footer__phone-11 todd-footer__phone-2 todd-footer__phone-3 todd-footer__phone-6"} data-todd-name={"Phone"} href={content.social[0]?.href ?? "#"} target={"_blank"} rel={"noopener"} style={{"backdropFilter": "blur(5px)", "WebkitBackdropFilter": "blur(5px)"}}>
                    <div className={"todd-footer__text"} data-todd-name={"Text"}>
                      <div className={"todd-footer__placeholder-text-do-not-delete-2"} data-todd-name={"Placeholder Text. Do Not Delete"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "opacity": "0", "transform": "none"}}>
                        <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "SW50ZXItTWVkaXVt", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                          {content.social[0]?.label ?? "Instagram"}
                        </h3>
                      </div>
                      <div className={"todd-footer__link-text-2"} data-todd-name={"Link Text"}>
                        <div className={"todd-footer__phone-8"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <div dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "12px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-tcooor, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                            {content.social[0]?.label ?? "Instagram"}
                          </div>
                        </div>
                        <div className={"todd-footer__phone-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlM7Q2FiaW5ldCBHcm90ZXNrLW1lZGl1bQ==", "--todd-font-family": "\"Cabinet Grotesk\", \"Cabinet Grotesk Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0)))"}}>
                            {content.social[0]?.label ?? "Instagram"}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className={"todd-footer__phone-13"}>
                  <a className={"todd-footer__phone-11 todd-footer__phone-2 todd-footer__phone-3 todd-footer__phone-6"} data-todd-name={"Phone"} href={content.social[1]?.href ?? "#"} target={"_blank"} rel={"noopener"} style={{"backdropFilter": "blur(5px)", "WebkitBackdropFilter": "blur(5px)"}}>
                    <div className={"todd-footer__text"} data-todd-name={"Text"}>
                      <div className={"todd-footer__placeholder-text-do-not-delete-2"} data-todd-name={"Placeholder Text. Do Not Delete"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "opacity": "0", "transform": "none"}}>
                        <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "SW50ZXItTWVkaXVt", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                          {content.social[1]?.label ?? "LinkedIn"}
                        </h3>
                      </div>
                      <div className={"todd-footer__link-text-2"} data-todd-name={"Link Text"}>
                        <div className={"todd-footer__phone-8"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <div dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "12px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-tcooor, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                            {content.social[1]?.label ?? "LinkedIn"}
                          </div>
                        </div>
                        <div className={"todd-footer__phone-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlM7Q2FiaW5ldCBHcm90ZXNrLW1lZGl1bQ==", "--todd-font-family": "\"Cabinet Grotesk\", \"Cabinet Grotesk Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0)))"}}>
                            {content.social[1]?.label ?? "LinkedIn"}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
                <div className={"todd-footer__phone-14"}>
                  <a className={"todd-footer__phone-11 todd-footer__phone-2 todd-footer__phone-3 todd-footer__phone-6"} data-todd-name={"Phone"} href={content.social[2]?.href ?? "#"} target={"_blank"} rel={"noopener"} style={{"backdropFilter": "blur(5px)", "WebkitBackdropFilter": "blur(5px)"}}>
                    <div className={"todd-footer__text"} data-todd-name={"Text"}>
                      <div className={"todd-footer__placeholder-text-do-not-delete-2"} data-todd-name={"Placeholder Text. Do Not Delete"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "opacity": "0", "transform": "none"}}>
                        <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "SW50ZXItTWVkaXVt", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                          {content.social[2]?.label ?? "Behance"}
                        </h3>
                      </div>
                      <div className={"todd-footer__link-text-2"} data-todd-name={"Link Text"}>
                        <div className={"todd-footer__phone-8"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <div dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "12px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-tcooor, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                            {content.social[2]?.label ?? "Behance"}
                          </div>
                        </div>
                        <div className={"todd-footer__phone-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-a0htzi": "var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                          <h3 dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlM7Q2FiaW5ldCBHcm90ZXNrLW1lZGl1bQ==", "--todd-font-family": "\"Cabinet Grotesk\", \"Cabinet Grotesk Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "14px", "--todd-font-weight": "500", "--todd-text-color": "var(--extracted-a0htzi, var(--token-90c91e2f-2711-42f9-b040-c513ede37629, rgb(0, 0, 0)))"}}>
                            {content.social[2]?.label ?? "Behance"}
                          </h3>
                        </div>
                      </div>
                    </div>
                  </a>
                </div>
              </div>
              <div className={"todd-footer__copyrights"} data-todd-name={"Copyrights"}>
                <div className={"todd-footer__phone-15"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss02' on, 'ss03' on", "--todd-font-size": "12px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.6em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                    {content.copyright}
                  </p>
                </div>
              </div>
            </section>
          </HiddenReveal>
          </div>
        </div>
        </div>
        <div className={"ssr-variant todd-hide-mobile"}>
          <div className={"todd-intro__wrapper-5 todd-hide-desktop todd-hide-tablet"} data-todd-name={"Hero illo"}>
            <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-todd-background-image-wrapper={true}>
              <img decoding={"async"} width={1973} height={2341} srcSet={`${content.mark}?scale-down-to=1024&width=1973&height=2341 863w,${content.mark}?scale-down-to=2048&width=1973&height=2341 1726w,${content.mark}?width=1973&height=2341 1973w`} src={`${content.mark}?width=1973&height=2341`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} sizes={"(min-width: 1200px) 100vw, (min-width: 810px) and (max-width: 1199.98px) 100vw, (max-width: 809.98px) calc(100vw - 20px)"} />
            </div>
          </div>
        </div>
        <div className={"ssr-variant todd-hide-desktop todd-hide-tablet"}>
          <div className={"todd-intro__wrapper-5 todd-hide-desktop todd-hide-tablet"} data-todd-name={"Hero illo"}>
            <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-todd-background-image-wrapper={true}>
              <img decoding={"async"} width={1973} height={2341} sizes={"(min-width: 1200px) 100vw, (min-width: 810px) and (max-width: 1199.98px) 100vw, (max-width: 809.98px) calc(100vw - 20px)"} srcSet={`${content.mark}?scale-down-to=1024&width=1973&height=2341 863w,${content.mark}?scale-down-to=2048&width=1973&height=2341 1726w,${content.mark}?width=1973&height=2341 1973w`} src={`${content.mark}?width=1973&height=2341`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
            </div>
          </div>
        </div>
        <div className={"todd-intro__wrapper-3 todd-hide-mobile"} data-todd-name={"Image"} aria-hidden={true}>
          <div className={"todd-footer__phone-12"}>
            <div className={"todd-footer__mail-back"} data-todd-name={"Mail back"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Mail back"} data-todd-shadows className={"todd-footer__mail-back-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-226076407_725"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Mail back"} data-todd-shadows className={"todd-footer__mail-back-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1322836612_703"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <FooterDecoMotion className={"todd-footer__bee-4-2"} data-todd-name={"Bee-4"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Bee-4"} data-todd-shadows className={"todd-footer__bee-4"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1519463729_384"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Bee-4"} data-todd-shadows className={"todd-footer__bee-4"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1707044567_382"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__flower-7-2"} data-todd-name={"Flower-7"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-7"} data-todd-shadows className={"todd-footer__flower-7"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg98908316_1096"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-7"} data-todd-shadows className={"todd-footer__flower-7"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-205836683_1097"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__bee-1"} data-todd-name={"Bee-1"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Bee-1"} data-todd-shadows className={"todd-footer__bee-1-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1195524220_965"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Bee-1"} data-todd-shadows className={"todd-footer__bee-1-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1080232311_975"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion preset="stem6" className={"todd-footer__stem-6-2"} data-todd-name={"Stem-6"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Stem-6"} data-todd-shadows className={"todd-footer__stem-6"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg138583917_277"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Stem-6"} data-todd-shadows className={"todd-footer__stem-6"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1376898543_275"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__stem-5-2"} data-todd-name={"Stem-5"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Stem-5"} data-todd-shadows className={"todd-footer__stem-5"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-186645044_286"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Stem-5"} data-todd-shadows className={"todd-footer__stem-5"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1413209763_286"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__stem-9"} data-todd-name={"Stem-9"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Stem-9"} data-todd-shadows className={"todd-footer__stem-9-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1103376068_482"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Stem-9"} data-todd-shadows className={"todd-footer__stem-9-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1099019237_480"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__flower-1"} data-todd-name={"Flower-1"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-1"} data-todd-shadows className={"todd-footer__flower-1-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg955727017_2282"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-1"} data-todd-shadows className={"todd-footer__flower-1-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-667324928_2257"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__flower-9"} data-todd-name={"Flower-9"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-9"} data-todd-shadows className={"todd-footer__flower-9-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1618025311_1097"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-9"} data-todd-shadows className={"todd-footer__flower-9-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1072683184_1104"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__flower-5"} data-todd-name={"Flower-5"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-5"} data-todd-shadows className={"todd-footer__flower-5-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg2043460706_2163"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-5"} data-todd-shadows className={"todd-footer__flower-5-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg590588207_2130"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__flower-3-2"} data-todd-name={"Flower-3"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-3"} data-todd-shadows className={"todd-footer__flower-3"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1158744089_1112"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-3"} data-todd-shadows className={"todd-footer__flower-3"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-305542571_1132"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__bee-3"} data-todd-name={"Bee-3"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Bee-3"} data-todd-shadows className={"todd-footer__bee-3-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1962913764_387"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Bee-3"} data-todd-shadows className={"todd-footer__bee-3-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-974612198_386"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__bee-2"} data-todd-name={"Bee-2"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Bee-2"} data-todd-shadows className={"todd-footer__bee-2-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-470829930_785"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Bee-2"} data-todd-shadows className={"todd-footer__bee-2-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1778732115_787"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__flower-8-2"} data-todd-name={"Flower-8"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-8"} data-todd-shadows className={"todd-footer__flower-8"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1245005864_1106"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-8"} data-todd-shadows className={"todd-footer__flower-8"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1171261625_1102"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__flower-2"} data-todd-name={"Flower-2"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-2"} data-todd-shadows className={"todd-footer__flower-2-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1839134178_1093"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-2"} data-todd-shadows className={"todd-footer__flower-2-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1987642878_1113"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion preset="stem4" className={"todd-footer__stem-4-2"} data-todd-name={"Stem-4"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Stem-4"} data-todd-shadows className={"todd-footer__stem-4"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1667862919_287"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Stem-4"} data-todd-shadows className={"todd-footer__stem-4"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1812747621_284"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__stem-10"} data-todd-name={"Stem-10"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Stem-10"} data-todd-shadows className={"todd-footer__stem-10-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1404849184_481"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Stem-10"} data-todd-shadows className={"todd-footer__stem-10-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg2032422710_482"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__flower-10"} data-todd-name={"Flower-10"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-10"} data-todd-shadows className={"todd-footer__flower-10-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-307921333_1058"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-10"} data-todd-shadows className={"todd-footer__flower-10-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg942345922_1071"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <div className={"todd-footer__mail-front"} data-todd-name={"Mail front"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Mail front"} data-todd-shadows className={"todd-footer__mail-front-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg158658355_458"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Mail front"} data-todd-shadows className={"todd-footer__mail-front-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg338496860_446"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <FooterDecoMotion className={"todd-footer__flower-6-2"} data-todd-name={"Flower-6"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-6"} data-todd-shadows className={"todd-footer__flower-6"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-640901281_1241"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-6"} data-todd-shadows className={"todd-footer__flower-6"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1255717965_1234"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
            <FooterDecoMotion className={"todd-footer__flower-4"} data-todd-name={"Flower-4"}>
              <div className={"ssr-variant todd-hide-tablet"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-4"} data-todd-shadows className={"todd-footer__flower-4-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg879312155_2202"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant todd-hide-mobile todd-hide-desktop"}>
                <div data-todd-component-type={"SVG"} data-todd-name={"Flower-4"} data-todd-shadows className={"todd-footer__flower-4-2"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1760681481_2196"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </FooterDecoMotion>
          </div>
        </div>
      </div>
    </footer>
  );
}
