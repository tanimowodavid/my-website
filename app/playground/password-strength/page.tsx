import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { PasswordStrength } from "@/components/PasswordStrength";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Password Strength | Playground",
  description: "Heuristic password strength feedback.",
};

export default function PasswordStrengthPage() {
  return (
    <>
      <Navbar />
      <main className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20">
        <Link
          href="/#playground"
          className="text-sm font-medium text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          ← Back to playground
        </Link>
        <div className="mt-10 glass-panel p-8 sm:p-12">
          <h1 className="text-2xl font-semibold text-stone-900 dark:text-stone-50 sm:text-3xl">
            Password Strength Checker
          </h1>
          <p className="mt-2 text-stone-600 dark:text-stone-400">
            Powered by zxcvbn (pattern-aware scoring, crack-time estimates). Not a
            substitute for a password manager or breach checks.
          </p>
          <div className="mt-10">
            <PasswordStrength />
          </div>
        </div>
      </main>
    </>
  );
}
