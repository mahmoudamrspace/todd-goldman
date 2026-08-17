/** Stable identity color keys for primary nav destinations. */
export type NavIdentityKey =
  | "art"
  | "books"
  | "services"
  | "about"
  | "shop"
  | "contact"
  | "default";

export function navIdentityKey(label: string): NavIdentityKey {
  switch (label.trim().toLowerCase()) {
    case "art":
      return "art";
    case "books":
      return "books";
    case "services":
      return "services";
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
