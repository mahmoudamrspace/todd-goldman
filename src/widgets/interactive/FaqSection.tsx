"use client";

import { useCallback, useState } from "react";
import { Faq } from "@/widgets/sections/Faq";
import type { FaqContent } from "@/content/section-types";
import { HeightLock } from "@/features/HeightLock";

export interface FaqSectionProps {
  content: FaqContent;
}

/** Controlled FAQ accordion wired to generated markup. */
export function FaqSection({ content }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const onToggle = useCallback((index: number) => {
    setOpenIndex((current) => (current === index ? null : index));
  }, []);

  return (
    <HeightLock transition="0.55s var(--ease-faq)">
      <Faq content={content} openIndex={openIndex} onToggle={onToggle} />
    </HeightLock>
  );
}
