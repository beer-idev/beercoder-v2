// app/page.tsx
import Hero from "@/components/hero/Hero";
import About from "@/components/sections/About";
import Skills from "@/components/sections/Skills";
import Projects from "@/components/sections/Projects";
import Experience from "@/components/sections/Experience";
import Services from "@/components/sections/Services";
import Certificates from "@/components/sections/Certificates";
import Contact from "@/components/sections/Contact";
import Footer from "@/components/layout/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      <Hero imageSrc="/images/hero-profile.jpg" />
      <About />
      <Skills />
      <Projects />
      <Experience />
      <Certificates />
      <Services />
      <Contact />
      <Footer />
    </main>
  );
}
