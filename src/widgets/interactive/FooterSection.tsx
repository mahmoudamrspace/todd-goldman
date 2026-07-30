"use client";

import type { ReactNode } from "react";

/** Client wrapper for footer decoration motion and hover behaviors. */
export function FooterSection({ children }: { children: ReactNode }) {
  return (
    <div data-footer-motion-root="" style={{ display: "contents" }}>
      {children}
    </div>
  );
}
