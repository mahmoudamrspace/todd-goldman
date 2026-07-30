"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const SPRING = { stiffness: 500, damping: 40, mass: 0.5 };

/** Custom cursor with spring follow and "View" label on work cards. */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const coarsePointer = useSyncExternalStore(
    (onStoreChange) => {
      const mq = window.matchMedia("(pointer: coarse)");
      mq.addEventListener("change", onStoreChange);
      return () => mq.removeEventListener("change", onStoreChange);
    },
    () => window.matchMedia("(pointer: coarse)").matches,
    () => false,
  );
  const enabled = !reduced && !coarsePointer;
  const [showView, setShowView] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const onMove = useCallback(
    (event: MouseEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      const target = event.target as HTMLElement | null;
      setShowView(Boolean(target?.closest?.("[data-highlight]")));
    },
    [rawX, rawY],
  );

  useEffect(() => {
    if (!enabled) return;

    const root = window.document.documentElement;
    root.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", onMove, { passive: true });

    return () => {
      root.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
    };
  }, [enabled, onMove]);

  if (!enabled) return null;

  return (
    <motion.div
      aria-hidden
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x,
        y,
        zIndex: 13,
        pointerEvents: "none",
        translateX: "-50%",
        translateY: "-50%",
      }}
    >
      <div
        style={{
          width: 12,
          height: 12,
          borderRadius: "50%",
          backgroundColor: "rgb(15, 15, 15)",
        }}
      />
      {showView ? (
        <span
          style={{
            position: "absolute",
            top: 16,
            left: "50%",
            transform: "translateX(-50%)",
            fontSize: 12,
            fontWeight: 500,
            letterSpacing: "-0.02em",
            whiteSpace: "nowrap",
            color: "rgb(15, 15, 15)",
          }}
        >
          View
        </span>
      ) : null}
    </motion.div>
  );
}
