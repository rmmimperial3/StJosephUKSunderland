import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">
      <p className="text-xs tracking-[0.2em] text-wine-soft uppercase">404</p>
      <h1 className="mt-3 font-serif text-4xl">This page could not be found</h1>
      <p className="mt-4 max-w-prose text-ink-muted">
        The address may have changed. Mass times, directions, and contact
        details are still on the main pages.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block font-semibold text-wine underline underline-offset-4"
      >
        Return to the homepage
      </Link>
    </div>
  );
}
