import { createFileRoute } from "@tanstack/react-router";
import { motion, useScroll, useSpring } from "framer-motion";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutBento } from "@/components/AboutBento";
import { ExperienceSection } from "@/components/ExperienceSection";
import { ProjectsSection } from "@/components/ProjectsSection";
import { ContactSection } from "@/components/ContactSection";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Jeet Chavan — UI/UX Designer & Creative Developer" },
      {
        name: "description",
        content:
          "3rd-year CS student from Mumbai crafting intuitive digital products at the intersection of aesthetic design and performant web engineering.",
      },
      { property: "og:title", content: "Jeet Chavan — UI/UX Designer & Creative Developer" },
      {
        property: "og:description",
        content: "Portfolio of Jeet Chavan — UI/UX design, React, Three.js, and creative frontend development.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "theme-color", content: "#0A0D14" },
    ],
  }),
  component: Index,
}));

function Index() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: "#0A0D14" }}>
      <motion.div
        className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#7c6bff] to-[#34d399] origin-left z-[100]"
        style={{ scaleX }}
      />
      <Navbar />
      <HeroSection />
      <AboutBento />
      <ExperienceSection />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
