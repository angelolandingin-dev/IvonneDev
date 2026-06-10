import { useEffect, useRef } from "react";

interface MatrixRainProps {
  active: boolean;
}

// ─── Words to weave into the rain ─────────────────────────────────────────────
const WORD_POOL = [
  // Personal
  "ANGELO", "LANDINGIN", "MARK", "IVONNE", "DEV",
  // Japanese
  "イヴォーク", "マーク", "アンジェロ", "ランディンギン",
  // CS / Dev
  "CS", "CODE", "REACT", "NODE", "GIT", "API",
  "FULLSTACK", "FRONTEND", "BACKEND", "NULL", "VOID",
  "ASYNC", "AWAIT", "CONST", "RETURN", "CLASS"
];

// A single glow particle left behind when a word completes
interface GlowParticle {
  x: number;
  y: number;
  char: string;
  intensity: number; // 1.0 → 0.0
}

export function MatrixRain({ active }: MatrixRainProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;

      // Re-initialize columns on resize
      const newCols = Math.floor(width / fontSize) + 1;
      // Adjust yPositions array length if necessary
      if (newCols > yPositions.length) {
        const diff = newCols - yPositions.length;
        for (let i = 0; i < diff; i++) {
          yPositions.push(Math.random() * -height);
        }
      }
    };
    window.addEventListener("resize", handleResize);

    const fontSize = 32; // smaller characters for finer rain effect
    const columns = Math.floor(width / fontSize * 4) + 1;
    const yPositions: number[] = [];
    for (let i = 0; i < columns; i++) {
      yPositions[i] = Math.random() * -height;
    }

    const matrixChars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン" +
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$";
    const charsArray = matrixChars.split("");

    // ─── Word injection state ──────────────────────────────────────────────────
    // wordQueue[i] = split chars of the word being emitted in column i, or null
    // wordPos[i]   = index of the next char to emit from that word
    // wordTrail[i] = array of {char, y} positions for the word being emitted
    const wordQueue: (string[] | null)[] = Array.from({ length: columns }, () => null);
    const wordPos: number[] = Array(columns).fill(0);
    const wordTrail: { char: string; y: number }[][] = Array.from({ length: columns }, () => []);


    // ─── Glow trail particles (rendered after word completes) ──────────────────
    const glowParticles: GlowParticle[] = [];
    const GLOW_DECAY = 0.06; // how fast glow fades per frame (~16 frames to vanish)

    const getAccentColor = () => {
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-terminal-accent")
        .trim();
      return color || "#22c55e";
    };

    let intervalId: number;

    const draw = () => {
      // Clear with slight trailing effect
      ctx.fillStyle = "rgba(10, 10, 10, 0.08)";
      ctx.fillRect(0, 0, width, height);

      const accent = getAccentColor();
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < yPositions.length; i++) {
        const x = i * fontSize * 4; // increased column spacing
        const y = yPositions[i];

        // ── Word injection: use next word char if available, else random ──
        let text: string;
        let isWordChar = false;

        if (wordQueue[i] !== null && wordPos[i] < wordQueue[i]!.length) {
          text = wordQueue[i]![wordPos[i]];
          wordPos[i]++;
          isWordChar = true;
          // Track this character's position for the glow burst later
          wordTrail[i].push({ char: text, y });
        } else {
          // Word just finished — spawn glow particles for the whole word
          if (wordQueue[i] !== null && wordPos[i] >= wordQueue[i]!.length) {
            for (const t of wordTrail[i]) {
              glowParticles.push({ x, y: t.y, char: t.char, intensity: 1.0 });
            }
            wordTrail[i] = [];
            wordQueue[i] = null;
          }

          // ~5% chance per frame to start a new word mid-fall (only after 6 rows from top)
          if (wordQueue[i] === null && y > fontSize * 6 && y < height && Math.random() < 0.05) {
            wordQueue[i] = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)].split("");
            wordPos[i] = 0;
            wordTrail[i] = [];
          }

          text = charsArray[Math.floor(Math.random() * charsArray.length)];
        }

        // Draw character — word chars get a subtle bright tint
        if (isWordChar) {
          ctx.fillStyle = "#b0ffb0";
          ctx.fillText(text, x, y);
          ctx.fillStyle = accent;
        } else {
          ctx.fillStyle = accent;
          ctx.fillText(text, x, y);
        }

        // Reset column to top randomly after leaving viewport
        if (y > height && Math.random() > 0.985) {
          yPositions[i] = 0;
        } else {
          yPositions[i] = y + fontSize;
        }
      }

      // ─── Render glow particles (the "flash then fade" pass) ──────────────
      for (let g = glowParticles.length - 1; g >= 0; g--) {
        const p = glowParticles[g];
        if (p.intensity <= 0) {
          glowParticles.splice(g, 1);
          continue;
        }

        const alpha = p.intensity;
        ctx.save();
        ctx.globalAlpha = alpha;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 24 * alpha;
        ctx.fillStyle = "#ffffff";
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(p.char, p.x, p.y);
        ctx.restore();

        p.intensity -= GLOW_DECAY;
      }
    };

    // Run matrix animation at ~30 FPS
    const intervalTime = 80;
    intervalId = window.setInterval(draw, intervalTime);

    return () => {
      window.removeEventListener("resize", handleResize);
      clearInterval(intervalId);
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none -z-10 opacity-[0.08] select-none"
    />
  );
}
