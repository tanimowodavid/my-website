/**
 * Placeholder profile data for the site assistant.
 */
export const bio = {
  name: "Tanimowo David",
  preferredName: "David",
  title: "Fullstack software engineer",
  tagline:
    "Building scalable systems with neat user interfaces — calm UX, solid backends.",
  location: "Update with your city / timezone",
  contact: {
    email: "davidtanimowo01@gmail.com",
    linkedin: "https://www.linkedin.com/in/tanimowodavid",
    github: "https://github.com/tanimowodavid",
  },
  summary:
    "I enjoy shipping full-stack features end-to-end: APIs, databases, auth, and polished React/Next.js frontends. I care about accessibility, performance, and code that the next person can extend without guesswork.",
  skills: [
    "TypeScript",
    "React & Next.js",
    "Node.js & APIs",
    "Python & Django",
    "Testing & CI",
    "Systems Design",
  ],
  experience: [
    {
      role: "Software engineer",
      company: "self-employed",
      period: "2023 — Present",
      highlights: [
        "Launched a personal website with an AI assistant that answers visitor questions about me and my work.",
        "Contributed to freelance projects.",
      ],
    },
  ],
  projects: [
    {
      id: "planet-inc",
      name: "Planet Inc. — E-commerce Backend",
      oneLiner:
        "Django marketplace backend with pgvector semantic search, Celery, and an OpenAI-assisted shopping assistant.",
    },
    {
      id: "personal-website",
      name: "Personal Website with AI Assistant",
      oneLiner:
        "A Next.js personal website with neat design and a custom AI assistant that answers visitor questions about me and my work, using OpenAI's API.",
    },
    {
      id: "aura-finance",
      name: "Aura Finance — Personal Finance App",
      oneLiner:
        "A telegram coaching app that enchourages users to save more and make better financial decisions.",
    },
  ],
  education: ["Bachelor of engineering in electrical and electronics engineering, Olabisi Onabanjo University"],
  interests: ["Open source", "Developer tooling", "Learning more about technology and how it can be used to solve real-world problems"],
} as const;

/** Serialized context injected into the assistant system prompt. */
export function getBioContextForAssistant(): string {
  return `The following JSON is authoritative about ${bio.name} (the site owner). Answer visitor questions using it. If something is missing or marked as placeholder, say you don't have that detail and suggest they use the contact form.\n\n${JSON.stringify(bio, null, 2)}`;
}
