import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PlaceholderCallout } from "@/components/PlaceholderCallout";
import { formatAddressLines, parish } from "@/content/parish";
import { getLiveContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Contact",
};

export default async function ContactPage() {
  const live = await getLiveContent();

  return (
    <>
      <PageHero eyebrow="Get in touch" title="Contact the parish">
        Telephone or email are the published ways to reach the parish cluster.
        There is no booking or public membership login — write to us, or speak
        to someone after Mass.
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-6 md:grid-cols-2">
          <section className="border border-gold/30 bg-parchment-card p-6 shadow-card">
            <h2 className="font-serif text-2xl text-wine">Telephone</h2>
            <p className="mt-3 text-2xl">
              <a href={live.phoneHref}>{live.phone}</a>
            </p>
            <p className="mt-3 text-sm text-ink-muted">
              Published on the diocesan listing for St Joseph&apos;s, unless
              the parish has updated it.
            </p>
          </section>
          <section className="border border-gold/30 bg-parchment-card p-6 shadow-card">
            <h2 className="font-serif text-2xl text-wine">Email</h2>
            <p className="mt-3 break-words text-lg">
              <a href={`mailto:${live.email}`}>{live.email}</a>
            </p>
            <p className="mt-3 text-sm text-ink-muted">{parish.emailNote}</p>
          </section>
        </div>

        <section className="mt-8 grid gap-8 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl">Write to us</h2>
            <address className="mt-4 not-italic leading-7">
              {formatAddressLines().map((line) => (
                <span key={line} className="block">
                  {line}
                </span>
              ))}
            </address>
            <h3 className="mt-8 font-serif text-2xl">Clergy</h3>
            <ul className="mt-3 space-y-1">
              {parish.clergy.map((person) => (
                <li key={person.name}>{person.name}</li>
              ))}
            </ul>
            <p className="mt-3 text-sm text-ink-muted">{parish.clergyNote}</p>
          </div>

          <div className="space-y-5">
            <PlaceholderCallout>
              <p>
                Add parish office hours, the name to ask for, and whether
                voicemail is checked daily. Add a dedicated parish email if this
                cluster address should not be the public contact.
              </p>
            </PlaceholderCallout>
            <form
              className="border border-gold/30 bg-parchment-card p-6"
              action={`mailto:${live.email}`}
              method="get"
            >
              <h2 className="font-serif text-2xl text-wine">Send a message</h2>
              <p className="mt-2 text-sm text-ink-muted">
                This opens your own email app. Nothing is stored on this
                website.
              </p>
              <label className="mt-5 block text-sm font-semibold" htmlFor="subject">
                Subject
              </label>
              <input
                id="subject"
                name="subject"
                required
                className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2"
                defaultValue="Message for St Joseph's, Millfield"
              />
              <label className="mt-4 block text-sm font-semibold" htmlFor="body">
                Message
              </label>
              <textarea
                id="body"
                name="body"
                required
                rows={5}
                className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2"
                placeholder="Please include your name and a telephone number if you would like a reply."
              />
              <button
                type="submit"
                className="mt-4 rounded-sm bg-wine px-5 py-3 font-semibold text-parchment"
              >
                Open email
              </button>
            </form>
          </div>
        </section>
      </div>
    </>
  );
}
