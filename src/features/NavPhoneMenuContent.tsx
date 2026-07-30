"use client";

import type { IntroContent } from "@/content/section-types";
import { NavMenuList } from "@/features/NavMenuList";

export interface NavPhoneMenuContentProps {
  content: IntroContent;
  open: boolean;
}

/** Phone nav overlay: centered menu links only (reference hides Follow/Contact). */
export function NavPhoneMenuContent({ content, open }: NavPhoneMenuContentProps) {
  return (
    <div className={"framer-ijjr0j"} data-framer-name={"Content"}>
      <NavMenuList content={content} open={open} />
    </div>
  );
}
