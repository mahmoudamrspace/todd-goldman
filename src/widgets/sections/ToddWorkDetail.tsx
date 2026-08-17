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
import { TODD } from "@/shared/lib/todd-semantic-classes";

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
      <div ref={ref} className={cn("todd-detail__hero-wrap", TODD.card.shell)}>
        {image}
      </div>
    );
  }

  return (
    <motion.div
      ref={ref}
      className={cn("todd-detail__hero-wrap", TODD.card.shell)}
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
      <figure ref={ref} className={cn("todd-detail__gallery-item", TODD.card.shell)}>
        {img}
      </figure>
    );
  }

  return (
    <motion.figure
      ref={ref}
      className={cn("todd-detail__gallery-item", TODD.card.shell)}
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
  const hasPrev = Boolean(work.prevSlug);
  const hasNext = Boolean(work.nextSlug);
  const prevHref = hasPrev ? `/works/${work.prevSlug}` : undefined;
  const nextHref = hasNext ? `/works/${work.nextSlug}` : undefined;
  const ctaExternal = work.ctaHref?.startsWith("http");

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
    <main className="todd-detail" data-todd-name="Main">
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

        {work.ctaHref && work.ctaLabel ? (
          <HiddenReveal variant="work-block" style={{ opacity: 0.001, transform: "translateY(10px)" }}>
            <div className="todd-detail__cta-wrap">
              <a
                className="todd-detail__cta"
                href={work.ctaHref}
                {...(ctaExternal ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                data-highlight
                data-cursor-label={ctaExternal ? "Visit" : "Open"}
              >
                {work.ctaLabel} →
              </a>
            </div>
          </HiddenReveal>
        ) : null}

        <HiddenReveal variant="work-block" style={{ opacity: 0.001, transform: "translateY(10px)" }}>
          <nav className="todd-detail__nav" aria-label="Project navigation">
            {hasPrev ? (
              <a className={cn("todd-detail__nav-link", TODD.card.shell)} href={prevHref}>
                ← {navLabels.prevFull}
              </a>
            ) : (
              <span className="todd-detail__nav-link todd-detail__nav-link--disabled" aria-disabled="true">
                ← {navLabels.prevFull}
              </span>
            )}
            {hasNext ? (
              <a className={cn("todd-detail__nav-link", "todd-detail__nav-link--next", TODD.card.shell)} href={nextHref}>
                {navLabels.nextFull} →
              </a>
            ) : (
              <span
                className={cn(
                  "todd-detail__nav-link",
                  "todd-detail__nav-link--next",
                  "todd-detail__nav-link--disabled",
                )}
                aria-disabled="true"
              >
                {navLabels.nextFull} →
              </span>
            )}
          </nav>
        </HiddenReveal>
      </div>
    </main>
  );
}
