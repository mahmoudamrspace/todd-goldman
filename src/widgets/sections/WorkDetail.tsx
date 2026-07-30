"use client";

import {
  useEffect,
  useState,
  type ReactNode,
} from "react";
import { HiddenReveal } from "@/features/HiddenReveal";
import { Scribble } from "@/entities/Scribble";
import type { WorkDetailNavLabels } from "@/content/section-types";
import type { Work } from "@/content/types";

const WORK_WORD_STYLE = {
  display: "inline-block",
  opacity: "0.001",
  transform: "translateY(20px)",
} as const;

function WorkAnimatedWord({ children }: { children: ReactNode }) {
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    const main = document.querySelector('main[data-framer-name="Main"]');
    if (!main) return;

    const sync = () => {
      const rect = main.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      if (visibleHeight >= rect.height * 0.1) setRevealed(true);
    };

    sync();
    const safety = window.setTimeout(() => setRevealed(true), 2200);
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    return () => {
      window.clearTimeout(safety);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, []);

  if (revealed) {
    return <span style={{ display: "inline" }}>{children}</span>;
  }

  return <span style={WORK_WORD_STYLE}>{children}</span>;
}

const GALLERY_CLASSES = [
  "framer-1z0qjo8",
  "framer-1fweuxy",
  "framer-1tx1btd",
  "framer-li7rj2",
] as const;

const IMAGE_SIZES =
  "(min-width: 1200px) max((min(100vw - 40px, 1280px) - 60px) / 2, 20px), (min-width: 810px) and (max-width: 1199.98px) max(min(100vw - 40px, 1280px) - 40px, 20px), (max-width: 809.98px) max(min(100vw - 40px, 1280px) - 20px, 20px)";

function gallerySrcSet(src: string, width: number, height: number) {
  return `${src}?scale-down-to=512&width=${width}&height=${height} 512w,${src}?scale-down-to=1024&width=${width}&height=${height} 1024w,${src}?scale-down-to=2048&width=${width}&height=${height} 2048w,${src}?width=${width}&height=${height} ${width}w`;
}

const WORK_TITLE_DESKTOP_STYLE = {
  "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
  "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif",
  "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
  "--framer-font-size": "72px",
  "--framer-font-weight": "700",
  "--framer-letter-spacing": "-0.04em",
  "--framer-line-height": "1.1em",
  "--framer-text-alignment": "center",
  "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
} as const;

const WORK_DESCRIPTION_STYLE = {
  "--font-selector": "RlI7SW50ZXJEaXNwbGF5-Medium",
  "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif",
  "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
  "--framer-font-size": "16px",
  "--framer-font-weight": "500",
  "--framer-letter-spacing": "-0.02em",
  "--framer-line-height": "1.3em",
  "--framer-text-alignment": "start",
  "--framer-text-color": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))",
} as const;

export function WorkDetail({
  work,
  navLabels,
}: {
  work: Work;
  navLabels: WorkDetailNavLabels;
}) {
  const titleWords = work.title.split(" ");
  const clientWords = work.client.split(" ");
  const prevHref = work.prevSlug ? `/works/${work.prevSlug}` : "#";
  const nextHref = work.nextSlug ? `/works/${work.nextSlug}` : "#";
  const galleryImages = [
    { src: work.detailHero.src, alt: work.detailHero.alt },
    ...work.gallery,
  ];

  return (
    <main className={"framer-1khmwl0"} data-framer-name={"Main"}>
      <section className={"framer-1kpqcom"} data-framer-name={"Content"}>
        <div className={"framer-7ebeqf"} data-framer-name={"Text content"}>
          <div className={"framer-10yyshr"} data-framer-name={"Information"}>
            <div className={"framer-1sh11gx"} data-framer-name={"Title"}>
              <div className={"ssr-variant hidden-un1wdp"}>
                <div className={"framer-ihmqp6"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                  <h1 className={"framer-text framer-styles-preset-qy8qkp"} data-styles-preset={"NBkXb1mzD"} dir={"auto"} style={WORK_TITLE_DESKTOP_STYLE}>
                    {titleWords.map((word, index) => (
                      <WorkAnimatedWord key={`title-desktop-${word}-${index}`}>
                        {word}
                        {index < titleWords.length - 1 ? " " : ""}
                      </WorkAnimatedWord>
                    ))}
                  </h1>
                </div>
              </div>
              <div className={"ssr-variant hidden-1keu3yb hidden-r9bvin"}>
                <div className={"framer-ihmqp6"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                  <h2 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "72px", "--framer-font-weight": "700", "--framer-line-height": "1em", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                    {titleWords.map((word, index) => (
                      <WorkAnimatedWord key={`title-tablet-phone-${word}-${index}`}>
                        {word}
                        {index < titleWords.length - 1 ? " " : ""}
                      </WorkAnimatedWord>
                    ))}
                  </h2>
                </div>
              </div>
            </div>
            <div className={"framer-a3kv78"} data-framer-name={"Description wrap"}>
              <HiddenReveal variant="work-block" className={"framer-n3t1jh"} data-framer-name={"Description"} style={{"opacity": "0.001", "transform": "translateY(10px)"}}>
                  <div className={"framer-1w44um0"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                    <p dir={"auto"} className={"framer-text framer-styles-preset-1rdik1o"} style={WORK_DESCRIPTION_STYLE}>
                      {"                    "}{work.describe}
                    </p>
                  </div>
              </HiddenReveal>
            </div>
          </div>
          <HiddenReveal variant="work-block" className={"framer-1dss6f4"} data-framer-name={"Meta info"} style={{"opacity": "0.001", "transform": "translateY(10px)"}}>
              <div className={"ssr-variant hidden-un1wdp"}>
                <div className={"framer-x64vzw"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                  <h2 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "22px", "--framer-font-style": "italic", "--framer-font-weight": "700", "--framer-line-height": "1em", "--framer-text-alignment": "left", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                    {clientWords.map((word, index) => (
                      <WorkAnimatedWord key={`client-left-${word}-${index}`}>
                        {word}
                        {index < clientWords.length - 1 ? " " : ""}
                      </WorkAnimatedWord>
                    ))}
                  </h2>
                </div>
              </div>
              <div className={"ssr-variant hidden-1keu3yb hidden-r9bvin"}>
                <div className={"framer-x64vzw"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                  <h2 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "22px", "--framer-font-style": "italic", "--framer-font-weight": "700", "--framer-line-height": "1em", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                    {clientWords.map((word, index) => (
                      <WorkAnimatedWord key={`client-center-${word}-${index}`}>
                        {word}
                        {index < clientWords.length - 1 ? " " : ""}
                      </WorkAnimatedWord>
                    ))}
                  </h2>
                </div>
              </div>
              <div className={"ssr-variant"}>
                <div className={"framer-zju6w5-container hidden-r9bvin hidden-1keu3yb"}>
                  <Scribble variant="workMeta" />
                </div>
              </div>
              <div className={"framer-fr2npb"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                <h2 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "22px", "--framer-font-style": "italic", "--framer-font-weight": "700", "--framer-line-height": "1em", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                  <WorkAnimatedWord>{work.services}</WorkAnimatedWord>
                </h2>
              </div>
              <div className={"framer-1o2tx64-container hidden-un1wdp"} style={{"transform": "translateX(-50%)"}}>
                <Scribble variant="type3" />
              </div>
              <div className={"ssr-variant hidden-un1wdp"}>
                <div className={"framer-1qre5i1"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                  <h2 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "22px", "--framer-font-style": "italic", "--framer-font-weight": "700", "--framer-line-height": "1em", "--framer-text-alignment": "right", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                    <WorkAnimatedWord>{work.date}</WorkAnimatedWord>
                  </h2>
                </div>
              </div>
              <div className={"ssr-variant hidden-1keu3yb hidden-r9bvin"}>
                <div className={"framer-1qre5i1"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                  <h2 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "22px", "--framer-font-style": "italic", "--framer-font-weight": "700", "--framer-line-height": "1em", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                    <WorkAnimatedWord>{work.date}</WorkAnimatedWord>
                  </h2>
                </div>
              </div>
          </HiddenReveal>
        </div>
        <div className={"framer-3hfin4"} data-framer-name={"Images"}>
          {galleryImages.map((image, index) => (
            <div key={`${image.src}-${index}`} className={"ssr-variant"}>
              <figure
                className={GALLERY_CLASSES[index] ?? GALLERY_CLASSES[0]}
                style={{ height: "auto", aspectRatio: "1.1658510059815117" }}
              >
                <div
                  style={{
                    position: "absolute",
                    borderRadius: "inherit",
                    cornerShape: "inherit",
                    top: "0",
                    right: "0",
                    bottom: "0",
                    left: "0",
                  }}
                  data-framer-background-image-wrapper={true}
                >
                  <img
                    decoding={"async"}
                    loading={index === 0 ? undefined : "lazy"}
                    width={2144}
                    height={1839}
                    sizes={IMAGE_SIZES}
                    srcSet={gallerySrcSet(image.src, 2144, 1839)}
                    src={`${image.src}?width=2144&height=1839`}
                    alt={image.alt}
                    style={{
                      display: "block",
                      width: "100%",
                      height: "100%",
                      borderRadius: "inherit",
                      cornerShape: "inherit",
                      objectPosition: "center",
                      objectFit: index === 0 ? "contain" : "cover",
                    }}
                  />
                </div>
              </figure>
            </div>
          ))}
        </div>
      </section>
      <section className={"framer-8xb81y"} data-framer-name={"Related works"}>
        <div className={"framer-2y7mhj"} data-framer-name={"wrapper"}>
          <div className={"ssr-variant hidden-1keu3yb hidden-un1wdp"}>
            <div className={"framer-dt76k8-container"}>
              <a className={"framer-Yq4EI framer-1ipltgz framer-v-11ylb8b framer-qistl9"} data-framer-name={"Previous Project"} href={prevHref} style={{"width": "100%"}}>
                <div className={"framer-1ijo65u"} data-framer-name={"Project Title"}>
                  <div className={"framer-93ewrm"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "22px", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                      {navLabels.prevFull}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className={"ssr-variant hidden-un1wdp hidden-r9bvin"}>
            <div className={"framer-dt76k8-container"}>
              <a className={"framer-Yq4EI framer-1ipltgz framer-v-e1omv7 framer-qistl9"} data-framer-name={"Mobile Next Project"} href={prevHref} style={{"width": "100%"}}>
                <div className={"framer-1ijo65u"} data-framer-name={"Project Title"}>
                  <div className={"framer-93ewrm"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                      {navLabels.nextShort}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className={"ssr-variant hidden-1keu3yb hidden-r9bvin"}>
            <div className={"framer-dt76k8-container"}>
              <a className={"framer-Yq4EI framer-1ipltgz framer-v-b2b4wf framer-qistl9"} data-framer-name={"Mobile Previous Project"} href={prevHref} style={{"width": "100%"}}>
                <div className={"framer-1ijo65u"} data-framer-name={"Project Title"}>
                  <div className={"framer-93ewrm"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                      {navLabels.prevShort}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className={"ssr-variant hidden-1keu3yb hidden-un1wdp"}>
            <div className={"framer-1auzu7w-container"}>
              <a className={"framer-Yq4EI framer-1ipltgz framer-v-1ipltgz framer-qistl9"} data-framer-name={"Next Project"} href={nextHref} style={{"width": "100%"}}>
                <div className={"framer-1ijo65u"} data-framer-name={"Project Title"}>
                  <div className={"framer-93ewrm"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "22px", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                      {navLabels.nextFull}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <div className={"ssr-variant hidden-r9bvin"}>
            <div className={"framer-1auzu7w-container"}>
              <a className={"framer-Yq4EI framer-1ipltgz framer-v-e1omv7 framer-qistl9"} data-framer-name={"Mobile Next Project"} href={nextHref} style={{"width": "100%"}}>
                <div className={"framer-1ijo65u"} data-framer-name={"Project Title"}>
                  <div className={"framer-93ewrm"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLXJlZ3VsYXI=", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))", "--framer-text-transform": "inherit"}}>
                      {navLabels.nextShort}
                    </p>
                  </div>
                </div>
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
