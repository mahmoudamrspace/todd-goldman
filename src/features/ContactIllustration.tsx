"use client";

import { IllustratedScene } from "@/features/IllustratedScene";
import type { SceneLayer } from "@/content/todd-scenes";

/** Todd "Have a project in mind?" layered illustration. */
export function ContactIllustration({ layers }: { layers: SceneLayer[] }) {
  return (
    <div className="todd-contact-scene" aria-hidden={true}>
      <IllustratedScene
        layers={layers}
        scatter={false}
        aspectRatio="1213.99 / 1409.36"
      />
    </div>
  );
}
