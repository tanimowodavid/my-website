import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

const links = [
  { href: "#intro", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#projects", label: "Projects" },
  { href: "#playground", label: "Playground" },
  { href: "#contact", label: "Contact" },
] as const;

export function Navbar() {
  return (
    <header className="glass-nav sticky top-0 z-50">
      <nav className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          href="/#intro"
          className="text-sm font-semibold tracking-tight text-stone-900 dark:text-stone-50"
        >
          Tanimowo David
        </Link>
        <div className="flex flex-wrap items-center justify-end gap-2 sm:gap-3">
          <ul className="flex flex-wrap items-center justify-end gap-0.5 sm:gap-1">
            {links.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className="rounded-lg px-3 py-2 text-sm text-stone-600 transition hover:bg-stone-200/70 hover:text-stone-900 dark:text-stone-300 dark:hover:bg-white/10 dark:hover:text-white"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
