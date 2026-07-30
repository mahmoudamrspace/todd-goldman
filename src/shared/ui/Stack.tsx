import type { CSSProperties, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Stack.module.css";

type StackProps = {
  children: ReactNode;
  gap?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
  className?: string;
  direction?: "column" | "row";
};

export function Stack({
  children,
  gap = 4,
  className,
  direction = "column",
}: StackProps) {
  const style = {
    ["--stack-gap" as string]: `var(--space-${gap})`,
  } as CSSProperties;
  return (
    <div
      className={cn(
        styles.root,
        direction === "row" ? styles.row : styles.column,
        className,
      )}
      style={style}
    >
      {children}
    </div>
  );
}
