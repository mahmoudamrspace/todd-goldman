"use client";

import { useNavMenu } from "@/features/nav-menu/NavMenuContext";
import {
  navLinkCloseDelays,
  navLinkCloseSpring,
  navLinkDelays,
  navOverlaySpring,
} from "@/shared/lib/motion";
import { motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export interface NavMenuLinkProps {
  href: string;
  open: boolean;
  index: number;
  className: string;
  "data-framer-name": string;
  onMouseEnter?: () => void;
  children: ReactNode;
}

/** Staggered nav overlay link entrance matching Framer spring timing. */
export function NavMenuLink({
  href,
  open,
  index,
  className,
  "data-framer-name": dataFramerName,
  onMouseEnter,
  children,
}: NavMenuLinkProps) {
  const reduced = useReducedMotion();
  const { setOpen } = useNavMenu();
  const enterDelay = navLinkDelays[index] ?? 0.45;
  const exitDelay = navLinkCloseDelays[index] ?? 0;
  const external = href.startsWith("http");

  if (reduced) {
    return (
      <a
        className={className}
        data-framer-name={dataFramerName}
        data-highlight={true}
        href={href}
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
      data-framer-name={dataFramerName}
      data-highlight={true}
      href={href}
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
