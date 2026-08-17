import type { ArtCatalog, SiteSettings } from "@/content/types";
import {
  toFooterContent,
  toIntroContent,
} from "@/content/section-types";
import { cn } from "@/shared/lib/cn";
import { TODD } from "@/shared/lib/todd-semantic-classes";
import { NavMenu } from "@/widgets/interactive/NavMenu";
import { FooterSection } from "@/widgets/interactive/FooterSection";
import { ArtArchive } from "@/widgets/sections/ArtArchive";
import { Footer } from "@/widgets/sections/Footer";
import { SvgTemplates } from "@/widgets/sections/SvgTemplates";
import { WorkHeader } from "@/widgets/sections/WorkHeader";

export interface ArtShellProps {
  catalog: ArtCatalog;
  site: SiteSettings;
}

export function ArtShell({ catalog, site }: ArtShellProps) {
  return (
    <div
      className={cn(
        "todd-art-page",
        TODD.page.shell,
        "todd-intro__wrapper-31",
        "todd-page-shell-layout",
      )}
      data-layout-template="true"
      style={{ minHeight: "100vh", width: "auto" }}
    >
      <div
        data-todd-root=""
        className={cn(
          TODD.page.root,
          "todd-page-root",
          "todd-page-root-layout",
          "todd-page-root-variant",
        )}
        style={{ minHeight: "100vh", width: "auto", display: "contents" }}
      >
        <NavMenu>
          <WorkHeader content={toIntroContent(site)} />
        </NavMenu>
        <main id="main" className="todd-art-page__main" data-todd-generated-page="">
          <ArtArchive catalog={catalog} mode="archive" />
        </main>
        <FooterSection>
          <Footer content={toFooterContent(site)} />
        </FooterSection>
        <SvgTemplates />
      </div>
    </div>
  );
}
