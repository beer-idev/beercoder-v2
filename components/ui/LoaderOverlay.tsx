"use client";
import { useEffect, useRef, useState } from "react";

export default function LoaderOverlay() {
  const [progress, setProgress] = useState(0);
  const doneRef = useRef(false);

  useEffect(() => {
    // steady timer toward ~95%
    const tick = setInterval(() => {
      setProgress((p) => {
        if (doneRef.current) return p;
        const next = p + 1.2; // ~1.2%/120ms ≈ 9–10s ถึง 95%
        return Math.min(next, 95);
      });
    }, 120);

    const animateTo = (target: number, duration = 800) => {
      const start = performance.now();
      const from = progress;
      const step = (t: number) => {
        const e = Math.min(1, (t - start) / duration);
        const eased = 1 - Math.pow(1 - e, 3); // easeOutCubic
        setProgress(from + (target - from) * eased);
        if (e < 1) requestAnimationFrame(step);
        else {
          const el = document.getElementById("loader-overlay");
          if (el) el.style.opacity = "0";
          setTimeout(() => setProgress(101), 300);
        }
      };
      requestAnimationFrame(step);
    };

    const finish = () => {
      doneRef.current = true;
      animateTo(100, 900); // smooth final sweep
    };

    if (document.readyState === "complete") finish();
    else window.addEventListener("load", finish, { once: true });

    return () => {
      clearInterval(tick);
      window.removeEventListener("load", finish as any);
    };
  }, [progress]);

  if (progress > 100) return null;
  return (
    <div id="loader-overlay" className="fixed inset-0 z-[9999] grid place-items-center bg-black transition-opacity">
      <div className="w-[min(560px,85vw)]">
        <div className="mb-3 h-2 w-full overflow-hidden rounded-full bg-white/10">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[color:var(--neon-ice)] to-[color:var(--tropical-teal)]"
            style={{ width: `${progress}%`, transition: "width 200ms ease" }}
          />
        </div>
        <div className="flex items-center justify-between text-xs text-slate-400">
          <span>Loading</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>
    </div>
  );
}
