import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PlaceholderCallout } from "@/components/PlaceholderCallout";
import { parish } from "@/content/parish";

export const metadata: Metadata = {
  title: "Mass times",
};

export default function MassTimesPage() {
  return (
    <>
      <PageHero eyebrow="Worship" title="Mass and service times">
        The weekend times below are those published on the{" "}
        <a className="underline underline-offset-4" href={parish.massTimes.sourceUrl}>
          {parish.massTimes.sourceLabel}
        </a>
        . {parish.massTimes.confirmation}
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <section className="border border-gold/30 bg-parchment-card p-6 shadow-card sm:p-8">
          <h2 className="font-serif text-3xl text-wine">Weekend Mass</h2>
          <table className="mt-6 w-full text-left">
            <caption className="sr-only">Published weekend Mass times</caption>
            <thead>
              <tr className="border-b border-gold/30 text-xs tracking-[0.16em] text-ink-faint uppercase">
                <th className="py-2 pr-4 font-semibold">Day</th>
                <th className="py-2 pr-4 font-semibold">Time</th>
                <th className="py-2 font-semibold">Service</th>
              </tr>
            </thead>
            <tbody>
              {parish.massTimes.weekend.map((service) => (
                <tr key={`${service.day}-${service.time}`} className="border-b border-parchment-deep">
                  <td className="py-4 pr-4 font-semibold">{service.day}</td>
                  <td className="py-4 pr-4 font-serif text-2xl">{service.time}</td>
                  <td className="py-4 text-ink-muted">{service.label}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="mt-5 text-sm text-ink-muted">
            Source:{" "}
            <a className="underline underline-offset-2" href={parish.massTimes.sourceUrl}>
              diocesehn.org.uk
            </a>
            . The diocesan page does not currently list weekday Masses for this
            church.
          </p>
        </section>

        <div className="mt-8 grid gap-5 md:grid-cols-2">
          <PlaceholderCallout>
            <p>
              <strong>Weekdays.</strong> {parish.massTimes.weekdayPlaceholder}
            </p>
          </PlaceholderCallout>
          <PlaceholderCallout>
            <p>
              <strong>Confession.</strong> {parish.massTimes.confessionPlaceholder}
            </p>
          </PlaceholderCallout>
          <PlaceholderCallout>
            <p>
              <strong>Holy Days.</strong> {parish.massTimes.holyDayPlaceholder}
            </p>
          </PlaceholderCallout>
          <PlaceholderCallout>
            <p>
              <strong>Other sacraments.</strong> {parish.massTimes.otherPlaceholder}
            </p>
          </PlaceholderCallout>
        </div>

        <section className="prose-parish mt-12">
          <h2 className="mb-4 font-serif text-3xl text-ink">In the cluster</h2>
          <p>
            St Joseph&apos;s is clustered with {parish.cluster.join(" and ")}.
            If you need a Mass at another time, those churches may be able to
            help. Please check their current notices rather than relying on
            remembered times.
          </p>
          <p>
            <Link href="/contact" className="font-semibold text-wine underline underline-offset-4">
              Ask the parish
            </Link>{" "}
            if you are unsure which Mass to attend, or if you need Holy
            Communion brought to someone at home.
          </p>
        </section>
      </div>
    </>
  );
}
