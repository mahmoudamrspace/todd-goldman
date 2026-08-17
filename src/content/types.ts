import type { z } from "zod";
import {
  siteSettingsSchema,
  workImageSchema,
  workSchema,
  bookSchema,
} from "@/content/schemas";

export type WorkImage = z.infer<typeof workImageSchema>;
export type Work = z.infer<typeof workSchema>;
export type Book = z.infer<typeof bookSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
