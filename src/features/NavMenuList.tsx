"use client";

import type { IntroContent } from "@/content/section-types";
import { NavMenuLink } from "@/entities/NavMenuLink";
import { navOverlaySpring } from "@/shared/lib/motion";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const CREAM =
  "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))";
const GRAY =
  "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))";

const NAV_ITEMS = [
  {
    className: "todd-nav-menu-list__div-8 todd-nav-menu-list__div-9 nav-menu-link-row",
    textClassName: "todd-nav-menu-list__div-5",
    hoverVariant: "todd-layout__utility-011",
    defaultLabel: "Art",
    defaultHref: "/#works",
  },
  {
    className: "todd-nav-menu-list__div-6 todd-nav-menu-list__div-9 nav-menu-link-row",
    textClassName: "todd-nav-menu-list__div-2",
    hoverVariant: "todd-layout__utility-003",
    defaultLabel: "About",
    defaultHref: "/#about",
  },
  {
    className: "todd-nav-menu-list__div-3 todd-nav-menu-list__div-9 nav-menu-link-row",
    textClassName: "todd-nav-menu-list__div",
    hoverVariant: "todd-nav-overlay-content__desktop-4-6-eormac",
    defaultLabel: "Shop",
    defaultHref: "https://www.toddart.com/",
  },
  {
    className: "todd-nav-menu-list__div-8 todd-nav-menu-list__div-9 nav-menu-link-row",
    textClassName: "todd-nav-menu-list__div-5",
    hoverVariant: "todd-layout__utility-011",
    defaultLabel: "Contact",
    defaultHref: "/#contact",
  },
] as const;

const TEXT_STYLE = {
  "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMA==",
  "--todd-font-family": '"Averia Serif Libre", sans-serif',
  "--todd-font-open-type-features":
    "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
  "--todd-font-weight": "300",
  "--todd-letter-spacing": "-0.03em",
} as const;

export interface NavMenuListProps {
  content: IntroContent;
  open: boolean;
}

function NavMenuLinkText({
  textClassName,
  label,
  dimmed,
}: {
  textClassName: string;
  label: string;
  dimmed: boolean;
}) {
  const reduced = useReducedMotion();
  const textColor = dimmed ? GRAY : CREAM;
  const colorVars = {
    "--extracted-tcooor": textColor,
    "--todd-text-color": textColor,
  };

  if (reduced) {
    return (
      <div
        className={textClassName}
        data-todd-component-type={"RichTextContainer"}
        style={{ ...colorVars, transform: "none" }}
      >
        <div dir={"auto"} className={"todd-text nav-menu-link-text"} style={{ ...TEXT_STYLE, ...colorVars }}>
          {label}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={textClassName}
      data-todd-component-type={"RichTextContainer"}
      style={{ transform: "none" }}
      initial={false}
      animate={colorVars}
      transition={navOverlaySpring}
    >
      <motion.div
        dir={"auto"}
        className={"todd-text nav-menu-link-text"}
        style={TEXT_STYLE}
        initial={false}
        animate={colorVars}
        transition={navOverlaySpring}
      >
        {label}
      </motion.div>
    </motion.div>
  );
}

/** Nav menu links with legacy export hover-dim sibling behavior. */
export function NavMenuList({ content, open }: NavMenuListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navEntries = content.nav.slice(0, NAV_ITEMS.length);

  const hoveredItem = hoveredIndex === null ? null : NAV_ITEMS[hoveredIndex];
  const parentVariant = hoveredItem?.hoverVariant ?? "todd-layout__utility-006";
  const parentName =
    hoveredIndex === null
      ? "Default"
      : (navEntries[hoveredIndex]?.label ??
        NAV_ITEMS[hoveredIndex]?.defaultLabel ??
        "Default");

  return (
    <div className={"todd-nav-menu-list__menu-items nav-menu-list"} data-todd-name={"Menu Items"}>
      <div
        className={`todd-nav-menu-list__div-7 todd-nav-menu-list__div-4 nav-menu-list__stack ${parentVariant}`}
        data-todd-name={parentName}
        data-highlight={true}
        tabIndex={0}
        style={{ "--1o1r33v": "16px", "--frfhbi": "center" }}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {NAV_ITEMS.map((item, index) => {
          const entry = navEntries[index];
          const label = entry?.label ?? item.defaultLabel;
          const href = entry?.href ?? item.defaultHref;
          const dimmed = hoveredIndex !== null && hoveredIndex !== index;

          return (
            <NavMenuLink
              key={`${item.defaultHref}-${index}`}
              className={item.className}
              data-todd-name={label}
              href={href}
              open={open}
              index={index}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <NavMenuLinkText
                textClassName={item.textClassName}
                label={label}
                dimmed={dimmed}
              />
            </NavMenuLink>
          );
        })}
      </div>
    </div>
  );
}
