import type { ContentRepository } from "@/content/repository";
import { siteSettingsSchema, workSchema } from "@/content/schemas";
import type { SiteSettings, Work } from "@/content/types";

/**
 * Sanity CMS adapter — wire when SANITY_PROJECT_ID and SANITY_DATASET are set.
 */
export const sanityContentRepository: ContentRepository = {
  async getSite(): Promise<SiteSettings> {
    throw new Error(
      "Sanity adapter not configured. Set SANITY_PROJECT_ID and SANITY_DATASET.",
    );
  },
  async getWorks(): Promise<Work[]> {
    throw new Error("Sanity adapter not configured.");
  },
  async getWork(_slug: string): Promise<Work | null> {
    throw new Error("Sanity adapter not configured.");
  },
};

export function parseSanityWork(raw: unknown): Work {
  return workSchema.parse(raw);
}

export function parseSanitySite(raw: unknown): SiteSettings {
  return siteSettingsSchema.parse(raw);
}
