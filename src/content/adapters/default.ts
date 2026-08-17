import type { ContentRepository } from "@/content/repository";
import { bookSchema, siteSettingsSchema, workSchema } from "@/content/schemas";
import booksData from "@/content/data/todd-books.json";
import { defaultSiteSeed } from "@/content/seeds/default-site";
import { defaultWorksSeed } from "@/content/seeds/default-works";

/** Todd Goldman content repository. */
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
  async getBooks() {
    return booksData.map((book) => bookSchema.parse(book));
  },
};
