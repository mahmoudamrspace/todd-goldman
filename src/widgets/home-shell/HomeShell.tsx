import { Footer } from "@/widgets/sections/Footer";
import { Header } from "@/widgets/sections/Header";
import { HeroIntroRegion } from "@/features/HeroScrollContext";
import { Hero } from "@/widgets/sections/Hero";
import { Intro } from "@/widgets/sections/Intro";
import { SvgTemplates } from "@/widgets/sections/SvgTemplates";
import { ToddHomeSections } from "@/widgets/home-shell/ToddHomeSections";
import { FooterSection } from "@/widgets/interactive/FooterSection";
import { NavMenu } from "@/widgets/interactive/NavMenu";
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
import type { SiteSettings, Work } from "@/content/types";
import { cn } from "@/shared/lib/cn";
import { TODD } from "@/shared/lib/todd-semantic-classes";

export interface HomeShellProps {
  site: SiteSettings;
  works: Work[];
}

/** Composes all home sections with legacy export layout classes and feature behaviors. */
export function HomeShell({ site, works }: HomeShellProps) {
  const worksContent = toWorksContent(works, site);
  const testimonialContent = toTestimonialContent(site);
  const showTestimonials = testimonialContent.items.length > 0;

  return (
    <main id="main" data-todd-hydrate-v2="" data-todd-generated-page="">
      <div
        className={cn(TODD.page.shell, "todd-intro__wrapper-31", "todd-page-shell-layout")}
        data-layout-template="true"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <div
          data-todd-root=""
          className={cn(TODD.page.root, "todd-page-root", "todd-page-root-layout", "todd-page-root-variant")}
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
          <div className={TODD.page.content}>
            <HeroIntroRegion>
              <Hero content={toHeroContent(site)} />
              <Intro content={toIntroContent(site)} />
            </HeroIntroRegion>
            <ToddHomeSections
              worksContent={worksContent}
              sneakPeakContent={toSneakPeakContent(site)}
              servicesContent={toServicesContent(site)}
              testimonialContent={testimonialContent}
              showTestimonials={showTestimonials}
              aboutContent={toAboutContent(site)}
              faqContent={toFaqContent(site)}
            />
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
    </main>
  );
}
