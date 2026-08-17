"use client";

import {
  motion,
  useReducedMotion,
} from "motion/react";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type CSSProperties,
  type ReactNode,
} from "react";
import { AnimatedSpan, HiddenReveal } from "@/features/HiddenReveal";
import type { AboutContent } from "@/content/section-types";
import { AboutBodyRichText, AboutClientsList, AboutHandwrittenName, AboutMainTitle, AboutMeHeading } from "@/features/AboutRichText";
import { Appear } from "@/features/Appear";
import { Scribble } from "@/entities/Scribble";
import { LENIS_SCROLL_EVENT } from "@/features/SmoothScroll";
import { toddSceneArt } from "@/content/todd-scenes";
import { cn } from "@/shared/lib/cn";
import { TODD } from "@/shared/lib/todd-semantic-classes";

const ABOUT_IMAGE_REST_SCALE = 1.06;
const ABOUT_IMAGE_REVEAL_SCALE = 1;
const REVEAL_SOFT = {
  willChange: "transform",
  opacity: "0",
  transform: "translateY(16px)",
} as const;

function AboutCardImage({ src }: { src: string }) {
  return (
    <div
      style={{
        position: "absolute",
        borderRadius: "inherit",
        cornerShape: "inherit",
        top: 0,
        right: 0,
        bottom: 0,
        left: 0,
      }}
      data-todd-background-image-wrapper={true}
    >
      <img
        decoding="async"
        loading="lazy"
        width={1920}
        height={1080}
        src={src}
        alt=""
        className="todd-about-card-img"
      />
    </div>
  );
}

function AboutCardIcon({
  src,
  className,
}: {
  src: string;
  className: string;
}) {
  return (
    <HiddenReveal className="todd-about-card-icon-reveal" style={REVEAL_SOFT} delay={0.08}>
      <img
        src={src}
        alt=""
        aria-hidden={true}
        className={`${className} todd-about-card-icon`}
      />
    </HiddenReveal>
  );
}

const ABOUT_BLOCK_SSR_STYLE = {
  willChange: "transform",
  opacity: "1",
  transform: "none",
} as const;
const ABOUT_IMAGE_SSR_STYLE = {
  willChange: "transform",
  opacity: "1",
} as const;
const ABOUT_WRAPPER_SSR_STYLE = {
  willChange: "transform",
  opacity: "1",
  transform: "translateY(-50%) translateY(70px)",
} as const;
const BLOCK_SPRING = { damping: 69, stiffness: 422, mass: 2.3 };
const IMAGE_SPRING = { damping: 60, stiffness: 500, mass: 1 };
const WRAPPER_SPRING = { bounce: 0.2, damping: 30, stiffness: 500 };

function subscribeNoop() {
  return () => {};
}

function useIsServerRender() {
  return useSyncExternalStore(subscribeNoop, () => false, () => true);
}

type AboutRevealLayout = "overlay" | "stack";

type AboutRevealShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  layout?: AboutRevealLayout;
  "data-todd-name"?: string;
  "data-border"?: boolean;
  style?: CSSProperties;
};

const AboutBlockRevealedContext = createContext(false);

function useAboutBlockReveal(amount: number) {
  const isServerRender = useIsServerRender();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduced || isServerRender) return;
    const node = ref.current;
    if (!node) return;

    const sync = () => {
      const rect = node.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      // Sticky cards can be substantially covered by the previous card while
      // entering. A small pixel floor is more reliable than requiring a large
      // percentage of the transformed sticky shell.
      const requiredVisible = Math.min(rect.height * amount, 24);
      if (visibleHeight >= requiredVisible) setRevealed(true);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if ((entry?.intersectionRatio ?? 0) >= amount) setRevealed(true);
      },
      { threshold: [0.01, amount], rootMargin: "0px 0px -4% 0px" },
    );
    observer.observe(node);

    window.addEventListener(LENIS_SCROLL_EVENT, sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    sync();

    return () => {
      observer.disconnect();
      window.removeEventListener(LENIS_SCROLL_EVENT, sync);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [amount, reduced, isServerRender]);

  return {
    ref,
    revealed: reduced || revealed,
    isServerRender,
    reduced,
  };
}

function AboutBlockReveal({
  children,
  className,
  id,
  layout = "overlay",
  "data-todd-name": dataToddName,
  style,
}: AboutRevealShellProps) {
  const { ref, revealed, isServerRender, reduced } = useAboutBlockReveal(
    layout === "stack" ? 0.12 : 0.18,
  );
  const shellStyle: CSSProperties = { ...(style ?? {}), opacity: 1 };

  if (isServerRender) {
    return (
      <AboutBlockRevealedContext.Provider value={false}>
        <div
          ref={ref}
          className={className}
          data-todd-name={dataToddName}
          data-revealed="false"
          id={id}
          style={{ ...shellStyle, ...ABOUT_BLOCK_SSR_STYLE }}
        >
          {children}
        </div>
      </AboutBlockRevealedContext.Provider>
    );
  }

  if (reduced) {
    return (
      <AboutBlockRevealedContext.Provider value={true}>
        <div
          ref={ref}
          className={className}
          data-todd-name={dataToddName}
          data-revealed="true"
          id={id}
          style={{ ...shellStyle, transform: "none" }}
        >
          {children}
        </div>
      </AboutBlockRevealedContext.Provider>
    );
  }

  return (
    <AboutBlockRevealedContext.Provider value={revealed}>
      <motion.div
        ref={ref}
        className={className}
        data-todd-name={dataToddName}
        data-revealed={revealed ? "true" : "false"}
        id={id}
        style={{ ...shellStyle, willChange: "transform" }}
        initial={{ y: 40, scale: 1, opacity: 0.001 }}
        animate={
          revealed
            ? { y: 0, scale: 1, opacity: 1 }
            : { y: 40, scale: 1, opacity: 0.001 }
        }
        transition={{ type: "spring", ...BLOCK_SPRING }}
      >
        {children}
      </motion.div>
    </AboutBlockRevealedContext.Provider>
  );
}

function AboutImageReveal({
  children,
  className,
  "data-todd-name": dataToddName,
  style,
}: AboutRevealShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const parentRevealed = useContext(AboutBlockRevealedContext);
  const isServerRender = useIsServerRender();
  const reduced = useReducedMotion();
  const baseRotate = style?.transform?.includes("rotate") ? -180 : 0;
  const ssrTransform = style?.transform?.includes("rotate") ? style.transform : "none";
  const motionStyle: CSSProperties = { ...(style ?? {}), ...ABOUT_IMAGE_SSR_STYLE };
  if (style?.transform?.includes("rotate")) delete motionStyle.transform;

  if (isServerRender) {
    return (
      <div
        className={className}
        data-todd-name={dataToddName}
        style={{ ...motionStyle, transform: ssrTransform }}
      >
        {children}
      </div>
    );
  }

  if (reduced) {
    const reducedTransform = baseRotate ? "rotate(-180deg)" : "none";
    return (
      <div
        ref={ref}
        className={className}
        data-todd-name={dataToddName}
        style={{ ...motionStyle, transform: reducedTransform }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      data-todd-name={dataToddName}
      style={motionStyle}
        initial={{ scale: ABOUT_IMAGE_REST_SCALE, rotate: baseRotate }}
        animate={
          parentRevealed
            ? { scale: ABOUT_IMAGE_REVEAL_SCALE, rotate: baseRotate }
            : { scale: ABOUT_IMAGE_REST_SCALE, rotate: baseRotate }
        }
      transition={{ type: "spring", ...IMAGE_SPRING }}
    >
      {children}
    </motion.div>
  );
}

function AboutWrapperReveal({
  children,
  className,
  layout = "overlay",
  "data-todd-name": dataToddName,
  "data-border": dataBorder,
  style,
}: AboutRevealShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const parentRevealed = useContext(AboutBlockRevealedContext);
  const isServerRender = useIsServerRender();
  const reduced = useReducedMotion();
  const isStack = layout === "stack";
  const shellStyle: CSSProperties = { ...(style ?? {}), ...(isStack ? { opacity: 1 } : ABOUT_WRAPPER_SSR_STYLE) };
  delete shellStyle.transform;

  if (isServerRender) {
    return (
      <div
        className={className}
        data-todd-name={dataToddName}
        data-border={dataBorder}
        style={isStack ? { opacity: 1, transform: "none" } : { ...shellStyle, ...ABOUT_WRAPPER_SSR_STYLE }}
      >
        {children}
      </div>
    );
  }

  if (reduced) {
    return (
      <div
        ref={ref}
        className={className}
        data-todd-name={dataToddName}
        data-border={dataBorder}
        style={{
          ...shellStyle,
          willChange: "transform",
          opacity: 1,
          transform: isStack ? "none" : "translateY(-50%)",
        }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      data-todd-name={dataToddName}
      data-border={dataBorder}
      style={{ ...shellStyle, willChange: "transform", opacity: 1 }}
      initial={
        isStack
          ? { y: 28 }
          : { transform: "translateY(calc(-50% + 70px))" }
      }
      animate={
        isStack
          ? { y: parentRevealed ? 0 : 28 }
          : {
              transform: parentRevealed
                ? "translateY(-50%)"
                : "translateY(calc(-50% + 70px))",
            }
      }
      transition={{ type: "spring", ...WRAPPER_SPRING }}
    >
      {children}
    </motion.div>
  );
}

export function About({ content }: { content: AboutContent }) {
  const awardsImage = content.images[2] ?? "/assets/todd-scenes/about/card-by-the-numbers-bg.svg";
  const neverGrowCard = content.images[0] ?? "/assets/todd-scenes/about/card-never-grow-up-bg.svg";
  const timelineCard = content.images[1] ?? "/assets/todd-scenes/about/card-timeline-bg.svg";
  const whereArtCard = content.images[3] ?? "/assets/todd-scenes/about/card-where-art-bg.svg";
  const [talksLead, ...talksRest] = content.talksTitle.split(/\s+/).filter(Boolean);
  const talksTail = talksRest.join(" ");
  const [clientsLead, ...clientsRest] = content.clientsTitle.split(/\s+/).filter(Boolean);
  const clientsTail = clientsRest.join(" ");
  return (
    <section className={cn(TODD.about.section, "todd-about")} data-todd-name={"About"} id={"about"}>
      <div className={"ssr-variant todd-hide-mobile"}>
        <div className={cn(TODD.about.container, "todd-about__container")} data-todd-name={"Container"}>
          <div className={"todd-about__title-4"} data-todd-name={"Title"}>
            <HiddenReveal
              variant="section-scroll-artwork"
              className="todd-about__twisted-mind-art"
              style={{ willChange: "transform", opacity: "0", transform: "translateY(40px)" }}
            >
              <img src={content.twistedMind} alt="" aria-hidden={true} />
            </HiddenReveal>
            <HiddenReveal className={"todd-about__icon"} data-todd-name={"Icon"} style={{"willChange": "transform", "opacity": "0", "transform": "none"}}>
              <div data-todd-component-type={"SVG"} data-todd-name={"Character"} data-todd-shadows className={"todd-about__character"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 89 87%22 overflow=%22visible%22><g><path d=%22M 81.984 34.712 L 86.35 33.919 L 88.688 36.085 L 88.065 37.944 L 84.088 39.127 L 88.688 41.751 L 89 43.62 L 86.661 45.276 L 87.988 47.326 C 87.988 47.326 87.676 49.339 84.48 48.964 C 84.48 48.964 86.819 51.189 83.153 51.9 C 83.153 51.9 84.011 53.398 83.388 54.424 C 82.764 55.448 75.668 53.083 75.668 53.083 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 16.997 66.81 C 16.997 66.81 14.665 68.255 11.549 68.195 C 8.432 68.136 5.421 67.288 5.421 67.288 C 5.421 67.288 2.542 65.172 1.543 65.256 C 0.543 65.341 0 67.288 0 67.288 L 13.202 82.314 C 13.202 82.314 20.431 79.765 22.027 72.588 C 23.622 65.412 16.997 66.813 16.997 66.813 Z M 52.35 76.417 C 52.35 76.417 50.341 82.928 50.687 87 L 70.081 84.086 C 70.081 84.086 72.602 83.275 72.756 81.44 C 72.864 80.139 71.272 79.896 67.807 79.955 C 64.343 80.014 63.917 73.213 63.917 73.213 L 52.347 76.411 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 10.953 61.288 L 23.199 75.516 L 41.452 59.347 L 25.433 44.661 L 15.146 53.6 Z M 48.922 57.51 L 49.665 78.395 L 69.15 72.258 L 66.805 47.822 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 19.75 19.017 C 19.75 19.017 26.223 14.693 28.769 14.34 C 31.311 13.991 36.282 17.332 36.282 17.332 C 36.282 17.332 43.566 29.304 46.571 29.538 C 49.577 29.772 59.403 26.381 59.403 26.381 C 59.403 26.381 65.3 24.627 68.65 25.913 C 72.001 27.198 76.163 37.251 76.163 37.251 L 72.35 51.163 L 53.621 55.606 C 53.621 55.606 52.233 56.776 43.563 55.606 C 34.893 54.436 20.886 46.954 20.886 46.954 L 17.667 42.162 L 13.968 31.054 L 19.747 19.014 Z%22 fill=%22rgb(41,120,243)%22></path><path d=%22M 10.027 39.614 L 15.809 46.631 L 36.268 30.263 L 32.569 22.197 L 18.352 32.25 Z M 78.236 30.029 L 80.584 29.561 L 84.373 30.796 L 75.693 55.083 L 71.355 55.392 L 68.727 54.094 Z%22 fill=%22rgb(244,99,57)%22></path><path d=%22M 15.815 46.693 L 17.104 49.953 L 21.575 49.953 L 22.322 54.365 L 28.816 54.365 L 30.411 60.396 L 36.274 61.042 L 40.42 64.702 L 46.168 59.965 L 50.109 62.118 L 52.342 59.75 L 57.134 60.502 L 59.689 56.097 L 64.48 56.733 L 65.224 54.044 L 68.732 54.156 L 78.241 30.091 L 76.158 29.252 L 72.465 31.651 L 70.336 30.144 L 66.075 35.189 L 62.777 33.91 L 59.476 36.066 L 57.029 34.475 L 53.089 37.679 L 50.321 36.281 L 46.381 38.755 L 44.144 36.281 L 41.377 37.22 L 39.782 33.91 L 36.274 33.373 L 36.274 30.325 Z%22 fill=%22rgb(247,244,237)%22></path><path d=%22M 43.222 14.029 C 43.222 14.029 40.078 17.726 39.973 22.79 C 39.871 27.857 45.665 32.094 45.665 32.094 L 52.647 33.542 C 52.647 33.542 56.736 32.431 59.395 29.367 C 62.055 26.303 61.644 19.586 61.644 19.586 C 61.644 19.586 60.111 15.037 58.065 13.589 C 56.02 12.141 52.033 10.269 52.033 10.269 L 43.218 14.026 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 43.868 11.179 L 43.554 5.651 C 43.554 5.651 43.233 0.259 43.813 0.01 C 44.393 -0.24 48.543 4.437 48.543 4.437 C 48.543 4.437 50.755 1.507 51.35 1.535 C 51.946 1.563 52.871 8.156 52.871 8.156 C 52.871 8.156 58.459 6.696 60.4 7.545 C 62.337 8.393 62.35 11.083 59.912 12.209 C 57.475 13.335 45.13 16.409 45.13 16.409 L 41.449 18 C 41.449 18 39.117 18.196 38.54 17.41 C 37.963 16.624 39.904 14.371 39.904 14.371 L 43.871 11.179 Z%22 fill=%22rgb(30,30,30)%22></path><path d=%22M 45.049 18.655 C 45.049 18.655 50.667 16.671 56.233 17.207 L 55.811 21.494 C 55.811 21.494 54.697 23.316 52.738 24.121 C 50.775 24.926 47.755 23.638 47.755 23.638 L 45.703 21.12 L 45.052 18.655 Z%22 fill=%22rgb(213,68,41)%22></path><path d=%22M 18.512 46.986 L 21.227 48.524 L 37.669 34.484 L 37.669 32.057 Z M 23.267 51.164 L 26.682 53.323 L 41.31 37.23 L 41.31 35.199 L 39.49 35.573 Z M 30.345 60.405 L 33.322 61.316 L 44.994 37.23 L 44.078 36.291 L 40.122 41.411 Z M 37.669 64.115 L 40.354 64.711 L 48.052 37.673 L 46.959 37.23 L 39.41 56.68 Z M 46.959 60.839 L 50.005 60.437 L 53.244 36.612 L 51.745 36.291 Z M 54.432 61.316 L 57.067 60.511 L 57.99 34.135 L 56.962 34.484 Z M 59.622 56.106 L 61.942 56.362 L 63.639 34.281 L 62.71 33.919 L 59.813 52.044 Z M 63.639 53.641 L 65.157 54.053 L 71.535 31.049 L 70.27 30.153 Z%22 fill=%22rgb(255,255,255)%22></path><path d=%22M 65.205 54.044 L 68.084 54.134 L 76.14 29.252 L 73.965 30.665 L 65.205 53.313%22 fill=%22rgb(255,255,255)%22></path><path d=%22M 25.037 21.111 L 30.266 20.016 L 31.528 21.566 C 31.528 21.566 32.34 24.212 26.928 26.855 C 26.928 26.855 27.921 30.593 26.206 31.232 C 24.494 31.872 23.321 29.591 23.321 29.591 C 23.321 29.591 24.404 33.057 22.96 33.603 C 21.516 34.149 19.443 31.597 19.443 31.597 C 19.443 31.597 20.526 35.794 18.81 36.521 C 17.098 37.251 14.843 35.335 14.843 35.335 L 15.564 38.162 C 15.564 38.162 13.503 39.787 12.769 39.528 C 11.35 39.029 10.153 34.056 10.153 34.056 C 10.153 34.056 9.159 28.402 11.776 23.934 C 12.692 22.368 16.916 18.827 16.916 18.827 L 22.778 18.827 L 25.034 21.108 Z%22 fill=%22rgb(252,211,172)%22></path></g></svg>')"}}>              </div>
            </HiddenReveal>
            <HiddenReveal variant="section-heading" className={"todd-about__title-text"} data-todd-name={"Title text"} id={"cf9z1u"} style={{ willChange: "transform", opacity: "0", transform: "translateY(24px)" }}>
              <h2 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LVNlbWlCb2xk", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss02' on, 'ss01' on, 'salt' on, 'ss03' on, 'ss04' on", "--todd-font-size": "72px", "--todd-font-weight": "600", "--todd-letter-spacing": "-3px", "--todd-line-height": "1em", "--todd-text-alignment": "center", "--todd-text-color": "rgb(9, 9, 9)"}} className={"todd-text"}>
                <AboutMainTitle title={content.title} />
              </h2>
            </HiddenReveal>
            <div className={"ssr-variant"}>
              <div className={"todd-about__scribble todd-hide-mobile"} data-todd-name={"Scribble"}>
                <Scribble variant="type1" />
              </div>
            </div>
          </div>
          <AboutBlockReveal className={"todd-intro__wrapper-me"} data-todd-name={"About me"} id={"about-1"}>
            <div className={cn(TODD.about.card, TODD.card.shell)} data-border={true} data-todd-name={"Container"}>
              <AboutImageReveal className={"todd-about__card-image todd-about__img todd-hide-mobile"} data-todd-name={"Img"}>
                <AboutCardImage src={neverGrowCard} />
              </AboutImageReveal>
              <AboutWrapperReveal className={"todd-about__wrapper"} data-todd-name={"Wrapper"}>
                <div className={"todd-about__content-4"} data-todd-name={"Content"}>
                  <div className={"todd-about__title-wrap-4"} data-todd-name={"Title Wrap"}>
                    <AboutCardIcon src={toddSceneArt.neverGrowUpCardArt} className={"todd-intro__wrapper-22"} />
                    <Appear id="10d8ozj" className={"todd-about__title"} data-todd-name={"Title"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--todd-font-size": "36px", "--todd-font-weight": "700", "--todd-letter-spacing": "-1.2px", "--todd-line-height": "52px", "--todd-text-alignment": "center", "--todd-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"todd-text"}>
                          <AboutMeHeading heading={content.heading} />
                        </h3>
                    </Appear>
                  </div>
                  <Appear id="i446vz" className={"todd-about__rich-text-container-19"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                      <p dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss02' on, 'ss01' on, 'ss03' on, 'ss04' on, 'ss08' on, 'ss07' on, 'salt' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "0.2px", "--todd-line-height": "1.4em", "--todd-text-alignment": "left", "--todd-text-color": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))"}} className={"todd-text"}><AboutBodyRichText body={content.body} /></p>
                  </Appear>
                  <div className={"todd-about__rich-text-container-8"} data-todd-component-type={"RichTextContainer"} style={{"transform": "translateX(-50%)"}}>
                    <p dir={"auto"} style={{"--font-selector": "R0Y7R3JhcGUgTnV0cy1yZWd1bGFy", "--todd-font-family": "\"Grape Nuts\", sans-serif", "--todd-font-size": "56px", "--todd-text-color": "var(--token-a962588e-440d-4f71-ad7a-bd7fc38d62f3, rgb(255, 83, 36))"}} className={"todd-text"}>
                      <AboutHandwrittenName name={content.name} />
                    </p>
                  </div>
                </div>
              </AboutWrapperReveal>
            </div>
          </AboutBlockReveal>
          <AboutBlockReveal className={"todd-about__rich-text-container-20"} data-todd-name={content.talksTitle} id={"selected-talks"}>
            <div className={cn("todd-intro__wrapper-24", TODD.card.shell)} data-border={true} data-todd-name={"Container"}>
              <AboutImageReveal className={"todd-about__card-image todd-about__img-2 todd-hide-mobile"} data-todd-name={"Img"}>
                <AboutCardImage src={timelineCard} />
              </AboutImageReveal>
              <AboutWrapperReveal className={"todd-about__wrapper-3"} data-todd-name={"Wrapper"}>
                <div className={"todd-about__content"} data-todd-name={"Content"}>
                  <div className={"todd-about__title-wrap"} data-todd-name={"Title Wrap"}>
                    <AboutCardIcon src={toddSceneArt.timelineCardArt} className={"todd-about__variant"} />
                    <Appear id="zq3mu5" className={"todd-about__title-5"} data-todd-name={"Title"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--todd-font-family": "\"Averia Serif Libre\", sans-serif", "--todd-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--todd-font-size": "36px", "--todd-font-style": "italic", "--todd-letter-spacing": "-1.2px", "--todd-line-height": "52px", "--todd-text-alignment": "center", "--todd-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"todd-text"}>
                          {talksLead}
                          <span style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--todd-font-weight": "700"}} className={"todd-text"}> </span>
                          <span style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-style": "normal", "--todd-font-weight": "700"}} className={"todd-text"}>
                            {talksTail}
                          </span>
                        </h3>
                    </Appear>
                  </div>
                  <div className={"todd-about__content-5"} data-todd-name={"Content"}>
                    <div className={"todd-about__items-wrapper"} data-todd-name={"Items wrapper"}>
                      <div className={"ssr-variant"}>
                        <Appear id="17sob6t" className={"todd-about__rich-text-container-5"} style={{"opacity": "0.001", "transform": "none"}}>
                            <div className={"todd-about__desktop-4 todd-about__desktop todd-about__desktop"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                              <div className={"todd-about__rich-text-container-3"}>
                                <div className={"todd-about__rich-text-container-18"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                    {content.talks[0]?.year?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-0-city-${wi}`} y={10}>{word}{wi < (content.talks[0]?.year?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[0]?.milestone?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-0-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container-7"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                              </div>
                              <div className={"todd-about__rich-text-container-2"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                  <AnimatedSpan y={10}>{content.talks[0]?.location ?? ""}</AnimatedSpan>
                                </p>
                              </div>
                            </div>
                        </Appear>
                      </div>
                      <div className={"ssr-variant"}>
                        <Appear id="qj8w5o" className={"todd-about__rich-text-container-21"} style={{"opacity": "0.001", "transform": "none"}}>
                            <div className={"todd-about__desktop-4 todd-about__desktop todd-about__desktop"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                              <div className={"todd-about__rich-text-container-3"}>
                                <div className={"todd-about__rich-text-container-18"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                    {content.talks[1]?.year?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-1-city-${wi}`} y={10}>{word}{wi < (content.talks[1]?.year?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[1]?.milestone?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-1-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container-7"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                              </div>
                              <div className={"todd-about__rich-text-container-2"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                  <AnimatedSpan y={10}>{content.talks[1]?.location ?? ""}</AnimatedSpan>
                                </p>
                              </div>
                            </div>
                        </Appear>
                      </div>
                      <div className={"ssr-variant"}>
                        <Appear id="1vmjjvi" className={"todd-about__rich-text-container-15"} style={{"opacity": "0.001", "transform": "none"}}>
                            <div className={"todd-about__desktop-4 todd-about__desktop todd-about__desktop"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                              <div className={"todd-about__rich-text-container-3"}>
                                <div className={"todd-about__rich-text-container-18"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                    {content.talks[2]?.year?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-2-city-${wi}`} y={10}>{word}{wi < (content.talks[2]?.year?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[2]?.milestone?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-2-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container-7"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                              </div>
                              <div className={"todd-about__rich-text-container-2"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                  <AnimatedSpan y={10}>{content.talks[2]?.location ?? ""}</AnimatedSpan>
                                </p>
                              </div>
                            </div>
                        </Appear>
                      </div>
                      <div className={"ssr-variant"}>
                        <Appear id="1okuu50" className={"todd-about__rich-text-container-12"} style={{"opacity": "0.001", "transform": "none"}}>
                            <div className={"todd-about__desktop-4 todd-about__desktop todd-about__desktop"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                              <div className={"todd-about__rich-text-container-3"}>
                                <div className={"todd-about__rich-text-container-18"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                    {content.talks[3]?.year?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-3-city-${wi}`} y={10}>{word}{wi < (content.talks[3]?.year?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[3]?.milestone?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-3-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"todd-about__rich-text-container-7"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                              </div>
                              <div className={"todd-about__rich-text-container-2"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-size": "18px", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                  <AnimatedSpan y={10}>{content.talks[3]?.location ?? ""}</AnimatedSpan>
                                </p>
                              </div>
                            </div>
                        </Appear>
                      </div>
                    </div>
                  </div>
                </div>
              </AboutWrapperReveal>
            </div>
          </AboutBlockReveal>
          <AboutBlockReveal className={"todd-about__rich-text-container-14"} data-todd-name={content.clientsTitle} id={"selected-clients"}>
            <div className={cn("todd-about__container-2", TODD.card.shell)} data-border={true} data-todd-name={"Container"}>
              <AboutImageReveal className={"todd-about__card-image todd-about__img-4 todd-hide-mobile"} data-todd-name={"Img"}>
                <AboutCardImage src={whereArtCard} />
              </AboutImageReveal>
              <AboutWrapperReveal className={"todd-about__wrapper-4"} data-todd-name={"Wrapper"}>
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
          <AboutBlockReveal className={"todd-about__awwards"} data-todd-name={"Awwards"} id={"awwards"}>
            <div className={cn("todd-intro__wrapper-17", TODD.card.shell)} data-border={true} data-todd-name={"Container"}>
              <AboutImageReveal className={"todd-about__card-image todd-about__img-3 todd-hide-mobile"} data-todd-name={"Img"} style={{"transform": "rotate(-180deg)"}}>
                <AboutCardImage src={awardsImage} />
              </AboutImageReveal>
              <AboutWrapperReveal className={"todd-about__wrapper-2"} data-todd-name={"Wrapper"}>
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
                        <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__desktop-2"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
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
                              <AnimatedSpan y={10}>{content.awards[0]?.year ?? ""}</AnimatedSpan>
                            </p>
                          </div>
                        </div>
                    </Appear>
                  </div>
                  <div className={"ssr-variant"}>
                    <Appear id="yxvyew" className={"todd-about__rich-text-container-25"} style={{"opacity": "0.001", "transform": "none"}}>
                        <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__desktop-2"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
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
                        <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__desktop-2"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
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
                        <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__desktop-2"} data-border={true} data-todd-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
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
        </div>
      </div>
      <div className={"ssr-variant todd-hide-tablet todd-hide-desktop"}>
        <div className={cn(TODD.about.container, "todd-about__container")} data-todd-name={"Container"}>
          <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-todd-background-image-wrapper={true}>
            <img decoding={"async"} width={1920} height={1487} sizes={"(max-width: 809.98px) min(100vw, 1128px)"} srcSet={`${content.awardsMark}?scale-down-to=512&width=1920&height=1487 512w,${content.awardsMark}?scale-down-to=1024&width=1920&height=1487 1024w,${content.awardsMark}?width=1920&height=1487 1920w`} src={`${content.awardsMark}?width=1920&height=1487`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
          </div>
          <div className={"todd-about__title-4"} data-todd-name={"Title"}>
            <HiddenReveal
              variant="section-scroll-artwork"
              className="todd-about__twisted-mind-art"
              style={{ willChange: "transform", opacity: "0", transform: "translateY(40px)" }}
            >
              <img src={content.twistedMind} alt="" aria-hidden={true} />
            </HiddenReveal>
            <HiddenReveal className={"todd-about__icon"} data-todd-name={"Icon"} style={{"willChange": "transform", "opacity": "0", "transform": "none"}}>
              <div data-todd-component-type={"SVG"} data-todd-name={"Character"} data-todd-shadows className={"todd-about__character"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 75 73%22 overflow=%22visible%22><g><path d=%22M 69.088 29.126 L 72.767 28.461 L 74.737 30.278 L 74.212 31.838 L 70.861 32.831 L 74.737 35.032 L 75 36.6 L 73.029 37.991 L 74.147 39.711 C 74.147 39.711 73.885 41.399 71.191 41.085 C 71.191 41.085 73.162 42.952 70.073 43.549 C 70.073 43.549 70.796 44.805 70.271 45.666 C 69.745 46.525 63.765 44.541 63.765 44.541 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 14.324 56.059 C 14.324 56.059 12.358 57.271 9.732 57.221 C 7.106 57.172 4.568 56.46 4.568 56.46 C 4.568 56.46 2.142 54.685 1.3 54.755 C 0.458 54.826 0 56.46 0 56.46 L 11.126 69.068 C 11.126 69.068 17.217 66.929 18.562 60.908 C 19.906 54.886 14.324 56.062 14.324 56.062 Z M 44.115 64.12 C 44.115 64.12 42.422 69.584 42.713 73 L 59.057 70.555 C 59.057 70.555 61.182 69.874 61.312 68.335 C 61.403 67.243 60.061 67.039 57.141 67.089 C 54.221 67.138 53.862 61.431 53.862 61.431 L 44.112 64.115 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 9.23 51.426 L 19.55 63.364 L 34.932 49.797 L 21.432 37.475 L 12.764 44.975 Z M 41.226 48.255 L 41.853 65.78 L 58.272 60.63 L 56.296 40.127 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 16.643 15.957 C 16.643 15.957 22.098 12.328 24.243 12.033 C 26.386 11.739 30.574 14.543 30.574 14.543 C 30.574 14.543 36.713 24.588 39.246 24.785 C 41.778 24.981 50.059 22.135 50.059 22.135 C 50.059 22.135 55.028 20.664 57.851 21.743 C 60.675 22.821 64.182 31.256 64.182 31.256 L 60.969 42.93 L 45.187 46.658 C 45.187 46.658 44.017 47.64 36.71 46.658 C 29.404 45.676 17.6 39.398 17.6 39.398 L 14.888 35.377 L 11.771 26.057 L 16.641 15.954 Z%22 fill=%22rgb(41,120,243)%22></path><path d=%22M 8.45 33.239 L 13.322 39.127 L 30.563 25.393 L 27.446 18.625 L 15.465 27.061 Z M 65.929 25.197 L 67.908 24.804 L 71.101 25.841 L 63.787 46.219 L 60.131 46.478 L 57.916 45.389 Z%22 fill=%22rgb(244,99,57)%22></path><path d=%22M 13.327 39.179 L 14.414 41.915 L 18.181 41.915 L 18.81 45.617 L 24.283 45.617 L 25.628 50.677 L 30.568 51.219 L 34.062 54.29 L 38.906 50.316 L 42.226 52.122 L 44.109 50.135 L 48.147 50.766 L 50.299 47.07 L 54.337 47.604 L 54.964 45.347 L 57.92 45.441 L 65.933 25.249 L 64.178 24.545 L 61.066 26.558 L 59.272 25.293 L 55.681 29.527 L 52.902 28.453 L 50.12 30.262 L 48.058 28.927 L 44.738 31.616 L 42.406 30.443 L 39.085 32.519 L 37.2 30.443 L 34.868 31.231 L 33.524 28.453 L 30.568 28.003 L 30.568 25.445 Z%22 fill=%22rgb(247,244,237)%22></path><path d=%22M 36.423 11.771 C 36.423 11.771 33.773 14.874 33.685 19.123 C 33.599 23.374 38.482 26.929 38.482 26.929 L 44.366 28.144 C 44.366 28.144 47.811 27.212 50.052 24.641 C 52.293 22.07 51.948 16.434 51.948 16.434 C 51.948 16.434 50.655 12.617 48.931 11.402 C 47.208 10.187 43.848 8.617 43.848 8.617 L 36.42 11.769 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 36.968 9.38 L 36.702 4.741 C 36.702 4.741 36.432 0.218 36.921 0.008 C 37.41 -0.201 40.907 3.723 40.907 3.723 C 40.907 3.723 42.771 1.265 43.273 1.288 C 43.775 1.312 44.555 6.844 44.555 6.844 C 44.555 6.844 49.263 5.618 50.899 6.33 C 52.532 7.043 52.542 9.299 50.488 10.244 C 48.434 11.189 38.031 13.768 38.031 13.768 L 34.929 15.103 C 34.929 15.103 32.964 15.268 32.477 14.609 C 31.991 13.949 33.627 12.059 33.627 12.059 L 36.97 9.38 Z%22 fill=%22rgb(30,30,30)%22></path><path d=%22M 37.963 15.653 C 37.963 15.653 42.697 13.988 47.388 14.438 L 47.031 18.036 C 47.031 18.036 46.093 19.564 44.442 20.24 C 42.788 20.915 40.243 19.834 40.243 19.834 L 38.514 17.721 L 37.965 15.653 Z%22 fill=%22rgb(213,68,41)%22></path><path d=%22M 15.6 39.425 L 17.888 40.716 L 31.744 28.935 L 31.744 26.898 Z M 19.607 42.931 L 22.485 44.742 L 34.812 31.239 L 34.812 29.534 L 33.278 29.849 Z M 25.571 50.685 L 28.08 51.449 L 37.916 31.239 L 37.144 30.451 L 33.811 34.747 Z M 31.744 53.798 L 34.006 54.298 L 40.493 31.61 L 39.573 31.239 L 33.21 47.559 Z M 39.573 51.049 L 42.139 50.711 L 44.869 30.72 L 43.605 30.451 Z M 45.87 51.449 L 48.09 50.774 L 48.868 28.642 L 48.002 28.935 Z M 50.243 47.077 L 52.198 47.292 L 53.628 28.765 L 52.846 28.461 L 50.404 43.669 Z M 53.628 45.009 L 54.908 45.355 L 60.282 26.052 L 59.216 25.301 Z%22 fill=%22rgb(255,255,255)%22></path><path d=%22M 54.948 45.347 L 57.374 45.423 L 64.163 24.545 L 62.33 25.73 L 54.948 44.734%22 fill=%22rgb(255,255,255)%22></path><path d=%22M 21.098 17.714 L 25.505 16.795 L 26.569 18.096 C 26.569 18.096 27.253 20.316 22.692 22.533 C 22.692 22.533 23.529 25.67 22.084 26.206 C 20.641 26.743 19.653 24.829 19.653 24.829 C 19.653 24.829 20.565 27.738 19.348 28.196 C 18.132 28.654 16.384 26.513 16.384 26.513 C 16.384 26.513 17.297 30.034 15.851 30.644 C 14.408 31.256 12.508 29.649 12.508 29.649 L 13.116 32.021 C 13.116 32.021 11.379 33.385 10.76 33.168 C 9.564 32.749 8.556 28.576 8.556 28.576 C 8.556 28.576 7.718 23.832 9.923 20.083 C 10.695 18.769 14.255 15.797 14.255 15.797 L 19.195 15.797 L 21.096 17.711 Z%22 fill=%22rgb(252,211,172)%22></path></g></svg>')"}}>              </div>
            </HiddenReveal>
            <HiddenReveal variant="section-heading" className={"todd-about__title-text"} data-todd-name={"Title text"} id={"cf9z1u"} style={{ willChange: "transform", opacity: "0", transform: "translateY(20px)" }}>
              <h2 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LVNlbWlCb2xk", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss02' on, 'ss01' on, 'salt' on, 'ss03' on, 'ss04' on", "--todd-font-size": "50px", "--todd-font-weight": "600", "--todd-letter-spacing": "-3px", "--todd-line-height": "1em", "--todd-text-alignment": "center", "--todd-text-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))"}} className={"todd-text"}>
                <AboutMainTitle title={content.title} />
              </h2>
            </HiddenReveal>
            <div className={"todd-about__scribble todd-hide-mobile"} data-todd-name={"Scribble"}>
              <Scribble variant="type1" />
            </div>
          </div>
          <AboutBlockReveal className={"todd-intro__wrapper-me"} data-todd-name={"About me"} id={"about-1"} layout="stack">
            <div className={cn(TODD.about.card, TODD.card.shell)} data-border={true} data-todd-name={"Container"}>
              <AboutImageReveal className={"todd-about__card-image todd-about__img"} data-todd-name={"Img"}>
                <AboutCardImage src={neverGrowCard} />
              </AboutImageReveal>
              <AboutWrapperReveal className={"todd-about__wrapper"} data-todd-name={"Wrapper"} data-border={true} layout="stack">
                <div className={"todd-about__content-4"} data-todd-name={"Content"}>
                  <div className={"todd-about__title-wrap-4"} data-todd-name={"Title Wrap"}>
                    <AboutCardIcon src={toddSceneArt.neverGrowUpCardArt} className={"todd-intro__wrapper-22"} />
                    <Appear id="10d8ozj" className={"todd-about__title"} data-todd-name={"Title"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--todd-font-size": "32px", "--todd-font-weight": "700", "--todd-letter-spacing": "-1.2px", "--todd-line-height": "52px", "--todd-text-alignment": "center", "--todd-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"todd-text"}>
                          <AboutMeHeading heading={content.heading} />
                        </h3>
                    </Appear>
                  </div>
                  <Appear id="i446vz" className={"todd-about__rich-text-container-19"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                      <p dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss02' on, 'ss01' on, 'ss03' on, 'ss04' on, 'ss08' on, 'ss07' on, 'salt' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.1px", "--todd-line-height": "1.4em", "--todd-text-alignment": "left", "--todd-text-color": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))"}} className={"todd-text"}><AboutBodyRichText body={content.body} /></p>
                  </Appear>
                  <div className={"todd-about__rich-text-container-8"} data-todd-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                    <p dir={"auto"} style={{"--font-selector": "R0Y7R3JhcGUgTnV0cy1yZWd1bGFy", "--todd-font-family": "\"Grape Nuts\", sans-serif", "--todd-font-size": "38px", "--todd-text-color": "var(--token-a962588e-440d-4f71-ad7a-bd7fc38d62f3, rgb(255, 83, 36))"}} className={"todd-text"}>
                      <AboutHandwrittenName name={content.name} />
                    </p>
                  </div>
                </div>
              </AboutWrapperReveal>
            </div>
          </AboutBlockReveal>
          <AboutBlockReveal className={"todd-about__rich-text-container-20"} data-todd-name={content.talksTitle} id={"selected-talks"} layout="stack">
            <div className={cn("todd-intro__wrapper-24", TODD.card.shell)} data-border={true} data-todd-name={"Container"}>
              <AboutImageReveal className={"todd-about__card-image todd-about__img-2"} data-todd-name={"Img"}>
                <AboutCardImage src={timelineCard} />
              </AboutImageReveal>
              <AboutWrapperReveal className={"todd-about__wrapper-3"} data-todd-name={"Wrapper"} data-border={true} layout="stack">
                <div className={"todd-about__content"} data-todd-name={"Content"}>
                  <div className={"todd-about__title-wrap"} data-todd-name={"Title Wrap"}>
                    <AboutCardIcon src={toddSceneArt.timelineCardArt} className={"todd-about__variant"} />
                    <Appear id="zq3mu5" className={"todd-about__title-5"} data-todd-name={"Title"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--todd-font-family": "\"Averia Serif Libre\", sans-serif", "--todd-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--todd-font-size": "32px", "--todd-font-style": "italic", "--todd-letter-spacing": "-1.2px", "--todd-line-height": "52px", "--todd-text-alignment": "center", "--todd-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"todd-text"}>
                          {talksLead}
                          <span style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--todd-font-weight": "700"}} className={"todd-text"}> </span>
                          <span style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-style": "normal", "--todd-font-weight": "700"}} className={"todd-text"}>
                            {talksTail}
                          </span>
                        </h3>
                    </Appear>
                  </div>
                  <div className={"todd-about__content-5"} data-todd-name={"Content"}>
                    <div className={"todd-about__items-wrapper"} data-todd-name={"Items wrapper"}>
                      <Appear id="17sob6t" className={"todd-about__rich-text-container-5"} style={{"opacity": "0.001", "transform": "none"}}>
                          <div className={"todd-about__desktop-4 todd-about__desktop todd-about__mobile-2"} data-border={true} data-todd-name={"Mobile"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                            <div className={"todd-about__rich-text-container-3"}>
                              <div className={"todd-about__rich-text-container-18"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                  {content.talks[0]?.year?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-0-city-${wi}`} y={10}>{word}{wi < (content.talks[0]?.year?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                </p>
                              </div>
                              <div className={"todd-about__rich-text-container"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                </p>
                              </div>
                              <div className={"todd-about__rich-text-container-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[0]?.milestone?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-0-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                              </div>
                            </div>
                          </div>
                      </Appear>
                      <Appear id="qj8w5o" className={"todd-about__rich-text-container-21"} style={{"opacity": "0.001", "transform": "none"}}>
                          <div className={"todd-about__desktop-4 todd-about__desktop todd-about__mobile-2"} data-border={true} data-todd-name={"Mobile"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                            <div className={"todd-about__rich-text-container-3"}>
                              <div className={"todd-about__rich-text-container-18"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                  {content.talks[1]?.year?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-1-city-${wi}`} y={10}>{word}{wi < (content.talks[1]?.year?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                </p>
                              </div>
                              <div className={"todd-about__rich-text-container"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                </p>
                              </div>
                              <div className={"todd-about__rich-text-container-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[1]?.milestone?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-1-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                              </div>
                            </div>
                          </div>
                      </Appear>
                      <Appear id="1vmjjvi" className={"todd-about__rich-text-container-15"} style={{"opacity": "0.001", "transform": "none"}}>
                          <div className={"todd-about__desktop-4 todd-about__desktop todd-about__mobile-2"} data-border={true} data-todd-name={"Mobile"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                            <div className={"todd-about__rich-text-container-3"}>
                              <div className={"todd-about__rich-text-container-18"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                  {content.talks[2]?.year?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-2-city-${wi}`} y={10}>{word}{wi < (content.talks[2]?.year?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                </p>
                              </div>
                              <div className={"todd-about__rich-text-container"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                </p>
                              </div>
                              <div className={"todd-about__rich-text-container-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[2]?.milestone?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-2-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                              </div>
                            </div>
                          </div>
                      </Appear>
                      <Appear id="1okuu50" className={"todd-about__rich-text-container-12"} style={{"opacity": "0.001", "transform": "none"}}>
                          <div className={"todd-about__desktop-4 todd-about__desktop todd-about__mobile-2"} data-border={true} data-todd-name={"Mobile"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                            <div className={"todd-about__rich-text-container-3"}>
                              <div className={"todd-about__rich-text-container-18"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                  {content.talks[3]?.year?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-3-city-${wi}`} y={10}>{word}{wi < (content.talks[3]?.year?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                </p>
                              </div>
                              <div className={"todd-about__rich-text-container"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                </p>
                              </div>
                              <div className={"todd-about__rich-text-container-10"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-alignment": "center", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[3]?.milestone?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-3-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                              </div>
                            </div>
                          </div>
                      </Appear>
                    </div>
                  </div>
                </div>
              </AboutWrapperReveal>
            </div>
          </AboutBlockReveal>
          <AboutBlockReveal className={"todd-about__rich-text-container-14"} data-todd-name={content.clientsTitle} id={"selected-clients"} layout="stack">
            <div className={cn("todd-about__container-2", TODD.card.shell)} data-border={true} data-todd-name={"Container"}>
              <AboutImageReveal className={"todd-about__card-image todd-about__img-4"} data-todd-name={"Img"}>
                <AboutCardImage src={whereArtCard} />
              </AboutImageReveal>
              <AboutWrapperReveal className={"todd-about__wrapper-4"} data-todd-name={"Wrapper"} data-border={true} layout="stack">
                <div className={"todd-about__content-3"} data-todd-name={"Content"}>
                  <div className={"todd-about__title-wrap-2"} data-todd-name={"Title Wrap"}>
                    <AboutCardIcon src={toddSceneArt.whereArtCardArt} className={"todd-intro__wrapper-6"} />
                    <Appear id="10qxt3k" className={"todd-about__title-2"} data-todd-name={"Title"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--todd-font-family": "\"Averia Serif Libre\", sans-serif", "--todd-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--todd-font-size": "32px", "--todd-font-style": "italic", "--todd-letter-spacing": "-1.2px", "--todd-line-height": "52px", "--todd-text-alignment": "center", "--todd-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"todd-text"}>
                          {clientsLead}
                          <span style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--todd-font-weight": "700"}} className={"todd-text"}> </span>
                          <span style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-style": "normal", "--todd-font-weight": "700"}} className={"todd-text"}>
                            {clientsTail}
                          </span>
                        </h3>
                    </Appear>
                  </div>
                  <Appear id="15capyb" className={"todd-about__rich-text-container-4"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                      <p dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'ss02' on, 'ss01' on, 'ss03' on, 'ss04' on, 'ss08' on, 'ss07' on, 'salt' on", "--todd-letter-spacing": "-0.1px", "--todd-line-height": "1.4em", "--todd-text-alignment": "left", "--todd-text-color": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))"}} className={"todd-text"}><AboutClientsList clients={content.clients} /></p>
                  </Appear>
                </div>
              </AboutWrapperReveal>
            </div>
          </AboutBlockReveal>
          <AboutBlockReveal className={"todd-about__awwards"} data-todd-name={"Awwards"} id={"awwards"} layout="stack">
            <div className={cn("todd-intro__wrapper-17", TODD.card.shell)} data-border={true} data-todd-name={"Container"}>
              <AboutImageReveal className={"todd-about__card-image todd-about__img-3"} data-todd-name={"Img"} style={{ transform: "rotate(-180deg)" }}>
                <AboutCardImage src={awardsImage} />
              </AboutImageReveal>
              <AboutWrapperReveal className={"todd-about__wrapper-2"} data-todd-name={"Wrapper"} data-border={true} layout="stack">
                <div className={"todd-about__content-2"} data-todd-name={"Content"}>
                  <div className={"todd-about__title-wrap-3"} data-todd-name={"Title Wrap"}>
                    <AboutCardIcon src={toddSceneArt.byTheNumbersCardArt} className={"todd-intro__wrapper-2"} />
                    <Appear id="1i8t5dv" className={"todd-about__title-3"} data-todd-name={"Title"} data-todd-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--todd-font-family": "\"Averia Serif Libre\", sans-serif", "--todd-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--todd-font-size": "32px", "--todd-font-style": "italic", "--todd-font-weight": "700", "--todd-letter-spacing": "-1.2px", "--todd-line-height": "52px", "--todd-text-alignment": "center", "--todd-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"todd-text"}>
                          {content.awardsTitle}
                        </h3>
                    </Appear>
                  </div>
                  <Appear id="87ac2n" className={"todd-about__rich-text-container-16"} style={{"opacity": "0.001", "transform": "none"}}>
                      <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__mobile"} data-border={true} data-todd-name={"Mobile"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                        <div className={"todd-about__rich-text-container-24"}>
                          <div className={"todd-about__rich-text-container-22"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                              {content.awards[0]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                          <div className={"todd-about__rich-text-container-17"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}>/</AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                            </p>
                          </div>
                          <div className={"todd-about__rich-text-container-13"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                              {content.awards[0]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                        </div>
                      </div>
                  </Appear>
                  <Appear id="yxvyew" className={"todd-about__rich-text-container-25"} style={{"opacity": "0.001", "transform": "none"}}>
                      <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__mobile"} data-border={true} data-todd-name={"Mobile"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                        <div className={"todd-about__rich-text-container-24"}>
                          <div className={"todd-about__rich-text-container-22"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                              {content.awards[1]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-1-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                          <div className={"todd-about__rich-text-container-17"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}>/</AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                            </p>
                          </div>
                          <div className={"todd-about__rich-text-container-13"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                              {content.awards[1]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-1-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                        </div>
                      </div>
                  </Appear>
                  <Appear id="1i5tzip" className={"todd-about__rich-text-container-9"} style={{"opacity": "0.001", "transform": "none"}}>
                      <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__mobile"} data-border={true} data-todd-name={"Mobile"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                        <div className={"todd-about__rich-text-container-24"}>
                          <div className={"todd-about__rich-text-container-22"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                              {content.awards[2]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-2-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                          <div className={"todd-about__rich-text-container-17"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}>/</AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                            </p>
                          </div>
                          <div className={"todd-about__rich-text-container-13"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                              {content.awards[2]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                        </div>
                      </div>
                  </Appear>
                  <Appear id="1mevtjy" className={"todd-about__rich-text-container-11"} style={{"opacity": "0.001", "transform": "none"}}>
                      <div className={"todd-about__desktop-3 todd-about__desktop-2 todd-about__mobile"} data-border={true} data-todd-name={"Mobile"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                        <div className={"todd-about__rich-text-container-24"}>
                          <div className={"todd-about__rich-text-container-22"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                              {content.awards[3]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-3-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                          <div className={"todd-about__rich-text-container-17"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "500", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}>/</AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                            </p>
                          </div>
                          <div className={"todd-about__rich-text-container-13"} data-todd-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--todd-link-text-color": "rgb(0, 153, 255)", "--todd-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"todd-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--todd-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--todd-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--todd-font-weight": "700", "--todd-letter-spacing": "-0.02em", "--todd-line-height": "1.4em", "--todd-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                              {content.awards[3]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-3-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                        </div>
                      </div>
                  </Appear>
                </div>
              </AboutWrapperReveal>
            </div>
          </AboutBlockReveal>
        </div>
      </div>
    </section>
  );
}
