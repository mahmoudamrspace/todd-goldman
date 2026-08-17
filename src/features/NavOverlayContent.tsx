"use client";

import type { IntroContent } from "@/content/section-types";
import { NavMenuList } from "@/features/NavMenuList";
import { NavOverlayPanel } from "@/entities/NavOverlayPanel";

export interface NavOverlayContentProps {
  content: IntroContent;
  open: boolean;
}

/** Desktop/tablet nav overlay: Follow | Menu | Contact columns. */
export function NavOverlayContent({ content, open }: NavOverlayContentProps) {
  return (
    <div className={"todd-nav-overlay-content__content"} data-todd-name={"Content"}>
      <NavOverlayPanel
        className={"todd-nav-overlay-content__contact-follow"}
        data-todd-name={"Contact & Follow"}
        open={open}
        axis="x"
        offset={20}
        delay={0.4}
        style={{ willChange: "transform" }}
      >
        <div className={"todd-nav-overlay-content__follow"} data-todd-name={"Follow"}>
          <div
            className={"todd-nav-overlay-content__rich-text-container"}
            data-todd-component-type={"RichTextContainer"}
            style={{
              "--extracted-r6o4lv":
                "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))",
              "--todd-link-text-color": "rgb(0, 153, 255)",
              "--todd-link-text-decoration": "underline",
              transform: "none",
            }}
          >
            <p
              dir={"auto"}
              className={"todd-text"}
              style={{
                "--font-selector": "SW50ZXItQm9sZA==",
                "--todd-font-open-type-features":
                  "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                "--todd-font-weight": "700",
                "--todd-letter-spacing": "-0.02em",
                "--todd-line-height": "1.3em",
                "--todd-text-color":
                  "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))",
              }}
            >
              Follow
            </p>
          </div>
          <div className={"todd-nav-overlay-content__nav-wrapper-2"} data-todd-name={"Nav Wrapper"}>
            <div className={"todd-nav-overlay-content__rich-text-container-7"}>
              <a
                className={
                  "todd-nav-overlay-content__desktop-2 todd-nav-overlay-content__desktop-3 todd-nav-overlay-content__desktop-4-6-crnkmg todd-nav-overlay-content__desktop"
                }
                data-todd-name={"Desktop"}
                href={content.social[0]?.href ?? "#"}
                target={"_blank"}
                rel={"noopener"}
                style={{ opacity: "1" }}
              >
                <div
                  className={"todd-nav-overlay-content__rich-text-container-4"}
                  data-todd-component-type={"RichTextContainer"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)",
                    "--todd-link-text-color": "rgb(0, 153, 255)",
                    "--todd-link-text-decoration": "underline",
                    "--variable-reference-N1lPvL2DK-fK6GBdN0M":
                      "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                    transform: "none",
                  }}
                >
                  <p
                    dir={"auto"}
                    className={"todd-text"}
                    style={{
                      "--font-selector": "SW50ZXItTWVkaXVt",
                      "--todd-font-open-type-features":
                        "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                      "--todd-font-weight": "500",
                      "--todd-letter-spacing": "-0.02em",
                      "--todd-line-height": "1.3em",
                      "--todd-text-color":
                        "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))",
                    }}
                  >
                    {content.social[0]?.label ?? "Instagram"}
                  </p>
                </div>
              </a>
            </div>
            <div className={"todd-nav-overlay-content__rich-text-container-5"}>
              <a
                className={
                  "todd-nav-overlay-content__desktop-2 todd-nav-overlay-content__desktop-3 todd-nav-overlay-content__desktop-4-6-crnkmg todd-nav-overlay-content__desktop"
                }
                data-todd-name={"Desktop"}
                href={content.social[1]?.href ?? "#"}
                target={"_blank"}
                rel={"noopener"}
                style={{ opacity: "1" }}
              >
                <div
                  className={"todd-nav-overlay-content__rich-text-container-4"}
                  data-todd-component-type={"RichTextContainer"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)",
                    "--todd-link-text-color": "rgb(0, 153, 255)",
                    "--todd-link-text-decoration": "underline",
                    "--variable-reference-N1lPvL2DK-fK6GBdN0M":
                      "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                    transform: "none",
                  }}
                >
                  <p
                    dir={"auto"}
                    className={"todd-text"}
                    style={{
                      "--font-selector": "SW50ZXItTWVkaXVt",
                      "--todd-font-open-type-features":
                        "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                      "--todd-font-weight": "500",
                      "--todd-letter-spacing": "-0.02em",
                      "--todd-line-height": "1.3em",
                      "--todd-text-color":
                        "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))",
                    }}
                  >
                    {content.social[1]?.label ?? "Linkedin"}
                  </p>
                </div>
              </a>
            </div>
            <div className={"todd-nav-overlay-content__rich-text-container-3"}>
              <a
                className={
                  "todd-nav-overlay-content__desktop-2 todd-nav-overlay-content__desktop-3 todd-nav-overlay-content__desktop-4-6-crnkmg todd-nav-overlay-content__desktop"
                }
                data-todd-name={"Desktop"}
                href={content.social[2]?.href ?? "#"}
                target={"_blank"}
                rel={"noopener"}
                style={{ opacity: "1" }}
              >
                <div
                  className={"todd-nav-overlay-content__rich-text-container-4"}
                  data-todd-component-type={"RichTextContainer"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)",
                    "--todd-link-text-color": "rgb(0, 153, 255)",
                    "--todd-link-text-decoration": "underline",
                    "--variable-reference-N1lPvL2DK-fK6GBdN0M":
                      "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                    transform: "none",
                  }}
                >
                  <p
                    dir={"auto"}
                    className={"todd-text"}
                    style={{
                      "--font-selector": "SW50ZXItTWVkaXVt",
                      "--todd-font-open-type-features":
                        "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                      "--todd-font-weight": "500",
                      "--todd-letter-spacing": "-0.02em",
                      "--todd-line-height": "1.3em",
                      "--todd-text-color":
                        "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))",
                    }}
                  >
                    {content.social[2]?.label ?? "Behance"}
                  </p>
                </div>
              </a>
            </div>
          </div>
        </div>
      </NavOverlayPanel>
      <NavMenuList content={content} open={open} />
      <div className={"todd-nav-overlay-content__contact"} data-todd-name={"Contact"}>
        <div
          className={"todd-nav-overlay-content__rich-text-container-2"}
          data-todd-component-type={"RichTextContainer"}
          style={{
            "--extracted-r6o4lv":
              "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))",
            "--todd-link-text-color": "rgb(0, 153, 255)",
            "--todd-link-text-decoration": "underline",
            transform: "none",
          }}
        >
          <p
            dir={"auto"}
            className={"todd-text"}
            style={{
              "--font-selector": "SW50ZXItQm9sZA==",
              "--todd-font-open-type-features":
                "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
              "--todd-font-weight": "700",
              "--todd-letter-spacing": "-0.02em",
              "--todd-line-height": "1.3em",
              "--todd-text-color":
                "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))",
            }}
          >
            Contact
          </p>
        </div>
        <div className={"todd-nav-overlay-content__nav-wrapper"} data-todd-name={"Nav Wrapper"}>
          <div className={"todd-nav-overlay-content__rich-text-container"}>
            <a
              className={
                "todd-nav-overlay-content__desktop-2 todd-nav-overlay-content__desktop-3 todd-nav-overlay-content__desktop-4-6-crnkmg todd-nav-overlay-content__desktop"
              }
              data-todd-name={"Desktop"}
              href={`mailto:${content.email}`}
              target={"_blank"}
              rel={"noopener"}
              style={{ opacity: "1" }}
            >
              <div
                className={"todd-nav-overlay-content__rich-text-container-4"}
                data-todd-component-type={"RichTextContainer"}
                style={{
                  "--extracted-r6o4lv":
                    "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)",
                  "--todd-link-text-color": "rgb(0, 153, 255)",
                  "--todd-link-text-decoration": "underline",
                  "--variable-reference-N1lPvL2DK-fK6GBdN0M":
                    "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                  transform: "none",
                }}
              >
                <p
                  dir={"auto"}
                  className={"todd-text"}
                  style={{
                    "--font-selector": "SW50ZXItTWVkaXVt",
                    "--todd-font-open-type-features":
                      "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                    "--todd-font-weight": "500",
                    "--todd-letter-spacing": "-0.02em",
                    "--todd-line-height": "1.3em",
                    "--todd-text-color":
                      "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))",
                  }}
                >
                  {content.email}
                </p>
              </div>
            </a>
          </div>
          {content.phone ? (
            <div className={"todd-nav-overlay-content__rich-text-container-6"}>
              <a
                className={
                  "todd-nav-overlay-content__desktop-2 todd-nav-overlay-content__desktop-3 todd-nav-overlay-content__desktop-4-6-crnkmg todd-nav-overlay-content__desktop"
                }
                data-todd-name={"Desktop"}
                href={`tel:${content.phone.replace(/\s/g, "")}`}
                target={"_blank"}
                rel={"noopener"}
                style={{ opacity: "1" }}
              >
                <div
                  className={"todd-nav-overlay-content__rich-text-container-4"}
                  data-todd-component-type={"RichTextContainer"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)",
                    "--todd-link-text-color": "rgb(0, 153, 255)",
                    "--todd-link-text-decoration": "underline",
                    "--variable-reference-N1lPvL2DK-fK6GBdN0M":
                      "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                    transform: "none",
                  }}
                >
                  <p
                    dir={"auto"}
                    className={"todd-text"}
                    style={{
                      "--font-selector": "SW50ZXItTWVkaXVt",
                      "--todd-font-open-type-features":
                        "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                      "--todd-font-weight": "500",
                      "--todd-letter-spacing": "-0.02em",
                      "--todd-line-height": "1.3em",
                      "--todd-text-color":
                        "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))",
                    }}
                  >
                    {content.phone}
                  </p>
                </div>
              </a>
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}
