import type { ArtCatalog, SiteSettings, Work, Book } from "@/content/types";

export interface ContentRepository {
  getArtCatalog(): Promise<ArtCatalog>;
  getSite(): Promise<SiteSettings>;
  getWorks(): Promise<Work[]>;
  getWork(slug: string): Promise<Work | null>;
  getBooks(): Promise<Book[]>;
}
