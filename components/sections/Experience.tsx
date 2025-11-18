import Section from "@/components/sections/Section";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Item = {
  title: string;
  org: string;
  period: string;
  desc: string[];
};

const work: Item[] = [
  {
    title: "Web Developer",
    org: "TG Cellular World Co., Ltd.",
    period: "Jul 2024 — Present",
    desc: [
      "Develop and maintain internal web applications and API systems using PHP, Laravel, and Vue.js",
      "Improve performance, fix bugs, and optimize database queries to ensure high system reliability",
      "Deploy and monitor applications on UAT and Production servers",
      "Collaborate cross-functionally to deliver scalable business solutions",
      "Research and apply new technologies to enhance development processes and productivity",
    ],
  },
  {
    title: "Full Stack Developer",
    org: "Freelancer",
    period: "Dec 2022 — Jul 2024",
    desc: [
      "Developed Footrepose, a full-featured massage booking platform using Laravel, MySQL, and Bootstrap",
      "Delivered various freelance projects with emphasis on responsive design and clean UI/UX",
    ],
  },
  {
    title: "Programmer",
    org: "Zenith Comp Co., Ltd.",
    period: "Jun 2023 — Oct 2023",
    desc: [
      "Built and deployed web-based complaint management systems for the Ministry of Labor using Laravel and Oracle",
      "Designed database structures and ensured data consistency across services",
    ],
  },
  {
    title: "Web Developer",
    org: "TG Cellular World Co., Ltd.",
    period: "Sep 2020 — Nov 2022",
    desc: [
      "Developed and maintained internal web applications to support business operations",
      "Optimized application performance and database queries to enhance overall system reliability",
      "Collaborated with cross-department teams to optimize business processes using PHP and SQL Server",
    ],
  },
];

const education: Item[] = [
  {
    title: "Bachelor of Business Administration (B.B.A.) – Information Technology for Business Management",
    org: "Rattana Bundit University",
    period: "2022 — Expected Graduation: 2026",
    desc: [
      "Studying Information Technology for Business Management with focus on web development, software design, and database management",
    ],
  },
];

function Timeline({ items }: { items: Item[] }) {
  return (
    <ol className="relative border-l border-white/10 pl-6">
      {items.map((it, i) => (
        <ScrollReveal
          as="li"
          key={`${it.title}-${it.org}-${it.period}-${i}`}
          delay={i * 120}
          y={16}
          className="mb-10"
        >
          <div className="absolute -left-1.5 mt-1 h-3 w-3 rounded-full bg-[color:var(--tropical-teal)]" />
          <div className="ml-2">
            <h3 className="font-semibold text-slate-100">{it.title}</h3>
            <p className="text-sm text-slate-300">{it.org} • {it.period}</p>
            <ul className="mt-2 space-y-1.5 text-slate-300">
              {it.desc.map((item, idx) => (
                <li key={idx} className="flex items-start gap-2">
                  <span className="mt-1.5 h-1.5 w-1.5 flex-shrink-0 rounded-full bg-[color:var(--tropical-teal)]" />
                  <span className="text-sm">{item}</span>
                </li>
              ))}
            </ul>
          </div>
        </ScrollReveal>
      ))}
    </ol>
  );
}

export default function Experience() {
  return (
    <Section id="experience" title="Experience / Timeline" subtitle="My professional journey and educational background">
      <div className="grid gap-10 md:grid-cols-2">
        <div>
          <h3 className="mb-4 text-center font-semibold text-slate-200">Work</h3>
          <Timeline items={work} />
        </div>
        <div>
          <h3 className="mb-4 text-center font-semibold text-slate-200">Education</h3>
          <Timeline items={education} />
        </div>
      </div>
    </Section>
  );
}
