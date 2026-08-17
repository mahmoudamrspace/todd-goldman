"use client";

import { useEffect, useRef, type ReactNode } from "react";

export interface NavFocusTrapProps {
  open: boolean;
  children: ReactNode;
  labelledBy?: string;
}

const FOCUSABLE =
  'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])';

/** Traps keyboard focus inside the open navigation overlay. */
export function NavFocusTrap({ open, children, labelledBy }: NavFocusTrapProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;

    const container = containerRef.current;
    if (!container) return;

    const root = container.ownerDocument;
    const previouslyFocused = root.activeElement as HTMLElement | null;
    const focusables = Array.from(
      container.querySelectorAll<HTMLElement>(FOCUSABLE),
    ).filter((el) => !el.hasAttribute("disabled") && el.tabIndex !== -1);

    focusables[0]?.focus();

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Tab" || focusables.length === 0) return;

      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      const active = root.activeElement as HTMLElement | null;

      if (event.shiftKey && active === first) {
        event.preventDefault();
        last?.focus();
      } else if (!event.shiftKey && active === last) {
        event.preventDefault();
        first?.focus();
      }
    };

    container.addEventListener("keydown", onKeyDown);

    return () => {
      container.removeEventListener("keydown", onKeyDown);
      previouslyFocused?.focus();
    };
  }, [open]);

  return (
    <div
      ref={containerRef}
      role="dialog"
      aria-modal={open ? "true" : undefined}
      aria-labelledby={open ? labelledBy : undefined}
      aria-label={open && !labelledBy ? "Site menu" : undefined}
      aria-hidden={open ? undefined : "true"}
      style={{ display: "contents" }}
    >
      {children}
    </div>
  );
}
