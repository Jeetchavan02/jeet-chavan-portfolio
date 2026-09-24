import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from "../lib/ThemeContext";

export interface ProjectData {
  id: string;
  title: string;
  desc: string;
  tech: string[];
  image: string;
  imageDark?: string;
  link: string;
}

interface LaptopDisplayProps {
  activeProject: ProjectData | null;
}

export function MacOSDesktop({ activeProject }: LaptopDisplayProps) {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  // If there's no project, we just render a blank or default state
  // Using AnimatePresence to smoothly crossfade the active project image.
  
  return (
    <div className="w-full h-full relative bg-[#0a0a0f] overflow-hidden rounded-[12px]">
      <AnimatePresence mode="wait">
        {activeProject ? (
          <motion.img
            key={`${activeProject.id}-${isDark}`}
            src={isDark && activeProject.imageDark ? activeProject.imageDark : activeProject.image}
            alt={activeProject.title}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="absolute inset-0 w-full h-full object-cover"
          />
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-[#0a0a0f]"
          />
        )}
      </AnimatePresence>
    </div>
  );
}