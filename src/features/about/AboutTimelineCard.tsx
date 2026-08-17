"use client";

import type { AboutContent } from "@/content/section-types";
import { Appear } from "@/features/Appear";
import { toddSceneArt } from "@/content/todd-scenes";
import { cn } from "@/shared/lib/cn";
import { TODD } from "@/shared/lib/todd-semantic-classes";
import {
  AboutBlockReveal,
  AboutCardImage,
  AboutCardIcon,
  AboutImageReveal,
  AboutWrapperReveal,
} from "@/features/about/about-reveal";
import { AboutTimelineRow } from "@/features/about/AboutTimelineRow";

export interface AboutTimelineCardProps {
  content: AboutContent;
  cardImage: string;
}

/** Selected talks / timeline card. */
export function AboutTimelineCard({ content, cardImage }: AboutTimelineCardProps) {
  const [talksLead, ...talksRest] = content.talksTitle.split(/\s+/).filter(Boolean);
  const talksTail = talksRest.join(" ");

  return (
    <AboutBlockReveal
      className="todd-about__rich-text-container-20"
      data-todd-name={content.talksTitle}
      id="selected-talks"
    >
      <div className={cn("todd-intro__wrapper-24", TODD.card.shell)} data-border={true} data-todd-name="Container">
        <AboutImageReveal className="todd-about__card-image todd-about__img-2" data-todd-name="Img">
          <AboutCardImage src={cardImage} />
        </AboutImageReveal>
        <AboutWrapperReveal
          className="todd-about__wrapper-3 todd-about__wrapper--responsive"
          data-todd-name="Wrapper"
          data-border={true}
        >
          <div className="todd-about__content" data-todd-name="Content">
            <div className="todd-about__title-wrap" data-todd-name="Title Wrap">
              <AboutCardIcon src={toddSceneArt.timelineCardArt} className="todd-about__variant" />
              <Appear
                id="zq3mu5"
                className="todd-about__title-5"
                data-todd-name="Title"
                data-todd-component-type="RichTextContainer"
                style={{ opacity: "0.001", transform: "none" }}
              >
                <h3
                  dir="auto"
                  style={{
                    "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==",
                    "--todd-font-family": '"Averia Serif Libre", sans-serif',
                    "--todd-font-size": "36px",
                    "--todd-font-style": "italic",
                    "--todd-letter-spacing": "-1.2px",
                    "--todd-line-height": "52px",
                    "--todd-text-alignment": "center",
                    "--todd-text-color":
                      "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
                  }}
                  className="todd-text"
                >
                  {talksLead}
                  <span
                    style={{
                      "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==",
                      "--todd-font-weight": "700",
                    }}
                    className="todd-text"
                  >
                    {" "}
                  </span>
                  <span
                    style={{
                      "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
                      "--todd-font-family":
                        '"Inter Display", "Inter Display Placeholder", sans-serif',
                      "--todd-font-style": "normal",
                      "--todd-font-weight": "700",
                    }}
                    className="todd-text"
                  >
                    {talksTail}
                  </span>
                </h3>
              </Appear>
            </div>
            <div className="todd-about__content-5" data-todd-name="Content">
              <div className="todd-about__items-wrapper" data-todd-name="Items wrapper">
                {content.talks.map((entry, index) => (
                  <AboutTimelineRow key={`${entry.year}-${entry.milestone}`} entry={entry} index={index} />
                ))}
              </div>
            </div>
          </div>
        </AboutWrapperReveal>
      </div>
    </AboutBlockReveal>
  );
}
