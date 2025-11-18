"use client";
import { useEffect, useRef } from "react";

// Lightweight canvas waves that react to mouse movement
export default function MouseWave() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    let raf = 0;
    let running = true;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const lines = 8; // number of horizontal wavy lines
    const ampBase = 22;
    const wavelength = 220; // px
    const speed = 0.015; // rad per ms
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const ENABLE_MOUSE = false;
    const onMove = (e: MouseEvent) => {
      if (!ENABLE_MOUSE) return;
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    };
    if (ENABLE_MOUSE) window.addEventListener("mousemove", onMove, { passive: true });

    let t0 = performance.now();
    const loop = (t: number) => {
      if (!running) return;
      const dt = t - t0;
      t0 = t;

      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      ctx.clearRect(0, 0, w, h);

      // background lines blend softly
      ctx.globalCompositeOperation = "lighter";

      for (let i = 0; i < lines; i++) {
        const yBase = (h / (lines + 1)) * (i + 1);
        const amp = ampBase * (0.6 + (i / lines) * 0.6);
        const hue = 175 + i * 3; // around teal
        ctx.lineWidth = 1.2;
        ctx.strokeStyle = `hsla(${hue}, 70%, 60%, 0.08)`;

        ctx.beginPath();
        const step = 8; // px increment along x
        for (let x = 0; x <= w; x += step) {
          const phase = (t * speed + i * 140) / 1000;
          const sine = Math.sin((x / wavelength) * Math.PI * 2 + phase) * amp;

          // Mouse ripple influence (gaussian falloff)
          let ripple = 0;
          if (ENABLE_MOUSE) {
            const dx = x - mouse.x;
            const dy = yBase - mouse.y;
            const dist2 = dx * dx + dy * dy;
            ripple = Math.exp(-dist2 / 120000) * amp * 1.5 * Math.sin((t / 240) + (x + i * 50) / 50);
          }

          const y = yBase + sine + ripple;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }

      ctx.globalCompositeOperation = "source-over";
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      if (ENABLE_MOUSE) window.removeEventListener("mousemove", onMove);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 -z-10 opacity-60 [filter:blur(0.2px)]"
      aria-hidden
    />
  );
}
