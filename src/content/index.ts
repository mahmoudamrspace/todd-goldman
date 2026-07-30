import type { ContentRepository } from "@/content/repository";
import { defaultContentRepository } from "@/content/adapters/default";
import { referenceContentRepository } from "@/content/adapters/reference";
import { sanityContentRepository } from "@/content/sanity/adapter";

export type ContentProfile = "default" | "reference";

export function getContentProfile(): ContentProfile {
  const profile = process.env.CONTENT_PROFILE ?? "default";
  return profile === "reference" ? "reference" : "default";
}

export function getContentRepository(): ContentRepository {
  if (process.env.SANITY_PROJECT_ID && process.env.SANITY_DATASET) {
    return sanityContentRepository;
  }
  return getContentProfile() === "reference"
    ? referenceContentRepository
    : defaultContentRepository;
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
