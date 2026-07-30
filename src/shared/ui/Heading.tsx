import type { ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Heading.module.css";

type Level = 1 | 2 | 3 | 4;
type Variant = "hero" | "display" | "section" | "card" | "script";

type HeadingProps = {
  as?: ElementType;
  level?: Level;
  variant?: Variant;
  children: ReactNode;
  className?: string;
};

const defaultTag: Record<Level, ElementType> = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
};

export function Heading({
  as,
  level = 2,
  variant = "section",
  children,
  className,
}: HeadingProps) {
  const Tag = as ?? defaultTag[level];
  return (
    <Tag className={cn(styles.root, styles[variant], className)}>{children}</Tag>
  );
}
