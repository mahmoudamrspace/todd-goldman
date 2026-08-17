"use client";

import type { FooterContent } from "@/content/section-types";
import {
  ContactEmailReveal,
  FooterContactArt,
  FooterCredits,
  FooterDecoScene,
  FooterHeadlineReveal,
  FooterMarkImage,
} from "@/features/footer";
import { cn } from "@/shared/lib/cn";
import { TODD } from "@/shared/lib/todd-semantic-classes";

export function Footer({ content }: { content: FooterContent }) {
  return (
    <footer
      className={cn(TODD.footer.section, "todd-footer")}
      data-todd-name="Footer"
      id="contact"
      aria-labelledby="todd-footer-headline"
    >
      <div
        className={cn(TODD.footer.titleArea, "todd-footer__title-area")}
        data-todd-name="Title"
      >
        <div className={cn(TODD.footer.stage, TODD.card.shell, TODD.card.shellInset)}>
          <FooterContactArt layers={content.sceneLayers} />
          <div className="todd-contact-headline">
            <FooterHeadlineReveal headline={content.headline} />
            <ContactEmailReveal email={content.email} />
          </div>
          <FooterCredits
            madeBy={content.madeBy}
            copyright={content.copyright}
            social={content.social}
          />
        </div>
        <FooterMarkImage mark={content.mark} />
        <FooterDecoScene />
      </div>
    </footer>
  );
}
