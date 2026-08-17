"use client";

import type { IntroContent } from "@/content/section-types";
import { navIdentityKey } from "@/shared/lib/nav-identity";
import {
  externalLinkAriaLabel,
  isExternalHttpHref,
} from "@/shared/lib/external-link-label";
import { useNavLinkActive } from "@/shared/lib/use-nav-link-active";

export interface DesktopNavLinksProps {
  nav: IntroContent["nav"];
}

function DesktopNavLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const external = isExternalHttpHref(href);
  const active = useNavLinkActive(href);
  const identity = navIdentityKey(label);

  return (
    <li>
      <a
        className={`desktop-nav-links__link desktop-nav-links__link--${identity}${active ? " desktop-nav-links__link--active" : ""}`}
        href={href}
        aria-current={active ? "page" : undefined}
        aria-label={external ? externalLinkAriaLabel(label) : undefined}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        <span className="desktop-nav-links__label">{label}</span>
      </a>
    </li>
  );
}

/** Persistent desktop section links in the sticky header bar. */
export function DesktopNavLinks({ nav }: DesktopNavLinksProps) {
  return (
    <nav className="desktop-nav-links" aria-label="Primary">
      <ul className="desktop-nav-links__list">
        {nav.map((item) => (
          <DesktopNavLink key={item.href} label={item.label} href={item.href} />
        ))}
      </ul>
    </nav>
  );
}
