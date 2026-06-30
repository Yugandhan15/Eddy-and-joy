"use client";

import { useActionState } from "react";
import Link from "next/link";
import { signup, type AuthFormState } from "@/lib/auth/actions";

const initialState: AuthFormState = {};

export default function RegisterPage() {
  const [state, formAction, pending] = useActionState(signup, initialState);

  if (state.success) {
    return (
      <main className="mx-auto flex min-h-[80vh] max-w-md flex-col items-center justify-center px-5 py-32 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-tint text-2xl text-accent-hover">
          ✓
        </div>
        <h1 className="mt-6 font-display text-3xl font-light text-ink">Check your email</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          We&apos;ve sent a confirmation link to your inbox. Click it to activate your account,
          then sign in.
        </p>
        <Link href="/account/login" className="btn-pill btn-primary mt-8">
          Go to Sign In
        </Link>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 py-32">
      <p className="eyebrow text-accent-hover">Join us</p>
      <h1 className="mt-2 font-display text-4xl font-light text-ink">Create an account</h1>
      <p className="mt-3 text-sm text-muted">
        Already have an account?{" "}
        <Link href="/account/login" className="font-medium text-accent-hover underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>

      <form action={formAction} className="mt-10 flex flex-col gap-5">
        <div className="flex flex-col gap-1.5">
          <label htmlFor="full_name" className="text-sm font-semibold text-ink">
            Full Name
          </label>
          <input
            id="full_name"
            name="full_name"
            type="text"
            required
            autoComplete="name"
            className="rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            placeholder="Your full name"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="phone" className="text-sm font-semibold text-ink">
            Mobile Number
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            inputMode="numeric"
            maxLength={10}
            autoComplete="tel"
            className="rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            placeholder="10-digit number"
          />
        </div>

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
            minLength={8}
            autoComplete="new-password"
            className="rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            placeholder="At least 8 characters"
          />
        </div>

        <div className="flex flex-col gap-1.5">
          <label htmlFor="confirm_password" className="text-sm font-semibold text-ink">
            Confirm Password
          </label>
          <input
            id="confirm_password"
            name="confirm_password"
            type="password"
            required
            autoComplete="new-password"
            className="rounded-2xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
            placeholder="Repeat your password"
          />
        </div>

        {state.error && (
          <div className="rounded-xl bg-red-50 px-4 py-3 text-sm text-red-600">
            <p>{state.error}</p>
            {state.alreadyRegistered && (
              <Link href="/account/login" className="mt-1 inline-block font-semibold underline">
                Go to Sign In
              </Link>
            )}
          </div>
        )}

        <button type="submit" disabled={pending} className="btn-pill btn-primary mt-2 w-full disabled:opacity-60">
          {pending ? "Creating account…" : "Create Account"}
        </button>
      </form>
    </main>
  );
}
