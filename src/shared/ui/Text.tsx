import type { CSSProperties, ElementType, ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Text.module.css";

type Tone = "primary" | "secondary" | "muted";
type Size = "xs" | "sm" | "md" | "lg";

type TextProps = {
  as?: ElementType;
  children: ReactNode;
  tone?: Tone;
  size?: Size;
  className?: string;
  style?: CSSProperties;
};

export function Text({
  as: Tag = "p",
  children,
  tone = "primary",
  size = "md",
  className,
  style,
}: TextProps) {
  return (
    <Tag
      className={cn(styles.root, styles[tone], styles[size], className)}
      style={style}
    >
      {children}
    </Tag>
  );
}
