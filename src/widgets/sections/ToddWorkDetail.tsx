"use client";

import type { WorkDetailNavLabels } from "@/content/section-types";
import type { Work } from "@/content/types";
import { cn } from "@/shared/lib/cn";

function gallerySrcSet(src: string, width: number, height: number) {
  return `${src}?scale-down-to=512&width=${width}&height=${height} 512w,${src}?scale-down-to=1024&width=${width}&height=${height} 1024w,${src}?width=${width}&height=${height} ${width}w`;
}

export interface ToddWorkDetailProps {
  work: Work;
  navLabels: WorkDetailNavLabels;
}

/** Artwork-first project detail for the Todd production profile. */
export function ToddWorkDetail({ work, navLabels }: ToddWorkDetailProps) {
  const prevHref = work.prevSlug ? `/works/${work.prevSlug}` : "#";
  const nextHref = work.nextSlug ? `/works/${work.nextSlug}` : "#";
  const galleryImages = [work.detailHero, ...work.gallery];

  return (
    <main className="todd-detail" data-framer-name="Main">
      <div className="todd-detail__inner">
        <header className="todd-detail__header">
          {work.category ? (
            <span
              className={cn(
                "todd-detail__category",
                work.accentTone && `todd-detail__category--${work.accentTone}`,
              )}
            >
              {work.category}
            </span>
          ) : null}
          <h1 className="todd-detail__title">{work.title}</h1>
          {work.hook ? <p className="todd-detail__hook">{work.hook}</p> : null}
          <p className="todd-detail__describe">{work.describe}</p>
          <div className="todd-detail__meta">
            <span>{work.client}</span>
            <span>{work.services}</span>
            <span>{work.date}</span>
          </div>
        </header>

        <div className="todd-detail__hero-wrap">
          <img
            className="todd-detail__hero"
            src={`${work.detailHero.src}?width=1600&height=1000`}
            srcSet={gallerySrcSet(work.detailHero.src, 1600, 1000)}
            sizes="(min-width: 1200px) 1128px, 100vw"
            alt={work.detailHero.alt}
            width={1600}
            height={1000}
          />
        </div>

        <div className="todd-detail__gallery">
          {galleryImages.map((image, index) => (
            <figure key={`${image.src}-${index}`} className="todd-detail__gallery-item">
              <img
                src={`${image.src}?width=1200&height=900`}
                srcSet={gallerySrcSet(image.src, 1200, 900)}
                sizes="(min-width: 810px) 50vw, 100vw"
                alt={image.alt}
                loading={index === 0 ? "eager" : "lazy"}
                decoding="async"
                width={1200}
                height={900}
              />
            </figure>
          ))}
        </div>

        <p className="todd-detail__placeholder-note">
          Placeholder artwork — final Todd Goldman assets will replace these images
        </p>

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
      </div>
    </main>
  );
}
