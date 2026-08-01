import type { Metadata } from "next";
import "@framer/styles/framer-fonts.css";
import "@framer/styles/framer-breakpoints.css";
import "@framer/styles/framer-site.css";
import "@/shared/styles/globals.css";
import "@/shared/styles/todd-identity.css";
import "@/shared/styles/faq-interactive.css";
import "@/shared/styles/testimonial-interactive.css";
import { getSite } from "@/content";
import { siteConfig } from "@/shared/config/site";
import { CustomCursor } from "@/features/CustomCursor";
import { SmoothScroll } from "@/features/SmoothScroll";

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: site.metaTitle,
      template: `%s · ${site.artistName}`,
    },
    description: site.metaDescription,
  };
}

export default async function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body style={{ margin: 0 }} data-content-profile="default">
        <a className="skip-link" href="#main">
          Skip to main content
        </a>
        <SmoothScroll>
          <CustomCursor />
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
