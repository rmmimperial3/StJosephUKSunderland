import Link from "next/link";
import { formatAddressLines, parish } from "@/content/parish";
import { getLiveContent } from "@/lib/content-store";

export async function SiteFooter() {
  const live = await getLiveContent();

  return (
    <footer className="mt-auto border-t border-gold/20 bg-wine-deep text-parchment">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-3">
        <div>
          <p className="font-serif text-2xl">St Joseph&apos;s</p>
          <p className="mt-2 text-sm text-parchment/80">
            {parish.denomination} parish in {parish.locality}, in the{" "}
            {parish.diocese}.
          </p>
        </div>
        <div>
          <h2 className="text-xs tracking-[0.16em] text-gold-light uppercase">
            Address
          </h2>
          <address className="mt-3 not-italic text-sm leading-6 text-parchment/85">
            {formatAddressLines().map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </address>
        </div>
        <div>
          <h2 className="text-xs tracking-[0.16em] text-gold-light uppercase">
            Contact
          </h2>
          <p className="mt-3 text-sm leading-6">
            <a className="underline decoration-gold/60 underline-offset-4" href={live.phoneHref}>
              {live.phone}
            </a>
            <br />
            <a
              className="underline decoration-gold/60 underline-offset-4"
              href={`mailto:${live.email}`}
            >
              {live.email}
            </a>
          </p>
          <p className="mt-4 text-sm">
            <a
              className="text-gold-light underline underline-offset-4"
              href={parish.dioceseUrl}
            >
              Diocesan parish listing
            </a>
          </p>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-6xl flex-col gap-2 px-4 py-4 text-xs text-parchment/65 sm:flex-row sm:justify-between sm:px-6">
          <p>
            {parish.partnership}. Clustered with {parish.cluster.join("; ")}.
          </p>
          <p className="flex gap-4">
            <Link href="/contact" className="underline underline-offset-2">
              Parish contact
            </Link>
            <Link href="/admin" className="text-parchment/45 hover:text-parchment/70">
              Parish login
            </Link>
          </p>
        </div>
      </div>
    </footer>
  );
}
