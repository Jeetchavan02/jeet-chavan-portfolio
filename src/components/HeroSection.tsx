import { useState, useEffect, useRef } from "react";
import { motion, useInView, useScroll, useTransform, AnimatePresence, useSpring } from "framer-motion";
import Aurora from "./Aurora";
import SpecularButton from "./SpecularButton";
import { JCLogo } from "./JCLogo";
import { useTheme } from "../lib/ThemeContext";

/* ── Preloader Overlay (Netflix Style) ── */
function Preloader({ onComplete }: { onComplete: () => void }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onComplete();
    }, 2800);
    return () => clearTimeout(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1.2, ease: "easeInOut" }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black overflow-hidden pointer-events-none"
    >
      <motion.div
        initial={{ scale: 0.8, filter: "blur(0px)", opacity: 0 }}
        animate={{ scale: [0.8, 1, 15], filter: ["blur(0px)", "blur(0px)", "blur(20px)"], opacity: [0, 1, 0] }}
        transition={{ duration: 2.8, ease: [0.76, 0, 0.24, 1], times: [0, 0.3, 1] }}
        className="flex items-center justify-center"
      >
        <JCLogo size={200} />
      </motion.div>
    </motion.div>
  );
}

/* ── Text Scramble Effect ── */
const CHARS = "!<>-_\\\\/[]{}—=+*^?#________";

function ScrambleText({ text, startDelay = 0 }: { text: string, startDelay?: number }) {
  const [displayText, setDisplayText] = useState("");
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (!isInView) return;
    
    let timer = setTimeout(() => {
      let frame = 0;
      const queue: { from: string; to: string; start: number; end: number; char?: string | undefined }[] = [];
      
      for (let i = 0; i < text.length; i++) {
        const from = text[i] || "";
        const to = text[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        queue.push({ from, to, start, end });
      }

      let animationFrame: number;

      const update = () => {
        let output = "";
        let complete = 0;

        for (let i = 0; i < queue.length; i++) {
          const item = queue[i];
          if (!item) continue;
          let { from, to, start, end, char } = item;
          
          if (frame >= end) {
            complete++;
            output += to;
          } else if (frame >= start) {
            if (!char || Math.random() < 0.28) {
              char = CHARS[Math.floor(Math.random() * CHARS.length)];
              item.char = char;
            }
            output += `<span class="text-[#7c3aed] opacity-70">${char}</span>`;
          } else {
            output += from;
          }
        }

        setDisplayText(output);

        if (complete === queue.length) {
          cancelAnimationFrame(animationFrame);
        } else {
          frame++;
          animationFrame = requestAnimationFrame(update);
        }
      };

      animationFrame = requestAnimationFrame(update);
      return () => cancelAnimationFrame(animationFrame);
    }, startDelay);

    return () => clearTimeout(timer);
  }, [text, isInView, startDelay]);

  return <span ref={ref} dangerouslySetInnerHTML={{ __html: displayText || text }} />;
}

/* ── Staggered Letter Animation ── */
const letterContainer = {
  hidden: { opacity: 0 },
  visible: (i = 1) => ({
    opacity: 1,
    transition: { staggerChildren: 0.05, delayChildren: 0.5 * i },
  }),
};

const letterVariant = {
  hidden: { opacity: 0, y: -150, scale: 1.5, filter: "blur(10px)" },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    filter: "blur(0px)",
    transition: { type: "spring", damping: 15, stiffness: 100 }
  },
} as any;

function StaggeredHeading({ text, className, style, play }: { text: string, className?: string, style?: React.CSSProperties, play: boolean }) {
  return (
    <motion.h1
      className={`flex flex-wrap justify-start ${className}`}
      style={style}
      variants={letterContainer}
      initial="hidden"
      animate={play ? "visible" : "hidden"}
    >
      {text.split("").map((char, index) => (
        <motion.span
          key={index}
          variants={letterVariant}
          className="inline-block origin-top"
          style={{ whiteSpace: char === " " ? "pre" : "normal" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
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

export function HeroSection() {
  const [isLoaded, setIsLoaded] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });
  
  const textOpacity = useTransform(smoothProgress, [0, 0.5], [1, 0]);
  const textY = useTransform(smoothProgress, [0, 0.5], [0, -80]);
  const buttonsY = useTransform(smoothProgress, [0, 0.4], [0, 60]);
  const buttonsOpacity = useTransform(smoothProgress, [0, 0.3], [1, 0]);
  const statusOpacity = useTransform(smoothProgress, [0, 0.2], [1, 0]);

  const { theme } = useTheme();
  const isDark = theme === "dark";

  return (
    <>
      <AnimatePresence>
        {!isLoaded && <Preloader onComplete={() => setIsLoaded(true)} />}
      </AnimatePresence>

      <div
        id="home"
        ref={containerRef}
        className={`relative h-screen w-full overflow-hidden transition-colors duration-700 ${
          isDark ? "bg-[#0A0A0F] text-white" : "bg-[#f5f5f7] text-[#1d1d1f]"
        }`}
      >
        {/* Aurora Background */}
        <div 
          className="absolute inset-0 z-0 transition-opacity duration-700"
          style={{
            maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)',
            opacity: isDark ? 1 : 0.75,
          }}
        >
          <Aurora
            colorStops={isDark ? ["#0a0a0f", "#7c3aed", "#5227ff"] : ["#ffffff", "#c8d8e0", "#e8d0d0"]}
            speed={1}
            amplitude={1}
            blend={isDark ? 0.5 : 0.8}
          />
        </div>



        {/* Subtle cyan glow */}
        <motion.div
          className="absolute top-1/2 left-1/3 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#7c3aed] blur-[120px] pointer-events-none z-0"
          style={{ opacity: useTransform(smoothProgress, [0, 0.5], [0.04, 0]) }}
        />

        {/* ── Name Block ── */}
        <motion.div
          className="absolute z-10"
          style={{
            left: "8%",
            top: "28%",
            width: "50%",
            y: textY,
            opacity: textOpacity,
          }}
        >
          <StaggeredHeading
            text="JEET"
            className="leading-none uppercase block"
            style={{
              fontFamily: "'Epilogue', sans-serif",
              fontWeight: 900,
              fontSize: "clamp(60px, 10vw, 140px)",
              letterSpacing: "-0.04em",
              lineHeight: 1,
            }}
            play={isLoaded}
          />

          {/* Chavan — script, ~55% size of JEET, line-height:1 to collapse ascender box */}
          {isLoaded && (
            <motion.p
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0, duration: 0.7, ease: "easeOut" }}
              className="block"
              style={{
                fontFamily: "'Pinyon Script', cursive",
                fontSize: "clamp(52px, 8vw, 120px)",
                lineHeight: 1,
                marginTop: "-10px",
                marginLeft: "10px",
              }}
            >
              Chavan
            </motion.p>
          )}

          {/* Role line — 40px below surname */}
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.4, duration: 0.6, ease: "easeOut" }}
              style={{ marginTop: "clamp(28px, 3.5vw, 48px)" }}
              className="w-fit"
            >
              <p className={`font-mono text-xs sm:text-sm tracking-[0.22em] uppercase transition-colors duration-700 ${isDark ? "text-white/50" : "text-[#707070]"}`}>
                Computer Engineer · Developer · Problem Solver
              </p>
              <div className={`h-px w-full mt-3 mb-0 transition-colors duration-700 ${isDark ? "bg-[#7c3aed]/40" : "bg-[#707070]/20"}`} />
            </motion.div>
          )}

          {/* Buttons — 32px below role */}
          {isLoaded && (
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.8, duration: 0.6, ease: "easeOut" }}
              className="flex flex-wrap gap-4"
              style={{ marginTop: "clamp(20px, 2.5vw, 36px)" }}
            >
              <SpecularButton
                onClick={() => smoothScrollTo('projects')}
                className="text-xs font-bold tracking-widest uppercase shadow-xl"
                baseColor={isDark ? "#ffffff" : "#1d1d1f"}
                lineColor={isDark ? "#a1a1aa" : "#52525b"}
                textColor={isDark ? "#1d1d1f" : "#ffffff"}
                tint={isDark ? "#ffffff" : "#1d1d1f"}
                tintOpacity={1}
                size="md"
              >
                Projects
              </SpecularButton>
              <SpecularButton
                onClick={() => smoothScrollTo('contact')}
                className="text-xs font-bold tracking-widest uppercase shadow-xl"
                baseColor={isDark ? "#ffffff" : "#1d1d1f"}
                lineColor={isDark ? "#a1a1aa" : "#52525b"}
                textColor={isDark ? "#1d1d1f" : "#ffffff"}
                tint={isDark ? "#ffffff" : "#1d1d1f"}
                tintOpacity={1}
                size="md"
              >
                Contact me
              </SpecularButton>
            </motion.div>
          )}
        </motion.div>



        {/* Scroll hint */}
        {isLoaded && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 2.5 }}
            style={{ opacity: statusOpacity }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          >
            <span className="font-mono text-[10px] text-white/30 tracking-[0.3em] uppercase">Scroll</span>
            <motion.div
              animate={{ height: [0, 32, 0], y: [0, 16, 32] }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="w-px bg-[#7c3aed] opacity-50"
            />
          </motion.div>
        )}
      </div>
    </>
  );
}
