import type { ReactNode } from "react";
import { responsiveHiddenOn, responsiveVisibleOnly } from "@/shared/lib/todd-semantic-classes";

export interface ResponsiveArtworkProps {
  /** Desktop-only decorative artwork. */
  desktop: ReactNode;
  /** Tablet-only decorative artwork. */
  tablet?: ReactNode;
  /** Mobile-only decorative artwork. */
  mobile?: ReactNode;
  className?: string;
}

/** Renders breakpoint-specific decorative artwork without duplicating semantic text. */
export function ResponsiveArtwork({
  desktop,
  tablet,
  mobile,
  className,
}: ResponsiveArtworkProps) {
  return (
    <div className={className}>
      <div className={responsiveVisibleOnly("desktop")}>{desktop}</div>
      {tablet ? (
        <div className={responsiveVisibleOnly("tablet")}>{tablet}</div>
      ) : (
        <div className={responsiveHiddenOn("desktop", "mobile")}>{desktop}</div>
      )}
      {mobile ? (
        <div className={responsiveVisibleOnly("mobile")}>{mobile}</div>
      ) : (
        <div className={responsiveHiddenOn("desktop", "tablet")}>{desktop}</div>
      )}
    </div>
  );
}
