import { Fragment } from "react";
import { AnimatedSpan } from "@/features/HiddenReveal";

const BODY_BOLD_STYLE = {
  "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
  "--framer-font-weight": "700",
  "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
} as const;

const CLIENT_BOLD_STYLE = {
  "--font-selector": "RlI7SW50ZXJEaXNwbGF5LUJvbGQ=",
  "--framer-font-weight": "700",
  "--framer-text-color": "var(--token-7feae51d-d17a-4590-a9ca-40881e3e0ba2, rgb(15, 15, 15))",
} as const;

const SEPARATOR_STYLE = {
  "--framer-text-color": "var(--token-ae5d2ed2-395e-4ac7-9825-f57ad4d7ddc7, rgb(240, 205, 62))",
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
      <span className={"framer-text"} style={BODY_BOLD_STYLE}>
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
        className={"framer-text"}
        style={{
          "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLTcwMGl0YWxpYw==",
          "--framer-font-family": '"Averia Serif Libre", sans-serif',
          "--framer-font-style": "italic",
        }}
      >
        {" "}
      </span>
      <span
        className={"framer-text"}
        style={{
          "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==",
          "--framer-font-family": '"Averia Serif Libre", sans-serif',
          "--framer-font-style": "italic",
          "--framer-font-weight": "400",
        }}
      >
        {tail}
      </span>
    </>
  );
}

/** About title h2 — “The person” in a styled `framer-text` wrapper. */
export function AboutMainTitle({ title }: { title: string }) {
  const words = title.split(/\s+/).filter(Boolean);
  const lead = words.slice(0, 2);
  const rest = words.slice(2);
  return (
    <>
      <span
        className={"framer-text"}
        style={{
          "--font-selector": "R0Y7QXZlcmlhIFNlcmlmIExpYnJlLWl0YWxpYw==",
          "--framer-font-family": '"Averia Serif Libre", sans-serif',
          "--framer-font-style": "italic",
          "--framer-font-weight": "400",
        }}
      >
        <AnimatedSpan y={10}>{lead[0] ?? ""}</AnimatedSpan>{" "}
        <AnimatedSpan y={10}>{lead[1] ?? ""}</AnimatedSpan>
      </span>{" "}
      {rest.map((word, index) => (
        <AnimatedSpan key={`about-title-${word}-${index}`} y={10}>
          {word}
          {index < rest.length - 1 ? " " : ""}
        </AnimatedSpan>
      ))}
    </>
  );
}

/** Client list with bold `framer-text` on highlighted names. */
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
                <span className={"framer-text"} style={SEPARATOR_STYLE}>
                  /
                </span>{" "}
              </>
            )
          ) : null}
          {BOLD_CLIENT_NAMES.has(client) ? (
            <span className={"framer-text"} style={CLIENT_BOLD_STYLE}>
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
