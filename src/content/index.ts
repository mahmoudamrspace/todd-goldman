import type { ContentRepository } from "@/content/repository";
import { defaultContentRepository } from "@/content/adapters/default";
import { sanityContentRepository } from "@/content/sanity/adapter";

export function getContentRepository(): ContentRepository {
  if (process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET) {
    return sanityContentRepository;
  }
  return defaultContentRepository;
}

export async function getSite() {
  return getContentRepository().getSite();
}

export async function getWorks() {
  return getContentRepository().getWorks();
}

export async function getWork(slug: string) {
  return getContentRepository().getWork(slug);
}
