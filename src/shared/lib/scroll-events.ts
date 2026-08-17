/** Dispatched on each Lenis scroll frame for scroll-synced UI. */
export const LENIS_SCROLL_EVENT = "lenis-scroll";

/** Dispatched after programmatic hash updates that skip `hashchange`. */
export const NAV_HASH_SYNC_EVENT = "todd-nav-hash-sync";

export function dispatchNavHashSync() {
  window.dispatchEvent(new Event(NAV_HASH_SYNC_EVENT));
}
