"use client";

import { useHeroScroll } from "@/features/HeroScrollContext";
import { LENIS_SCROLL_EVENT } from "@/features/SmoothScroll";
import { useEffect, useMemo, useRef, type CSSProperties, type ReactNode } from "react";

const HIGHLIGHT_STYLE: CSSProperties = {
  "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMGl0YWxpYw==",
  "--framer-font-family": '"Averia Serif Libre", sans-serif',
  "--framer-font-style": "italic",
  "--framer-font-weight": "300",
};

/** Words rendered with Averia italic emphasis. */
const HIGHLIGHT_WORDS = new Set([
  "fifth",
  "grader,",
  "smart-ass,",
  "laugh.",
  "Illustrator",
  "playful",
  "years",
  "artist",
  "illustrator",
  "bold,",
  "brands,",
  "collectors.",
]);

type HeadlineToken =
  | { kind: "word"; text: string; highlight?: boolean }
  | { kind: "empty" };

function isHighlightWord(text: string): boolean {
  const normalized = text.replace(/[.,!?;:'"]/g, "");
  return HIGHLIGHT_WORDS.has(text) || HIGHLIGHT_WORDS.has(normalized);
}

function buildHeadlineTokens(headline: string): HeadlineToken[] {
  const words = headline.trim().split(/\s+/).filter(Boolean);
  return words.map((text) => ({
    kind: "word" as const,
    text,
    highlight: isHighlightWord(text),
  }));
}

export const INTRO_WORD_STYLE: CSSProperties = {
  display: "inline-block",
  opacity: "0.001",
  transform: "translateX(0px) translateY(10px) scale(1) rotate(0deg) skewX(0deg) skewY(0deg)",
};

const WORD_STYLE = INTRO_WORD_STYLE;

function snapProgress(value: number, steps = 12) {
  return Math.round(value * steps) / steps;
}

function IntroWordSpan({
  wordIndex,
  children,
  className,
}: {
  wordIndex: number;
  children: ReactNode;
  className?: string;
}) {
  return (
    <span data-intro-word={wordIndex} className={className} style={WORD_STYLE}>
      {children}
    </span>
  );
}

/** Intro headline driven by site content seed. */
export function IntroHeadline({
  fontSize,
  headline,
}: {
  fontSize: string;
  headline: string;
}) {
  const heroScroll = useHeroScroll();
  const headingRef = useRef<HTMLHeadingElement>(null);
  const tokens = useMemo(() => buildHeadlineTokens(headline), [headline]);

  useEffect(() => {
    const heading = headingRef.current;
    if (!heading || !heroScroll) return;

    const words = [...heading.querySelectorAll("[data-intro-word]")];
    const sync = () => {
      const progress = snapProgress(heroScroll.scrollYProgress.get());
      words.forEach((node, index) => {
        if (!(node instanceof HTMLElement)) return;
        if (progress >= 0.12 + index * 0.04) {
          node.style.opacity = "1";
          node.style.transform = "none";
        }
      });
    };

    const unsubscribe = heroScroll.scrollYProgress.on("change", sync);
    window.addEventListener(LENIS_SCROLL_EVENT, sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    sync();

    return () => {
      unsubscribe();
      window.removeEventListener(LENIS_SCROLL_EVENT, sync);
      window.removeEventListener("scroll", sync);
    };
  }, [heroScroll]);

  const style: CSSProperties = {
    "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
    "--framer-font-family": '"Inter Display", "Inter Display Placeholder", sans-serif',
    "--framer-font-size": fontSize,
    "--framer-font-weight": "700",
    "--framer-letter-spacing": "-0.04em",
    "--framer-line-height": "90%",
    "--framer-text-alignment": "center",
    "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
  };

  const nodes: ReactNode[] = [];
  let wordIndex = 0;

  tokens.forEach((token, index) => {
    if (index > 0) nodes.push(" ");

    if (token.kind === "word") {
      const wordNode = (
        <IntroWordSpan key={`intro-hl-word-${index}`} wordIndex={wordIndex}>
          {token.text}
        </IntroWordSpan>
      );
      wordIndex += 1;

      if (token.highlight) {
        nodes.push(
          <span key={`intro-hl-hi-${index}`} className="framer-text" style={HIGHLIGHT_STYLE}>
            {wordNode}
          </span>,
        );
      } else {
        nodes.push(wordNode);
      }
    }
  });

  return (
    <h1 ref={headingRef} dir={"auto"} style={style} className={"framer-text"}>
      {nodes}
    </h1>
  );
}

/** Greeting line with static word spans matching Framer export. */
export function IntroGreeting({ text }: { text: string }) {
  const heroScroll = useHeroScroll();
  const containerRef = useRef<HTMLHeadingElement>(null);
  const words = text.trim().split(/\s+/).filter(Boolean);

  useEffect(() => {
    const container = containerRef.current;
    if (!container || !heroScroll) return;
    const nodes = [...container.querySelectorAll("[data-intro-greeting]")];
    const sync = () => {
      const progress = snapProgress(heroScroll.scrollYProgress.get());
      nodes.forEach((node, index) => {
        if (!(node instanceof HTMLElement)) return;
        if (progress >= 0.08 + index * 0.04) {
          node.style.opacity = "1";
          node.style.transform = "none";
        }
      });
    };
    const unsubscribe = heroScroll.scrollYProgress.on("change", sync);
    window.addEventListener(LENIS_SCROLL_EVENT, sync, { passive: true });
    window.addEventListener("scroll", sync, { passive: true });
    sync();
    return () => {
      unsubscribe();
      window.removeEventListener(LENIS_SCROLL_EVENT, sync);
      window.removeEventListener("scroll", sync);
    };
  }, [heroScroll, words.length]);

  return (
    <h2
      ref={containerRef}
      className={"framer-text framer-styles-preset-1ir8ahu"}
      data-styles-preset={"RGebQr53Z"}
      dir={"auto"}
    >
      {words.map((word, index) => (
        <span key={`intro-greeting-${word}-${index}`} data-intro-greeting={index} style={INTRO_WORD_STYLE}>
          {index > 0 ? " " : ""}
          {word}
        </span>
      ))}
    </h2>
  );
}
