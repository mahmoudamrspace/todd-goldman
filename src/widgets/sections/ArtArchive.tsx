"use client";

import Link from "next/link";
import { useReducedMotion } from "motion/react";
import type { ArtCatalog } from "@/content/types";
import { ArtCatalogGrid } from "@/features/art/ArtCatalogGrid";
import { AnimatedSpan, HiddenReveal } from "@/features/HiddenReveal";
import { cn } from "@/shared/lib/cn";

export interface ArtArchiveProps {
  catalog: ArtCatalog;
  mode: "archive" | "preview";
}

export function ArtArchive({ catalog, mode }: ArtArchiveProps) {
  const reduced = useReducedMotion();
  const archive = mode === "archive";
  const showStaticCopy = reduced || archive;
  const titleId = archive ? "todd-art-archive-title" : "todd-works-title";
  const Heading = archive ? "h1" : "h2";
  const titleLead = archive ? catalog.titleLead : "Selected";
  const titleEmphasis = archive ? catalog.titleEmphasis : "art";

  return (
    <section
      className={cn(
        "todd-art-archive",
        archive ? "todd-art-archive--full" : "todd-art-archive--preview",
        !archive && "todd-works",
      )}
      id={archive ? "art-catalog" : "works"}
      aria-labelledby={titleId}
      data-catalog-status={catalog.status}
    >
      <div className={cn("todd-art-archive__inner", !archive && "todd-works__inner")}>
        <header className={cn("todd-art-archive__header", !archive && "todd-works__header")}>
          <p className="todd-art-archive__eyebrow">{catalog.eyebrow}</p>
          <Heading
            className={cn("todd-art-archive__title", !archive && "todd-works__title")}
            id={titleId}
          >
            {showStaticCopy ? (
              <>
                {titleLead} <em>{titleEmphasis}</em>
              </>
            ) : (
              <>
                <AnimatedSpan y={12}>{titleLead}</AnimatedSpan>{" "}
                <em>
                  <AnimatedSpan y={12} delay={0.06}>
                    {titleEmphasis}
                  </AnimatedSpan>
                </em>
              </>
            )}
          </Heading>
          {showStaticCopy ? (
            <p
              className={cn("todd-art-archive__intro", !archive && "todd-works__subtitle")}
            >
              {catalog.intro}
            </p>
          ) : (
            <HiddenReveal
              className="todd-art-archive__intro-reveal"
              style={{ opacity: 0.001, transform: "translateY(16px)" }}
            >
              <p
                className={cn(
                  "todd-art-archive__intro",
                  !archive && "todd-works__subtitle",
                )}
              >
                {catalog.intro}
              </p>
            </HiddenReveal>
          )}
        </header>

        <ArtCatalogGrid
          items={catalog.items}
          series={catalog.series}
          mode={mode}
        />

        {!archive ? (
          <div className="todd-art-archive__more">
            <Link
              className="todd-art-archive__more-link"
              href="/art/"
              data-highlight
              data-cursor-label="See all"
            >
              See all art
              <span aria-hidden="true"> ↗</span>
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
