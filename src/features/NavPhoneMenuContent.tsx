"use client";

import type { IntroContent } from "@/content/section-types";
import { NavMenuList } from "@/features/NavMenuList";

export interface NavPhoneMenuContentProps {
  content: IntroContent;
  open: boolean;
}

/** Phone nav overlay: primary links and studio email footer action. */
export function NavPhoneMenuContent({ content, open }: NavPhoneMenuContentProps) {
  return (
    <div className={"framer-ijjr0j nav-phone-menu-content"} data-framer-name={"Content"}>
      <NavMenuList content={content} open={open} />
      <div className="nav-phone-contact" data-framer-name="Contact">
        <a className="nav-phone-contact__link" href={`mailto:${content.email}`}>
          {content.email}
        </a>
      </div>
    </div>
  );
}
