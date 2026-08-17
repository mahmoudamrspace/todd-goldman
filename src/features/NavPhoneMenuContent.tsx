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
    <div className={"todd-nav-overlay-content__content nav-phone-menu-content"} data-todd-name={"Content"}>
      <h2 id="todd-nav-menu-title" className="visually-hidden">
        Site menu
      </h2>
      <NavMenuList content={content} open={open} />
      <div className="nav-phone-contact" data-todd-name="Contact">
        <a
          className="nav-phone-contact__link"
          href={`mailto:${content.email}`}
          aria-label={`Email ${content.email}`}
        >
          {content.email}
        </a>
      </div>
    </div>
  );
}
