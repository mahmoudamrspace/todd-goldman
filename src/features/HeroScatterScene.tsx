"use client";

import type { ToddHeroPiece } from "@/content/todd-hero-pieces";
import { useHeroScroll } from "@/features/HeroScrollContext";
import {
  HERO_SCROLL_SPRING,
  type HeroScatterTarget,
} from "@/features/hero-scatter-data";
import { editorialSpring } from "@/shared/lib/motion";
import {
  motion,
  useReducedMotion,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";

const ENTER_SPRING = {
  type: "spring" as const,
  bounce: 0.16,
  duration: 1.05,
};

const BG_SPRING = { damping: 68, stiffness: 380, mass: 1.1, restDelta: 0.001 };
const MID_SPRING = HERO_SCROLL_SPRING;
const PARTICLE_SPRING = { damping: 52, stiffness: 580, mass: 0.85, restDelta: 0.001 };

function springForPiece(piece: ToddHeroPiece) {
  if (piece.scatter.spring) return piece.scatter.spring;
  if (piece.id.startsWith("bg-") || piece.id === "backdrop") return BG_SPRING;
  if (piece.id.startsWith("particle")) return PARTICLE_SPRING;
  return MID_SPRING;
}

function useHeroScatterProgress(scrollYProgress: MotionValue<number>) {
  const smoothed = useSpring(scrollYProgress, editorialSpring);
  return useTransform(smoothed, [0, 0.1, 1], [0, 0, 1]);
}

function useHeroPieceScatter(
  scatter: HeroScatterTarget,
  piece: ToddHeroPiece,
  progress: MotionValue<number>,
  reduced: boolean | null,
) {
  const springConfig = springForPiece(piece);
  const snapSpring = reduced ? { stiffness: 1000, damping: 100, mass: 0.2 } : springConfig;

  const rawX = useTransform(progress, [0, 1], [0, scatter.x]);
  const rawY = useTransform(progress, [0, 1], [0, scatter.y]);
  const rawScale = useTransform(progress, [0, 1], [1, scatter.scale]);
  const rawOpacity = useTransform(progress, [0, 1], [1, scatter.opacity ?? 1]);
  const rawRotate = useTransform(progress, [0, 1], [0, scatter.rotate ?? 0]);

  return {
    x: useSpring(rawX, snapSpring),
    y: useSpring(rawY, snapSpring),
    scale: useSpring(rawScale, springConfig),
    opacity: useSpring(rawOpacity, springConfig),
    rotate: useSpring(rawRotate, springConfig),
  };
}

function HeroScatterPiece({
  piece,
  progress,
  reduced,
}: {
  piece: ToddHeroPiece;
  progress: MotionValue<number>;
  reduced: boolean | null;
}) {
  const enter = piece.enter ?? { y: 24, scale: 0.92 };
  const scatter = useHeroPieceScatter(piece.scatter, piece, progress, reduced);

  if (reduced) {
    return (
      <div
        className="todd-hero-piece"
        data-hero-piece={piece.id}
        style={{ zIndex: piece.zIndex }}
        aria-hidden={true}
      >
        <div className="todd-hero-piece__idle" data-hero-idle="none">
          <img src={piece.src} alt="" draggable={false} />
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className="todd-hero-piece"
      data-hero-piece={piece.id}
      style={{
        zIndex: piece.zIndex,
        x: scatter.x,
        y: scatter.y,
        scale: scatter.scale,
        opacity: scatter.opacity,
        rotate: scatter.rotate,
        willChange: "transform",
      }}
      aria-hidden={true}
    >
      <motion.div
        className="todd-hero-piece__enter"
        initial={{
          opacity: 0,
          x: enter.x ?? 0,
          y: enter.y ?? 24,
          scale: enter.scale ?? 0.92,
          rotate: enter.rotate ?? 0,
        }}
        animate={{ opacity: 1, x: 0, y: 0, scale: 1, rotate: 0 }}
        transition={{ ...ENTER_SPRING, delay: piece.enterDelay ?? 0 }}
      >
        <div
          className="todd-hero-piece__idle"
          data-hero-idle={piece.idle ?? "none"}
        >
          <img src={piece.src} alt="" draggable={false} />
        </div>
      </motion.div>
    </motion.div>
  );
}

function HeroScatterSceneAnimated({
  pieces,
  scrollYProgress,
}: {
  pieces: ToddHeroPiece[];
  scrollYProgress: MotionValue<number>;
}) {
  const reduced = useReducedMotion();
  const progress = useHeroScatterProgress(scrollYProgress);

  return (
    <div className="todd-hero-stage" aria-hidden={true}>
      {pieces.map((piece) => (
        <HeroScatterPiece
          key={piece.id}
          piece={piece}
          progress={progress}
          reduced={reduced}
        />
      ))}
    </div>
  );
}

/** Todd Welcome art as separate layers that connect on load and scatter on scroll. */
export function HeroScatterScene({ pieces }: { pieces: ToddHeroPiece[] }) {
  const heroScroll = useHeroScroll();

  if (!heroScroll) {
    return (
      <div className="todd-hero-stage" aria-hidden={true}>
        <img
          className="todd-hero-stage__fallback"
          src={pieces.find((p) => p.id === "mid-b")?.src ?? pieces[0]?.src}
          alt=""
          draggable={false}
        />
      </div>
    );
  }

  return (
    <HeroScatterSceneAnimated pieces={pieces} scrollYProgress={heroScroll.scrollYProgress} />
  );
}
