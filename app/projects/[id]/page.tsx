import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { getProjectById, projects } from "@/lib/projects";
import type { Metadata } from "next";
import type { ReactNode } from "react";

type Props = { params: Promise<{ id: string }> };

export function generateStaticParams() {
  return projects.map((p) => ({ id: p.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) return { title: "Project" };
  return {
    title: `${project.title} | Brief`,
    description: project.tagline,
  };
}

export default async function ProjectBriefPage({ params }: Props) {
  const { id } = await params;
  const project = getProjectById(id);
  if (!project) notFound();

  const sections: { title: string; body: ReactNode }[] = [
    { title: "Overview", body: <p className="leading-relaxed">{project.overview}</p> },
    { title: "Problem", body: <p className="leading-relaxed">{project.problem}</p> },
    { title: "Solution", body: <p className="leading-relaxed">{project.solution}</p> },
    {
      title: "Key Features",
      body: (
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          {project.keyFeatures.map((f) => (
            <li key={f}>{f}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Technical Decisions",
      body: (
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          {project.technicalDecisions.map((d) => (
            <li key={d}>{d}</li>
          ))}
        </ul>
      ),
    },
    {
      title: "Architecture",
      body: (
        <div className="space-y-4">
          <p className="leading-relaxed text-stone-600 dark:text-stone-400">
            Placeholder for a Mermaid.js diagram. After adding{" "}
            <code className="rounded bg-stone-200 px-1.5 py-0.5 font-mono text-sm text-stone-800 dark:bg-white/10 dark:text-stone-200">
              mermaid
            </code>
            , render your chart here and keep the source below as documentation.
          </p>
          <pre className="glass-panel overflow-x-auto rounded-xl p-4 font-mono text-xs leading-relaxed text-stone-700 dark:text-stone-300">
            {project.architectureMermaidPlaceholder}
          </pre>
        </div>
      ),
    },
    {
      title: "Challenges & Tradeoffs",
      body: (
        <ul className="list-disc space-y-2 pl-5 leading-relaxed">
          {project.challenges.map((c) => (
            <li key={c}>{c}</li>
          ))}
        </ul>
      ),
    },
  ];

  return (
    <>
      <Navbar />
      <article className="mx-auto max-w-3xl px-4 py-16 sm:px-6 sm:py-20">
        <Link
          href="/#projects"
          className="text-sm font-medium text-teal-700 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          ← Back to projects
        </Link>
        <header className="mt-8 glass-panel p-8 sm:p-10">
          <p className="text-sm font-medium text-teal-700 dark:text-teal-400">
            Project brief
          </p>
          <h1 className="mt-2 text-3xl font-semibold tracking-tight text-stone-900 dark:text-stone-50 sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-stone-600 dark:text-stone-400">
            {project.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href={project.codeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-xl border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-800 transition hover:bg-stone-50 dark:border-white/15 dark:bg-white/5 dark:text-stone-100 dark:hover:bg-white/10"
            >
              View Code
            </a>
          </div>
        </header>

        <div className="mt-12 space-y-12">
          {sections.map((section, index) => (
            <section
              key={`${index}-${section.title}`}
              className="glass-panel p-8 sm:p-10"
            >
              <h2 className="text-xl font-semibold text-stone-900 dark:text-stone-50">
                {index + 1}. {section.title}
              </h2>
              <div className="mt-4 text-stone-700 dark:text-stone-300">
                {section.body}
              </div>
            </section>
          ))}
        </div>
      </article>
    </>
  );
}
