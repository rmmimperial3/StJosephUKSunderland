import { randomUUID } from "node:crypto";
import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import path from "node:path";
import { cache } from "react";
import { unstable_noStore as noStore } from "next/cache";
import { notices as defaultNotices, type Notice } from "@/content/notices";
import { parish, phoneToHref } from "@/content/parish";

export type WeekendService = {
  day: string;
  time: string;
  label: string;
};

export type EditableContent = {
  phone: string;
  email: string;
  welcomeBlurb: string;
  massTimes: {
    weekend: WeekendService[];
    weekdayPlaceholder: string;
    confessionPlaceholder: string;
    holyDayPlaceholder: string;
    otherPlaceholder: string;
  };
  notices: Notice[];
};

export type LiveContent = EditableContent & {
  phoneHref: string;
};

const DATA_DIR = path.join(process.cwd(), "data");
const DATA_FILE = path.join(DATA_DIR, "parish.json");

export function defaultEditableContent(): EditableContent {
  return {
    phone: parish.phone,
    email: parish.email,
    welcomeBlurb: parish.welcomeBlurb,
    massTimes: {
      weekend: parish.massTimes.weekend.map((service) => ({ ...service })),
      weekdayPlaceholder: parish.massTimes.weekdayPlaceholder,
      confessionPlaceholder: parish.massTimes.confessionPlaceholder,
      holyDayPlaceholder: parish.massTimes.holyDayPlaceholder,
      otherPlaceholder: parish.massTimes.otherPlaceholder,
    },
    notices: defaultNotices.map((notice) => ({ ...notice })),
  };
}

function asString(value: unknown, fallback: string): string {
  return typeof value === "string" ? value : fallback;
}

function asWeekend(value: unknown, fallback: WeekendService[]): WeekendService[] {
  if (!Array.isArray(value)) {
    return fallback;
  }
  const rows = value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }
      const row = item as Record<string, unknown>;
      const day = asString(row.day, "").trim();
      const time = asString(row.time, "").trim();
      const label = asString(row.label, "").trim();
      if (!day || !time) {
        return null;
      }
      return { day, time, label };
    })
    .filter((row): row is WeekendService => row !== null);
  return rows.length > 0 ? rows : fallback;
}

function asNotices(value: unknown, fallback: Notice[]): Notice[] {
  if (!Array.isArray(value)) {
    return fallback;
  }
  if (value.length === 0) {
    return [];
  }
  const rows = value
    .map((item) => {
      if (!item || typeof item !== "object") {
        return null;
      }
      const row = item as Record<string, unknown>;
      const title = asString(row.title, "").trim();
      const body = asString(row.body, "").trim();
      if (!title || !body) {
        return null;
      }
      const dateRaw = row.date;
      const date =
        typeof dateRaw === "string" && dateRaw.trim() ? dateRaw.trim() : null;
      return {
        id: asString(row.id, "").trim() || randomUUID(),
        title,
        date,
        body,
        isPlaceholder: Boolean(row.isPlaceholder),
      } satisfies Notice;
    })
    .filter((row): row is Notice => row !== null);
  return rows.length > 0 ? rows : fallback;
}

function mergeContent(partial: Partial<EditableContent> | null): EditableContent {
  const defaults = defaultEditableContent();
  if (!partial) {
    return defaults;
  }
  return {
    phone: asString(partial.phone, defaults.phone).trim() || defaults.phone,
    email: asString(partial.email, defaults.email).trim() || defaults.email,
    welcomeBlurb:
      asString(partial.welcomeBlurb, defaults.welcomeBlurb).trim() ||
      defaults.welcomeBlurb,
    massTimes: {
      weekend: asWeekend(partial.massTimes?.weekend, defaults.massTimes.weekend),
      weekdayPlaceholder: asString(
        partial.massTimes?.weekdayPlaceholder,
        defaults.massTimes.weekdayPlaceholder,
      ),
      confessionPlaceholder: asString(
        partial.massTimes?.confessionPlaceholder,
        defaults.massTimes.confessionPlaceholder,
      ),
      holyDayPlaceholder: asString(
        partial.massTimes?.holyDayPlaceholder,
        defaults.massTimes.holyDayPlaceholder,
      ),
      otherPlaceholder: asString(
        partial.massTimes?.otherPlaceholder,
        defaults.massTimes.otherPlaceholder,
      ),
    },
    notices: asNotices(partial.notices, defaults.notices),
  };
}

async function readStoredContent(): Promise<Partial<EditableContent> | null> {
  try {
    const raw = await readFile(DATA_FILE, "utf8");
    const parsed = JSON.parse(raw) as Partial<EditableContent>;
    return parsed && typeof parsed === "object" ? parsed : null;
  } catch {
    return null;
  }
}

export const getLiveContent = cache(async (): Promise<LiveContent> => {
  noStore();
  const merged = mergeContent(await readStoredContent());
  return {
    ...merged,
    phoneHref: phoneToHref(merged.phone),
  };
});

export async function saveEditableContent(input: EditableContent): Promise<EditableContent> {
  const next = mergeContent(input);
  await mkdir(DATA_DIR, { recursive: true });
  const tmp = `${DATA_FILE}.tmp`;
  await writeFile(tmp, `${JSON.stringify(next, null, 2)}\n`, "utf8");
  await rename(tmp, DATA_FILE);
  return next;
}

export function stillNeedsParishText(text: string, defaultText: string): boolean {
  const value = text.trim().toLowerCase();
  return value === defaultText.trim().toLowerCase() || value.startsWith("add ");
}
