import type { Work } from "@/content/types";

interface WorkCardProps {
  work: Work;
}

/** Work grid item — markup lives in Works section; entity holds typed contract. */
export function WorkCard({ work }: WorkCardProps) {
  return (
    <article data-entity="work-card" data-slug={work.slug}>
      <span>{work.title}</span>
    </article>
  );
}
