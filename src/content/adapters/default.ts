import type { ContentRepository } from "@/content/repository";
import { siteSettingsSchema, workSchema } from "@/content/schemas";
import { defaultSiteSeed } from "@/content/seeds/default-site";
import { defaultWorksSeed } from "@/content/seeds/default-works";

/** Default production profile — Todd Goldman. */
export const defaultContentRepository: ContentRepository = {
  async getSite() {
    return siteSettingsSchema.parse(defaultSiteSeed);
  },
  async getWorks() {
    return defaultWorksSeed.map((work) => workSchema.parse(work));
  },
  async getWork(slug: string) {
    const work = defaultWorksSeed.find((item) => item.slug === slug);
    return work ? workSchema.parse(work) : null;
  },
};
