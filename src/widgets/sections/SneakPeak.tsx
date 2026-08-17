"use client";

import { useMemo, useRef, useState } from "react";
import type { CSSProperties } from "react";
import booksData from "@/content/data/todd-books.json";
import type { SneakPeakContent } from "@/content/section-types";
import { BooksReplayProvider, HiddenReveal } from "@/features/HiddenReveal";
import { SceneDoodle } from "@/features/IllustratedScene";
import { cn } from "@/shared/lib/cn";
import { sectionMotion } from "@/shared/lib/motion";
import { TODD } from "@/shared/lib/todd-semantic-classes";

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

const REVEAL_CONTENT = {
  willChange: "transform",
  opacity: "0",
  transform: `translateY(${sectionMotion.contentY}px)`,
} as const;

const REVEAL_DOODLE = {
  willChange: "transform",
  opacity: "0",
  transform: `translateY(${sectionMotion.softY}px) scale(0.96)`,
} as const;

interface ToddBook {
  id: string;
  title: string;
  year: string;
  category: string;
  credit: string;
  description: string;
  cover: string;
  coverAlt: string;
  accent: string;
  isbn: string;
  href: string;
  featured: boolean;
}

const books = booksData satisfies ToddBook[];
const categories = ["All", ...Array.from(new Set(books.map((book) => book.category)))] as const;

function BookCover({
  book,
  compact = false,
}: {
  book: ToddBook;
  compact?: boolean;
}) {
  if (book.cover) {
    return (
      <img
        src={book.cover}
        alt={book.coverAlt}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <div
      className="todd-book-cover-placeholder"
      data-accent={book.accent}
      aria-label={`${book.coverAlt} — artwork coming soon`}
    >
      <span className="todd-book-cover-placeholder__spark" aria-hidden={true}>✦</span>
      <span className="todd-book-cover-placeholder__title">{book.title}</span>
      {!compact ? (
        <span className="todd-book-cover-placeholder__author">TODD GOLDMAN</span>
      ) : null}
    </div>
  );
}

function BookMeta({ book }: { book: ToddBook }) {
  return (
    <div className="todd-book-meta">
      <span>{book.year}</span>
      <span aria-hidden={true}>/</span>
      <span>{book.category}</span>
    </div>
  );
}

export function SneakPeak({ content }: { content: SneakPeakContent }) {
  const sectionRef = useRef<HTMLElement>(null);
  const initialBook = books.find((book) => book.featured) ?? books[0]!;
  const [activeId, setActiveId] = useState(initialBook.id);
  const [category, setCategory] = useState<(typeof categories)[number]>("All");

  const visibleBooks = useMemo(
    () => books.filter((book) => category === "All" || book.category === category),
    [category],
  );
  const activeBook =
    visibleBooks.find((book) => book.id === activeId) ?? visibleBooks[0] ?? initialBook;

  const selectCategory = (nextCategory: (typeof categories)[number]) => {
    setCategory(nextCategory);
    const nextBook = books.find(
      (book) => nextCategory === "All" || book.category === nextCategory,
    );
    if (nextBook) setActiveId(nextBook.id);
  };

  return (
    <BooksReplayProvider sectionRef={sectionRef}>
      <section
        ref={sectionRef}
        className={TODD.books.section}
        data-todd-name="Sneak peak"
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
          <HiddenReveal
            variant="section-row"
            replayGroup="books"
            delay={0.1}
            style={REVEAL_SOFT}
          >
            <p className="todd-books__eyebrow">50+ books published · zero grown-up energy</p>
          </HiddenReveal>
          <HiddenReveal
            variant="section-heading"
            replayGroup="books"
            delay={sectionMotion.stagger}
            className="todd-books__title-reveal"
            style={REVEAL_CONTENT}
          >
            <h2 id="todd-books-title">
              Books by <em>Todd</em>
            </h2>
          </HiddenReveal>
          <HiddenReveal
            variant="section-row"
            replayGroup="books"
            delay={0.18}
            style={REVEAL_SOFT}
          >
            <p>
              Silly stories, sharp one-liners, heroic pets, and underwear with
              opinions. Pick a cover to explore the shelf.
            </p>
          </HiddenReveal>
        </div>
      </header>

      <HiddenReveal
        variant="section-row"
        replayGroup="books"
        delay={0.26}
        className="todd-books__filter-reveal"
        style={REVEAL_SOFT}
      >
        <nav className="todd-books__filters" aria-label="Filter books by category">
          {categories.map((item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => selectCategory(item)}
            >
              {item}
            </button>
          ))}
        </nav>
      </HiddenReveal>

      <HiddenReveal
        variant="section-artwork"
        replayGroup="books"
        delay={0.38}
        className="todd-books__feature-reveal"
        style={REVEAL_UP}
      >
        <div className="todd-books__feature" data-accent={activeBook.accent} aria-live="polite">
          <div className="todd-books__feature-cover">
            <BookCover book={activeBook} />
            {!activeBook.cover ? (
              <span className="todd-books__cover-note">Designer cover goes here</span>
            ) : null}
          </div>
          <div className="todd-books__feature-copy">
            <BookMeta book={activeBook} />
            <h3>{activeBook.title}</h3>
            <p className="todd-books__credit">{activeBook.credit}</p>
            <p className="todd-books__description">{activeBook.description}</p>
            <HiddenReveal
              variant="section-cta"
              replayGroup="books"
              delay={0.18}
              className="todd-books__feature-actions"
              style={REVEAL_SOFT}
            >
              {activeBook.isbn ? <span>ISBN {activeBook.isbn}</span> : <span>Todd&apos;s bookshelf</span>}
              {activeBook.href ? (
                <a href={activeBook.href} target="_blank" rel="noreferrer">
                  View book ↗
                </a>
              ) : (
                <span className="todd-books__link-pending">Link coming soon</span>
              )}
            </HiddenReveal>
          </div>
        </div>
      </HiddenReveal>

      <div className="todd-books__shelf" role="list" aria-label={`${category} books`}>
        {visibleBooks.map((book, index) => (
          <HiddenReveal
            key={book.id}
            variant="section-row"
            replayGroup="books"
            className="todd-book-card-reveal"
            delay={0.42 + Math.min(index * sectionMotion.stagger, 0.32)}
            style={REVEAL_UP}
          >
            <button
              type="button"
              role="listitem"
              className={cn("todd-book-card", TODD.card.shell)}
              data-active={book.id === activeBook.id}
              data-accent={book.accent}
              onClick={() => setActiveId(book.id)}
              aria-label={`Show ${book.title}`}
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
        ))}
      </div>
      </section>
    </BooksReplayProvider>
  );
}
