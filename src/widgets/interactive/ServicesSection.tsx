"use client";

import { useState } from "react";
import { Services } from "@/widgets/sections/Services";
import type { ServicesContent } from "@/content/section-types";

export interface ServicesSectionProps {
  content: ServicesContent;
}

/** Desktop service row hover state for Framer psO7m rows. */
export function ServicesSection({ content }: ServicesSectionProps) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  return (
    <Services
      content={content}
      activeIndex={activeIndex}
      onRowEnter={setActiveIndex}
      onRowLeave={() => setActiveIndex(null)}
    />
  );
}
