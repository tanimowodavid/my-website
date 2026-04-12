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
  challenges: string[];
};

export const projects: ProjectDetail[] = [
  {
    id: "planet-inc",
    title: "Planet Inc. — E-commerce Backend",
    tagline:
      "Production-ready Django marketplace backend with semantic search and an AI shopping assistant.",
    cardImageUrl: "/happy kid.png",
    codeUrl: "https://github.com/tanimowodavid/planet-inc",
    overview:
      "Planet Inc. is a comprehensive e-commerce backend built with Django for an online marketplace for collectibles and consumer goods. It combines traditional e-commerce (users, catalog, cart, orders, payments) with an AI-powered chat assistant for product recommendations and support. The system uses vector embeddings for complex product queries and real-time conversational help so customers can discover products that fit their interests.",
    problem:
      "Large catalogs make product discovery hard—especially in niches like collectibles where shoppers need personalized guidance. Many stores lack intelligent support, which hurts UX and raises support costs. Scaling backends for concurrency, inventory, and real-time AI adds more pressure. The work had to support complex search across big inventories, personalized experiences via AI, growth in users and transactions, and secure integration with third-party services.",
    solution:
      "I built a production-ready Django backend for the full e-commerce lifecycle with AI woven in. PostgreSQL with pgvector powers semantic product search; Redis backs caching and sessions; Celery runs async work. The assistant uses OpenAI for contextual recommendations and support-style conversations. The design keeps clear boundaries, documented APIs, and solid error handling, with containerization, automated tests, and a database layout meant to scale.",
    keyFeatures: [
      "RESTful API: Django REST Framework with JWT auth, pagination, and documented endpoints",
      "AI shopping assistant: pgvector + OpenAI for contextual conversations and product discovery",
      "Product catalog: multi-variant listings with automatic embedding generation for semantic search",
      "Cart and checkout: inventory-aware totals and Paystack payment integration",
      "User management: secure auth, roles, and profiles",
      "Background jobs: Celery for email, payments follow-up, and AI-related tasks",
      "Caching: Redis for sessions, selective API caching, and performance tuning",
      "Testing: 90+ automated tests across models, APIs, auth, and business rules",
      "Docker: docker-compose based local and deploy-style orchestration",
      "Database work: PostgreSQL + vectors, indexing, and query optimization",
    ],
    technicalDecisions: [
      "Django 6.0 for a mature, security-conscious stack aligned with current Python practice",
      "PostgreSQL + pgvector instead of a separate vector DB for ACID behavior and tight Django integration",
      "JWT over session-only auth for an API-first, scalable client model",
      "Celery + Redis so AI and email work never block web requests",
      "Docker Compose for repeatable dev and deployment environments",
      "TDD-style workflow with pytest, fast SQLite in tests, and mocks for external APIs",
      "REST-first design so multiple frontends can share the same backend",
    ],
    challenges: [
      "AI integration: balancing responsive chat with rate limits—graceful degradation when AI or upstream calls fail so the core shop still works.",
      "Vector search: tuning pgvector indexes and when to generate embeddings on product writes without slowing common reads.",
      "Checkout concurrency: keeping inventory correct under load using DB constraints and optimistic locking rather than fragile app-only locks.",
      "External APIs: Paystack and OpenAI failures handled with retries, clear errors, and safe fallbacks.",
      "Testing integrations: mocking AI and payments for stable CI while staying close to production behavior.",
      "Ops tradeoff: Docker adds moving parts but pays back in consistency and onboarding for collaborators.",
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
    challenges: [
      "Backfilling after schema changes without double-counting.",
      "Explaining eventual consistency to stakeholders who expect instant numbers.",
    ],
  },
];

export function getProjectById(id: string): ProjectDetail | undefined {
  return projects.find((p) => p.id === id);
}
