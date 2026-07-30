"use client";

import { useCallback, useState } from "react";
import { Works } from "@/widgets/sections/Works";
import type { WorksContent } from "@/content/section-types";

export interface WorksSectionProps {
  content: WorksContent;
}

/** Controlled works hover preview with pointer tracking. */
export function WorksSection({ content }: WorksSectionProps) {
  const [activeSlug, setActiveSlug] = useState<string | null>(null);
  const [pointer, setPointer] = useState({ x: 0, y: 0 });

  const onHover = useCallback((slug: string | null) => {
    setActiveSlug(slug);
  }, []);

  const onPointerMove = useCallback((event: React.PointerEvent<HTMLElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setPointer({
      x: event.clientX - (rect.left + rect.width / 2),
      y: event.clientY - (rect.top + rect.height / 2),
    });
  }, []);

  const activeWork =
    content.works.find((work) => work.slug === activeSlug) ?? null;

  return (
    <Works
      content={content}
      activeSlug={activeSlug}
      onHover={onHover}
      hoverPreview={activeWork?.hoverPreview ?? null}
      pointer={pointer}
      onTitlePointerMove={onPointerMove}
    />
  );
}
