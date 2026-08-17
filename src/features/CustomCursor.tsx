"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback, useEffect, useState, useSyncExternalStore } from "react";

const SPRING = { stiffness: 680, damping: 44, mass: 0.38 };

function PixelMiddleFinger() {
  return (
    <svg
      width="28"
      height="41"
      viewBox="0 0 42 62"
      aria-hidden="true"
      shapeRendering="crispEdges"
      style={{
        display: "block",
        imageRendering: "pixelated",
        filter: "drop-shadow(2px 2px 0 rgb(15 15 15))",
      }}
    >
      <path
        d="M15 2H24V27H27V20H33V27H37V42H33V49H29V54H11V51H7V47H4V42H2V30H9V37H13V27H15Z"
        fill="#fcd3ac"
        stroke="#0f0f0f"
        strokeWidth="4"
        strokeLinejoin="miter"
      />
      <path d="M18 5H21V13H18Z" fill="#f7f4ed" />
      <path d="M5 33H9V39H5Z" fill="#ff5324" />
      <path d="M29 23H32V30H29Z" fill="#f0cd3e" />
      <path d="M9 39H14V42H9ZM27 34H33V37H27Z" fill="#e9b986" />
      <path d="M13 38H16V41H13ZM24 38H27V41H24Z" fill="#0f0f0f" />
      <path d="M16 45H24V48H16Z" fill="#ff5324" />
      <path d="M19 45H24V46H19Z" fill="#0f0f0f" />
      <path
        d="M9 52H31V61H9Z"
        fill="#2978f3"
        stroke="#0f0f0f"
        strokeWidth="4"
      />
      <path d="M12 54H28V57H12Z" fill="#f0cd3e" />
      <path d="M12 58H16V61H12ZM24 58H28V61H24Z" fill="#ff5324" />
    </svg>
  );
}

/** Todd-style pixel cursor with spring follow and "View" label on work cards. */
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
  const [visible, setVisible] = useState(false);
  const [pressed, setPressed] = useState(false);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const onMove = useCallback(
    (event: MouseEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setVisible(true);
      const target = event.target as HTMLElement | null;
      setShowView(Boolean(target?.closest?.("[data-highlight]")));
    },
    [rawX, rawY],
  );

  useEffect(() => {
    if (!enabled) return;

    const root = window.document.documentElement;
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      setVisible(false);
      setPressed(false);
    };
    root.classList.add("custom-cursor-active");
    window.addEventListener("mousemove", onMove, { passive: true });
    window.addEventListener("mousedown", onDown);
    window.addEventListener("mouseup", onUp);
    window.document.documentElement.addEventListener("mouseleave", onLeave);

    return () => {
      root.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mousedown", onDown);
      window.removeEventListener("mouseup", onUp);
      window.document.documentElement.removeEventListener("mouseleave", onLeave);
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
        translateY: "-4%",
      }}
      animate={{
        opacity: visible ? 1 : 0,
        scale: pressed ? 0.88 : showView ? 1.12 : 1,
        rotate: pressed ? -4 : showView ? 5 : 0,
      }}
      transition={{ type: "spring", stiffness: 460, damping: 30 }}
    >
      <PixelMiddleFinger />
      {showView ? (
        <span
          style={{
            position: "absolute",
            top: 43,
            left: "50%",
            transform: "translateX(-50%)",
            padding: "3px 7px",
            border: "2px solid rgb(15, 15, 15)",
            borderRadius: 0,
            background: "rgb(247, 244, 237)",
            boxShadow: "3px 3px 0 rgb(240, 205, 62)",
            fontSize: 9,
            fontFamily: "monospace",
            fontWeight: 700,
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
