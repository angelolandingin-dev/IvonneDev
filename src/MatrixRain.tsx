import { useEffect, useRef } from "react";

interface MatrixRainProps {
  active: boolean;
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
      "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ$<>[]{}#@%&+*=";
    const charsArray = matrixChars.split("");

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
      ctx.fillStyle = accent;
      ctx.font = `${fontSize}px monospace`;

      for (let i = 0; i < yPositions.length; i++) {
        const text = charsArray[Math.floor(Math.random() * charsArray.length)];
        const x = i * fontSize * 4; // increased column spacing
        const y = yPositions[i];

        // Draw character
        ctx.fillText(text, x, y);

        // Reset column to top randomly after leaving viewport
        if (y > height && Math.random() > 0.985) {
          yPositions[i] = 0;
        } else {
          yPositions[i] = y + fontSize;
        }
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
