"use client";

import { useActionState } from "react";
import { loginAction } from "@/lib/admin-actions";

type LoginFormProps = {
  configured: boolean;
};

export function LoginForm({ configured }: LoginFormProps) {
  const [state, action, pending] = useActionState(loginAction, null);

  if (!configured) {
    return (
      <div className="border border-dashed border-gold-dark/50 bg-parchment-deep/50 px-5 py-6">
        <h1 className="font-serif text-3xl text-wine">Parish login is not ready</h1>
        <p className="mt-3 max-w-prose leading-7 text-ink-muted">
          Set <code className="font-semibold">PARISH_ADMIN_PASSWORD</code> in{" "}
          <code className="font-semibold">.env.local</code> (see{" "}
          <code className="font-semibold">.env.example</code>), then restart{" "}
          <code className="font-semibold">npm run dev</code>. Login is refused
          until that password is set. Do not commit a real password.
        </p>
      </div>
    );
  }

  return (
    <form action={action} className="border border-gold/30 bg-parchment-card p-6 shadow-card">
      <h1 className="font-serif text-3xl text-wine">Parish login</h1>
      <p className="mt-3 max-w-prose text-sm leading-6 text-ink-muted">
        One shared password for parish volunteers. There is no public
        registration.
      </p>
      <label className="mt-6 block text-sm font-semibold" htmlFor="password">
        Password
      </label>
      <input
        id="password"
        name="password"
        type="password"
        autoComplete="current-password"
        required
        className="mt-1 w-full border border-wine/20 bg-parchment px-3 py-2"
      />
      {state?.error ? (
        <p className="mt-3 text-sm text-wine" role="alert">
          {state.error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="mt-5 rounded-sm bg-wine px-5 py-3 font-semibold text-parchment disabled:opacity-70"
      >
        {pending ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
