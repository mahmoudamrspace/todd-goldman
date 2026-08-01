"use client";

import { motion, useInView, useReducedMotion } from "motion/react";
import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react";
import type { ServicesContent } from "@/content/section-types";
import { Scribble } from "@/entities/Scribble";
import { Appear } from "@/features/Appear";
import { AnimatedSpan, AnimatedWords, HiddenReveal } from "@/features/HiddenReveal";
import { LENIS_SCROLL_EVENT } from "@/features/SmoothScroll";
import { easeOut, editorialSpring } from "@/shared/lib/motion";

const SERVICES_CONTAINER_REVEAL_MS = 2200;
const SERVICES_CONTAINER_STYLE = {
  willChange: "transform",
  opacity: "1",
  transform: "none",
} as const;

function subscribeNoop() {
  return () => {};
}

function useIsServerRender() {
  return useSyncExternalStore(subscribeNoop, () => false, () => true);
}

function ServicesContainer({ children }: { children: ReactNode }) {
  const isServerRender = useIsServerRender();
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: false, amount: 0.5 });
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    if (reduced || isServerRender) return;
    const safety = window.setTimeout(() => setRevealed(true), SERVICES_CONTAINER_REVEAL_MS);
    return () => window.clearTimeout(safety);
  }, [reduced, isServerRender]);

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

  if (isServerRender) {
    return (
      <div
        className={"framer-1kf7lb9"}
        data-border={true}
        data-framer-name={"Container"}
        style={SERVICES_CONTAINER_STYLE}
      >
        {children}
      </div>
    );
  }

  const visible = reduced || revealed || isInView;
  if (reduced) {
    return (
      <div
        className={"framer-1kf7lb9"}
        data-border={true}
        data-framer-name={"Container"}
        style={{ willChange: "transform", opacity: 1, transform: "scale(0.91)" }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={"framer-1kf7lb9"}
      data-border={true}
      data-framer-name={"Container"}
      style={{ willChange: "transform" }}
      initial={{ opacity: 0, scale: 1, y: 20 }}
      animate={visible ? { opacity: 1, scale: 0.91, y: 0 } : { opacity: 0, scale: 1, y: 20 }}
      transition={{
        opacity: { duration: 0.9, ease: easeOut },
        scale: editorialSpring,
        y: editorialSpring,
      }}
    >
      {children}
    </motion.div>
  );
}

const SERVICE_ROW_REVEAL_STYLE = {
  willChange: "transform",
  opacity: "0",
  transform: "translateY(16px)",
} as const;

const SERVICE_ROW_STAGGER = 0.12;
const SERVICE_TEXT_AFTER_ICON = 0.08;

function ServiceRowIcon({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.15 });

  if (reduced) {
    return (
      <div
        ref={ref}
        className={"framer-1v49j1s"}
        data-framer-name={"Icon"}
        style={{ willChange: "transform", opacity: 1, transform: "none" }}
      >
        {children}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={"framer-1v49j1s"}
      data-framer-name={"Icon"}
      style={{ willChange: "transform" }}
      initial={{ opacity: 0, x: -30, y: 20 }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x: -30, y: 20 }}
      transition={{
        duration: 0.85,
        ease: easeOut,
      }}
    >
      {children}
    </motion.div>
  );
}

function ServiceRowReveal({
  className,
  children,
  rowIndex = 0,
}: {
  className: string;
  children: ReactNode;
  rowIndex?: number;
}) {
  return (
    <HiddenReveal
      className={className}
      variant="services-row"
      delay={rowIndex * SERVICE_ROW_STAGGER}
      style={SERVICE_ROW_REVEAL_STYLE}
    >
      {children}
    </HiddenReveal>
  );
}

function desktopRowClass(activeIndex: number | null | undefined, index: number) {
  const base = "framer-psO7m framer-11wtfxh framer-v-11wtfxh";
  return activeIndex === index ? `${base} hover` : base;
}

function serviceHref(content: ServicesContent, index: number) {
  return content.links[index]?.href ?? "#";
}

function ServiceRowLink({
  href,
  className,
  framerName,
  onMouseEnter,
  onMouseLeave,
  children,
}: {
  href: string;
  className: string;
  framerName: string;
  onMouseEnter?: () => void;
  onMouseLeave?: () => void;
  children: ReactNode;
}) {
  const external = href.startsWith("http") || href.startsWith("mailto:");
  return (
    <a
      className={className}
      data-framer-name={framerName}
      href={href}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      data-highlight
    >
      {children}
    </a>
  );
}

export function Services({
  content,
  activeIndex = null,
  onRowEnter,
  onRowLeave,
}: {
  content: ServicesContent;
  activeIndex?: number | null;
  onRowEnter?: (index: number) => void;
  onRowLeave?: () => void;
}) {
  return (
    <section className={"framer-1spsffq"} data-framer-name={"Services"}>
      <ServicesContainer>
        <div className={"framer-1c8dd54"} data-framer-name={"Wrapper"}>
          <div className={"framer-1bmkgkc"} data-framer-name={"Title"}>
            <div className={"framer-17amzni"} data-framer-component-type={"RichTextContainer"} style={{"transform": "none"}}>
              <h2 className={"framer-text framer-styles-preset-1ir8ahu"} data-styles-preset={"RGebQr53Z"} dir={"auto"} style={{"--framer-text-color": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))"}}>
                <AnimatedSpan variant="services" y={10}>{content.title}</AnimatedSpan>
              </h2>
            </div>
            <div className={"ssr-variant hidden-g5y12p"}>
              <div className={"framer-1db8tm-container"} data-framer-name={"Scribble"} style={{"transform": "translate(-50%, -50%)"}}>
                <Scribble variant="type1" />
              </div>
            </div>
            <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
              <div className={"framer-1db8tm-container"} data-framer-name={"Scribble"} style={{"transform": "translateX(-50%)"}}>
                <Scribble variant="type1" />
              </div>
            </div>
          </div>
          <div className={"ssr-variant"}>
            <div className={"framer-dd22sl-container hidden-72rtr7 hidden-g5y12p"}>
              <div className={"framer-psO7m framer-11wtfxh framer-v-1l5esg8"} data-framer-name={"Tablet"}>
                <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                  <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <h1 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "80px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "90%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-gdpscs, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                      <AnimatedWords variant="services" text={content.headlines[0] ?? content.items[0] ?? ""} />
                    </h1>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className={"ssr-variant"}>
            <div className={"framer-4mffwv-container hidden-72rtr7 hidden-r4q9g"}>
              <div className={"framer-psO7m framer-11wtfxh framer-v-1m94y22"} data-framer-name={"Mobile"}>
                <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                  <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-a0htzi": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                    <h3 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "32px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "140%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-a0htzi, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                      <AnimatedWords variant="services" text={content.items[0] ?? ""} />
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <ServiceRowReveal rowIndex={0} className={"framer-1be5xs1-container hidden-r4q9g hidden-g5y12p"}>
            <ServiceRowLink
              href={serviceHref(content, 0)}
              className={desktopRowClass(activeIndex, 0)}
              framerName="Desktop"
              onMouseEnter={() => onRowEnter?.(0)}
              onMouseLeave={() => onRowLeave?.()}
            >
              <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                <ServiceRowIcon>
                    <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                      <img decoding={"async"} loading={"lazy"} width={172} height={106} src={`${content.decor}?width=172&height=106`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                    </div>
                </ServiceRowIcon>
                <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                  <h1 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "72px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "90%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-gdpscs, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                    <AnimatedWords variant="services" startDelay={SERVICE_TEXT_AFTER_ICON} text={content.headlines[0] ?? content.items[0] ?? ""} />
                  </h1>
                </div>
              </div>
            </ServiceRowLink>
          </ServiceRowReveal>
          <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
            <ServiceRowReveal rowIndex={1} className={"framer-1289ev8-container"}>
              <ServiceRowLink
                href={serviceHref(content, 1)}
                className={desktopRowClass(activeIndex, 1)}
                framerName="Desktop"
                onMouseEnter={() => onRowEnter?.(1)}
                onMouseLeave={() => onRowLeave?.()}
              >
                <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                  <ServiceRowIcon>
                      <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                        <img decoding={"async"} loading={"lazy"} width={172} height={106} src={`${content.decor}?width=172&height=106`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                      </div>
                  </ServiceRowIcon>
                  <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <h1 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "72px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "90%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-gdpscs, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                      <AnimatedWords variant="services" startDelay={SERVICE_TEXT_AFTER_ICON} text={content.items[1] ?? ""} />
                    </h1>
                  </div>
                </div>
              </ServiceRowLink>
            </ServiceRowReveal>
          </div>
          <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
            <ServiceRowReveal rowIndex={1} className={"framer-1289ev8-container"}>
              <div className={"framer-psO7m framer-11wtfxh framer-v-1m94y22"} data-framer-name={"Mobile"}>
                <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                  <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-a0htzi": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                    <h3 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "32px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "140%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-a0htzi, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                      <AnimatedWords variant="services" text={content.items[1] ?? ""} />
                    </h3>
                  </div>
                </div>
              </div>
            </ServiceRowReveal>
          </div>
          <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
            <ServiceRowReveal rowIndex={1} className={"framer-1289ev8-container"}>
              <div className={"framer-psO7m framer-11wtfxh framer-v-1l5esg8"} data-framer-name={"Tablet"}>
                <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                  <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <h1 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "80px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "90%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-gdpscs, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                      <AnimatedWords variant="services" text={content.items[1] ?? ""} />
                    </h1>
                  </div>
                </div>
              </div>
            </ServiceRowReveal>
          </div>
          <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
            <ServiceRowReveal rowIndex={2} className={"framer-9ohqu1-container"}>
              <ServiceRowLink
                href={serviceHref(content, 2)}
                className={desktopRowClass(activeIndex, 2)}
                framerName="Desktop"
                onMouseEnter={() => onRowEnter?.(2)}
                onMouseLeave={() => onRowLeave?.()}
              >
                <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                  <ServiceRowIcon>
                      <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                        <img decoding={"async"} loading={"lazy"} width={172} height={106} src={`${content.decor}?width=172&height=106`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                      </div>
                  </ServiceRowIcon>
                  <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <h1 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "72px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "90%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-gdpscs, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                      <AnimatedWords variant="services" startDelay={SERVICE_TEXT_AFTER_ICON} text={content.items[2] ?? ""} />
                    </h1>
                  </div>
                </div>
              </ServiceRowLink>
            </ServiceRowReveal>
          </div>
          <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
            <ServiceRowReveal rowIndex={2} className={"framer-9ohqu1-container"}>
              <div className={"framer-psO7m framer-11wtfxh framer-v-1m94y22"} data-framer-name={"Mobile"}>
                <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                  <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-a0htzi": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                    <h3 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "32px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "140%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-a0htzi, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                      <AnimatedWords variant="services" text={content.items[2] ?? ""} />
                    </h3>
                  </div>
                </div>
              </div>
            </ServiceRowReveal>
          </div>
          <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
            <ServiceRowReveal rowIndex={2} className={"framer-9ohqu1-container"}>
              <div className={"framer-psO7m framer-11wtfxh framer-v-1l5esg8"} data-framer-name={"Tablet"}>
                <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                  <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <h1 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "80px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "90%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-gdpscs, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                      <AnimatedWords variant="services" text={content.items[2] ?? ""} />
                    </h1>
                  </div>
                </div>
              </div>
            </ServiceRowReveal>
          </div>
          <div className={"ssr-variant hidden-g5y12p hidden-r4q9g"}>
            <ServiceRowReveal rowIndex={3} className={"framer-6ugkl0-container"}>
              <ServiceRowLink
                href={serviceHref(content, 3)}
                className={desktopRowClass(activeIndex, 3)}
                framerName="Desktop"
                onMouseEnter={() => onRowEnter?.(3)}
                onMouseLeave={() => onRowLeave?.()}
              >
                <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                  <ServiceRowIcon>
                      <div style={{"position": "absolute", "borderRadius": "inherit", "cornerShape": "inherit", "top": "0", "right": "0", "bottom": "0", "left": "0"}} data-framer-background-image-wrapper={true}>
                        <img decoding={"async"} loading={"lazy"} width={172} height={106} src={`${content.decor}?width=172&height=106`} alt="" style={{"display": "block", "width": "100%", "height": "100%", "borderRadius": "inherit", "cornerShape": "inherit", "objectPosition": "center", "objectFit": "cover"}} />
                      </div>
                  </ServiceRowIcon>
                  <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <h1 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "72px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "90%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-gdpscs, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                      <AnimatedWords variant="services" startDelay={SERVICE_TEXT_AFTER_ICON} text={content.items[3] ?? ""} />
                    </h1>
                  </div>
                </div>
              </ServiceRowLink>
            </ServiceRowReveal>
          </div>
          <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
            <ServiceRowReveal rowIndex={3} className={"framer-6ugkl0-container"}>
              <div className={"framer-psO7m framer-11wtfxh framer-v-1m94y22"} data-framer-name={"Mobile"}>
                <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                  <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "--extracted-a0htzi": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "transform": "none"}}>
                    <h3 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "32px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "140%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-a0htzi, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                      <AnimatedWords variant="services" text={content.items[3] ?? ""} />
                    </h3>
                  </div>
                </div>
              </div>
            </ServiceRowReveal>
          </div>
          <div className={"ssr-variant hidden-g5y12p hidden-72rtr7"}>
            <ServiceRowReveal rowIndex={3} className={"framer-6ugkl0-container"}>
              <div className={"framer-psO7m framer-11wtfxh framer-v-1l5esg8"} data-framer-name={"Tablet"}>
                <div className={"framer-5ftgev"} data-framer-name={"Icon and Title"}>
                  <div className={"framer-wjxcw0"} data-framer-component-type={"RichTextContainer"} style={{"--extracted-gdpscs": "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))", "--framer-link-text-color": "rgb(0, 153, 255)", "--framer-link-text-decoration": "underline", "transform": "none"}}>
                    <h1 dir={"auto"} className={"framer-text"} style={{"--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=", "--framer-font-family": "\"Inter Display\", \"Inter Display Placeholder\", sans-serif", "--framer-font-size": "80px", "--framer-font-weight": "700", "--framer-letter-spacing": "-0.04em", "--framer-line-height": "90%", "--framer-text-alignment": "left", "--framer-text-color": "var(--extracted-gdpscs, var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237)))"}}>
                      <AnimatedWords variant="services" text={content.items[3] ?? ""} />
                    </h1>
                  </div>
                </div>
              </div>
            </ServiceRowReveal>
          </div>
          <Appear id="1xtpeth" className={"framer-1xtpeth"} data-framer-name={"Сompass"} style={{"opacity": "0.001", "transform": "translateY(-20px)"}}>
              <div className={"ssr-variant hidden-g5y12p"}>
                <div data-framer-component-type={"SVG"} data-framer-shadows className={"framer-pamvpx"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 69.99 76.028%22 overflow=%22visible%22><g><path d=%22M 9.713 62.342 C 1.878 49.407 7.908 31.311 23.182 21.924 C 38.456 12.537 57.191 15.413 65.026 28.348 C 72.862 41.283 66.832 59.378 51.558 68.765 C 36.284 78.153 17.549 75.277 9.713 62.342 Z%22 fill=%22rgb(247,244,237)%22></path><path d=%22M 31.315 41.496 L 44.339 48.544 L 50.753 30.139 Z%22 fill=%22rgb(255,83,36)%22></path><path d=%22M 31.322 41.48 L 23.6 59.355 L 22.132 64.424 L 24.649 64.424 L 44.348 48.529 L 31.324 41.48 Z M 32.655 44.214 L 39.615 48.285 L 27.378 58.631 Z%22 fill=%22rgb(41,120,243)%22></path><path d=%22M 37.311 21.2 L 41.477 20.74 L 39.394 26.968 L 37.311 26.968 Z M 56.704 45.452 L 62.106 39.815 L 63.471 45.452 L 57.29 46.763 Z M 38.548 61.314 L 40.174 61.314 L 43.037 65.443 L 42.582 67.803 L 38.027 68.589 Z M 12.257 45.189 L 12.257 50.499 L 14.6 50.499 L 18.504 48.53 L 18.504 46.763 Z%22 fill=%22rgb(0,0,0)%22></path><path d=%22M 69.975 36.826 C 69.793 30.214 64.049 22.683 64.049 22.683 L 53.473 16.713 L 43.038 14.51 L 43.038 11.387 L 47 7.53 L 45.358 3.031 L 39.394 0 C 39.394 0 33.414 1.285 32.32 1.837 C 31.226 2.387 29.95 7.623 29.95 7.623 L 31.315 12.031 L 34.994 14.051 L 28.126 15.888 L 13.538 22.959 L 4.148 33.245 C 4.148 33.245 -0.503 42.795 0.045 49.5 C 0.593 56.204 3.054 62.265 8.524 66.581 C 13.994 70.897 22.929 74.755 22.929 74.755 C 22.929 74.755 35.694 78.06 46.361 74.019 C 57.029 69.979 64.141 59.693 64.141 59.693 L 68.426 51.423 C 68.426 51.423 70.159 43.438 69.977 36.826 Z M 35.329 4.408 L 41.894 4.408 L 43.536 7.071 L 41.478 9.275 L 38.029 10.744 L 34.997 7.897 L 35.331 4.408 Z M 65.235 50.496 L 60.089 59.875 L 50.755 67.773 L 44.34 70.987 L 31.315 72.181 L 18.504 67.13 L 10.985 58.629 L 9.8 49.13 L 12.809 35.171 L 25.721 24.334 L 38.027 18.916 L 47.181 18.457 L 57.119 22.498 L 62.407 29.018 L 65.78 36.273 L 65.232 50.494 Z%22 fill=%22rgb(240,205,62)%22></path></g></svg>')"}}>                </div>
              </div>
              <div className={"ssr-variant hidden-r4q9g hidden-72rtr7"}>
                <div data-framer-component-type={"SVG"} data-framer-shadows className={"framer-pamvpx"} aria-hidden={true} style={{"imageRendering": "pixelated", "flexShrink": "0", "backgroundSize": "100% 100%", "backgroundImage": "url('data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 xmlns:xlink=%22http://www.w3.org/1999/xlink%22 viewBox=%220 0 37.995 41.015%22 overflow=%22visible%22><g><path d=%22M 5.273 33.632 C 1.019 26.654 4.293 16.892 12.585 11.827 C 20.876 6.763 31.046 8.315 35.3 15.293 C 39.554 22.271 36.28 32.033 27.989 37.097 C 19.697 42.161 9.527 40.61 5.273 33.632 Z%22 fill=%22rgb(247,244,237)%22></path><path d=%22M 17 22.386 L 24.07 26.188 L 27.552 16.259 Z%22 fill=%22rgb(255,83,36)%22></path><path d=%22M 17.004 22.377 L 12.811 32.02 L 12.015 34.755 L 13.381 34.755 L 24.075 26.18 L 17.004 22.377 Z M 17.727 23.853 L 21.505 26.048 L 14.862 31.63 Z%22 fill=%22rgb(41,120,243)%22></path><path d=%22M 20.254 11.437 L 22.516 11.189 L 21.385 14.548 L 20.254 14.548 Z M 30.782 24.52 L 33.714 21.479 L 34.456 24.52 L 31.1 25.227 Z M 20.926 33.078 L 21.809 33.078 L 23.363 35.305 L 23.116 36.578 L 20.643 37.002 Z M 6.654 24.378 L 6.654 27.243 L 7.926 27.243 L 10.045 26.181 L 10.045 25.227 Z%22 fill=%22rgb(0,0,0)%22></path><path d=%22M 37.987 19.866 C 37.888 16.3 34.769 12.237 34.769 12.237 L 29.028 9.016 L 23.364 7.828 L 23.364 6.143 L 25.514 4.062 L 24.623 1.635 L 21.385 0 C 21.385 0 18.139 0.693 17.545 0.991 C 16.951 1.288 16.258 4.112 16.258 4.112 L 17 6.49 L 18.997 7.58 L 15.268 8.571 L 7.349 12.386 L 2.252 17.935 C 2.252 17.935 -0.273 23.087 0.024 26.704 C 0.322 30.321 1.658 33.591 4.627 35.919 C 7.597 38.247 12.447 40.328 12.447 40.328 C 12.447 40.328 19.377 42.111 25.167 39.932 C 30.959 37.752 34.819 32.203 34.819 32.203 L 37.145 27.741 C 37.145 27.741 38.086 23.434 37.987 19.866 Z M 19.178 2.378 L 22.742 2.378 L 23.634 3.815 L 22.517 5.004 L 20.644 5.796 L 18.998 4.26 L 19.18 2.378 Z M 35.413 27.241 L 32.619 32.301 L 27.553 36.562 L 24.07 38.296 L 17 38.94 L 10.045 36.215 L 5.963 31.629 L 5.32 26.504 L 6.953 18.974 L 13.963 13.127 L 20.643 10.205 L 25.612 9.957 L 31.007 12.137 L 33.878 15.654 L 35.709 19.568 L 35.412 27.24 Z%22 fill=%22rgb(240,205,62)%22></path></g></svg>')"}}>                </div>
              </div>
          </Appear>
        </div>
      </ServicesContainer>
    </section>
  );
}
