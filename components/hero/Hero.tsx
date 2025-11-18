import Image from "next/image";
import SocialLinks from "@/components/hero/SocialLinks";
import ScrollHint from "@/components/hero/ScrollHint";
import { FiEye, FiDownload } from "react-icons/fi";
import Constellation from "@/components/hero/Constellation";
import SmoothLink from "@/components/ui/SmoothLink";

type Props = {
  imageSrc?: string;
};

export default function Hero({ imageSrc = "/images/hero-profile.jpg" }: Props) {
  return (
    <section
      id="home"
      className="relative mx-auto flex min-h-screen w-full max-w-6xl items-center gap-10 px-4 pt-16 pb-12 md:pt-36 md:pb-16"
    >
      {/* wow effect: animated constellation */}
      <Constellation />
      <div className="flex-1">
        {/* Mobile big center image/rings above text */}
        <div className="-mt-32 mb-12 md:hidden flex items-center justify-center">
          <div className="relative h-44 w-44">
            <div className="absolute inset-[-8px] rounded-full border border-[color:var(--dusk-blue)]/30 animate-[ringPulse_7s_ease-in-out_infinite]" />
            <div className="absolute inset-[-18px] rounded-full border border-[color:var(--tropical-teal)]/25 animate-[ringPulse2_8s_ease-in-out_infinite]" />
            <div className="relative z-10 h-full w-full overflow-hidden rounded-full ring-2 ring-[color:var(--tropical-teal)]/40">
              <Image src={imageSrc} alt="profile" fill className="object-cover" />
            </div>
          </div>
        </div>
        <p className="mb-3 text-sm text-[color:var(--neon-ice)]">Available for opportunities</p>
        <h1 className="text-4xl font-extrabold md:text-6xl">
          <span className="bg-gradient-to-r from-[color:var(--neon-ice)] to-[color:var(--tropical-teal)] bg-clip-text text-transparent">WARAWUT THASUNGNOEN</span>
          <span className="block text-slate-200">Web Developer</span>
        </h1>
        <p className="mt-5 max-w-xl text-slate-300">
          Passionate Web Developer with hands-on experience in both front-end and back-end development using Vue.js, Node.js, and PHP. Skilled in building scalable web applications, debugging complex systems, and optimizing performance.
        </p>
        <div className="mt-8 flex flex-wrap gap-4">
          <SmoothLink href="#work" offset={100} className="inline-flex items-center gap-2 rounded-lg bg-[color:var(--tropical-teal)] px-5 py-3 font-semibold text-slate-900 transition hover:bg-[color:var(--neon-ice)]">
            <FiEye className="h-4 w-4" />
            <span>View Work</span>
          </SmoothLink>
          <a href="/resume/Resume Warawut Thasungnoen.pdf" download="Resume_Warawut_Thasungnoen.pdf" className="inline-flex items-center gap-2 rounded-lg border border-[color:var(--tropical-teal)] px-5 py-3 font-semibold text-[color:var(--tropical-teal)] transition hover:bg-[color:var(--space-indigo)]/60">
            <FiDownload className="h-4 w-4" />
            <span>Download Resume</span>
          </a>
        </div>

        <SocialLinks />
      </div>

      <div className="relative hidden flex-1 justify-center md:flex">
        {/* concentric rings with subtle motion */}
        <div className="absolute inset-0 m-auto h-72 w-72 rounded-full border border-[color:var(--neon-ice)]/20 animate-[ringPulse_6s_ease-in-out_infinite]" />
        <div className="absolute inset-0 m-auto h-80 w-80 rounded-full border border-[color:var(--tropical-teal)]/25 animate-[ringPulse2_7s_ease-in-out_infinite]" />
        <div className="absolute inset-0 m-auto h-96 w-96 rounded-full border border-[color:var(--dusk-blue)]/30 animate-[ringPulse_8s_ease-in-out_infinite]" />
        {/* profile image */}
        <div className="relative z-10 h-64 w-64 overflow-hidden rounded-full ring-2 ring-[color:var(--tropical-teal)]/40">
          <Image src={imageSrc} alt="profile" fill className="object-cover" priority />
        </div>
      </div>
      {/* scroll hint */}
      <ScrollHint href="#about" />
    </section>
  );
}
