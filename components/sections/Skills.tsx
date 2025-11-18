import Section from "@/components/sections/Section";
import ScrollReveal from "@/components/ui/ScrollReveal";
import {
  SiTypescript,
  SiReact,
  SiVuedotjs,
  SiNodedotjs,
  SiPhp,
  SiTailwindcss,
  SiBootstrap,
  SiHtml5,
  SiCss3,
  SiJavascript,
  SiMysql,
  SiGit,
  SiUbuntu,
  SiPython,
  SiLaravel,
  SiPostman
} from "react-icons/si";
import { SiOracle } from "react-icons/si";
import { DiMsqlServer } from "react-icons/di";

type Skill = { name: string; icon?: React.ReactNode };

// Programming Language
const programmingLanguage: Skill[] = [
  { name: "HTML5", icon: <SiHtml5 /> },
  { name: "CSS3", icon: <SiCss3 /> },
  { name: "JavaScript", icon: <SiJavascript /> },
  { name: "PHP", icon: <SiPhp /> },
  { name: "Python", icon: <SiPython /> },
  { name: "TypeScript", icon: <SiTypescript /> },
];

// Framework
const framework: Skill[] = [
  { name: "React.JS", icon: <SiReact /> },
  { name: "Vue.js", icon: <SiVuedotjs /> },
  { name: "Bootstrap", icon: <SiBootstrap /> },
  { name: "Node.JS", icon: <SiNodedotjs /> },
  { name: "TailwindCSS", icon: <SiTailwindcss /> },
  { name: "Laravel", icon: <SiLaravel /> },
];

// Database
const database: Skill[] = [
  { name: "MySQL", icon: <SiMysql /> },
  { name: "SQL Server", icon: <DiMsqlServer /> },
  { name: "Oracle", icon: <SiOracle /> },
];

// Other Tools
const otherTools: Skill[] = [
  { name: "Git", icon: <SiGit /> },
  { name: "Ubuntu", icon: <SiUbuntu /> },
  { name: "Postman", icon: <SiPostman /> },
];

function Badge({ s }: { s: Skill }) {
  return (
    <div className="group flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-sm text-slate-200 transition hover:border-[color:var(--tropical-teal)]/40 hover:shadow-[0_8px_30px_rgba(91,192,190,0.15)]">
      {s.icon ? (
        <span className="text-[18px] text-slate-300 transition group-hover:text-[color:var(--tropical-teal)]">{s.icon}</span>
      ) : (
        <span className="h-2 w-2 rounded-full bg-[color:var(--tropical-teal)]/60" />
      )}
      <span>{s.name}</span>
    </div>
  );
}

function Group({ title, items }: { title: string; items: Skill[] }) {
  return (
    <div>
      <ScrollReveal as="h3" className="mb-3 font-semibold text-slate-200" y={12}>{title}</ScrollReveal>
      <div className="flex flex-wrap gap-3">
        {items.map((s, i) => (
          <ScrollReveal key={s.name} delay={i * 60} y={10}>
            <Badge s={s} />
          </ScrollReveal>
        ))}
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <Section id="skills" title="Skills & Tech Stack" subtitle="Technologies and tools I use to build scalable web applications">
      <div className="grid gap-8 md:grid-cols-2">
        <Group title="Programming Language" items={programmingLanguage} />
        <Group title="Framework" items={framework} />
        <Group title="Database" items={database} />
        <Group title="Other Tools" items={otherTools} />
      </div>
    </Section>
  );
}
