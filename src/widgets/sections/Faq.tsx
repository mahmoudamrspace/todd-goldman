"use client";

import type { FaqContent } from "@/content/section-types";
import { FaqAccordionItem } from "@/entities/FaqAccordionItem";
import { Appear } from "@/features/Appear";
import { HiddenReveal } from "@/features/HiddenReveal";

const FAQ_ITEM_STYLE = {
  "--border-bottom-width": "3px",
  "--border-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
  "--border-left-width": "0px",
  "--border-right-width": "0px",
  "--border-style": "solid",
  "--border-top-width": "0px",
  width: "100%",
} as const;

export function Faq({
  content,
  openIndex,
  onToggle,
}: {
  content: FaqContent;
  openIndex: number | null;
  onToggle: (index: number) => void;
}) {
  return (
    <section className={"framer-1m3xm2"} data-framer-name={"FAQ"}>
      <div className={"framer-17cr5sv"} data-framer-name={"Container"}>
        <HiddenReveal as="section" className={"framer-1n2vxeh"} data-framer-name={"Wrapper"} id={"faq"} style={{"willChange": "transform", "opacity": "0", "transform": "perspective(1200px)"}}>
          <HiddenReveal className={"framer-w1sxyq"} data-framer-name={"Title"} style={{"willChange": "transform", "opacity": "0", "transform": "perspective(1200px)"}}>
            <div className={"framer-k8tr2o"} data-framer-name={"Title Wrap"}>
              <HiddenReveal className={"framer-1mwivdf"} data-framer-component-type={"RichTextContainer"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                <h2 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "36px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.03em", "--framer-line-height": "1.1em", "--framer-text-alignment": "center", "--framer-text-color": "rgb(251, 251, 251)"}} className={"framer-text"}>
                  {content.title}
                </h2>
              </HiddenReveal>
              <HiddenReveal className={"framer-f23omh"} data-framer-component-type={"RichTextContainer"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                <h2 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LVNlbWlCb2xk", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "36px", "--framer-font-weight": "600", "--framer-letter-spacing": "-0.03em", "--framer-line-height": "1.1em", "--framer-text-alignment": "center", "--framer-text-color": "rgb(251, 251, 251)"}} className={"framer-text"}>
                  {content.subtitleLead}
                  <span style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-style": "italic", "--framer-font-weight": "400"}} className={"framer-text"}>
                    {content.subtitleEmphasis}
                  </span>
                  {content.subtitleTail}
                </h2>
              </HiddenReveal>
            </div>
          </HiddenReveal>
          <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
            <HiddenReveal className={"framer-varopb-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(16px)"}}>
              <div className={"framer-loUAi framer-e63r1r framer-v-e63r1r"} data-framer-name={"Desktop"} style={{"width": "100%"}}>
                <div className={"framer-1mjuta7-container"}>
                  <div>                  </div>
                </div>
                <div className={"framer-1w0sef0"}>
                  <HiddenReveal className={"framer-niny6j-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={0} openIndex={openIndex} onToggle={onToggle} question={content.items[0]?.question ?? ""} answer={content.items[0]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                  <HiddenReveal className={"framer-4kx773-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={1} openIndex={openIndex} onToggle={onToggle} question={content.items[1]?.question ?? ""} answer={content.items[1]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                  <HiddenReveal className={"framer-1r1gpww-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={2} openIndex={openIndex} onToggle={onToggle} question={content.items[2]?.question ?? ""} answer={content.items[2]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                </div>
                <div className={"framer-13jsqtp"}>
                  <HiddenReveal className={"framer-1i62d2t-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={3} openIndex={openIndex} onToggle={onToggle} question={content.items[3]?.question ?? ""} answer={content.items[3]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                  <HiddenReveal className={"framer-11ydias-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={4} openIndex={openIndex} onToggle={onToggle} question={content.items[4]?.question ?? ""} answer={content.items[4]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                  <HiddenReveal className={"framer-gj8o2o-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={5} openIndex={openIndex} onToggle={onToggle} question={content.items[5]?.question ?? ""} answer={content.items[5]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                </div>
              </div>
            </HiddenReveal>
          </div>
          <div className={"ssr-variant hidden-72rtr7"}>
            <HiddenReveal className={"framer-varopb-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(16px)"}}>
              <div className={"framer-loUAi framer-e63r1r framer-v-1qothfe"} data-framer-name={"Mobile"} style={{"width": "100%"}}>
                <div className={"framer-1mjuta7-container"}>
                  <div>                  </div>
                </div>
                <div className={"framer-1w0sef0"}>
                  <HiddenReveal className={"framer-niny6j-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={0} openIndex={openIndex} onToggle={onToggle} question={content.items[0]?.question ?? ""} answer={content.items[0]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                  <HiddenReveal className={"framer-4kx773-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={1} openIndex={openIndex} onToggle={onToggle} question={content.items[1]?.question ?? ""} answer={content.items[1]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                  <HiddenReveal className={"framer-1r1gpww-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={2} openIndex={openIndex} onToggle={onToggle} question={content.items[2]?.question ?? ""} answer={content.items[2]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                </div>
                <div className={"framer-13jsqtp"}>
                  <HiddenReveal className={"framer-1i62d2t-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={3} openIndex={openIndex} onToggle={onToggle} question={content.items[3]?.question ?? ""} answer={content.items[3]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                  <HiddenReveal className={"framer-11ydias-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={4} openIndex={openIndex} onToggle={onToggle} question={content.items[4]?.question ?? ""} answer={content.items[4]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                  <HiddenReveal className={"framer-gj8o2o-container"} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(40px)"}}>
                    <FaqAccordionItem index={5} openIndex={openIndex} onToggle={onToggle} question={content.items[5]?.question ?? ""} answer={content.items[5]?.answer ?? ""} className={"framer-E5ePz framer-195fole framer-v-195fole"} style={FAQ_ITEM_STYLE} />
                  </HiddenReveal>
                </div>
              </div>
            </HiddenReveal>
          </div>
          <Appear id="4t58ou" className={"framer-4t58ou"} data-framer-name={"Icon"} style={{"opacity": "0.001", "transform": "translateY(-20px)"}}>
              <div className={"ssr-variant hidden-g5y12p"}>
                <div data-framer-component-type={"SVG"} data-framer-name={"Icon"} data-framer-shadows className={"framer-1vl6maw"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-1323373682_4208"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <div data-framer-component-type={"SVG"} data-framer-name={"Icon"} data-framer-shadows className={"framer-1vl6maw"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0"}}>
                  <div className={"svgContainer"} style={{"width": "100%", "height": "100%", "aspectRatio": "inherit"}}>
                    <svg style={{"width": "100%", "height": "100%"}}>
                      <use href={"#svg-805843506_4183"}>                      </use>
                    </svg>
                  </div>
                </div>
              </div>
          </Appear>
        </HiddenReveal>
      </div>
    </section>
  );
}
