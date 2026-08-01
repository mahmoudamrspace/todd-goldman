"use client";

import { useState } from "react";
import type { SneakPeakContent } from "@/content/section-types";
import { AnimatedSpan, HiddenReveal } from "@/features/HiddenReveal";
import { SneakPeakLightbox } from "@/features/SneakPeakLightbox";

function imageBase(content: SneakPeakContent, index: number) {
  return content.images[index] ?? "/assets/images/image-placeholder.png";
}

function imageAlt(content: SneakPeakContent, index: number) {
  return content.imageAlts[index] ?? `Sketchbook drawing ${index + 1}`;
}

const SNEAK_PEAK_SLOTS = [
  { className: "framer-1adc7vo", width: 1696, height: 2258, sizes: "(min-width: 1200px) 259px, (min-width: 810px) and (max-width: 1199.98px) 259px, (max-width: 809.98px) 259px", srcSet: [{ scale: 1024, w: 769 }, { scale: 2048, w: 1538 }, { w: 1696 }] },
  { className: "framer-1t3i81d", width: 1687, height: 1232, sizes: "(min-width: 1200px) 431px, (min-width: 810px) and (max-width: 1199.98px) 431px, (max-width: 809.98px) 431px", srcSet: [{ scale: 512, w: 512 }, { scale: 1024, w: 1024 }, { w: 1687 }] },
  { className: "framer-1cf6qxv", width: 1687, height: 2400, sizes: "(min-width: 1200px) 258px, (min-width: 810px) and (max-width: 1199.98px) 258px, (max-width: 809.98px) 258px", srcSet: [{ scale: 1024, w: 719 }, { scale: 2048, w: 1439 }, { w: 1687 }] },
  { className: "framer-dn7rjw", width: 2615, height: 1684, sizes: "(min-width: 1200px) 399px, (min-width: 810px) and (max-width: 1199.98px) 399px, (max-width: 809.98px) 399px", srcSet: [{ scale: 512, w: 512 }, { scale: 1024, w: 1024 }, { scale: 2048, w: 2048 }, { w: 2615 }] },
  { className: "framer-1vq20a6", width: 2162, height: 2757, sizes: "(min-width: 1200px) 281px, (min-width: 810px) and (max-width: 1199.98px) 281px, (max-width: 809.98px) 281px", srcSet: [{ scale: 1024, w: 803 }, { scale: 2048, w: 1606 }, { w: 2162 }] },
  { className: "framer-1hczgnp", width: 2486, height: 1800, sizes: "(min-width: 1200px) 505px, (min-width: 810px) and (max-width: 1199.98px) 505px, (max-width: 809.98px) 505px", srcSet: [{ scale: 512, w: 512 }, { scale: 1024, w: 1024 }, { scale: 2048, w: 2048 }, { w: 2486 }] },
  { className: "framer-mhqs5e", width: 2668, height: 1840, sizes: "(min-width: 1200px) 555px, (min-width: 810px) and (max-width: 1199.98px) 555px, (max-width: 809.98px) 555px", srcSet: [{ scale: 512, w: 512 }, { scale: 1024, w: 1024 }, { scale: 2048, w: 2048 }, { w: 2668 }] },
  { className: "framer-wcqli4", width: 2144, height: 1839, sizes: "(min-width: 1200px) 318px, (min-width: 810px) and (max-width: 1199.98px) 318px, (max-width: 809.98px) 318px", srcSet: [{ scale: 512, w: 512 }, { scale: 1024, w: 1024 }, { scale: 2048, w: 2048 }, { w: 2144 }] },
  { className: "framer-6g8f7l", width: 2457, height: 1794, sizes: "(min-width: 1200px) 393px, (min-width: 810px) and (max-width: 1199.98px) 393px, (max-width: 809.98px) 393px", srcSet: [{ scale: 512, w: 512 }, { scale: 1024, w: 1024 }, { scale: 2048, w: 2048 }, { w: 2457 }] },
  { className: "framer-18zri0s", width: 1800, height: 1800, sizes: "(min-width: 1200px) 376px, (min-width: 810px) and (max-width: 1199.98px) 376px, (max-width: 809.98px) 376px", srcSet: [{ scale: 512, w: 512 }, { scale: 1024, w: 1024 }, { w: 1800 }] },
  { className: "framer-lk68t4", width: 1800, height: 1800, sizes: "(min-width: 1200px) 358px, (min-width: 810px) and (max-width: 1199.98px) 358px, (max-width: 809.98px) 358px", srcSet: [{ scale: 512, w: 512 }, { scale: 1024, w: 1024 }, { w: 1800 }] },
  { className: "framer-vnpj8s", width: 2616, height: 1839, sizes: "(min-width: 1200px) 461px, (min-width: 810px) and (max-width: 1199.98px) 461px, (max-width: 809.98px) 461px", srcSet: [{ scale: 512, w: 512 }, { scale: 1024, w: 1024 }, { scale: 2048, w: 2048 }, { w: 2616 }] },
] as const;

function buildSrcSet(base: string, width: number, height: number, entries: readonly { scale?: number; w: number }[]) {
  return entries
    .map((entry) => {
      const url = entry.scale
        ? `${base}?scale-down-to=${entry.scale}&width=${width}&height=${height}`
        : `${base}?width=${width}&height=${height}`;
      return `${url} ${entry.w}w`;
    })
    .join(",");
}

export function SneakPeak({ content }: { content: SneakPeakContent }) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const lightboxImages = SNEAK_PEAK_SLOTS.map((slot, index) =>
    `${imageBase(content, index)}?width=${slot.width}&height=${slot.height}`,
  );

  return (
    <section className={"framer-gfxbk"} data-framer-name={"Sneak peak"}>
      <SneakPeakLightbox
        images={lightboxImages}
        openIndex={openIndex}
        onClose={() => setOpenIndex(null)}
        onNavigate={setOpenIndex}
      />
      <div className={"framer-1nxk7xi"} data-framer-name={"Title"}>
        <HiddenReveal variant="sneak-tree" className={"framer-1odp3ow"} data-framer-name={"Tree"} style={{ willChange: "transform", opacity: "0", transform: "translateY(50px) scale(0.5)" }}>
          <div className={"ssr-variant hidden-g5y12p"}>
            <div data-framer-component-type={"SVG"} data-framer-name={"Tree svg"} data-framer-shadows className={"framer-16qb29c"} aria-hidden={true} style={{ imageRendering: "pixelated", flexShrink: "0" }}>
              <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                <svg style={{ width: "100%", height: "100%" }}>
                  <use href={"#svg-1153458233_3329"} />
                </svg>
              </div>
            </div>
          </div>
          <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
            <div data-framer-component-type={"SVG"} data-framer-name={"Tree svg"} data-framer-shadows className={"framer-16qb29c"} aria-hidden={true} style={{ imageRendering: "pixelated", flexShrink: "0" }}>
              <div className={"svgContainer"} style={{ width: "100%", height: "100%", aspectRatio: "inherit" }}>
                <svg style={{ width: "100%", height: "100%" }}>
                  <use href={"#svg-1649790600_3262"} />
                </svg>
              </div>
            </div>
          </div>
        </HiddenReveal>
        <div
          className={"framer-73zdj0"}
          data-framer-name={"Sneak peak of my works"}
          id={"sneak-peak"}
          data-framer-component-type={"RichTextContainer"}
          style={{ transform: "none" }}
        >
          <h2 className={"framer-text framer-styles-preset-1ir8ahu"} data-styles-preset={"RGebQr53Z"} dir={"auto"}>
            {content.titleWords.map((word, index) => (
              <AnimatedSpan
                key={`sneak-title-${word}-${index}`}
                variant="sneak-title"
                y={10}
                delay={0.4 + index * 0.075}
              >
                {word}
                {index < content.titleWords.length - 1 ? " " : ""}
              </AnimatedSpan>
            ))}
          </h2>
        </div>
      </div>
      <div className={"framer-1mshsi4-container"}>
        <div className={"ssr-variant"}>
          <section style={{ display: "flex", width: "100%", height: "100%", maxWidth: "100%", maxHeight: "100%", placeItems: "center", margin: "0", padding: "0px 0px 0px 0px", listStyleType: "none", textIndent: "none", opacity: "0", overflow: "visible" }}>
            <ul style={{ display: "flex", width: "100%", height: "100%", maxWidth: "100%", maxHeight: "100%", placeItems: "flex-end", margin: "0", padding: "0", listStyleType: "none", textIndent: "none", gap: "24px", position: "relative", flexDirection: "row", willChange: "auto", transform: "translateX(0px)" }}>
              <li style={{ width: "4860px", height: "374px" }} aria-hidden={true}>
                <div className={"framer-1owlvjw-container"} style={{ width: "4860px", height: "374px", flexShrink: "0" }}>
                  <div className={"framer-QUW6w framer-ftirjw framer-v-ftirjw"} data-framer-name={"Variant 1"} style={{ height: "100%", width: "100%" }}>
                    {SNEAK_PEAK_SLOTS.map((slot, index) => {
                      const base = imageBase(content, index);
                      const src = `${base}?width=${slot.width}&height=${slot.height}`;
                      const srcSet = buildSrcSet(base, slot.width, slot.height, slot.srcSet);
                      return (
                        <button
                          key={slot.className}
                          type="button"
                          className={slot.className}
                          data-framer-name={"Image"}
                          data-sneak-peak-index={index}
                          aria-label={`View sketch ${index + 1}: ${imageAlt(content, index)}`}
                          onClick={(event) => {
                            event.stopPropagation();
                            setOpenIndex(index);
                          }}
                          style={{
                            borderBottomLeftRadius: "16px",
                            borderBottomRightRadius: "16px",
                            borderTopLeftRadius: "16px",
                            borderTopRightRadius: "16px",
                            border: "none",
                            padding: 0,
                            background: "transparent",
                            cursor: "zoom-in",
                          }}
                        >
                          <div style={{ position: "absolute", borderRadius: "inherit", cornerShape: "inherit", top: "0", right: "0", bottom: "0", left: "0" }} data-framer-background-image-wrapper={true}>
                            <img
                              decoding={"async"}
                              width={slot.width}
                              height={slot.height}
                              sizes={slot.sizes}
                              srcSet={srcSet}
                              src={src}
                              alt={imageAlt(content, index)}
                              style={{ display: "block", width: "100%", height: "100%", borderRadius: "inherit", cornerShape: "inherit", objectPosition: "center", objectFit: "cover" }}
                            />
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>
              </li>
            </ul>
          </section>
        </div>
      </div>
    </section>
  );
}
