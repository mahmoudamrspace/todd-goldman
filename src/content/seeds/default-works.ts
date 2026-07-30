import type { Work } from "@/content/types";
import { referenceWorksSeed } from "@/content/seeds/reference-works";

/** Production works — same structure as reference; titles preserved for route parity. */
export const defaultWorksSeed: Work[] = referenceWorksSeed.map((work) => ({
  ...work,
  client: work.client,
}));
