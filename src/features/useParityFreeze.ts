"use client";

import { useLayoutEffect, useState, type RefObject } from "react";

export type ParityFreezeState = {
  transform: string;
  opacity: string;
};

/** Reads verify-route capture freeze markers on a node. */
export function useParityFreeze(ref: RefObject<HTMLElement | null>): ParityFreezeState | null {
  const [frozen, setFrozen] = useState<ParityFreezeState | null>(null);

  useLayoutEffect(() => {
    const node = ref.current;
    if (!node) return;

    const sync = () => {
      const transform = node.dataset.parityFreezeTransform;
      if (!transform) {
        setFrozen(null);
        return;
      }
      setFrozen({
        transform,
        opacity: node.dataset.parityFreezeOpacity ?? "1",
      });
    };

    sync();
    const observer = new MutationObserver(sync);
    observer.observe(node, {
      attributes: true,
      attributeFilter: ["data-parity-freeze-transform", "data-parity-freeze-opacity"],
    });

    return () => observer.disconnect();
  }, [ref]);

  return frozen;
}
