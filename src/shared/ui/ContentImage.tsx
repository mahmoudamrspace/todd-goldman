import type { ImgHTMLAttributes } from "react";
import { imageSizes } from "@/shared/config/breakpoints";
import { cn } from "@/shared/lib/cn";

export interface ContentImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "alt" | "loading" | "decoding"> {
  alt: string;
  priority?: boolean;
  sizes?: string;
}

/** Content image with explicit dimensions and lazy loading defaults. */
export function ContentImage({
  alt,
  priority = false,
  className,
  width,
  height,
  sizes = imageSizes.full,
  ...props
}: ContentImageProps) {
  return (
    <img
      alt={alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      width={width}
      height={height}
      sizes={sizes}
      className={cn("todd-content-image", className)}
      {...props}
    />
  );
}

export interface DecorativeImageProps
  extends Omit<ImgHTMLAttributes<HTMLImageElement>, "alt"> {
  alt?: "";
  sizes?: string;
}

/** Decorative artwork hidden from assistive technologies. */
export function DecorativeImage({
  alt = "",
  className,
  width,
  height,
  sizes,
  ...props
}: DecorativeImageProps) {
  return (
    <img
      alt={alt}
      aria-hidden={true}
      loading="lazy"
      decoding="async"
      width={width}
      height={height}
      sizes={sizes}
      className={cn("todd-decorative-image", className)}
      {...props}
    />
  );
}
