"use client";

import type { AboutContent } from "@/content/section-types";
import { Appear } from "@/features/Appear";
import { AnimatedSpan } from "@/features/HiddenReveal";
import { toddSceneArt } from "@/content/todd-scenes";
import { cn } from "@/shared/lib/cn";
import { responsiveHiddenOn, TODD } from "@/shared/lib/todd-semantic-classes";
import {
  AboutBlockReveal,
  AboutCardImage,
  AboutCardIcon,
  AboutImageReveal,
  AboutWrapperReveal,
} from "@/features/about/about-reveal";


export interface AboutStatsCardProps {
  content: AboutContent;
  cardImage: string;
}

/** By the numbers / awards stats card. */
export function AboutStatsCard({ content, cardImage }: AboutStatsCardProps) {
  return (
    <AboutBlockReveal className={"todd-about__awwards"} data-todd-name={"Awwards"} id={"awwards"}>
            <div className={cn("todd-intro__wrapper-17", TODD.card.shell)} data-border={true} data-todd-name={"Container"}>
              <AboutImageReveal className={"todd-about__card-image todd-about__img-3"} data-todd-name={"Img"} style={{"transform": "rotate(-180deg)"}}>
                <AboutCardImage src={cardImage} />
              </AboutImageReveal>
              <AboutWrapperReveal className={"todd-about__wrapper-2 todd-about__wrapper--responsive"} data-todd-name={"Wrapper"} data-border={true}>
                <div className={"todd-about__content-2"} data-todd-name={"Content"}>
                  <div className={"todd-about__title-wrap-3"} data-todd-name={"Title Wrap"}>
                    <AboutCardIcon src={toddSceneArt.byTheNumbersCardArt} className={"todd-intro__wrapper-2"} />
                    <Appear id="1i8t5dv" className={"todd-about__title-3"} data-todd-name={"Title"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--todd-font-family": "\"Averia Serif Libre\", sans-serif", "--todd-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--todd-font-size": "36px", "--todd-font-style": "italic", "--todd-font-weight": "700", "--todd-letter-spacing": "-1.2px", "--todd-line-height": "52px", "--todd-text-alignment": "center", "--todd-text-color": "rgb(9, 9, 9)"}} className={"todd-text"}>
                          {content.awardsTitle}
                        </h3>
                    </Appear>
                  </div>
                  <div className={"ssr-variant"}>
                    <Appear id="87ac2n" className={"todd-about__rich-text-container-16"} style={{"opacity": "0.001", "transform": "none"}}>
                        <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__responsive-row"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                          <div className={"todd-about__rich-text-container-24"}>
                            <div className={"todd-about__rich-text-container-22"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                {content.awards[0]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"todd-about__rich-text-container-17"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                            <div className={"todd-about__rich-text-container-13"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                {content.awards[0]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={cn("todd-about__rich-text-container-23", responsiveHiddenOn("mobile"))} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                          </div>
                          <div className={cn("todd-about__rich-text-container-6", responsiveHiddenOn("mobile"))} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                              <AnimatedSpan y={10}>{content.awards[0]?.year ?? ""}</AnimatedSpan>
                            </p>
                          </div>
                        </div>
                    </Appear>
                  </div>
                  <div className={"ssr-variant"}>
                    <Appear id="yxvyew" className={"todd-about__rich-text-container-25"} style={{"opacity": "0.001", "transform": "none"}}>
                        <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__responsive-row"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                          <div className={"todd-about__rich-text-container-24"}>
                            <div className={"todd-about__rich-text-container-22"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                {content.awards[1]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-1-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"todd-about__rich-text-container-17"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                            <div className={"todd-about__rich-text-container-13"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                {content.awards[1]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-1-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"todd-about__rich-text-container-23"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                          </div>
                          <div className={"todd-about__rich-text-container-6"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                              <AnimatedSpan y={10}>{content.awards[1]?.year ?? ""}</AnimatedSpan>
                            </p>
                          </div>
                        </div>
                    </Appear>
                  </div>
                  <div className={"ssr-variant"}>
                    <Appear id="1i5tzip" className={"todd-about__rich-text-container-9"} style={{"opacity": "0.001", "transform": "none"}}>
                        <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__responsive-row"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                          <div className={"todd-about__rich-text-container-24"}>
                            <div className={"todd-about__rich-text-container-22"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                {content.awards[2]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-2-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"todd-about__rich-text-container-17"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                            <div className={"todd-about__rich-text-container-13"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                {content.awards[2]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"todd-about__rich-text-container-23"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                          </div>
                          <div className={"todd-about__rich-text-container-6"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                              <AnimatedSpan y={10}>{content.awards[2]?.year ?? ""}</AnimatedSpan>
                            </p>
                          </div>
                        </div>
                    </Appear>
                  </div>
                  <div className={"ssr-variant"}>
                    <Appear id="1mevtjy" className={"todd-about__rich-text-container-11"} style={{"opacity": "0.001", "transform": "none"}}>
                        <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__responsive-row"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                          <div className={"todd-about__rich-text-container-24"}>
                            <div className={"todd-about__rich-text-container-22"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                {content.awards[3]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-3-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"todd-about__rich-text-container-17"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                            <div className={"todd-about__rich-text-container-13"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                {content.awards[3]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-3-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"todd-about__rich-text-container-23"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                          </div>
                          <div className={"todd-about__rich-text-container-6"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                              <AnimatedSpan y={10}>{content.awards[3]?.year ?? ""}</AnimatedSpan>
                            </p>
                          </div>
                        </div>
                    </Appear>
                  </div>
                </div>
              </AboutWrapperReveal>
            </div>
          </AboutBlockReveal>
  );
}
