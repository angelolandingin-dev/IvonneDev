import { useEffect, useRef } from "react";

interface MatrixRainProps {
  active: boolean;
}

// ─── Words to weave into the rain ─────────────────────────────────────────────
const WORD_POOL = [
  // Personal
  "ANGELO", "LANDINGIN", "MARK", "IVONNE", "DEV",
  // Japanese — Personal
  "イヴォン", "イーヴ", "オタク", "アンゲロウ", "すずめの戸締まり",
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

    const fontSize = 32;
    const colSpacing = fontSize * 2; // column spacing (64px)
    const leftMargin = 48; // keep rain away from left edge
    const columns = Math.floor((width - leftMargin) / colSpacing) + 1;
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
    const GLOW_DECAY = 0.12; // glow fades over ~16 frames

    // ─── Cooldown timer for word injection (constant rate) ─────────────────────
    let wordCooldown = 0; // frames to wait before next injection
    const WORD_COOLDOWN = 20; // ~3.2s between words at 80ms interval

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

      // Content zone: max-w-7xl (1280px) + padding, centered
      const contentWidth = Math.min(1280, width);
      const contentLeft = (width - contentWidth) / 2;
      const contentRight = contentLeft + contentWidth;

      // ── Inject 1 word at a time on a cooldown ──────────────────────────
      const hasActiveWord = wordQueue.some((q) => q !== null);
      if (!hasActiveWord) {
        if (wordCooldown <= 0) {
          // Find eligible columns: idle, on-screen, past safe zone, outside content
          const eligible: number[] = [];
          for (let i = 0; i < yPositions.length; i++) {
            const cx = leftMargin + i * colSpacing;
            const cy = yPositions[i];
            if (cy > fontSize * 6 && cy < height && cx < width && (cx < contentLeft || cx > contentRight)) {
              eligible.push(i);
            }
          }
          if (eligible.length > 0) {
            const pick = eligible[Math.floor(Math.random() * eligible.length)];
            wordQueue[pick] = WORD_POOL[Math.floor(Math.random() * WORD_POOL.length)].split("");
            wordPos[pick] = 0;
            wordTrail[pick] = [];
          }
        } else {
          wordCooldown--;
        }
      }

      for (let i = 0; i < yPositions.length; i++) {
        const x = leftMargin + i * colSpacing; // offset from left edge
        const y = yPositions[i];

        // Skip columns inside the content area
        if (x >= contentLeft && x <= contentRight) {
          yPositions[i] = y + fontSize;
          if (y > height + 200 || (y > height && Math.random() > 0.90)) {
            yPositions[i] = 0;
          }
          continue;
        }

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
            wordCooldown = WORD_COOLDOWN; // wait before next word
          }

          text = charsArray[Math.floor(Math.random() * charsArray.length)];
        }

        // Draw character — word chars get a bright glow
        if (isWordChar) {
          ctx.save();
          ctx.shadowColor = accent;
          ctx.shadowBlur = 20;
          ctx.fillStyle = "#ffffff";
          ctx.fillText(text, x, y);
          ctx.fillText(text, x, y); // double-draw for extra bloom
          ctx.restore();
          ctx.fillStyle = accent;
        } else {
          ctx.fillStyle = accent;
          ctx.fillText(text, x, y);
        }

        // Reset column to top randomly after leaving viewport
        if (y > height + 200 || (y > height && Math.random() > 0.90)) {
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
        ctx.shadowBlur = 40 * alpha;
        ctx.fillStyle = "#ffffff";
        ctx.font = `${fontSize}px monospace`;
        ctx.fillText(p.char, p.x, p.y);
        ctx.fillText(p.char, p.x, p.y); // double-draw for brighter bloom
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
      className="fixed inset-0 pointer-events-none -z-10 opacity-[0.12] select-none"
    />
  );
}
