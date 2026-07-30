"use client";

import { ScrollChapter } from "@/features/ScrollChapter";
import { StickySection } from "@/features/StickySection";
import { About } from "@/widgets/sections/About";
import { FaqSection } from "@/widgets/interactive/FaqSection";
import { MarqueeSection } from "@/widgets/interactive/MarqueeSection";
import { ServicesSection } from "@/widgets/interactive/ServicesSection";
import { SneakPeak } from "@/widgets/sections/SneakPeak";
import { Testimonial } from "@/widgets/sections/Testimonial";
import { WorksGallery } from "@/widgets/sections/WorksGallery";
import type {
  AboutContent,
  FaqContent,
  ServicesContent,
  SneakPeakContent,
  TestimonialContent,
  WorksContent,
} from "@/content/section-types";

export interface ToddHomeSectionsProps {
  worksContent: WorksContent;
  sneakPeakContent: SneakPeakContent;
  servicesContent: ServicesContent;
  testimonialContent: TestimonialContent;
  showTestimonials: boolean;
  aboutContent: AboutContent;
  faqContent: FaqContent;
}

/** Todd homepage sections with coordinated scroll chapters. */
export function ToddHomeSections({
  worksContent,
  sneakPeakContent,
  servicesContent,
  testimonialContent,
  showTestimonials,
  aboutContent,
  faqContent,
}: ToddHomeSectionsProps) {
  return (
    <>
      <ScrollChapter id="works-chapter" accent="paper">
        <WorksGallery content={worksContent} />
      </ScrollChapter>
      <ScrollChapter accent="cream">
        <MarqueeSection>
          <SneakPeak content={sneakPeakContent} />
        </MarqueeSection>
      </ScrollChapter>
      <ScrollChapter accent="dark">
        <ServicesSection content={servicesContent} />
      </ScrollChapter>
      {showTestimonials ? (
        <ScrollChapter accent="paper">
          <StickySection>
            <Testimonial content={testimonialContent} />
          </StickySection>
        </ScrollChapter>
      ) : null}
      <ScrollChapter accent="paper">
        <About content={aboutContent} />
      </ScrollChapter>
      <ScrollChapter accent="cream">
        <FaqSection content={faqContent} />
      </ScrollChapter>
    </>
  );
}
