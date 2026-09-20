import { useState } from "react";
import { motion } from "framer-motion";
import { OrbitCard } from "./OrbitCard";
import { SandboxCanvas } from "./SandboxCanvas";

/* ── Individual bento cards ── */

function BioCard() {
  return (
    <div
      className="w-full h-full p-6 flex flex-col justify-center rounded-2xl"
      style={{
        background: "rgba(124,107,255,0.08)",
        border: "1px solid rgba(124,107,255,0.30)",
        backdropFilter: "blur(20px)",
        boxShadow: "0 0 30px rgba(124, 107, 255, 0.1)",
      }}
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "#34d399", boxShadow: "0 0 8px #34d399" }}
          />
          <span className="font-mono-brand text-xs text-white/50 tracking-widest uppercase">Mumbai, IN 📍</span>
        </div>
        <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
          A Computer Engineering student focused on building <span className="text-[#7c6bff]">practical</span> <span className="text-[#34d399]">solutions</span>.
        </h3>
      </div>
      <p className="text-sm lg:text-base text-white/60 leading-relaxed mt-6">
        I am a student at Fr. CRCE with hands-on experience in full-stack development, student leadership, and event operations. I focus on building practical solutions from civic tech platforms to AI powered web applications.
      </p>
    </div>
  );
}

function StackCard() {
  const skills = [
    { label: "React", color: "#61DAFB" },
    { label: "TypeScript", color: "#3178C6" },
    { label: "Node.js", color: "#339933" },
    { label: "MongoDB", color: "#47A248" },
    { label: "MediaPipe", color: "#00C2E8" },
  ];
  return (
    <OrbitCard className="p-5 flex flex-col gap-4 w-full h-full justify-center">
      <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest">Core Stack</p>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s.label}
            className="rounded-full px-2 py-1 text-[10px] font-semibold cursor-default"
            style={{
              color: s.color,
              background: `rgba(255,255,255,0.05)`,
              border: `1px solid rgba(255,255,255,0.1)`,
            }}
          >
            {s.label}
          </span>
        ))}
      </div>
    </OrbitCard>
  );
}

function StatusCard() {
  return (
    <OrbitCard className="p-5 flex flex-col justify-between w-full h-full">
      <div>
        <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest mb-3">Status</p>
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ scale: [1, 1.25, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "#34d399", boxShadow: "0 0 8px #34d399" }}
          />
          <span className="text-sm font-semibold text-white">Available</span>
        </div>
      </div>
      <div>
        <p className="text-[10px] text-white/50 leading-relaxed mt-2">
          Open to freelance collaborations & roles.
        </p>
      </div>
    </OrbitCard>
  );
}

function SocialCard() {
  return (
    <OrbitCard className="p-5 flex flex-col justify-center items-center w-full h-full gap-3">
      <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest">Connect</p>
      <a href="#" className="text-white hover:text-[#7c6bff] transition-colors text-sm font-semibold">GitHub ↗</a>
      <a href="#" className="text-white hover:text-[#7c6bff] transition-colors text-sm font-semibold">Twitter ↗</a>
      <a href="#" className="text-white hover:text-[#7c6bff] transition-colors text-sm font-semibold">LinkedIn ↗</a>
    </OrbitCard>
  );
}

function PhotoCard() {
  const [active, setActive] = useState(0);
  const photos = [
    { label: "Design", gradient: "linear-gradient(135deg, #2d1b69 0%, #11998e 100%)", emoji: "✨" },
    { label: "Code", gradient: "linear-gradient(135deg, #1a1a2e 0%, #0f3460 100%)", emoji: "💻" },
  ];
  return (
    <OrbitCard className="w-full h-full p-0">
      <div className="relative h-full w-full">
        <motion.div
          key={active}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="absolute inset-0"
          style={{ background: photos[active]!.gradient }}
        />
        <div className="absolute inset-0 flex flex-col justify-between p-4 z-10">
          <div className="flex gap-1 justify-end">
            {photos.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className="rounded-full transition-all duration-200"
                style={{
                  width: active === i ? 16 : 6, height: 6,
                  background: active === i ? "#7c6bff" : "rgba(255,255,255,0.3)",
                }}
              />
            ))}
          </div>
          <div>
            <p className="text-2xl mb-1">{photos[active]!.emoji}</p>
            <p className="font-semibold text-white text-sm">{photos[active]!.label}</p>
          </div>
        </div>
      </div>
    </OrbitCard>
  );
}

function QuickFactsCard() {
  const facts = [
    { icon: "🎓", text: "B.Tech Fr. CRCE" },
    { icon: "🚀", text: "TEDxCRCE Head" },
    { icon: "🌐", text: "AI & Full-Stack" },
  ];
  return (
    <OrbitCard className="p-5 flex flex-col justify-center w-full h-full">
      <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest mb-3">Quick facts</p>
      <ul className="space-y-2">
        {facts.map((f) => (
          <li key={f.text} className="flex items-center gap-2 text-xs text-white/70">
            <span>{f.icon}</span> {f.text}
          </li>
        ))}
      </ul>
    </OrbitCard>
  );
}

/* ── Section wrapper ── */
const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  show:   {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, staggerChildren: 0.1 },
  },
};

export function AboutBento() {
  return (
    <section id="about" className="relative px-4 py-24 bg-[#0A0A0F] overflow-hidden min-h-screen flex items-center">
      {/* Video Background */}
      <div 
        className="absolute inset-0 z-0 opacity-40 pointer-events-none"
        style={{
          maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
          WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        }}
      >
        <video
          autoPlay
          loop
          muted
          playsInline
          onEnded={(e) => {
            const target = e.target as HTMLVideoElement;
            target.play();
          }}
          className="w-full h-full object-cover"
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center lg:text-left"
        >
          <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest mb-2">01 — Laboratory</p>
          <h2 className="text-4xl font-extrabold text-white">
            The <span className="text-[#7c6bff]">Interactive Sandbox</span> Grid.
          </h2>
        </motion.div>

        {/* 4x4 Bento grid */}
        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-4 gap-4 auto-rows-[160px] lg:auto-rows-[1fr] lg:aspect-[16/10]"
        >
          {/* Row 1 */}
          <div className="lg:col-start-1 lg:row-start-1"><StatusCard /></div>
          <div className="lg:col-start-2 lg:row-start-1"><StackCard /></div>
          <div className="lg:col-start-3 lg:row-start-1"><PhotoCard /></div>
          <div className="lg:col-start-4 lg:row-start-1"><SocialCard /></div>

          {/* Row 2 & 3 - Center Anchor */}
          <div className="lg:col-start-2 lg:col-span-2 lg:row-start-2 lg:row-span-2 order-first lg:order-none row-span-2">
            <BioCard />
          </div>

          {/* Row 2 & 3 - Left Flank */}
          <div className="lg:col-start-1 lg:row-start-2"><QuickFactsCard /></div>
          <div className="lg:col-start-1 lg:row-start-3"><OrbitCard className="w-full h-full flex items-center justify-center"><span className="text-3xl">⚛️</span></OrbitCard></div>

          {/* Row 2 & 3 - Right Flank */}
          <div className="lg:col-start-4 lg:row-start-2"><OrbitCard className="w-full h-full flex items-center justify-center"><span className="text-3xl">🛠️</span></OrbitCard></div>
          <div className="lg:col-start-4 lg:row-start-3"><OrbitCard className="w-full h-full flex items-center justify-center"><span className="text-3xl">🔮</span></OrbitCard></div>

          {/* Row 4 - Sandbox Lab */}
          <div className="lg:col-start-1 lg:col-span-4 lg:row-start-4">
            <SandboxCanvas />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
