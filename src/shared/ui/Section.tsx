import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import { Container } from "./Container";
import styles from "./Section.module.css";

type SectionProps = {
  id?: string;
  children: ReactNode;
  className?: string;
  contained?: boolean;
};

export function Section({
  id,
  children,
  className,
  contained = true,
}: SectionProps) {
  const inner = contained ? <Container>{children}</Container> : children;
  return (
    <section id={id} className={cn(styles.root, className)}>
      {inner}
    </section>
  );
}
