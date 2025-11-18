"use client";
import { useEffect, useState } from "react";
import SmoothLink from "@/components/ui/SmoothLink";
import { FiHome, FiUser, FiCode, FiBriefcase, FiClock, FiAward, FiMail } from "react-icons/fi";

export default function BottomNav() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow((window.scrollY || 0) > 2);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  if (!show) return null;

  return (
    <nav className="fixed inset-x-0 bottom-3 z-40 mx-auto w-[95%] max-w-lg md:hidden">
      <div className="bottom-nav-container rounded-2xl border border-white/10 bg-black/60 backdrop-blur-xl p-1.5 shadow-[0_8px_32px_rgba(0,0,0,0.4)]">
        <ul className="bottom-nav-list flex items-center justify-around gap-0.5 text-slate-300 overflow-x-auto scrollbar-hide">
          <li className="flex-shrink-0">
            <SmoothLink 
              href="#home" 
              offset={80} 
              className="flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 min-w-[50px] transition hover:bg-white/10 hover:text-[color:var(--tropical-teal)] active:scale-95"
            >
              <FiHome className="h-4 w-4" />
              <span className="text-[9px] font-medium leading-tight">Home</span>
            </SmoothLink>
          </li>
          <li className="flex-shrink-0">
            <SmoothLink 
              href="#about" 
              offset={80} 
              className="flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 min-w-[50px] transition hover:bg-white/10 hover:text-[color:var(--tropical-teal)] active:scale-95"
            >
              <FiUser className="h-4 w-4" />
              <span className="text-[9px] font-medium leading-tight">About</span>
            </SmoothLink>
          </li>
          <li className="flex-shrink-0">
            <SmoothLink 
              href="#skills" 
              offset={80} 
              className="flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 min-w-[50px] transition hover:bg-white/10 hover:text-[color:var(--tropical-teal)] active:scale-95"
            >
              <FiCode className="h-4 w-4" />
              <span className="text-[9px] font-medium leading-tight">Skills</span>
            </SmoothLink>
          </li>
          <li className="flex-shrink-0">
            <SmoothLink 
              href="#work" 
              offset={80} 
              className="flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 min-w-[50px] transition hover:bg-white/10 hover:text-[color:var(--tropical-teal)] active:scale-95"
            >
              <FiBriefcase className="h-4 w-4" />
              <span className="text-[9px] font-medium leading-tight">Projects</span>
            </SmoothLink>
          </li>
          <li className="flex-shrink-0">
            <SmoothLink 
              href="#experience" 
              offset={80} 
              className="flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 min-w-[50px] transition hover:bg-white/10 hover:text-[color:var(--tropical-teal)] active:scale-95"
            >
              <FiClock className="h-4 w-4" />
              <span className="text-[9px] font-medium leading-tight">Experience</span>
            </SmoothLink>
          </li>
          <li className="flex-shrink-0">
            <SmoothLink 
              href="#services" 
              offset={80} 
              className="flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 min-w-[50px] transition hover:bg-white/10 hover:text-[color:var(--tropical-teal)] active:scale-95"
            >
              <FiAward className="h-4 w-4" />
              <span className="text-[9px] font-medium leading-tight">Services</span>
            </SmoothLink>
          </li>
          <li className="flex-shrink-0">
            <SmoothLink 
              href="#certificates" 
              offset={80} 
              className="flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 min-w-[50px] transition hover:bg-white/10 hover:text-[color:var(--tropical-teal)] active:scale-95"
            >
              <FiAward className="h-4 w-4" />
              <span className="text-[9px] font-medium leading-tight">Certificates</span>
            </SmoothLink>
          </li>
          <li className="flex-shrink-0">
            <SmoothLink 
              href="#contact" 
              offset={80} 
              className="flex flex-col items-center gap-0.5 rounded-lg px-2 py-1.5 min-w-[50px] transition hover:bg-white/10 hover:text-[color:var(--tropical-teal)] active:scale-95"
            >
              <FiMail className="h-4 w-4" />
              <span className="text-[9px] font-medium leading-tight">Contact</span>
            </SmoothLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}
