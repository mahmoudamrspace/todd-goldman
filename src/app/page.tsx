import { getArtCatalog, getBooks, getSite } from "@/content";
import { HomeShell } from "@/widgets/home-shell/HomeShell";

export default async function HomePage() {
  const [site, catalog, books] = await Promise.all([
    getSite(),
    getArtCatalog(),
    getBooks(),
  ]);
  return <HomeShell site={site} catalog={catalog} books={books} />;
}
