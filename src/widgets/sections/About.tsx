"use client";

import type { AboutContent } from "@/content/section-types";
import { AboutBioCard } from "@/features/about/AboutBioCard";
import { AboutClientsCard } from "@/features/about/AboutClientsCard";
import { AboutHeader } from "@/features/about/AboutHeader";
import { AboutMobileBackground } from "@/features/about/AboutMobileBackground";
import { AboutStatsCard } from "@/features/about/AboutStatsCard";
import { AboutTimelineCard } from "@/features/about/AboutTimelineCard";
import { cn } from "@/shared/lib/cn";
import { TODD } from "@/shared/lib/todd-semantic-classes";

export function About({ content }: { content: AboutContent }) {
  const neverGrowCard = content.images.neverGrow;
  const timelineCard = content.images.timeline;
  const awardsImage = content.images.byTheNumbers;
  const whereArtCard = content.images.whereArt;

  return (
    <section
      className={cn(TODD.about.section, "todd-about")}
      data-todd-name={"About"}
      id={"about"}
      aria-labelledby="todd-about-title"
    >
      <div className={cn(TODD.about.container, "todd-about__container")} data-todd-name={"Container"}>
        <AboutMobileBackground awardsMark={content.awardsMark} />
        <AboutHeader content={content} />
        <AboutBioCard content={content} cardImage={neverGrowCard} />
        <AboutTimelineCard content={content} cardImage={timelineCard} />
        <AboutClientsCard content={content} cardImage={whereArtCard} />
        <AboutStatsCard content={content} cardImage={awardsImage} />
      </div>
    </section>
  );
}
