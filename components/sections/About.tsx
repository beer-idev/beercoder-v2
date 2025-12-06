import Section from "@/components/sections/Section";
import Image from "next/image";

export default function About() {
  return (
    <Section
      id="about"
      title="About Me"
      subtitle="Passionate Web Developer with hands-on experience in both front-end and back-end development"
    >
      <div className="grid gap-8 md:grid-cols-3">
        <div className="md:col-span-2 space-y-4 text-slate-300">
          <p>
            Passionate Web Developer with hands-on experience in both front-end and back-end development using Vue.js, Node.js, and PHP. Skilled in building scalable web applications, debugging complex systems, and optimizing performance. Dedicated to contributing innovative web solutions and driving technical growth within the organization.
          </p>
          <p>
            I specialize in developing and maintaining internal web applications and API systems, improving performance, fixing bugs, and optimizing database queries to ensure high system reliability. I also collaborate cross-functionally to deliver scalable business solutions and research new technologies to enhance development processes and productivity.
          </p>
          <ul className="list-disc pl-6">
            <li>Full-stack development with Vue.js, Laravel, and Node.js</li>
            <li>Database optimization and query performance tuning</li>
            <li>Deployment and monitoring on UAT and Production servers</li>
            <li>Cross-functional collaboration for scalable solutions</li>
          </ul>
        </div>
        <div className="relative flex items-center justify-center">
          <div className="relative h-64 w-64 overflow-hidden rounded-full ring-2 ring-[color:var(--tropical-teal)]/40">
            <Image 
              src="/images/profile.png" 
              alt="Profile" 
              fill 
              className="object-cover" 
            />
          </div>
        </div>
      </div>
    </Section>
  );
}
