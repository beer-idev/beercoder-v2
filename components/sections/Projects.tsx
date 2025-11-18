"use client";
import Image from "next/image";
import Section from "@/components/sections/Section";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { SiNextdotjs, SiTypescript, SiTailwindcss, SiFramer, SiLaravel, SiPhp, SiMysql, SiFlutter, SiMongodb, SiGoogle } from "react-icons/si";
import { useMemo, useState } from "react";

type Category = "all" | "web" | "app";
type Project = {
  title: string;
  description: string;
  tags: string[];
  features?: string[];
  href?: string;
  iconRow?: React.ReactNode[];
  image?: string;
  category: Category;
};

const projects: Project[] = [
  {
    title: "Portfolio v2",
    description: "เว็บไซต์พอร์ตโฟลิโอที่โฟกัส motion และ performance",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    features: ["Motion & micro-interactions", "Lighthouse 95+", "Responsive images"],
    href: "/images/projects/portfolio-v2.png",
    iconRow: [<SiNextdotjs key="n" />, <SiTypescript key="t" />, <SiTailwindcss key="tw" />],
    image: "/images/projects/portfolio-v2.png",
    category: "web",
  },
  {
    title: "Portfolio v1",
    description: "พอร์ตโฟลิโอรุ่นแรก ใช้ Next.js + Framer Motion ใส่อนิเมชันลื่นไหล",
    tags: ["Next.js", "Motion"],
    features: ["Framer Motion", "SSR/ISR"],
    href: "/images/projects/portfolio-v1.png",
    iconRow: [<SiNextdotjs key="n" />, <SiFramer key="fm" />],
    image: "/images/projects/portfolio-v1.png",
    category: "web",
  },
  {
    title: "Foorepose",
    description: "ระบบจองคอร์ส + backoffice จัดการลูกค้า/สินค้า สร้างรายงานบน Laravel + PHP 8.2 + MySQL",
    tags: ["Laravel", "PHP 8.2", "MySQL"],
    features: ["Booking/Backoffice", "Reports"],
    href: "/images/projects/footrepose.png",
    iconRow: [<SiLaravel key="laravel" />, <SiPhp key="php" />, <SiMysql key="mysql" />],
    image: "/images/projects/footrepose.png",
    category: "web",
  },
  {
    title: "เว็บสำนักงาน",
    description: "เว็บไซต์สำนักงานพร้อมระบบจัดการข้อมูลภายใน ใช้ Laravel + PHP 8.2 + MySQL",
    tags: ["Laravel", "PHP 8.2", "MySQL"],
    features: ["Backoffice", "CRUD & Reports"],
    href: "/images/projects/เว็บสำนักงานบัญชี.png",
    iconRow: [<SiLaravel key="laravel2" />, <SiPhp key="php2" />, <SiMysql key="mysql2" />],
    image: "/images/projects/เว็บสำนักงานบัญชี.png",
    category: "web",
  },
  {
    title: "แอพแจ้งเตือนกินยา",
    description: "แอปมือถือแจ้งเตือนกินยา เก็บข้อมูลบน MongoDB และอัปเดตแบบเรียลไทม์",
    tags: ["Flutter", "MongoDB", "Realtime"],
    features: ["Schedule reminder", "Realtime update", "Push notification"],
    href: "/images/projects/app แจ้งเตือนกินยา.png",
    iconRow: [<SiFlutter key="fl" />, <SiMongodb key="mdb" />],
    image: "/images/projects/app แจ้งเตือนกินยา.png",
    category: "app",
  },
  {
    title: "แอพตอบคำถาม (No-code)",
    description: "ทำแบบสอบถาม/ตอบคำถามด้วย Google AppSheet สร้างและปรับแบบฟอร์มได้รวดเร็ว",
    tags: ["No-code", "AppSheet"],
    features: ["Form & Workflow", "Google Sheets backend"],
    href: "/images/projects/app-game-ตอบคำถาม.png",
    iconRow: [<SiGoogle key="gg" />],
    image: "/images/projects/app-game-ตอบคำถาม.png",
    category: "app",
  },
];

function Tabs({ current, onChange }: { current: Category; onChange: (c: Category) => void }) {
  const items: { key: Category; label: string }[] = [
    { key: "all", label: "All" },
    { key: "web", label: "Web" },
    { key: "app", label: "App" },
  ];
  return (
    <div className="mb-8 flex flex-wrap gap-2">
      {items.map((it) => (
        <button
          key={it.key}
          onClick={() => onChange(it.key)}
          className={
            "pill rounded-full border px-3 py-1.5 text-sm transition " +
            (current === it.key ? "pill--active" : "")
          }
        >
          {it.label}
        </button>
      ))}
    </div>
  );
}

function Card({ p }: { p: Project }) {
  return (
    <a
      href={p.href || "#"}
      className="group flex h-full flex-col overflow-hidden rounded-2xl border border-white/10 bg-white/5 transition hover:border-[color:var(--tropical-teal)]/40 hover:shadow-[0_20px_60px_rgba(91,192,190,0.12)]"
    >
      <div className="relative aspect-[16/9] w-full overflow-hidden">
        {p.image ? (
          <Image src={p.image} alt={p.title} fill className="object-cover" />
        ) : (
          <div className="h-full w-full bg-gradient-to-br from-white/10 to-white/0" />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>
      <div className="flex flex-1 flex-col space-y-3 p-6">
        <h3 className="text-lg font-semibold text-slate-100">{p.title}</h3>
        <p className="text-sm text-slate-300 min-h-[48px]">{p.description}</p>
        {p.iconRow ? (
          <div className="flex items-center gap-3 text-[18px] text-slate-300">
            {p.iconRow.map((icon, i) => (
              <span key={i} className="grid h-8 w-8 place-items-center rounded-full bg-white/5 text-slate-300 transition group-hover:text-[color:var(--tropical-teal)]">
                {icon}
              </span>
            ))}
          </div>
        ) : null}
        {p.features && p.features.length > 0 ? (
          <div className="mt-auto pt-2">
            <p className="mb-1 text-sm font-semibold text-slate-200">Key Features:</p>
            <ul className="grid grid-cols-2 gap-x-4 text-xs text-slate-300">
              {p.features.map((f) => (
                <li key={f} className="flex items-center gap-2 before:block before:h-1 before:w-1 before:rounded-full before:bg-[color:var(--tropical-teal)]/80">
                  {f}
                </li>
              ))}
            </ul>
          </div>
        ) : null}
      </div>
    </a>
  );
}

export default function Projects() {
  const [tab, setTab] = useState<Category>("all");
  const list = useMemo(() => (tab === "all" ? projects : projects.filter((p) => p.category === tab)), [tab]);
  return (
    <Section id="work" title="My Work / Projects" subtitle="Projects I've built using modern web technologies">
      <Tabs current={tab} onChange={setTab} />
      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {list.map((p, i) => (
          <ScrollReveal key={p.title} delay={i * 120} y={18}>
            <Card p={p} />
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}

