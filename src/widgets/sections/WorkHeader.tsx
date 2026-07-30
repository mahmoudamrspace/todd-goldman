"use client";

import type { IntroContent } from "@/content/section-types";
import { NavHamburger } from "@/entities/NavHamburger";
import { NavOverlayContent } from "@/features/NavOverlayContent";
import { NavPhoneMenuContent } from "@/features/NavPhoneMenuContent";
import { navFramerName, navShellClass, navShellStyle } from "@/shared/lib/nav-variants";
import { useNavMenu } from "@/features/nav-menu/NavMenuContext";

export function WorkHeader({ content }: { content: IntroContent }) {
  const { open, toggle } = useNavMenu();
  return (
    <>
      <div className={"ssr-variant hidden-qk48ah"}>
        <div className={"framer-miowvv-container"}>
          <div className={"ssr-variant hidden-14eie82"}>
            <nav className={navShellClass("framer-Lbjyv framer-1nlcti1 framer-v-7daz3r", "desktop", open)} data-framer-name={navFramerName("desktop", open)} data-nav-open={open ? "true" : "false"} style={navShellStyle(open, "rgba(0, 0, 0, 0)")}>
              <div className={"framer-1qmc12j"} data-framer-name={"Header"}>
                <div className={"framer-1y7e82e-container"}>
                  <a className={"framer-sWWae framer-w791f1 framer-v-w791f1 framer-1qd01wr"} data-framer-name={"Desktop"} data-highlight={true} href="/" tabIndex={0} style={{"opacity": "1"}}>
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
              <NavOverlayContent content={content} open={open} />
            </nav>
          </div>
          <div className={"ssr-variant hidden-16i3gsx"}>
            <nav className={navShellClass("framer-Lbjyv framer-1nlcti1 framer-v-ns08x6", "tablet", open)} data-framer-name={navFramerName("tablet", open)} data-nav-open={open ? "true" : "false"} style={navShellStyle(open, "rgba(247, 247, 237, 0)")}>
              <div className={"framer-1qmc12j"} data-framer-name={"Header"}>
                <div className={"framer-1y7e82e-container"}>
                  <a className={"framer-sWWae framer-w791f1 framer-v-w791f1 framer-1qd01wr"} data-framer-name={"Desktop"} data-highlight={true} href="/" tabIndex={0} style={{"opacity": "1"}}>
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
              <NavOverlayContent content={content} open={open} />
            </nav>
          </div>
        </div>
      </div>
      <div className={"ssr-variant hidden-16i3gsx hidden-14eie82"}>
        <div className={"framer-miowvv-container"}>
          <nav className={navShellClass("framer-Lbjyv framer-1nlcti1 framer-v-aigtuw", "phone", open)} data-framer-name={navFramerName("phone", open)} data-nav-open={open ? "true" : "false"} style={navShellStyle(open, "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))")}>
            <div className={"framer-1qmc12j"} data-framer-name={"Header"}>
              <div className={"framer-1y7e82e-container"}>
                <a className={"framer-sWWae framer-w791f1 framer-v-w791f1 framer-1qd01wr"} data-framer-name={"Desktop"} data-highlight={true} href="/" tabIndex={0} style={{"opacity": "1"}}>
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
            <NavPhoneMenuContent content={content} open={open} />
          </nav>
        </div>
      </div>
    </>
  );
}
