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
import { AboutBodyRichText, AboutClientsList, AboutMainTitle, AboutMeHeading } from "@/features/AboutRichText";
import { Appear } from "@/features/Appear";
import { Scribble } from "@/entities/Scribble";
import { LENIS_SCROLL_EVENT } from "@/features/SmoothScroll";

const ABOUT_IMAGE_REVEAL_SCALE = 0.757;

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

type AboutRevealShellProps = {
  children: ReactNode;
  className?: string;
  id?: string;
  "data-framer-name"?: string;
  "data-border"?: boolean;
  style?: CSSProperties;
};

const AboutBlockRevealedContext = createContext(false);

function useAboutBlockReveal() {
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
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      const visibleHeight = Math.min(rect.bottom, viewportHeight) - Math.max(rect.top, 0);
      if (visibleHeight >= rect.height * 0.5) setRevealed(true);
    };

    window.addEventListener(LENIS_SCROLL_EVENT, sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    window.addEventListener("resize", sync, { passive: true });
    sync();

    return () => {
      window.removeEventListener(LENIS_SCROLL_EVENT, sync);
      window.removeEventListener("scroll", sync);
      window.removeEventListener("resize", sync);
    };
  }, [reduced, isServerRender]);

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
  "data-framer-name": dataFramerName,
  style,
}: AboutRevealShellProps) {
  const { ref, revealed, isServerRender, reduced } = useAboutBlockReveal();

  if (isServerRender) {
    return (
      <AboutBlockRevealedContext.Provider value={false}>
        <div
          className={className}
          data-framer-name={dataFramerName}
          id={id}
          style={{ ...(style ?? {}), ...ABOUT_BLOCK_SSR_STYLE }}
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
          data-framer-name={dataFramerName}
          id={id}
          style={{ ...(style ?? {}), willChange: "transform", opacity: 1, transform: "scale(0.95)" }}
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
        data-framer-name={dataFramerName}
        id={id}
        style={{ ...(style ?? {}), willChange: "transform", opacity: 1 }}
        initial={{ scale: 1 }}
        animate={revealed ? { scale: 0.95 } : { scale: 1 }}
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
  "data-framer-name": dataFramerName,
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
        data-framer-name={dataFramerName}
        style={{ ...motionStyle, transform: ssrTransform }}
      >
        {children}
      </div>
    );
  }

  if (reduced) {
    const reducedTransform = baseRotate
      ? `rotate(-180deg) scale(${ABOUT_IMAGE_REVEAL_SCALE})`
      : `scale(${ABOUT_IMAGE_REVEAL_SCALE})`;
    return (
      <div
        ref={ref}
        className={className}
        data-framer-name={dataFramerName}
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
      data-framer-name={dataFramerName}
      style={motionStyle}
      initial={{ scale: 1, rotate: baseRotate }}
      animate={
        parentRevealed
          ? { scale: ABOUT_IMAGE_REVEAL_SCALE, rotate: baseRotate }
          : { scale: 1, rotate: baseRotate }
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
  "data-framer-name": dataFramerName,
  "data-border": dataBorder,
  style,
}: AboutRevealShellProps) {
  const ref = useRef<HTMLDivElement>(null);
  const parentRevealed = useContext(AboutBlockRevealedContext);
  const isServerRender = useIsServerRender();
  const reduced = useReducedMotion();
  const shellStyle: CSSProperties = { ...(style ?? {}), ...ABOUT_WRAPPER_SSR_STYLE };
  delete shellStyle.transform;

  if (isServerRender) {
    return (
      <div
        className={className}
        data-framer-name={dataFramerName}
        data-border={dataBorder}
        style={{ ...shellStyle, ...ABOUT_WRAPPER_SSR_STYLE }}
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
        data-framer-name={dataFramerName}
        data-border={dataBorder}
        style={{ ...shellStyle, willChange: "transform", opacity: 1, transform: "translateY(-50%)" }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={className}
      data-framer-name={dataFramerName}
      data-border={dataBorder}
      style={{ ...shellStyle, willChange: "transform", opacity: 1 }}
      initial={{ transform: "translateY(calc(-50% + 70px))" }}
      animate={
        parentRevealed
          ? { transform: "translateY(-50%)" }
          : { transform: "translateY(calc(-50% + 70px))" }
      }
      transition={{ type: "spring", ...WRAPPER_SPRING }}
    >
      {children}
    </motion.div>
  );
}

export function About({ content }: { content: AboutContent }) {
  const awardsImage = content.images[2] ?? "/assets/images/image-48cb881f.png";
  const [talksLead, talksTail = ""] = content.talksTitle.split(/\s+/);
  const [clientsLead, clientsTail = ""] = content.clientsTitle.split(/\s+/);
  return (
    <section className={"framer-hj4pce"} data-framer-name={"About"} id={"about"}>
      <div className={"ssr-variant hidden-g5y12p"}>
        <div className={"framer-1qkn2mb"} data-framer-name={"Container"}>
          <div className={"framer-69y99q"} data-framer-name={"Title"}>
            <HiddenReveal className={"framer-ohm6pp"} data-framer-name={"Icon"} style={{"willChange": "transform", "opacity": "0", "transform": "none"}}>
              <div data-framer-component-type={"SVG"} data-framer-name={"Character"} data-framer-shadows className={"framer-qbzodd"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 89 87%22 overflow=%22visible%22><g><path d=%22M 81.984 34.712 L 86.35 33.919 L 88.688 36.085 L 88.065 37.944 L 84.088 39.127 L 88.688 41.751 L 89 43.62 L 86.661 45.276 L 87.988 47.326 C 87.988 47.326 87.676 49.339 84.48 48.964 C 84.48 48.964 86.819 51.189 83.153 51.9 C 83.153 51.9 84.011 53.398 83.388 54.424 C 82.764 55.448 75.668 53.083 75.668 53.083 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 16.997 66.81 C 16.997 66.81 14.665 68.255 11.549 68.195 C 8.432 68.136 5.421 67.288 5.421 67.288 C 5.421 67.288 2.542 65.172 1.543 65.256 C 0.543 65.341 0 67.288 0 67.288 L 13.202 82.314 C 13.202 82.314 20.431 79.765 22.027 72.588 C 23.622 65.412 16.997 66.813 16.997 66.813 Z M 52.35 76.417 C 52.35 76.417 50.341 82.928 50.687 87 L 70.081 84.086 C 70.081 84.086 72.602 83.275 72.756 81.44 C 72.864 80.139 71.272 79.896 67.807 79.955 C 64.343 80.014 63.917 73.213 63.917 73.213 L 52.347 76.411 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 10.953 61.288 L 23.199 75.516 L 41.452 59.347 L 25.433 44.661 L 15.146 53.6 Z M 48.922 57.51 L 49.665 78.395 L 69.15 72.258 L 66.805 47.822 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 19.75 19.017 C 19.75 19.017 26.223 14.693 28.769 14.34 C 31.311 13.991 36.282 17.332 36.282 17.332 C 36.282 17.332 43.566 29.304 46.571 29.538 C 49.577 29.772 59.403 26.381 59.403 26.381 C 59.403 26.381 65.3 24.627 68.65 25.913 C 72.001 27.198 76.163 37.251 76.163 37.251 L 72.35 51.163 L 53.621 55.606 C 53.621 55.606 52.233 56.776 43.563 55.606 C 34.893 54.436 20.886 46.954 20.886 46.954 L 17.667 42.162 L 13.968 31.054 L 19.747 19.014 Z%22 fill=%22rgb(41,120,243)%22></path><path d=%22M 10.027 39.614 L 15.809 46.631 L 36.268 30.263 L 32.569 22.197 L 18.352 32.25 Z M 78.236 30.029 L 80.584 29.561 L 84.373 30.796 L 75.693 55.083 L 71.355 55.392 L 68.727 54.094 Z%22 fill=%22rgb(244,99,57)%22></path><path d=%22M 15.815 46.693 L 17.104 49.953 L 21.575 49.953 L 22.322 54.365 L 28.816 54.365 L 30.411 60.396 L 36.274 61.042 L 40.42 64.702 L 46.168 59.965 L 50.109 62.118 L 52.342 59.75 L 57.134 60.502 L 59.689 56.097 L 64.48 56.733 L 65.224 54.044 L 68.732 54.156 L 78.241 30.091 L 76.158 29.252 L 72.465 31.651 L 70.336 30.144 L 66.075 35.189 L 62.777 33.91 L 59.476 36.066 L 57.029 34.475 L 53.089 37.679 L 50.321 36.281 L 46.381 38.755 L 44.144 36.281 L 41.377 37.22 L 39.782 33.91 L 36.274 33.373 L 36.274 30.325 Z%22 fill=%22rgb(247,244,237)%22></path><path d=%22M 43.222 14.029 C 43.222 14.029 40.078 17.726 39.973 22.79 C 39.871 27.857 45.665 32.094 45.665 32.094 L 52.647 33.542 C 52.647 33.542 56.736 32.431 59.395 29.367 C 62.055 26.303 61.644 19.586 61.644 19.586 C 61.644 19.586 60.111 15.037 58.065 13.589 C 56.02 12.141 52.033 10.269 52.033 10.269 L 43.218 14.026 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 43.868 11.179 L 43.554 5.651 C 43.554 5.651 43.233 0.259 43.813 0.01 C 44.393 -0.24 48.543 4.437 48.543 4.437 C 48.543 4.437 50.755 1.507 51.35 1.535 C 51.946 1.563 52.871 8.156 52.871 8.156 C 52.871 8.156 58.459 6.696 60.4 7.545 C 62.337 8.393 62.35 11.083 59.912 12.209 C 57.475 13.335 45.13 16.409 45.13 16.409 L 41.449 18 C 41.449 18 39.117 18.196 38.54 17.41 C 37.963 16.624 39.904 14.371 39.904 14.371 L 43.871 11.179 Z%22 fill=%22rgb(30,30,30)%22></path><path d=%22M 45.049 18.655 C 45.049 18.655 50.667 16.671 56.233 17.207 L 55.811 21.494 C 55.811 21.494 54.697 23.316 52.738 24.121 C 50.775 24.926 47.755 23.638 47.755 23.638 L 45.703 21.12 L 45.052 18.655 Z%22 fill=%22rgb(213,68,41)%22></path><path d=%22M 18.512 46.986 L 21.227 48.524 L 37.669 34.484 L 37.669 32.057 Z M 23.267 51.164 L 26.682 53.323 L 41.31 37.23 L 41.31 35.199 L 39.49 35.573 Z M 30.345 60.405 L 33.322 61.316 L 44.994 37.23 L 44.078 36.291 L 40.122 41.411 Z M 37.669 64.115 L 40.354 64.711 L 48.052 37.673 L 46.959 37.23 L 39.41 56.68 Z M 46.959 60.839 L 50.005 60.437 L 53.244 36.612 L 51.745 36.291 Z M 54.432 61.316 L 57.067 60.511 L 57.99 34.135 L 56.962 34.484 Z M 59.622 56.106 L 61.942 56.362 L 63.639 34.281 L 62.71 33.919 L 59.813 52.044 Z M 63.639 53.641 L 65.157 54.053 L 71.535 31.049 L 70.27 30.153 Z%22 fill=%22rgb(255,255,255)%22></path><path d=%22M 65.205 54.044 L 68.084 54.134 L 76.14 29.252 L 73.965 30.665 L 65.205 53.313%22 fill=%22rgb(255,255,255)%22></path><path d=%22M 25.037 21.111 L 30.266 20.016 L 31.528 21.566 C 31.528 21.566 32.34 24.212 26.928 26.855 C 26.928 26.855 27.921 30.593 26.206 31.232 C 24.494 31.872 23.321 29.591 23.321 29.591 C 23.321 29.591 24.404 33.057 22.96 33.603 C 21.516 34.149 19.443 31.597 19.443 31.597 C 19.443 31.597 20.526 35.794 18.81 36.521 C 17.098 37.251 14.843 35.335 14.843 35.335 L 15.564 38.162 C 15.564 38.162 13.503 39.787 12.769 39.528 C 11.35 39.029 10.153 34.056 10.153 34.056 C 10.153 34.056 9.159 28.402 11.776 23.934 C 12.692 22.368 16.916 18.827 16.916 18.827 L 22.778 18.827 L 25.034 21.108 Z%22 fill=%22rgb(252,211,172)%22></path></g></svg>')"}}>              </div>
            </HiddenReveal>
            <div className={"framer-cf9z1u"} data-framer-name={"Title text"} id={"cf9z1u"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
              <h2 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LVNlbWlCb2xk", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'ss02' on, 'ss01' on, 'salt' on, 'ss03' on, 'ss04' on", "--framer-font-size": "72px", "--framer-font-weight": "600", "--framer-letter-spacing": "-3px", "--framer-line-height": "1em", "--framer-text-alignment": "center", "--framer-text-color": "rgb(9, 9, 9)"}} className={"framer-text"}>
                <AboutMainTitle title={content.title} />
              </h2>
            </div>
            <div className={"ssr-variant"}>
              <div className={"framer-1l4dp1y-container hidden-g5y12p"} data-framer-name={"Scribble"}>
                <Scribble variant="type1" />
              </div>
            </div>
          </div>
          <AboutBlockReveal className={"framer-13baukc"} data-framer-name={"About me"} id={"about-1"}>
            <div className={"framer-swn67u"} data-border={true} data-framer-name={"Container"}>
              <AboutImageReveal className={"framer-1298i0o hidden-g5y12p"} data-framer-name={"Img"}>
                <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                  <img decoding={"async"} loading={"lazy"} width={4000} height={3098} sizes={"(min-width: 1200px) 2000px, (min-width: 810px) and (max-width: 1199.98px) 2000px, (max-width: 809.98px) 2000px"} srcSet={`${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=512&width=4000&height=3098 512w,${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=1024&width=4000&height=3098 1024w,${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=2048&width=4000&height=3098 2048w,${content.images[0] ?? "/assets/images/image-60567843.png"}?width=4000&height=3098 4000w`} src={`${content.images[0] ?? "/assets/images/image-60567843.png"}?width=4000&height=3098`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                </div>
              </AboutImageReveal>
              <AboutWrapperReveal className={"framer-1e8y5is"} data-framer-name={"Wrapper"}>
                <div className={"framer-1esnplr"} data-framer-name={"Content"}>
                  <div className={"framer-paauon"} data-framer-name={"Title Wrap"}>
                    <div data-framer-component-type={"SVG"} data-framer-name={"Icon"} data-framer-shadows className={"framer-1q6kjd0"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 64 87%22 overflow=%22visible%22><g><path d=%22M 0 71.388 L 1.952 71.991 C 1.952 71.991 7.124 70.327 12.003 69.446 C 16.882 68.565 28.104 69.935 28.104 69.935 C 28.104 69.935 34.085 71.726 34.499 73.815 C 34.916 75.903 34.024 78.168 34.024 78.168 C 34.024 78.168 30.219 79.241 26.948 80.493 C 23.677 81.744 20.525 83.118 21.299 85.382 C 22.072 87.649 27.9 87.349 30.636 85.621 C 33.371 83.891 35.69 81.866 35.69 81.866 L 48.091 78.851 C 48.091 78.851 55.686 77.436 61.096 77.532 L 61.622 73.575 C 61.622 73.575 49.31 73.575 38.413 77.344 C 38.413 77.344 39.54 73.198 36.062 70.557 C 32.585 67.916 29.015 67.46 29.015 67.46 L 21.12 66.412 L 10.407 66.885 L 1.669 69.618 L 0.003 71.388 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 30.915 7.045 L 26.892 1.23 L 23.549 0 L 20.686 0.342 L 15.708 2.941 L 12.705 7.933 L 13.523 12.19 L 16.593 17.645 Z%22 fill=%22rgb(255,83,36)%22></path><path d=%22M 18.105 19.883 C 18.105 19.883 20.974 16.255 24.592 13.378 C 28.209 10.5 32.824 9.874 32.824 9.874 L 62.138 54.782 L 56.275 55.782 L 54.279 59.033 L 49.164 59.033 L 47.543 63.035 L 18.105 19.88 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 8.099 45.541 C 8.099 43.536 11.192 30.582 11.192 30.582 L 21.561 23.467 C 21.561 23.467 34.293 19.271 35.022 19.271 C 35.751 19.271 42.117 22.19 41.933 25.473 C 41.748 28.756 29.471 36.538 29.471 36.538 L 44.101 57.983 L 30.293 61.953 L 12.832 57.575 L 8.103 45.535 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 35.733 14.236 C 35.733 14.236 44.163 8.702 44.787 8.293 C 45.411 7.884 50.822 6.37 50.822 6.37 L 54.239 7.255 L 56.003 10.305 C 56.003 10.305 56.223 12.342 55.34 13.834 C 54.458 15.325 49.443 19.748 49.443 19.748 L 43.105 25.535 L 35.733 14.239 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 49.411 19.691 L 55.143 18.474 L 59.169 19.081 L 61.153 22.179 L 60.105 26.545 L 50.357 36.636 L 43.405 45.007 L 40.427 45.007 L 37.892 43.512 L 36.845 40.97 L 37.507 34.781 L 43.074 25.478 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 59.046 27.552 L 62.139 31.701 L 62.429 36.392 L 61.104 40.467 L 57.999 44.967 C 57.999 44.967 52.435 49.802 51.582 50.428 C 50.728 51.054 46.416 50.827 46.416 50.827 L 44.041 48.892 L 43.356 44.967 L 50.308 36.596 L 59.043 27.552 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 62.236 54.786 L 64 74.743 L 61.698 75.244 L 47.644 63.041 L 49.265 59.04 L 54.379 59.04 L 56.373 55.786 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 57.014 71.194 L 58.603 68.048 L 61.749 67.368 L 63.335 67.735 L 63.953 74.719 L 61.651 75.221 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 32.796 9.836 L 33.187 8.112 L 29.64 3.663 L 26.009 4.417 L 19.752 7.837 L 15.522 12.42 L 14.293 14.745 L 15.112 16.865 L 17.226 19.944 L 18.076 19.845 L 26.64 12.487 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 59.16 27.642 L 43.473 43.744 L 44.766 45.533 L 60.192 29.025 Z M 43.059 24.321 L 48.447 19.214 L 50.17 20.75 L 44.158 25.528 Z%22 fill=%22rgb(244,99,57)%22></path></g></svg>')"}}>                    </div>
                    <Appear id="10d8ozj" className={"framer-10d8ozj"} data-framer-name={"Title"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--framer-font-size": "36px", "--framer-font-weight": "700", "--framer-letter-spacing": "-1.2px", "--framer-line-height": "52px", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                          <AboutMeHeading heading={content.heading} />
                        </h3>
                    </Appear>
                  </div>
                  <Appear id="i446vz" className={"framer-i446vz"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                      <p dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'ss02' on, 'ss01' on, 'ss03' on, 'ss04' on, 'ss08' on, 'ss07' on, 'salt' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "0.2px", "--framer-line-height": "1.4em", "--framer-text-alignment": "left", "--framer-text-color": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))"}} className={"framer-text"}><AboutBodyRichText body={content.body} /></p>
                  </Appear>
                  <div className={"framer-1gfatq4"} data-framer-component-type={"RichTextContainer"} style={{"transform": "translateX(-50%)"}}>
                    <p dir={"auto"} style={{"--font-selector": "R0Y7R3JhcGUgTnV0cy1yZWd1bGFy", "--framer-font-family": "\"Grape Nuts\", sans-serif", "--framer-font-size": "56px", "--framer-text-color": "var(--token-a962588e-440d-4f71-ad7a-bd7fc38d62f3, rgb(255, 83, 36))"}} className={"framer-text"}>
                      {content.name}
                    </p>
                  </div>
                </div>
              </AboutWrapperReveal>
            </div>
          </AboutBlockReveal>
          <AboutBlockReveal className={"framer-k8tsnc"} data-framer-name={content.talksTitle} id={"selected-talks"}>
            <div className={"framer-1s373ma"} data-border={true} data-framer-name={"Container"}>
              <AboutImageReveal className={"framer-1pf38c9 hidden-g5y12p"} data-framer-name={"Img"}>
                <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                  <img decoding={"async"} loading={"lazy"} width={4000} height={3098} sizes={"(min-width: 1200px) 2000px, (min-width: 810px) and (max-width: 1199.98px) 2000px, (max-width: 809.98px) 2000px"} srcSet={`${content.images[1] ?? "/assets/images/image-4f67e4d0.png"}?scale-down-to=512&width=4000&height=3098 512w,${content.images[1] ?? "/assets/images/image-4f67e4d0.png"}?scale-down-to=1024&width=4000&height=3098 1024w,${content.images[1] ?? "/assets/images/image-4f67e4d0.png"}?scale-down-to=2048&width=4000&height=3098 2048w,${content.images[1] ?? "/assets/images/image-4f67e4d0.png"}?width=4000&height=3098 4000w`} src={`${content.images[1] ?? "/assets/images/image-4f67e4d0.png"}?width=4000&height=3098`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                </div>
              </AboutImageReveal>
              <AboutWrapperReveal className={"framer-4lsr4v"} data-framer-name={"Wrapper"}>
                <div className={"framer-19g0nul"} data-framer-name={"Content"}>
                  <div className={"framer-79wp9j"} data-framer-name={"Title Wrap"}>
                    <div data-framer-component-type={"SVG"} data-framer-name={"Icon"} data-framer-shadows className={"framer-p5rqc1"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 68.964 73.94%22 overflow=%22visible%22><g><path d=%22M 37.681 56.362 L 38.608 73.94 L 42.5 73.94 C 42.5 73.94 42.315 59.129 40.832 55.873 L 37.681 56.365 Z M 35.582 56.487 L 36.633 61.156 C 36.633 61.156 37.002 64.536 34.408 67.425 C 31.814 70.314 29.095 70.989 26.996 70.989 C 24.896 70.989 24.649 69.084 24.649 69.084 C 24.649 69.084 24.354 68.31 25.948 67.425 C 25.948 67.425 28.962 67.482 30.817 66.128 C 32.672 64.777 33.394 61.119 32.036 57.985 Z%22 fill=%22rgb(41,120,243)%22></path><path d=%22M 18.446 1.334 L 37.237 0 L 47.826 4.005 L 54.537 15.726 C 54.537 15.726 58.713 31.603 57.52 41.097 C 56.327 50.593 42.755 57.416 42.755 57.416 L 30.526 59.641 C 30.526 59.641 21.131 58.751 16.656 56.08 C 12.181 53.409 12.778 45.102 12.778 45.102 L 34.402 37.682 C 34.402 37.682 27.54 23.736 28.884 16.614 L 25.631 18.078 C 25.631 18.078 22.969 19.5 21.145 19.059 C 19.321 18.618 18.335 16.557 18.335 16.557 C 18.335 16.557 18.236 13.516 18.582 12.877 C 18.929 12.239 24.006 10.277 24.006 10.277 C 24.006 10.277 18.335 10.376 17.301 9.344 C 16.267 8.315 15.969 6.645 16.068 4.929 C 16.167 3.214 18.449 1.328 18.449 1.328 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 39.733 13.625 C 39.733 13.625 43.159 14.513 44.216 13.625 C 45.273 12.738 45.946 10.008 45.946 10.008 L 47.975 10.259 C 47.975 10.259 48.398 13.914 46.284 15.889 C 44.173 17.865 39.105 16.647 39.105 16.647 Z%22 fill=%22rgb(255,255,255)%22></path><path d=%22M 51.148 11.598 L 60.58 3.806 L 62.842 4.19 C 62.842 4.19 61.987 10.555 57.697 15.55 L 68.964 18.678 C 68.964 18.678 65.93 24.167 55.836 24.769 Z%22 fill=%22rgb(255,83,36)%22></path><path d=%22M 33.792 29.177 C 38.423 29.177 41.477 33.196 42.756 37.411 C 44.034 41.625 43.543 46.232 36.352 49.27 C 29.161 52.309 1.872 42.801 1.872 42.801 C 1.872 42.801 0 42.018 0 40.449 C 0 38.88 15.271 33.589 15.271 33.589 L 33.792 29.18 Z%22 fill=%22rgb(41,120,243)%22></path></g></svg>')"}}>                    </div>
                    <Appear id="zq3mu5" className={"framer-zq3mu5"} data-framer-name={"Title"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--framer-font-size": "36px", "--framer-font-style": "italic", "--framer-letter-spacing": "-1.2px", "--framer-line-height": "52px", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                          {talksLead}
                          <span style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--framer-font-weight": "700"}} className={"framer-text"}> </span>
                          <span style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-style": "normal", "--framer-font-weight": "700"}} className={"framer-text"}>
                            {talksTail}
                          </span>
                        </h3>
                    </Appear>
                  </div>
                  <div className={"framer-1ggzaxr"} data-framer-name={"Content"}>
                    <div className={"framer-jtwcqv"} data-framer-name={"Items wrapper"}>
                      <div className={"ssr-variant"}>
                        <Appear id="17sob6t" className={"framer-17sob6t-container"} style={{"opacity": "0.001", "transform": "none"}}>
                            <div className={"framer-i1MX6 framer-19shc8e framer-v-19shc8e"} data-border={true} data-framer-name={"Desktop"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                              <div className={"framer-14p3me6"}>
                                <div className={"framer-i1klgo"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                    {content.talks[0]?.city?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-0-city-${wi}`} y={10}>{word}{wi < (content.talks[0]?.city?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"framer-103fef5"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                                <div className={"framer-1ic6ub0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[0]?.event?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-0-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"framer-1famhjy"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                              </div>
                              <div className={"framer-10mewzj"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                  <AnimatedSpan y={10}>{content.talks[0]?.year ?? ""}</AnimatedSpan>
                                </p>
                              </div>
                            </div>
                        </Appear>
                      </div>
                      <div className={"ssr-variant"}>
                        <Appear id="qj8w5o" className={"framer-qj8w5o-container"} style={{"opacity": "0.001", "transform": "none"}}>
                            <div className={"framer-i1MX6 framer-19shc8e framer-v-19shc8e"} data-border={true} data-framer-name={"Desktop"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                              <div className={"framer-14p3me6"}>
                                <div className={"framer-i1klgo"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                    {content.talks[1]?.city?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-1-city-${wi}`} y={10}>{word}{wi < (content.talks[1]?.city?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"framer-103fef5"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                                <div className={"framer-1ic6ub0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[1]?.event?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-1-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"framer-1famhjy"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                              </div>
                              <div className={"framer-10mewzj"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                  <AnimatedSpan y={10}>{content.talks[1]?.year ?? ""}</AnimatedSpan>
                                </p>
                              </div>
                            </div>
                        </Appear>
                      </div>
                      <div className={"ssr-variant"}>
                        <Appear id="1vmjjvi" className={"framer-1vmjjvi-container"} style={{"opacity": "0.001", "transform": "none"}}>
                            <div className={"framer-i1MX6 framer-19shc8e framer-v-19shc8e"} data-border={true} data-framer-name={"Desktop"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                              <div className={"framer-14p3me6"}>
                                <div className={"framer-i1klgo"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                    {content.talks[2]?.city?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-2-city-${wi}`} y={10}>{word}{wi < (content.talks[2]?.city?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"framer-103fef5"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                                <div className={"framer-1ic6ub0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[2]?.event?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-2-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"framer-1famhjy"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                              </div>
                              <div className={"framer-10mewzj"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                  <AnimatedSpan y={10}>{content.talks[2]?.year ?? ""}</AnimatedSpan>
                                </p>
                              </div>
                            </div>
                        </Appear>
                      </div>
                      <div className={"ssr-variant"}>
                        <Appear id="1okuu50" className={"framer-1okuu50-container"} style={{"opacity": "0.001", "transform": "none"}}>
                            <div className={"framer-i1MX6 framer-19shc8e framer-v-19shc8e"} data-border={true} data-framer-name={"Desktop"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                              <div className={"framer-14p3me6"}>
                                <div className={"framer-i1klgo"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                    {content.talks[3]?.city?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-3-city-${wi}`} y={10}>{word}{wi < (content.talks[3]?.city?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"framer-103fef5"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                                <div className={"framer-1ic6ub0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[3]?.event?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-3-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                                </div>
                                <div className={"framer-1famhjy"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                  <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}>/</AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                    <AnimatedSpan y={10}> </AnimatedSpan>
                                  </p>
                                </div>
                              </div>
                              <div className={"framer-10mewzj"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                  <AnimatedSpan y={10}>{content.talks[3]?.year ?? ""}</AnimatedSpan>
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
          <AboutBlockReveal className={"framer-1s4qvvo"} data-framer-name={content.clientsTitle} id={"selected-clients"}>
            <div className={"framer-xttiuj"} data-border={true} data-framer-name={"Container"}>
              <AboutImageReveal className={"framer-4vo15t hidden-g5y12p"} data-framer-name={"Img"}>
                <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                  <img decoding={"async"} loading={"lazy"} width={4000} height={3098} sizes={"(min-width: 1200px) 2000px, (min-width: 810px) and (max-width: 1199.98px) 2000px, (max-width: 809.98px) 2000px"} srcSet={`${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=512&width=4000&height=3098 512w,${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=1024&width=4000&height=3098 1024w,${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=2048&width=4000&height=3098 2048w,${content.images[0] ?? "/assets/images/image-60567843.png"}?width=4000&height=3098 4000w`} src={`${content.images[0] ?? "/assets/images/image-60567843.png"}?width=4000&height=3098`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                </div>
              </AboutImageReveal>
              <AboutWrapperReveal className={"framer-th6j4v"} data-framer-name={"Wrapper"}>
                <div className={"framer-1eeu7oo"} data-framer-name={"Content"}>
                  <div className={"framer-9a2wmm"} data-framer-name={"Title Wrap"}>
                    <div data-framer-component-type={"SVG"} data-framer-name={"Icon"} data-framer-shadows className={"framer-1959owo"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 83.022 71.027%22 overflow=%22visible%22><g><path d=%22M 83.022 57.904 C 83.022 57.904 71.567 60.488 64.419 62.818 C 57.27 65.149 45.214 66.013 45.214 66.013 L 49.099 64.285 L 63.474 60.789 L 64.937 57.551 C 64.937 57.551 64.247 55.565 61.232 55.565 C 58.218 55.565 37.722 60.315 37.722 60.315 L 7.492 66.013 L 0 65.149 C 0 65.149 0.166 67.108 0.642 67.822 C 1.117 68.535 7.745 69.364 7.745 69.364 L 20.533 67.94 L 40.898 63.54 L 36.763 66.99 C 36.763 66.99 34.976 71.027 42.911 71.027 C 50.846 71.027 61.264 67.23 61.264 67.23 L 82.09 61.082 L 83.022 57.907 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 41.824 13.556 L 43.966 14.414 C 43.966 14.414 40.645 35.568 28.541 48.027 L 26.506 45.771 C 26.506 45.771 32.077 39.651 36.576 29.556 C 41.075 19.461 41.824 13.556 41.824 13.556 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 43.956 14.495 L 45.457 17.179 C 45.457 17.179 46.528 29.957 53.811 37.905 L 52.206 41.019 C 52.206 41.019 41.173 29.099 43.959 14.495 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 41.902 13.529 C 41.902 13.529 49.614 4.403 62.894 0 C 62.894 0 63.75 3.865 56.682 11.489 L 65.785 12.779 L 76.711 16.108 L 75.747 19.006 L 63.858 26.093 L 48.744 25.126 L 45.115 21.154 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 51.192 37.545 L 57.082 36.364 C 57.082 36.364 63.186 37.545 63.723 40.552 C 64.257 43.558 63.081 48.069 63.081 48.069 C 63.081 48.069 59.761 54.296 54.62 56.767 C 49.479 59.238 44.446 57.303 44.551 50.324 C 44.658 43.345 51.192 37.545 51.192 37.545 Z M 24.6 43.324 L 29.359 44.473 L 33.432 49.993 C 33.432 49.993 34.637 55.338 31.595 58.732 C 28.557 62.123 23.569 63.1 23.569 63.1 C 23.569 63.1 19.04 65.054 15.312 59.421 C 11.586 53.788 15.54 47.078 15.54 47.078 C 15.54 47.078 22.192 43.496 24.6 43.324 Z%22 fill=%22rgb(255,83,36)%22></path></g></svg>')"}}>                    </div>
                    <Appear id="10qxt3k" className={"framer-10qxt3k"} data-framer-name={"Title"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--framer-font-size": "36px", "--framer-font-style": "italic", "--framer-letter-spacing": "-1.2px", "--framer-line-height": "52px", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                          {clientsLead}
                          <span style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--framer-font-weight": "700"}} className={"framer-text"}> </span>
                          <span style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-style": "normal", "--framer-font-weight": "700"}} className={"framer-text"}>
                            {clientsTail}
                          </span>
                        </h3>
                    </Appear>
                  </div>
                  <Appear id="15capyb" className={"framer-15capyb"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                      <p dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'ss02' on, 'ss01' on, 'ss03' on, 'ss04' on, 'ss08' on, 'ss07' on, 'salt' on", "--framer-font-size": "18px", "--framer-letter-spacing": "-0.1px", "--framer-line-height": "1.4em", "--framer-text-alignment": "left", "--framer-text-color": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))"}} className={"framer-text"}><AboutClientsList clients={content.clients} /></p>
                  </Appear>
                </div>
              </AboutWrapperReveal>
            </div>
          </AboutBlockReveal>
          <AboutBlockReveal className={"framer-1cb1wnd"} data-framer-name={"Awwards"} id={"awwards"}>
            <div className={"framer-1mtit2o"} data-border={true} data-framer-name={"Container"}>
              <AboutImageReveal className={"framer-1wpqemj hidden-g5y12p"} data-framer-name={"Img"} style={{"transform": "rotate(-180deg)"}}>
                <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                  <img decoding={"async"} loading={"lazy"} width={4000} height={3098} sizes={"(min-width: 1200px) 2000px, (min-width: 810px) and (max-width: 1199.98px) 2000px, (max-width: 809.98px) 2000px"} srcSet={`${awardsImage}?scale-down-to=512&width=4000&height=3098 512w,${awardsImage}?scale-down-to=1024&width=4000&height=3098 1024w,${awardsImage}?scale-down-to=2048&width=4000&height=3098 2048w,${awardsImage}?width=4000&height=3098 4000w`} src={`${awardsImage}?width=4000&height=3098`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                </div>
              </AboutImageReveal>
              <AboutWrapperReveal className={"framer-1jqw46n"} data-framer-name={"Wrapper"}>
                <div className={"framer-1dvw268"} data-framer-name={"Content"}>
                  <div className={"framer-oea9ks"} data-framer-name={"Title Wrap"}>
                    <div data-framer-component-type={"SVG"} data-framer-name={"Icon"} data-framer-shadows className={"framer-14waru"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 70 73%22 overflow=%22visible%22><g><path d=%22M 0.851 28.634 L 36.79 0 L 40.159 2.744 L 14.152 27.459 L 5.22 34.127 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 0.142 15.134 L 46.179 28.839 L 48.564 24.133 L 0.916 11.777 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 12.204 7.513 L 25.497 37.522 L 30.698 36.541 L 25.497 26.538 L 14.418 3.785 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 38.091 73 C 38.091 73 32.795 49.637 59.465 43.79 L 57.857 33.523 C 57.857 33.523 27.938 28.929 27.531 69.815 Z%22 fill=%22rgb(255,83,36)%22></path><path d=%22M 12.268 39.677 L 9.044 45.258 L 0 47.611 L 5.899 51.271 L 5.296 56.765 L 12.179 52.618 L 17.296 57.549 L 17.899 50.748 L 24.356 47.349 L 15.523 44.386 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 70 13.969 C 70 19.67 65.322 24.292 59.551 24.292 C 56.594 24.292 49.101 19.67 49.101 13.969 C 49.101 8.267 57.038 3.645 59.551 3.645 C 65.322 3.645 70 11.239 70 13.969 Z%22 fill=%22rgb(41,120,243)%22></path><path d=%22M 67.689 57.137 C 67.365 54.722 63.901 52.65 59.365 51.874 C 58.85 53.114 58.426 54.371 58.113 55.661 C 59.815 55.898 61.184 56.333 62.157 56.775 C 62.954 57.137 63.489 57.503 63.719 57.77 C 63.605 58.189 62.911 59.403 60.415 61.152 C 58.153 62.738 55.928 63.671 55.381 63.724 C 51.688 63.924 48.481 62.586 47.22 61.163 C 46.816 60.705 46.645 60.292 46.711 59.949 C 46.904 59.249 49.084 56.865 52.516 55.895 C 52.26 54.573 52.021 53.289 52.123 51.948 C 47.152 53.126 43.29 56.657 42.801 59.195 C 42.499 60.758 43.003 62.375 44.221 63.753 C 45.1 64.745 46.318 65.588 47.744 66.235 C 50.017 67.267 52.815 67.801 55.598 67.652 C 57.943 67.525 63.568 64.399 66.11 61.371 C 67.336 59.909 67.868 58.484 67.686 57.135 Z%22 fill=%22rgb(240,205,62)%22></path></g></svg>')"}}>                    </div>
                    <Appear id="1i8t5dv" className={"framer-1i8t5dv"} data-framer-name={"Title"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--framer-font-size": "36px", "--framer-font-style": "italic", "--framer-font-weight": "700", "--framer-letter-spacing": "-1.2px", "--framer-line-height": "52px", "--framer-text-alignment": "center", "--framer-text-color": "rgb(9, 9, 9)"}} className={"framer-text"}>
                          {content.awardsTitle}
                        </h3>
                    </Appear>
                  </div>
                  <div className={"ssr-variant"}>
                    <Appear id="87ac2n" className={"framer-87ac2n-container"} style={{"opacity": "0.001", "transform": "none"}}>
                        <div className={"framer-gi3K8 framer-d1wa5y framer-v-d1wa5y"} data-border={true} data-framer-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                          <div className={"framer-xw6a6u"}>
                            <div className={"framer-sw95la"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                {content.awards[0]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"framer-ak8hnr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                            <div className={"framer-1pdqyfa"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                {content.awards[0]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"framer-tfktib"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                          </div>
                          <div className={"framer-1dgq8gr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                              <AnimatedSpan y={10}>{content.awards[0]?.year ?? ""}</AnimatedSpan>
                            </p>
                          </div>
                        </div>
                    </Appear>
                  </div>
                  <div className={"ssr-variant"}>
                    <Appear id="yxvyew" className={"framer-yxvyew-container"} style={{"opacity": "0.001", "transform": "none"}}>
                        <div className={"framer-gi3K8 framer-d1wa5y framer-v-d1wa5y"} data-border={true} data-framer-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                          <div className={"framer-xw6a6u"}>
                            <div className={"framer-sw95la"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                {content.awards[1]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-1-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"framer-ak8hnr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                            <div className={"framer-1pdqyfa"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                {content.awards[1]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-1-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"framer-tfktib"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                          </div>
                          <div className={"framer-1dgq8gr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                              <AnimatedSpan y={10}>{content.awards[1]?.year ?? ""}</AnimatedSpan>
                            </p>
                          </div>
                        </div>
                    </Appear>
                  </div>
                  <div className={"ssr-variant"}>
                    <Appear id="1i5tzip" className={"framer-1i5tzip-container"} style={{"opacity": "0.001", "transform": "none"}}>
                        <div className={"framer-gi3K8 framer-d1wa5y framer-v-d1wa5y"} data-border={true} data-framer-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                          <div className={"framer-xw6a6u"}>
                            <div className={"framer-sw95la"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                {content.awards[2]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-2-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"framer-ak8hnr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                            <div className={"framer-1pdqyfa"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                {content.awards[2]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"framer-tfktib"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                          </div>
                          <div className={"framer-1dgq8gr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                              <AnimatedSpan y={10}>{content.awards[2]?.year ?? ""}</AnimatedSpan>
                            </p>
                          </div>
                        </div>
                    </Appear>
                  </div>
                  <div className={"ssr-variant"}>
                    <Appear id="1mevtjy" className={"framer-1mevtjy-container"} style={{"opacity": "0.001", "transform": "none"}}>
                        <div className={"framer-gi3K8 framer-d1wa5y framer-v-d1wa5y"} data-border={true} data-framer-name={"Desktop"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                          <div className={"framer-xw6a6u"}>
                            <div className={"framer-sw95la"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                                {content.awards[3]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-3-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"framer-ak8hnr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                            <div className={"framer-1pdqyfa"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                {content.awards[3]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-3-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                              </p>
                            </div>
                            <div className={"framer-tfktib"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                              <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                              </p>
                            </div>
                          </div>
                          <div className={"framer-1dgq8gr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-size": "18px", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
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
      <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
        <div className={"framer-1qkn2mb"} data-framer-name={"Container"}>
          <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
            <img decoding={"async"} width={1920} height={1487} sizes={"(max-width: 809.98px) min(100vw, 1128px)"} srcSet={`${content.awardsMark}?scale-down-to=512&width=1920&height=1487 512w,${content.awardsMark}?scale-down-to=1024&width=1920&height=1487 1024w,${content.awardsMark}?width=1920&height=1487 1920w`} src={`${content.awardsMark}?width=1920&height=1487`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
          </div>
          <div className={"framer-69y99q"} data-framer-name={"Title"}>
            <div className={"framer-ohm6pp"} data-framer-name={"Icon"} style={{"willChange": "transform", "opacity": "0", "transform": "none"}}>
              <div data-framer-component-type={"SVG"} data-framer-name={"Character"} data-framer-shadows className={"framer-qbzodd"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 75 73%22 overflow=%22visible%22><g><path d=%22M 69.088 29.126 L 72.767 28.461 L 74.737 30.278 L 74.212 31.838 L 70.861 32.831 L 74.737 35.032 L 75 36.6 L 73.029 37.991 L 74.147 39.711 C 74.147 39.711 73.885 41.399 71.191 41.085 C 71.191 41.085 73.162 42.952 70.073 43.549 C 70.073 43.549 70.796 44.805 70.271 45.666 C 69.745 46.525 63.765 44.541 63.765 44.541 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 14.324 56.059 C 14.324 56.059 12.358 57.271 9.732 57.221 C 7.106 57.172 4.568 56.46 4.568 56.46 C 4.568 56.46 2.142 54.685 1.3 54.755 C 0.458 54.826 0 56.46 0 56.46 L 11.126 69.068 C 11.126 69.068 17.217 66.929 18.562 60.908 C 19.906 54.886 14.324 56.062 14.324 56.062 Z M 44.115 64.12 C 44.115 64.12 42.422 69.584 42.713 73 L 59.057 70.555 C 59.057 70.555 61.182 69.874 61.312 68.335 C 61.403 67.243 60.061 67.039 57.141 67.089 C 54.221 67.138 53.862 61.431 53.862 61.431 L 44.112 64.115 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 9.23 51.426 L 19.55 63.364 L 34.932 49.797 L 21.432 37.475 L 12.764 44.975 Z M 41.226 48.255 L 41.853 65.78 L 58.272 60.63 L 56.296 40.127 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 16.643 15.957 C 16.643 15.957 22.098 12.328 24.243 12.033 C 26.386 11.739 30.574 14.543 30.574 14.543 C 30.574 14.543 36.713 24.588 39.246 24.785 C 41.778 24.981 50.059 22.135 50.059 22.135 C 50.059 22.135 55.028 20.664 57.851 21.743 C 60.675 22.821 64.182 31.256 64.182 31.256 L 60.969 42.93 L 45.187 46.658 C 45.187 46.658 44.017 47.64 36.71 46.658 C 29.404 45.676 17.6 39.398 17.6 39.398 L 14.888 35.377 L 11.771 26.057 L 16.641 15.954 Z%22 fill=%22rgb(41,120,243)%22></path><path d=%22M 8.45 33.239 L 13.322 39.127 L 30.563 25.393 L 27.446 18.625 L 15.465 27.061 Z M 65.929 25.197 L 67.908 24.804 L 71.101 25.841 L 63.787 46.219 L 60.131 46.478 L 57.916 45.389 Z%22 fill=%22rgb(244,99,57)%22></path><path d=%22M 13.327 39.179 L 14.414 41.915 L 18.181 41.915 L 18.81 45.617 L 24.283 45.617 L 25.628 50.677 L 30.568 51.219 L 34.062 54.29 L 38.906 50.316 L 42.226 52.122 L 44.109 50.135 L 48.147 50.766 L 50.299 47.07 L 54.337 47.604 L 54.964 45.347 L 57.92 45.441 L 65.933 25.249 L 64.178 24.545 L 61.066 26.558 L 59.272 25.293 L 55.681 29.527 L 52.902 28.453 L 50.12 30.262 L 48.058 28.927 L 44.738 31.616 L 42.406 30.443 L 39.085 32.519 L 37.2 30.443 L 34.868 31.231 L 33.524 28.453 L 30.568 28.003 L 30.568 25.445 Z%22 fill=%22rgb(247,244,237)%22></path><path d=%22M 36.423 11.771 C 36.423 11.771 33.773 14.874 33.685 19.123 C 33.599 23.374 38.482 26.929 38.482 26.929 L 44.366 28.144 C 44.366 28.144 47.811 27.212 50.052 24.641 C 52.293 22.07 51.948 16.434 51.948 16.434 C 51.948 16.434 50.655 12.617 48.931 11.402 C 47.208 10.187 43.848 8.617 43.848 8.617 L 36.42 11.769 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 36.968 9.38 L 36.702 4.741 C 36.702 4.741 36.432 0.218 36.921 0.008 C 37.41 -0.201 40.907 3.723 40.907 3.723 C 40.907 3.723 42.771 1.265 43.273 1.288 C 43.775 1.312 44.555 6.844 44.555 6.844 C 44.555 6.844 49.263 5.618 50.899 6.33 C 52.532 7.043 52.542 9.299 50.488 10.244 C 48.434 11.189 38.031 13.768 38.031 13.768 L 34.929 15.103 C 34.929 15.103 32.964 15.268 32.477 14.609 C 31.991 13.949 33.627 12.059 33.627 12.059 L 36.97 9.38 Z%22 fill=%22rgb(30,30,30)%22></path><path d=%22M 37.963 15.653 C 37.963 15.653 42.697 13.988 47.388 14.438 L 47.031 18.036 C 47.031 18.036 46.093 19.564 44.442 20.24 C 42.788 20.915 40.243 19.834 40.243 19.834 L 38.514 17.721 L 37.965 15.653 Z%22 fill=%22rgb(213,68,41)%22></path><path d=%22M 15.6 39.425 L 17.888 40.716 L 31.744 28.935 L 31.744 26.898 Z M 19.607 42.931 L 22.485 44.742 L 34.812 31.239 L 34.812 29.534 L 33.278 29.849 Z M 25.571 50.685 L 28.08 51.449 L 37.916 31.239 L 37.144 30.451 L 33.811 34.747 Z M 31.744 53.798 L 34.006 54.298 L 40.493 31.61 L 39.573 31.239 L 33.21 47.559 Z M 39.573 51.049 L 42.139 50.711 L 44.869 30.72 L 43.605 30.451 Z M 45.87 51.449 L 48.09 50.774 L 48.868 28.642 L 48.002 28.935 Z M 50.243 47.077 L 52.198 47.292 L 53.628 28.765 L 52.846 28.461 L 50.404 43.669 Z M 53.628 45.009 L 54.908 45.355 L 60.282 26.052 L 59.216 25.301 Z%22 fill=%22rgb(255,255,255)%22></path><path d=%22M 54.948 45.347 L 57.374 45.423 L 64.163 24.545 L 62.33 25.73 L 54.948 44.734%22 fill=%22rgb(255,255,255)%22></path><path d=%22M 21.098 17.714 L 25.505 16.795 L 26.569 18.096 C 26.569 18.096 27.253 20.316 22.692 22.533 C 22.692 22.533 23.529 25.67 22.084 26.206 C 20.641 26.743 19.653 24.829 19.653 24.829 C 19.653 24.829 20.565 27.738 19.348 28.196 C 18.132 28.654 16.384 26.513 16.384 26.513 C 16.384 26.513 17.297 30.034 15.851 30.644 C 14.408 31.256 12.508 29.649 12.508 29.649 L 13.116 32.021 C 13.116 32.021 11.379 33.385 10.76 33.168 C 9.564 32.749 8.556 28.576 8.556 28.576 C 8.556 28.576 7.718 23.832 9.923 20.083 C 10.695 18.769 14.255 15.797 14.255 15.797 L 19.195 15.797 L 21.096 17.711 Z%22 fill=%22rgb(252,211,172)%22></path></g></svg>')"}}>              </div>
            </div>
            <div className={"framer-cf9z1u"} data-framer-name={"Title text"} id={"cf9z1u"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
              <h2 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LVNlbWlCb2xk", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'ss02' on, 'ss01' on, 'salt' on, 'ss03' on, 'ss04' on", "--framer-font-size": "50px", "--framer-font-weight": "600", "--framer-letter-spacing": "-3px", "--framer-line-height": "1em", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))"}} className={"framer-text"}>
                <AboutMainTitle title={content.title} />
              </h2>
            </div>
            <div className={"framer-1l4dp1y-container hidden-g5y12p"} data-framer-name={"Scribble"}>
              <Scribble variant="type1" />
            </div>
          </div>
          <div className={"framer-13baukc"} data-framer-name={"About me"} id={"about-1"} style={{"opacity": "1", "transform": "none"}}>
            <div className={"framer-swn67u"} data-border={true} data-framer-name={"Container"}>
              <div className={"framer-1298i0o hidden-g5y12p"} data-framer-name={"Img"} style={{"willChange": "transform", "opacity": "1", "transform": "none"}}>
                <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                  <img decoding={"async"} loading={"lazy"} width={4000} height={3098} sizes={"(min-width: 1200px) 2000px, (min-width: 810px) and (max-width: 1199.98px) 2000px, (max-width: 809.98px) 2000px"} srcSet={`${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=512&width=4000&height=3098 512w,${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=1024&width=4000&height=3098 1024w,${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=2048&width=4000&height=3098 2048w,${content.images[0] ?? "/assets/images/image-60567843.png"}?width=4000&height=3098 4000w`} src={`${content.images[0] ?? "/assets/images/image-60567843.png"}?width=4000&height=3098`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                </div>
              </div>
              <div className={"framer-1e8y5is"} data-framer-name={"Wrapper"} data-border={true} style={{"opacity": "1", "transform": "none"}}>
                <div className={"framer-1esnplr"} data-framer-name={"Content"}>
                  <div className={"framer-paauon"} data-framer-name={"Title Wrap"}>
                    <div data-framer-component-type={"SVG"} data-framer-name={"Icon"} data-framer-shadows className={"framer-1q6kjd0"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 55 75%22 overflow=%22visible%22><g><path d=%22M 0 61.541 L 1.678 62.061 C 1.678 62.061 6.122 60.627 10.315 59.867 C 14.508 59.107 24.152 60.288 24.152 60.288 C 24.152 60.288 29.292 61.833 29.647 63.633 C 30.006 65.434 29.24 67.386 29.24 67.386 C 29.24 67.386 25.969 68.311 23.158 69.39 C 20.348 70.469 17.638 71.653 18.303 73.605 C 18.969 75.56 23.977 75.301 26.328 73.812 C 28.679 72.319 30.671 70.574 30.671 70.574 L 41.328 67.975 C 41.328 67.975 47.855 66.755 52.505 66.838 L 52.956 63.427 C 52.956 63.427 42.376 63.427 33.011 66.676 C 33.011 66.676 33.98 63.102 30.991 60.825 C 28.003 58.548 24.935 58.155 24.935 58.155 L 18.15 57.252 L 8.944 57.659 L 1.434 60.016 L 0.003 61.541 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 26.567 6.073 L 23.111 1.06 L 20.237 0 L 17.777 0.295 L 13.499 2.536 L 10.918 6.839 L 11.622 10.509 L 14.26 15.211 Z%22 fill=%22rgb(255,83,36)%22></path><path d=%22M 15.559 17.14 C 15.559 17.14 18.025 14.013 21.134 11.532 C 24.242 9.052 28.208 8.512 28.208 8.512 L 53.4 47.226 L 48.362 48.088 L 46.646 50.891 L 42.25 50.891 L 40.857 54.34 L 15.559 17.138 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 6.96 39.26 C 6.96 37.531 9.618 26.364 9.618 26.364 L 18.529 20.23 C 18.529 20.23 29.47 16.613 30.097 16.613 C 30.724 16.613 36.195 19.129 36.036 21.959 C 35.877 24.789 25.327 31.499 25.327 31.499 L 37.9 49.986 L 26.033 53.408 L 11.027 49.633 L 6.963 39.254 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 30.708 12.273 C 30.708 12.273 37.952 7.502 38.489 7.149 C 39.025 6.797 43.675 5.492 43.675 5.492 L 46.611 6.254 L 48.127 8.884 C 48.127 8.884 48.316 10.64 47.558 11.926 C 46.8 13.211 42.49 17.024 42.49 17.024 L 37.044 22.013 L 30.708 12.275 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 42.463 16.975 L 47.389 15.926 L 50.848 16.449 L 52.553 19.12 L 51.653 22.883 L 43.275 31.583 L 37.301 38.799 L 34.742 38.799 L 32.564 37.51 L 31.663 35.319 L 32.233 29.983 L 37.016 21.964 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 50.743 23.752 L 53.4 27.328 L 53.65 31.372 L 52.511 34.885 L 49.843 38.765 C 49.843 38.765 45.062 42.933 44.328 43.472 C 43.595 44.012 39.889 43.816 39.889 43.816 L 37.847 42.148 L 37.259 38.765 L 43.233 31.549 L 50.74 23.752 Z%22 fill=%22rgb(252,211,172)%22></path><path d=%22M 53.484 47.229 L 55 64.433 L 53.021 64.866 L 40.944 54.346 L 42.337 50.896 L 46.732 50.896 L 48.445 48.091 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 48.996 61.374 L 50.362 58.662 L 53.066 58.076 L 54.429 58.392 L 54.96 64.413 L 52.981 64.845 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 28.184 8.48 L 28.52 6.993 L 25.472 3.158 L 22.352 3.808 L 16.974 6.756 L 13.34 10.707 L 12.283 12.711 L 12.987 14.539 L 14.804 17.193 L 15.534 17.108 L 22.894 10.765 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 50.841 23.829 L 37.36 37.71 L 38.471 39.252 L 51.728 25.021 Z M 37.004 20.966 L 41.634 16.564 L 43.115 17.888 L 37.948 22.007 Z%22 fill=%22rgb(244,99,57)%22></path></g></svg>')"}}>                    </div>
                    <Appear id="10d8ozj" className={"framer-10d8ozj"} data-framer-name={"Title"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--framer-font-size": "32px", "--framer-font-weight": "700", "--framer-letter-spacing": "-1.2px", "--framer-line-height": "52px", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                          <AboutMeHeading heading={content.heading} />
                        </h3>
                    </Appear>
                  </div>
                  <Appear id="i446vz" className={"framer-i446vz"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                      <p dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'ss02' on, 'ss01' on, 'ss03' on, 'ss04' on, 'ss08' on, 'ss07' on, 'salt' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.1px", "--framer-line-height": "1.4em", "--framer-text-alignment": "left", "--framer-text-color": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))"}} className={"framer-text"}><AboutBodyRichText body={content.body} /></p>
                  </Appear>
                  <div className={"framer-1gfatq4"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
                    <p dir={"auto"} style={{"--font-selector": "R0Y7R3JhcGUgTnV0cy1yZWd1bGFy", "--framer-font-family": "\"Grape Nuts\", sans-serif", "--framer-font-size": "38px", "--framer-text-color": "var(--token-a962588e-440d-4f71-ad7a-bd7fc38d62f3, rgb(255, 83, 36))"}} className={"framer-text"}>
                      {content.name}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"framer-k8tsnc"} data-framer-name={content.talksTitle} id={"selected-talks"} style={{"opacity": "1", "transform": "none"}}>
            <div className={"framer-1s373ma"} data-border={true} data-framer-name={"Container"}>
              <div className={"framer-1pf38c9 hidden-g5y12p"} data-framer-name={"Img"} style={{"willChange": "transform", "opacity": "1", "transform": "none"}}>
                <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                  <img decoding={"async"} loading={"lazy"} width={4000} height={3098} sizes={"(min-width: 1200px) 2000px, (min-width: 810px) and (max-width: 1199.98px) 2000px, (max-width: 809.98px) 2000px"} srcSet={`${content.images[1] ?? "/assets/images/image-4f67e4d0.png"}?scale-down-to=512&width=4000&height=3098 512w,${content.images[1] ?? "/assets/images/image-4f67e4d0.png"}?scale-down-to=1024&width=4000&height=3098 1024w,${content.images[1] ?? "/assets/images/image-4f67e4d0.png"}?scale-down-to=2048&width=4000&height=3098 2048w,${content.images[1] ?? "/assets/images/image-4f67e4d0.png"}?width=4000&height=3098 4000w`} src={`${content.images[1] ?? "/assets/images/image-4f67e4d0.png"}?width=4000&height=3098`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                </div>
              </div>
              <div className={"framer-4lsr4v"} data-framer-name={"Wrapper"} data-border={true} style={{"opacity": "1", "transform": "none"}}>
                <div className={"framer-19g0nul"} data-framer-name={"Content"}>
                  <div className={"framer-79wp9j"} data-framer-name={"Title Wrap"}>
                    <div data-framer-component-type={"SVG"} data-framer-name={"Icon"} data-framer-shadows className={"framer-p5rqc1"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 68.964 73.94%22 overflow=%22visible%22><g><path d=%22M 37.681 56.362 L 38.608 73.94 L 42.5 73.94 C 42.5 73.94 42.315 59.129 40.832 55.873 L 37.681 56.365 Z M 35.582 56.487 L 36.633 61.156 C 36.633 61.156 37.002 64.536 34.408 67.425 C 31.814 70.314 29.095 70.989 26.996 70.989 C 24.896 70.989 24.649 69.084 24.649 69.084 C 24.649 69.084 24.354 68.31 25.948 67.425 C 25.948 67.425 28.962 67.482 30.817 66.128 C 32.672 64.777 33.394 61.119 32.036 57.985 Z%22 fill=%22rgb(41,120,243)%22></path><path d=%22M 18.446 1.334 L 37.237 0 L 47.826 4.005 L 54.537 15.726 C 54.537 15.726 58.713 31.603 57.52 41.097 C 56.327 50.593 42.755 57.416 42.755 57.416 L 30.526 59.641 C 30.526 59.641 21.131 58.751 16.656 56.08 C 12.181 53.409 12.778 45.102 12.778 45.102 L 34.402 37.682 C 34.402 37.682 27.54 23.736 28.884 16.614 L 25.631 18.078 C 25.631 18.078 22.969 19.5 21.145 19.059 C 19.321 18.618 18.335 16.557 18.335 16.557 C 18.335 16.557 18.236 13.516 18.582 12.877 C 18.929 12.239 24.006 10.277 24.006 10.277 C 24.006 10.277 18.335 10.376 17.301 9.344 C 16.267 8.315 15.969 6.645 16.068 4.929 C 16.167 3.214 18.449 1.328 18.449 1.328 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 39.733 13.625 C 39.733 13.625 43.159 14.513 44.216 13.625 C 45.273 12.738 45.946 10.008 45.946 10.008 L 47.975 10.259 C 47.975 10.259 48.398 13.914 46.284 15.889 C 44.173 17.865 39.105 16.647 39.105 16.647 Z%22 fill=%22rgb(255,255,255)%22></path><path d=%22M 51.148 11.598 L 60.58 3.806 L 62.842 4.19 C 62.842 4.19 61.987 10.555 57.697 15.55 L 68.964 18.678 C 68.964 18.678 65.93 24.167 55.836 24.769 Z%22 fill=%22rgb(255,83,36)%22></path><path d=%22M 33.792 29.177 C 38.423 29.177 41.477 33.196 42.756 37.411 C 44.034 41.625 43.543 46.232 36.352 49.27 C 29.161 52.309 1.872 42.801 1.872 42.801 C 1.872 42.801 0 42.018 0 40.449 C 0 38.88 15.271 33.589 15.271 33.589 L 33.792 29.18 Z%22 fill=%22rgb(41,120,243)%22></path></g></svg>')"}}>                    </div>
                    <Appear id="zq3mu5" className={"framer-zq3mu5"} data-framer-name={"Title"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--framer-font-size": "32px", "--framer-font-style": "italic", "--framer-letter-spacing": "-1.2px", "--framer-line-height": "52px", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                          {talksLead}
                          <span style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--framer-font-weight": "700"}} className={"framer-text"}> </span>
                          <span style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-style": "normal", "--framer-font-weight": "700"}} className={"framer-text"}>
                            {talksTail}
                          </span>
                        </h3>
                    </Appear>
                  </div>
                  <div className={"framer-1ggzaxr"} data-framer-name={"Content"}>
                    <div className={"framer-jtwcqv"} data-framer-name={"Items wrapper"}>
                      <Appear id="17sob6t" className={"framer-17sob6t-container"} style={{"opacity": "0.001", "transform": "none"}}>
                          <div className={"framer-i1MX6 framer-19shc8e framer-v-y13yck"} data-border={true} data-framer-name={"Mobile"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                            <div className={"framer-14p3me6"}>
                              <div className={"framer-i1klgo"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                  {content.talks[0]?.city?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-0-city-${wi}`} y={10}>{word}{wi < (content.talks[0]?.city?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                </p>
                              </div>
                              <div className={"framer-103fef5"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                </p>
                              </div>
                              <div className={"framer-1ic6ub0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[0]?.event?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-0-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                              </div>
                            </div>
                          </div>
                      </Appear>
                      <Appear id="qj8w5o" className={"framer-qj8w5o-container"} style={{"opacity": "0.001", "transform": "none"}}>
                          <div className={"framer-i1MX6 framer-19shc8e framer-v-y13yck"} data-border={true} data-framer-name={"Mobile"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                            <div className={"framer-14p3me6"}>
                              <div className={"framer-i1klgo"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                  {content.talks[1]?.city?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-1-city-${wi}`} y={10}>{word}{wi < (content.talks[1]?.city?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                </p>
                              </div>
                              <div className={"framer-103fef5"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                </p>
                              </div>
                              <div className={"framer-1ic6ub0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[1]?.event?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-1-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                              </div>
                            </div>
                          </div>
                      </Appear>
                      <Appear id="1vmjjvi" className={"framer-1vmjjvi-container"} style={{"opacity": "0.001", "transform": "none"}}>
                          <div className={"framer-i1MX6 framer-19shc8e framer-v-y13yck"} data-border={true} data-framer-name={"Mobile"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                            <div className={"framer-14p3me6"}>
                              <div className={"framer-i1klgo"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                  {content.talks[2]?.city?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-2-city-${wi}`} y={10}>{word}{wi < (content.talks[2]?.city?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                </p>
                              </div>
                              <div className={"framer-103fef5"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                </p>
                              </div>
                              <div className={"framer-1ic6ub0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[2]?.event?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-2-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                              </div>
                            </div>
                          </div>
                      </Appear>
                      <Appear id="1okuu50" className={"framer-1okuu50-container"} style={{"opacity": "0.001", "transform": "none"}}>
                          <div className={"framer-i1MX6 framer-19shc8e framer-v-y13yck"} data-border={true} data-framer-name={"Mobile"} style={{"--border-bottom-width": "1px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                            <div className={"framer-14p3me6"}>
                              <div className={"framer-i1klgo"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                                  {content.talks[3]?.city?.split(/\s+/).filter(Boolean).map((word, wi) => (<AnimatedSpan key={`talk-3-city-${wi}`} y={10}>{word}{wi < (content.talks[3]?.city?.split(/\s+/).filter(Boolean).length ?? 0) - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                </p>
                              </div>
                              <div className={"framer-103fef5"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                <AnimatedSpan y={10}>/</AnimatedSpan>
                                <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                </p>
                              </div>
                              <div className={"framer-1ic6ub0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                                <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-alignment": "center", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(94, 93, 83)))"}}>
                                    {content.talks[3]?.event?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`talk-3-event-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                                  </p>
                              </div>
                            </div>
                          </div>
                      </Appear>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"framer-1s4qvvo"} data-framer-name={content.clientsTitle} id={"selected-clients"} style={{"opacity": "1", "transform": "none"}}>
            <div className={"framer-xttiuj"} data-border={true} data-framer-name={"Container"}>
              <div className={"framer-4vo15t hidden-g5y12p"} data-framer-name={"Img"} style={{"willChange": "transform", "opacity": "1", "transform": "none"}}>
                <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                  <img decoding={"async"} loading={"lazy"} width={4000} height={3098} sizes={"(min-width: 1200px) 2000px, (min-width: 810px) and (max-width: 1199.98px) 2000px, (max-width: 809.98px) 2000px"} srcSet={`${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=512&width=4000&height=3098 512w,${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=1024&width=4000&height=3098 1024w,${content.images[0] ?? "/assets/images/image-60567843.png"}?scale-down-to=2048&width=4000&height=3098 2048w,${content.images[0] ?? "/assets/images/image-60567843.png"}?width=4000&height=3098 4000w`} src={`${content.images[0] ?? "/assets/images/image-60567843.png"}?width=4000&height=3098`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                </div>
              </div>
              <div className={"framer-th6j4v"} data-framer-name={"Wrapper"} data-border={true} style={{"opacity": "1", "transform": "none"}}>
                <div className={"framer-1eeu7oo"} data-framer-name={"Content"}>
                  <div className={"framer-9a2wmm"} data-framer-name={"Title Wrap"}>
                    <div data-framer-component-type={"SVG"} data-framer-name={"Icon"} data-framer-shadows className={"framer-1959owo"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 83.022 71.027%22 overflow=%22visible%22><g><path d=%22M 83.022 57.904 C 83.022 57.904 71.567 60.488 64.419 62.818 C 57.27 65.149 45.214 66.013 45.214 66.013 L 49.099 64.285 L 63.474 60.789 L 64.937 57.551 C 64.937 57.551 64.247 55.565 61.232 55.565 C 58.218 55.565 37.722 60.315 37.722 60.315 L 7.492 66.013 L 0 65.149 C 0 65.149 0.166 67.108 0.642 67.822 C 1.117 68.535 7.745 69.364 7.745 69.364 L 20.533 67.94 L 40.898 63.54 L 36.763 66.99 C 36.763 66.99 34.976 71.027 42.911 71.027 C 50.846 71.027 61.264 67.23 61.264 67.23 L 82.09 61.082 L 83.022 57.907 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 41.824 13.556 L 43.966 14.414 C 43.966 14.414 40.645 35.568 28.541 48.027 L 26.506 45.771 C 26.506 45.771 32.077 39.651 36.576 29.556 C 41.075 19.461 41.824 13.556 41.824 13.556 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 43.956 14.495 L 45.457 17.179 C 45.457 17.179 46.528 29.957 53.811 37.905 L 52.206 41.019 C 52.206 41.019 41.173 29.099 43.959 14.495 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 41.902 13.529 C 41.902 13.529 49.614 4.403 62.894 0 C 62.894 0 63.75 3.865 56.682 11.489 L 65.785 12.779 L 76.711 16.108 L 75.747 19.006 L 63.858 26.093 L 48.744 25.126 L 45.115 21.154 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 51.192 37.545 L 57.082 36.364 C 57.082 36.364 63.186 37.545 63.723 40.552 C 64.257 43.558 63.081 48.069 63.081 48.069 C 63.081 48.069 59.761 54.296 54.62 56.767 C 49.479 59.238 44.446 57.303 44.551 50.324 C 44.658 43.345 51.192 37.545 51.192 37.545 Z M 24.6 43.324 L 29.359 44.473 L 33.432 49.993 C 33.432 49.993 34.637 55.338 31.595 58.732 C 28.557 62.123 23.569 63.1 23.569 63.1 C 23.569 63.1 19.04 65.054 15.312 59.421 C 11.586 53.788 15.54 47.078 15.54 47.078 C 15.54 47.078 22.192 43.496 24.6 43.324 Z%22 fill=%22rgb(255,83,36)%22></path></g></svg>')"}}>                    </div>
                    <Appear id="10qxt3k" className={"framer-10qxt3k"} data-framer-name={"Title"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--framer-font-size": "32px", "--framer-font-style": "italic", "--framer-letter-spacing": "-1.2px", "--framer-line-height": "52px", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                          {clientsLead}
                          <span style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--framer-font-weight": "700"}} className={"framer-text"}> </span>
                          <span style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-style": "normal", "--framer-font-weight": "700"}} className={"framer-text"}>
                            {clientsTail}
                          </span>
                        </h3>
                    </Appear>
                  </div>
                  <Appear id="15capyb" className={"framer-15capyb"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                      <p dir={"auto"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'ss02' on, 'ss01' on, 'ss03' on, 'ss04' on, 'ss08' on, 'ss07' on, 'salt' on", "--framer-letter-spacing": "-0.1px", "--framer-line-height": "1.4em", "--framer-text-alignment": "left", "--framer-text-color": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))"}} className={"framer-text"}><AboutClientsList clients={content.clients} /></p>
                  </Appear>
                </div>
              </div>
            </div>
          </div>
          <div className={"framer-1cb1wnd"} data-framer-name={"Awwards"} id={"awwards"} style={{"opacity": "1", "transform": "none"}}>
            <div className={"framer-1mtit2o"} data-border={true} data-framer-name={"Container"}>
              <div className={"framer-1wpqemj hidden-g5y12p"} data-framer-name={"Img"} style={{"willChange": "transform", "opacity": "1", "transform": "rotate(-180deg)"}}>
                <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                  <img decoding={"async"} loading={"lazy"} width={4000} height={3098} sizes={"(min-width: 1200px) 2000px, (min-width: 810px) and (max-width: 1199.98px) 2000px, (max-width: 809.98px) 2000px"} srcSet={`${awardsImage}?scale-down-to=512&width=4000&height=3098 512w,${awardsImage}?scale-down-to=1024&width=4000&height=3098 1024w,${awardsImage}?scale-down-to=2048&width=4000&height=3098 2048w,${awardsImage}?width=4000&height=3098 4000w`} src={`${awardsImage}?width=4000&height=3098`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                </div>
              </div>
              <div className={"framer-1jqw46n"} data-framer-name={"Wrapper"} data-border={true} style={{"opacity": "1", "transform": "none"}}>
                <div className={"framer-1dvw268"} data-framer-name={"Content"}>
                  <div className={"framer-oea9ks"} data-framer-name={"Title Wrap"}>
                    <div data-framer-component-type={"SVG"} data-framer-name={"Icon"} data-framer-shadows className={"framer-14waru"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 62 65%22 overflow=%22visible%22><g><path d=%22M 0.754 25.496 L 32.585 0 L 35.569 2.443 L 12.535 24.45 L 4.623 30.387 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 0.126 13.475 L 40.902 25.679 L 43.014 21.488 L 0.811 10.486 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 10.81 6.69 L 22.583 33.41 L 27.19 32.536 L 22.583 23.63 L 12.771 3.371 Z%22 fill=%22rgb(240,205,62)%22></path><path d=%22M 33.738 65 C 33.738 65 29.047 44.198 52.669 38.991 L 51.245 29.849 C 51.245 29.849 24.745 25.758 24.384 62.164 Z%22 fill=%22rgb(255,83,36)%22></path><path d=%22M 10.866 35.329 L 8.01 40.298 L 0 42.393 L 5.225 45.652 L 4.691 50.544 L 10.788 46.851 L 15.319 51.242 L 15.854 45.187 L 21.573 42.16 L 13.749 39.522 Z%22 fill=%22rgb(14,156,108)%22></path><path d=%22M 62 12.438 C 62 17.514 57.856 21.63 52.745 21.63 C 50.126 21.63 43.49 17.514 43.49 12.438 C 43.49 7.361 50.519 3.246 52.745 3.246 C 57.856 3.246 62 10.007 62 12.438 Z%22 fill=%22rgb(41,120,243)%22></path><path d=%22M 59.953 50.876 C 59.666 48.725 56.598 46.88 52.581 46.19 C 52.125 47.294 51.749 48.413 51.472 49.562 C 52.979 49.772 54.191 50.16 55.053 50.553 C 55.759 50.876 56.233 51.201 56.437 51.439 C 56.336 51.812 55.721 52.893 53.511 54.45 C 51.507 55.862 49.536 56.693 49.052 56.741 C 45.781 56.919 42.94 55.727 41.823 54.46 C 41.466 54.052 41.314 53.684 41.372 53.379 C 41.544 52.756 43.474 50.633 46.514 49.769 C 46.287 48.593 46.075 47.449 46.166 46.255 C 41.763 47.304 38.343 50.448 37.909 52.708 C 37.642 54.1 38.088 55.539 39.167 56.766 C 39.946 57.65 41.024 58.401 42.287 58.976 C 44.301 59.895 46.779 60.371 49.244 60.238 C 51.321 60.125 56.303 57.342 58.554 54.646 C 59.641 53.344 60.112 52.075 59.951 50.873 Z%22 fill=%22rgb(240,205,62)%22></path></g></svg>')"}}>                    </div>
                    <Appear id="1i8t5dv" className={"framer-1i8t5dv"} data-framer-name={"Title"} data-framer-component-type={"RichTextContainer"} style={{"opacity": "0.001", "transform": "none"}}>
                        <h3 dir={"auto"} style={{"--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==", "--framer-font-family": "\"Averia Serif Libre\", sans-serif", "--framer-font-open-type-features": "'ss04' on, 'ss03' on, 'ss02' on, 'ss01' on, 'ss08' on, 'salt' on", "--framer-font-size": "32px", "--framer-font-style": "italic", "--framer-font-weight": "700", "--framer-letter-spacing": "-1.2px", "--framer-line-height": "52px", "--framer-text-alignment": "center", "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))"}} className={"framer-text"}>
                          {content.awardsTitle}
                        </h3>
                    </Appear>
                  </div>
                  <Appear id="87ac2n" className={"framer-87ac2n-container"} style={{"opacity": "0.001", "transform": "none"}}>
                      <div className={"framer-gi3K8 framer-d1wa5y framer-v-1a0dcg8"} data-border={true} data-framer-name={"Mobile"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                        <div className={"framer-xw6a6u"}>
                          <div className={"framer-sw95la"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                              {content.awards[0]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                          <div className={"framer-ak8hnr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}>/</AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                            </p>
                          </div>
                          <div className={"framer-1pdqyfa"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                              {content.awards[0]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                        </div>
                      </div>
                  </Appear>
                  <Appear id="yxvyew" className={"framer-yxvyew-container"} style={{"opacity": "0.001", "transform": "none"}}>
                      <div className={"framer-gi3K8 framer-d1wa5y framer-v-1a0dcg8"} data-border={true} data-framer-name={"Mobile"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                        <div className={"framer-xw6a6u"}>
                          <div className={"framer-sw95la"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                              {content.awards[1]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-1-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                          <div className={"framer-ak8hnr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}>/</AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                            </p>
                          </div>
                          <div className={"framer-1pdqyfa"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                              {content.awards[1]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-1-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                        </div>
                      </div>
                  </Appear>
                  <Appear id="1i5tzip" className={"framer-1i5tzip-container"} style={{"opacity": "0.001", "transform": "none"}}>
                      <div className={"framer-gi3K8 framer-d1wa5y framer-v-1a0dcg8"} data-border={true} data-framer-name={"Mobile"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                        <div className={"framer-xw6a6u"}>
                          <div className={"framer-sw95la"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                              {content.awards[2]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-2-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                          <div className={"framer-ak8hnr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}>/</AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                            </p>
                          </div>
                          <div className={"framer-1pdqyfa"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                              {content.awards[2]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-0-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                        </div>
                      </div>
                  </Appear>
                  <Appear id="1mevtjy" className={"framer-1mevtjy-container"} style={{"opacity": "0.001", "transform": "none"}}>
                      <div className={"framer-gi3K8 framer-d1wa5y framer-v-1a0dcg8"} data-border={true} data-framer-name={"Mobile"} style={{"--border-bottom-width": "2px", "--border-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(251, 219, 50))", "--border-left-width": "0px", "--border-right-width": "0px", "--border-style": "dotted", "--border-top-width": "0px", "width": "100%"}}>
                        <div className={"framer-xw6a6u"}>
                          <div className={"framer-sw95la"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(66, 66, 58)))"}}>
                              {content.awards[3]?.name?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-3-name-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                          <div className={"framer-ak8hnr"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LU1lZGl1bQ==", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "500", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62)))"}}>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                                  <AnimatedSpan y={10}>/</AnimatedSpan>
                                  <AnimatedSpan y={10}> </AnimatedSpan>
                            </p>
                          </div>
                          <div className={"framer-1pdqyfa"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-r6o4lv": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                            <p dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-open-type-features": "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.02em", "--framer-line-height": "1.4em", "--framer-text-color": "var(--extracted-r6o4lv, var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15)))"}}>
                              {content.awards[3]?.result?.split(/\s+/).filter(Boolean).map((w, wi, words) => (<AnimatedSpan key={`award-3-result-${wi}`} y={10}>{w}{wi < words.length - 1 ? " " : ""}</AnimatedSpan>)) ?? null}
                            </p>
                          </div>
                        </div>
                      </div>
                  </Appear>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
