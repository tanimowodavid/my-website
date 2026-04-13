import Image from "next/image";
import Link from "next/link";
import type { LucideIcon } from "lucide-react";
import type { IconType } from "react-icons";
import {
  Container,
  Database,
  FileCode2,
  LayoutGrid,
  Layers,
  Mail,
  MessageSquare,
  Server,
  Sparkles,
} from "lucide-react";
import {
  SiDjango,
  SiDocker,
  SiFastapi,
  SiGit,
  SiLinux,
  SiNextdotjs,
  SiNodedotjs,
  SiPostgresql,
  SiPython,
  SiReact,
  SiRedis,
  SiTailwindcss,
} from "react-icons/si";
import { GithubIcon, LinkedinIcon } from "@/components/BrandSocialIcons";
import { ContactForm } from "@/components/ContactForm";
import { projects } from "@/lib/projects";

const HERO_IMAGE = "/me9-2.png";
const CONTACT_EMAIL = "davidtanimowo01@gmail.com";

const skillCategories: {
  title: string;
  CategoryIcon: LucideIcon;
  items: { name: string; TechIcon: IconType }[];
}[] = [
  {
    title: "Frontend",
    CategoryIcon: LayoutGrid,
    items: [
      { name: "React", TechIcon: SiReact },
      { name: "Next.js", TechIcon: SiNextdotjs },
      { name: "Tailwind CSS", TechIcon: SiTailwindcss },
    ],
  },
  {
    title: "Backend",
    CategoryIcon: Server,
    items: [
      { name: "Python", TechIcon: SiPython },
      { name: "FastAPI", TechIcon: SiFastapi },
      { name: "Django", TechIcon: SiDjango },
      { name: "Node.js", TechIcon: SiNodedotjs },
    ],
  },
  {
    title: "Database",
    CategoryIcon: Database,
    items: [
      { name: "PostgreSQL", TechIcon: SiPostgresql },
      { name: "Redis", TechIcon: SiRedis },
    ],
  },
  {
    title: "DevOps",
    CategoryIcon: Container,
    items: [
      { name: "Docker", TechIcon: SiDocker },
      { name: "Linux", TechIcon: SiLinux },
      { name: "Git", TechIcon: SiGit },
    ],
  },
];

const linkAccent =
  "text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300";

export function IntroSection() {
  return (
    <section
      id="intro"
      className="relative scroll-mt-24 overflow-hidden border-b border-stone-200/80 dark:border-white/10"
    >
      <div
        className="pointer-events-none absolute -right-20 -top-28 h-72 w-72 rounded-full bg-amber-200/50 blur-3xl dark:bg-teal-900/25"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -bottom-28 -left-16 h-64 w-64 rounded-full bg-teal-200/45 blur-3xl dark:bg-amber-900/20"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 pb-20 pt-14 sm:px-6 sm:pb-24 sm:pt-20">
        <div className="grid items-center gap-12 lg:grid-cols-[1fr_minmax(0,17rem)] lg:gap-14">
          <div>
            <p className="inline-flex items-center gap-2 text-base font-medium text-teal-800 dark:text-teal-400 sm:text-lg">
              <Sparkles className="h-5 w-5 shrink-0 opacity-90" aria-hidden />
              Hi there — welcome in.
            </p>

            <h1 className="mt-5 text-balance font-semibold tracking-tight text-stone-900 dark:text-stone-50">
              <span className="block text-xl font-normal text-stone-600 dark:text-stone-400 sm:text-2xl">
                I&apos;m
              </span>
              <span className="mt-1 block text-4xl sm:text-5xl lg:text-[3.25rem] lg:leading-tight">
                Tanimowo David
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-lg leading-relaxed text-stone-600 dark:text-stone-300">
              I&apos;m a{" "}
              <strong className="font-semibold text-stone-800 dark:text-stone-100">
                Fullstack Software Engineer
              </strong>
              . I build scalable systems and neat interfaces — the kind that
              feel calm to use and straightforward to maintain.
            </p>
            <p className="mt-4 max-w-xl text-base leading-relaxed text-stone-600 dark:text-stone-400">
              Whether you&apos;re hiring, exploring a collaboration, or just
              want to say hello, I&apos;m glad you&apos;re here. Here&apos;s how
              to reach me:
            </p>

            <div className="mt-10 flex flex-wrap items-center gap-3">
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className="inline-flex items-center gap-2 rounded-full bg-teal-600 px-5 py-3 text-sm font-medium text-white shadow-md shadow-teal-900/20 transition hover:bg-teal-700 dark:bg-teal-500 dark:shadow-teal-950/30 dark:hover:bg-teal-400"
              >
                <Mail className="h-4 w-4 shrink-0" aria-hidden />
                Email me
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full border border-stone-300 bg-white/90 px-5 py-3 text-sm font-medium text-stone-800 shadow-sm transition hover:bg-stone-50 dark:border-white/15 dark:bg-white/5 dark:text-stone-100 dark:hover:bg-white/10"
              >
                <MessageSquare className="h-4 w-4 shrink-0" aria-hidden />
                Message form
              </a>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[16rem] sm:max-w-xs lg:max-w-none">
            <div
              className="absolute inset-2 rotate-3 rounded-[1.75rem] bg-linear-to-br from-amber-100 to-teal-100 dark:from-teal-900/50 dark:to-stone-800/60"
              aria-hidden
            />
            <div className="relative aspect-4/5 overflow-hidden rounded-[1.75rem] border-4 border-white shadow-lg dark:border-stone-600/80 dark:shadow-xl dark:shadow-black/40">
              <Image
                src={HERO_IMAGE}
                alt="Tanimowo David — portrait placeholder"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 280px, 320px"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export function AboutSection() {
  return (
    <section
      id="about"
      className="scroll-mt-24 border-t border-stone-200/80 bg-stone-100/60 px-4 py-20 dark:border-white/5 dark:bg-black/15 sm:px-6"
    >
      <div className="mx-auto grid max-w-6xl gap-10 lg:grid-cols-2 lg:gap-16">
        <div className="glass-panel p-8 sm:p-10">
          <h2 className="text-2xl font-semibold text-stone-900 dark:text-stone-50">
            About
          </h2>
          <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-400">
            While I build across the entire stack, my heart is in the architecture.
             I focus on creating high-performance server logic and data structures that power 
             great products without compromising on code quality or developer experience.
          </p>
          <p className="mt-4 leading-relaxed text-stone-600 dark:text-stone-400">
            When I'm not architecting backends or tightening build pipelines, you’ll likely find me deep 
            in a strategy game, keeping up with the latest dev trends on YouTube, or 
            refining my documentation to help the next developer hit the ground running.
          </p>
        </div>
        <div className="glass-panel p-8 sm:p-10">
          <h2 className="flex items-center gap-2 text-2xl font-semibold text-stone-900 dark:text-stone-50">
            <Layers
              className="h-7 w-7 text-teal-600 dark:text-teal-400"
              aria-hidden
            />
            Skills
          </h2>
          <div className="mt-6 grid gap-5 sm:grid-cols-2">
            {skillCategories.map(
              ({ title, CategoryIcon: CatIcon, items }) => (
                <div
                  key={title}
                  className="rounded-xl border border-stone-200/80 bg-stone-50/70 p-4 dark:border-white/5 dark:bg-white/4"
                >
                  <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-stone-800 dark:text-stone-200">
                    <CatIcon
                      className="h-4 w-4 shrink-0 text-teal-600 dark:text-teal-400"
                      aria-hidden
                    />
                    {title}
                  </h3>
                  <ul className="mt-3 space-y-2.5">
                    {items.map(({ name, TechIcon }) => (
                      <li
                        key={name}
                        className="flex items-center gap-3 text-sm text-stone-700 dark:text-stone-300"
                      >
                        <TechIcon
                          className="h-5 w-5 shrink-0"
                          aria-hidden
                          title={name}
                        />
                        <span>{name}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ),
            )}
          </div>
        </div>
      </div>
    </section>
  );
}

export function ProjectsSection() {
  return (
    <section id="projects" className="scroll-mt-24 px-4 py-20 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Projects
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Selected work with concise case studies
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {projects.map((project) => (
            <article
              key={project.id}
              className="glass-panel flex flex-col overflow-hidden"
            >
              <Link
                href={`/projects/${project.id}`}
                className="relative block aspect-16/10 w-full shrink-0 overflow-hidden"
              >
                <Image
                  src={project.cardImageUrl}
                  alt=""
                  fill
                  className="object-cover transition duration-300 hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </Link>
              <div className="flex flex-1 flex-col p-8">
                <h3 className="text-xl font-semibold text-stone-900 dark:text-stone-50">
                  {project.title}
                </h3>
                <p className="mt-2 text-sm text-stone-600 dark:text-stone-400">
                  {project.tagline}
                </p>
                <div className="mt-8 flex flex-wrap gap-3">
                  <a
                    href={project.codeUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-50 dark:border-white/15 dark:bg-white/5 dark:text-stone-100 dark:hover:bg-white/10"
                  >
                    <FileCode2 className="h-4 w-4 shrink-0" aria-hidden />
                    View Code
                  </a>
                  <Link
                    href={`/projects/${project.id}`}
                    className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-sm font-medium text-white shadow-md shadow-teal-900/20 transition hover:bg-teal-700 dark:bg-teal-500 dark:hover:bg-teal-400"
                  >
                    View Brief
                  </Link>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function PlaygroundSection() {
  const items = [
    {
      title: "Tic-Tac-Toe",
      description: "Classic two-player grid with win detection.",
      href: "/playground/tic-tac-toe",
      imageUrl: "/Tic-Tac-Toe.png",
    },
    {
      title: "Password Strength Checker",
      description: "Heuristic scoring with live feedback.",
      href: "/playground/password-strength",
      imageUrl: "/password.jpg",
    },
  ];

  return (
    <section
      id="playground"
      className="scroll-mt-24 border-t border-stone-200/80 bg-stone-100/60 px-4 py-20 dark:border-white/5 dark:bg-black/15 sm:px-6"
    >
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            Playground
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Small interactive demos. Have Fun!
          </p>
        </div>
        <div className="grid gap-8 md:grid-cols-2">
          {items.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="glass-panel group block overflow-hidden transition hover:border-teal-300/60 hover:shadow-md dark:hover:border-teal-500/30 dark:hover:bg-white/9"
            >
              <span className="relative block aspect-16/10 w-full overflow-hidden">
                <Image
                  src={item.imageUrl}
                  alt=""
                  fill
                  className="object-cover transition duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              </span>
              <span className="block p-8">
                <span className="text-lg font-semibold text-stone-900 group-hover:text-teal-800 dark:text-stone-50 dark:group-hover:text-teal-300">
                  {item.title}
                </span>
                <span className="mt-2 block text-sm text-stone-600 dark:text-stone-400">
                  {item.description}
                </span>
                <span
                  className={`mt-6 inline-flex items-center text-sm font-medium ${linkAccent}`}
                >
                  Open demo
                  <span className="ml-1 transition group-hover:translate-x-0.5">
                    →
                  </span>
                </span>
              </span>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className="scroll-mt-24 px-4 pb-24 pt-8 sm:px-6">
      <div className="mx-auto max-w-6xl">
        <div className="mb-12 max-w-2xl">
          <h2 className="flex items-center gap-2 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50">
            <Mail
              className="h-8 w-8 text-teal-600 dark:text-teal-400"
              aria-hidden
            />
            Contact
          </h2>
          <p className="mt-3 text-stone-600 dark:text-stone-400">
            Whether you have a project in mind or just want to chat about tech, feel free to reach out via the form or connect through my socials.
          </p>
        </div>
        <div className="grid gap-10 lg:grid-cols-5">
          <div className="glass-panel flex flex-col gap-6 p-8 lg:col-span-2">
            <div>
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-500">
                <Mail
                  className="h-3.5 w-3.5 text-teal-600 dark:text-teal-400"
                  aria-hidden
                />
                Email
              </p>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                className={`mt-2 inline-flex items-center gap-2 text-sm font-medium ${linkAccent}`}
              >
                {CONTACT_EMAIL}
              </a>
            </div>
            <div>
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-500">
                <LinkedinIcon className="h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
                LinkedIn
              </p>
              <a
                href="https://www.linkedin.com/in/tanimowodavid"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 inline-flex items-center gap-2 text-sm font-medium ${linkAccent}`}
              >
                linkedin.com/in/tanimowodavid
              </a>
            </div>
            <div>
              <p className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-stone-500 dark:text-stone-500">
                <GithubIcon className="h-3.5 w-3.5 shrink-0 text-teal-600 dark:text-teal-400" />
                GitHub
              </p>
              <a
                href="https://github.com/tanimowodavid"
                target="_blank"
                rel="noopener noreferrer"
                className={`mt-2 inline-flex items-center gap-2 text-sm font-medium ${linkAccent}`}
              >
                github.com/tanimowodavid
              </a>
            </div>
          </div>
          <div className="lg:col-span-3">
            <ContactForm />
          </div>
        </div>
      </div>
    </section>
  );
}
