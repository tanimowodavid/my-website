import { Navbar } from "@/components/Navbar";
import {
  AboutSection,
  ContactSection,
  IntroSection,
  PlaygroundSection,
  ProjectsSection,
} from "@/components/PortfolioSections";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <IntroSection />
        <AboutSection />
        <ProjectsSection />
        <PlaygroundSection />
        <ContactSection />
      </main>
      <footer className="border-t border-stone-200/80 py-8 text-center text-sm text-stone-500 dark:border-white/10 dark:text-stone-500">
        <p>© {new Date().getFullYear()} — Built with Next.js & Tailwind CSS</p>
      </footer>
    </>
  );
}
