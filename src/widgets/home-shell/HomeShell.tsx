import { About } from "@/widgets/sections/About";
import { Footer } from "@/widgets/sections/Footer";
import { Header } from "@/widgets/sections/Header";
import { HeroIntroRegion } from "@/features/HeroScrollContext";
import { Hero } from "@/widgets/sections/Hero";
import { Intro } from "@/widgets/sections/Intro";
import { ServicesSection } from "@/widgets/interactive/ServicesSection";
import { SneakPeak } from "@/widgets/sections/SneakPeak";
import { SvgTemplates } from "@/widgets/sections/SvgTemplates";
import { Testimonial } from "@/widgets/sections/Testimonial";
import { FaqSection } from "@/widgets/interactive/FaqSection";
import { FooterSection } from "@/widgets/interactive/FooterSection";
import { MarqueeSection } from "@/widgets/interactive/MarqueeSection";
import { NavMenu } from "@/widgets/interactive/NavMenu";
import { WorksSection } from "@/widgets/interactive/WorksSection";
import { WorksGallery } from "@/widgets/sections/WorksGallery";
import { StickySection } from "@/features/StickySection";
import {
  toAboutContent,
  toFaqContent,
  toFooterContent,
  toHeroContent,
  toIntroContent,
  toServicesContent,
  toSneakPeakContent,
  toTestimonialContent,
  toWorksContent,
} from "@/content/section-types";
import type { ContentProfile } from "@/content";
import type { SiteSettings, Work } from "@/content/types";

export interface HomeShellProps {
  site: SiteSettings;
  works: Work[];
  contentProfile?: ContentProfile;
}

/** Composes all home sections with Framer layout classes and feature behaviors. */
export function HomeShell({
  site,
  works,
  contentProfile = "default",
}: HomeShellProps) {
  const isToddProfile = contentProfile === "default";
  const worksContent = toWorksContent(works, site);
  const testimonialContent = toTestimonialContent(site);
  const showTestimonials = testimonialContent.items.length > 0;

  return (
    <div id="main" data-framer-hydrate-v2="" data-framer-generated-page="">
      <div
        className="framer-XP9RI framer-16i3gsx"
        data-layout-template="true"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <div
          data-framer-root=""
          className="framer-v1Omn framer-Q4hZR framer-72rtr7"
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
          <HeroIntroRegion>
            <Hero content={toHeroContent(site)} />
            <Intro content={toIntroContent(site)} />
          </HeroIntroRegion>
          {isToddProfile ? (
            <WorksGallery content={worksContent} />
          ) : (
            <WorksSection content={worksContent} />
          )}
          <MarqueeSection>
            <SneakPeak content={toSneakPeakContent(site)} />
          </MarqueeSection>
          <ServicesSection content={toServicesContent(site)} />
          {showTestimonials ? (
            <StickySection>
              <Testimonial content={testimonialContent} />
            </StickySection>
          ) : isToddProfile ? (
            <div className="todd-section-bridge" aria-hidden="true" />
          ) : null}
          <About content={toAboutContent(site)} />
          <FaqSection content={toFaqContent(site)} />
          <div className={"framer-vwz6y7"} data-framer-name={"Footer-For scroll only"} id={"contact"} />
          <div className={"framer-17h3w0h-container"}>
            <div />
          </div>
        </div>
        <NavMenu>
          <Header content={toIntroContent(site)} />
        </NavMenu>
        <FooterSection>
          <Footer content={toFooterContent(site)} />
        </FooterSection>
        <SvgTemplates />
      </div>
    </div>
  );
}
