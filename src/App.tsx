import { useState, useEffect, useRef, FormEvent } from "react";
import { motion } from "motion/react";
import { Terminal, Github, Linkedin, Mail, ArrowRight, Code2, Database, Shield, Monitor, Coffee, HelpCircle, Minus, Square, X, ArrowDown } from "lucide-react";
import { Project, Skill } from "./types";
import { CursorTrail } from "./CursorTrail";
import { MatrixRain } from "./MatrixRain";
import { DecryptedText } from "./DecryptedText";

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

const WindowHeader = ({
  title,
  tabs,
  activeTab,
  setActiveTab
}: {
  title: string;
  tabs?: { id: string; label: string }[];
  activeTab?: string;
  setActiveTab?: (id: string) => void;
}) => (
  <div className="bg-white/5 border-b border-white/10 p-2 flex items-center justify-between gap-4 flex-wrap sm:flex-nowrap">
    <div className="flex items-center gap-2 px-2">
      <div className="w-2.5 h-2.5 rounded-full bg-red-500/50" />
      <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/50" />
      <div className="w-2.5 h-2.5 rounded-full bg-green-500/50" />
      <span className="text-[10px] uppercase font-bold text-white/40 tracking-widest ml-2">{title}</span>
    </div>

    {tabs && setActiveTab && (
      <div className="flex items-center gap-1 bg-black/40 border border-white/5 p-0.5 rounded text-[9px] font-bold">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-2 py-0.5 rounded transition-all uppercase cursor-pointer ${activeTab === tab.id
              ? "bg-terminal-accent text-black font-extrabold"
              : "text-white/40 hover:text-white/80"
              }`}
          >
            {tab.label}
          </button>
        ))}
      </div>
    )}

    <div className="flex items-center gap-4 px-2 text-white/20">
      <Minus size={12} />
      <Square size={10} />
      <X size={12} />
    </div>
  </div>
);

const CornerBrackets = () => (
  <>
    {/* Top Left */}
    <div className="absolute top-[-6px] left-[-6px] w-3 h-3 border-t-2 border-l-2 border-terminal-accent opacity-0 scale-90 translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-20 shadow-[0_0_6px_var(--color-terminal-accent-glow)]" />
    {/* Top Right */}
    <div className="absolute top-[-6px] right-[-6px] w-3 h-3 border-t-2 border-r-2 border-terminal-accent opacity-0 scale-90 -translate-x-1 translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-20 shadow-[0_0_6px_var(--color-terminal-accent-glow)]" />
    {/* Bottom Left */}
    <div className="absolute bottom-[-6px] left-[-6px] w-3 h-3 border-b-2 border-l-2 border-terminal-accent opacity-0 scale-90 translate-x-1 -translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-20 shadow-[0_0_6px_var(--color-terminal-accent-glow)]" />
    {/* Bottom Right */}
    <div className="absolute bottom-[-6px] right-[-6px] w-3 h-3 border-b-2 border-r-2 border-terminal-accent opacity-0 scale-90 -translate-x-1 -translate-y-1 group-hover:opacity-100 group-hover:scale-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300 pointer-events-none z-20 shadow-[0_0_6px_var(--color-terminal-accent-glow)]" />
  </>
);

export default function App() {
  const [matrixActive, setMatrixActive] = useState(true);
  const [shellHistory, setShellHistory] = useState<string[]>([
    "INITIALIZING IVONNE-CORE v2.0.4...",
    "SYSTEM DEPLOYED SUCCESSFULLY.",
    "TYPE 'help' TO VIEW AVAILABLE COMMANDS.",
    ""
  ]);
  const [shellInput, setShellInput] = useState("");
  const [currentTheme, setCurrentTheme] = useState("green");
  const [crashActive, setCrashActive] = useState(false);
  const [crashCountdown, setCrashCountdown] = useState(5);
  const [currentPlaceholder, setCurrentPlaceholder] = useState("");
  const [isInputFocused, setIsInputFocused] = useState(false);

  const placeholderPhrases = ["type 'help'...", "type 'about'...", "type 'projects'...", "type 'skills'...", "type 'neofetch'..."];

  useEffect(() => {
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingSpeed = 150;
    let timerId: NodeJS.Timeout;

    const tick = () => {
      const currentPhrase = placeholderPhrases[phraseIndex];

      if (!isDeleting) {
        // Typing
        setCurrentPlaceholder(currentPhrase.substring(0, charIndex + 1));
        charIndex++;

        if (charIndex === currentPhrase.length) {
          isDeleting = true;
          typingSpeed = 2000; // Pause at end of phrase
        } else {
          typingSpeed = 100 + Math.random() * 80;
        }
      } else {
        // Deleting
        setCurrentPlaceholder(currentPhrase.substring(0, charIndex - 1));
        charIndex--;

        if (charIndex === 0) {
          isDeleting = false;
          phraseIndex = (phraseIndex + 1) % placeholderPhrases.length;
          typingSpeed = 500; // Pause before typing next phrase
        } else {
          typingSpeed = 50;
        }
      }

      timerId = setTimeout(tick, typingSpeed);
    };

    timerId = setTimeout(tick, typingSpeed);
    return () => clearTimeout(timerId);
  }, []);

  const shellContainerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const themeColors: Record<string, { accent: string; muted: string; glow: string }> = {
    green: { accent: "#22c55e", muted: "#166534", glow: "rgba(34, 197, 94, 0.4)" },
    amber: { accent: "#f59e0b", muted: "#b45309", glow: "rgba(245, 158, 11, 0.4)" },
    blue: { accent: "#06b6d4", muted: "#0e7490", glow: "rgba(6, 182, 212, 0.4)" },
    red: { accent: "#ef4444", muted: "#b91c1c", glow: "rgba(239, 68, 68, 0.4)" }
  };

  const handleThemeChange = (themeName: string) => {
    const theme = themeColors[themeName.toLowerCase()];
    if (theme) {
      document.documentElement.style.setProperty("--color-terminal-accent", theme.accent);
      document.documentElement.style.setProperty("--color-terminal-accent-muted", theme.muted);
      document.documentElement.style.setProperty("--color-terminal-accent-glow", theme.glow);
      setCurrentTheme(themeName.toLowerCase());
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (shellContainerRef.current) {
      shellContainerRef.current.scrollTop = shellContainerRef.current.scrollHeight;
    }
  }, [shellHistory]);

  useEffect(() => {
    if (!crashActive) return;

    if (crashCountdown > 0) {
      const timer = setTimeout(() => {
        setCrashCountdown(prev => prev - 1);
      }, 1000);
      return () => clearTimeout(timer);
    } else {
      setCrashActive(false);
      setShellHistory([
        "REBOOT COMPLETE.",
        "SYSTEM RESTORED.",
        "IVONNE-CORE v2.0.4 IS RUNNING STABLE.",
        "TYPE 'help' TO VIEW AVAILABLE COMMANDS.",
        ""
      ]);
    }
  }, [crashActive, crashCountdown]);

  const handleCommandSubmit = (e: FormEvent) => {
    e.preventDefault();
    const cmd = shellInput.trim();
    if (!cmd) return;

    const newHistory = [...shellHistory, `guest@ivonne-core:~$ ${cmd}`];
    const parts = cmd.split(" ");
    const commandName = parts[0].toLowerCase();
    const args = parts.slice(1);

    switch (commandName) {
      case "help":
        newHistory.push(
          "Available commands:",
          "  about     - Display personal overview",
          "  projects  - List repository and commissions",
          "  skills    - Display technical skills stack",
          "  theme     - Change system color theme (usage: theme [green|amber|blue|red])",
          "  matrix    - Toggle matrix rain background effect",
          "  neofetch  - Display system information",
          "  clear     - Clear terminal screen",
          "  sudo      - Run system maintenance (warning: dangerous)",
          ""
        );
        break;
      case "about":
        newHistory.push(
          "User: Ivonne.dev (Mark Angelo Landingin)",
          "Degree: BS Computer Science Graduate from Universidad de Dagupan",
          "Role: Fullstack web developer focused on React architectures and system design.",
          "Bio: Bridging web logic with system efficiency.",
          ""
        );
        break;
      case "projects":
        PROJECTS.forEach(p => {
          newHistory.push(
            `[${p.title}] (${p.year})`,
            `  Tech: ${p.tags.join(", ")}`,
            `  Desc: ${p.description}`,
            p.link ? `  Link: ${p.link}` : "",
            ""
          );
        });
        break;
      case "skills":
        SKILLS.forEach(s => {
          newHistory.push(
            `[${s.category}]`,
            `  ${s.items.join(", ")}`,
            ""
          );
        });
        break;
      case "neofetch":
        newHistory.push(
          "        ,---.       guest@ivonne-core",
          "       /     \\      -----------------",
          "      | () () |     OS: Client Web Browser",
          "       \\  ^  /      Kernel: React 19.0.1",
          "        |||||       Host: Vite Dev Server",
          "        |||||       Uptime: 10m",
          `                    Theme: ${currentTheme.toUpperCase()}`,
          "                    Shell: TypeScript Core v2.0",
          "                    Memory: Infinite",
          ""
        );
        break;
      case "theme":
        if (args.length === 0) {
          newHistory.push("Usage: theme [green|amber|blue|red]", "");
        } else {
          const success = handleThemeChange(args[0]);
          if (success) {
            newHistory.push(`Theme successfully changed to ${args[0].toUpperCase()}.`, "");
          } else {
            newHistory.push(`Error: Theme '${args[0]}' not recognized. Try green, amber, blue, or red.`, "");
          }
        }
        break;
      case "matrix":
        setMatrixActive(prev => {
          const next = !prev;
          newHistory.push(`Matrix background effect: ${next ? "ENABLED" : "DISABLED"}.`, "");
          return next;
        });
        break;
      case "clear":
        setShellHistory([]);
        setShellInput("");
        return;
      case "sudo":
        setCrashActive(true);
        setCrashCountdown(5);
        newHistory.push("WARNING: CORRUPTING SYSTEM FILES...", "CRITICAL EXCEPTION OCCURRED. INITIATING EMERGENCY SYSTEM REBOOT...", "");
        break;
      default:
        newHistory.push(`bash: ${commandName}: command not found. Type 'help' for options.`, "");
    }

    setShellHistory(newHistory);
    setShellInput("");
  };

  return (
    <div className="relative min-h-screen">
      {/* Background canvas effects */}
      <CursorTrail />
      <MatrixRain active={matrixActive} />

      {/* Visual background layers */}
      <div className="fixed inset-0 scanline opacity-30 z-50 pointer-events-none" />


      {/* Simulated System Crash Overlay */}
      {crashActive && (
        <div className="fixed inset-0 bg-black/95 z-50 flex flex-col items-center justify-center p-4 font-mono text-red-500 overflow-hidden select-none">
          <div className="max-w-md w-full space-y-6 text-center border-2 border-red-500/30 p-8 bg-red-950/20 backdrop-blur-md">
            <div className="animate-pulse flex flex-col items-center">
              <Shield size={48} className="text-red-500 mb-4 animate-bounce" />
              <span className="text-xl font-bold tracking-widest uppercase text-glow">!!! SYSTEM CRASH !!!</span>
            </div>
            <div className="text-xs text-left bg-black p-4 border border-red-500/20 max-h-48 overflow-y-auto space-y-1">
              <p className="text-red-400 font-bold">[WARN] RM -RF /RUN/SYSTEM/CORE</p>
              <p className="text-red-500/70">Deleting src/App.tsx ... DONE</p>
              <p className="text-red-500/70">Deleting src/index.css ... DONE</p>
              <p className="text-red-500/70">Clearing buffer caches ... DONE</p>
              <p className="text-red-500/70">Destroying visual elements ... DONE</p>
              <p className="text-red-400 font-bold">[CRIT] KERNEL PANIC: CORE DELETED</p>
              <p className="text-red-400 font-bold">[OK] INITIATING EMERGENCY RESTORE IN {crashCountdown}S</p>
            </div>
            <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
              <div
                className="bg-red-500 h-full transition-all duration-1000"
                style={{ width: `${((5 - crashCountdown) / 5) * 100}%` }}
              />
            </div>
            <span className="text-[10px] text-red-500/50 uppercase tracking-widest">
              Self-healing protocol active. Please do not close your browser.
            </span>
          </div>
        </div>
      )}

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
              <DecryptedText text="MARK_ANGELO_LANDINGIN" japaneseText="イヴォン_デヴ" triggerOnHover={true} />
              <span className="cursor-blink">_</span>
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
            <div className="terminal-window border border-terminal-accent/20 shadow-2xl relative group">
              <CornerBrackets />
              <WindowHeader title="system_overview.sh" />

              <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10">
                {/* Left Side: System Info */}
                <div className="lg:col-span-5 p-6 md:p-8 space-y-8 bg-black/20 flex flex-col justify-between">
                  <div className="space-y-6">
                    {/* Command Header */}
                    <div className="flex flex-col gap-1 font-mono text-sm border-b border-white/5 pb-4">
                      <span className="text-terminal-accent">ivonne@dev:~$</span>
                      <div className="flex items-center gap-2">
                        <span className="text-white italic">fetch --profile mark-angelo</span>
                        <span className="cursor-blink w-2 h-4 bg-terminal-accent inline-block align-middle" />
                      </div>
                    </div>

                    <div className="space-y-6">
                      {/* Core Modules */}
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
                  <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-2 gap-2 pt-4 border-t border-white/5">
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

                {/* Right Side: Interactive Shell */}
                <div 
                  onClick={() => inputRef.current?.focus()}
                  className="lg:col-span-7 p-6 md:p-8 space-y-4 bg-black/40 flex flex-col justify-between min-h-[440px] cursor-text"
                >
                  <div
                    ref={shellContainerRef}
                    className="flex-grow overflow-y-auto space-y-2 font-mono text-xs select-text pr-2 scrollbar-thin scrollbar-thumb-white/10 scrollbar-track-transparent max-h-[380px]"
                  >
                    {shellHistory.map((line, idx) => (
                      <div
                        key={idx}
                        className={`whitespace-pre-wrap ${line.startsWith("guest@ivonne-core")
                          ? "text-white font-bold"
                          : line.startsWith("bash:") || line.startsWith("Error:") || line.startsWith("WARNING:") || line.startsWith("CRITICAL EXCEPTION")
                            ? "text-red-400 font-bold"
                            : line.startsWith("Theme successfully") || line.startsWith("Theme: ")
                              ? "text-terminal-accent font-bold"
                              : "text-white/70"
                          }`}
                      >
                        {line}
                      </div>
                    ))}
                  </div>

                  <form onSubmit={handleCommandSubmit} className="flex items-center gap-2 border-t border-white/10 pt-4 font-mono text-xs relative">
                    {!isInputFocused && !shellInput && (
                      <div className="absolute top-[-44px] left-[150px] flex flex-col items-center animate-bounce pointer-events-none z-30">
                        <span className="text-[11px] uppercase tracking-[0.25em] font-bold text-neutral-300 drop-shadow-[0_0_4px_rgba(255,255,255,0.5)]">TYPE HERE</span>
                        <ArrowDown size={24} className="mt-0.5 mb-1 text-white/90 drop-shadow-[0_0_6px_rgba(255,255,255,0.65)]" />
                      </div>
                    )}
                    <span className="text-terminal-accent font-bold">guest@ivonne-core:~$</span>
                    <input
                      ref={inputRef}
                      type="text"
                      value={shellInput}
                      onFocus={() => setIsInputFocused(true)}
                      onBlur={() => setIsInputFocused(false)}
                      onChange={(e) => setShellInput(e.target.value)}
                      className="flex-grow bg-transparent border-none outline-none text-white caret-terminal-accent focus:ring-0 focus:outline-none"
                      placeholder={currentPlaceholder}
                    />
                  </form>
                </div>
              </div>
            </div>
          </section>

          {/* Side Module: Contact Info */}
          <aside className="lg:col-span-4 space-y-8">
            <div className="terminal-window border border-terminal-accent/30 bg-terminal-accent/5 shadow-xl relative group">
              <CornerBrackets />
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
            <div className="terminal-window border border-white/10 bg-white/2 p-6 flex flex-col items-center text-center relative group">
              <CornerBrackets />
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
            <h2 className="text-4xl font-bold uppercase tracking-tighter text-white">
              <DecryptedText text="Tech_Stack" japaneseText="テック_スタック" triggerOnHover={true} />
            </h2>
            <div className="h-px bg-white/10 flex-grow" />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {SKILLS.map((skill) => (
              <div key={skill.category} className="terminal-window border border-white/5 bg-black/60 relative group">
                <CornerBrackets />
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
            <h2 className="text-4xl font-bold uppercase tracking-tighter text-white">
              <DecryptedText text="Project_Archive" japaneseText="プロジェクト_アーカイブ" triggerOnHover={true} />
            </h2>
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
                className="flex flex-col justify-between h-full bg-black/40 p-8 space-y-6 group hover:bg-terminal-accent/5 transition-all relative"
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
