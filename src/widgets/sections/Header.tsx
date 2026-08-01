"use client";

import type { IntroContent } from "@/content/section-types";
import { SiteHeaderShell } from "@/features/SiteHeaderShell";

export function Header({ content }: { content: IntroContent }) {
  return <SiteHeaderShell content={content} homeCurrent />;
}
