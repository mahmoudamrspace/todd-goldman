import type { MetadataRoute } from "next";
import { siteConfig } from "@/shared/config/site";
import { getWorks } from "@/content";

export const dynamic = "force-static";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const works = await getWorks();
  const base = siteConfig.url;
  return [
    { url: `${base}/`, changeFrequency: "monthly", priority: 1 },
    ...works.map((w) => ({
      url: `${base}/works/${w.slug}/`,
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
