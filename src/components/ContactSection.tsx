import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "../lib/ThemeContext";

const SOCIALS = [
  {
    label: "GitHub",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
      </svg>
    ),
    color: "#fff",
  },
  {
    label: "LinkedIn",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
      </svg>
    ),
    color: "#60a5fa",
  },
  {
    label: "Figma",
    href: "#",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="h-4 w-4">
        <path d="M15.852 8.981h-4.588V0h4.588c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.491-4.49 4.491zM12.735 7.51h3.117c1.665 0 3.019-1.355 3.019-3.019s-1.355-3.019-3.019-3.019h-3.117V7.51zm0 1.471H8.148c-2.476 0-4.49-2.014-4.49-4.49S5.672 0 8.148 0h4.588v8.981zm-4.587-7.51c-1.665 0-3.019 1.355-3.019 3.019s1.354 3.02 3.019 3.02h3.117V1.471H8.148zm4.587 15.019H8.148c-2.476 0-4.49-2.014-4.49-4.49s2.014-4.49 4.49-4.49h4.588v8.98zM8.148 8.981c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019h3.117V8.981H8.148zm8.707 0c2.476 0 4.49 2.014 4.49 4.49s-2.014 4.49-4.49 4.49-4.49-2.014-4.49-4.49 2.014-4.49 4.49-4.49zm0 1.471c-1.665 0-3.019 1.355-3.019 3.019s1.355 3.019 3.019 3.019 3.019-1.355 3.019-3.019-1.354-3.019-3.019-3.019zm-4.19 7.51h-4.588c-2.476 0-4.49 2.014-4.49 4.49S5.673 24 8.148 24h4.588v-6.038zm-4.587 4.568c-1.665 0-3.019-1.354-3.019-3.019s1.355-3.019 3.019-3.019h3.117v6.038H8.078z" />
      </svg>
    ),
    color: "#c084fc",
  },
];

export function ContactSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";
  const [copied, setCopied] = useState(false);

  const copyEmail = () => {
    navigator.clipboard.writeText("jeetnchavan02@gmail.com").then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  return (
    <section id="contact" className={`relative px-4 py-32 md:py-48 transition-colors duration-700 overflow-hidden flex flex-col justify-center min-h-[90vh] ${isDark ? "bg-[#0A0A0F]" : "bg-[#f5f5f7]"}`}>
      
      {/* Ambient Closing Glow */}
      <div
        className="pointer-events-none absolute bottom-0 left-1/2 -translate-x-1/2 w-[120vw] h-[60vh] max-h-[800px]"
        style={{
          background: "radial-gradient(circle at bottom center, rgba(124,107,255,0.25) 0%, rgba(52,211,153,0.05) 40%, transparent 70%)",
          filter: "blur(120px)",
          opacity: isDark ? 0.6 : 0.4,
          zIndex: 0
        }}
      />

      <div className="mx-auto w-full max-w-7xl flex flex-col items-center text-center relative z-10">
        
        {/* Section Label */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col items-center"
        >
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[11px] font-semibold tracking-widest uppercase"
            style={{
              background: isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.04)",
              color: isDark ? "rgba(255,255,255,0.6)" : "rgba(0,0,0,0.5)",
            }}
          >
            04 — Contact
          </div>
          <h2 className={`text-4xl md:text-7xl lg:text-[100px] font-extrabold tracking-tight leading-[0.9] transition-colors duration-700 ${isDark ? "text-white" : "text-[#1d1d1f]"}`}>
            Ready to build <br/>
            the <span className={`bg-gradient-to-br bg-clip-text text-transparent ${isDark ? "from-white to-neutral-600" : "from-neutral-900 to-neutral-400"}`}>future?</span>
          </h2>
        </motion.div>

        {/* Massive Interactive Email */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 mb-24 w-full"
        >
          <button 
            onClick={copyEmail}
            className={`group relative w-full flex flex-col items-center transition-all duration-500`}
            aria-label="Copy email address"
          >
            <span className={`text-[4vw] sm:text-3xl md:text-5xl lg:text-7xl font-bold tracking-tight transition-all duration-300 ${isDark ? 'text-white/40 group-hover:text-white' : 'text-black/40 group-hover:text-black'}`}>
              jeetnchavan02@gmail.com
            </span>
            
            {/* Copy Feedback */}
            <AnimatePresence mode="wait">
              {copied ? (
                <motion.span
                  key="copied"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className={`absolute -bottom-10 text-sm font-semibold flex items-center gap-2 ${isDark ? 'text-green-400' : 'text-green-600'}`}
                >
                  <svg className="h-4 w-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  Copied to clipboard!
                </motion.span>
              ) : (
                <motion.span
                  key="idle"
                  initial={{ opacity: 0, y: 10, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -10, scale: 0.9 }}
                  className={`absolute -bottom-10 text-xs font-mono tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-opacity ${isDark ? 'text-white/40' : 'text-black/40'}`}
                >
                  Click to copy email
                </motion.span>
              )}
            </AnimatePresence>
          </button>
        </motion.div>

        {/* Socials & The Minimalist Colophon */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full flex flex-col items-center mt-auto relative z-10"
        >
          {/* Social Icons */}
          <div className="flex items-center justify-center gap-4 mb-16">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                className={`group flex items-center justify-center w-14 h-14 rounded-full transition-all duration-300 ${isDark ? 'bg-white/5 hover:bg-white/10 text-white/50 hover:text-white' : 'bg-black/5 hover:bg-black/10 text-black/50 hover:text-black'}`}
                aria-label={s.label}
              >
                <div className="transition-transform duration-300 group-hover:scale-110">
                  {s.icon}
                </div>
              </a>
            ))}
          </div>

          {/* Divider Line */}
          <div className="w-full h-px mb-8" style={{ background: isDark ? "linear-gradient(90deg, transparent, rgba(255,255,255,0.1), transparent)" : "linear-gradient(90deg, transparent, rgba(0,0,0,0.1), transparent)" }} />

          {/* The Minimalist Colophon */}
          <div className={`relative w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-0 font-mono-brand text-[10px] tracking-widest uppercase transition-colors duration-700 ${isDark ? "text-white/40" : "text-black/40"}`}>
            
            {/* Left: Location */}
            <div className="flex items-center gap-2 md:absolute md:left-0">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               Mumbai, IN
            </div>

            {/* Center: Tech Stack */}
            <div className="text-center opacity-70 z-10">
              Designed & Engineered by Jeet Chavan • Built with precision.
            </div>
            
          </div>
        </motion.div>

      </div>
    </section>
  );
}
