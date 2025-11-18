import Image from "next/image";
import Section from "@/components/sections/Section";
import ScrollReveal from "@/components/ui/ScrollReveal";

type Cert = {
  title: string;
  issuer: string;
  date: string;
  image?: string; // public path of thumbnail
  href?: string; // link to certificate/verify
};

const certs: Cert[] = [
  {
    title: "Frontend Developer (React)",
    issuer: "HackerRank",
    date: "Oct 2024",
    image: "/images/certificates/Frontend Developer (React) Certificate.png",
    href: "https://www.hackerrank.com/certificates/a3e3e319f624",
  },
  {
    title: "Accessible Learning Hackathon",
    issuer: "UNESCO Bangkok, Microsoft Thailand, Social Technology Institute",
    date: "Jul 2018",
    image: "/images/certificates/hackathon.jpg",
    href: "/images/certificates/hackathon.jpg",
  },
  {
    title: "Robotics Volunteer Certificate",
    issuer: "Pattaya City School 2 & Pattaya Technical College",
    date: "Sep 2020",
    image: "/images/certificates/robot.png",
    href: "/images/certificates/robot.png",
  },
];

function CertCard({ c }: { c: Cert }) {
  const content = (
    <div className="flex h-full flex-col overflow-hidden rounded-xl border border-white/10 bg-white/5 transition hover:border-[color:var(--tropical-teal)]/40">
      <div className="relative aspect-[16/10] w-full bg-white/5">
        {c.image ? (
          <Image src={c.image} alt={c.title} fill className="object-cover" />
        ) : null}
        <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-[color:var(--tropical-teal)]/60 to-[color:var(--neon-ice)]/40" />
      </div>
      <div className="flex flex-1 flex-col p-4">
        <h3 className="font-semibold text-slate-100">{c.title}</h3>
        <p className="text-sm text-slate-300 mt-1">{c.issuer} • {c.date}</p>
      </div>
    </div>
  );
  return c.href ? (
    <a href={c.href} target="_blank" rel="noreferrer noopener">{content}</a>
  ) : (
    content
  );
}

export default function Certificates() {
  return (
    <Section id="certificates" title="My Certificates" subtitle="Certifications and achievements in web development">
      <div className="grid items-stretch gap-6 md:grid-cols-3">
        {certs.map((c, i) => (
          <ScrollReveal key={`${c.title}-${c.date}`} delay={i * 120} y={14}>
            <CertCard c={c} />
          </ScrollReveal>
        ))}
      </div>
    </Section>
  );
}
