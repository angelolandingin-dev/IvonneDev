import { ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { Project, Skill } from "./types";

const PROJECTS: Project[] = [
  {
    id: "v-02",
    title: "CLASS-SYNC",
    description: "Multipurpose student utility for time scheduling, markdown-based note-taking, and automated study revision tools.",
    tags: ["REACT", "TAILWIND", "FIREBASE"],
    year: "2026",
    link: "https://class-sync-red.vercel.app/"
  },
  {
    id: "c-02",
    title: "CHINA_WATSON",
    description: "Bespoke web implementation for China Watson enterprise operations.",
    tags: ["WIX", "COMMISSION"],
    year: "2026",
    link: "https://www.chinawatson.com/"
  },
  {
    id: "v-01",
    title: "SITEPICKEMS",
    description: "Tournament prediction system similar to LoL Pick'ems. Features candidate lock-ins, victory tracking, and integrated game trivia challenges.",
    tags: ["JAVASCRIPT", "UI/UX", "GAME_LOGIC"],
    year: "2025",
    link: "https://ivonneschwie.github.io/SITEPickems/"
  },
  {
    id: "c-01",
    title: "MAVEN_BEACH_RESORT",
    description: "Full-scale resort management and booking interface. High-end visual architecture for luxury hospitality.",
    tags: ["PHP", "MYSQL", "COMMISSION"],
    year: "2025",
    link: "https://www.mavenbeachresort.com/"
  },
  {
    id: "v-03",
    title: "IVONNE_DEV",
    description: "A clean single-page React CV portfolio built with Vite and Tailwind CSS.",
    tags: ["REACT", "VITE", "TAILWIND", "TYPESCRIPT"],
    year: "2025",
    link: "https://ivonne.dev/"
  },
  {
    id: "v-04",
    title: "TIME_RENDER",
    description: "OJT time render calculator and tracker with authentication, Supabase backend, and multi-user support.",
    tags: ["NEXTJS", "SUPABASE", "TYPESCRIPT", "TAILWIND"],
    year: "2026",
    link: "https://angelolandingin.tech/"
  },
  {
    id: "c-03",
    title: "CRAIGWIL_MINISTRIES",
    description: "Faith-centered web presence for Craigwil Ministries INC with articles, books, events, and an admin content management system.",
    tags: ["REACT", "TAILWIND", "TYPESCRIPT", "COMMISSION"],
    year: "2025",
    link: "https://craigwil-ministries.vercel.app/"
  },
  {
    id: "c-04",
    title: "CRAIGWIL_CONSULTING",
    description: "Coaching and consulting platform for Dr. Annette Craig-Wilson's practice. Executive coaching, life strategy, and leadership training services.",
    tags: ["REACT", "VITE", "TAILWIND", "TYPESCRIPT", "COMMISSION"],
    year: "2025",
    link: "https://craig-wilson-consulting.vercel.app/"
  },
  {
    id: "v-05",
    title: "RAINCRAFT",
    description: "Minecraft-themed Rainmeter skin that turns your desktop into an inventory screen. Browse files, launch apps, and keep shortcuts organized in a familiar grid layout.",
    tags: ["RAINMETER", "PYTHON", "CUSTOMIZATION", "MINECRAFT"],
    year: "2026",
    link: "https://github.com/angelolandingin-dev/raincraft-github"
  }
];

const SKILLS: Skill[] = [
  {
    category: "WEB_ECOSYSTEM",
    items: ["NEXTJS", "REACT", "TAILWIND_CSS", "SUPABASE", "FIREBASE", "JAVASCRIPT", "PHP"]
  },
  {
    category: "ENGINEERING_CORE",
    items: ["JAVA", "PYTHON", "SQL", "SYSTEM_DESIGN", "GIT_VERSION_CONTROL"]
  }
];

const CONTACT = {
  email: "angelolandingin.dev@gmail.com",
  github: "https://github.com/angelolandingin-dev",
  githubLabel: "angelolandingin-dev",
  linkedin: "https://www.linkedin.com/in/ivonneschwie/",
  linkedinLabel: "m-angelo-landingin"
};

const formatLabel = (value: string) => value.replace(/_/g, " ");

function SectionHeading({ children }: { children: string }) {
  return (
    <h2 className="text-xl font-semibold text-cv-text border-b border-cv-border pb-2 mb-4">
      {children}
    </h2>
  );
}

function ContactLink({
  href,
  label,
  icon,
  external
}: {
  href: string;
  label: string;
  icon: React.ReactNode;
  external?: boolean;
}) {
  return (
    <a
      href={href}
      target={external ? "_blank" : undefined}
      rel={external ? "noreferrer" : undefined}
      className="inline-flex items-center gap-1.5 text-cv-accent hover:underline break-all"
    >
      {icon}
      {label}
    </a>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-cv-bg text-cv-text font-sans">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl font-semibold tracking-tight">Mark Angelo Landingin</h1>
          <p className="mt-2 text-lg text-cv-muted">Fullstack Web Developer</p>
          <div className="mt-4 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm">
            <ContactLink
              href={`mailto:${CONTACT.email}`}
              label={CONTACT.email}
              icon={<Mail size={15} />}
            />
            <ContactLink
              href={CONTACT.github}
              label={CONTACT.githubLabel}
              icon={<Github size={15} />}
              external
            />
            <ContactLink
              href={CONTACT.linkedin}
              label={CONTACT.linkedinLabel}
              icon={<Linkedin size={15} />}
              external
            />
          </div>
        </header>

        <main className="space-y-12">
          {/* Summary */}
          <section aria-labelledby="summary-heading">
            <SectionHeading>Summary</SectionHeading>
            <p className="leading-relaxed text-cv-muted">
              BS Computer Science graduate from Universidad de Dagupan, class of 2026.
              Fullstack web developer focused on robust React/Tailwind architectures and
              scalable backend integrations. Bridging web logic with system efficiency.
            </p>
          </section>

          {/* Experience */}
          <section aria-labelledby="experience-heading">
            <SectionHeading>Experience</SectionHeading>
            <p className="text-cv-muted">Your experience here.</p>
          </section>

          {/* Skills */}
          <section aria-labelledby="skills-heading">
            <SectionHeading>Skills</SectionHeading>
            <div className="space-y-6">
              {SKILLS.map((skill) => (
                <div key={skill.category}>
                  <h3 className="text-sm font-semibold text-cv-muted uppercase tracking-wider mb-3">
                    {formatLabel(skill.category)}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="rounded-full border border-cv-border px-3 py-1 text-sm"
                      >
                        {formatLabel(item)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Education */}
          <section aria-labelledby="education-heading">
            <SectionHeading>Education</SectionHeading>
            <p className="leading-relaxed">
              BS Computer Science <span className="text-cv-muted">— Universidad de Dagupan, Class of 2026</span>
            </p>
          </section>

          {/* Projects */}
          <section aria-labelledby="projects-heading">
            <SectionHeading>Projects</SectionHeading>
            <ul className="space-y-8">
              {PROJECTS.map((project) => (
                <li key={project.id}>
                  <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                    <h3 className="font-semibold">{project.title}</h3>
                    <span className="text-sm text-cv-muted">{project.year}</span>
                  </div>
                  <p className="mt-1 leading-relaxed text-cv-muted">{project.description}</p>
                  <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-1.5 text-sm">
                    <span className="flex flex-wrap gap-1.5">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="rounded-full border border-cv-border px-2.5 py-0.5 text-xs text-cv-muted"
                        >
                          {tag}
                        </span>
                      ))}
                    </span>
                    {project.link && (
                      project.link.includes("github.com") ? (
                        <ContactLink
                          href={project.link}
                          label="Source"
                          icon={<Github size={14} />}
                          external
                        />
                      ) : (
                        <ContactLink
                          href={project.link}
                          label="Live"
                          icon={<ExternalLink size={14} />}
                          external
                        />
                      )
                    )}
                  </div>
                </li>
              ))}
            </ul>
          </section>

          {/* Contact */}
          <section aria-labelledby="contact-heading">
            <SectionHeading>Contact</SectionHeading>
            <div className="flex flex-col gap-2 text-sm">
              <ContactLink
                href={`mailto:${CONTACT.email}`}
                label={CONTACT.email}
                icon={<Mail size={15} />}
              />
              <ContactLink
                href={CONTACT.github}
                label={CONTACT.githubLabel}
                icon={<Github size={15} />}
                external
              />
              <ContactLink
                href={CONTACT.linkedin}
                label={CONTACT.linkedinLabel}
                icon={<Linkedin size={15} />}
                external
              />
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="mt-16 pt-8 border-t border-cv-border text-sm text-cv-muted">
          <p>© {new Date().getFullYear()} Mark Angelo Landingin</p>
        </footer>
      </div>
    </div>
  );
}
