"use client";

import {
  AnimatePresence,
  motion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";
import { useMemo, useRef, useState } from "react";
import type { ArtPiece, ArtSeries } from "@/content/types";
import { cn } from "@/shared/lib/cn";
import {
  editorialClipReveal,
  editorialDominantParallax,
  editorialFilterTransition,
  editorialSpring,
  editorialSupportParallax,
} from "@/shared/lib/motion";
import { useIsMobile, useMediaQuery } from "@/shared/lib/use-media-query";

const ALL_SERIES = "all";

function pieceMeta(piece: ArtPiece): string[] {
  return [
    piece.medium,
    piece.year,
    piece.dimensions,
    piece.edition,
  ].filter((value): value is string => Boolean(value));
}

function ArtCatalogCard({
  piece,
  seriesLabel,
  index,
}: {
  piece: ArtPiece;
  seriesLabel: string;
  index: number;
}) {
  const ref = useRef<HTMLElement>(null);
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const mobile = useIsMobile();
  const staticCard = reduced || mobile;
  const supporting = index % 2 === 1;
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 92%", "end 24%"],
  });
  const smooth = useSpring(scrollYProgress, editorialSpring);
  const y = useTransform(
    smooth,
    supporting
      ? [...editorialSupportParallax.yInput]
      : [...editorialDominantParallax.yInput],
    supporting
      ? [...editorialSupportParallax.y]
      : [...editorialDominantParallax.y],
  );
  const clipPath = useTransform(
    smooth,
    supporting
      ? [...editorialClipReveal.supportInput]
      : [...editorialClipReveal.dominantInput],
    supporting
      ? [...editorialClipReveal.support]
      : [...editorialClipReveal.dominant],
  );
  const card = (
    <>
      <div className="todd-art-card__image-wrap">
        {/* eslint-disable-next-line @next/next/no-img-element -- catalogue assets keep their approved intrinsic proportions in the static export. */}
        <img
          className="todd-art-card__image"
          src={piece.image.src}
          alt={piece.image.alt}
          loading={index < 4 ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="todd-art-card__number" aria-hidden="true">
          {String(index + 1).padStart(2, "0")}
        </span>
      </div>
      <figcaption className="todd-art-card__caption">
        <p className="todd-art-card__series">{seriesLabel}</p>
        <h3 className="todd-art-card__title">{piece.title}</h3>
        <p className="todd-art-card__meta">{pieceMeta(piece).join(" · ")}</p>
        {piece.mature && piece.contentNote ? (
          <p className="todd-art-card__content-note">{piece.contentNote}</p>
        ) : null}
        <p className="todd-art-card__credit">{piece.credit}</p>
      </figcaption>
    </>
  );

  return (
    <motion.figure
      ref={ref}
      className={cn(
        "todd-art-card",
        `todd-art-card--rhythm-${(index % 4) + 1}`,
      )}
      data-scroll-motion={staticCard ? "static" : "active"}
      style={
        staticCard
          ? { transform: "none", clipPath: "none" }
          : { y, clipPath }
      }
    >
      {piece.externalUrl ? (
        <a
          className="todd-art-card__link"
          href={piece.externalUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label={`View ${piece.title} on its source website (opens in a new tab)`}
          data-highlight
          data-cursor-label="Look"
        >
          {card}
        </a>
      ) : (
        card
      )}
    </motion.figure>
  );
}

export interface ArtCatalogGridProps {
  items: ArtPiece[];
  series: ArtSeries[];
  mode: "archive" | "preview";
}

export function ArtCatalogGrid({ items, series, mode }: ArtCatalogGridProps) {
  const reduced = useMediaQuery("(prefers-reduced-motion: reduce)");
  const mobile = useIsMobile();
  const useLayoutMotion = !reduced && !mobile;
  const useEntranceMotion = useLayoutMotion && mode === "preview";
  const sortedSeries = useMemo(
    () => [...series].sort((left, right) => left.order - right.order),
    [series],
  );
  const sortedItems = useMemo(
    () => [...items].sort((left, right) => left.order - right.order),
    [items],
  );
  const [activeSeries, setActiveSeries] = useState(ALL_SERIES);
  const visibleItems =
    mode === "preview"
      ? sortedItems.filter((item) => item.featured).slice(0, 4)
      : activeSeries === ALL_SERIES
        ? sortedItems
        : sortedItems.filter((item) => item.series === activeSeries);
  const seriesById = new Map(sortedSeries.map((item) => [item.id, item]));
  const activeSeriesCopy =
    activeSeries === ALL_SERIES ? null : seriesById.get(activeSeries);

  return (
    <>
      {mode === "archive" ? (
        <div className="todd-art-archive__controls">
          <div
            className="todd-art-archive__filters"
            role="group"
            aria-label="Filter art by series"
          >
            <button
              type="button"
              className={cn(
                "todd-art-archive__filter",
                activeSeries === ALL_SERIES && "is-active",
              )}
              aria-pressed={activeSeries === ALL_SERIES}
              onClick={() => setActiveSeries(ALL_SERIES)}
            >
              All worlds
            </button>
            {sortedSeries.map((item) => (
              <button
                key={item.id}
                type="button"
                className={cn(
                  "todd-art-archive__filter",
                  activeSeries === item.id && "is-active",
                )}
                aria-pressed={activeSeries === item.id}
                onClick={() => setActiveSeries(item.id)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <p className="todd-art-archive__series-note">
            {activeSeriesCopy?.description ??
              "Named series and character worlds first. Medium and date stay with each piece."}
          </p>
          <p className="visually-hidden" aria-live="polite" aria-atomic="true">
            Showing {visibleItems.length} art {visibleItems.length === 1 ? "piece" : "pieces"}
            {activeSeriesCopy ? ` in ${activeSeriesCopy.label}` : ""}.
          </p>
        </div>
      ) : null}

      <motion.ul
        className={cn(
          "todd-art-grid",
          mode === "preview" && "todd-works__scenes",
        )}
        data-layout-motion={useLayoutMotion ? "active" : "static"}
        layout={useLayoutMotion}
      >
        <AnimatePresence mode={useLayoutMotion ? "popLayout" : "sync"}>
          {visibleItems.length === 0 ? (
            <motion.li
              className="todd-art-grid__empty"
              key="empty"
              initial={false}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={reduced ? { duration: 0 } : editorialFilterTransition.opacity}
            >
              No pieces in this world yet.
            </motion.li>
          ) : (
            visibleItems.map((piece, index) => (
              <motion.li
                className="todd-art-grid__item"
                key={piece.id}
                layout={useLayoutMotion}
                initial={useEntranceMotion ? { opacity: 0, y: 20 } : false}
                animate={{ opacity: 1, y: 0 }}
                exit={useLayoutMotion ? { opacity: 0, y: -12 } : { opacity: 0 }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : useLayoutMotion
                      ? editorialFilterTransition.layout
                      : editorialFilterTransition.opacity
                }
              >
                <ArtCatalogCard
                  piece={piece}
                  seriesLabel={seriesById.get(piece.series)?.label ?? piece.series}
                  index={index}
                />
              </motion.li>
            ))
          )}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
