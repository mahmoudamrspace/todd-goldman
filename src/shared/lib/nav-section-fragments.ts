/** Parses a same-page section fragment from an internal nav href. */
export function fragmentFromNavHref(href: string, pathname: string): string | null {
  if (href.startsWith("http") || href.startsWith("mailto:")) {
    return null;
  }

  if (!href.includes("#")) {
    return null;
  }

  const [path = "/", fragment] = href.split("#");
  if (pathname !== path || !fragment) {
    return null;
  }

  return fragment;
}

export function navFragmentsFromHrefs(hrefs: string[], pathname: string): string[] {
  const fragments: string[] = [];

  for (const href of hrefs) {
    const fragment = fragmentFromNavHref(href, pathname);
    if (fragment && !fragments.includes(fragment)) {
      fragments.push(fragment);
    }
  }

  return fragments;
}
