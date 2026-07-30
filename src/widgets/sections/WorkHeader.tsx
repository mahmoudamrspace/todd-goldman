"use client";

import { HiddenReveal } from "@/features/HiddenReveal";
import type { IntroContent } from "@/content/section-types";
import { NavHamburger } from "@/entities/NavHamburger";
import { navFramerName, navShellClass } from "@/shared/lib/nav-variants";
import { useNavMenu } from "@/features/nav-menu/NavMenuContext";

export function WorkHeader({ content }: { content: IntroContent }) {
  const { open, toggle } = useNavMenu();
  return (
    <>
      <div className={"ssr-variant hidden-qk48ah"}>
        <div className={"framer-miowvv-container"}>
          <div className={"ssr-variant hidden-14eie82"}>
            <nav className={navShellClass("framer-Lbjyv framer-1nlcti1 framer-v-7daz3r", "desktop", open)} data-framer-name={navFramerName("desktop", open)} data-nav-open={open ? "true" : "false"} style={{"backgroundColor": "rgba(0, 0, 0, 0)", "height": "100%", "width": "100%", "willChange": "transform", "opacity": "1", "transform": "none"}}>
              <div className={"framer-1qmc12j"} data-framer-name={"Header"}>
                <div className={"framer-1y7e82e-container"}>
                  <a className={"framer-sWWae framer-w791f1 framer-v-w791f1 framer-1qd01wr"} data-framer-name={"Desktop"} data-highlight={true} href={"../"} tabIndex={0} style={{"opacity": "1"}}>
                    <div className={"framer-2f5fbf"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--variable-reference-F_WTFf8Qd-oKXSe7xX5)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-F_WTFf8Qd-oKXSe7xX5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "transform": "none"}}>
                      <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMA==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "22px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.3em", "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-F_WTFf8Qd-oKXSe7xX5))"}}>
                        {content.artistName}
                      </p>
                    </div>
                  </a>
                </div>
                <div className={"framer-93f2pg-container"}>                </div>
                <div className={"framer-109mq70-container"}>
                  <NavHamburger open={open} onToggle={toggle} style={{"backgroundColor": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "height": "100%", "width": "100%"}} />
                </div>
              </div>
              <div className={"framer-ijjr0j"} data-framer-name={"Content"}>
                <HiddenReveal className={"framer-76vnp9"} data-framer-name={"Contact & Follow"} style={{"willChange": "transform", "opacity": "0", "transform": "translateX(20px)"}}>
                  <div className={"framer-1y56zkb"} data-framer-name={"Follow"}>
                    <div className={"framer-vjwl3u"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                      <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "SW50ZXItQm9sZA==", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.3em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))"}}>
                        Follow
                      </p>
                    </div>
                    <div className={"framer-1t9rs56"} data-framer-name={"Nav Wrapper"}>
                      <div className={"framer-9a6gc3-container"}>
                        <a className={"framer-3o9hP framer-crnkmg framer-v-crnkmg framer-15q3n4m"} data-framer-name={"Desktop"} href={content.social[0]?.href ?? "#"} target={"_blank"} rel={"noopener"} style={{"opacity": "1"}}>
                          <div className={"framer-1y91x5d"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-N1lPvL2DK-fK6GBdN0M": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "SW50ZXItTWVkaXVt", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.3em", "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))"}}>
                              {content.social[0]?.label ?? "Instagram"}
                            </p>
                          </div>
                        </a>
                      </div>
                      <div className={"framer-5ix952-container"}>
                        <a className={"framer-3o9hP framer-crnkmg framer-v-crnkmg framer-15q3n4m"} data-framer-name={"Desktop"} href={content.social[1]?.href ?? "#"} target={"_blank"} rel={"noopener"} style={{"opacity": "1"}}>
                          <div className={"framer-1y91x5d"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-N1lPvL2DK-fK6GBdN0M": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "SW50ZXItTWVkaXVt", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.3em", "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))"}}>
                              {content.social[1]?.label ?? "Linkedin"}
                            </p>
                          </div>
                        </a>
                      </div>
                      <div className={"framer-1ssj3ba-container"}>
                        <a className={"framer-3o9hP framer-crnkmg framer-v-crnkmg framer-15q3n4m"} data-framer-name={"Desktop"} href={content.social[2]?.href ?? "#"} target={"_blank"} rel={"noopener"} style={{"opacity": "1"}}>
                          <div className={"framer-1y91x5d"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-N1lPvL2DK-fK6GBdN0M": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "SW50ZXItTWVkaXVt", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.3em", "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))"}}>
                              {content.social[2]?.label ?? "Behance"}
                            </p>
                          </div>
                        </a>
                      </div>
                    </div>
                  </div>
                </HiddenReveal>
                <div className={"framer-bnx3m7-container"} data-framer-name={"Menu Items"}>
                  <div className={"framer-WwdNp framer-1gc058m framer-v-1gc058m"} data-framer-name={"Default"} data-highlight={true} tabIndex={0} style={{"--1o1r33v": "16px", "--frfhbi": "center"}}>
                    <HiddenReveal className={"framer-p33yb2 framer-rqn908"} data-framer-name={content.nav[0]?.label ?? "Works"} data-highlight={true} href={`../${(content.nav[0]?.href ?? "/#works").slice(1)}`} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(20px)"}}>
                      <div className={"framer-1gfizoq"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                        <div dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMA==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "90px", "--framer-font-weight": "300", "--framer-letter-spacing": "-0.03em", "--framer-line-height": "1.1em", "--framer-text-color": "var(--extracted-tcooor, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                          {content.nav[0]?.label ?? "Works"}
                        </div>
                      </div>
                    </HiddenReveal>
                    <HiddenReveal className={"framer-2bu14n framer-rqn908"} data-framer-name={content.nav[1]?.label ?? "About"} data-highlight={true} href={`../${(content.nav[1]?.href ?? "/#about").slice(1)}`} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(20px)"}}>
                      <div className={"framer-170psbw"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                        <div dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMA==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "90px", "--framer-font-weight": "300", "--framer-letter-spacing": "-0.03em", "--framer-line-height": "1.1em", "--framer-text-color": "var(--extracted-tcooor, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                          {content.nav[1]?.label ?? "About"}
                        </div>
                      </div>
                    </HiddenReveal>
                    <HiddenReveal className={"framer-18y0jlw framer-rqn908"} data-framer-name={content.nav[2]?.label ?? "Contact"} data-highlight={true} href={`../${(content.nav[2]?.href ?? "/#contact").slice(1)}`} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(20px)"}}>
                      <div className={"framer-15tz0mu"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                        <div dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMA==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "90px", "--framer-font-weight": "300", "--framer-letter-spacing": "-0.03em", "--framer-line-height": "1.1em", "--framer-text-color": "var(--extracted-tcooor, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                          {content.nav[2]?.label ?? "Contact"}
                        </div>
                      </div>
                    </HiddenReveal>
                  </div>
                </div>
                <div className={"framer-14nq1fn"} data-framer-name={"Contact"}>
                  <div className={"framer-1sl0i4i"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "SW50ZXItQm9sZA==", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.3em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137)))"}}>
                      Contact
                    </p>
                  </div>
                  <div className={"framer-11zn8yr"} data-framer-name={"Nav Wrapper"}>
                    <div className={"framer-1qlha6s-container"}>
                      <a className={"framer-3o9hP framer-crnkmg framer-v-crnkmg framer-15q3n4m"} data-framer-name={"Desktop"} href={`mailto:${content.email}`} target={"_blank"} rel={"noopener"} style={{"opacity": "1"}}>
                        <div className={"framer-1y91x5d"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-N1lPvL2DK-fK6GBdN0M": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "SW50ZXItTWVkaXVt", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.3em", "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))"}}>
                            {content.email}
                          </p>
                        </div>
                      </a>
                    </div>
                    <div className={"framer-78jdyh-container"}>
                      <a className={"framer-3o9hP framer-crnkmg framer-v-crnkmg framer-15q3n4m"} data-framer-name={"Desktop"} href={`tel:${content.phone.replace(/\s/g, "")}`} target={"_blank"} rel={"noopener"} style={{"opacity": "1"}}>
                        <div className={"framer-1y91x5d"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--variable-reference-N1lPvL2DK-fK6GBdN0M)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-N1lPvL2DK-fK6GBdN0M": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                          <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "SW50ZXItTWVkaXVt", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.3em", "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-N1lPvL2DK-fK6GBdN0M))"}}>
                            {content.phone}
                          </p>
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className={"ssr-variant hidden-16i3gsx"}>
            <nav className={navShellClass("framer-Lbjyv framer-1nlcti1 framer-v-ns08x6", "tablet", open)} data-framer-name={navFramerName("tablet", open)} data-nav-open={open ? "true" : "false"} style={{"backgroundColor": "rgba(247, 247, 237, 0)", "height": "100%", "width": "100%", "willChange": "transform", "opacity": "1", "transform": "none"}}>
              <div className={"framer-1qmc12j"} data-framer-name={"Header"}>
                <div className={"framer-1y7e82e-container"}>
                  <a className={"framer-sWWae framer-w791f1 framer-v-w791f1 framer-1qd01wr"} data-framer-name={"Desktop"} data-highlight={true} href={"../"} tabIndex={0} style={{"opacity": "1"}}>
                    <div className={"framer-2f5fbf"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--variable-reference-F_WTFf8Qd-oKXSe7xX5)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-F_WTFf8Qd-oKXSe7xX5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "transform": "none"}}>
                      <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMA==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "22px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.3em", "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-F_WTFf8Qd-oKXSe7xX5))"}}>
                        {content.artistName}
                      </p>
                    </div>
                  </a>
                </div>
                <div className={"framer-93f2pg-container"}>                </div>
                <div className={"framer-109mq70-container"}>
                  <NavHamburger open={open} onToggle={toggle} style={{"backgroundColor": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "height": "100%", "width": "100%"}} />
                </div>
              </div>
            </nav>
          </div>
        </div>
      </div>
      <div className={"ssr-variant hidden-16i3gsx hidden-14eie82"}>
        <div className={"framer-miowvv-container"}>
          <nav className={navShellClass("framer-Lbjyv framer-1nlcti1 framer-v-aigtuw", "phone", open)} data-framer-name={navFramerName("phone", open)} data-nav-open={open ? "true" : "false"} style={{"backgroundColor": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "height": "100%", "width": "100%", "willChange": "transform", "opacity": "1", "transform": "none"}}>
            <div className={"framer-1qmc12j"} data-framer-name={"Header"}>
              <div className={"framer-1y7e82e-container"}>
                <a className={"framer-sWWae framer-w791f1 framer-v-w791f1 framer-1qd01wr"} data-framer-name={"Desktop"} data-highlight={true} href={"../"} tabIndex={0} style={{"opacity": "1"}}>
                  <div className={"framer-2f5fbf"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--variable-reference-F_WTFf8Qd-oKXSe7xX5)", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--variable-reference-F_WTFf8Qd-oKXSe7xX5": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "transform": "none"}}>
                    <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMA==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "22px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.3em", "--framer-text-color": "var(--extracted-r6o4lv, var(--variable-reference-F_WTFf8Qd-oKXSe7xX5))"}}>
                      {content.artistName}
                    </p>
                  </div>
                </a>
              </div>
              <div className={"framer-93f2pg-container"}>              </div>
              <div className={"framer-109mq70-container"}>
                <NavHamburger open={open} onToggle={toggle} style={{"backgroundColor": "rgba(15, 15, 15, 0)", "height": "100%", "width": "100%"}} />
              </div>
            </div>
            <div className={"framer-ijjr0j"} data-framer-name={"Content"}>
              <div className={"framer-bnx3m7-container"} data-framer-name={"Menu Items"}>
                <div className={"framer-WwdNp framer-1gc058m framer-v-1gc058m"} data-framer-name={"Default"} data-highlight={true} tabIndex={0} style={{"--1o1r33v": "16px", "--frfhbi": "center"}}>
                  <HiddenReveal className={"framer-p33yb2 framer-rqn908"} data-framer-name={content.nav[0]?.label ?? "Works"} data-highlight={true} href={`../${(content.nav[0]?.href ?? "/#works").slice(1)}`} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(20px)"}}>
                    <div className={"framer-1gfizoq"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <div dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMA==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "90px", "--framer-font-weight": "300", "--framer-letter-spacing": "-0.03em", "--framer-line-height": "1.1em", "--framer-text-color": "var(--extracted-tcooor, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.nav[0]?.label ?? "Works"}
                      </div>
                    </div>
                  </HiddenReveal>
                  <HiddenReveal className={"framer-2bu14n framer-rqn908"} data-framer-name={content.nav[1]?.label ?? "About"} data-highlight={true} href={`../${(content.nav[1]?.href ?? "/#about").slice(1)}`} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(20px)"}}>
                    <div className={"framer-170psbw"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <div dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMA==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "90px", "--framer-font-weight": "300", "--framer-letter-spacing": "-0.03em", "--framer-line-height": "1.1em", "--framer-text-color": "var(--extracted-tcooor, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.nav[1]?.label ?? "About"}
                      </div>
                    </div>
                  </HiddenReveal>
                  <HiddenReveal className={"framer-18y0jlw framer-rqn908"} data-framer-name={content.nav[2]?.label ?? "Contact"} data-highlight={true} href={`../${(content.nav[2]?.href ?? "/#contact").slice(1)}`} style={{"willChange": "transform", "opacity": "0", "transform": "translateY(20px)"}}>
                    <div className={"framer-15tz0mu"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-tcooor": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                      <div dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMA==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "90px", "--framer-font-weight": "300", "--framer-letter-spacing": "-0.03em", "--framer-line-height": "1.1em", "--framer-text-color": "var(--extracted-tcooor, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                        {content.nav[2]?.label ?? "Contact"}
                      </div>
                    </div>
                  </HiddenReveal>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </>
  );
}
