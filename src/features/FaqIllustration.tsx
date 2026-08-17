"use client";

/** Inline FAQ scene so SVG-internal bee + flag animations can run. */
export function FaqIllustration({ src }: { src: string }) {
  return (
    <object
      className="todd-faq-illustration"
      data={src}
      type="image/svg+xml"
      aria-hidden={true}
    />
  );
}
