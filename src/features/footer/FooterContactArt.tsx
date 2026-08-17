import { ContactIllustration } from "@/features/ContactIllustration";
import { HiddenReveal } from "@/features/HiddenReveal";
import type { SceneLayer } from "@/content/todd-scenes";

export function FooterContactArt({ layers }: { layers: SceneLayer[] }) {
  return (
    <HiddenReveal
      variant="section-artwork"
      className="todd-contact-art"
      style={{ opacity: "0", transform: "translateY(32px) scale(0.98)" }}
    >
      <ContactIllustration layers={layers} />
    </HiddenReveal>
  );
}
