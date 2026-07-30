"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react";

interface NavMenuContextValue {
  open: boolean;
  toggle: () => void;
  setOpen: (open: boolean) => void;
}

const NavMenuContext = createContext<NavMenuContextValue | null>(null);

export function NavMenuProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const toggle = useCallback(() => setOpen((v) => !v), []);

  const value = useMemo(
    () => ({ open, toggle, setOpen }),
    [open, toggle],
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
      toggle: () => {},
      setOpen: () => {},
    };
  }
  return ctx;
}
