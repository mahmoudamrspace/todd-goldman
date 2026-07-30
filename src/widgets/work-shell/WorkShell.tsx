import { Footer } from "@/widgets/sections/Footer";
import { SvgTemplates } from "@/widgets/sections/SvgTemplates";
import { ToddWorkDetail } from "@/widgets/sections/ToddWorkDetail";
import { WorkHeader } from "@/widgets/sections/WorkHeader";
import { FooterSection } from "@/widgets/interactive/FooterSection";
import { NavMenu } from "@/widgets/interactive/NavMenu";
import { toFooterContent, toIntroContent, toWorkDetailNavLabels } from "@/content/section-types";
import type { SiteSettings, Work } from "@/content/types";

export interface WorkShellProps {
  site: SiteSettings;
  work: Work;
  works: Work[];
}

export function WorkShell({ site, work, works }: WorkShellProps) {
  void works;
  const navLabels = toWorkDetailNavLabels(site);

  return (
    <div id="main" data-framer-generated-page="">
      <div
        className="framer-XP9RI framer-16i3gsx"
        data-layout-template="true"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <div
          data-framer-root=""
          className="framer-KPXZq framer-bi9rI framer-Rk1Eg framer-r9bvin"
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
          <ToddWorkDetail work={work} navLabels={navLabels} />
          <div className="framer-1pymhjr-container">
            <div />
          </div>
        </div>
        <NavMenu>
          <WorkHeader content={toIntroContent(site)} />
        </NavMenu>
        <FooterSection>
          <Footer content={toFooterContent(site)} />
        </FooterSection>
        <SvgTemplates />
      </div>
    </div>
  );
}
