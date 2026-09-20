import { useState } from "react";
import { motion } from "framer-motion";
import { OrbitCard } from "./OrbitCard";
import { SandboxCanvas } from "./SandboxCanvas";

/* ── Individual bento cards ── */

function BioCard() {
  return (
    <div
      className="w-full h-full p-8 lg:p-10 flex flex-col justify-center rounded-[32px]"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "1px solid rgba(255, 255, 255, 0.15)",
        backdropFilter: "blur(40px)",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
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
    <OrbitCard className="p-6 lg:p-8 flex flex-col gap-4 w-full h-full justify-center">
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
    <OrbitCard className="p-6 lg:p-8 flex flex-col justify-between w-full h-full">
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
    <OrbitCard className="p-6 lg:p-8 flex flex-col justify-center items-center w-full h-full gap-3">
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
    <OrbitCard className="p-6 lg:p-8 flex flex-col justify-center w-full h-full">
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

function SpotifyCard() {
  return (
    <OrbitCard className="p-6 lg:p-8 flex flex-col justify-between w-full h-full relative overflow-hidden group">
      <div className="absolute -top-4 -right-4 p-4 opacity-[0.03] transition-transform duration-500 group-hover:scale-110">
        <svg viewBox="0 0 24 24" fill="currentColor" className="w-32 h-32 text-white"><path d="M12 0C5.4 0 0 5.4 0 12s5.4 12 12 12 12-5.4 12-12S18.66 0 12 0zm5.521 17.34c-.24.359-.66.48-1.021.24-2.82-1.74-6.36-2.101-10.561-1.141-.418.122-.779-.179-.899-.539-.12-.421.18-.78.54-.9 4.56-1.021 8.52-.6 11.64 1.32.42.18.479.659.24 1.02zm1.44-3.3c-.301.42-.841.6-1.262.3-3.239-1.98-8.159-2.58-11.939-1.38-.479.12-1.02-.12-1.14-.6-.12-.48.12-1.021.6-1.141C9.6 9.9 15.001 10.62 18.66 12.84c.361.181.54.78.3 1.2zm.12-3.36C15.24 8.4 8.82 8.16 5.16 9.301c-.6.179-1.2-.181-1.38-.721-.18-.6.18-1.2.72-1.38 4.26-1.26 11.28-1.02 15.721 1.621.539.3.719 1.02.419 1.56-.239.54-.959.72-1.56.3z"/></svg>
      </div>
      <div>
        <p className="font-mono-brand text-xs text-[#1DB954] uppercase tracking-widest relative z-10 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-[#1DB954] animate-pulse"></span>
          On Repeat
        </p>
      </div>
      <div className="relative z-10">
        <p className="text-base font-bold text-white mb-1">Starboy</p>
        <p className="text-xs text-white/60">The Weeknd, Daft Punk</p>
      </div>
    </OrbitCard>
  );
}

function GithubCard() {
  return (
    <OrbitCard className="p-6 lg:p-8 flex flex-col justify-between w-full h-full relative overflow-hidden">
      <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest mb-3">Code Activity</p>
      <div className="flex-grow flex flex-col justify-center">
        <p className="text-4xl font-bold text-white">450<span className="text-[#34d399]">+</span></p>
        <p className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">Commits this year</p>
      </div>
      <div className="flex gap-1.5 mt-4 opacity-70">
        {[...Array(8)].map((_, i) => (
          <div key={i} className={`flex-1 h-1.5 rounded-full ${[1, 3, 4, 6].includes(i) ? 'bg-[#34d399]' : 'bg-white/10'}`} />
        ))}
      </div>
    </OrbitCard>
  );
}

function LeadershipCard() {
  return (
    <OrbitCard className="p-6 lg:p-8 flex flex-col justify-between w-full h-full" style={{ background: "linear-gradient(135deg, rgba(235, 20, 20, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)" }}>
      <div>
        <p className="font-mono-brand text-xs text-red-500 uppercase tracking-widest mb-1">TEDxCRCE</p>
        <p className="text-[10px] text-white/40 uppercase tracking-wider mb-3">Sponsorship Head</p>
      </div>
      <div>
        <p className="text-3xl font-bold text-white mb-1">400<span className="text-red-500">+</span></p>
        <p className="text-[11px] text-white/60 leading-relaxed">
          Attendees managed via successful budget & resource allocation.
        </p>
      </div>
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
          className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-4 gap-5 auto-rows-[160px] lg:auto-rows-[1fr] lg:aspect-[16/10]"
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
          <div className="lg:col-start-1 lg:row-start-3"><SpotifyCard /></div>

          {/* Row 2 & 3 - Right Flank */}
          <div className="lg:col-start-4 lg:row-start-2"><GithubCard /></div>
          <div className="lg:col-start-4 lg:row-start-3"><LeadershipCard /></div>

          {/* Row 4 - Sandbox Lab */}
          <div className="lg:col-start-1 lg:col-span-4 lg:row-start-4">
            <SandboxCanvas />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
