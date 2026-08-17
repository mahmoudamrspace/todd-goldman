"use client";

import type { AboutContent } from "@/content/section-types";
import { AboutClientsList } from "@/features/AboutRichText";
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


export interface AboutClientsCardProps {
  content: AboutContent;
  cardImage: string;
}

/** Selected clients card. */
export function AboutClientsCard({ content, cardImage }: AboutClientsCardProps) {
  const [clientsLead, ...clientsRest] = content.clientsTitle.split(/\s+/).filter(Boolean);
  const clientsTail = clientsRest.join(" ");
  return (
    <AboutBlockReveal className={"todd-about__rich-text-container-14"} data-todd-name={content.clientsTitle} id={"selected-clients"}>
            <div className={cn("todd-about__container-2", TODD.card.shell)} data-border={true} data-todd-name={"Container"}>
              <AboutImageReveal className={"todd-about__card-image todd-about__img-4"} data-todd-name={"Img"}>
                <AboutCardImage src={cardImage} />
              </AboutImageReveal>
              <AboutWrapperReveal className={"todd-about__wrapper-4 todd-about__wrapper--responsive"} data-todd-name={"Wrapper"} data-border={true}>
                <div className={"todd-about__content-3"} data-todd-name={"Content"}>
                  <div className={"todd-about__title-wrap-2"} data-todd-name={"Title Wrap"}>
                    <AboutCardIcon src={toddSceneArt.whereArtCardArt} className={"todd-intro__wrapper-6"} />
                    <Appear id="10qxt3k" className={"todd-about__title-2"} data-todd-name={"Title"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--todd-font-family": "\"Averia Serif Libre\", sans-serif", "--todd-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--todd-font-size": "36px", "--todd-font-style": "italic", "--todd-letter-spacing": "-1.2px", "--todd-line-height": "52px", "--todd-text-alignment": "center", "--todd-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"todd-text"}>
                          {clientsLead}
                          <span style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--todd-font-weight": "700"}} className={"todd-text"}> </span>
                          <span style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-style": "normal", "--todd-font-weight": "700"}} className={"todd-text"}>
                            {clientsTail}
                          </span>
                        </h3>
                    </Appear>
                  </div>
                  <Appear id="15capyb" className={"todd-about__rich-text-container-4"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                      <p dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss02' on, 'ss01' on, 'ss03' on, 'ss04' on, 'ss08' on, 'ss07' on, 'salt' on", "--todd-font-size": "18px", "--todd-letter-spacing": "-0.1px", "--todd-line-height": "1.4em", "--todd-text-alignment": "left", "--todd-text-color": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))"}} className={"todd-text"}><AboutClientsList clients={content.clients} /></p>
                  </Appear>
                </div>
              </AboutWrapperReveal>
            </div>
          </AboutBlockReveal>
  );
}
