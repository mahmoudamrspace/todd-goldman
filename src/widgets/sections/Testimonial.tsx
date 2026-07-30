"use client";

import { useRef } from "react";
import { HiddenReveal } from "@/features/HiddenReveal";
import { TestimonialCardReveal, TestimonialScrollProvider } from "@/features/StickySection";
import type { TestimonialContent } from "@/content/section-types";

function toneName(tone: "white" | "blue" | "green" | undefined) {
  switch (tone) {
    case "blue":
      return "Blue";
    case "green":
      return "Green";
    default:
      return "White";
  }
}

function toneClass(tone: "white" | "blue" | "green" | undefined) {
  switch (tone) {
    case "blue":
      return "framer-mxbDt framer-UENfp framer-1by6t1 framer-v-1iesd0j";
    case "green":
      return "framer-mxbDt framer-UENfp framer-1by6t1 framer-v-1wv5hh2";
    default:
      return "framer-mxbDt framer-UENfp framer-1by6t1 framer-v-1by6t1";
  }
}

function TestimonialTitle({ words }: { words: readonly string[] }) {
  return (
    <>
      {words[0]}
      <span style={{"--font-selector": "SW50ZXItQm9sZA==", "--framer-font-family": "\"Inter\", \"Inter Placeholder\", sans-serif"}} className={"framer-text"}>                    </span>
      <span style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMGl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-style": "italic", "--framer-font-weight": "300"}} className={"framer-text"}>
        {words[1]}
      </span>
      <span style={{"--font-selector": "SW50ZXItQm9sZA==", "--framer-font-family": "\"Inter\", \"Inter Placeholder\", sans-serif"}} className={"framer-text"}>                    </span>
      {words[2]}
    </>
  );
}

export function Testimonial({ content }: { content: TestimonialContent }) {
  const sectionRef = useRef<HTMLElement>(null);

  return (
    <TestimonialScrollProvider targetRef={sectionRef}>
      <section
        ref={sectionRef}
        className={"framer-1dlgf8z"}
        data-framer-name={"Testimonial"}
        id={"testimonial-section"}
      >
      <div className={"framer-238cdp"} data-framer-name={"Container"}>
        <div className={"framer-1bkzeql"} data-framer-name={"Sticky Item"}>
          <HiddenReveal variant={"testimonial-title"} className={"framer-omuc15"} data-framer-name={"Title"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
            <HiddenReveal variant={"testimonial-image"} className={"framer-1l7dmyb"} data-framer-name={"Image svg"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(170px)"}}>
              <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
                <div data-framer-component-type={"SVG"} data-framer-name={"Men"} data-framer-shadows className={"framer-cb1aqr"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-59833478_2778"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <div data-framer-component-type={"SVG"} data-framer-name={"Men"} data-framer-shadows className={"framer-cb1aqr"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1970339206_2864"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
                <div data-framer-component-type={"SVG"} data-framer-name={"Men"} data-framer-shadows className={"framer-cb1aqr"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg269641803_3015"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
                <div data-framer-component-type={"SVG"} data-framer-name={"Women svg"} data-framer-shadows className={"framer-1b8ib2c"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1725171633_3475"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <div data-framer-component-type={"SVG"} data-framer-name={"Women svg"} data-framer-shadows className={"framer-1b8ib2c"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg715276639_3470"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
                <div data-framer-component-type={"SVG"} data-framer-name={"Women svg"} data-framer-shadows className={"framer-1b8ib2c"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg1716952079_3688"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
            </HiddenReveal>
            <div className={"framer-vx2vf4"} data-framer-name={"Title Text"} style={{"willChange": "transform", "opacity": "1", "transform": "none"}}>
              <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
                <div className={"framer-14ig1wu"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                  <h2 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "72px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.03em", "--framer-line-height": "1em", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))"}} className={"framer-text"}>
                    <TestimonialTitle words={content.titleWords} />
                  </h2>
                </div>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <div className={"framer-14ig1wu"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                  <h2 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "36px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.03em", "--framer-line-height": "1em", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                    <TestimonialTitle words={content.titleWords} />
                  </h2>
                </div>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
                <div className={"framer-14ig1wu"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                  <h2 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "57px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.03em", "--framer-line-height": "1em", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))"}} className={"framer-text"}>
                    <TestimonialTitle words={content.titleWords} />
                  </h2>
                </div>
              </div>
            </div>
          </HiddenReveal>
          <div className={"framer-1of63no"} data-framer-name={"List"} id={"list"}>
            <div className={"framer-y8llkh"} data-framer-name={"Item 01"}>
              <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
                <TestimonialCardReveal index={0} className={"framer-gchszw-container"} data-framer-name={"Testimonial item"} style={{"willChange": "transform", "opacity": "0", "transform": "translateX(-20px) translateY(30px)"}}>
                  <div className={toneClass(content.items[0]?.tone)} data-border={true} data-framer-name={toneName(content.items[0]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[0]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[0]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-Fjt7A framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#1626674713"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[0]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </TestimonialCardReveal>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <HiddenReveal className={"framer-gchszw-container"} data-framer-name={"Testimonial item"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[0]?.tone)} data-border={true} data-framer-name={toneName(content.items[0]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[0]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[0]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-Fjt7A framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#1626674713"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[0]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
                <HiddenReveal className={"framer-gchszw-container"} data-framer-name={"Testimonial item"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[0]?.tone)} data-border={true} data-framer-name={toneName(content.items[0]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[0]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[0]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-Fjt7A framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#1626674713"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[0]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
            </div>
            <div className={"framer-wqj7jz"} data-framer-name={"Item 02"}>
              <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
                <TestimonialCardReveal index={1} className={"framer-uogkai-container"} data-framer-name={"Testimonial item"} style={{"willChange": "transform", "opacity": "0", "transform": "translateX(20px) translateY(30px)"}}>
                  <div className={toneClass(content.items[1]?.tone)} data-border={true} data-framer-name={toneName(content.items[1]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[1]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[1]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-RaAOo framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#2987541301"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[1]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </TestimonialCardReveal>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <HiddenReveal className={"framer-uogkai-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[1]?.tone)} data-border={true} data-framer-name={toneName(content.items[1]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[1]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[1]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-RaAOo framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#2987541301"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[1]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
                <HiddenReveal className={"framer-uogkai-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[1]?.tone)} data-border={true} data-framer-name={toneName(content.items[1]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[1]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[1]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-RaAOo framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#2987541301"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[1]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
            </div>
            <div className={"framer-5prhlu"} data-framer-name={"Item 03"}>
              <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
                <TestimonialCardReveal index={2} className={"framer-fti0o9-container"} data-framer-name={"Testimonial item"} style={{"willChange": "transform", "opacity": "0", "transform": "translateX(-10px) translateY(30px)"}}>
                  <div className={toneClass(content.items[2]?.tone)} data-border={true} data-framer-name={toneName(content.items[2]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-e121225e-2e7b-4700-bf1a-4d920b45099e, rgb(41, 120, 243))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "inherit"}}>
                            {content.items[2]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[2]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-WJkwl framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#2452161336"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"} style={{"--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.items[2]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </TestimonialCardReveal>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <HiddenReveal className={"framer-fti0o9-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[2]?.tone)} data-border={true} data-framer-name={toneName(content.items[2]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-e121225e-2e7b-4700-bf1a-4d920b45099e, rgb(41, 120, 243))", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "inherit"}}>
                            {content.items[2]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[2]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-WJkwl framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#2452161336"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"} style={{"--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.items[2]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
                <HiddenReveal className={"framer-fti0o9-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[2]?.tone)} data-border={true} data-framer-name={toneName(content.items[2]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-e121225e-2e7b-4700-bf1a-4d920b45099e, rgb(41, 120, 243))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "inherit"}}>
                            {content.items[2]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[2]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-WJkwl framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#2452161336"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"} style={{"--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.items[2]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
            </div>
            <div className={"framer-yg6igt"} data-framer-name={"Item 04"}>
              <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
                <TestimonialCardReveal index={3} className={"framer-1l3xeqf-container"} data-framer-name={"Testimonial item"} style={{"willChange": "transform", "opacity": "0", "transform": "translateX(10px) translateY(30px)"}}>
                  <div className={toneClass(content.items[3]?.tone)} data-border={true} data-framer-name={toneName(content.items[3]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[3]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[3]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-U1lUw framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#4165719400"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[3]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </TestimonialCardReveal>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <HiddenReveal className={"framer-1l3xeqf-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[3]?.tone)} data-border={true} data-framer-name={toneName(content.items[3]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[3]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[3]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-U1lUw framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#4165719400"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[3]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
                <HiddenReveal className={"framer-1l3xeqf-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[3]?.tone)} data-border={true} data-framer-name={toneName(content.items[3]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[3]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[3]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-U1lUw framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#4165719400"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[3]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
            </div>
            <div className={"framer-vbpym2"} data-framer-name={"Item 05"}>
              <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
                <TestimonialCardReveal index={4} className={"framer-1mby0l5-container"} data-framer-name={"Testimonial item"} style={{"willChange": "transform", "opacity": "0", "transform": "translateX(10px) translateY(30px)"}}>
                  <div className={toneClass(content.items[4]?.tone)} data-border={true} data-framer-name={toneName(content.items[4]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[4]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[4]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-QmNmv framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#2242602017"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[4]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </TestimonialCardReveal>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <HiddenReveal className={"framer-1mby0l5-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[4]?.tone)} data-border={true} data-framer-name={toneName(content.items[4]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[4]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[4]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-QmNmv framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#2242602017"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[4]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
                <HiddenReveal className={"framer-1mby0l5-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[4]?.tone)} data-border={true} data-framer-name={toneName(content.items[4]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[4]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[4]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-QmNmv framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#2242602017"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[4]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
            </div>
            <div className={"framer-1eqt8gd"} data-framer-name={"Item 06"}>
              <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
                <TestimonialCardReveal index={5} className={"framer-ua359l-container"} data-framer-name={"Testimonial item"} style={{"willChange": "transform", "opacity": "0", "transform": "translateX(10px) translateY(30px)"}}>
                  <div className={toneClass(content.items[5]?.tone)} data-border={true} data-framer-name={toneName(content.items[5]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-c78c7606-64f6-4152-8bdf-473d5e8ef6ef, rgb(14, 156, 108))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "inherit"}}>
                            {content.items[5]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[5]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-D9FMH framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#3796020501"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"} style={{"--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.items[5]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </TestimonialCardReveal>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <HiddenReveal className={"framer-ua359l-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[5]?.tone)} data-border={true} data-framer-name={toneName(content.items[5]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-c78c7606-64f6-4152-8bdf-473d5e8ef6ef, rgb(14, 156, 108))", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "inherit"}}>
                            {content.items[5]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[5]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-D9FMH framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#3796020501"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"} style={{"--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.items[5]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
                <HiddenReveal className={"framer-ua359l-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[5]?.tone)} data-border={true} data-framer-name={toneName(content.items[5]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-c78c7606-64f6-4152-8bdf-473d5e8ef6ef, rgb(14, 156, 108))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "inherit"}}>
                            {content.items[5]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[5]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-D9FMH framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#3796020501"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"} style={{"--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.items[5]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
            </div>
            <div className={"framer-vkpzr5"} data-framer-name={"Item 07"}>
              <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
                <TestimonialCardReveal index={6} className={"framer-5wtrud-container"} data-framer-name={"Testimonial item"} style={{"willChange": "transform", "opacity": "0", "transform": "translateX(20px) translateY(30px)"}}>
                  <div className={toneClass(content.items[6]?.tone)} data-border={true} data-framer-name={toneName(content.items[6]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-e121225e-2e7b-4700-bf1a-4d920b45099e, rgb(41, 120, 243))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "inherit"}}>
                            {content.items[6]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[6]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-3TNPs framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#3078546776"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"} style={{"--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.items[6]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </TestimonialCardReveal>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <HiddenReveal className={"framer-5wtrud-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[6]?.tone)} data-border={true} data-framer-name={toneName(content.items[6]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-e121225e-2e7b-4700-bf1a-4d920b45099e, rgb(41, 120, 243))", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "inherit"}}>
                            {content.items[6]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[6]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-3TNPs framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#3078546776"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"} style={{"--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.items[6]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
                <HiddenReveal className={"framer-5wtrud-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[6]?.tone)} data-border={true} data-framer-name={toneName(content.items[6]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-e121225e-2e7b-4700-bf1a-4d920b45099e, rgb(41, 120, 243))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "inherit"}}>
                            {content.items[6]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[6]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-3TNPs framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#3078546776"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-r6o4lv": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"} style={{"--framer-text-color": "var(--extracted-r6o4lv, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.items[6]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
            </div>
            <div className={"framer-15337s5"} data-framer-name={"Item 08"}>
              <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
                <TestimonialCardReveal index={7} className={"framer-5hcp6w-container"} data-framer-name={"Testimonial item"} style={{"willChange": "transform", "opacity": "0", "transform": "translateX(10px) translateY(30px)"}}>
                  <div className={toneClass(content.items[7]?.tone)} data-border={true} data-framer-name={toneName(content.items[7]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[7]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[7]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-Fjt7A framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#1626674713"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[7]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </TestimonialCardReveal>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <HiddenReveal className={"framer-5hcp6w-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[7]?.tone)} data-border={true} data-framer-name={toneName(content.items[7]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[7]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[7]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-Fjt7A framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#1626674713"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[7]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
              <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
                <HiddenReveal className={"framer-5hcp6w-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(30px)"}}>
                  <div className={toneClass(content.items[7]?.tone)} data-border={true} data-framer-name={toneName(content.items[7]?.tone)} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))", "--border-left-width": "1px", "--border-right-width": "1px", "--border-style": "dashed", "--border-top-width": "1px", "backgroundColor": "var(--token-62bdbc74-303f-4923-9310-c14cddd10766, rgb(255, 255, 255))", "maxWidth": "100%", "width": "100%", "borderBottomLeftRadius": "16px", "borderBottomRightRadius": "16px", "borderTopLeftRadius": "16px", "borderTopRightRadius": "16px"}}>
                    <div className={"framer-ouh49u"} data-framer-name={"Top"}>
                      <div className={"framer-1mdcqwk"} data-framer-name={"Name"}>
                        <div className={"framer-p3pcx6"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-1of0zx5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <h2 dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "24px", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-1of0zx5, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                            {content.items[7]?.author ?? ""}
                          </h2>
                        </div>
                        <div className={"framer-t3jff2"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "14px", "--framer-font-style": "italic", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))", "--framer-text-transform": "lowercase"}}>
                            {content.items[7]?.role ?? ""}
                          </p>
                        </div>
                      </div>
                      <div className={"framer-30s6rf"} data-framer-name={"Avatar"}>
                        <svg className={"framer-Fjt7A framer-16ldkq7"} role={"presentation"} viewBox={"0 0 515 497"} style={{"transform": "translateX(-50%)"}}>
                          <use href={"#1626674713"}>                          </use>
                        </svg>
                      </div>
                    </div>
                    <div className={"framer-1rv0nxo"} data-framer-component-type={"RichTextContainer"} style={{"--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p className={"framer-text framer-styles-preset-gg9u5z"} data-styles-preset={"Y5DlTiI5k"} dir={"auto"}>
                        {content.items[7]?.quote ?? ""}
                      </p>
                    </div>
                  </div>
                </HiddenReveal>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </TestimonialScrollProvider>
  );
}