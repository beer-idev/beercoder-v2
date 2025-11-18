import Section from "@/components/sections/Section";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { FiCode, FiDatabase, FiServer } from "react-icons/fi";

type Svc = { title: string; desc: string; icon?: React.ReactNode };

const services: Svc[] = [
  {
    title: "Full-Stack Web Development",
    desc: "Develop and maintain internal web applications and API systems using PHP, Laravel, Vue.js, and Node.js. Build scalable solutions with clean architecture and best practices.",
    icon: <FiCode />,
  },
  {
    title: "Performance & Database Optimization",
    desc: "Improve application performance, fix bugs, and optimize database queries to ensure high system reliability. Analyze and enhance query performance for better efficiency.",
    icon: <FiDatabase />,
  },
  {
    title: "Deployment & System Monitoring",
    desc: "Deploy and monitor applications on UAT and Production servers. Ensure smooth deployments and maintain system stability with proper monitoring and maintenance.",
    icon: <FiServer />,
  },
];

function SvcCard({ s }: { s: Svc }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6 transition hover:border-[color:var(--tropical-teal)]/40">
      {s.icon ? (
        <div className="mb-3 grid h-10 w-10 place-items-center rounded-lg bg-white/5 text-[18px] text-slate-300">{s.icon}</div>
      ) : null}
      <h3 className="font-semibold text-slate-100">{s.title}</h3>
      <p className="mt-2 text-sm text-slate-300">{s.desc}</p>
    </div>
  );
}

export default function Services() {
  return (
    <Section id="services" title="Services" subtitle="Services I provide based on my professional experience">
      <div className="grid gap-6 md:grid-cols-3">
        {services.map((s, i) => (
          <ScrollReveal key={s.title} delay={i * 120} y={16}>
            <SvcCard s={s} />
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
