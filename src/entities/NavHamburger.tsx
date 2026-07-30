"use client";

import type { CSSProperties, KeyboardEvent, MouseEvent } from "react";

export interface NavHamburgerProps {
  open: boolean;
  onToggle: () => void;
  style: CSSProperties;
  dark?: boolean;
}

/** Accessible nav menu trigger matching Framer hamburger markup. */
export function NavHamburger({
  open,
  onToggle,
  style,
  dark: _dark = false,
}: NavHamburgerProps) {
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

  const bg = style.backgroundColor?.toString() ?? "";
  const cream =
    "var(--token-d10d7d5c-1c4f-4f9d-802c-1a10cef2fa55, rgb(247, 244, 237))";
  const ink =
    "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))";
  const barColor = open
    ? cream
    : bg.includes("rgba(15, 15, 15, 0)") || bg === "transparent"
      ? ink
      : "rgb(251, 251, 251)";

  return (
    <button
      type="button"
      className={
        open
          ? "framer-S33l9 framer-1rev26v framer-v-16bdydi"
          : "framer-S33l9 framer-1rev26v framer-v-1rev26v"
      }
      data-framer-name={open ? "Disabled" : "Enabled"}
      data-highlight={true}
      aria-expanded={open}
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
        color: "inherit",
      }}
    >
      <div
        className="framer-1481d4x"
        data-framer-name="Bottom"
        style={{ backgroundColor: barColor }}
      />
      <div
        className="framer-d8fgy7"
        data-framer-name="Top"
        style={{ backgroundColor: barColor }}
      />
    </button>
  );
}
