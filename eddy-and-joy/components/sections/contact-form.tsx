"use client";

import { useState, type FormEvent } from "react";
import { Send, CheckCircle2 } from "lucide-react";

export function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = new FormData(e.currentTarget);
    const name = String(form.get("name") || "").trim();
    const email = String(form.get("email") || "").trim();
    const message = String(form.get("message") || "").trim();

    const nextErrors: Record<string, string> = {};
    if (name.length < 2) nextErrors.name = "Please enter your full name.";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      nextErrors.email = "Please enter a valid email address.";
    }
    if (message.length < 10) nextErrors.message = "Message should be at least 10 characters.";

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length === 0) {
      setSubmitted(true);
    }
  };

  if (submitted) {
    return (
      <div className="card-luxury flex flex-col items-center p-10 text-center">
        <CheckCircle2 className="text-accent" size={40} />
        <h3 className="mt-4 font-display text-2xl text-ink">Message sent</h3>
        <p className="mt-2 text-sm text-muted">
          Thanks for reaching out — our team will get back to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="card-luxury space-y-5 p-8">
      <div>
        <label htmlFor="name" className="text-sm font-medium text-ink">
          Full Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
          placeholder="Your name"
        />
        {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="email" className="text-sm font-medium text-ink">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          className="mt-2 w-full rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
          placeholder="you@example.com"
        />
        {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
      </div>

      <div>
        <label htmlFor="message" className="text-sm font-medium text-ink">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          className="mt-2 w-full resize-none rounded-xl border border-line bg-bg px-4 py-3 text-sm outline-none transition-colors focus:border-accent"
          placeholder="How can we help?"
        />
        {errors.message && <p className="mt-1 text-xs text-red-500">{errors.message}</p>}
      </div>

      <button type="submit" className="btn-pill btn-primary w-full">
        Send Message <Send size={15} />
      </button>
    </form>
  );
}
