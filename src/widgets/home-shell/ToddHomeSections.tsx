"use client";

import { ScrollChapter } from "@/features/ScrollChapter";
import { About } from "@/widgets/sections/About";
import { BooksSection } from "@/widgets/sections/BooksSection";
import { FaqSection } from "@/widgets/interactive/FaqSection";
import { ServicesSection } from "@/widgets/interactive/ServicesSection";
import { Testimonial } from "@/widgets/sections/Testimonial";
import { ArtArchive } from "@/widgets/sections/ArtArchive";
import type { ArtCatalog } from "@/content/types";
import type {
  AboutContent,
  BooksContent,
  FaqContent,
  ServicesContent,
  TestimonialContent,
} from "@/content/section-types";
import { TODD } from "@/shared/lib/todd-semantic-classes";

export interface ToddHomeSectionsProps {
  artCatalog: ArtCatalog;
  booksContent: BooksContent;
  servicesContent: ServicesContent;
  testimonialContent: TestimonialContent;
  showTestimonials: boolean;
  aboutContent: AboutContent;
  faqContent: FaqContent;
}

/** Todd homepage sections with coordinated scroll chapters. */
export function ToddHomeSections({
  artCatalog,
  booksContent,
  servicesContent,
  testimonialContent,
  showTestimonials,
  aboutContent,
  faqContent,
}: ToddHomeSectionsProps) {
  return (
    <div className={TODD.page.sections}>
      <ScrollChapter id="works-chapter" accent="paper" spacing="first">
        <ArtArchive catalog={artCatalog} mode="preview" />
      </ScrollChapter>
      <ScrollChapter accent="cream">
        <BooksSection content={booksContent} />
      </ScrollChapter>
      <ScrollChapter accent="dark">
        <ServicesSection content={servicesContent} />
      </ScrollChapter>
      {showTestimonials ? (
        <ScrollChapter accent="paper">
          <Testimonial content={testimonialContent} />
        </ScrollChapter>
      ) : null}
      <ScrollChapter accent="paper">
        <About content={aboutContent} />
      </ScrollChapter>
      <ScrollChapter accent="cream" spacing="last">
        <FaqSection content={faqContent} />
      </ScrollChapter>
    </div>
  );
}
