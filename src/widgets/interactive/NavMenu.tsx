"use client";

import { useEffect, type ReactNode } from "react";
import { NavMenuProvider, useNavMenu } from "@/features/nav-menu/NavMenuContext";

function NavMenuEffects({ children }: { children: ReactNode }) {
  const { open, setOpen } = useNavMenu();

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open, setOpen]);

  return children;
}

/** Provides nav open/close state to header variants. */
export function NavMenu({ children }: { children: ReactNode }) {
  return (
    <NavMenuProvider>
      <NavMenuEffects>{children}</NavMenuEffects>
    </NavMenuProvider>
  );
}
