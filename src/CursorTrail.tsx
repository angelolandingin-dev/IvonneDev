import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  char: string;
  size: number;
  vx: number;
  vy: number;
  life: number;
  maxLife: number;
}

export function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };
    window.addEventListener("resize", handleResize);

    const particles: Particle[] = [];
    const chars = ["0", "1", ">", "_", "$", "i", "v", "o", "n", "e", "{", "}", "[", "]", ";", "+"];
    const mouse = { x: 0, y: 0, lastX: 0, lastY: 0, active: false };

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;

      if (!mouse.active) {
        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;
        mouse.active = true;
        return;
      }

      const dist = Math.hypot(mouse.x - mouse.lastX, mouse.y - mouse.lastY);
      // Spawn particles based on distance moved
      if (dist > 12) {
        const char = chars[Math.floor(Math.random() * chars.length)];
        const size = Math.random() * 6 + 10; // 10px to 16px
        const maxLife = Math.random() * 20 + 30; // 20-50 frames

        particles.push({
          x: mouse.x,
          y: mouse.y,
          char,
          size,
          vx: (Math.random() - 0.5) * 0.8,
          vy: (Math.random() - 0.5) * 0.8 - 0.2, // slight upward drift
          life: maxLife,
          maxLife,
        });

        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;
      }
    };

    const handleClick = (e: MouseEvent) => {
      const burstCount = 12;
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 3 + 1.5;
        const char = chars[Math.floor(Math.random() * chars.length)];
        const size = Math.random() * 5 + 9;
        const maxLife = Math.random() * 15 + 20;

        particles.push({
          x: e.clientX,
          y: e.clientY,
          char,
          size,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    let animationFrameId: number;

    const getAccentColor = () => {
      // Query the computed value of the CSS custom property --color-terminal-accent
      const color = getComputedStyle(document.documentElement)
        .getPropertyValue("--color-terminal-accent")
        .trim();
      return color || "#22c55e";
    };

    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const accent = getAccentColor();

      // Render each particle
      for (let i = particles.length - 1; i >= 0; i--) {
        const p = particles[i];
        p.life--;

        if (p.life <= 0) {
          particles.splice(i, 1);
          continue;
        }

        p.x += p.vx;
        p.y += p.vy;

        const opacity = p.life / p.maxLife;
        ctx.fillStyle = accent;
        ctx.globalAlpha = opacity;
        ctx.font = `bold ${p.size}px monospace`;
        ctx.shadowColor = accent;
        ctx.shadowBlur = 4;
        
        ctx.fillText(p.char, p.x, p.y);
      }

      ctx.globalAlpha = 1.0;
      ctx.shadowBlur = 0;
      animationFrameId = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-40 select-none"
      style={{ mixBlendMode: "screen" }}
    />
  );
}
