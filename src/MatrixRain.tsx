import { useEffect, useRef } from "react";

interface MatrixRainProps {
  active: boolean;
}

// ─── Words to weave into the rain ─────────────────────────────────────────────
const WORD_POOL = [
  // Personal
  "ANGELO", "LANDINGIN", "MARK", "IVONNE", "DEV",
  // Japanese — Personal
  "イヴォン", "イーヴ", "オタク", "アンゲロウ",
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
  const glowCanvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (!active) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const glowCanvas = glowCanvasRef.current;
    if (!glowCanvas) return;
    const glowCtx = glowCanvas.getContext("2d");
    if (!glowCtx) return;
    glowCanvas.width = width;
    glowCanvas.height = height;

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
      glowCanvas.width = width;
      glowCanvas.height = height;

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
    const colSpeed: number[] = [];  // speed multiplier per column (0.5–1.5)
    const colAccum: number[] = [];  // accumulator for fractional advancement
    for (let i = 0; i < columns; i++) {
      yPositions[i] = Math.random() * -height;
      colSpeed[i] = 0.5 + Math.random();  // 0.5x to 1.5x speed
      colAccum[i] = 0;
    }

    const matrixChars = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$[]{}<>;:,.+-*/%=&|^!~@#?イヴンオタクゲロウ";
    const charsArray = matrixChars.split("");

    // ─── Word injection state ──────────────────────────────────────────────────
    // wordQueue[i] = split chars of the word being emitted in column i, or null
    // wordPos[i]   = index of the next char to emit from that word
    // wordTrail[i] = array of {char, y} positions for the word being emitted
    const wordQueue: (string[] | null)[] = Array.from({ length: columns }, () => null);
    const wordPos: number[] = Array(columns).fill(0);
    const wordTrail: { char: string; y: number }[][] = Array.from({ length: columns }, () => []);

    // ─── Recently-used word tracker (prevents repeats) ────────────────────────
    const wordCooldowns: Map<number, number> = new Map(); // wordIndex → cycles remaining
    const WORD_REPEAT_COOLDOWN = Math.floor(WORD_POOL.length / 3); // must cycle half the pool


    // ─── Glow trail particles (rendered after word completes) ──────────────────
    const glowParticles: GlowParticle[] = [];
    const GLOW_DECAY = 0.12; // glow fades over ~37 frames (~3s)

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
      ctx.fillStyle = "rgba(10, 10, 10, 0.10)";
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
            // Weight selection toward columns closer to the top (normalize distribution)
            const weights = eligible.map((idx) => height - yPositions[idx]);
            const totalWeight = weights.reduce((a, b) => a + b, 0);
            let r = Math.random() * totalWeight;
            let pick = eligible[0];
            for (let j = 0; j < weights.length; j++) {
              r -= weights[j];
              if (r <= 0) { pick = eligible[j]; break; }
            }

            // Pick a word that isn't on cooldown
            const available = WORD_POOL
              .map((w, idx) => ({ w, idx }))
              .filter(({ idx }) => !wordCooldowns.has(idx));
            const pool = available.length > 0 ? available : WORD_POOL.map((w, idx) => ({ w, idx }));
            const chosen = pool[Math.floor(Math.random() * pool.length)];

            wordQueue[pick] = chosen.w.split("");
            wordPos[pick] = 0;
            wordTrail[pick] = [];

            // Put chosen word on cooldown and decrement all existing cooldowns
            wordCooldowns.set(chosen.idx, WORD_REPEAT_COOLDOWN);
            for (const [key, val] of wordCooldowns) {
              if (key === chosen.idx) continue;
              if (val <= 1) wordCooldowns.delete(key);
              else wordCooldowns.set(key, val - 1);
            }
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
          colAccum[i] += colSpeed[i];
          if (colAccum[i] >= 1) {
            colAccum[i] = 0;
            yPositions[i] = y + fontSize;
          }
          if (y > height + 200 || (y > height && Math.random() > 0.90)) {
            yPositions[i] = 0;
            colSpeed[i] = 0.5 + Math.random();
            colAccum[i] = 0;
          }
          continue;
        }

        // Accumulator: only advance this column when accumulator fills
        colAccum[i] += colSpeed[i];
        if (colAccum[i] < 1) continue; // skip draw on non-advancing frames
        colAccum[i] = 0;

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
              glowParticles.push({ x, y: t.y, char: t.char, intensity: 2 });
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
          colSpeed[i] = 0.5 + Math.random();
          colAccum[i] = 0;
        } else {
          yPositions[i] = y + fontSize;
        }
      }

      // ─── Render glow particles on separate canvas (full brightness) ───────
      glowCtx.clearRect(0, 0, width, height);
      for (let g = glowParticles.length - 1; g >= 0; g--) {
        const p = glowParticles[g];
        if (p.intensity <= 0) {
          glowParticles.splice(g, 1);
          continue;
        }

        const alpha = Math.min(p.intensity, 1.0);
        glowCtx.save();
        glowCtx.globalAlpha = alpha;
        glowCtx.font = `${fontSize}px monospace`;

        // Layer 1: ultra-wide soft bloom
        glowCtx.shadowColor = accent;
        glowCtx.shadowBlur = 60 * alpha;
        glowCtx.fillStyle = accent;
        glowCtx.fillText(p.char, p.x, p.y);

        // Layer 2: medium accent bloom
        glowCtx.shadowBlur = 25 * alpha;
        glowCtx.fillText(p.char, p.x, p.y);

        // Layer 3: tight bright white core
        glowCtx.shadowColor = "#ffffff";
        glowCtx.shadowBlur = 10 * alpha;
        glowCtx.fillStyle = "#ffffff";
        glowCtx.fillText(p.char, p.x, p.y);

        glowCtx.restore();

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
    <>
      <canvas
        ref={canvasRef}
        className="fixed inset-0 pointer-events-none -z-10 opacity-[0.12] select-none"
      />
      <canvas
        ref={glowCanvasRef}
        className="fixed inset-0 pointer-events-none -z-10 select-none"
      />
    </>
  );
}
