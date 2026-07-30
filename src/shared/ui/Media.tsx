import Image from "next/image";
import { cn } from "@/shared/lib/cn";
import styles from "./Media.module.css";

type MediaProps = {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  priority?: boolean;
  className?: string;
  sizes?: string;
};

export function Media({
  src,
  alt,
  width = 1600,
  height = 1200,
  priority,
  className,
  sizes = "(max-width: 768px) 100vw, 50vw",
}: MediaProps) {
  return (
    <div className={cn(styles.root, className)}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        sizes={sizes}
        className={styles.img}
      />
    </div>
  );
}
