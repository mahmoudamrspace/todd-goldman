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
    <div className={"framer-ijjr0j"} data-framer-name={"Content"}>
      <NavOverlayPanel
        className={"framer-76vnp9"}
        data-framer-name={"Contact & Follow"}
        open={open}
        axis="x"
        offset={20}
        delay={0.4}
        style={{ willChange: "transform" }}
      >
        <div className={"framer-1y56zkb"} data-framer-name={"Follow"}>
          <div
            className={"framer-vjwl3u"}
            data-framer-component-type={"RichTextContainer"}
            style={{
              "--extracted-r6o4lv":
                "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))",
              "--framer-link-text-color": "rgb(0, 153, 255)",
              "--framer-link-text-decoration": "underline",
              transform: "none",
            }}
          >
            <p
              dir={"auto"}
              className={"framer-text"}
              style={{
                "--font-selector": "SW50ZXItQm9sZA==",
                "--framer-font-open-type-features":
                  "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                "--framer-font-weight": "700",
                "--framer-letter-spacing": "-0.02em",
                "--framer-line-height": "1.3em",
                "--framer-text-color":
                  "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))",
              }}
            >
              Follow
            </p>
          </div>
          <div className={"framer-1t9rs56"} data-framer-name={"Nav Wrapper"}>
            <div className={"framer-9a6gc3-container"}>
              <a
                className={
                  "framer-3o9hP framer-crnkmg framer-v-crnkmg framer-15q3n4m"
                }
                data-framer-name={"Desktop"}
                href={content.social[0]?.href ?? "#"}
                target={"_blank"}
                rel={"noopener"}
                style={{ opacity: "1" }}
              >
                <div
                  className={"framer-1y91x5d"}
                  data-framer-component-type={"RichTextContainer"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)",
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                    "--variable-reference-N1lPvL2DK-fK6GBdN0M":
                      "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                    transform: "none",
                  }}
                >
                  <p
                    dir={"auto"}
                    className={"framer-text"}
                    style={{
                      "--font-selector": "SW50ZXItTWVkaXVt",
                      "--framer-font-open-type-features":
                        "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                      "--framer-font-weight": "500",
                      "--framer-letter-spacing": "-0.02em",
                      "--framer-line-height": "1.3em",
                      "--framer-text-color":
                        "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))",
                    }}
                  >
                    {content.social[0]?.label ?? "Instagram"}
                  </p>
                </div>
              </a>
            </div>
            <div className={"framer-5ix952-container"}>
              <a
                className={
                  "framer-3o9hP framer-crnkmg framer-v-crnkmg framer-15q3n4m"
                }
                data-framer-name={"Desktop"}
                href={content.social[1]?.href ?? "#"}
                target={"_blank"}
                rel={"noopener"}
                style={{ opacity: "1" }}
              >
                <div
                  className={"framer-1y91x5d"}
                  data-framer-component-type={"RichTextContainer"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)",
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                    "--variable-reference-N1lPvL2DK-fK6GBdN0M":
                      "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                    transform: "none",
                  }}
                >
                  <p
                    dir={"auto"}
                    className={"framer-text"}
                    style={{
                      "--font-selector": "SW50ZXItTWVkaXVt",
                      "--framer-font-open-type-features":
                        "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                      "--framer-font-weight": "500",
                      "--framer-letter-spacing": "-0.02em",
                      "--framer-line-height": "1.3em",
                      "--framer-text-color":
                        "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))",
                    }}
                  >
                    {content.social[1]?.label ?? "Linkedin"}
                  </p>
                </div>
              </a>
            </div>
            <div className={"framer-1ssj3ba-container"}>
              <a
                className={
                  "framer-3o9hP framer-crnkmg framer-v-crnkmg framer-15q3n4m"
                }
                data-framer-name={"Desktop"}
                href={content.social[2]?.href ?? "#"}
                target={"_blank"}
                rel={"noopener"}
                style={{ opacity: "1" }}
              >
                <div
                  className={"framer-1y91x5d"}
                  data-framer-component-type={"RichTextContainer"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)",
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                    "--variable-reference-N1lPvL2DK-fK6GBdN0M":
                      "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                    transform: "none",
                  }}
                >
                  <p
                    dir={"auto"}
                    className={"framer-text"}
                    style={{
                      "--font-selector": "SW50ZXItTWVkaXVt",
                      "--framer-font-open-type-features":
                        "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                      "--framer-font-weight": "500",
                      "--framer-letter-spacing": "-0.02em",
                      "--framer-line-height": "1.3em",
                      "--framer-text-color":
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
      <div className={"framer-14nq1fn"} data-framer-name={"Contact"}>
        <div
          className={"framer-1sl0i4i"}
          data-framer-component-type={"RichTextContainer"}
          style={{
            "--extracted-r6o4lv":
              "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))",
            "--framer-link-text-color": "rgb(0, 153, 255)",
            "--framer-link-text-decoration": "underline",
            transform: "none",
          }}
        >
          <p
            dir={"auto"}
            className={"framer-text"}
            style={{
              "--font-selector": "SW50ZXItQm9sZA==",
              "--framer-font-open-type-features":
                "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
              "--framer-font-weight": "700",
              "--framer-letter-spacing": "-0.02em",
              "--framer-line-height": "1.3em",
              "--framer-text-color":
                "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))",
            }}
          >
            Contact
          </p>
        </div>
        <div className={"framer-11zn8yr"} data-framer-name={"Nav Wrapper"}>
          <div className={"framer-1qlha6s-container"}>
            <a
              className={
                "framer-3o9hP framer-crnkmg framer-v-crnkmg framer-15q3n4m"
              }
              data-framer-name={"Desktop"}
              href={`mailto:${content.email}`}
              target={"_blank"}
              rel={"noopener"}
              style={{ opacity: "1" }}
            >
              <div
                className={"framer-1y91x5d"}
                data-framer-component-type={"RichTextContainer"}
                style={{
                  "--extracted-r6o4lv":
                    "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)",
                  "--framer-link-text-color": "rgb(0, 153, 255)",
                  "--framer-link-text-decoration": "underline",
                  "--variable-reference-N1lPvL2DK-fK6GBdN0M":
                    "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                  transform: "none",
                }}
              >
                <p
                  dir={"auto"}
                  className={"framer-text"}
                  style={{
                    "--font-selector": "SW50ZXItTWVkaXVt",
                    "--framer-font-open-type-features":
                      "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                    "--framer-font-weight": "500",
                    "--framer-letter-spacing": "-0.02em",
                    "--framer-line-height": "1.3em",
                    "--framer-text-color":
                      "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))",
                  }}
                >
                  {content.email}
                </p>
              </div>
            </a>
          </div>
          {content.phone ? (
            <div className={"framer-78jdyh-container"}>
              <a
                className={
                  "framer-3o9hP framer-crnkmg framer-v-crnkmg framer-15q3n4m"
                }
                data-framer-name={"Desktop"}
                href={`tel:${content.phone.replace(/\s/g, "")}`}
                target={"_blank"}
                rel={"noopener"}
                style={{ opacity: "1" }}
              >
                <div
                  className={"framer-1y91x5d"}
                  data-framer-component-type={"RichTextContainer"}
                  style={{
                    "--extracted-r6o4lv":
                      "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)",
                    "--framer-link-text-color": "rgb(0, 153, 255)",
                    "--framer-link-text-decoration": "underline",
                    "--variable-reference-N1lPvL2DK-fK6GBdN0M":
                      "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
                    transform: "none",
                  }}
                >
                  <p
                    dir={"auto"}
                    className={"framer-text"}
                    style={{
                      "--font-selector": "SW50ZXItTWVkaXVt",
                      "--framer-font-open-type-features":
                        "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
                      "--framer-font-weight": "500",
                      "--framer-letter-spacing": "-0.02em",
                      "--framer-line-height": "1.3em",
                      "--framer-text-color":
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
