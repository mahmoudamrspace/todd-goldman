"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import type { IntroContent } from "@/content/section-types";
import { navIdentityKey } from "@/shared/lib/nav-identity";

export interface DesktopNavLinksProps {
  nav: IntroContent["nav"];
}

function useNavLinkActive(href: string): boolean {
  const pathname = usePathname();
  const [hash, setHash] = useState("");

  useEffect(() => {
    const syncHash = () => setHash(window.location.hash);
    syncHash();
    window.addEventListener("hashchange", syncHash);
    return () => window.removeEventListener("hashchange", syncHash);
  }, []);

  if (href.startsWith("http")) {
    return false;
  }

  if (href.includes("#")) {
    const [path = "/", fragment] = href.split("#");
    return pathname === path && hash === `#${fragment}`;
  }

  return pathname === href;
}

function DesktopNavLink({
  label,
  href,
}: {
  label: string;
  href: string;
}) {
  const external = href.startsWith("http");
  const active = useNavLinkActive(href);
  const identity = navIdentityKey(label);

  return (
    <li>
      <a
        className={`desktop-nav-links__link desktop-nav-links__link--${identity}${active ? " desktop-nav-links__link--active" : ""}`}
        href={href}
        aria-current={active ? "page" : undefined}
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
