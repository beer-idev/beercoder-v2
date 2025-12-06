"use client";
import { FaFacebook, FaGithub, FaLinkedin, FaDiscord } from "react-icons/fa6";
import { SiLine } from "react-icons/si";
import { FiPhone, FiMail } from "react-icons/fi";

type Item = {
  href: string;
  label: string;
  icon: React.ReactNode;
  newTab?: boolean;
};

const items: Item[] = [
  { href: "https://web.facebook.com/beer.devx/", label: "Facebook", icon: <FaFacebook /> },
  { href: "https://github.com/beer-idev", label: "GitHub", icon: <FaGithub /> },
  { href: "/images/line-qr.jpg", label: "LINE", icon: <SiLine />, newTab: true },
  { href: "https://www.linkedin.com/in/beer-idev/", label: "LinkedIn", icon: <FaLinkedin /> },
  { href: "https://discord.com/users/833397997530251277", label: "Discord", icon: <FaDiscord /> },
  { href: "tel:+66959243957", label: "Phone", icon: <FiPhone /> },
  { href: "mailto:beerdev.work@gmail.com", label: "Email", icon: <FiMail /> },
];

export default function SocialLinks() {
  return (
    <ul className="mt-10 flex flex-wrap items-center gap-4 text-slate-300">
      {items.map((it) => {
        const openInNewTab = it.newTab ?? it.href.startsWith("http");
        return (
          <li key={it.label}>
            <a
              aria-label={it.label}
              href={it.href}
              target={openInNewTab ? "_blank" : undefined}
              rel={openInNewTab ? "noopener noreferrer" : undefined}
              className="group grid h-10 w-10 place-items-center rounded-xl bg-white/5 text-slate-300 ring-1 ring-white/10 transition hover:text-[color:var(--tropical-teal)] hover:shadow-[0_8px_30px_rgba(91,192,190,0.35)] hover:ring-[color:var(--tropical-teal)]/50 focus:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--tropical-teal)]/70"
              style={{
                backgroundImage:
                  "linear-gradient(135deg, rgba(111,255,233,0.0), rgba(91,192,190,0.0))",
              }}
            >
              <span className="text-[18px] transition group-hover:scale-110">{it.icon}</span>
            </a>
          </li>
        );
      })}
    </ul>
  );
}
