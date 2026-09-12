"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import {
  ADMIN_COOKIE,
  createSessionValue,
  getAdminPassword,
  isAdminSession,
  sessionCookieOptions,
  verifyPassword,
} from "@/lib/admin-auth";
import {
  type EditableContent,
  saveEditableContent,
} from "@/lib/content-store";

export type LoginState = { error: string } | null;

export async function loginAction(
  _prev: LoginState,
  formData: FormData,
): Promise<LoginState> {
  const configured = getAdminPassword();
  if (!configured) {
    return {
      error:
        "Admin login is not configured. Set PARISH_ADMIN_PASSWORD in .env.local and restart the site.",
    };
  }

  const password = String(formData.get("password") ?? "");
  if (!password || !verifyPassword(password)) {
    return { error: "That password is not correct." };
  }

  const store = await cookies();
  store.set(ADMIN_COOKIE, createSessionValue(configured), sessionCookieOptions());
  redirect("/admin");
}

export async function logoutAction(): Promise<void> {
  const store = await cookies();
  store.set(ADMIN_COOKIE, "", { ...sessionCookieOptions(), maxAge: 0 });
  redirect("/admin");
}

export async function saveContentAction(
  input: EditableContent,
): Promise<{ ok: true } | { error: string }> {
  if (!(await isAdminSession())) {
    return { error: "Your session has ended. Please log in again." };
  }

  const phone = input.phone?.trim() ?? "";
  const email = input.email?.trim() ?? "";
  const welcomeBlurb = input.welcomeBlurb?.trim() ?? "";
  if (!phone || !email || !welcomeBlurb) {
    return { error: "Please fill in the welcome text, telephone, and email." };
  }
  if (!input.massTimes?.weekend?.some((row) => row.day.trim() && row.time.trim())) {
    return { error: "Please keep at least one weekend Mass time." };
  }

  await saveEditableContent(input);
  return { ok: true };
}
