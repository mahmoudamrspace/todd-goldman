import { getContentProfile, getSite, getWorks } from "@/content";
import { HomeShell } from "@/widgets/home-shell/HomeShell";

export default async function HomePage() {
  const contentProfile = getContentProfile();
  const [site, works] = await Promise.all([getSite(), getWorks()]);
  return <HomeShell site={site} works={works} contentProfile={contentProfile} />;
}
