/** Builds a public asset URL with query params (legacy export image CDN style). */
export function assetWithQuery(path: string, query: string): string {
  const normalized = query.startsWith("?") ? query.slice(1) : query;
  return `${path}?${normalized}`;
}
