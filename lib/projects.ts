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
    id: "mysite",
    title: "Portfolio Website",
    tagline:
      "Interactive Next.js portfolio with AI chat, contact workflow, and polished UX.",
    cardImageUrl: "/site.png",
    codeUrl: "https://github.com/tanimowodavid/my-website",
    overview:
      "A modern personal portfolio built in Next.js that combines a responsive landing experience, reusable portfolio sections, and a custom on-site AI assistant. The site demonstrates real frontend and backend integration with a contact workflow, theme toggling, and accessible, polished UI components.",
    problem:
      "Many portfolio sites feel like static brochures and fail to showcase the engineering behind the experience. I wanted this site to be both a polished personal brand and a working technical demo with interactive features, live messaging, and maintainable architecture.",
    solution:
      "I built the portfolio as a composable Next.js app with structured sections for intro, about, projects, playground, and contact. The site uses a client-side chat widget that streams OpenAI responses from a serverless route, plus a server action that sends contact messages through Resend. That keeps secrets server-side while preserving a seamless visitor experience.",
    keyFeatures: [
      "Interactive AI assistant: client chat UI with streamed responses, site-specific context, and fallback messaging",
      "Contact workflow: a reusable server action sending email through Resend with submission state and user feedback",
      "Responsive portfolio layout: intro, about, project showcase, playground, and contact sections built with accessible Tailwind styling",
      "Theme toggle: persistent dark/light mode using next-themes",
      "Reusable UI components: Navbar, glass-panel sections, and form controls designed for consistency",
      "Server/client split: secure server-only routes for secrets and client hooks for interactive behavior",
    ],
    technicalDecisions: [
      "Next.js App Router for server actions, dynamic API routing, and static project page generation.",
      "Tailwind CSS for a clean, consistent UI with dark mode and responsive layout support.",
      "Client/server split so chat and email features keep API keys on the backend while the frontend stays snappy.",
      "OpenAI streaming for the assistant to feel immediate without blocking the UI.",
      "Resend email API to handle contact form delivery without manual SMTP management.",
      "Centralized project metadata in lib/projects.ts so portfolio briefs render consistently and remain easy to update.",
    ],
    challenges: [
      "Chat UX: delivering smooth streamed responses while handling network failures and API errors gracefully.",
      "Secret management: keeping OpenAI and Resend keys server-side while enabling live interactive features.",
      "Form experience: providing clear success and error feedback without full page reloads.",
      "Theme hydration: avoiding flashes and ensuring consistent dark/light mode behavior across renders.",
      "Portfolio scope: balancing a polished personal brand with a real technical showcase that visitors can explore.",
    ],
  },
];

export function getProjectById(id: string): ProjectDetail | undefined {
  return projects.find((p) => p.id === id);
}
