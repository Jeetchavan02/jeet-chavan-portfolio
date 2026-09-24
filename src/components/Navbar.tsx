import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { JCLogo } from "@/components/JCLogo";
import { useTheme } from "../lib/ThemeContext";

const NAV_LINKS = [
  { label: "Home",     href: "#home" },
  { label: "About",    href: "#about" },
  { label: "Projects", href: "#projects" },
  { label: "Contact",  href: "#contact" },
];



function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className={`group relative flex items-center justify-center rounded-full w-9 h-9 border transition-all duration-300 ${isDark ? "text-white bg-transparent border-white/20 hover:bg-white/5 hover:text-[#fbbf24] hover:border-[#fbbf24]/40" : "text-[#1d1d1f] bg-transparent border-[#1d1d1f]/20 hover:bg-[#1d1d1f]/5 hover:text-[#0071e3] hover:border-[#0071e3]/40"}`}
    >
      <AnimatePresence mode="wait" initial={false}>
        {isDark ? (
          <motion.svg
            key="moon"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </motion.svg>
        ) : (
          <motion.svg
            key="sun"
            initial={{ opacity: 0, rotate: -90, scale: 0.5 }}
            animate={{ opacity: 1, rotate: 0, scale: 1 }}
            exit={{ opacity: 0, rotate: 90, scale: 0.5 }}
            transition={{ duration: 0.2 }}
            width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </motion.svg>
        )}
      </AnimatePresence>
    </button>
  );
}

function smoothScrollTo(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  document.documentElement.style.scrollBehavior = 'auto';
  el.scrollIntoView({ behavior: 'auto' });
  
  let ticks = 0;
  let interval: ReturnType<typeof setInterval>;
  
  const cancelScroll = () => {
    clearInterval(interval);
    document.documentElement.style.scrollBehavior = '';
    window.removeEventListener('wheel', cancelScroll);
    window.removeEventListener('touchmove', cancelScroll);
  };

  window.addEventListener('wheel', cancelScroll, { passive: true });
  window.addEventListener('touchmove', cancelScroll, { passive: true });

  interval = setInterval(() => {
    const target = document.getElementById(id);
    if (target) {
      const rect = target.getBoundingClientRect();
      if (Math.abs(rect.top) > 5) {
        window.scrollBy(0, rect.top);
      }
    }
    ticks++;
    if (ticks > 15) {
      cancelScroll();
    }
  }, 100);
}

export function Navbar() {
  const { theme } = useTheme();
  const isDark = theme === "dark";

  const [active, setActive] = useState("home");
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const ticking = useRef(false);

  useEffect(() => {
    const onScroll = () => {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        setScrolled(window.scrollY > 40);
        // Scroll spy
        const sections = NAV_LINKS.map((l) => l.href.slice(1));
        for (let i = sections.length - 1; i >= 0; i--) {
          const el = document.getElementById(sections[i]!);
          if (el && el.getBoundingClientRect().top <= 120) {
            setActive(sections[i]!);
            break;
          }
        }
        ticking.current = false;
      });
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      className="fixed left-0 right-0 top-0 z-50 flex justify-center px-4 pt-4"
    >
      <nav
        className="flex w-full max-w-5xl items-center justify-between rounded-full px-5 py-3 transition-all duration-300"
        style={{
          backdropFilter: scrolled ? "blur(12px)" : "none",
          WebkitBackdropFilter: scrolled ? "blur(12px)" : "none",
          background: scrolled ? (isDark ? "rgba(0,0,0,0.1)" : "rgba(255,255,255,0.4)") : "transparent",
          border: scrolled ? (isDark ? "1px solid rgba(255,255,255,0.1)" : "1px solid rgba(0,0,0,0.05)") : "1px solid transparent",
          boxShadow: scrolled
            ? (isDark ? "0 4px 24px rgba(0,0,0,0.1)" : "0 4px 24px rgba(0,0,0,0.05)")
            : "none",
        }}
      >
        {/* Logo */}
        <a href="#home" aria-label="Go to top" className={isDark ? "text-white" : "text-[#1d1d1f]"}>
          <JCLogo size={40} />
        </a>

        {/* Desktop links */}
        <ul className="hidden items-center gap-7 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.label}>
              <a
                href={link.href}
                onClick={(e) => {
                  e.preventDefault();
                  smoothScrollTo(link.href.slice(1));
                }}
                className={`text-sm font-medium transition-colors ${
                  active === link.href.slice(1) 
                    ? (isDark ? "text-white" : "text-[#1d1d1f]") 
                    : (isDark ? "text-gray-400 hover:text-white" : "text-gray-500 hover:text-[#1d1d1f]")
                }`}
              >
                {link.label}
              </a>
            </li>
          ))}
        </ul>

        {/* CTA */}
        <div className="hidden md:flex items-center gap-3">
          <ThemeToggle />
        </div>

        {/* Mobile hamburger */}
        <button
          className="flex flex-col gap-1 md:hidden p-1"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label="Toggle mobile menu"
        >
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="block h-0.5 w-5 rounded-full bg-white/70 transition-all duration-300"
              style={{
                transformOrigin: "center",
                transform:
                  mobileOpen
                    ? i === 0
                      ? "rotate(45deg) translate(3.5px, 3.5px)"
                      : i === 2
                      ? "rotate(-45deg) translate(3.5px, -3.5px)"
                      : "scaleX(0)"
                    : "none",
              }}
            />
          ))}
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.96 }}
            transition={{ duration: 0.2, ease: "easeOut" }}
            className="absolute left-4 right-4 top-20 rounded-2xl p-5"
            style={{
              backdropFilter: "blur(24px)",
              background: "rgba(10,13,20,0.92)",
              border: "1px solid rgba(255,255,255,0.10)",
            }}
          >
            <ul className="flex flex-col gap-4">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    onClick={(e) => {
                      e.preventDefault();
                      setMobileOpen(false);
                      smoothScrollTo(link.href.slice(1));
                    }}
                    className="block text-sm font-medium text-white/80 hover:text-white transition-colors"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>

          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
