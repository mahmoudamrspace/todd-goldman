"use client";

import { LENIS_SCROLL_EVENT, NAV_HASH_SYNC_EVENT } from "@/shared/lib/scroll-events";
import {
  createContext,
  useContext,
  useMemo,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const HEADER_OFFSET = 80;

type ActiveSectionContextValue = {
  activeFragment: string | null;
};

const ActiveSectionContext = createContext<ActiveSectionContextValue>({
  activeFragment: null,
});

function fragmentFromLocationHash(): string | null {
  const hash = window.location.hash;
  if (!hash || hash === "#") {
    return null;
  }

  return decodeURIComponent(hash.slice(1));
}

function resolveSectionElement(fragment: string): HTMLElement | null {
  const byId = document.getElementById(fragment);
  if (byId) {
    return byId;
  }

  const byName = document.querySelector(`[data-todd-name="${fragment}"]`);
  return byName instanceof HTMLElement ? byName : null;
}

function resolveActiveFromScroll(fragments: string[]): string | null {
  const sections = fragments
    .map((fragment) => {
      const element = resolveSectionElement(fragment);
      if (!element) {
        return null;
      }

      return {
        fragment,
        top: element.getBoundingClientRect().top + window.scrollY,
      };
    })
    .filter((section): section is { fragment: string; top: number } => section !== null)
    .sort((left, right) => left.top - right.top);

  if (sections.length === 0) {
    return null;
  }

  const scrollLine = window.scrollY + HEADER_OFFSET + 1;
  let active: string | null = null;

  for (const section of sections) {
    if (section.top <= scrollLine) {
      active = section.fragment;
    }
  }

  return active;
}

function createActiveSectionStore(fragments: string[]) {
  let preferHash = true;
  let frameId = 0;
  const listeners = new Set<() => void>();

  const emit = () => {
    for (const listener of listeners) {
      listener();
    }
  };

  const getSnapshot = (): string | null => {
    if (fragments.length === 0) {
      return null;
    }

    const hashFragment = fragmentFromLocationHash();
    if (
      preferHash &&
      hashFragment &&
      fragments.includes(hashFragment)
    ) {
      return hashFragment;
    }

    const scrollActive = resolveActiveFromScroll(fragments);
    if (scrollActive) {
      return scrollActive;
    }

    if (hashFragment && fragments.includes(hashFragment)) {
      return hashFragment;
    }

    return null;
  };

  const syncFromHash = () => {
    preferHash = true;
    emit();
  };

  const syncFromScroll = () => {
    preferHash = false;
    if (frameId !== 0) {
      return;
    }

    frameId = window.requestAnimationFrame(() => {
      frameId = 0;
      emit();
    });
  };

  const subscribe = (onStoreChange: () => void) => {
    listeners.add(onStoreChange);
    window.addEventListener("hashchange", syncFromHash);
    window.addEventListener("popstate", syncFromHash);
    window.addEventListener(NAV_HASH_SYNC_EVENT, syncFromHash);
    window.addEventListener("scroll", syncFromScroll, { passive: true });
    window.addEventListener(LENIS_SCROLL_EVENT, syncFromScroll);

    return () => {
      listeners.delete(onStoreChange);
      if (frameId !== 0) {
        window.cancelAnimationFrame(frameId);
      }
      window.removeEventListener("hashchange", syncFromHash);
      window.removeEventListener("popstate", syncFromHash);
      window.removeEventListener(NAV_HASH_SYNC_EVENT, syncFromHash);
      window.removeEventListener("scroll", syncFromScroll);
      window.removeEventListener(LENIS_SCROLL_EVENT, syncFromScroll);
    };
  };

  return { subscribe, getSnapshot };
}

/** Tracks the active homepage section for desktop and overlay navigation. */
export function ActiveSectionProvider({
  fragments,
  children,
}: {
  fragments: string[];
  children: ReactNode;
}) {
  const store = useMemo(
    () => createActiveSectionStore(fragments),
    [fragments],
  );
  const activeFragment = useSyncExternalStore(
    store.subscribe,
    store.getSnapshot,
    () => null,
  );

  return (
    <ActiveSectionContext.Provider value={{ activeFragment }}>
      {children}
    </ActiveSectionContext.Provider>
  );
}

export function useActiveSectionFragment(): string | null {
  return useContext(ActiveSectionContext).activeFragment;
}
