"use client";

import { navMenuExitDuration } from "@/shared/lib/motion";
import { useReducedMotion } from "motion/react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";

interface NavMenuContextValue {
  open: boolean;
  closing: boolean;
  present: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

const NavMenuContext = createContext<NavMenuContextValue | null>(null);

export function NavMenuProvider({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();
  const [open, setOpenState] = useState(false);
  const [present, setPresent] = useState(false);
  const presentRef = useRef(false);
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    presentRef.current = present;
  }, [present]);

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const setOpen = useCallback(
    (next: boolean) => {
      clearCloseTimer();

      if (next) {
        setPresent(true);
        setOpenState(true);
        return;
      }

      setOpenState(false);

      if (!presentRef.current) {
        setPresent(false);
        return;
      }

      const delay = reduced ? 0 : navMenuExitDuration;
      closeTimerRef.current = setTimeout(() => {
        setPresent(false);
        closeTimerRef.current = null;
      }, delay);
    },
    [clearCloseTimer, reduced],
  );

  const toggle = useCallback(() => {
    setOpen(!open);
  }, [open, setOpen]);

  useEffect(() => {
    return () => clearCloseTimer();
  }, [clearCloseTimer]);

  useEffect(() => {
    if (!present) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [present, setOpen]);

  const closing = present && !open;

  const value = useMemo(
    () => ({ open, closing, present, toggle, setOpen }),
    [open, closing, present, toggle, setOpen],
  );

  return (
    <NavMenuContext.Provider value={value}>{children}</NavMenuContext.Provider>
  );
}

export function useNavMenu(): NavMenuContextValue {
  const ctx = useContext(NavMenuContext);
  if (!ctx) {
    return {
      open: false,
      closing: false,
      present: false,
      toggle: () => {},
      setOpen: () => {},
    };
  }
  return ctx;
}
