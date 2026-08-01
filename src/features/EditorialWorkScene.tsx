"use client";

import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
  type MotionStyle,
} from "motion/react";
import { useRef } from "react";
import type { Work } from "@/content/types";
import { cn } from "@/shared/lib/cn";
import {
  editorialClipReveal,
  editorialDominantParallax,
  editorialSpring,
  editorialSupportParallax,
} from "@/shared/lib/motion";

function WorkPanel({
  work,
  role,
  index,
  href,
  className,
  style,
}: {
  work: Work;
  role: "dominant" | "supporting";
  index: number;
  href: string;
  className?: string;
  style?: MotionStyle;
}) {
  return (
    <motion.a
      href={href}
      className={cn("todd-scene__panel", `todd-scene__panel--${role}`, className)}
      style={style}
    >
      <div className="todd-scene__frame">
        <span className="todd-scene__number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <img
          src={work.gridThumbnail.src}
          alt={work.gridThumbnail.alt}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="todd-scene__copy">
        {work.category ? (
          <span
            className={cn(
              "todd-scene__category",
              work.accentTone && `todd-scene__category--${work.accentTone}`,
            )}
          >
            {work.category}
          </span>
        ) : null}
        <h3 className="todd-scene__title">{work.title}</h3>
        {work.hook ? <p className="todd-scene__hook">{work.hook}</p> : null}
      </div>
    </motion.a>
  );
}

function StaticWorkPanel({
  work,
  role,
  index,
  href,
}: {
  work: Work;
  role: "dominant" | "supporting";
  index: number;
  href: string;
}) {
  return (
    <a
      href={href}
      className={cn("todd-scene__panel", `todd-scene__panel--${role}`)}
      data-highlight
    >
      <div className="todd-scene__frame">
        <span className="todd-scene__number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <img
          src={work.gridThumbnail.src}
          alt={work.gridThumbnail.alt}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="todd-scene__copy">
        {work.category ? (
          <span
            className={cn(
              "todd-scene__category",
              work.accentTone && `todd-scene__category--${work.accentTone}`,
            )}
          >
            {work.category}
          </span>
        ) : null}
        <h3 className="todd-scene__title">{work.title}</h3>
        {work.hook ? <p className="todd-scene__hook">{work.hook}</p> : null}
      </div>
    </a>
  );
}

/** Uniform single card for mobile flat list. */
export function MobileWorkCard({ work, index }: { work: Work; index: number }) {
  return (
    <a
      href={`/works/${work.slug}`}
      className="todd-scene__panel todd-scene__panel--uniform"
      data-highlight
    >
      <div className="todd-scene__frame">
        <span className="todd-scene__number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
        <img
          src={work.gridThumbnail.src}
          alt={work.gridThumbnail.alt}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
        />
      </div>
      <div className="todd-scene__copy">
        {work.category ? (
          <span
            className={cn(
              "todd-scene__category",
              work.accentTone && `todd-scene__category--${work.accentTone}`,
            )}
          >
            {work.category}
          </span>
        ) : null}
        <h3 className="todd-scene__title">{work.title}</h3>
        {work.hook ? <p className="todd-scene__hook">{work.hook}</p> : null}
      </div>
    </a>
  );
}

export interface EditorialWorkSceneProps {
  dominant: Work;
  supporting: Work | null;
  sceneIndex: number;
  startIndex: number;
  /** When true, use static panels (no scroll parallax / clip-path). */
  isMobile?: boolean;
}

/** Two-work editorial scene with scroll-linked mask and parallax. */
export function EditorialWorkScene({
  dominant,
  supporting,
  sceneIndex,
  startIndex,
  isMobile = false,
}: EditorialWorkSceneProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const reversed = sceneIndex % 2 === 1;
  const useStaticPanels = reduced || isMobile;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 90%", "end 20%"],
  });

  const smooth = useSpring(scrollYProgress, editorialSpring);

  const dominantY = useTransform(
    smooth,
    [...editorialDominantParallax.yInput],
    [...editorialDominantParallax.y],
  );
  const supportY = useTransform(
    smooth,
    [...editorialSupportParallax.yInput],
    [...editorialSupportParallax.y],
  );
  const dominantClip = useTransform(
    smooth,
    [...editorialClipReveal.dominantInput],
    [...editorialClipReveal.dominant],
  );
  const supportClip = useTransform(
    smooth,
    [...editorialClipReveal.supportInput],
    [...editorialClipReveal.support],
  );
  const metaOpacity = useTransform(smooth, [0.18, 0.48], [0, 1]);
  const metaX = useTransform(smooth, [0.18, 0.48], [reversed ? 28 : -28, 0]);

  if (useStaticPanels) {
    return (
      <section
        ref={ref}
        className={cn("todd-scene", reversed && "todd-scene--reversed")}
        aria-label={`Artworks ${startIndex + 1}${supporting ? ` and ${startIndex + 2}` : ""}`}
      >
        <div className="todd-scene__stage">
          <StaticWorkPanel
            work={dominant}
            role="dominant"
            index={startIndex}
            href={`/works/${dominant.slug}`}
          />
          {supporting ? (
            <StaticWorkPanel
              work={supporting}
              role="supporting"
              index={startIndex + 1}
              href={`/works/${supporting.slug}`}
            />
          ) : null}
        </div>
      </section>
    );
  }

  return (
    <section
      ref={ref}
      className={cn("todd-scene", reversed && "todd-scene--reversed")}
      aria-label={`Artworks ${startIndex + 1}${supporting ? ` and ${startIndex + 2}` : ""}`}
    >
      <div className="todd-scene__stage">
        <WorkPanel
          work={dominant}
          role="dominant"
          index={startIndex}
          href={`/works/${dominant.slug}`}
          style={{ y: dominantY, clipPath: dominantClip }}
        />
        {supporting ? (
          <WorkPanel
            work={supporting}
            role="supporting"
            index={startIndex + 1}
            href={`/works/${supporting.slug}`}
            style={{ y: supportY, clipPath: supportClip }}
          />
        ) : null}
        <motion.div
          className="todd-scene__meta-rail"
          style={{ opacity: metaOpacity, x: metaX }}
          aria-hidden="true"
        >
          <span>{dominant.client}</span>
          <span>{dominant.date}</span>
          {supporting ? (
            <>
              <span>{supporting.client}</span>
              <span>{supporting.date}</span>
            </>
          ) : null}
        </motion.div>
      </div>
    </section>
  );
}

/** Pair filtered works into editorial scenes of two. */
export function pairWorksForScenes(works: Work[]): [Work, Work | null][] {
  const pairs: [Work, Work | null][] = [];
  for (let i = 0; i < works.length; i += 2) {
    pairs.push([works[i]!, works[i + 1] ?? null]);
  }
  return pairs;
}
