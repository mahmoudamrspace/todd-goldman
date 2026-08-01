"use client";

import { useLayoutEffect, useRef, useState, type CSSProperties, type ReactNode } from "react";

export interface HeightLockProps {
  children: ReactNode;
  /** Optional CSS transition for height changes (e.g. FAQ accordion resize). */
  transition?: string;
}

/** Locks parent height to measured child height to prevent accordion layout jump. */
export function HeightLock({ children, transition }: HeightLockProps) {
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

  const shellStyle: CSSProperties = {
    width: "100%",
    height: height !== undefined ? `${height}px` : "auto",
    overflow: "visible",
    ...(transition ? { transition: `height ${transition}` } : {}),
  };

  return (
    <div style={shellStyle}>
      <div ref={innerRef} style={{ width: "100%" }}>
        {children}
      </div>
    </div>
  );
}
