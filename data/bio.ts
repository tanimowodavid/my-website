/**
 * Placeholder profile data for the site assistant.
 * Replace with your real experience, links, and project blurbs.
 */
export const bio = {
  name: "Tanimowo David",
  preferredName: "David",
  title: "Fullstack software engineer",
  tagline:
    "Building scalable systems with neat user interfaces — calm UX, solid backends.",
  location: "Update with your city / timezone",
  contact: {
    email: "hello@example.com",
    linkedin: "https://www.linkedin.com/in/yourprofile",
    github: "https://github.com/yourusername",
  },
  summary:
    "I enjoy shipping full-stack features end-to-end: APIs, databases, auth, and polished React/Next.js frontends. I care about accessibility, performance, and code that the next person can extend without guesswork.",
  skills: [
    "TypeScript",
    "React & Next.js (App Router)",
    "Node.js & APIs",
    "Testing & CI",
    "Design systems",
  ],
  experience: [
    {
      role: "Software engineer (example)",
      company: "Example Corp",
      period: "20XX — Present",
      highlights: [
        "Led migration of a legacy dashboard to Next.js with improved LCP.",
        "Introduced integration tests and preview deploys for safer releases.",
      ],
    },
  ],
  projects: [
    {
      id: "design-system",
      name: "Component Design System",
      oneLiner:
        "Token-driven UI primitives with docs and visual regression coverage.",
    },
    {
      id: "analytics-pipeline",
      name: "Event Analytics Pipeline",
      oneLiner:
        "Buffered ingestion, validation, and rollups for product metrics.",
    },
  ],
  education: ["Your degree / certifications — placeholder"],
  interests: ["Open source", "Developer tooling", "Mentoring"],
} as const;

/** Serialized context injected into the assistant system prompt. */
export function getBioContextForAssistant(): string {
  return `The following JSON is authoritative about ${bio.name} (the site owner). Answer visitor questions using it. If something is missing or marked as placeholder, say you don't have that detail and suggest they use the contact form.\n\n${JSON.stringify(bio, null, 2)}`;
}
