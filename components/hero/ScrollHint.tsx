"use client";
import { useEffect, useState } from "react";
import SmoothLink from "@/components/ui/SmoothLink";

export default function ScrollHint({ href = "#about" }: { href?: string }) {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || document.documentElement.scrollTop || 0;
      // Show only when the scrollbar thumb is at the very top (<=1px)
      setVisible(y <= 1);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!visible) return null;
  return (
    <SmoothLink
      href={href}
      updateHash={false}
      aria-label="Scroll to content"
      className="fixed left-1/2 -translate-x-1/2 bottom-8 md:bottom-12 z-20 text-[color:var(--tropical-teal)] hover:text-[color:var(--neon-ice)] [filter:drop-shadow(0_6px_16px_rgba(111,255,233,0.25))]"
    >
      <svg className="h-10 w-10 md:h-12 md:w-12 animate-bounce" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 16.5l-6-6 1.5-1.5L12 13.5l4.5-4.5L18 10.5z" />
      </svg>
    </SmoothLink>
  );
}
