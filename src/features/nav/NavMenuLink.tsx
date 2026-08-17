"use client";

import { useNavMenu } from "@/features/nav-menu/NavMenuContext";
import {
  navLinkCloseDelays,
  navLinkCloseSpring,
  navLinkDelays,
  navOverlaySpring,
} from "@/shared/lib/motion";
import { useNavLinkActive } from "@/shared/lib/use-nav-link-active";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export interface NavMenuLinkProps {
  href: string;
  open: boolean;
  index: number;
  className: string;
  "data-todd-name": string;
  onMouseEnter?: () => void;
  children: ReactNode;
}

/** Staggered nav overlay link entrance matching legacy export spring timing. */
export function NavMenuLink({
  href,
  open,
  index,
  className,
  "data-todd-name": dataToddName,
  onMouseEnter,
  children,
}: NavMenuLinkProps) {
  const reduced = useReducedMotion();
  const { setOpen } = useNavMenu();
  const active = useNavLinkActive(href);
  const enterDelay = navLinkDelays[index] ?? navLinkDelays.at(-1) ?? 0.45;
  const exitDelay = navLinkCloseDelays[index] ?? navLinkCloseDelays.at(-1) ?? 0;
  const external = href.startsWith("http");

  if (reduced) {
    return (
      <a
        className={className}
        data-todd-name={dataToddName}
        data-highlight={true}
        data-cursor-label={external ? "Visit" : "Open"}
        href={href}
        aria-current={active ? "page" : undefined}
        style={{
          opacity: open ? 1 : 0,
          pointerEvents: open ? undefined : "none",
        }}
        onMouseEnter={onMouseEnter}
        onClick={() => setOpen(false)}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      >
        {children}
      </a>
    );
  }

  return (
    <motion.a
      className={className}
      data-todd-name={dataToddName}
      data-highlight={true}
      data-cursor-label={external ? "Visit" : "Open"}
      href={href}
      aria-current={active ? "page" : undefined}
      style={{ willChange: "transform", pointerEvents: open ? undefined : "none" }}
      initial={false}
      animate={open ? { opacity: 1, y: 0 } : { opacity: 0, y: -16 }}
      transition={
        open
          ? { ...navOverlaySpring, delay: enterDelay }
          : { ...navLinkCloseSpring, delay: exitDelay }
      }
      onMouseEnter={onMouseEnter}
      onClick={() => setOpen(false)}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      {children}
    </motion.a>
  );
}
