"use client";

import { useState } from "react";
import { logoutAction, saveContentAction } from "@/lib/admin-actions";
import type { EditableContent, WeekendService } from "@/lib/content-store";
import type { Notice } from "@/content/notices";

type AdminEditorProps = {
  initial: EditableContent;
};

function emptyNotice(): Notice {
  return {
    id: crypto.randomUUID(),
    title: "",
    date: null,
    body: "",
    isPlaceholder: true,
  };
}

function emptyService(): WeekendService {
  return { day: "Sunday", time: "", label: "Sunday Mass" };
}

export function AdminEditor({ initial }: AdminEditorProps) {
  const [content, setContent] = useState<EditableContent>(initial);
  const [message, setMessage] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);

  function updateMass<K extends keyof EditableContent["massTimes"]>(
    key: K,
    value: EditableContent["massTimes"][K],
  ) {
    setContent((current) => ({
      ...current,
      massTimes: { ...current.massTimes, [key]: value },
    }));
  }

  function updateWeekend(index: number, patch: Partial<WeekendService>) {
    updateMass(
      "weekend",
      content.massTimes.weekend.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    );
  }

  function updateNotice(index: number, patch: Partial<Notice>) {
    setContent((current) => ({
      ...current,
      notices: current.notices.map((row, i) => (i === index ? { ...row, ...patch } : row)),
    }));
  }

  async function onSave(event: React.FormEvent) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);
    setError(null);
    const result = await saveContentAction(content);
    setSaving(false);
    if ("error" in result) {
      setError(result.error);
      return;
    }
    setMessage("Saved. The public pages will show this on the next load.");
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-serif text-3xl text-wine">Update the parish website</h1>
          <p className="mt-2 max-w-prose text-sm leading-6 text-ink-muted">
            Changes are stored in <code>data/parish.json</code> and replace the
            defaults from the source files until you change them again.
          </p>
        </div>
        <form action={logoutAction}>
          <button
            type="submit"
            className="rounded-sm border border-wine/30 px-4 py-2 text-sm text-wine"
          >
            Log out
          </button>
        </form>
      </div>

      <form onSubmit={onSave} className="space-y-8">
        <section className="border border-gold/30 bg-parchment-card p-5">
          <h2 className="font-serif text-2xl text-wine">Welcome</h2>
          <label className="mt-4 block text-sm font-semibold" htmlFor="welcomeBlurb">
            Welcome blurb on the homepage
          </label>
          <textarea
            id="welcomeBlurb"
            required
            rows={4}
            className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2"
            value={content.welcomeBlurb}
            onChange={(event) =>
              setContent((current) => ({ ...current, welcomeBlurb: event.target.value }))
            }
          />
        </section>

        <section className="border border-gold/30 bg-parchment-card p-5">
          <h2 className="font-serif text-2xl text-wine">Weekend Mass times</h2>
          <ul className="mt-4 space-y-4">
            {content.massTimes.weekend.map((service, index) => (
              <li key={`${service.day}-${index}`} className="grid gap-3 md:grid-cols-3">
                <label className="text-sm font-semibold">
                  Day
                  <input
                    className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                    value={service.day}
                    onChange={(event) => updateWeekend(index, { day: event.target.value })}
                    required
                  />
                </label>
                <label className="text-sm font-semibold">
                  Time
                  <input
                    className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                    value={service.time}
                    onChange={(event) => updateWeekend(index, { time: event.target.value })}
                    required
                  />
                </label>
                <div className="flex items-end gap-2">
                  <label className="flex-1 text-sm font-semibold">
                    Label
                    <input
                      className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                      value={service.label}
                      onChange={(event) => updateWeekend(index, { label: event.target.value })}
                    />
                  </label>
                  <button
                    type="button"
                    className="mb-0.5 text-sm underline"
                    onClick={() =>
                      updateMass(
                        "weekend",
                        content.massTimes.weekend.filter((_, i) => i !== index),
                      )
                    }
                  >
                    Remove
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-wine underline underline-offset-2"
            onClick={() => updateMass("weekend", [...content.massTimes.weekend, emptyService()])}
          >
            Add a weekend Mass
          </button>

          <div className="mt-6 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold">
              Weekday Mass times
              <textarea
                rows={3}
                className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                value={content.massTimes.weekdayPlaceholder}
                onChange={(event) => updateMass("weekdayPlaceholder", event.target.value)}
              />
            </label>
            <label className="text-sm font-semibold">
              Confession
              <textarea
                rows={3}
                className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                value={content.massTimes.confessionPlaceholder}
                onChange={(event) => updateMass("confessionPlaceholder", event.target.value)}
              />
            </label>
            <label className="text-sm font-semibold">
              Holy Days
              <textarea
                rows={3}
                className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                value={content.massTimes.holyDayPlaceholder}
                onChange={(event) => updateMass("holyDayPlaceholder", event.target.value)}
              />
            </label>
            <label className="text-sm font-semibold">
              Other sacraments
              <textarea
                rows={3}
                className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                value={content.massTimes.otherPlaceholder}
                onChange={(event) => updateMass("otherPlaceholder", event.target.value)}
              />
            </label>
          </div>
        </section>

        <section className="border border-gold/30 bg-parchment-card p-5">
          <h2 className="font-serif text-2xl text-wine">Contact</h2>
          <div className="mt-4 grid gap-4 md:grid-cols-2">
            <label className="text-sm font-semibold">
              Telephone
              <input
                className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                value={content.phone}
                onChange={(event) =>
                  setContent((current) => ({ ...current, phone: event.target.value }))
                }
                required
              />
            </label>
            <label className="text-sm font-semibold">
              Email
              <input
                type="email"
                className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                value={content.email}
                onChange={(event) =>
                  setContent((current) => ({ ...current, email: event.target.value }))
                }
                required
              />
            </label>
          </div>
        </section>

        <section className="border border-gold/30 bg-parchment-card p-5">
          <h2 className="font-serif text-2xl text-wine">Notices</h2>
          <ul className="mt-4 space-y-6">
            {content.notices.map((notice, index) => (
              <li key={notice.id} className="border border-parchment-deep p-4">
                <div className="grid gap-3 md:grid-cols-2">
                  <label className="text-sm font-semibold">
                    Title
                    <input
                      className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                      value={notice.title}
                      onChange={(event) => updateNotice(index, { title: event.target.value })}
                      required
                    />
                  </label>
                  <label className="text-sm font-semibold">
                    Date (optional)
                    <input
                      type="date"
                      className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                      value={notice.date ?? ""}
                      onChange={(event) =>
                        updateNotice(index, { date: event.target.value || null })
                      }
                    />
                  </label>
                </div>
                <label className="mt-3 block text-sm font-semibold">
                  Text
                  <textarea
                    rows={4}
                    className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2 font-normal"
                    value={notice.body}
                    onChange={(event) => updateNotice(index, { body: event.target.value })}
                    required
                  />
                </label>
                <div className="mt-3 flex flex-wrap items-center justify-between gap-3">
                  <label className="flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      checked={notice.isPlaceholder}
                      onChange={(event) =>
                        updateNotice(index, { isPlaceholder: event.target.checked })
                      }
                    />
                    Mark as placeholder (not yet a published notice)
                  </label>
                  <button
                    type="button"
                    className="text-sm underline"
                    onClick={() =>
                      setContent((current) => ({
                        ...current,
                        notices: current.notices.filter((_, i) => i !== index),
                      }))
                    }
                  >
                    Remove notice
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <button
            type="button"
            className="mt-4 text-sm font-semibold text-wine underline underline-offset-2"
            onClick={() =>
              setContent((current) => ({
                ...current,
                notices: [...current.notices, emptyNotice()],
              }))
            }
          >
            Add a notice
          </button>
        </section>

        {error ? (
          <p className="text-sm text-wine" role="alert">
            {error}
          </p>
        ) : null}
        {message ? (
          <p className="text-sm text-ink" role="status">
            {message}
          </p>
        ) : null}

        <button
          type="submit"
          disabled={saving}
          className="rounded-sm bg-wine px-5 py-3 font-semibold text-parchment disabled:opacity-70"
        >
          {saving ? "Saving…" : "Save changes"}
        </button>
      </form>
    </div>
  );
}
