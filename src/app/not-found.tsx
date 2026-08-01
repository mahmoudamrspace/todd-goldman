import Link from "next/link";

export default function NotFound() {
  return (
    <main className="todd-not-found">
      <div className="todd-not-found__inner">
        <h1 className="todd-not-found__title">Page not found</h1>
        <p className="todd-not-found__body">
          That piece isn&apos;t on the wall. Head back to browse the portfolio.
        </p>
        <div className="todd-not-found__actions">
          <Link className="todd-not-found__link" href="/">
            Back home
          </Link>
          <Link className="todd-not-found__link todd-not-found__link--secondary" href="/#works">
            View the art
          </Link>
        </div>
      </div>
    </main>
  );
}
