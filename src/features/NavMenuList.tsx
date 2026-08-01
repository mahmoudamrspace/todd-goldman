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
    className: "framer-p33yb2 framer-rqn908 nav-menu-link-row",
    textClassName: "framer-1gfizoq",
    hoverVariant: "framer-v-1t8jhiu",
    defaultLabel: "Art",
    defaultHref: "/#works",
  },
  {
    className: "framer-2bu14n framer-rqn908 nav-menu-link-row",
    textClassName: "framer-170psbw",
    hoverVariant: "framer-v-13jtyaq",
    defaultLabel: "About",
    defaultHref: "/#about",
  },
  {
    className: "framer-18y0jlw framer-rqn908 nav-menu-link-row",
    textClassName: "framer-15tz0mu",
    hoverVariant: "framer-v-eormac",
    defaultLabel: "Shop",
    defaultHref: "https://www.toddart.com/",
  },
  {
    className: "framer-p33yb2 framer-rqn908 nav-menu-link-row",
    textClassName: "framer-1gfizoq",
    hoverVariant: "framer-v-1t8jhiu",
    defaultLabel: "Contact",
    defaultHref: "/#contact",
  },
] as const;

const TEXT_STYLE = {
  "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTMwMA==",
  "--framer-font-family": '"Averia Serif Libre", sans-serif',
  "--framer-font-open-type-features":
    "'blwf' on, 'cv09' on, 'cv03' on, 'cv04' on, 'cv11' on",
  "--framer-font-weight": "300",
  "--framer-letter-spacing": "-0.03em",
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
    "--framer-text-color": textColor,
  };

  if (reduced) {
    return (
      <div
        className={textClassName}
        data-framer-component-type={"RichTextContainer"}
        style={{ ...colorVars, transform: "none" }}
      >
        <div dir={"auto"} className={"framer-text nav-menu-link-text"} style={{ ...TEXT_STYLE, ...colorVars }}>
          {label}
        </div>
      </div>
    );
  }

  return (
    <motion.div
      className={textClassName}
      data-framer-component-type={"RichTextContainer"}
      style={{ transform: "none" }}
      initial={false}
      animate={colorVars}
      transition={navOverlaySpring}
    >
      <motion.div
        dir={"auto"}
        className={"framer-text nav-menu-link-text"}
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

/** Nav menu links with Framer hover-dim sibling behavior. */
export function NavMenuList({ content, open }: NavMenuListProps) {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navEntries = content.nav.slice(0, NAV_ITEMS.length);

  const hoveredItem = hoveredIndex === null ? null : NAV_ITEMS[hoveredIndex];
  const parentVariant = hoveredItem?.hoverVariant ?? "framer-v-1gc058m";
  const parentName =
    hoveredIndex === null
      ? "Default"
      : (navEntries[hoveredIndex]?.label ??
        NAV_ITEMS[hoveredIndex]?.defaultLabel ??
        "Default");

  return (
    <div className={"framer-bnx3m7-container nav-menu-list"} data-framer-name={"Menu Items"}>
      <div
        className={`framer-WwdNp framer-1gc058m nav-menu-list__stack ${parentVariant}`}
        data-framer-name={parentName}
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
              data-framer-name={label}
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
