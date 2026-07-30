import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Container.module.css";

type ContainerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section" | "header" | "footer" | "main";
};

export function Container({
  children,
  className,
  as: Tag = "div",
}: ContainerProps) {
  return <Tag className={cn(styles.root, className)}>{children}</Tag>;
}
