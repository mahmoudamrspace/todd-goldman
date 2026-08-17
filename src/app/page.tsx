import { getBooks, getSite, getWorks } from "@/content";
import { HomeShell } from "@/widgets/home-shell/HomeShell";

export default async function HomePage() {
  const [site, works, books] = await Promise.all([getSite(), getWorks(), getBooks()]);
  return <HomeShell site={site} works={works} books={books} />;
}
