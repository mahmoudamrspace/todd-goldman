"use client";

import { cn } from "@/shared/lib/cn";
import { responsiveVisibleOnly } from "@/shared/lib/todd-semantic-classes";
import { DecorativeImage } from "@/shared/ui/ContentImage";

/** Mobile-only awards mark background inside the about container. */
export function AboutMobileBackground({ awardsMark }: { awardsMark: string }) {
  return (
    <div className={cn(responsiveVisibleOnly("mobile"), "todd-about__section-background")}>
      <div
        style={{
          position: "absolute",
          borderRadius: "inherit",
          cornerShape: "inherit",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
        }}
        data-todd-background-image-wrapper={true}
      >
        <DecorativeImage
          src={awardsMark}
          width={1920}
          height={1487}
          sizes="(max-width: 809.98px) min(100vw, 1128px)"
          style={{
            display: "block",
            width: "100%",
            height: "100%",
            borderRadius: "inherit",
            cornerShape: "inherit",
            objectPosition: "center",
            objectFit: "cover",
          }}
        />
      </div>
    </div>
  );
}
