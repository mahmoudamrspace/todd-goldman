"use client";

import { easeOut } from "@/shared/lib/motion";
import { motion, useReducedMotion } from "motion/react";
import type { CSSProperties, KeyboardEvent, MouseEvent } from "react";

export interface NavHamburgerProps {
  open: boolean;
  onToggle: () => void;
  style: CSSProperties;
  dark?: boolean;
  controlsId?: string;
}

const TOP_STROKE = "M3.5 8.5 C7.5 7, 16.5 10, 20.5 8.5";
const BOTTOM_STROKE = "M3.5 15.5 C7.5 17, 16.5 14, 20.5 15.5";
const ACCENT_CLOSED = "M6 18.5 C10 19.5, 14 17.5, 18 18.5";

const ICON_TRANSITION = { duration: 0.28, ease: easeOut };
const STROKE_ORIGIN = "12px 12px";

/** Hand-drawn cartoon menu trigger with accessible open/close states. */
export function NavHamburger({
  open,
  onToggle,
  style,
  dark: _dark = false,
  controlsId = "todd-nav-menu",
}: NavHamburgerProps) {
  const reduced = useReducedMotion();

  const onClick = (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    onToggle();
  };

  const onKeyDown = (event: KeyboardEvent<HTMLButtonElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      onToggle();
    }
  };

  const transition = reduced ? { duration: 0 } : ICON_TRANSITION;

  return (
    <button
      type="button"
      className={`cartoon-burger todd-nav-hamburger__button-2 todd-nav-hamburger__button ${
        open ? "todd-nav-hamburger__variant cartoon-burger--open" : "todd-nav-hamburger__variant-2"
      }`}
      data-todd-name={open ? "Disabled" : "Enabled"}
      aria-expanded={open}
      aria-controls={controlsId}
      aria-label={open ? "Close menu" : "Open menu"}
      onClick={onClick}
      onKeyDown={onKeyDown}
      style={{
        ...style,
        border: "none",
        padding: 0,
        margin: 0,
        appearance: "none",
        WebkitAppearance: "none",
        cursor: "pointer",
        font: "inherit",
      }}
    >
      <motion.svg
        className="cartoon-burger__icon"
        viewBox="0 0 24 24"
        aria-hidden={true}
        initial={false}
      >
        <motion.g
          style={{ transformOrigin: STROKE_ORIGIN, transformBox: "fill-box" }}
          animate={{
            rotate: open ? 45 : 0,
            y: open ? 3.5 : 0,
          }}
          transition={transition}
        >
          <path
            className="cartoon-burger__stroke cartoon-burger__stroke--top"
            d={TOP_STROKE}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
        <motion.g
          style={{ transformOrigin: STROKE_ORIGIN, transformBox: "fill-box" }}
          animate={{
            rotate: open ? -45 : 0,
            y: open ? -3.5 : 0,
          }}
          transition={transition}
        >
          <path
            className="cartoon-burger__stroke cartoon-burger__stroke--bottom"
            d={BOTTOM_STROKE}
            fill="none"
            stroke="currentColor"
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </motion.g>
        <motion.path
          className="cartoon-burger__accent"
          fill="none"
          stroke="var(--todd-yellow)"
          strokeWidth={2}
          strokeLinecap="round"
          d={ACCENT_CLOSED}
          initial={false}
          animate={{
            opacity: open ? 0 : 0.9,
            pathLength: open ? 0 : 1,
          }}
          transition={transition}
        />
      </motion.svg>
    </button>
  );
}
