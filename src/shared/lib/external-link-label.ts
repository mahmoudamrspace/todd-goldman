/** True for off-site http(s) links that open in a new browsing context. */
export function isExternalHttpHref(href: string): boolean {
  return /^https?:\/\//i.test(href);
}

/** Accessible name suffix matching Books section copy. */
export function externalLinkAriaLabel(label: string): string {
  return `${label} (opens in a new tab)`;
}
