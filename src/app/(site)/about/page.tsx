import type { Metadata } from "next";
import Link from "next/link";
import { PageHero } from "@/components/PageHero";
import { PlaceholderCallout } from "@/components/PlaceholderCallout";
import { history, parish } from "@/content/parish";

export const metadata: Metadata = {
  title: "Who we are",
};

export default function AboutPage() {
  return (
    <>
      <PageHero eyebrow="The parish" title="Who we are">
        St Joseph&apos;s is a Roman Catholic church in Millfield, Sunderland,
        dedicated to Saint Joseph, patron of workers and of the Church.
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1.2fr_0.8fr]">
          <article className="prose-parish">
            <h2 className="mb-4 font-serif text-3xl text-ink">A parish for Millfield</h2>
            <p>
              The mission serving the west end of Sunderland was established in{" "}
              {history.missionEstablished}, in a school-chapel built by Canon
              John Bamber of St Mary&apos;s. The Northern Catholic Calendar of
              1885 recorded that “St Joseph, the patron of the artizan and the
              horny-handed labourer, was chosen as the patron of the mission.”
            </p>
            <p>
              The present church was designed by the parish priest,{" "}
              {history.architects}. Work began at Easter 1906. The foundation
              stone in the west porch is dated {history.foundationStone}, and
              the church opened on {history.opened}, at a cost of {history.cost}
              . The blocks were made on site — an early use of moulded concrete
              in a church — and are said to have been made by the men of the
              parish.
            </p>
            <p>
              The building is a {history.style} and is {history.listedGrade}{" "}
              listed. It was cleared of debt and consecrated in{" "}
              {history.consecrated}. For its centenary in {history.reordered}{" "}
              the interior was sensitively reordered by Vincente Stienlet.
            </p>
            <p>
              Saint Joseph&apos;s Members Club, a social and charitable hub of
              parish life, ran from {history.membersClub}. Its memory still
              belongs to this community.
            </p>
            <p className="text-sm">
              Building history is taken from{" "}
              <a
                className="text-wine underline underline-offset-2"
                href={parish.sources.takingStock}
              >
                Taking Stock
              </a>
              , the inventory of Catholic churches in England and Wales, and
              from the{" "}
              <a
                className="text-wine underline underline-offset-2"
                href={parish.sources.listedBuildings}
              >
                list entry
              </a>
              .
            </p>
          </article>

          <aside className="space-y-6">
            <div className="border border-gold/30 bg-parchment-card p-6 shadow-card">
              <h2 className="font-serif text-2xl text-wine">Clergy</h2>
              <ul className="mt-4 space-y-2">
                {parish.clergy.map((person) => (
                  <li key={person.name} className="text-lg">
                    {person.name}
                  </li>
                ))}
              </ul>
              <p className="mt-4 text-sm text-ink-muted">{parish.clergyNote}</p>
            </div>
            <div className="border border-gold/30 bg-parchment-card p-6 shadow-card">
              <h2 className="font-serif text-2xl text-wine">In the diocese</h2>
              <p className="mt-3 text-sm leading-6 text-ink-muted">
                {parish.partnership}.
                <br />
                Clustered with {parish.cluster.join("; ")}.
              </p>
              <p className="mt-3">
                <a
                  className="text-wine underline underline-offset-4"
                  href={parish.dioceseUrl}
                >
                  View the diocesan listing
                </a>
              </p>
            </div>
          </aside>
        </div>

        <section className="mt-12 border-t border-gold/20 pt-10">
          <h2 className="font-serif text-3xl">Our parish school</h2>
          <div className="prose-parish mt-4">
            <p>
              {parish.school.name} stands on the next street, at{" "}
              {parish.school.address}. School and parish belong together: children
              and families share Mass, the sacraments, and the life of this
              church.
            </p>
          </div>
          <p className="mt-4 text-sm leading-6">
            School office:{" "}
            <a className="underline underline-offset-2" href={parish.school.phoneHref}>
              {parish.school.phone}
            </a>
            {" · "}
            <a
              className="underline underline-offset-2"
              href={`mailto:${parish.school.email}`}
            >
              {parish.school.email}
            </a>
            {" · "}
            <a className="underline underline-offset-2" href={parish.school.url}>
              stjs.org.uk
            </a>
          </p>
        </section>

        <div className="mt-10">
          <PlaceholderCallout>
            <p>
              Add a short word from the Parish Priest, current ministries
              (readers, catechists, SVP, choir), and any languages used at
              Mass. Please do not invent names or groups that are not already
              public.
            </p>
          </PlaceholderCallout>
        </div>

        <p className="mt-8">
          <Link href="/contact" className="font-semibold text-wine underline underline-offset-4">
            Get in touch
          </Link>
        </p>
      </div>
    </>
  );
}
