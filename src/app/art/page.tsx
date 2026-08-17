import type { Metadata } from "next";
import { getArtCatalog, getSite } from "@/content";
import { ArtShell } from "@/widgets/art-shell/ArtShell";

export async function generateMetadata(): Promise<Metadata> {
  const catalog = await getArtCatalog();
  const draft = catalog.status === "draft";

  return {
    title: "Art",
    description: catalog.intro,
    alternates: { canonical: "/art/" },
    robots: draft
      ? { index: false, follow: false, noarchive: true }
      : { index: true, follow: true },
  };
}

export default async function ArtPage() {
  const [catalog, site] = await Promise.all([getArtCatalog(), getSite()]);
  return <ArtShell catalog={catalog} site={site} />;
}
