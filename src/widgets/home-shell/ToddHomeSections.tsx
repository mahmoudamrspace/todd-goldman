"use client";

import { ScrollChapter } from "@/features/ScrollChapter";
import { About } from "@/widgets/sections/About";
import { FaqSection } from "@/widgets/interactive/FaqSection";
import { MarqueeSection } from "@/widgets/interactive/MarqueeSection";
import { ServicesSection } from "@/widgets/interactive/ServicesSection";
import { SneakPeak } from "@/widgets/sections/SneakPeak";
import { WorksGallery } from "@/widgets/sections/WorksGallery";
import type {
  AboutContent,
  FaqContent,
  ServicesContent,
  SneakPeakContent,
  WorksContent,
} from "@/content/section-types";

export interface ToddHomeSectionsProps {
  worksContent: WorksContent;
  sneakPeakContent: SneakPeakContent;
  servicesContent: ServicesContent;
  aboutContent: AboutContent;
  faqContent: FaqContent;
}

/** Todd homepage sections with coordinated scroll chapters. */
export function ToddHomeSections({
  worksContent,
  sneakPeakContent,
  servicesContent,
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
      <ScrollChapter accent="paper">
        <About content={aboutContent} />
      </ScrollChapter>
      <ScrollChapter accent="cream">
        <FaqSection content={faqContent} />
      </ScrollChapter>
    </>
  );
}
