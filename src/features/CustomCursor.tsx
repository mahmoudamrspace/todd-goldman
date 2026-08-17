"use client";

import { motion, useMotionValue, useReducedMotion, useSpring } from "motion/react";
import { useCallback, useEffect, useState } from "react";
import { cn } from "@/shared/lib/cn";
import { useMediaQuery } from "@/shared/lib/use-media-query";

const SPRING = { stiffness: 680, damping: 44, mass: 0.38 };

const NATIVE_CURSOR_SELECTOR =
  'input, textarea, select, [contenteditable="true"], [data-native-cursor], :focus-visible';
const INTERACTIVE_CURSOR_SELECTOR =
  'a[href], button, summary, [role="button"], [role="link"], [data-cursor-interactive]';
const EDGE_GUTTER_X = 96;
const EDGE_GUTTER_Y = 84;

function isNativeCursorTarget(target: EventTarget | null): boolean {
  if (!(target instanceof Element)) return false;
  return Boolean(target.closest(NATIVE_CURSOR_SELECTOR));
}

function cursorLabelFor(target: HTMLElement): string {
  const explicitLabel = target.dataset.cursorLabel?.trim();
  if (explicitLabel) return explicitLabel;

  const link = target.closest("a[href]") as HTMLAnchorElement | null;
  const href = link?.getAttribute("href") ?? "";
  if (href.startsWith("mailto:")) return "Email";
  if (link?.target === "_blank" || /^https?:/i.test(href)) return "Visit";
  if (target.closest("nav")) return "Open";
  if (target.closest("button, [role=\"button\"]")) return "Open";
  return "View";
}

function PixelMiddleFinger() {
  return (
    <svg
      width="28"
      height="41"
      viewBox="0 0 42 62"
      aria-hidden="true"
      shapeRendering="crispEdges"
      className="custom-cursor__finger"
    >
      <path
        d="M15 2H24V27H27V20H33V27H37V42H33V49H29V54H11V51H7V47H4V42H2V30H9V37H13V27H15Z"
        fill="var(--color-todd-paper, #fcd3ac)"
        stroke="var(--color-ink, #0f0f0f)"
        strokeWidth="4"
        strokeLinejoin="miter"
      />
      <path d="M18 5H21V13H18Z" fill="var(--surface-canvas, #f7f4ed)" />
      <path d="M5 33H9V39H5Z" fill="var(--color-todd-red, #ff5324)" />
      <path d="M29 23H32V30H29Z" fill="var(--color-todd-yellow, #f0cd3e)" />
      <path d="M9 39H14V42H9ZM27 34H33V37H27Z" fill="#e9b986" />
      <path d="M13 38H16V41H13ZM24 38H27V41H24Z" fill="var(--color-ink, #0f0f0f)" />
      <path d="M16 45H24V48H16Z" fill="var(--color-todd-red, #ff5324)" />
      <path d="M19 45H24V46H19Z" fill="var(--color-ink, #0f0f0f)" />
      <path
        d="M9 52H31V61H9Z"
        fill="var(--color-todd-blue, #2978f3)"
        stroke="var(--color-ink, #0f0f0f)"
        strokeWidth="4"
      />
      <path d="M12 54H28V57H12Z" fill="var(--color-todd-yellow, #f0cd3e)" />
      <path d="M12 58H16V61H12ZM24 58H28V61H24Z" fill="var(--color-todd-red, #ff5324)" />
    </svg>
  );
}

/** Todd-style pixel cursor — global on fine pointers; labels on [data-highlight] targets. */
export function CustomCursor() {
  const reduced = useReducedMotion();
  const coarsePointer = useMediaQuery("(pointer: coarse)");
  const forcedColors = useMediaQuery("(forced-colors: active)");
  const enabled = !reduced && !coarsePointer && !forcedColors;
  const [visible, setVisible] = useState(false);
  const [highlighted, setHighlighted] = useState(false);
  const [interactive, setInteractive] = useState(false);
  const [nativeEscape, setNativeEscape] = useState(false);
  const [pressed, setPressed] = useState(false);
  const [flipX, setFlipX] = useState(false);
  const [flipY, setFlipY] = useState(false);
  const [label, setLabel] = useState("View");

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const x = useSpring(rawX, SPRING);
  const y = useSpring(rawY, SPRING);

  const syncPointerState = useCallback((target: EventTarget | null) => {
    const escapeNative = isNativeCursorTarget(target);
    const highlightTarget =
      target instanceof Element
        ? (target.closest("[data-highlight]") as HTMLElement | null)
        : null;
    const interactiveTarget =
      target instanceof Element
        ? target.closest(INTERACTIVE_CURSOR_SELECTOR)
        : null;

    setNativeEscape(escapeNative);
    setHighlighted(!escapeNative && Boolean(highlightTarget));
    setInteractive(!escapeNative && Boolean(interactiveTarget));
    if (highlightTarget) setLabel(cursorLabelFor(highlightTarget));
  }, []);

  const onMove = useCallback(
    (event: MouseEvent) => {
      rawX.set(event.clientX);
      rawY.set(event.clientY);
      setVisible(true);
      setFlipX(event.clientX > window.innerWidth - EDGE_GUTTER_X);
      setFlipY(event.clientY > window.innerHeight - EDGE_GUTTER_Y);
      syncPointerState(event.target);
    },
    [rawX, rawY, syncPointerState],
  );

  useEffect(() => {
    if (!enabled) return;

    const root = window.document.documentElement;
    const onDown = () => setPressed(true);
    const onUp = () => setPressed(false);
    const onLeave = () => {
      setVisible(false);
      setHighlighted(false);
      setInteractive(false);
      setNativeEscape(false);
      setPressed(false);
    };

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

  const cursorActive = visible && !nativeEscape;

  useEffect(() => {
    if (!enabled) return;
    const root = window.document.documentElement;
    if (cursorActive) {
      root.classList.add("custom-cursor-active");
    } else {
      root.classList.remove("custom-cursor-active");
    }
    return () => root.classList.remove("custom-cursor-active");
  }, [cursorActive, enabled]);

  if (!enabled || !cursorActive) return null;

  return (
    <motion.div
      aria-hidden
      className={cn(
        "custom-cursor",
        interactive && "custom-cursor--interactive",
        highlighted && "custom-cursor--highlighted",
        flipX && "custom-cursor--flip-x",
        flipY && "custom-cursor--flip-y",
      )}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        x,
        y,
        zIndex: 10001,
        pointerEvents: "none",
        translateX: "-50%",
        translateY: "-4%",
      }}
      animate={{
        opacity: 1,
        scale: pressed ? 0.88 : highlighted ? 1.12 : interactive ? 1.05 : 1,
        rotate: pressed ? -4 : highlighted ? 5 : interactive ? -2 : 0,
      }}
      transition={{ type: "spring", stiffness: 460, damping: 30 }}
    >
      <PixelMiddleFinger />
      {highlighted ? <span className="custom-cursor__label">{label}</span> : null}
    </motion.div>
  );
}
