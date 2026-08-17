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
    <div id="main" data-todd-generated-page="">
      <div
        className="todd-intro__wrapper-31 todd-page-shell-layout"
        data-layout-template="true"
        style={{ minHeight: "100vh", width: "auto" }}
      >
        <div
          data-todd-root=""
          className="todd-work-shell__div-2 todd-work-shell__div-4 todd-work-shell__div-3 todd-work-shell__div-5"
          style={{ minHeight: "100vh", width: "auto", display: "contents" }}
        >
          <div className="site-page-content site-page-content--work">
            <ToddWorkDetail work={work} navLabels={navLabels} />
          </div>
          <div className="todd-work-shell__div">
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
