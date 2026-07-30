"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import { AnimatedSpan, HiddenReveal } from "@/features/HiddenReveal";
import type { WorksContent } from "@/content/section-types";
import type { Work } from "@/content/types";
import { cn } from "@/shared/lib/cn";
import { fadeUpCard, staggerFast } from "@/shared/lib/motion";

const ALL_FILTER = "All";
const MAX_STAGGER_INDEX = 7;

function GalleryCard({
  work,
  displayIndex,
}: {
  work: Work;
  displayIndex: number;
}) {
  const reduced = useReducedMotion();
  const staggerDelay = Math.min(displayIndex, MAX_STAGGER_INDEX) * 0.06;

  const cardInner = (
    <article className="todd-work-card__frame">
      <div className="todd-work-card__media">
        <span className="todd-work-card__number" aria-hidden="true">
          {String(displayIndex + 1).padStart(2, "0")}
        </span>
        <motion.img
          src={work.gridThumbnail.src}
          alt={work.gridThumbnail.alt}
          loading={displayIndex < 4 ? "eager" : "lazy"}
          decoding="async"
          initial={reduced ? false : { scale: 1.04 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: staggerDelay + 0.1, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      <div className="todd-work-card__body">
        {work.category ? (
          <span
            className={cn(
              "todd-work-card__category",
              work.accentTone && `todd-work-card__category--${work.accentTone}`,
            )}
          >
            {work.category}
          </span>
        ) : null}
        <h3 className="todd-work-card__title">{work.title}</h3>
        {work.hook ? <p className="todd-work-card__hook">{work.hook}</p> : null}
        <div className="todd-work-card__meta">
          <span>{work.client}</span>
          <span>{work.date}</span>
        </div>
      </div>
    </article>
  );

  if (reduced) {
    return (
      <a href={`/works/${work.slug}`} className="todd-work-card">
        {cardInner}
      </a>
    );
  }

  return (
    <motion.a
      layout
      href={`/works/${work.slug}`}
      className="todd-work-card"
      variants={fadeUpCard}
      initial="hidden"
      animate="visible"
      exit={{ opacity: 0, y: 12, scale: 0.97, transition: { duration: 0.22 } }}
      transition={{ delay: staggerDelay }}
    >
      {cardInner}
    </motion.a>
  );
}

export interface WorksGalleryProps {
  content: WorksContent;
}

/** Art-first gallery wall for the Todd production profile. */
export function WorksGallery({ content }: WorksGalleryProps) {
  const reduced = useReducedMotion();
  const categories = useMemo(() => {
    const set = new Set<string>();
    content.works.forEach((work) => {
      if (work.category) set.add(work.category);
    });
    return [ALL_FILTER, ...Array.from(set)];
  }, [content.works]);

  const [activeFilter, setActiveFilter] = useState(ALL_FILTER);

  const filteredWorks = useMemo(() => {
    if (activeFilter === ALL_FILTER) return content.works;
    return content.works.filter((work) => work.category === activeFilter);
  }, [activeFilter, content.works]);

  const onFilter = useCallback((category: string) => {
    setActiveFilter(category);
  }, []);

  const titleLead = content.titleWords[0] ?? "Selected";
  const titleTail = content.titleWords.slice(1).join(" ") || "art";

  const grid = (
    <motion.div
      className="todd-works__grid"
      id="selected-projects"
      variants={reduced ? undefined : staggerFast}
      initial={reduced ? undefined : "hidden"}
      whileInView={reduced ? undefined : "visible"}
      viewport={{ once: true, amount: 0.08 }}
    >
      <AnimatePresence mode="popLayout">
        {filteredWorks.length === 0 ? (
          <motion.p
            key="empty"
            className="todd-works__empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            No pieces in this category yet.
          </motion.p>
        ) : (
          filteredWorks.map((work, index) => (
            <GalleryCard key={work.slug} work={work} displayIndex={index} />
          ))
        )}
      </AnimatePresence>
    </motion.div>
  );

  return (
    <section className="todd-works" id="works" aria-labelledby="todd-works-title">
      <div className="todd-works__inner">
        <header className="todd-works__header">
          <h2 className="todd-works__title" id="todd-works-title">
            <AnimatedSpan y={10}>{titleLead}</AnimatedSpan>{" "}
            <em>
              <AnimatedSpan y={10} delay={0.06}>
                {titleTail}
              </AnimatedSpan>
            </em>
          </h2>
          <HiddenReveal
            style={{ opacity: 0.001, transform: "translateY(16px)" }}
          >
            <p className="todd-works__subtitle">
              Bold illustration, dry humor, and pop-art worlds — grouped by how
              the work lives in the wild.
            </p>
          </HiddenReveal>
          {categories.length > 2 ? (
            <HiddenReveal
              style={{ opacity: 0.001, transform: "translateY(16px)" }}
            >
              <div
                className="todd-works__filters"
                role="group"
                aria-label="Filter by category"
              >
                {categories.map((category) => (
                  <button
                    key={category}
                    type="button"
                    className={cn(
                      "todd-works__filter",
                      activeFilter === category && "is-active",
                    )}
                    aria-pressed={activeFilter === category}
                    onClick={() => onFilter(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </HiddenReveal>
          ) : null}
        </header>

        {grid}
      </div>
    </section>
  );
}
