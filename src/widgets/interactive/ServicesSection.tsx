"use client";

import { Services } from "@/widgets/sections/Services";
import type { ServicesContent } from "@/content/section-types";

export interface ServicesSectionProps {
  content: ServicesContent;
}

/** Services section wrapper for scroll chapter composition. */
export function ServicesSection({ content }: ServicesSectionProps) {
  return <Services content={content} />;
}
