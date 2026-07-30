"use client";

import { useLayoutEffect, useRef, useState, type ReactNode } from "react";

/** Locks parent height to measured child height to prevent accordion layout jump. */
export function HeightLock({ children }: { children: ReactNode }) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState<number | undefined>();

  useLayoutEffect(() => {
    const node = innerRef.current;
    if (!node) return;

    const measure = () => setHeight(node.offsetHeight);
    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(node);
    return () => observer.disconnect();
  }, [children]);

  return (
    <div
      style={{
        width: "100%",
        height: height !== undefined ? `${height}px` : "auto",
        overflow: "visible",
      }}
    >
      <div ref={innerRef} style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
}
