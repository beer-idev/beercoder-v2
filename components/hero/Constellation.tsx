"use client";
import { useEffect, useRef } from "react";

export default function Constellation() {
  const ref = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = ref.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;

    let raf = 0;
    let running = true;
    const dpr = Math.max(1, Math.min(2, window.devicePixelRatio || 1));

    const resize = () => {
      const rect = canvas.parentElement?.getBoundingClientRect();
      const w = window.innerWidth; // cover full viewport width so edges aren't empty
      const h = (rect?.height || window.innerHeight * 0.8);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const onResize = () => resize();
    window.addEventListener("resize", onResize);

    const mobile = matchMedia("(max-width: 768px)").matches;
    const COUNT = mobile ? 26 : 70;
    const MAX_DIST = mobile ? 90 : 130; // px

    type P = { x: number; y: number; vx: number; vy: number; r: number; hue: number };
    const pts: P[] = [];
    const rnd = (a: number, b: number) => Math.random() * (b - a) + a;

    const init = () => {
      pts.length = 0;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;
      for (let i = 0; i < COUNT; i++) {
        pts.push({
          x: rnd(0, w),
          y: rnd(0, h),
          vx: rnd(-0.4, 0.4),
          vy: rnd(-0.4, 0.4),
          r: rnd(1.2, 2.4),
          hue: rnd(165, 185), // teal range
        });
      }
    };
    init();

    const mouse = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.x = e.clientX - rect.left;
      mouse.y = e.clientY - rect.top;
    };
    window.addEventListener("mousemove", onMouse);

    let t0 = performance.now();
    const SHOW_MOUSE_GLOW = false; // disable teal glow following mouse per request
    const MOUSE_ATTRACT = false; // disable all mouse response
    const loop = (t: number) => {
      if (!running) return;
      const dt = Math.min(50, t - t0);
      t0 = t;
      const w = canvas.width / dpr;
      const h = canvas.height / dpr;

      ctx.clearRect(0, 0, w, h);

      if (SHOW_MOUSE_GLOW) {
        ctx.globalCompositeOperation = "lighter";
        const orbGrad = ctx.createRadialGradient(mouse.x, mouse.y, 0, mouse.x, mouse.y, 160);
        orbGrad.addColorStop(0, "rgba(111,255,233,0.10)");
        orbGrad.addColorStop(1, "rgba(111,255,233,0.0)");
        ctx.fillStyle = orbGrad;
        ctx.beginPath();
        ctx.arc(mouse.x, mouse.y, 160, 0, Math.PI * 2);
        ctx.fill();
      }

      // move & draw points
      ctx.globalCompositeOperation = "source-over";
      for (const p of pts) {
        p.x += p.vx * (dt / 16.7);
        p.y += p.vy * (dt / 16.7);

        // bounce
        if (p.x < 0 || p.x > w) p.vx *= -1;
        if (p.y < 0 || p.y > h) p.vy *= -1;

        // slight attraction to mouse
        if (MOUSE_ATTRACT) {
          const dx = p.x - mouse.x;
          const dy = p.y - mouse.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < 18000) {
            p.vx -= dx * 0.00002;
            p.vy -= dy * 0.00002;
          }
        }
      }

      // lines
      for (let i = 0; i < pts.length; i++) {
        for (let j = i + 1; j < pts.length; j++) {
          const a = pts[i];
          const b = pts[j];
          const dx = a.x - b.x;
          const dy = a.y - b.y;
          const d = Math.hypot(dx, dy);
          if (d < MAX_DIST) {
            const alpha = (1 - d / MAX_DIST) * 0.35;
            ctx.strokeStyle = `hsla(175,70%,60%,${alpha})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.stroke();
          }
        }
      }

      // draw points on top
      for (const p of pts) {
        ctx.fillStyle = `hsla(${p.hue},70%,60%,0.7)`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return <canvas ref={ref} className="pointer-events-none absolute inset-y-0 left-1/2 -translate-x-1/2 w-screen -z-10" />;
}
