import Link from "next/link";
import { PlaceholderCallout } from "@/components/PlaceholderCallout";
import { parish } from "@/content/parish";

const quickLinks = [
  {
    href: "/mass-times",
    title: "Mass times",
    text: "Weekend Masses as published by the diocese, with space for weekday and Holy Day times.",
  },
  {
    href: "/find-us",
    title: "How to find us",
    text: "Paxton Terrace, Millfield, with a map and directions.",
  },
  {
    href: "/about",
    title: "Who we are",
    text: "A Catholic parish in west Sunderland, serving Millfield since 1873.",
  },
];

export default function HomePage() {
  return (
    <>
      <section className="relative overflow-hidden bg-wine-deep text-parchment">
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-30"
          style={{
            backgroundImage:
              "radial-gradient(circle at 20% 20%, rgba(228,201,122,0.16), transparent 38%), radial-gradient(circle at 80% 0%, rgba(255,250,241,0.08), transparent 32%)",
          }}
        />
        <div className="relative mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 sm:py-20 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
          <div>
            <p className="text-xs tracking-[0.24em] text-gold-light uppercase">
              {parish.denomination} · {parish.diocese}
            </p>
            <h1 className="mt-4 font-serif text-4xl leading-[1.1] sm:text-6xl">
              Peace be with you.
              <span className="mt-2 block text-gold-light">
                Welcome to St Joseph&apos;s.
              </span>
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-8 text-parchment/85">
              A parish church in Millfield, Sunderland, dedicated to Saint
              Joseph. Whether you are local, visiting family, or looking for a
              church to pray in, you are welcome here.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/mass-times"
                className="inline-flex items-center justify-center rounded-sm bg-gold-light px-5 py-3 text-center font-semibold text-wine-deep"
              >
                Mass times
              </Link>
              <Link
                href="/find-us"
                className="inline-flex items-center justify-center rounded-sm border border-gold/50 px-5 py-3 text-center text-gold-light"
              >
                How to find us
              </Link>
            </div>
          </div>

          <aside className="border border-gold/30 bg-wine/80 p-6 shadow-card">
            <h2 className="font-serif text-2xl text-gold-light">This week</h2>
            <p className="mt-1 text-sm text-parchment/70">
              Weekend Masses published by the {parish.massTimes.sourceLabel}.
            </p>
            <ul className="mt-5 divide-y divide-gold/20">
              {parish.massTimes.weekend.map((service) => (
                <li
                  key={`${service.day}-${service.time}`}
                  className="flex items-baseline justify-between gap-4 py-3"
                >
                  <span>
                    <span className="block font-semibold">{service.day}</span>
                    <span className="text-sm text-parchment/70">
                      {service.label}
                    </span>
                  </span>
                  <span className="font-serif text-2xl">{service.time}</span>
                </li>
              ))}
            </ul>
            <p className="mt-4 text-sm text-parchment/75">
              {parish.massTimes.confirmation}
            </p>
            <Link
              href="/mass-times"
              className="mt-4 inline-block text-sm text-gold-light underline underline-offset-4"
            >
              Weekday times and other services
            </Link>
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14 sm:px-6">
        <div className="max-w-3xl">
          <p className="text-xs tracking-[0.2em] text-wine-soft uppercase">
            A parish in Millfield
          </p>
          <h2 className="mt-2 font-serif text-3xl sm:text-4xl">
            A church at the heart of west Sunderland
          </h2>
          <div className="prose-parish mt-5">
            <p>
              St Joseph&apos;s stands on Paxton Terrace in Millfield. The
              mission was founded in 1873 to serve the west end of the town,
              and the present church opened on 14 October 1907. It is a Grade
              II listed Romanesque basilica, built of concrete blocks made on
              site by the men of the parish.
            </p>
            <p>
              We belong to the {parish.diocese} and form part of the{" "}
              {parish.partnership}, clustered with {parish.cluster[0]} and{" "}
              {parish.cluster[1]}.
            </p>
          </div>
        </div>

        <ul className="mt-10 grid gap-5 md:grid-cols-3">
          {quickLinks.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                className="block h-full border border-gold/30 bg-parchment-card p-5 shadow-card transition hover:border-wine/40"
              >
                <h3 className="font-serif text-2xl text-wine">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-ink-muted">
                  {item.text}
                </p>
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="bg-parchment-deep/60">
        <div className="mx-auto grid max-w-6xl gap-8 px-4 py-14 sm:px-6 lg:grid-cols-2">
          <div>
            <h2 className="font-serif text-3xl">Visiting for the first time</h2>
            <div className="prose-parish mt-4">
              <p>
                Come as you are. Sunday Mass is at 9.30am; the Saturday Vigil
                is at 5.30pm. If you need a quiet place to sit, or if you are
                returning to church after some time away, you will find a
                welcome.
              </p>
              <p>
                For baptisms, marriages, funerals, or housebound Communion,
                please telephone the parish or write to the published cluster
                address.
              </p>
            </div>
            <Link
              href="/contact"
              className="mt-5 inline-block font-semibold text-wine underline underline-offset-4"
            >
              Contact the parish
            </Link>
          </div>
          <PlaceholderCallout>
            <p>
              Add a short seasonal welcome, the name of the Parish Priest as
              you would like it shown, and any note about livestreams or
              accessibility (hearing loop, step-free access, or parking).
            </p>
          </PlaceholderCallout>
        </div>
      </section>
    </>
  );
}
