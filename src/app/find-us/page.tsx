import type { Metadata } from "next";
import {
  formatAddressLines,
  googleDirectionsUrl,
  googleMapsUrl,
  openStreetMapEmbedUrl,
  openStreetMapUrl,
  parish,
} from "@/content/parish";
import { PageHero } from "@/components/PageHero";
import { PlaceholderCallout } from "@/components/PlaceholderCallout";

export const metadata: Metadata = {
  title: "How to find us",
};

export default function FindUsPage() {
  return (
    <>
      <PageHero eyebrow="Visit" title="How to find us">
        The church stands on Paxton Terrace in Millfield, west of Sunderland
        city centre, a short walk from Hylton Road and from St Joseph&apos;s
        Catholic Primary School.
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
          <div>
            <h2 className="font-serif text-3xl">Address</h2>
            <address className="mt-4 not-italic text-lg leading-8">
              {formatAddressLines().map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <p className="mt-4 max-w-md text-sm text-ink-muted">
              {parish.address.note}
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              <a
                className="inline-flex items-center justify-center rounded-sm bg-wine px-4 py-3 text-center font-semibold text-parchment"
                href={googleDirectionsUrl()}
              >
                Directions (Google)
              </a>
              <a
                className="inline-flex items-center justify-center rounded-sm border border-wine/30 px-4 py-3 text-center text-wine"
                href={openStreetMapUrl()}
              >
                OpenStreetMap
              </a>
            </div>
            <p className="mt-4 text-sm">
              <a className="underline underline-offset-2" href={googleMapsUrl()}>
                Open the map pin
              </a>
            </p>
          </div>

          <figure className="overflow-hidden border border-gold/30 bg-parchment-card shadow-card">
            <iframe
              title="Map showing St Joseph's RC Church, Paxton Terrace, Millfield"
              src={openStreetMapEmbedUrl()}
              className="h-80 w-full border-0 lg:h-full min-h-[20rem]"
              loading="lazy"
            />
            <figcaption className="border-t border-gold/20 px-4 py-3 text-xs text-ink-muted">
              Map data © OpenStreetMap contributors. Pin placed at the church
              building on Paxton Terrace.
            </figcaption>
          </figure>
        </div>

        <section className="mt-12 grid gap-6 md:grid-cols-2">
          <div className="prose-parish">
            <h2 className="mb-4 font-serif text-3xl text-ink">On foot and by road</h2>
            <p>
              Paxton Terrace is in Millfield, in the west of Sunderland. The
              church is mapped on OpenStreetMap as {parish.map.osmName}. St
              Joseph&apos;s Catholic Primary School is on Rutland Street, beside
              the church.
            </p>
            <p>
              If you are coming by public transport or need parking advice,
              please use the note opposite until the parish adds local
              directions.
            </p>
          </div>
          <PlaceholderCallout>
            <p>
              Add bus routes that stop nearby, whether there is parish parking,
              and any note about step-free access or the nearest drop-off point.
              Do not invent route numbers.
            </p>
          </PlaceholderCallout>
        </section>
      </div>
    </>
  );
}
