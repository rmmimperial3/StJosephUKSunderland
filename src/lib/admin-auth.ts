import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

export const ADMIN_COOKIE = "parish_admin";
const SESSION_MS = 60 * 60 * 12 * 1000;

export function getAdminPassword(): string | null {
  const value = process.env.PARISH_ADMIN_PASSWORD?.trim();
  return value ? value : null;
}

function signingKey(password: string): string {
  return createHmac("sha256", "st-josephs-parish-admin")
    .update(password)
    .digest("hex");
}

function signToken(password: string, expiresAt: number): string {
  const payload = String(expiresAt);
  const signature = createHmac("sha256", signingKey(password))
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

function safeEqual(left: string, right: string): boolean {
  const leftBuffer = Buffer.from(left);
  const rightBuffer = Buffer.from(right);
  if (leftBuffer.length !== rightBuffer.length) {
    timingSafeEqual(leftBuffer, Buffer.alloc(leftBuffer.length));
    return false;
  }
  return timingSafeEqual(leftBuffer, rightBuffer);
}

export function verifyPassword(candidate: string): boolean {
  const password = getAdminPassword();
  if (!password) {
    return false;
  }
  return safeEqual(candidate, password);
}

export function createSessionValue(password: string): string {
  return signToken(password, Date.now() + SESSION_MS);
}

export function readSessionValue(value: string, password: string): boolean {
  const [payload, signature] = value.split(".");
  if (!payload || !signature) {
    return false;
  }
  const expiresAt = Number(payload);
  if (!Number.isFinite(expiresAt) || expiresAt < Date.now()) {
    return false;
  }
  const expected = signToken(password, expiresAt);
  return safeEqual(value, expected);
}

export async function isAdminSession(): Promise<boolean> {
  const password = getAdminPassword();
  if (!password) {
    return false;
  }
  const store = await cookies();
  const value = store.get(ADMIN_COOKIE)?.value;
  if (!value) {
    return false;
  }
  return readSessionValue(value, password);
}

export function sessionCookieOptions() {
  return {
    httpOnly: true,
    sameSite: "lax" as const,
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MS / 1000,
  };
}
