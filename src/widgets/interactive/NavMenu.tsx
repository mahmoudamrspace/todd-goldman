"use client";

import { NavMenuProvider } from "@/features/nav-menu/NavMenuContext";
import type { ReactNode } from "react";

/** Provides nav open/close state to header variants. */
export function NavMenu({ children }: { children: ReactNode }) {
  return <NavMenuProvider>{children}</NavMenuProvider>;
}
