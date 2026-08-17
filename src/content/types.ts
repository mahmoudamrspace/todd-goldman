import type { z } from "zod";
import {
  artCatalogSchema,
  artPieceSchema,
  artSeriesSchema,
  siteSettingsSchema,
  workImageSchema,
  workSchema,
  bookSchema,
} from "@/content/schemas";

export type ArtCatalog = z.infer<typeof artCatalogSchema>;
export type ArtPiece = z.infer<typeof artPieceSchema>;
export type ArtSeries = z.infer<typeof artSeriesSchema>;
export type WorkImage = z.infer<typeof workImageSchema>;
export type Work = z.infer<typeof workSchema>;
export type Book = z.infer<typeof bookSchema>;
export type SiteSettings = z.infer<typeof siteSettingsSchema>;
