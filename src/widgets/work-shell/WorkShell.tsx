import { Footer } from "@/widgets/sections/Footer";
import { SvgTemplates } from "@/widgets/sections/SvgTemplates";
import { WorkDetail } from "@/widgets/sections/WorkDetail";
import { ToddWorkDetail } from "@/widgets/sections/ToddWorkDetail";
import { WorkHeader } from "@/widgets/sections/WorkHeader";
import { FooterSection } from "@/widgets/interactive/FooterSection";
import { NavMenu } from "@/widgets/interactive/NavMenu";
import { toFooterContent, toIntroContent, toWorkDetailNavLabels } from "@/content/section-types";
import type { ContentProfile } from "@/content";
import type { SiteSettings, Work } from "@/content/types";

export interface WorkShellProps {
  site: SiteSettings;
  work: Work;
  works: Work[];
  contentProfile?: ContentProfile;
}

export function WorkShell({
  site,
  work,
  works,
  contentProfile = "default",
}: WorkShellProps) {
  void works;
  const navLabels = toWorkDetailNavLabels(site);
  const isToddProfile = contentProfile === "default";

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
          {isToddProfile ? (
            <ToddWorkDetail work={work} navLabels={navLabels} />
          ) : (
            <WorkDetail work={work} navLabels={navLabels} />
          )}
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
