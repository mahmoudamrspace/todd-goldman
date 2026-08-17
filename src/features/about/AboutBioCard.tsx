"use client";

import type { AboutContent } from "@/content/section-types";
import { AboutBodyRichText, AboutHandwrittenName, AboutMeHeading } from "@/features/AboutRichText";
import { Appear } from "@/features/Appear";
import { toddSceneArt } from "@/content/todd-scenes";
import {
  AboutBlockReveal,
  AboutCardImage,
  AboutCardIcon,
  AboutImageReveal,
  AboutWrapperReveal,
} from "@/features/about/about-reveal";
import { cn } from "@/shared/lib/cn";
import { TODD } from "@/shared/lib/todd-semantic-classes";

export interface AboutBioCardProps {
  content: AboutContent;
  cardImage: string;
}

/** About-me bio card. */
export function AboutBioCard({ content, cardImage }: AboutBioCardProps) {
  return (
    <AboutBlockReveal
      className="todd-intro__wrapper-me"
      data-todd-name="About me"
      id="about-1"
    >
      <div className={cn(TODD.about.card, TODD.card.shell)} data-border={true} data-todd-name="Container">
        <AboutImageReveal className="todd-about__card-image todd-about__img" data-todd-name="Img">
          <AboutCardImage src={cardImage} />
        </AboutImageReveal>
        <AboutWrapperReveal
          className="todd-about__wrapper todd-about__wrapper--responsive"
          data-todd-name="Wrapper"
          data-border={true}
        >
          <div className="todd-about__content-4" data-todd-name="Content">
            <div className="todd-about__title-wrap-4" data-todd-name="Title Wrap">
              <AboutCardIcon
                src={toddSceneArt.neverGrowUpCardArt}
                className="todd-intro__wrapper-22"
              />
              <Appear
                id="10d8ozj"
                className="todd-about__title"
                data-todd-name="Title"
                data-todd-component-type="RichTextContainer"
                style={{ opacity: "0.001", transform: "none" }}
              >
                <h3
                  dir="auto"
                  style={{
                    "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
                    "--todd-font-family":
                      '"Inter Display", "Inter Display Placeholder", sans-serif',
                    "--todd-font-open-type-features":
                      "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on",
                    "--todd-font-size": "36px",
                    "--todd-font-weight": "700",
                    "--todd-letter-spacing": "-1.2px",
                    "--todd-line-height": "52px",
                    "--todd-text-alignment": "center",
                    "--todd-text-color":
                      "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
                  }}
                  className="todd-text"
                >
                  <AboutMeHeading heading={content.heading} />
                </h3>
              </Appear>
            </div>
            <Appear
              id="i446vz"
              className="todd-about__rich-text-container-19"
              data-todd-component-type="RichTextContainer"
              style={{ opacity: "0.001", transform: "none" }}
            >
              <p
                dir="auto"
                style={{
                  "--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==",
                  "--todd-font-family":
                    '"Inter Display", "Inter Display Placeholder", sans-serif',
                  "--todd-font-open-type-features":
                    "'ss02' on, 'ss01' on, 'ss03' on, 'ss04' on, 'ss08' on, 'ss07' on, 'salt' on",
                  "--todd-font-size": "18px",
                  "--todd-font-weight": "500",
                  "--todd-letter-spacing": "0.2px",
                  "--todd-line-height": "1.4em",
                  "--todd-text-alignment": "left",
                  "--todd-text-color":
                    "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))",
                }}
                className="todd-text"
              >
                <AboutBodyRichText body={content.body} />
              </p>
            </Appear>
            <div
              className="todd-about__rich-text-container-8"
              data-todd-component-type="RichTextContainer"
            >
              <p
                dir="auto"
                style={{
                  "--font-selector": "R0Y7R3JhcGUgTnV0cy1yZWd1bGFy",
                  "--todd-font-family": '"Grape Nuts", sans-serif',
                  "--todd-font-size": "56px",
                  "--todd-text-color":
                    "var(--token-a962588e-440d-4f71-ad7a-bd7fc38d62f3, rgb(255, 83, 36))",
                }}
                className="todd-text"
              >
                <AboutHandwrittenName name={content.name} />
              </p>
            </div>
          </div>
        </AboutWrapperReveal>
      </div>
    </AboutBlockReveal>
  );
}
