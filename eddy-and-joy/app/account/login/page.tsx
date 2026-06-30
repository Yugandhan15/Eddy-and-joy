"use client";

import { useActionState } from "react";
import Link from "next/link";
import { login, type AuthFormState } from "@/lib/auth/actions";

const initialState: AuthFormState = {};

export default function LoginPage() {
  const [state, formAction, pending] = useActionState(login, initialState);

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-32">
      <p className="eyebrow text-accent-hover">Welcome back</p>
      <h1 className="mt-2 font-display text-4xl font-light text-ink">Sign in</h1>
      <p className="mt-3 text-sm text-muted">
        New here?{" "}
        <Link href="/account/register" className="font-medium text-accent-hover underline-offset-4 hover:underline">
          Create an account
        </Link>
      </p>

      <form action={formAction} className="mt-10 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="email" className="text-sm font-semibold text-ink">
            Email
          </label>
          <input
            id="email"
            name="email"
            type="email"
            required
            autoComplete="email"
            className="rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            placeholder="you@example.com"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="password" className="text-sm font-semibold text-ink">
            Password
          </label>
          <input
            id="password"
            name="password"
            type="password"
            required
            autoComplete="current-password"
            className="rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            placeholder="••••••••"
          />
        </div>

        {state.error && (
          <p className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">{state.error}</p>
        )}

        <button type="submit" disabled={pending} className="btn-pill btn-primary mt-2 w-full disabled:opacity-60">
          {pending ? "Signing in…" : "Sign In"}
        </button>
      </form>
    </main>
  );
}
