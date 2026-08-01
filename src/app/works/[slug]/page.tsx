import { notFound } from "next/navigation";
import { getSite, getWork, getWorks } from "@/content";
import { WorkShell } from "@/widgets/work-shell/WorkShell";

export async function generateStaticParams() {
  const works = await getWorks();
  return works.map((work) => ({ slug: work.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const work = await getWork(slug);
  if (!work) return {};
  return { title: work.title, description: work.describe.slice(0, 160) };
}

export default async function WorkPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const [site, works, work] = await Promise.all([
    getSite(),
    getWorks(),
    getWork(slug),
  ]);
  if (!work) notFound();
  return <WorkShell site={site} work={work} works={works} />;
}
