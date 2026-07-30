"use client";

import { useCallback, useMemo, useState } from "react";
import type { WorksContent } from "@/content/section-types";
import type { Work } from "@/content/types";
import { cn } from "@/shared/lib/cn";

const ALL_FILTER = "All";

function cardSizeClass(work: Work, index: number): string {
  if (work.featured) return "todd-work-card--featured";
  if (index % 5 === 3 || index % 5 === 4) return "todd-work-card--compact";
  return "";
}

export interface WorksGalleryProps {
  content: WorksContent;
}

/** Art-first gallery wall for the Todd production profile. */
export function WorksGallery({ content }: WorksGalleryProps) {
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

  return (
    <section className="todd-works" id="works" aria-labelledby="todd-works-title">
      <div className="todd-works__inner">
        <header className="todd-works__header">
          <h2 className="todd-works__title" id="todd-works-title">
            {titleLead}{" "}
            <em>{titleTail}</em>
          </h2>
          <p className="todd-works__subtitle">
            Bold illustration, dry humor, and pop-art worlds — grouped by how the
            work lives in the wild.
          </p>
          {categories.length > 2 ? (
            <div className="todd-works__filters" role="group" aria-label="Filter by category">
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
          ) : null}
        </header>

        <div className="todd-works__grid" id="selected-projects">
          {filteredWorks.length === 0 ? (
            <p className="todd-works__empty">No pieces in this category yet.</p>
          ) : (
            filteredWorks.map((work, index) => (
              <a
                key={work.slug}
                href={`/works/${work.slug}`}
                className={cn("todd-work-card", cardSizeClass(work, index))}
              >
                <article className="todd-work-card__frame">
                  <div className="todd-work-card__media">
                    <span className="todd-work-card__number" aria-hidden="true">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                    <img
                      src={work.gridThumbnail.src}
                      alt={work.gridThumbnail.alt}
                      loading={index < 2 ? "eager" : "lazy"}
                      decoding="async"
                    />
                  </div>
                  <div className="todd-work-card__body">
                    {work.category ? (
                      <span
                        className={cn(
                          "todd-work-card__category",
                          work.accentTone &&
                            `todd-work-card__category--${work.accentTone}`,
                        )}
                      >
                        {work.category}
                      </span>
                    ) : null}
                    <h3 className="todd-work-card__title">{work.title}</h3>
                    {work.hook ? (
                      <p className="todd-work-card__hook">{work.hook}</p>
                    ) : null}
                    <div className="todd-work-card__meta">
                      <span>{work.client}</span>
                      <span>{work.date}</span>
                    </div>
                  </div>
                </article>
              </a>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
