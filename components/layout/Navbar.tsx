"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import SmoothLink from "@/components/ui/SmoothLink";
import ThemeToggle from "@/components/ui/ThemeToggle";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [theme, setTheme] = useState<'dark' | 'light'>(() => (typeof document !== 'undefined' ? (document.documentElement.dataset.theme as any) || 'dark' : 'dark'));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const onTheme = () => setTheme((document.documentElement.dataset.theme as any) || 'dark');
    window.addEventListener('themechange', onTheme);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener('themechange', onTheme);
    };
  }, []);

  return (
    <header
      className={
        [
          "sticky top-0 z-40 transition-all duration-300",
          scrolled
            ? (theme === 'light'
                ? "text-slate-800 border-b border-transparent bg-white/70 supports-[backdrop-filter]:bg-white/50 backdrop-blur-xl shadow-[0_8px_30px_rgba(0,0,0,0.06)]"
                : "bg-black/50 border-b border-white/10 backdrop-blur-md")
            : "bg-transparent border-b border-transparent backdrop-blur-0",
        ].join(" ")
      }
    >
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 md:py-4">
        <Link href="/" className="flex items-center gap-2">
          <Image src="/images/logo.jpg" alt="logo" width={28} height={28} className="h-7 w-7 rounded-lg object-cover" />
          <span className="font-semibold tracking-wide">beercoder</span>
        </Link>
        <ul className="hidden md:flex items-center gap-6 md:text-[15px] text-slate-300">
          <li><SmoothLink href="#home" offset={80} className="hover:text-white transition">Home</SmoothLink></li>
          <li><SmoothLink href="#about" offset={80} className="hover:text-white transition">About</SmoothLink></li>
          <li><SmoothLink href="#skills" offset={80} className="hover:text-white transition">Skills</SmoothLink></li>
          <li><SmoothLink href="#work" offset={80} className="hover:text-white transition">Projects</SmoothLink></li>
          <li><SmoothLink href="#experience" offset={80} className="hover:text-white transition">Experience</SmoothLink></li>
          <li><SmoothLink href="#services" offset={80} className="hover:text-white transition">Services</SmoothLink></li>
          <li><SmoothLink href="#certificates" offset={80} className="hover:text-white transition">Certificates</SmoothLink></li>
          <li><SmoothLink href="#contact" offset={80} className="hover:text-white transition">Contact</SmoothLink></li>
        </ul>
        <div className="ml-4"><ThemeToggle /></div>
      </nav>
    </header>
  );
}
