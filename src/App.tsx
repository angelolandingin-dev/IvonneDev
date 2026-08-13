import { useState } from "react";
import { Database, ExternalLink, Github, Linkedin, Mail } from "lucide-react";
import { Project, Skill } from "./types";

const PROJECTS: Project[] = [
  {
    id: "v-05",
    title: "RAINCRAFT",
    description: "A Minecraft-themed Rainmeter skin that turns the desktop into an inventory screen for browsing files and launching apps.",
    tags: ["RAINMETER", "PYTHON"],
    year: "2026",
    link: "https://github.com/angelolandingin-dev/raincraft-github"
  },
  {
    id: "v-04",
    title: "TIME RENDER",
    description: "An OJT hours tracker that records rendered hours, with user authentication and multi-user support backed by Supabase.",
    tags: ["NEXTJS", "SUPABASE", "TYPESCRIPT", "TAILWIND"],
    year: "2026",
    link: "https://angelolandingin.tech/"
  },
  {
    id: "v-02",
    title: "CLASS-SYNC",
    description: "A student utility that combines class scheduling, note-taking, and study session tracking in one place.",
    tags: ["REACT", "TAILWIND", "FIREBASE"],
    year: "2026",
    link: "https://class-sync-red.vercel.app/"
  },
  {
    id: "c-02",
    title: "CHINA WATSON",
    description: "The corporate website for China Watson, presenting the company and its services online.",
    tags: ["WIX"],
    year: "2026",
    link: "https://www.chinawatson.com/"
  },
  {
    id: "c-04",
    title: "CRAIGWIL CONSULTING",
    description: "The website for Dr. Annette Craig-Wilson's coaching and consulting practice, presenting her services and background.",
    tags: ["REACT", "TAILWIND", "TYPESCRIPT"],
    year: "2025",
    link: "https://craig-wilson-consulting.vercel.app/"
  },
  {
    id: "c-03",
    title: "CRAIGWIL MINISTRIES",
    description: "The website for Craigwil Ministries, featuring articles, books, events, and an admin panel for managing content.",
    tags: ["REACT", "TAILWIND", "TYPESCRIPT"],
    year: "2025",
    link: "https://craigwil-ministries.vercel.app/"
  },
  {
    id: "c-01",
    title: "MAVEN BEACH RESORT",
    description: "A booking and management platform for Maven Beach Resort, handling reservations and guest information.",
    tags: ["PHP", "MYSQL"],
    year: "2025",
    link: "https://www.mavenbeachresort.com/"
  },
  {
    id: "v-01",
    title: "SITEPICKEMS",
    description: "A tournament prediction game inspired by LoL Pick'ems, where players pick match winners and answer trivia questions.",
    tags: ["JAVASCRIPT"],
    year: "2025",
    link: "https://ivonneschwie.github.io/SITEPickems/"
  }
];

const SKILLS: Skill[] = [
  {
    category: "Languages",
    items: ["JAVASCRIPT", "PHP", "JAVA", "PYTHON", "REACT", "NEXTJS"]
  },
  {
    category: "Databases",
    items: ["SUPABASE", "FIREBASE", "SQL"]
  }
];

const SKILL_LOGOS: Record<string, string> = {
  JAVASCRIPT: "https://cdn.simpleicons.org/javascript",
  PHP: "https://cdn.simpleicons.org/php",
  JAVA: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/java/java-original.svg",
  PYTHON: "https://cdn.simpleicons.org/python",
  REACT: "https://cdn.simpleicons.org/react",
  NEXTJS: "https://cdn.simpleicons.org/nextdotjs",
  SUPABASE: "https://cdn.simpleicons.org/supabase",
  FIREBASE: "https://cdn.simpleicons.org/firebase"
};

const CONTACT = {
  email: "angelolandingin.dev@gmail.com",
  github: "https://github.com/angelolandingin-dev",
  githubLabel: "angelolandingin-dev",
  linkedin: "https://www.linkedin.com/in/ivonneschwie/",
  linkedinLabel: "m-angelo-landingin"
};

const TABS = [
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" }
] as const;

type TabId = (typeof TABS)[number]["id"];

const formatLabel = (value: string) => value.replace(/_/g, " ");

function SectionHeading({ id, children }: { id?: string; children: string }) {
  return (
    <h2 id={id} className="text-xl font-semibold text-cv-text border-b border-cv-border pb-2 mb-4">
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
  const [activeTab, setActiveTab] = useState<TabId>("projects");

  return (
    <div className="min-h-screen bg-cv-bg text-cv-text font-sans">
      <div className="max-w-3xl mx-auto px-6 py-16">
        {/* Header */}
        <header className="mb-12">
          <div>
            <div>
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
            </div>
          </div>
        </header>

        <main className="space-y-12">
          {/* Summary */}
          <section aria-labelledby="summary-heading">
            <SectionHeading id="summary-heading">Summary</SectionHeading>
            <p className="leading-relaxed text-cv-muted">
              Fullstack web developer and BS Computer Science student at Universidad de Dagupan, class of 2026. I work on websites and web applications with React and Tailwind CSS, from client projects to personal tools.
            </p>
          </section>

          {/* Skills */}
          <section aria-labelledby="skills-heading">
            <SectionHeading id="skills-heading">Skills</SectionHeading>
            <div className="space-y-6">
              {SKILLS.map((skill) => (
                <div key={skill.category}>
                  <h3 className="text-sm font-semibold text-cv-muted uppercase tracking-wider mb-3">
                    {skill.category}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {skill.items.map((item) => (
                      <span
                        key={item}
                        className="flex items-center gap-1.5 rounded-md border border-cv-border px-3 py-1 text-sm"
                      >
                        {item === "SQL" ? (
                          <Database size={14} aria-hidden="true" className="text-cv-accent" />
                        ) : (
                          <img
                            src={SKILL_LOGOS[item]}
                            alt=""
                            loading="lazy"
                            className="h-3.5 w-3.5"
                          />
                        )}
                        {formatLabel(item)}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Tabs: Projects | Experience | Education */}
          <div>
            <div
              role="tablist"
              aria-label="Content sections"
              className="flex gap-6 border-b border-cv-border mb-8"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  role="tab"
                  id={`tab-${tab.id}`}
                  aria-selected={activeTab === tab.id}
                  aria-controls={`panel-${tab.id}`}
                  tabIndex={activeTab === tab.id ? 0 : -1}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-2 text-lg font-semibold border-b-2 -mb-px ${
                    activeTab === tab.id
                      ? "text-cv-text border-cv-text"
                      : "text-cv-muted border-transparent hover:text-cv-text"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            {activeTab === "projects" && (
              <div role="tabpanel" id="panel-projects" aria-labelledby="tab-projects">
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
              </div>
            )}

            {activeTab === "experience" && (
              <div role="tabpanel" id="panel-experience" aria-labelledby="tab-experience">
                <p className="text-cv-muted">Your experience here.</p>
              </div>
            )}

            {activeTab === "education" && (
              <div role="tabpanel" id="panel-education" aria-labelledby="tab-education">
                <p className="leading-relaxed">
                  BS Computer Science <span className="text-cv-muted">— Universidad de Dagupan, Class of 2026</span>
                </p>
              </div>
            )}
          </div>

          {/* Contact */}
          <section aria-labelledby="contact-heading">
            <SectionHeading id="contact-heading">Contact</SectionHeading>
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
