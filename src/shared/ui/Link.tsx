import NextLink from "next/link";
import type { ReactNode } from "react";
import { cn } from "@/shared/lib/cn";
import styles from "./Link.module.css";

type LinkProps = {
  href: string;
  children: ReactNode;
  className?: string;
  external?: boolean;
  underline?: boolean;
};

export function Link({
  href,
  children,
  className,
  external,
  underline = false,
}: LinkProps) {
  const classNames = cn(styles.root, underline && styles.underline, className);
  if (external) {
    return (
      <a
        href={href}
        className={classNames}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    );
  }
  return (
    <NextLink href={href} className={classNames}>
      {children}
    </NextLink>
  );
}
