import { useState, useRef, useCallback } from "react";
import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from "framer-motion";

/* ─────────────────────────────────────────
   1. MAGNETIC BUTTON
───────────────────────────────────────── */
function MagneticButton() {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 200, damping: 20 });
  const sy = useSpring(y, { stiffness: 200, damping: 20 });

  const [hovered, setHovered] = useState(false);

  const onMove = useCallback((e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    x.set((e.clientX - cx) * 0.45);
    y.set((e.clientY - cy) * 0.45);
  }, [x, y]);

  const onLeave = useCallback(() => {
    x.set(0); y.set(0);
    setHovered(false);
  }, [x, y]);

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest">Magnetic Button</p>
      <motion.button
        ref={ref}
        onMouseMove={onMove}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={onLeave}
        style={{
          x: sx,
          y: sy,
          background: "linear-gradient(135deg, #7c6bff, #34d399)",
          boxShadow: hovered
            ? "0 0 40px rgba(124,107,255,0.7), 0 0 80px rgba(52,211,153,0.3)"
            : "0 0 20px rgba(124,107,255,0.35)",
        }}
        whileTap={{ scale: 0.94 }}
        className="relative rounded-full px-8 py-4 text-sm font-bold text-white overflow-hidden"
        aria-label="Magnetic button demo"
      >
        {/* Inner shine */}
        <motion.div
          className="pointer-events-none absolute inset-0 rounded-full"
          style={{
            background: "radial-gradient(circle at 30% 30%, rgba(255,255,255,0.25) 0%, transparent 60%)",
          }}
        />
        <span className="relative z-10">
          {hovered ? "✨ Got me!" : "Hover me"}
        </span>
      </motion.button>
      <p className="text-[11px] text-white/30">Follows cursor magnetically within range</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   2. FLUID GLASS TOGGLE
───────────────────────────────────────── */
function GlassToggle() {
  const OPTIONS = ["Design", "Dev", "Both"] as const;
  const [active, setActive] = useState<(typeof OPTIONS)[number]>("Both");

  const colors: Record<typeof OPTIONS[number], string> = {
    Design: "#c084fc",
    Dev: "#60a5fa",
    Both: "#34d399",
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest">Mode Toggle</p>
      <div
        className="relative flex rounded-full p-1"
        style={{
          background: "rgba(255,255,255,0.05)",
          border: "1px solid rgba(255,255,255,0.10)",
        }}
      >
        {OPTIONS.map((o) => (
          <button
            key={o}
            onClick={() => setActive(o)}
            className="relative rounded-full px-5 py-2 text-xs font-semibold z-10 transition-colors duration-200"
            style={{ color: active === o ? "#fff" : "rgba(255,255,255,0.4)" }}
            aria-pressed={active === o}
          >
            {active === o && (
              <motion.div
                layoutId="glass-toggle-pill"
                className="absolute inset-0 rounded-full"
                style={{
                  background: `${colors[active]}25`,
                  border: `1px solid ${colors[active]}50`,
                  boxShadow: `0 0 16px ${colors[active]}40`,
                }}
                transition={{ type: "spring", stiffness: 400, damping: 35 }}
              />
            )}
            <span className="relative z-10">{o}</span>
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.p
          key={active}
          initial={{ opacity: 0, y: 6 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -6 }}
          transition={{ duration: 0.18 }}
          className="text-[11px] font-medium"
          style={{ color: colors[active] }}
        >
          {active === "Design" && "Figma → hi-fi prototypes"}
          {active === "Dev"    && "React, TypeScript, Node"}
          {active === "Both"   && "I do both — design & code ✦"}
        </motion.p>
      </AnimatePresence>
    </div>
  );
}

/* ─────────────────────────────────────────
   3. CURSOR TRAIL CANVAS
───────────────────────────────────────── */
function CursorTrailCard() {
  const canvasRef = useRef<HTMLDivElement>(null);
  const trail = useRef<{ x: number; y: number; id: number }[]>([]);
  const [dots, setDots] = useState<{ x: number; y: number; id: number }[]>([]);
  const counterRef = useRef(0);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    const id = ++counterRef.current;
    trail.current = [...trail.current.slice(-18), { x, y, id }];
    setDots([...trail.current]);
  };

  return (
    <div className="flex flex-col items-center gap-4">
      <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest">Cursor Trail</p>
      <div
        ref={canvasRef}
        onMouseMove={onMove}
        className="relative h-32 w-full max-w-xs rounded-xl overflow-hidden cursor-crosshair"
        style={{
          background: "rgba(255,255,255,0.03)",
          border: "1px solid rgba(255,255,255,0.09)",
        }}
      >
        <p className="absolute inset-0 flex items-center justify-center text-xs text-white/25 pointer-events-none">
          Move cursor here
        </p>
        {dots.map((d, i) => {
          const alpha = (i + 1) / dots.length;
          const size = 6 + alpha * 10;
          return (
            <motion.div
              key={d.id}
              initial={{ opacity: alpha * 0.9, scale: 1 }}
              animate={{ opacity: 0, scale: 0.2 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="absolute rounded-full pointer-events-none"
              style={{
                left: d.x - size / 2,
                top: d.y - size / 2,
                width: size,
                height: size,
                background: `rgba(124,107,255,${alpha * 0.8})`,
                boxShadow: `0 0 ${size}px rgba(124,107,255,0.6)`,
              }}
            />
          );
        })}
      </div>
      <p className="text-[11px] text-white/30">Glowing trail that fades over time</p>
    </div>
  );
}

/* ─────────────────────────────────────────
   SECTION WRAPPER
───────────────────────────────────────── */
export function UiPlayground() {
  return (
    <section id="craft" className="relative px-4 py-24">
      {/* Ambient */}
      <div
        className="ambient-blob"
        style={{
          width: 500, height: 300,
          background: "#34d399",
          bottom: "5%", right: "0",
          opacity: 0.09,
        }}
      />

      <div className="mx-auto max-w-6xl">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10"
        >
          <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest mb-2">03 — Craft</p>
          <h2 className="text-4xl font-extrabold text-white">
            Frontend{" "}
            <span className="gradient-text">Micro-Lab</span>.
          </h2>
          <p className="mt-3 max-w-lg text-sm text-white/55">
            Small interactive experiments I build to stay sharp on motion, physics, and UI craft.
            Go ahead — play around.
          </p>
        </motion.div>

        {/* Interactive cards */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5, staggerChildren: 0.12 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-5"
        >
          {[MagneticButton, GlassToggle, CursorTrailCard].map((Component, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.55, delay: i * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="flex flex-col items-center justify-center rounded-2xl p-8 min-h-[240px]"
              style={{
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.08)",
                backdropFilter: "blur(16px)",
              }}
            >
              <Component />
            </motion.div>
          ))}
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="mt-8 text-center font-mono-brand text-xs text-white/25"
        >
          These are built with Framer Motion + vanilla React — no external animation libraries.
        </motion.p>
      </div>
    </section>
  );
}
