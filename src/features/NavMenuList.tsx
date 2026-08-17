"use client";

import type { IntroContent } from "@/content/section-types";
import { NavMenuLink } from "@/features/nav/NavMenuLink";
import { navIdentityKey } from "@/shared/lib/nav-identity";
import { navOverlaySpring } from "@/shared/lib/motion";
import { motion, useReducedMotion } from "motion/react";
import { useState } from "react";

const CREAM =
  "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))";
const GRAY =
  "var(--token-5c9fb93e-5d1e-4f79-b937-cc4862155663, rgb(148, 147, 137))";

const HOVER_VARIANTS = [
  "todd-layout__utility-011",
  "todd-layout__utility-003",
  "todd-nav-overlay-content__desktop-4-6-eormac",
  "todd-layout__utility-011",
  "todd-layout__utility-003",
  "todd-layout__utility-006",
] as const;

const ROW_CLASS_NAMES = [
  "todd-nav-menu-list__div-8 todd-nav-menu-list__div-9 nav-menu-link-row",
  "todd-nav-menu-list__div-6 todd-nav-menu-list__div-9 nav-menu-link-row",
  "todd-nav-menu-list__div-3 todd-nav-menu-list__div-9 nav-menu-link-row",
  "todd-nav-menu-list__div-8 todd-nav-menu-list__div-9 nav-menu-link-row",
  "todd-nav-menu-list__div-6 todd-nav-menu-list__div-9 nav-menu-link-row",
  "todd-nav-menu-list__div-3 todd-nav-menu-list__div-9 nav-menu-link-row",
] as const;

const TEXT_CLASS_NAMES = [
  "todd-nav-menu-list__div-5",
  "todd-nav-menu-list__div-2",
  "todd-nav-menu-list__div",
  "todd-nav-menu-list__div-5",
  "todd-nav-menu-list__div-2",
  "todd-nav-menu-list__div",
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
        data-todd-component-type="RichTextContainer"
        style={{ ...colorVars, transform: "none" }}
      >
        <div
          dir="auto"
          className="todd-text nav-menu-link-text"
          style={{ ...TEXT_STYLE, ...colorVars }}
        >
          {label}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={textClassName}
      data-todd-component-type="RichTextContainer"
      style={{ transform: "none" }}
      initial={false}
      animate={colorVars}
      transition={navOverlaySpring}
    >
      <motion.div
        dir="auto"
        className="todd-text nav-menu-link-text"
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

/** Nav menu links driven by the same primary nav data as desktop. */
export function NavMenuList({ content, open }: NavMenuListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navEntries = content.nav;

  const hoveredItem =
    hoveredIndex === null ? null : HOVER_VARIANTS[hoveredIndex % HOVER_VARIANTS.length];
  const parentVariant = hoveredItem ?? "todd-layout__utility-006";
  const parentName =
    hoveredIndex === null
      ? "Default"
      : (navEntries[hoveredIndex]?.label ?? "Default");

  return (
    <div
      className="todd-nav-menu-list__menu-items nav-menu-list"
      data-todd-name="Menu Items"
    >
      <div
        className={`todd-nav-menu-list__div-7 todd-nav-menu-list__div-4 nav-menu-list__stack ${parentVariant}`}
        data-todd-name={parentName}
        onMouseLeave={() => setHoveredIndex(null)}
      >
        {navEntries.map((entry, index) => {
          const label = entry.label;
          const href = entry.href;
          const dimmed = hoveredIndex !== null && hoveredIndex !== index;
          const rowClass =
            ROW_CLASS_NAMES[index % ROW_CLASS_NAMES.length] ?? ROW_CLASS_NAMES[0];
          const textClass =
            TEXT_CLASS_NAMES[index % TEXT_CLASS_NAMES.length] ?? TEXT_CLASS_NAMES[0];

          return (
            <NavMenuLink
              key={`${navIdentityKey(label)}-${href}`}
              className={rowClass}
              data-todd-name={label}
              href={href}
              open={open}
              index={index}
              onMouseEnter={() => setHoveredIndex(index)}
            >
              <NavMenuLinkText
                textClassName={textClass}
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
