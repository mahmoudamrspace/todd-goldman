/** Stable identity color keys for primary nav destinations. */
export type NavIdentityKey = "art" | "about" | "shop" | "contact" | "default";

export function navIdentityKey(label: string): NavIdentityKey {
  switch (label.trim().toLowerCase()) {
    case "art":
      return "art";
    case "about":
      return "about";
    case "shop":
      return "shop";
    case "contact":
      return "contact";
    default:
      return "default";
  }
}
