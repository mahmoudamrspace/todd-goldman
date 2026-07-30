"use client";

import { useRef, type ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { AnimatedWords, HiddenReveal } from "@/features/HiddenReveal";
import type { WorkDetailNavLabels } from "@/content/section-types";
import type { Work } from "@/content/types";
import { cn } from "@/shared/lib/cn";
import {
  editorialClipReveal,
  editorialDominantParallax,
  editorialSpring,
  workDetailEnter,
} from "@/shared/lib/motion";

function gallerySrcSet(src: string, width: number, height: number) {
  return `${src}?scale-down-to=512&width=${width}&height=${height} 512w,${src}?scale-down-to=1024&width=${width}&height=${height} 1024w,${src}?width=${width}&height=${height} ${width}w`;
}

function DetailHero({ work }: { work: Work }) {
  const ref = useRef<HTMLDivElement>(null);
  const reduced = useReducedMotion();

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 35%"],
  });
  const smooth = useSpring(scrollYProgress, editorialSpring);
  const heroY = useTransform(
    smooth,
    [...editorialDominantParallax.yInput],
    [...editorialDominantParallax.y],
  );
  const heroClip = useTransform(
    smooth,
    [...editorialClipReveal.dominantInput],
    [...editorialClipReveal.dominant],
  );

  const image = (
    <img
      className="todd-detail__hero"
      src={`${work.detailHero.src}?width=1400&height=875`}
      srcSet={gallerySrcSet(work.detailHero.src, 1400, 875)}
      sizes="(min-width: 1200px) 1128px, 100vw"
      alt={work.detailHero.alt}
      width={1400}
      height={875}
    />
  );

  if (reduced) {
    return (
      <div ref={ref} className="todd-detail__hero-wrap">
        {image}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className="todd-detail__hero-wrap"
      style={{ y: heroY, clipPath: heroClip }}
    >
      {image}
    </motion.div>
  );
}

function DetailGalleryItem({
  image,
  index,
}: {
  image: Work["gallery"][number];
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useReducedMotion();
  const reversed = index % 2 === 1;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 40%"],
  });
  const smooth = useSpring(scrollYProgress, editorialSpring);
  const itemClip = useTransform(
    smooth,
    reversed
      ? [...editorialClipReveal.supportInput]
      : [...editorialClipReveal.dominantInput],
    reversed
      ? [...editorialClipReveal.support]
      : [...editorialClipReveal.dominant],
  );
  const itemY = useTransform(
    smooth,
    reversed ? [0, 0.5, 1] : [...editorialDominantParallax.yInput],
    reversed ? [40, 0, -20] : [...editorialDominantParallax.y],
  );

  const img = (
    <img
      src={`${image.src}?width=900&height=675`}
      srcSet={gallerySrcSet(image.src, 900, 675)}
      sizes="(min-width: 810px) 50vw, 100vw"
      alt={image.alt}
      loading="lazy"
      decoding="async"
      width={900}
      height={675}
    />
  );

  if (reduced) {
    return (
      <figure ref={ref} className="todd-detail__gallery-item">
        {img}
      </figure>
    );
  }

  return (
    <motion.figure
      ref={ref}
      className="todd-detail__gallery-item"
      style={{ y: itemY, clipPath: itemClip }}
    >
      {img}
    </motion.figure>
  );
}

export interface ToddWorkDetailProps {
  work: Work;
  navLabels: WorkDetailNavLabels;
}

/** Artwork-first project detail for the Todd production profile. */
export function ToddWorkDetail({ work, navLabels }: ToddWorkDetailProps) {
  const reduced = useReducedMotion();
  const prevHref = work.prevSlug ? `/works/${work.prevSlug}` : "#";
  const nextHref = work.nextSlug ? `/works/${work.nextSlug}` : "#";

  const headerBlock = (children: ReactNode, key: string, delay = 0) => {
    if (reduced) return <div key={key}>{children}</div>;
    return (
      <motion.div
        key={key}
        variants={workDetailEnter}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.15 }}
        transition={{ delay }}
      >
        {children}
      </motion.div>
    );
  };

  return (
    <main className="todd-detail" data-framer-name="Main">
      <div className="todd-detail__inner">
        <header className="todd-detail__header">
          {work.category
            ? headerBlock(
                <span
                  className={cn(
                    "todd-detail__category",
                    work.accentTone && `todd-detail__category--${work.accentTone}`,
                  )}
                >
                  {work.category}
                </span>,
                "category",
              )
            : null}

          <h1 className="todd-detail__title">
            <AnimatedWords text={work.title} variant="work-detail" y={20} />
          </h1>

          {work.hook
            ? headerBlock(
                <p className="todd-detail__hook">{work.hook}</p>,
                "hook",
                0.08,
              )
            : null}

          <HiddenReveal variant="work-block" style={{ opacity: 0.001, transform: "translateY(10px)" }}>
            <p className="todd-detail__describe">{work.describe}</p>
          </HiddenReveal>

          <HiddenReveal variant="work-block" style={{ opacity: 0.001, transform: "translateY(10px)" }}>
            <div className="todd-detail__meta">
              <span>{work.client}</span>
              <span>{work.services}</span>
              <span>{work.date}</span>
            </div>
          </HiddenReveal>
        </header>

        <DetailHero work={work} />

        {work.gallery.length > 0 ? (
          <div className="todd-detail__gallery">
            {work.gallery.map((image, index) => (
              <DetailGalleryItem
                key={`${image.src}-${index}`}
                image={image}
                index={index}
              />
            ))}
          </div>
        ) : null}

        <HiddenReveal variant="work-block" style={{ opacity: 0.001, transform: "translateY(10px)" }}>
          <p className="todd-detail__placeholder-note">
            Placeholder artwork — final Todd Goldman assets will replace these images
          </p>
        </HiddenReveal>

        <HiddenReveal variant="work-block" style={{ opacity: 0.001, transform: "translateY(10px)" }}>
          <nav className="todd-detail__nav" aria-label="Project navigation">
            <a
              className="todd-detail__nav-link"
              href={prevHref}
              aria-disabled={!work.prevSlug}
            >
              ← {navLabels.prevFull}
            </a>
            <a
              className={cn("todd-detail__nav-link", "todd-detail__nav-link--next")}
              href={nextHref}
              aria-disabled={!work.nextSlug}
            >
              {navLabels.nextFull} →
            </a>
          </nav>
        </HiddenReveal>
      </div>
    </main>
  );
}
