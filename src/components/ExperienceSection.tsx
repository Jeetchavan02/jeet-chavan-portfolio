import React, { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { useTheme } from "../lib/ThemeContext";

import { Squares } from "./ui/Squares";

interface ExperienceItem {
  id: string;
  role: string;
  company: string;
  date: string;
  description: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "1",
    role: "Sponsorship & Budget Head",
    company: "TEDxCRCE",
    date: "July 2026 - Present",
    description: [
      "Spearheading sponsorship acquisition and budget operations for a campus Internship Expo, overseeing resource allocation across an event with 400+ student participants.",
      "Designed and delivered a resume-building workshop for 150+ students."
    ],
  },
  {
    id: "2",
    role: "Workforce Member",
    company: "GDSC CRCE",
    date: "Sep 2024 - Aug 2025",
    description: [
      "Contributed to organizing flagship college events including Bit N Build, a 24-hour hackathon, and Unplug by the Beach."
    ],
  },
  {
    id: "3",
    role: "Campaign Coordinator",
    company: "Dilaasa CEHAT",
    date: "Jun 2025 - Dec 2025",
    description: [
      "Led a UNICEF-affiliated awareness campaign on digital violence against women; received BMC trophy and certificate of appreciation."
    ],
  },
  {
    id: "4",
    role: "Event Management Intern",
    company: "Medivision Events",
    date: "Aug 2024 - Sep 2024",
    description: [
      "Coordinated vendor operations, guest registrations, and on-ground logistics for a 250+ attendee radiology conference at Lokmanya Tilak Hospital, Sion."
    ],
  },
  {
    id: "5",
    role: "Class Representative",
    company: "Fr.CRCE",
    date: "Aug 2024 - Present",
    description: [
      "Liaison between faculty and a class of 70+ students for 3 years, managing communication, grievances, and administrative coordination."
    ],
  },
];

export function ExperienceSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  return (
    <section 
      ref={containerRef}
      id="experience" 
      className={`relative w-full py-12 md:py-16 transition-colors duration-700 ${isDark ? "bg-[#0A0A0F]" : "bg-[#f5f5f7]"} overflow-hidden`}
    >
      <div className="absolute inset-0 z-0">
        <Squares 
          direction="diagonal"
          speed={0.5}
          squareSize={40}
          borderColor={isDark ? "rgba(255,255,255,0.03)" : "rgba(0,0,0,0.03)"} 
          hoverFillColor={isDark ? "rgba(124,107,255,0.05)" : "rgba(124,107,255,0.1)"}
        />
      </div>
      <div className="max-w-5xl mx-auto px-6 relative z-10">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center lg:text-left"
        >
          <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest mb-2">02 — The Journey</p>
          <h2 className={`text-4xl font-extrabold ${isDark ? "text-white" : "text-[#1d1d1f]"}`}>
            Experience & <span className="text-[#7c6bff]">Leadership</span>.
          </h2>
        </motion.div>

        {/* Timeline Container */}
        <div className="relative">
          
          {/* Background Line */}
          <div className={`absolute left-6 md:left-1/2 top-0 bottom-0 w-[2px] -translate-x-1/2 rounded-full ${isDark ? "bg-white/10" : "bg-black/10"}`} />
          
          {/* Animated Glow Line */}
          <motion.div 
            className="absolute left-6 md:left-1/2 top-0 bottom-0 w-[4px] -translate-x-1/2 origin-top rounded-full bg-gradient-to-b from-[#7c6bff] via-[#00e5ff] to-transparent shadow-[0_0_20px_rgba(124,107,255,0.6)]"
            style={{ scaleY }}
          />

          {/* Experience Items */}
          <div className="flex flex-col gap-6 md:gap-6 relative">
            {experiences.map((exp, index) => {
              const isEven = index % 2 === 0;
              return (
                <div key={exp.id} className={`flex flex-col md:flex-row items-center justify-between w-full relative ${isEven ? 'md:flex-row-reverse' : ''}`}>
                  
                  {/* Timeline Dot */}
                  <div className="absolute left-6 md:left-1/2 top-1/2 -translate-y-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0A0A0F] border-2 border-[#00e5ff] shadow-[0_0_15px_rgba(52,211,153,0.8)] z-10 hidden md:block" />
                  
                  {/* Mobile Dot */}
                  <div className="absolute left-6 top-8 -translate-x-1/2 w-4 h-4 rounded-full bg-[#0A0A0F] border-2 border-[#00e5ff] shadow-[0_0_15px_rgba(52,211,153,0.8)] z-10 md:hidden" />

                  {/* Empty space for alternating layout on Desktop */}
                  <div className="w-1/2 hidden md:block" />

                  {/* Card Content */}
                  <motion.div 
                    initial={{ opacity: 0, x: isEven ? 50 : -50, scale: 0.9 }}
                    whileInView={{ opacity: 1, x: 0, scale: 1 }}
                    viewport={{ once: true, margin: "-100px" }}
                    transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                    className={`w-full md:w-5/12 pl-16 md:pl-0 ${isEven ? 'md:pr-12' : 'md:pl-12'}`}
                  >
                    <div 
                      className="p-5 md:p-6 rounded-[24px] relative overflow-hidden group"
                      style={{
                        background: isDark ? "rgba(255, 255, 255, 0.03)" : "rgba(0, 0, 0, 0.03)",
                        border: isDark ? "1px solid rgba(255, 255, 255, 0.1)" : "1px solid rgba(0, 0, 0, 0.1)",
                        backdropFilter: "blur(20px)",
                        boxShadow: isDark ? "0 10px 40px rgba(0,0,0,0.3)" : "0 10px 40px rgba(0,0,0,0.05)",
                      }}
                    >
                      <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      <div className="flex flex-col mb-4 relative z-10">
                        <span className={`font-mono-brand text-[10px] uppercase tracking-widest mb-2 ${isDark ? "text-[#00e5ff]" : "text-[#0284c7]"}`}>{exp.date}</span>
                        <h3 className={`text-2xl font-bold tracking-tight mb-1 ${isDark ? "text-white" : "text-[#1d1d1f]"}`}>{exp.role}</h3>
                        <h4 className={`text-sm font-semibold ${isDark ? "text-[#7c6bff]" : "text-[#5227ff]"}`}>{exp.company}</h4>
                      </div>

                      <ul className="space-y-3 relative z-10">
                        {exp.description.map((desc, i) => (
                          <li key={i} className={`text-sm leading-relaxed ${isDark ? "text-white/60" : "text-[#1d1d1f]/70"}`}>
                            {desc}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </motion.div>

                </div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
