export type ProjectDetail = {
  id: string;
  title: string;
  tagline: string;
  /** Decorative card image (placeholder). */
  cardImageUrl: string;
  codeUrl: string;
  overview: string;
  problem: string;
  solution: string;
  keyFeatures: string[];
  technicalDecisions: string[];
  architectureMermaidPlaceholder: string;
  challenges: string[];
};

export const projects: ProjectDetail[] = [
  {
    id: "design-system",
    title: "Component Design System",
    tagline: "Reusable UI primitives for product teams.",
    cardImageUrl: "https://picsum.photos/seed/designsystem/800/480",
    codeUrl: "https://github.com",
    overview:
      "A token-driven React component library with documentation and visual regression tests, built to keep brand and accessibility consistent across web apps.",
    problem:
      "Teams were shipping one-off components with divergent spacing, color usage, and focus states. Onboarding new contributors meant re-explaining patterns that lived only in Slack threads.",
    solution:
      "Centralized design tokens, a small set of composable primitives, and a docs site with live examples. Consumers import stable APIs while the system evolves behind semver.",
    keyFeatures: [
      "Themeable CSS variables with light/dark parity",
      "Keyboard-first focus rings and WCAG AA contrast checks",
      "Storybook-driven docs with prop tables and usage notes",
    ],
    technicalDecisions: [
      "Chose CSS variables over runtime theme objects to avoid extra JS on critical path.",
      "Used Radix-style composition for overlays and menus instead of bespoke DOM.",
      "Pinned visual snapshots to catch unintended style drift in CI.",
    ],
    architectureMermaidPlaceholder:
      "flowchart LR\n  A[Tokens] --> B[Primitives]\n  B --> C[Patterns]\n  C --> D[Apps]",
    challenges: [
      "Balancing flexibility with a narrow public API—too many props erodes consistency.",
      "Keeping bundle size flat as the library grew; code-split heavy demos in docs only.",
    ],
  },
  {
    id: "analytics-pipeline",
    title: "Event Analytics Pipeline",
    tagline: "Reliable ingestion and rollups for product metrics.",
    cardImageUrl: "https://picsum.photos/seed/analytics/800/480",
    codeUrl: "https://github.com",
    overview:
      "A lightweight pipeline that accepts client events, validates them, and produces hourly aggregates for dashboards without overloading the primary database.",
    problem:
      "Direct writes from the app to Postgres caused hot rows and slow queries whenever marketing ran campaigns. Ad-hoc SQL for funnels was fragile.",
    solution:
      "Buffered ingestion with schema validation, append-only storage, and scheduled rollups into summary tables optimized for reads.",
    keyFeatures: [
      "Idempotent event IDs and at-least-once delivery handling",
      "Pluggable validators with versioned JSON schemas",
      "Pre-aggregated metrics tables with retention tiers",
    ],
    technicalDecisions: [
      "Used a queue between ingest and storage to absorb spikes.",
      "Chose columnar-friendly storage for raw events vs row store for aggregates.",
      "Scheduled jobs with explicit SLAs instead of continuous streaming for cost control.",
    ],
    architectureMermaidPlaceholder:
      "flowchart TB\n  Client --> Ingest\n  Ingest --> Queue\n  Queue --> Store\n  Store --> Rollups",
    challenges: [
      "Backfilling after schema changes without double-counting.",
      "Explaining eventual consistency to stakeholders who expect instant numbers.",
    ],
  },
];

export function getProjectById(id: string): ProjectDetail | undefined {
  return projects.find((p) => p.id === id);
}
