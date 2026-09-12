import type { Metadata } from "next";
import { PageHero } from "@/components/PageHero";
import { PlaceholderCallout } from "@/components/PlaceholderCallout";
import { getLiveContent } from "@/lib/content-store";

export const metadata: Metadata = {
  title: "Notices",
};

function formatDate(value: string | null): string | null {
  if (!value) {
    return null;
  }
  const date = new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) {
    return value;
  }
  return new Intl.DateTimeFormat("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(date);
}

export default async function NoticesPage() {
  const live = await getLiveContent();

  return (
    <>
      <PageHero eyebrow="Parish life" title="Notices">
        This page is for newsletters and parish notices. It is not a live
        calendar. Placeholder items stay labelled until the parish publishes
        them.
      </PageHero>

      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        {live.notices.length === 0 ? (
          <p className="text-ink-muted">There are no notices just now.</p>
        ) : (
          <ul className="space-y-5">
            {live.notices.map((notice) => (
              <li
                key={notice.id}
                className="border border-gold/30 bg-parchment-card p-6 shadow-card"
              >
                <div className="flex flex-wrap items-center gap-3">
                  <h2 className="font-serif text-2xl text-wine">{notice.title}</h2>
                  {notice.isPlaceholder ? (
                    <span className="border border-dashed border-gold-dark/60 px-2 py-0.5 text-xs tracking-wide text-wine uppercase">
                      Placeholder
                    </span>
                  ) : null}
                </div>
                {formatDate(notice.date) ? (
                  <p className="mt-1 text-sm text-ink-faint">{formatDate(notice.date)}</p>
                ) : (
                  <p className="mt-1 text-sm text-ink-faint">Date to be added</p>
                )}
                <p className="mt-3 max-w-prose whitespace-pre-line leading-7 text-ink-muted">
                  {notice.body}
                </p>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-10">
          <PlaceholderCallout>
            <p>
              Parish volunteers can add, edit, or remove notices after signing
              in at the discreet Parish login link in the footer. Do not add
              event dates that have not been agreed by the parish.
            </p>
          </PlaceholderCallout>
        </div>
      </div>
    </>
  );
}
