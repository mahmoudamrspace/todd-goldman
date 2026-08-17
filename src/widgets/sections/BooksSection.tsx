"use client";

import { useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import type { BooksContent } from "@/content/section-types";
import type { Book } from "@/content/types";
import { SectionHeading } from "@/widgets/compositions/SectionHeading";
import { BooksReplayProvider, HiddenReveal } from "@/features/HiddenReveal";
import { SceneDoodle } from "@/features/IllustratedScene";
import { cn } from "@/shared/lib/cn";
import { externalLinkAriaLabel } from "@/shared/lib/external-link-label";
import { sectionMotion } from "@/shared/lib/motion";
import { TODD } from "@/shared/lib/todd-semantic-classes";
import { ContentImage } from "@/shared/ui/ContentImage";

const REVEAL_UP = {
  willChange: "transform",
  opacity: "0",
  transform: `translateY(${sectionMotion.artworkY}px)`,
} as const;

const REVEAL_SOFT = {
  willChange: "transform",
  opacity: "0",
  transform: `translateY(${sectionMotion.softY}px)`,
} as const;

const REVEAL_DOODLE = {
  willChange: "transform",
  opacity: "0",
  transform: `translateY(${sectionMotion.softY}px) scale(0.96)`,
} as const;

function BookCover({ book, compact = false }: { book: Book; compact?: boolean }) {
  if (book.cover) {
    return (
      <ContentImage src={book.cover} alt={book.coverAlt} width={400} height={600} />
    );
  }

  return (
    <div
      className="todd-book-cover-placeholder"
      data-accent={book.accent}
      aria-label={book.coverAlt}
    >
      <span className="todd-book-cover-placeholder__spark" aria-hidden={true}>
        ✦
      </span>
      <span className="todd-book-cover-placeholder__title">{book.title}</span>
      {!compact ? (
        <span className="todd-book-cover-placeholder__author">TODD GOLDMAN</span>
      ) : null}
    </div>
  );
}

function BookMeta({ book }: { book: Book }) {
  return (
    <div className="todd-book-meta">
      <span>{book.year}</span>
      <span aria-hidden={true}>/</span>
      <span>{book.category}</span>
    </div>
  );
}

export function BooksSection({ content }: { content: BooksContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const featurePanelRef = useRef<HTMLDivElement>(null);
  const categories = useMemo(
    () => ["All", ...Array.from(new Set(content.books.map((book) => book.category)))],
    [content.books],
  );
  const initialBook =
    content.books.find((book) => book.featured) ?? content.books[0]!;
  const [activeId, setActiveId] = useState(initialBook.id);
  const [category, setCategory] = useState<string>("All");

  const visibleBooks = useMemo(
    () =>
      content.books.filter(
        (book) => category === "All" || book.category === category,
      ),
    [category, content.books],
  );
  const activeBook =
    visibleBooks.find((book) => book.id === activeId) ??
    visibleBooks[0] ??
    initialBook;

  const selectCategory = (nextCategory: string) => {
    setCategory(nextCategory);
    const nextBook = content.books.find(
      (book) => nextCategory === "All" || book.category === nextCategory,
    );
    if (nextBook) setActiveId(nextBook.id);
  };

  const selectBook = (bookId: string) => {
    setActiveId(bookId);
    if (!window.matchMedia("(max-width: 809.98px)").matches) return;

    window.requestAnimationFrame(() => {
      const reducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;
      featurePanelRef.current?.scrollIntoView({
        behavior: reducedMotion ? "auto" : "smooth",
        block: "start",
      });
    });
  };

  return (
    <BooksReplayProvider sectionRef={sectionRef}>
      <section
        ref={sectionRef}
        className={TODD.books.section}
        data-todd-name="Books"
        id="books"
        aria-labelledby="todd-books-title"
      >
        <header className="todd-books__header">
          <HiddenReveal
            variant="section-artwork"
            replayGroup="books"
            className="todd-books__doodle"
            style={REVEAL_DOODLE}
          >
            <div aria-hidden={true}>
              <SceneDoodle
                src={content.decor}
                idle="none"
                fit="tight"
                inlineAnim
                disableEnter
              />
            </div>
          </HiddenReveal>
          <div className="todd-books__heading">
            <SectionHeading
              id="todd-books-title"
              eyebrow={content.eyebrow}
              titleLead={content.titleLead}
              titleEmphasis={content.titleEmphasis}
              subtitle={content.description}
              replayGroup="books"
              eyebrowClassName="todd-books__eyebrow"
              titleClassName="todd-books__title"
              titleRevealClassName="todd-books__title-reveal"
              subtitleClassName="todd-books__heading-copy"
            />
          </div>
        </header>

        <HiddenReveal
          variant="section-row"
          replayGroup="books"
          delay={0.26}
          className="todd-books__filter-reveal"
          style={REVEAL_SOFT}
        >
          <div
            id="todd-books-filters"
            className="todd-books__filters todd-books__filters-scroll"
            role="group"
            aria-label="Filter books by category"
          >
            {categories.map((item) => (
              <button
                key={item}
                type="button"
                aria-pressed={category === item}
                aria-controls="todd-books-feature-panel"
                onClick={() => selectCategory(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </HiddenReveal>

        <HiddenReveal
          variant="section-artwork"
          replayGroup="books"
          delay={0.38}
          className="todd-books__feature-reveal"
          style={REVEAL_UP}
        >
          <div
            ref={featurePanelRef}
            id="todd-books-feature-panel"
            className="todd-books__feature"
            data-accent={activeBook.accent}
            aria-live="polite"
            role="region"
            aria-labelledby="todd-books-title todd-books-feature-title"
          >
            <div className="todd-books__feature-cover">
              <BookCover book={activeBook} />
            </div>
            <div className="todd-books__feature-copy">
              <BookMeta book={activeBook} />
              <h3 id="todd-books-feature-title">{activeBook.title}</h3>
              <p className="todd-books__credit">{activeBook.credit}</p>
              <p className="todd-books__description">{activeBook.description}</p>
              <HiddenReveal
                variant="section-cta"
                replayGroup="books"
                delay={0.18}
                className="todd-books__feature-actions"
                style={REVEAL_SOFT}
              >
                {activeBook.isbn ? (
                  <span>ISBN {activeBook.isbn}</span>
                ) : (
                  <span>Todd&apos;s bookshelf</span>
                )}
                {activeBook.href ? (
                  <a
                    href={activeBook.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={externalLinkAriaLabel(`View ${activeBook.title}`)}
                  >
                    View book ↗
                  </a>
                ) : null}
              </HiddenReveal>
            </div>
          </div>
        </HiddenReveal>

        <ul
          className="todd-books__shelf todd-books__shelf-scroll"
          aria-label={`${category} books`}
        >
          {visibleBooks.map((book, index) => (
            <li key={book.id} className="todd-book-card-reveal-wrap">
              <HiddenReveal
                variant="section-row"
                replayGroup="books"
                className="todd-book-card-reveal"
                delay={0.42 + Math.min(index * sectionMotion.stagger, 0.32)}
                style={REVEAL_UP}
              >
                <button
                  type="button"
                  className={cn("todd-book-card", TODD.card.shell)}
                  data-active={book.id === activeBook.id}
                  data-accent={book.accent}
                  onClick={() => selectBook(book.id)}
                  aria-label={`Show ${book.title}`}
                  aria-pressed={book.id === activeBook.id}
                  style={{ "--book-index": index } as CSSProperties}
                >
                  <span className="todd-book-card__cover">
                    <BookCover book={book} compact />
                  </span>
                  <span className="todd-book-card__copy">
                    <BookMeta book={book} />
                    <strong>{book.title}</strong>
                  </span>
                </button>
              </HiddenReveal>
            </li>
          ))}
        </ul>
      </section>
    </BooksReplayProvider>
  );
}
