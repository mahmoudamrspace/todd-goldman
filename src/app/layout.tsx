import type { Metadata } from "next";
import "@/shared/styles/todd-fonts.css";
import "@/shared/styles/todd-responsive.css";
import "@/shared/styles/todd-layout.css";
import "@/shared/styles/globals.css";
import "@/shared/styles/todd-typography.css";
import "@/shared/styles/todd-section-layout.css";
import "@/shared/styles/todd-identity.css";
import "@/shared/styles/todd-art.css";
import "@/shared/styles/faq-interactive.css";
import "@/shared/styles/testimonial-interactive.css";
import { getSite } from "@/content";
import { siteConfig } from "@/shared/config/site";
import { CustomCursor } from "@/features/CustomCursor";
import { SmoothScroll } from "@/features/SmoothScroll";

const SOCIAL_COVER = {
  path: "/social-cover-og.png",
  width: 1200,
  height: 630,
  type: "image/png",
} as const;

export async function generateMetadata(): Promise<Metadata> {
  const site = await getSite();
  const title = site.metaTitle;
  const description = site.metaDescription;
  const socialCoverAlt = `${site.artistName} — Never Grow Up artwork`;

  return {
    metadataBase: new URL(siteConfig.url),
    title: {
      default: title,
      template: `%s · ${site.artistName}`,
    },
    description,
    alternates: {
      canonical: "/",
    },
    openGraph: {
      type: "website",
      locale: siteConfig.locale,
      url: siteConfig.url,
      siteName: site.artistName,
      title,
      description,
      images: [
        {
          url: SOCIAL_COVER.path,
          width: SOCIAL_COVER.width,
          height: SOCIAL_COVER.height,
          alt: socialCoverAlt,
          type: SOCIAL_COVER.type,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [SOCIAL_COVER.path],
    },
    icons: {
      icon: [
        { url: "/favicon/boo-boo-buddies-angel.ico" },
        {
          url: "/favicon/web-app-manifest-192x192.png",
          sizes: "192x192",
          type: "image/png",
        },
        {
          url: "/favicon/web-app-manifest-512x512.png",
          sizes: "512x512",
          type: "image/png",
        },
      ],
      apple: "/favicon/web-app-manifest-192x192.png",
    },
    manifest: "/favicon/site.webmanifest",
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
