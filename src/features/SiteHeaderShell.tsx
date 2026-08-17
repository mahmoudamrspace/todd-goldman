"use client";

import type { IntroContent } from "@/content/section-types";
import { NavFocusTrap } from "@/entities/NavFocusTrap";
import { NavHamburger } from "@/entities/NavHamburger";
import { DesktopNavLinks } from "@/features/DesktopNavLinks";
import { NavPhoneMenuContent } from "@/features/NavPhoneMenuContent";
import { useNavMenu } from "@/features/nav-menu/NavMenuContext";
import { navVariantName, navShellClass, navShellStyle } from "@/shared/lib/nav-variants";
import { footerResponsiveVisibleOnly } from "@/shared/lib/todd-semantic-classes";

export interface SiteHeaderShellProps {
  content: IntroContent;
  /** Marks the home logo link as the current page (home shell only). */
  homeCurrent?: boolean;
}

function BrandScribble() {
  return (
    <svg
      className="site-header-bar__scribble"
      aria-hidden="true"
      viewBox="0 0 120 8"
      preserveAspectRatio="none"
    >
      <path
        d="M1 5.5 C 18 1.5, 34 7.5, 52 4 C 70 0.5, 88 6.5, 119 3"
        fill="none"
        stroke="currentColor"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
    </svg>
  );
}

function SiteHeaderBrand({
  artistName,
  homeCurrent = false,
}: {
  artistName: string;
  homeCurrent?: boolean;
}) {
  const parts = artistName.trim().split(/\s+/);
  const first = parts[0] ?? artistName;
  const last = parts.slice(1).join(" ");

  return (
    <a
      className="site-header-bar__brand"
      href="/"
      aria-label={artistName}
      {...(homeCurrent ? { "data-todd-page-link-current": true } : {})}
    >
      <span className="site-header-bar__brand-lockup" aria-hidden="true">
        <span className="site-header-bar__brand-word site-header-bar__brand-word--first">
          {first}
        </span>
        {last ? (
          <span className="site-header-bar__brand-word site-header-bar__brand-word--last">
            {last}
          </span>
        ) : null}
        <BrandScribble />
      </span>
    </a>
  );
}

/** Balanced header: sticky desktop links, compact mobile menu overlay. */
export function SiteHeaderShell({ content, homeCurrent = false }: SiteHeaderShellProps) {
  const { open, closing, present, toggle } = useNavMenu();
  const navState = closing ? "closing" : present ? "open" : "closed";

  return (
    <>
      <div className={footerResponsiveVisibleOnly("tablet", "desktop")}>
        <div className="todd-site-header">
          <header className="site-header-bar site-header-bar--cartoon todd-site-header__bar" data-nav-open="false">
            <SiteHeaderBrand artistName={content.artistName} homeCurrent={homeCurrent} />
            <DesktopNavLinks nav={content.nav} />
          </header>
        </div>
      </div>

      <div className={footerResponsiveVisibleOnly("mobile")}>
        <div className="todd-site-header">
          <nav
            className={navShellClass(
              "todd-site-header__nav-2 todd-site-header__nav todd-nav-overlay-content__desktop-4-6-aigtuw site-header-nav--cartoon todd-site-header__nav",
              "phone",
              present,
            )}
            data-todd-name={navVariantName("phone", present)}
            data-nav-open={present ? "true" : "false"}
            data-nav-state={navState}
            style={navShellStyle(
              present,
              "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))",
            )}
          >
            <div className="todd-site-header-shell__header site-header-mobile-bar" data-todd-name="Header">
              <div className="todd-site-header-shell__div-2">
                <SiteHeaderBrand artistName={content.artistName} homeCurrent={homeCurrent} />
              </div>
              <div className="todd-site-header-shell__div-3" />
              <div className="todd-site-header-shell__div site-header-mobile-bar__menu">
                <NavHamburger
                  open={open}
                  onToggle={toggle}
                  style={{
                    backgroundColor: "rgba(15, 15, 15, 0)",
                    height: "100%",
                    width: "100%",
                  }}
                />
              </div>
            </div>
            <NavFocusTrap open={present}>
              <NavPhoneMenuContent content={content} open={open} />
            </NavFocusTrap>
          </nav>
        </div>
      </div>
    </>
  );
}
