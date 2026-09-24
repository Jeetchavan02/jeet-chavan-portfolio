import { motion } from "framer-motion";
import { useTheme } from "../lib/ThemeContext";

const APPS = [
  {
    name: "Mail",
    href: "mailto:jeetnchavan02@gmail.com",
    bg: "bg-white",
    shadow: "rgba(234,67,53,0.3)",
    icon: (
      <img src="/icons/gmail.png" alt="Mail" className="w-full h-full object-contain p-2.5" />
    )
  },
  {
    name: "LinkedIn",
    href: "https://www.linkedin.com/in/jeetchavan02/",
    bg: "bg-[#0A66C2]",
    shadow: "rgba(10,102,194,0.4)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-[26px] h-[26px] text-white"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" /></svg>
    )
  },
  {
    name: "GitHub",
    href: "https://github.com/Jeetchavan02",
    bg: "bg-[#161B22]",
    border: "border border-white/10",
    shadow: "rgba(0,0,0,0.5)",
    icon: (
      <svg viewBox="0 0 24 24" fill="currentColor" className="w-[30px] h-[30px] text-white"><path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" /></svg>
    )
  },
  {
    name: "Resume",
    href: "/resume.pdf",
    bg: "bg-white",
    shadow: "rgba(10,132,255,0.3)",
    badge: true,
    icon: (
      <img src="/icons/files.png" alt="Files" className="w-full h-full object-contain p-[6px]" />
    )
  },
  {
    name: "WhatsApp",
    href: "https://wa.me/918850021599",
    bg: "bg-[#25D366]",
    shadow: "rgba(37,211,102,0.4)",
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" className="w-[28px] h-[28px] text-white"><path d="M7.9 20A9 9 0 1 0 4 16.1L2 22Z"/></svg>
    )
  }
];

export function ContactSection() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <section id="contact" className={`relative px-4 py-32 md:py-48 transition-colors duration-700 overflow-hidden flex flex-col items-center justify-center min-h-[90vh] ${isDark ? "bg-[#0A0A0F]" : "bg-[#F5F5FA]"}`}>
      
      {/* Dot Grid Background */}
      <div 
        className="absolute inset-0 z-0 opacity-15"
        style={{
          backgroundImage: isDark ? "radial-gradient(#7C3AED 1px, transparent 1px)" : "radial-gradient(#7C3AED 1.5px, transparent 1.5px)",
          backgroundSize: "24px 24px"
        }}
      />

      <div className="mx-auto w-full max-w-5xl flex flex-col items-center text-center relative z-10">
        
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-12 flex flex-col items-center"
        >
          <div className={`inline-flex items-center gap-2 rounded-full px-4 py-1.5 mb-6 text-[11px] font-semibold tracking-widest uppercase border ${isDark ? "border-[#A78BFA]/40 text-[#A78BFA] bg-[#A78BFA]/10" : "border-[#7C3AED]/40 text-[#7C3AED] bg-[#7C3AED]/10"}`}>
            04 — CONTACT
          </div>
          <h2 className={`text-4xl md:text-5xl lg:text-7xl font-extrabold tracking-tight leading-tight mb-4 ${isDark ? "text-white" : "text-[#1d1d1f]"}`}>
            Let's build the <span className="text-[#A78BFA] animate-pulse">future.</span>
          </h2>
          <p className={`font-mono text-xs md:text-sm tracking-wide ${isDark ? "text-white/60" : "text-black/60"}`}>
            Open to internships · Mumbai, IN · Replies within 24hrs
          </p>
        </motion.div>

        {/* iOS App Folder Container */}
        <motion.div
          initial={{ opacity: 0, scale: 0.85, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ type: "spring", stiffness: 300, damping: 25, duration: 0.5 }}
          className="mt-8 mb-24 flex justify-center"
        >
          <div 
            className="w-[340px] rounded-[28px] p-[24px] relative"
            style={{
              background: isDark ? "rgba(30, 30, 40, 0.72)" : "rgba(240, 240, 250, 0.85)",
              backdropFilter: "blur(40px) saturate(180%)",
              WebkitBackdropFilter: "blur(40px) saturate(180%)",
              border: isDark ? "1px solid rgba(255,255,255,0.12)" : "1px solid rgba(0,0,0,0.05)",
              boxShadow: isDark 
                ? "0 32px 64px rgba(0,0,0,0.6), 0 0 0 0.5px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.1)"
                : "0 32px 64px rgba(0,0,0,0.15), 0 0 0 0.5px rgba(0,0,0,0.05), inset 0 1px 0 rgba(255,255,255,0.5)"
            }}
          >
            {/* Folder Title */}
            <div className={`text-center mb-6 font-[Inter] font-medium text-[15px] ${isDark ? "text-white/90" : "text-black/90"}`}>
              Connect
            </div>

            {/* App Grid */}
            <div className="grid grid-cols-3 gap-x-4 gap-y-5">
              
              {/* Real Apps */}
              {APPS.map((app, index) => (
                <motion.a
                  key={app.name}
                  href={app.href}
                  target={app.href.startsWith("http") ? "_blank" : undefined}
                  rel={app.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  className="flex flex-col items-center group relative no-underline cursor-pointer"
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.04, type: "spring", stiffness: 350, damping: 20 }}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <motion.div 
                    variants={{
                      hover: { scale: 1.12, boxShadow: `0 10px 20px ${app.shadow}` },
                      tap: { scale: 0.9 }
                    }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    className={`w-[60px] h-[60px] rounded-[22.5%] flex items-center justify-center relative ${app.bg} ${app.border || ''}`}
                  >
                    {app.icon}

                    {/* Notification Badge */}
                    {app.badge && (
                      <div className="absolute -top-1 -right-1 bg-[#10B981] rounded-full px-1.5 py-0.5 text-[10px] font-bold text-white border-2 border-[rgba(30,30,40,0.72)] flex items-center justify-center shadow-sm">
                        ↓
                      </div>
                    )}
                  </motion.div>
                  <span className={`text-[11px] font-[Inter] text-center mt-[6px] truncate w-full ${isDark ? "text-white/80" : "text-[#1a1a2a]"}`}>
                    {app.name}
                  </span>
                </motion.a>
              ))}

              {/* Ghost Slots */}
              {[...Array(4)].map((_, i) => (
                <motion.div 
                  key={`ghost-${i}`}
                  initial={{ opacity: 0, scale: 0.5 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: (APPS.length + i) * 0.04, type: "spring", stiffness: 350, damping: 20 }}
                  className="flex flex-col items-center"
                >
                  <div 
                    className="w-[60px] h-[60px] rounded-[22.5%]"
                    style={{
                      background: isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.02)",
                      border: isDark ? "1.5px dashed rgba(255,255,255,0.12)" : "1.5px dashed rgba(0,0,0,0.15)"
                    }}
                  />
                  {/* Invisible spacer to maintain grid height */}
                  <span className="text-[11px] mt-[6px] opacity-0">Empty</span>
                </motion.div>
              ))}

            </div>
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1, delay: 0.3 }}
          className="w-full flex flex-col items-center mt-auto relative z-10"
        >
          {/* Thin Top Border */}
          <div className="w-full h-px mb-8" style={{ borderTop: isDark ? "1px solid rgba(255,255,255,0.06)" : "1px solid rgba(0,0,0,0.06)" }} />

          <div className={`relative w-full flex flex-col md:flex-row justify-center items-center gap-6 md:gap-0 font-mono-brand text-[10px] tracking-widest uppercase transition-colors duration-700 ${isDark ? "text-white/40" : "text-black/40"}`}>
            
            {/* Location */}
            <div className="flex items-center gap-2 md:absolute md:left-0">
               <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
               Mumbai, IN
            </div>

            {/* Colophon */}
            <div className="text-center opacity-70 z-10">
              DESIGNED & ENGINEERED BY JEET CHAVAN · BUILT WITH PRECISION.
            </div>
            
          </div>
        </motion.div>

      </div>
    </section>
  );
}
