import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { AboutBento } from "@/components/AboutBento";
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
  return (
    <main className="relative min-h-screen overflow-x-hidden" style={{ background: "#0A0D14" }}>
      <Navbar />
      <HeroSection />
      <AboutBento />
      <ProjectsSection />
      <ContactSection />
    </main>
  );
}
