import type { SiteSettings, Work, Book } from "@/content/types";

export interface ContentRepository {
  getSite(): Promise<SiteSettings>;
  getWorks(): Promise<Work[]>;
  getWork(slug: string): Promise<Work | null>;
  getBooks(): Promise<Book[]>;
}
