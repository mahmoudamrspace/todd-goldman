import { Fragment } from "react";
import { AnimatedSpan } from "@/features/HiddenReveal";

const BODY_BOLD_STYLE = {
  "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
  "--todd-font-weight": "700",
  "--todd-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
} as const;

const CLIENT_BOLD_STYLE = {
  "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
  "--todd-font-weight": "700",
  "--todd-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
} as const;

const SEPARATOR_STYLE = {
  "--todd-text-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))",
} as const;

const BOLD_CLIENT_NAMES = new Set([
  "Books & publishing",
  "David & Goliath apparel",
  "Gallery exhibitions",
  "Brand collaborations",
]);

/** About bio from site content seed. */
export function AboutBodyRichText({ body }: { body: string }) {
  const sentences = body.split(/(?<=[.!?])\s+/).filter(Boolean);
  const lead = sentences[0] ?? body;
  const rest = sentences.slice(1).join(" ");

  return (
    <>
      <span className={"todd-text"} style={BODY_BOLD_STYLE}>
        {"         "}
        {lead}
      </span>
      {rest ? <> {" "}{rest}</> : null}
    </>
  );
}

/** About-me h3 — uses heading from content when provided. */
export function AboutMeHeading({ heading = "About me" }: { heading?: string }) {
  const words = heading.trim().split(/\s+/).filter(Boolean);
  const lead = words.slice(0, -1).join(" ") || words[0] || "About";
  const tail = words.length > 1 ? words[words.length - 1] : "me";

  return (
    <>
      {lead}
      <span
        className={"todd-text"}
        style={{
          "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==",
          "--todd-font-family": '"Averia Serif Libre", sans-serif',
          "--todd-font-style": "italic",
        }}
      >
        {" "}
      </span>
      <span
        className={"todd-text"}
        style={{
          "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==",
          "--todd-font-family": '"Averia Serif Libre", sans-serif',
          "--todd-font-style": "italic",
          "--todd-font-weight": "400",
        }}
      >
        {tail}
      </span>
    </>
  );
}

/** Two-level editorial heading for the Twisted Mind section. */
export function AboutMainTitle({ title }: { title: string }) {
  const words = title.split(/\s+/).filter(Boolean);
  const primary = words.slice(0, 3).join(" ");
  const accent = words.slice(3).join(" ");

  return (
    <>
      <span className="todd-about-heading__primary">{primary || title}</span>
      {accent ? <span className="todd-about-heading__accent">{accent}</span> : null}
    </>
  );
}

/** Handwritten name under the about-me card. */
export function AboutHandwrittenName({ name }: { name: string }) {
  return (
    <>
      {name.split(/\s+/).filter(Boolean).map((word, index, words) => (
        <AnimatedSpan key={`about-name-${word}-${index}`} y={10}>
          {word}
          {index < words.length - 1 ? " " : ""}
        </AnimatedSpan>
      ))}
    </>
  );
}

/** Client list with bold `todd-text` on highlighted names. */
export function AboutClientsList({ clients }: { clients: string[] }) {
  return (
    <>
      {clients.map((client, index) => (
        <Fragment key={`${client}-${index}`}>
          {index > 0 ? (
            index === 1 ? (
              ", "
            ) : (
              <>
                {" "}
                <span className={"todd-text"} style={SEPARATOR_STYLE}>
                  /
                </span>{" "}
              </>
            )
          ) : null}
          {BOLD_CLIENT_NAMES.has(client) ? (
            <span className={"todd-text"} style={CLIENT_BOLD_STYLE}>
              {client}
            </span>
          ) : (
            client
          )}
        </Fragment>
      ))}
    </>
  );
}
