"use client";

import { useHeroScroll } from "@/features/HeroScrollContext";
import {
  motion,
  motionValue,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useMemo, type CSSProperties, type ReactNode } from "react";
import { editorialSpring } from "@/shared/lib/motion";

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

const INTRO_WORD_WINDOW = 0.1;
const INTRO_WORD_OFFSET = 10;

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function useSmoothedHeroProgress(): MotionValue<number> | null {
  const heroScroll = useHeroScroll();
  const reduced = useReducedMotion();
  const rawProgress = heroScroll?.scrollYProgress ?? motionValue(1);
  const smoothProgress = useSpring(rawProgress, editorialSpring);

  if (reduced || !heroScroll) return null;
  return smoothProgress;
}

function IntroScrollWord({
  progress,
  wordIndex,
  startProgress,
  step,
  children,
  className,
}: {
  progress: MotionValue<number>;
  wordIndex: number;
  startProgress: number;
  step: number;
  children: ReactNode;
  className?: string;
}) {
  const threshold = startProgress + wordIndex * step;

  const opacity = useTransform(progress, (value) =>
    clamp01((value - threshold) / INTRO_WORD_WINDOW),
  );
  const y = useTransform(progress, (value) => {
    const t = clamp01((value - threshold) / INTRO_WORD_WINDOW);
    return INTRO_WORD_OFFSET * (1 - t);
  });

  return (
    <motion.span className={className} style={{ display: "inline-block", opacity, y }}>
      {children}
    </motion.span>
  );
}

function IntroStaticWord({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <span className={className} style={{ display: "inline-block" }}>
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
  const tokens = useMemo(() => buildHeadlineTokens(headline), [headline]);
  const smoothProgress = useSmoothedHeroProgress();
  const useMotion = smoothProgress !== null;

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
      const wordNode = useMotion ? (
        <IntroScrollWord
          key={`intro-hl-word-${index}`}
          progress={smoothProgress}
          wordIndex={wordIndex}
          startProgress={0.12}
          step={0.04}
        >
          {token.text}
        </IntroScrollWord>
      ) : (
        <IntroStaticWord key={`intro-hl-word-${index}`}>{token.text}</IntroStaticWord>
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
    <h1 dir={"auto"} style={style} className={"framer-text"}>
      {nodes}
    </h1>
  );
}

/** Greeting line with scroll-linked word motion. */
export function IntroGreeting({ text }: { text: string }) {
  const words = text.trim().split(/\s+/).filter(Boolean);
  const smoothProgress = useSmoothedHeroProgress();
  const useMotion = smoothProgress !== null;

  return (
    <h2
      className={"framer-text framer-styles-preset-1ir8ahu"}
      data-styles-preset={"RGebQr53Z"}
      dir={"auto"}
    >
      {words.map((word, index) =>
        useMotion ? (
          <IntroScrollWord
            key={`intro-greeting-${word}-${index}`}
            progress={smoothProgress}
            wordIndex={index}
            startProgress={0.08}
            step={0.04}
          >
            {index > 0 ? " " : ""}
            {word}
          </IntroScrollWord>
        ) : (
          <IntroStaticWord key={`intro-greeting-${word}-${index}`}>
            {index > 0 ? " " : ""}
            {word}
          </IntroStaticWord>
        ),
      )}
    </h2>
  );
}
