import type { ContentRepository } from "@/content/repository";
import { siteSettingsSchema, workSchema } from "@/content/schemas";
import { referenceSiteSeed } from "@/content/seeds/reference-site";
import { referenceWorksSeed } from "@/content/seeds/reference-works";

/** Reference profile — matches Framer export text for pixel gate. */
export const referenceContentRepository: ContentRepository = {
  async getSite() {
    return siteSettingsSchema.parse(referenceSiteSeed);
  },
  async getWorks() {
    return referenceWorksSeed.map((work) => workSchema.parse(work));
  },
  async getWork(slug: string) {
    const work = referenceWorksSeed.find((item) => item.slug === slug);
    return work ? workSchema.parse(work) : null;
  },
};
