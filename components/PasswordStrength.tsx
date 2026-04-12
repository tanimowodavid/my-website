"use client";

import zxcvbn from "zxcvbn";
import { useMemo, useState } from "react";

const inputClass =
  "mt-2 w-full rounded-xl border border-stone-300/90 bg-white/70 px-4 py-3 text-stone-900 shadow-sm outline-none ring-teal-500/30 backdrop-blur-sm placeholder:text-stone-400 focus:border-teal-500 focus:ring-2 dark:border-white/10 dark:bg-white/5 dark:text-stone-100 dark:placeholder:text-stone-500 dark:focus:border-teal-400/60";

const labels = ["Too guessable", "Weak", "Fair", "Strong", "Excellent"] as const;

function formatCrackLine(result: ReturnType<typeof zxcvbn>): string {
  return String(
    result.crack_times_display.offline_slow_hashing_1e4_per_second,
  );
}

export function PasswordStrength() {
  const [value, setValue] = useState("");

  const result = useMemo(() => {
    if (!value) return null;
    return zxcvbn(value);
  }, [value]);

  return (
    <div className="mx-auto max-w-md space-y-6">
      <label className="block text-sm font-medium text-stone-700 dark:text-stone-300">
        Password
        <input
          type="password"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          autoComplete="new-password"
          className={inputClass}
          placeholder="Type a password to analyze…"
        />
      </label>

      {result ? (
        <div className="glass-panel space-y-5 rounded-2xl p-5 sm:p-6">
          {(() => {
            const sc = Math.max(0, Math.min(4, result.score));
            return (
              <>
                <div className="mb-2 flex items-center justify-between text-sm">
                  <span className="text-stone-600 dark:text-stone-400">
                    Strength
                  </span>
                  <span className="font-medium text-teal-800 dark:text-teal-400">
                    {labels[sc]}
                  </span>
                </div>
                <div
                  className="flex gap-1.5"
                  role="meter"
                  aria-label="Password strength"
                >
                  {([0, 1, 2, 3, 4] as const).map((i) => (
                    <div
                      key={i}
                      className={
                        i <= sc
                          ? "h-2.5 flex-1 rounded-full bg-teal-500 shadow-sm shadow-teal-900/20 dark:bg-teal-400 dark:shadow-teal-950/30"
                          : "h-2.5 flex-1 rounded-full bg-stone-200/90 dark:bg-white/10"
                      }
                    />
                  ))}
                </div>
              </>
            );
          })()}

          <div className="rounded-xl border border-stone-200/80 bg-white/50 px-4 py-3 text-sm backdrop-blur-sm dark:border-white/10 dark:bg-white/5">
            <p className="font-medium text-stone-800 dark:text-stone-200">
              Time to crack (offline, slow hash)
            </p>
            <p className="mt-1 text-stone-600 dark:text-stone-400">
              {formatCrackLine(result)}
            </p>
            <p className="mt-2 text-xs text-stone-500 dark:text-stone-500">
              Estimates from zxcvbn; real risk depends on how and where the
              password is stored. Use a unique password and a password manager.
            </p>
          </div>

          {result.feedback.warning ? (
            <p className="text-sm text-amber-800 dark:text-amber-200/90">
              {result.feedback.warning}
            </p>
          ) : null}
          {result.feedback.suggestions.length > 0 ? (
            <ul className="space-y-1.5 text-sm text-stone-600 dark:text-stone-400">
              {result.feedback.suggestions.map((s) => (
                <li key={s}>• {s}</li>
              ))}
            </ul>
          ) : null}
        </div>
      ) : (
        <p className="text-center text-sm text-stone-500 dark:text-stone-500">
          zxcvbn scores patterns (not just length). Try common weak phrases to
          see the difference.
        </p>
      )}
    </div>
  );
}
