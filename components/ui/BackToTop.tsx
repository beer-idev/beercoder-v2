"use client";
import { useEffect, useState } from "react";

export default function BackToTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 500);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!show) return null;
  return (
    <button
      aria-label="Back to top"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      className="backtotop fixed right-6 bottom-28 md:bottom-6 z-40 grid h-12 w-12 place-items-center rounded-full transition hover:scale-110"
    >
      <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
        <path d="M12 5l7 7-1.4 1.4L13 10.8V19h-2v-8.2L6.4 13.4 5 12z"/>
      </svg>
    </button>
  );
}
