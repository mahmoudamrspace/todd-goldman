"use client";

import { useHeroScroll } from "@/features/HeroScrollContext";
import { LENIS_SCROLL_EVENT } from "@/features/SmoothScroll";
import { useEffect, useRef, type CSSProperties, type ReactNode } from "react";

const INTER_BOLD_STYLE: CSSProperties = {
  "--font-selector": "SW50ZXItQm9sZA==",
  "--framer-font-family": '"Inter", "Inter Placeholder", sans-serif',
};

const HIGHLIGHT_STYLE: CSSProperties = {
  "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMGl0YWxpYw==",
  "--framer-font-family": '"Averia Serif Libre", sans-serif',
  "--framer-font-style": "italic",
  "--framer-font-weight": "300",
};

type HeadlineToken =
  | { kind: "word"; text: string }
  | { kind: "empty" }
  | { kind: "inter-spaces"; parts: [string, string] }
  | { kind: "highlight"; words: string[] };

/** Reference export token stream for the desktop intro headline. */
const HEADLINE_TOKENS: HeadlineToken[] = [
  { kind: "word", text: "I" },
  { kind: "word", text: "am" },
  { kind: "word", text: "an" },
  { kind: "word", text: "independent" },
  { kind: "inter-spaces", parts: ["", " "] },
  { kind: "highlight", words: ["Illustrator"] },
  { kind: "inter-spaces", parts: ["", " "] },
  { kind: "word", text: "and" },
  { kind: "word", text: "brand" },
  { kind: "word", text: "designer" },
  { kind: "word", text: "with" },
  { kind: "empty" },
  { kind: "highlight", words: ["9", "years"] },
  { kind: "empty" },
  { kind: "word", text: "of" },
  { kind: "word", text: "experience." },
];

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

/** Intro headline with reference `framer-text` highlight spans. */
export function IntroHeadline({ fontSize }: { fontSize: string }) {
  const heroScroll = useHeroScroll();
  const headingRef = useRef<HTMLHeadingElement>(null);

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

  HEADLINE_TOKENS.forEach((token, index) => {
    if (index > 0) nodes.push(" ");

    switch (token.kind) {
      case "word":
        nodes.push(
          <IntroWordSpan key={`intro-hl-word-${index}`} wordIndex={wordIndex}>
            {token.text}
          </IntroWordSpan>,
        );
        wordIndex += 1;
        break;
      case "empty":
        nodes.push(
          <IntroWordSpan key={`intro-hl-empty-${index}`} wordIndex={wordIndex}>
            {""}
          </IntroWordSpan>,
        );
        wordIndex += 1;
        break;
      case "inter-spaces":
        nodes.push(
          <span key={`intro-hl-inter-${index}`} className="framer-text" style={INTER_BOLD_STYLE}>
            {token.parts.map((part, partIndex) => (
              <IntroWordSpan key={`intro-hl-inter-${index}-${partIndex}`} wordIndex={wordIndex}>
                {part}
              </IntroWordSpan>
            ))}
          </span>,
        );
        wordIndex += token.parts.length;
        break;
      case "highlight":
        nodes.push(
          <span key={`intro-hl-hi-${index}`} className="framer-text" style={HIGHLIGHT_STYLE}>
            {token.words.map((word, partIndex) => (
              <IntroWordSpan key={`intro-hl-hi-${index}-${partIndex}`} wordIndex={wordIndex + partIndex}>
                {partIndex > 0 ? " " : ""}
                {word}
              </IntroWordSpan>
            ))}
          </span>,
        );
        wordIndex += token.words.length;
        break;
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
