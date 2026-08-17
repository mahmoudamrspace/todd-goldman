"use client";

import { easeOut } from "@/shared/lib/motion";
import type { SceneLayer } from "@/content/todd-scenes";
import { useHeroScroll } from "@/features/HeroScrollContext";
import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionValue,
} from "motion/react";
import { useRef } from "react";

const ENTER_TRANSITION = { duration: 0.7, ease: easeOut };
const IDLE_BOB = {
  y: [0, -8, 0],
  transition: { duration: 3.4, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const },
};
const IDLE_WIGGLE = {
  rotate: [-3.5, 3.5, -3.5],
  y: [0, -5, 0],
  transition: { duration: 2.8, repeat: Infinity, repeatType: "mirror" as const, ease: "easeInOut" as const },
};
const SCROLL_SPRING = { damping: 40, stiffness: 220, mass: 0.6 };

export type IllustratedSceneScatter = "hero" | "local" | false;

export interface IllustratedSceneProps {
  layers: SceneLayer[];
  className?: string;
  aspectRatio?: string;
  scatter?: IllustratedSceneScatter;
  scatterAmount?: number;
  disableEnter?: boolean;
}

function idleAnimate(idle: SceneLayer["idle"], reduced: boolean | null) {
  if (reduced || !idle || idle === "none") return undefined;
  return idle === "wiggle" ? IDLE_WIGGLE : IDLE_BOB;
}

function SceneLayerView({
  layer,
  index,
  reduced,
  progress,
  scatterAmount,
  disableEnter,
  inView,
}: {
  layer: SceneLayer;
  index: number;
  reduced: boolean | null;
  progress: MotionValue<number>;
  scatterAmount: number;
  disableEnter?: boolean;
  inView: boolean;
}) {
  const scatter = layer.scatter;
  const targetX = (scatter?.x ?? 0) * scatterAmount;
  const targetY = (scatter?.y ?? 0) * scatterAmount;
  const targetScale = 1 + ((scatter?.scale ?? 1) - 1) * scatterAmount;
  const targetRotate = (scatter?.rotate ?? 0) * scatterAmount;

  const rawX = useTransform(progress, [0, 1], [0, targetX]);
  const rawY = useTransform(progress, [0, 1], [0, targetY]);
  const rawScale = useTransform(progress, [0, 1], [1, targetScale]);
  const rawRotate = useTransform(progress, [0, 1], [0, targetRotate]);

  const x = useSpring(rawX, SCROLL_SPRING);
  const y = useSpring(rawY, SCROLL_SPRING);
  const scale = useSpring(rawScale, SCROLL_SPRING);
  const rotate = useSpring(rawRotate, SCROLL_SPRING);

  const scatterStyle = { x, y, scale, rotate };
  const skipEnter = reduced || disableEnter;
  const visible = skipEnter || inView;
  const hiddenPose = { opacity: 0, y: 28, scale: 0.94 };
  const shownPose = { opacity: 1, y: 0, scale: 1 };

  return (
    <motion.div
      className="illustrated-scene__layer"
      data-scene-role={layer.role ?? "mid"}
      style={{ zIndex: index + 1, ...scatterStyle }}
    >
      <motion.div
        className="illustrated-scene__enter"
        initial={skipEnter ? false : hiddenPose}
        animate={visible ? shownPose : hiddenPose}
        transition={skipEnter ? { duration: 0 } : { ...ENTER_TRANSITION, delay: layer.delay ?? index * 0.06 }}
      >
        <motion.div
          className="illustrated-scene__idle"
          animate={visible ? idleAnimate(layer.idle, reduced) : undefined}
        >
          {layer.inlineAnim ? (
            <object data={layer.src} type="image/svg+xml" aria-hidden={true} />
          ) : (
            <img src={layer.src} alt="" draggable={false} />
          )}
        </motion.div>
      </motion.div>
    </motion.div>
  );
}

/** Stacked illustration layers with enter, idle, and optional scroll-story motion. */
export function IllustratedScene({
  layers,
  className,
  aspectRatio = "1920 / 1080",
  scatter = false,
  scatterAmount = 1,
  disableEnter = false,
}: IllustratedSceneProps) {
  const reduced = useReducedMotion();
  const rootRef = useRef<HTMLDivElement>(null);
  const inView = useInView(rootRef, { once: true, amount: 0.2 });
  const heroScroll = useHeroScroll();
  const { scrollYProgress: localProgress } = useScroll({
    target: rootRef,
    offset: ["start end", "end start"],
  });

  const amount = reduced || !scatter ? 0 : scatterAmount;
  const progress =
    scatter === "hero" && heroScroll?.scrollYProgress
      ? heroScroll.scrollYProgress
      : localProgress;

  return (
    <div
      ref={rootRef}
      className={["illustrated-scene", className].filter(Boolean).join(" ")}
      data-scene-inview={inView ? "true" : "false"}
      aria-hidden={true}
      style={{ aspectRatio }}
    >
      {layers.map((layer, index) => (
        <SceneLayerView
          key={`${layer.src}-${index}`}
          layer={layer}
          index={index}
          reduced={reduced}
          progress={progress}
          scatterAmount={amount}
          disableEnter={disableEnter}
          inView={inView}
        />
      ))}
    </div>
  );
}

export interface SceneDoodleProps {
  src: string;
  className?: string;
  idle?: SceneLayer["idle"];
  fit?: "contain" | "cover" | "tight";
  objectPosition?: string;
  inlineAnim?: boolean;
  disableEnter?: boolean;
}

/** Single doodle with enter + idle motion. */
export function SceneDoodle({
  src,
  className,
  idle = "wiggle",
  fit = "contain",
  objectPosition,
  inlineAnim = false,
  disableEnter = false,
}: SceneDoodleProps) {
  const reduced = useReducedMotion();
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.1, margin: "120px" });

  return (
    <motion.div
      ref={ref}
      className={["scene-doodle", className].filter(Boolean).join(" ")}
      data-fit={fit}
      aria-hidden={true}
      initial={reduced || disableEnter ? false : { opacity: 0, y: 18, scale: 0.9 }}
      animate={
        reduced || disableEnter || inView
          ? { opacity: 1, y: 0, scale: 1 }
          : { opacity: 0, y: 18, scale: 0.9 }
      }
      transition={reduced || disableEnter ? { duration: 0 } : ENTER_TRANSITION}
    >
      {inlineAnim ? (
        <motion.div
          className="scene-doodle__inline"
          animate={inView ? idleAnimate(idle, reduced) : undefined}
        >
          <object
            data={src}
            type="image/svg+xml"
            aria-hidden={true}
            style={objectPosition ? { objectPosition } : undefined}
          />
        </motion.div>
      ) : (
        <motion.img
          src={src}
          alt=""
          draggable={false}
          style={objectPosition ? { objectPosition } : undefined}
          animate={inView ? idleAnimate(idle, reduced) : undefined}
        />
      )}
    </motion.div>
  );
}
