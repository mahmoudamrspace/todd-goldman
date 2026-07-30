"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useCallback, useMemo, useState } from "react";
import {
  EditorialWorkScene,
  pairWorksForScenes,
} from "@/features/EditorialWorkScene";
import { AnimatedSpan, HiddenReveal } from "@/features/HiddenReveal";
import type { WorksContent } from "@/content/section-types";
import { cn } from "@/shared/lib/cn";
import { editorialFilterTransition } from "@/shared/lib/motion";

const ALL_FILTER = "All";

export interface WorksGalleryProps {
  content: WorksContent;
}

/** Editorial two-work scenes for the Todd production profile. */
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

  const scenes = useMemo(
    () => pairWorksForScenes(filteredWorks),
    [filteredWorks],
  );

  const onFilter = useCallback((category: string) => {
    setActiveFilter(category);
  }, []);

  const titleLead = content.titleWords[0] ?? "Selected";
  const titleTail = content.titleWords.slice(1).join(" ") || "art";

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
              Bold illustration, dry humor, and pop-art worlds — scroll through
              paired editorial scenes.
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

        <motion.div
          className="todd-works__scenes"
          id="selected-projects"
          layout={!reduced}
        >
          <AnimatePresence mode="popLayout">
            {scenes.length === 0 ? (
              <motion.p
                key="empty"
                className="todd-works__empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={editorialFilterTransition.opacity}
              >
                No pieces in this category yet.
              </motion.p>
            ) : (
              scenes.map(([dominant, supporting], sceneIndex) => {
                const startIndex = sceneIndex * 2;
                const sceneKey = `${dominant.slug}-${supporting?.slug ?? "solo"}-${activeFilter}`;
                return (
                  <motion.div
                    key={sceneKey}
                    layout={!reduced}
                    initial={reduced ? false : { opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={editorialFilterTransition.layout}
                  >
                    <EditorialWorkScene
                      dominant={dominant}
                      supporting={supporting}
                      sceneIndex={sceneIndex}
                      startIndex={startIndex}
                    />
                  </motion.div>
                );
              })
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
