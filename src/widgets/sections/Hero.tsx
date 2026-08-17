"use client";

import { toddHeroIllustration, toddHeroPieces } from "@/content/todd-hero-pieces";
import type { HeroContent } from "@/content/section-types";
import { Appear } from "@/features/Appear";
import { HeroScatterScene } from "@/features/HeroScatterScene";
import { cn } from "@/shared/lib/cn";
import { responsiveVisibleOnly, TODD } from "@/shared/lib/todd-semantic-classes";

export function Hero({ content }: { content: HeroContent }) {
  const illustration = content.illustration || toddHeroIllustration;

  return (
    <section
      className={cn(TODD.hero.section, "todd-intro__wrapper-20")}
      data-todd-name="Hero"
      role="presentation"
      aria-hidden={true}
    >
      <div className={cn(TODD.hero.container, "todd-intro__wrapper-39")} data-todd-name="Container">
        <div
          className={cn(TODD.hero.illustration, "todd-hero__illustration", "todd-hero-pieces")}
          data-todd-name="Illustration"
        >
          <HeroScatterScene pieces={toddHeroPieces} />
        </div>
        <div className={responsiveVisibleOnly("mobile")}>
          <Appear
            id="10mg3pr"
            className={cn(
              TODD.hero.mobileFallback,
              "todd-hero__mobile-illustration",
              "todd-hide-desktop",
              "todd-hide-tablet",
            )}
            data-todd-name="Hero illo-52"
            style={{ willChange: "transform", opacity: "0.001", transform: "translateY(38px)" }}
          >
            <div
              style={{
                position: "absolute",
                borderRadius: "inherit",
                top: 0,
                right: 0,
                bottom: 0,
                left: 0,
              }}
              data-todd-background-image-wrapper={true}
            >
              <img
                decoding="async"
                width={1920}
                height={1080}
                src={illustration}
                alt=""
                aria-hidden={true}
                className="todd-hero-mobile-illo"
              />
            </div>
          </Appear>
        </div>
      </div>
    </section>
  );
}
