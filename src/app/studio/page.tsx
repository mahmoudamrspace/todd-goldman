import Link from "next/link";
import { getSite } from "@/content";
import { siteConfig } from "@/shared/config/site";

export const metadata = {
  title: "Studio",
  robots: { index: false, follow: false },
};

export default async function StudioPage() {
  const site = await getSite();
  return (
    <main style={{ maxWidth: 720, margin: "0 auto", padding: "48px 24px" }}>
      <p style={{ color: "#666" }}>Todd Goldman — CMS shell</p>
      <h1>Studio</h1>
      <ul>
        <li>Artist: {site.artistName}</li>
        <li>Site URL: {siteConfig.url}</li>
      </ul>
      <p>
        <Link href="/">← Home</Link>
      </p>
    </main>
  );
}
