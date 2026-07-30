import type { SiteSettings, Work } from "@/content/types";

export interface ContentRepository {
  getSite(): Promise<SiteSettings>;
  getWorks(): Promise<Work[]>;
  getWork(slug: string): Promise<Work | null>;
}
