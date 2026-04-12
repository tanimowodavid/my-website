"use client";

import { Mail, MessageSquare, User } from "lucide-react";
import { useState } from "react";

const fieldClass =
  "rounded-xl border border-stone-300 bg-white px-4 py-2.5 text-stone-900 outline-none ring-teal-500/30 placeholder:text-stone-400 focus:border-teal-500 focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-teal-400/60";

export function ContactForm() {
  const [sent, setSent] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSent(true);
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="glass-panel flex flex-col gap-4 p-6 sm:p-8"
    >
      <div className="grid gap-4 sm:grid-cols-2">
        <label className="flex flex-col gap-2 text-sm text-stone-700 dark:text-stone-300">
          <span className="inline-flex items-center gap-2">
            <User
              className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400"
              aria-hidden
            />
            Name
          </span>
          <input
            name="name"
            type="text"
            required
            autoComplete="name"
            className={fieldClass}
            placeholder="Your name"
          />
        </label>
        <label className="flex flex-col gap-2 text-sm text-stone-700 dark:text-stone-300">
          <span className="inline-flex items-center gap-2">
            <Mail
              className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400"
              aria-hidden
            />
            Email
          </span>
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            className={fieldClass}
            placeholder="you@example.com"
          />
        </label>
      </div>
      <label className="flex flex-col gap-2 text-sm text-stone-700 dark:text-stone-300">
        <span className="inline-flex items-center gap-2">
          <MessageSquare
            className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400"
            aria-hidden
          />
          Message
        </span>
        <textarea
          name="message"
          required
          rows={4}
          className={`resize-y ${fieldClass}`}
          placeholder="Briefly describe what you’d like to discuss."
        />
      </label>
      <div className="flex flex-wrap items-center gap-4">
        <button
          type="submit"
          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-5 py-2.5 text-sm font-medium text-white shadow-md shadow-teal-900/20 transition hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400"
        >
          <MessageSquare className="h-4 w-4 shrink-0" aria-hidden />
          Send message
        </button>
        {sent ? (
          <span className="text-sm text-emerald-700 dark:text-emerald-400/90">
            Thanks — your message was recorded locally for this demo.
          </span>
        ) : null}
      </div>
    </form>
  );
}
