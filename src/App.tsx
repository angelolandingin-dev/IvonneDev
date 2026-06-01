import { motion } from "motion/react";
import { Terminal, Github, Linkedin, Mail, ArrowRight, Code2, Database, Shield, Monitor, Coffee, HelpCircle, Minus, Square, X } from "lucide-react";
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
  }
];

const SKILLS: Skill[] = [
  {
    category: "WEB_ECOSYSTEM",
    items: ["REACT", "TAILWIND_CSS", "FIREBASE", "JAVASCRIPT", "PHP"]
  },
  {
    category: "ENGINEERING_CORE",
    items: ["JAVA", "PYTHON", "SQL", "SYSTEM_DESIGN", "GIT_VERSION_CONTROL"]
  }
];

const WindowHeader = ({ title }: { title: string }) => (
  <div className="bg-white/5 border-b border-white/10 p-2 flex items-center justify-between">
    <div className="flex items-center gap-2 px-2">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
    </div>
    <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest">{title}</span>
    <div className="flex items-center gap-4 px-2 text-white/20">
      <Minus size={12} />
      <Square size={10} />
      <X size={12} />
    </div>
  </div>
);

export default function App() {
  return (
    <div className="relative min-h-screen">
      {/* Visual background layers */}
      <div className="fixed inset-0 scanline opacity-30 z-50 pointer-events-none" />
      <div className="fixed inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(34,197,94,0.05),transparent)] pointer-events-none" />

      <div className="p-4 md:p-8 lg:p-12 max-w-7xl mx-auto space-y-12">
        {/* Profile / Header */}
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-20 border-b border-terminal-accent/10 pb-12">
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-terminal-accent">
              <Terminal size={24} />
              <span className="text-xs font-bold tracking-[0.3em] uppercase">User: Ivonne.dev</span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-6xl font-bold tracking-tighter text-white">
              <span className="text-terminal-accent opacity-50">&gt; </span>
              MARK_ANGELO_LANDINGIN<span className="cursor-blink">_</span>
            </h1>
            <p className="text-white/60 max-w-2xl text-sm leading-relaxed font-sans">
              BS Computer Science graduate from <span className="text-white font-bold">Universidad de Dagupan</span>. 
              Fullstack web developer focused on robust React/Tailwind architectures and scalable backend integrations.
            </p>
          </div>
          <div className="flex flex-col items-end gap-2 text-right">
            <span className="text-[10px] font-bold text-white/20 uppercase tracking-widest">Education_Credential</span>
            <span className="text-sm font-bold text-terminal-accent">UDD_CLASS_OF_2026</span>
          </div>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Main Terminal Window: Biography & Focus */}
          <section className="lg:col-span-8">
            <div className="terminal-window border border-terminal-accent/20 overflow-hidden shadow-2xl">
              <WindowHeader title="system_overview.sh" />
              <div className="p-6 md:p-8 space-y-8 bg-black/20">
                {/* Command Header */}
                <div className="flex items-center gap-3 font-mono text-sm border-b border-white/5 pb-4">
                  <span className="text-terminal-accent">ivonne@dev:~$</span>
                  <span className="text-white italic">fetch --profile mark-angelo</span>
                  <span className="cursor-blink w-2 h-4 bg-terminal-accent inline-block align-middle ml-1" />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
                  {/* Left: Identity Disk */}
                  <div className="md:col-span-5 space-y-6">
                    <div className="relative aspect-square max-w-[280px] md:max-w-none mx-auto md:mx-0 border-2 border-terminal-accent/20 p-2 group overflow-hidden">
                      <div className="absolute inset-0 bg-terminal-accent/5 -translate-x-full group-hover:translate-x-0 transition-transform duration-500" />
                      <div className="h-full w-full border border-white/10 flex flex-col items-center justify-center text-center p-4 relative z-10">
                        <Terminal size={40} className="md:size-12 text-terminal-accent/40 mb-4" />
                        <div className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-1">Degree_Hash</div>
                        <div className="text-xs md:text-sm font-bold text-white uppercase leading-tight mb-4">
                          BS_COMPUTER_SCIENCE<br />UD_PRO_V1
                        </div>
                        <div className="w-full h-px bg-white/10 my-2" />
                        <div className="text-[9px] text-white/60 font-mono italic">
                          "Bridging web logic with system efficiency."
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Right: Core Modules */}
                  <div className="md:col-span-7 space-y-6">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Monitor className="text-terminal-accent" size={16} />
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Web_Operations</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          "SCALABLE_REACT_ARCHITECTURES",
                          "REALTIME_FIREBASE_SYNC",
                          "FLUID_UI_SYSTEMS_W_TAILWIND"
                        ].map(item => (
                          <div key={item} className="flex items-center gap-3 text-[10px] text-white/70 font-mono">
                            <span className="text-terminal-accent">[OK]</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <Code2 className="text-terminal-accent" size={16} />
                        <span className="text-xs font-bold text-white uppercase tracking-widest">Software_Foundations</span>
                      </div>
                      <div className="grid grid-cols-1 gap-2">
                        {[
                          "DISTRIBUTED_SYSTEMS_DESIGN",
                          "ALGORITHMIC_OPTIMIZATION",
                          "FULL_STACK_INTEGRATION"
                        ].map(item => (
                          <div key={item} className="flex items-center gap-3 text-[10px] text-white/70 font-mono">
                            <span className="text-terminal-accent opacity-50">&gt;&gt;</span>
                            {item}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Bottom diagnostic row */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-4 border-t border-white/5">
                  {[
                    { l: "MEMORY", v: "88%" },
                    { l: "CORES", v: "08/08" },
                    { l: "CACHE", v: "CLEAN" },
                    { l: "IO", v: "STABLE" }
                  ].map(d => (
                    <div key={d.l} className="border border-white/10 p-2 flex justify-between items-center group hover:border-terminal-accent/50 transition-colors">
                      <span className="text-[10px] text-white/20 font-bold">{d.l}</span>
                      <span className="text-[10px] text-terminal-accent font-bold group-hover:text-glow">{d.v}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Side Module: Contact Info */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="terminal-window border border-terminal-accent/30 bg-terminal-accent/5 shadow-xl">
              <WindowHeader title="establish_link.exe" />
              <div className="p-6 space-y-6">
                <a 
                  href="mailto:angelolandingin.dev@gmail.com" 
                  className="flex flex-col group block"
                >
                  <span className="text-[9px] font-bold text-terminal-accent mb-1 tracking-widest uppercase opacity-70">Direct_Email</span>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-terminal-accent transition-colors">
                      <Mail size={16} className="text-white/40 group-hover:text-terminal-accent transition-colors" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover:underline decoration-terminal-accent truncate">
                      angelolandingin.dev@gmail.com
                    </span>
                  </div>
                </a>
                
                <a 
                  href="https://github.com/ivonneschwie" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col group block"
                >
                  <span className="text-[9px] font-bold text-terminal-accent mb-1 tracking-widest uppercase opacity-70">Github_Source</span>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-terminal-accent transition-colors">
                      <Github size={16} className="text-white/40 group-hover:text-terminal-accent transition-colors" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover:underline decoration-terminal-accent uppercase tracking-tighter">
                      ivonneschwie
                    </span>
                  </div>
                </a>

                <a 
                  href="https://www.linkedin.com/in/ivonneschwie/" 
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col group block"
                >
                  <span className="text-[9px] font-bold text-terminal-accent mb-1 tracking-widest uppercase opacity-70">Professional_Net</span>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 border border-white/10 flex items-center justify-center group-hover:border-terminal-accent transition-colors">
                      <Linkedin size={16} className="text-white/40 group-hover:text-terminal-accent transition-colors" />
                    </div>
                    <span className="text-sm font-bold text-white group-hover:underline decoration-terminal-accent uppercase tracking-tighter">
                      m-angelo-landingin
                    </span>
                  </div>
                </a>
              </div>
            </div>

            {/* Status Module */}
            <div className="terminal-window border border-white/10 bg-white/2 p-6 flex flex-col items-center text-center">
              <Coffee size={24} className="text-white/20 mb-4" />
              <span className="text-[10px] font-bold text-white/40 uppercase tracking-[0.3em]">Status_Report</span>
              <p className="text-xs text-terminal-accent mt-4 font-mono font-bold tracking-tighter bg-black/40 p-2 border border-white/5 w-full">
                git commit -m "Fixed all issues by deleting the entire src folder." --force
              </p>
              <span className="text-[9px] text-white/20 mt-2 uppercase tracking-widest">Logic_Status: Works_On_My_Machine</span>
            </div>
          </aside>
        </main>

        {/* Stack Detail: Grid View */}
        <section className="space-y-8">
          <div className="flex items-center gap-4 border-l-2 border-terminal-accent pl-6 mb-12">
            <h2 className="text-4xl font-bold uppercase tracking-tighter text-white">Tech_Stack</h2>
            <div className="h-px bg-white/10 flex-grow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILLS.map((skill) => (
              <div key={skill.category} className="terminal-window border border-white/5 bg-black/60">
                <div className="p-3 bg-white/5 font-bold text-[10px] tracking-widest text-white uppercase flex items-center justify-between">
                  <span>CATEGORY__{skill.category}</span>
                  <Database size={10} className="text-terminal-accent" />
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
                  {skill.items.map((item) => (
                    <div key={item} className="bg-black/40 p-4 text-xs font-bold text-white/80 hover:text-terminal-accent hover:bg-white/5 transition-all group flex items-center justify-between">
                      <span>{item}</span>
                      <ArrowRight size={10} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Project Archive Section: Expansive Grid */}
        <section className="space-y-8 mt-24">
          <div className="flex items-center gap-4 border-l-2 border-terminal-accent pl-6 mb-12">
            <h2 className="text-4xl font-bold uppercase tracking-tighter text-white">Project_Archive</h2>
            <div className="h-px bg-white/10 flex-grow" />
            <span className="text-[10px] font-bold text-white/30 uppercase tabular-nums">Items: 04</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 border border-white/5">
            {PROJECTS.map((project) => (
              <a 
                key={project.id}
                href={project.link}
                target="_blank"
                rel="noreferrer"
                className="bg-black/40 p-8 space-y-6 group hover:bg-terminal-accent/5 transition-all relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowRight size={20} className="text-terminal-accent" />
                </div>
                
                <div className="flex justify-between items-center text-[10px] font-bold tracking-widest text-white/30">
                  <span className="border-t border-white/20 pt-1">ID__{project.id}</span>
                  <span className="bg-white/5 px-2 py-0.5 tabular-nums text-terminal-accent">{project.year}</span>
                </div>

                <div className="space-y-2">
                  <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-glow transition-all uppercase">
                    {project.title}
                  </h3>
                  <p className="text-sm text-white/60 font-sans leading-relaxed">
                    {project.description}
                  </p>
                </div>

                <div className="flex flex-wrap gap-2 pt-4">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-[9px] font-bold font-mono text-terminal-accent border border-terminal-accent/20 px-2 py-0.5 bg-terminal-accent/5 uppercase">
                      {tag}
                    </span>
                  ))}
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* Footer: Diagnostic Info */}
        <footer className="mt-40 pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-8 opacity-40">
          <div className="flex flex-wrap justify-center md:justify-start items-center gap-4 sm:gap-8 md:gap-12 font-mono text-[9px] font-bold tracking-widest uppercase">
            <div className="flex items-center gap-2">
              <span className="w-1.5 h-1.5 bg-terminal-accent rounded-full animate-pulse shadow-[0_0_8px_white]" />
              <span className="text-white/40">Status:</span>
              <span className="text-white">Active</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/40">Build:</span>
              <span className="text-white">v2.0.4-stable</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-white/40">Kernel:</span>
              <span className="text-white">AIS-4.14-LTS</span>
            </div>
          </div>

          <div className="flex gap-1">
            {[
              { icon: Github, url: "https://github.com/ivonneschwie" },
              { icon: Mail, url: "mailto:angelolandingin.dev@gmail.com" },
              { icon: Linkedin, url: "https://www.linkedin.com/in/ivonneschwie/" },
              { icon: HelpCircle, url: "#" }
            ].map((social, i) => (
              <a 
                key={i}
                href={social.url}
                target="_blank"
                rel="noreferrer"
                className="w-10 h-10 flex items-center justify-center border border-white/10 hover:border-terminal-accent hover:text-terminal-accent transition-all text-white/40"
              >
                <social.icon size={16} />
              </a>
            ))}
          </div>

        </footer>
      </div>
    </div>
  );
}
