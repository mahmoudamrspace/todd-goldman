import { HiddenReveal } from "@/features/HiddenReveal";

export function ContactEmailLink({ email }: { email: string }) {
  return (
    <a
      className="todd-contact-email"
      data-native-cursor={true}
      href={`mailto:${email}`}
      aria-label={`Email Todd at ${email}`}
    >
      <span className="todd-contact-email__copy">
        <span className="todd-contact-email__label">Drop Todd a line</span>
        <span className="todd-contact-email__address">{email}</span>
      </span>
      <span className="todd-contact-email__arrow" aria-hidden={true}>
        ↗
      </span>
    </a>
  );
}

export function ContactEmailReveal({ email }: { email: string }) {
  return (
    <HiddenReveal
      variant="section-cta"
      className="todd-intro__wrapper-38"
      style={{ willChange: "transform", opacity: "0", transform: "translateY(24px)" }}
    >
      <ContactEmailLink email={email} />
    </HiddenReveal>
  );
}
