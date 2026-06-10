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
  hueOffset?: number;
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

    // Ambient particles when idle
    const createAmbientParticle = () => {
      const char = chars[Math.floor(Math.random() * chars.length)];
      const size = Math.random() * 4 + 8;
      const maxLife = Math.random() * 30 + 40;
      const x = Math.random() * width;
      const y = Math.random() * height;
      particles.push({
        x,
        y,
        char,
        size,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3 - 0.1,
        life: maxLife,
        maxLife,
        hueOffset: Math.random() * 60,
      });
    };
    const ambientInterval = setInterval(createAmbientParticle, 800);

    const handleMouseMove = (e: MouseEvent) => {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!mouse.active) {
        mouse.lastX = mouse.x;
        mouse.lastY = mouse.y;
        mouse.active = true;
        return;
      }
      const char = chars[Math.floor(Math.random() * chars.length)];
      const size = Math.random() * 6 + 12;
      const maxLife = Math.random() * 35 + 45;
      particles.push({
        x: mouse.x,
        y: mouse.y,
        char,
        size,
        vx: (Math.random() - 0.5) * 0.8,
        vy: (Math.random() - 0.5) * 0.8 - 0.2,
        life: maxLife,
        maxLife,
        hueOffset: Math.random() * 60,
      });
      mouse.lastX = mouse.x;
      mouse.lastY = mouse.y;
    };

    const handleClick = (e: MouseEvent) => {
      const burstCount = 20;
      for (let i = 0; i < burstCount; i++) {
        const angle = (i / burstCount) * Math.PI * 2 + (Math.random() - 0.5) * 0.4;
        const speed = Math.random() * 3 + 1.5;
        const char = chars[Math.floor(Math.random() * chars.length)];
        const size = Math.random() * 5 + 10;
        const maxLife = Math.random() * 20 + 30;
        particles.push({
          x: e.clientX,
          y: e.clientY,
          char,
          size,
          vx: Math.cos(angle) * speed,
          vy: Math.sin(angle) * speed,
          life: maxLife,
          maxLife,
          hueOffset: Math.random() * 60,
        });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("click", handleClick);

    const getAccentColor = () => {
      const c = getComputedStyle(document.documentElement).getPropertyValue("--color-terminal-accent").trim();
      return c || "#22c55e";
    };

    const hslFromHex = (hex: string) => {
      const el = document.createElement("div");
      el.style.color = hex;
      document.body.appendChild(el);
      const rgbStr = getComputedStyle(el).color;
      document.body.removeChild(el);
      const rgb = rgbStr.match(/\d+/g)!.map(Number);
      const r = rgb[0] / 255,
        g = rgb[1] / 255,
        b = rgb[2] / 255;
      const max = Math.max(r, g, b),
        min = Math.min(r, g, b);
      let h = 0,
        s = 0,
        l = (max + min) / 2;
      if (max !== min) {
        const d = max - min;
        s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
        switch (max) {
          case r:
            h = (g - b) / d + (g < b ? 6 : 0);
            break;
          case g:
            h = (b - r) / d + 2;
            break;
          case b:
            h = (r - g) / d + 4;
            break;
        }
        h /= 6;
      }
      return { h: h * 360, s: s * 100, l: l * 100 };
    };

    let animationFrameId: number;
    const draw = () => {
      ctx.clearRect(0, 0, width, height);
      const accentHex = getAccentColor();
      const accentHsl = hslFromHex(accentHex);
      // Persistent trailing particle when cursor is stationary
      if (mouse.active) {
        particles.push({
          x: mouse.x,
          y: mouse.y,
          char: chars[Math.floor(Math.random() * chars.length)],
          size: Math.random() * 4 + 6,
          vx: 0,
          vy: 0,
          life: 20,
          maxLife: 20,
          hueOffset: Math.random() * 60,
        });
      }
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
        const hueShift = p.hueOffset ?? 0;
        const color = `hsla(${(accentHsl.h + hueShift) % 360}, ${accentHsl.s}%, ${accentHsl.l}%, ${opacity})`;
        ctx.fillStyle = color;
        ctx.globalAlpha = opacity;
        ctx.font = `bold ${p.size}px monospace`;
        ctx.shadowColor = color;
        ctx.shadowBlur = 6;
        ctx.fillText(p.char, p.x, p.y);
      }
      // cursor aura
      if (mouse.active) {
        const radius = 30;
        const grad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, radius);
        grad.addColorStop(0, accentHex);
        grad.addColorStop(1, "transparent");
        ctx.globalAlpha = 0.3;
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, radius, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalAlpha = 1.0;
      }
      animationFrameId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("click", handleClick);
      clearInterval(ambientInterval);
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
