import Link from "next/link";
import Image from "next/image";
import SmoothLink from "@/components/ui/SmoothLink";

export default function Footer() {
  return (
    <footer className="app-footer border-t border-white/10 bg-black/60 backdrop-blur-sm">
      <div className="mx-auto max-w-6xl px-4 py-12">
        <div className="grid gap-8 md:grid-cols-3 md:gap-6">
          <div>
            <Link href="/" className="flex items-center gap-2 mb-4">
              <Image src="/images/logo.jpg" alt="logo" width={32} height={32} className="h-8 w-8 rounded-lg object-cover" />
              <span className="font-bold text-lg text-slate-100">beercoder</span>
            </Link>
            <p className="text-sm text-slate-400">
              Web Developer passionate about building scalable and efficient web applications.
            </p>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-slate-400">
              <li><SmoothLink href="#about" updateHash={false} className="hover:text-[color:var(--tropical-teal)] transition">About</SmoothLink></li>
              <li><SmoothLink href="#skills" updateHash={false} className="hover:text-[color:var(--tropical-teal)] transition">Skills</SmoothLink></li>
              <li><SmoothLink href="#work" updateHash={false} className="hover:text-[color:var(--tropical-teal)] transition">Projects</SmoothLink></li>
              <li><SmoothLink href="#contact" updateHash={false} className="hover:text-[color:var(--tropical-teal)] transition">Contact</SmoothLink></li>
            </ul>
          </div>
          <div>
            <h3 className="font-semibold text-slate-200 mb-4">Tech Stack</h3>
            <p className="text-sm text-slate-400">
              Built with <span className="text-[color:var(--tropical-teal)]">Next.js</span> • <span className="text-[color:var(--tropical-teal)]">Tailwind CSS</span>
            </p>
            <p className="text-xs text-slate-500 mt-4">
              © {new Date().getFullYear()} beercoder. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
