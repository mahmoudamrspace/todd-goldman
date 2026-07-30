import type { z } from "zod";
import {
  siteSettingsSchema,
  workImageSchema,
  workSchema,
} from "@/content/schemas";

export type WorkImage = z.infer<typeof workImageSchema>;
export type Work = z.infer<typeof workSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
