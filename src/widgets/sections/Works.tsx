"use client";

import { Scribble } from "@/entities/Scribble";
import { AnimatedSpan } from "@/features/HiddenReveal";
import type { WorksContent } from "@/content/section-types";
import { Appear } from "@/features/Appear";

export function Works({
  content,
  activeSlug,
  onHover,
  hoverPreview,
  pointer = { x: 0, y: 0 },
  onTitlePointerMove,
}: {
  content: WorksContent;
  activeSlug: string | null;
  onHover: (slug: string | null) => void;
  hoverPreview: WorksContent["works"][number]["hoverPreview"] | null;
  pointer?: { x: number; y: number };
  onTitlePointerMove?: (event: React.PointerEvent<HTMLElement>) => void;
}) {
  const cardClass = (base: string, slug: string) =>
    activeSlug === slug ? `${base} hover` : base;

  const TEXT_DEFAULT =
    "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))";
  const TEXT_HOVER =
    "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))";
  const ARROW_DEFAULT = "#svg229503084_338";
  const ARROW_HOVER = "#svg-363366112_341";

  const desktopCardVisual = (isHovered: boolean) => ({
    textColor: isHovered ? TEXT_HOVER : TEXT_DEFAULT,
    iconBg: isHovered ? "rgb(255, 83, 36)" : "rgba(0, 0, 0, 0)",
    arrowHref: isHovered ? ARROW_HOVER : ARROW_DEFAULT,
  });

  const previewTransform =
    hoverPreview && (pointer.x || pointer.y)
      ? `translateX(-50%) translate(${pointer.x * 0.04}px, ${pointer.y * 0.04}px)`
      : "translateX(-50%)";
  const previewContainerStyle = hoverPreview
    ? {
        transform: previewTransform,
        transition: "transform 0.4s cubic-bezier(0.73, 0, 0.49, 1)",
      }
    : { transform: "translateX(-50%)" };
  const previewInnerStyle = hoverPreview
    ? { transition: "transform 0.4s cubic-bezier(0.73, 0, 0.49, 1)" }
    : undefined;

  return (
    <section className={"framer-1ezlif8"} data-framer-name={"Works"} id={"works"}>
      <div className={"framer-8kjpn8"} data-framer-name={"Container"}>
        <div className={"framer-pn7fdw"} data-framer-name={"Wrapper"} id={"selected-projects"}>
          <div className={"framer-iwn3rl"} data-framer-name={"Title"} onPointerMove={onTitlePointerMove}>
            <div className={"framer-10e7n8k"} data-framer-component-type={"RichTextContainer"} style={{ transform: "none" }}>
              <h2 className={"framer-text framer-styles-preset-1ir8ahu"} data-styles-preset={"RGebQr53Z"} dir={"auto"}>
                {content.titleWords.map((word, index) => (
                  <AnimatedSpan key={`works-title-${word}-${index}`} y={10}>
                    {word}
                    {index < content.titleWords.length - 1 ? " " : ""}
                  </AnimatedSpan>
                ))}
              </h2>
            </div>
            <div className={"ssr-variant"}>
              <div
                className={
                  hoverPreview
                    ? "framer-1c6c9z4-container"
                    : "framer-1c6c9z4-container hidden-72rtr7 hidden-r4q9g"
                }
                style={previewContainerStyle}
              >
                <div
                  className={hoverPreview ? "framer-qfzAQ framer-1l1pyqw framer-v-q8rx7a" : "framer-qfzAQ framer-1l1pyqw framer-v-1l1pyqw"}
                  data-framer-name={hoverPreview ? "Animate" : "Default"}
                  style={previewInnerStyle}
                >
                  {hoverPreview ? (
                    <div className={"framer-ywle4b-container"}>
                      <div className={"framer-1jy7hxh"}>
                        <img decoding="async" src={hoverPreview.src} alt={hoverPreview.alt} style={{ display: "block", width: "100%", height: "100%", objectFit: "cover", borderRadius: "inherit" }} />
                      </div>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
            <div className={"ssr-variant"}>
              <div className={"framer-jkhuq9-container hidden-g5y12p"} data-framer-name={"Scribble"} style={{ transform: "translateX(-50%)" }}>
                <Scribble variant="type1" />
              </div>
            </div>
          </div>
          <div className={"framer-ye1uxn"} data-framer-name={"Wrapper"}>
            <div className={"framer-1nkl7to"}>
              {content.works.map((work, index) => {
                const { slug, title } = work;
                const isHovered = activeSlug === slug;
                const visual = desktopCardVisual(isHovered);
                return (
                  <a key={slug} className={"framer-118bp0q framer-lux5qc"} href={`/works/${slug}`}>
                    <div className={"framer-1d4q2iy"} data-framer-name={"Wrapper"}>
                      <div className={"ssr-variant hidden-g5y12p"}>
                        <Appear id={`1lpr6le-${index}`} className={"framer-1lpr6le-container"} data-framer-name={"Project Item"}>
                          <div
                            className={cardClass("framer-EPUBE framer-3ctq4c framer-v-3ctq4c", slug)}
                            onMouseEnter={() => onHover(slug)}
                            onMouseLeave={() => onHover(null)}
                            data-framer-name={"Desktop"}
                            data-highlight={true}
                            id={"undefined-3ctq4c"}
                            style={{
                              "--border-bottom-width": "0px",
                              "--border-color": "rgba(0, 0, 0, 0)",
                              "--border-left-width": "0px",
                              "--border-right-width": "0px",
                              "--border-style": "solid",
                              "--border-top-width": "0px",
                              backgroundColor: "rgba(0, 0, 0, 0)",
                              width: "100%",
                              borderBottomLeftRadius: "16px",
                              borderBottomRightRadius: "16px",
                              borderTopLeftRadius: "16px",
                              borderTopRightRadius: "16px",
                            }}
                          >
                            <div className={"framer-18wp4oy"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div className={"framer-1nex91v"} data-framer-name={"Question"}>
                                <div
                                  className={"framer-1uka7jh"}
                                  data-framer-component-type={"RichTextContainer"}
                                  style={{
                                    "--extracted-r6o4lv": visual.textColor,
                                    "--framer-link-text-color": "rgb(0, 153, 255)",
                                    "--framer-link-text-decoration": "underline",
                                    "--framer-paragraph-spacing": "0px",
                                    transform: "none",
                                    transition: "color 0.4s cubic-bezier(0.73, 0, 0.49, 1)",
                                  }}
                                >
                                  <p
                                    dir={"auto"}
                                    className={"framer-text"}
                                    style={{
                                      "--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==",
                                      "--framer-font-family": '"Inter Display", "Inter Display Placeholder", sans-serif',
                                      "--framer-font-size": "24px",
                                      "--framer-font-weight": "500",
                                      "--framer-letter-spacing": "-0.05em",
                                      "--framer-line-height": "1.4em",
                                      "--framer-text-color": visual.textColor,
                                    }}
                                  >
                                    {title}
                                  </p>
                                </div>
                                <div
                                  className={"framer-8ax261"}
                                  data-framer-name={"Icon wrapper"}
                                  style={{
                                    backgroundColor: visual.iconBg,
                                    borderBottomLeftRadius: "1000px",
                                    borderBottomRightRadius: "1000px",
                                    borderTopLeftRadius: "1000px",
                                    borderTopRightRadius: "1000px",
                                    transition: "background-color 0.4s cubic-bezier(0.73, 0, 0.49, 1)",
                                  }}
                                >
                                  <div data-framer-component-type={"SVG"} data-framer-shadows className={"framer-1l72tdx"} aria-hidden={true} style={{ imageRendering: "pixelated", flexShrink: "0" }}>
                                    <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                                      <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
                                        <use href={visual.arrowHref} />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Appear>
                      </div>
                      <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                        <Appear id={`1lpr6le-${index}`} className={"framer-1lpr6le-container"} data-framer-name={"Project Item"} style={{ opacity: "0.001", transform: "none" }}>
                          <div
                            className={cardClass("framer-EPUBE framer-3ctq4c framer-v-sfxk3k", slug)}
                            data-framer-name={"Mobile"}
                            data-highlight={true}
                            id={"undefined-3ctq4c"}
                            data-border={true}
                            style={{
                              "--border-bottom-width": "1px",
                              "--border-color": "var(--token-f87e4d85-ce6d-46de-a48e-194dbec8dfb6, rgb(207, 202, 192))",
                              "--border-left-width": "0px",
                              "--border-right-width": "0px",
                              "--border-style": "dashed",
                              "--border-top-width": "0px",
                              backgroundColor: "rgba(0, 0, 0, 0)",
                              width: "100%",
                              borderBottomLeftRadius: "0px",
                              borderBottomRightRadius: "0px",
                              borderTopLeftRadius: "0px",
                              borderTopRightRadius: "0px",
                            }}
                          >
                            <div className={"framer-18wp4oy"} style={{ borderBottomLeftRadius: "16px", borderBottomRightRadius: "16px", borderTopLeftRadius: "16px", borderTopRightRadius: "16px" }}>
                              <div className={"framer-1nex91v"} data-framer-name={"Question"}>
                                <div
                                  className={"framer-1uka7jh"}
                                  data-framer-component-type={"RichTextContainer"}
                                  style={{
                                    "--extracted-r6o4lv": TEXT_DEFAULT,
                                    "--framer-link-text-color": "rgb(0, 153, 255)",
                                    "--framer-link-text-decoration": "underline",
                                    "--framer-paragraph-spacing": "0px",
                                    transform: "none",
                                  }}
                                >
                                  <p
                                    dir={"auto"}
                                    className={"framer-text"}
                                    style={{
                                      "--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==",
                                      "--framer-font-family": '"Inter Display", "Inter Display Placeholder", sans-serif',
                                      "--framer-font-size": "18px",
                                      "--framer-font-weight": "500",
                                      "--framer-letter-spacing": "-0.05em",
                                      "--framer-line-height": "1.4em",
                                      "--framer-text-color": TEXT_DEFAULT,
                                    }}
                                  >
                                    {title}
                                  </p>
                                </div>
                                <div className={"framer-8ax261"} data-framer-name={"Icon wrapper"} style={{ backgroundColor: "rgba(0, 0, 0, 0)", borderBottomLeftRadius: "1000px", borderBottomRightRadius: "1000px", borderTopLeftRadius: "1000px", borderTopRightRadius: "1000px" }}>
                                  <div data-framer-component-type={"SVG"} data-framer-shadows className={"framer-1l72tdx"} aria-hidden={true} style={{ imageRendering: "pixelated", flexShrink: "0" }}>
                                    <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                                      <svg style={{ width: "100%", height: "100%", overflow: "visible" }}>
                                        <use href={ARROW_HOVER} />
                                      </svg>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </Appear>
                      </div>
                    </div>
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
