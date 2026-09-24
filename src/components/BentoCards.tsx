import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { OrbitCard } from "./OrbitCard";
import Matter from "matter-js";

/* 1. Identity Card */
export function BioCard() {
  return (
    <div
      className="w-full h-full p-8 lg:p-10 flex flex-col justify-center rounded-[32px] cursor-pointer group"
      style={{
        background: "rgba(255, 255, 255, 0.05)",
        border: "none",
        backdropFilter: "blur(40px)",
        boxShadow: "0 10px 40px rgba(0, 0, 0, 0.2)",
      }}
    >
      <div>
        <div className="flex items-center gap-2 mb-4">
          <span
            className="h-2 w-2 rounded-full"
            style={{ background: "#00e5ff", boxShadow: "0 0 8px #00e5ff" }}
          />
          <span className="font-mono-brand text-xs text-white/50 tracking-widest uppercase">Mumbai, IN 📍</span>
        </div>
        <h3 className="text-3xl lg:text-4xl font-bold text-white leading-tight">
          A Computer Engineering student focused on building <span className="text-[#7c6bff]">practical</span> <span className="text-[#00e5ff]">solutions</span>.
        </h3>
      </div>
      <p className="text-sm lg:text-[15px] text-white/60 leading-relaxed mt-6">
        I am a student at Fr. CRCE with hands-on experience in full-stack development and UI engineering. I focus on building highly polished solutions from civic tech platforms to AI-powered operating systems.
      </p>
    </div>
  );
}
export function BioExpanded() {
  return (
    <div className="w-full h-full flex flex-col lg:flex-row p-12 gap-12 bg-transparent text-white overflow-y-auto">
      <div className="lg:w-1/3 flex flex-col items-center">
        <div className="w-48 h-48 rounded-full bg-gradient-to-tr from-[#7c6bff] to-[#00e5ff] p-1 mb-6">
          <div className="w-full h-full rounded-full bg-black/50 overflow-hidden flex items-center justify-center text-4xl">🧑‍💻</div>
        </div>
        <h2 className="text-3xl font-bold">Jeet Chavan</h2>
        <p className="text-[#7c6bff] font-mono mt-2">UI/UX Obsessive & Engineer</p>
      </div>
      <div className="lg:w-2/3 flex flex-col justify-center space-y-6">
        <h3 className="text-2xl font-semibold border-b border-white/10 pb-4">Full Bio</h3>
        <p className="text-lg text-white/70 leading-relaxed">
          I am a 3rd-year Computer Engineering student from Mumbai, India, deeply passionate about the intersection of aesthetic design and performant web engineering. My journey began with simple web layouts and has evolved into building rich, interactive, and physics-driven user experiences.
        </p>
        <p className="text-lg text-white/70 leading-relaxed">
          When I'm not coding, you can find me obsessing over micro-interactions, designing interfaces, or reading about the latest advancements in AI and front-end tooling.
        </p>
      </div>
    </div>
  );
}

/* 2. Atlas OS (My Creation) */
export function HeroCard() {
  return (
    <OrbitCard className="w-full h-full p-0 group overflow-hidden bg-[#0A0A0F] relative">
      <div className="absolute inset-0 bg-[url('/atlas-screenshot.png')] bg-cover bg-center opacity-40 group-hover:opacity-70 group-hover:scale-105 transition-all duration-700" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0F] via-[#0A0A0F]/50 to-transparent pointer-events-none" />
      
      {/* Decorative J.A.R.V.I.S ring */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] aspect-square rounded-full border border-white/[0.03] group-hover:scale-110 transition-transform duration-1000" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100%] aspect-square rounded-full border border-[#00e5ff]/10 border-dashed group-hover:rotate-12 transition-transform duration-1000" />

      <div className="absolute inset-0 flex flex-col justify-end p-6 z-10 bg-gradient-to-t from-black/90 via-black/40 to-transparent pointer-events-none">
        <p className="font-mono-brand text-[10px] text-[#00e5ff] uppercase tracking-widest mb-1.5 font-bold flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] animate-pulse" />
          My Creation
        </p>
        <h3 className="text-2xl font-black text-white tracking-tight mb-1 flex items-center gap-2">
          ATLAS <span className="text-[#7c6bff]">OS</span>
        </h3>
        <p className="text-[11px] text-white/60 font-medium line-clamp-2 leading-tight">
          A proactive, J.A.R.V.I.S.-style personal AI operating system.
        </p>
      </div>
    </OrbitCard>
  );
}

export function HeroExpanded() {
  return (
    <div className="w-full h-full p-8 lg:p-12 pb-24 text-white overflow-y-auto bg-transparent flex flex-col relative">
      {/* Background Glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#7c6bff]/10 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#00e5ff]/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 max-w-5xl mx-auto w-full flex-1">
        <div className="flex flex-col md:flex-row gap-10 items-center mb-12 border-b border-white/10 pb-12">
          <div className="flex-1">
            <h1 className="text-5xl lg:text-7xl font-black tracking-tighter mb-4 text-transparent bg-clip-text bg-gradient-to-r from-white via-white to-white/50 flex items-center gap-3">
              ATLAS 
              <svg className="w-10 h-10 lg:w-14 lg:h-14 text-white hover:rotate-12 transition-transform duration-300" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="12" cy="12" r="5" />
                <ellipse cx="12" cy="12" rx="10" ry="3" transform="rotate(-20 12 12)" />
              </svg>
            </h1>
            <p className="text-xl text-[#00e5ff] font-medium mb-6">
              Breaking productivity barriers.
            </p>
            <p className="text-lg text-white/70 leading-relaxed mb-8">
              A state-of-the-art personal operating system that fuses health metrics, task management, and multimodal AI into a single, cohesive application. Built for absolute speed and privacy.
            </p>
            
            <div className="flex flex-wrap gap-3">
              {['React', 'TypeScript', 'Tailwind', 'Node.js', 'MongoDB', 'Groq (Llama 3)'].map(tech => (
                <span key={tech} className="px-3 py-1.5 rounded-md bg-white/5 border border-white/10 text-xs font-mono text-white/60">
                  {tech}
                </span>
              ))}
            </div>
          </div>
          
          <div className="w-full md:w-[500px] rounded-xl border border-white/10 overflow-hidden shrink-0 shadow-2xl relative">
             <img src="/atlas-screenshot.png" alt="Atlas OS Dashboard" className="w-full h-auto object-cover" />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl hover:bg-white/[0.04] transition-colors">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff]" />
              Intelligent AI Assistant
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Context-aware conversations with a sophisticated persona using ultra-fast LLM inference. It dynamically reads live databases with a conversational voice UI and interruption support.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl hover:bg-white/[0.04] transition-colors">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#7c6bff] shadow-[0_0_8px_#7c6bff]" />
              Local Agent & macOS Control
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Autonomous CLI and robust ActionRegistry. Safely automates macOS to focus apps, type text, and press keys via AI-generated Action Plans.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl hover:bg-white/[0.04] transition-colors">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-[#0284c7] shadow-[0_0_8px_#0284c7]" />
              Context Engine
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Automatically fetches real-time data and facts. Intelligently routes intent to inject only relevant health, task, or calendar data without blowing up token limits.
            </p>
          </div>

          <div className="bg-white/[0.02] border border-white/[0.05] p-6 rounded-2xl hover:bg-white/[0.04] transition-colors">
            <h3 className="text-lg font-bold mb-3 flex items-center gap-3">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shadow-[0_0_8px_#ec4899]" />
              Health & Productivity
            </h3>
            <p className="text-white/60 text-sm leading-relaxed">
              Total integration of physical metrics (sleep, HRV) and gym sessions, fused with real-time task management and advanced habit streaks.
            </p>
          </div>
          
          <div className="col-span-1 md:col-span-2 mt-4 text-center">
            <a href="https://github.com/Jeetchavan02/Atlas" target="_blank" rel="noreferrer" className="inline-block px-8 py-4 bg-gradient-to-r from-[#7c6bff] to-[#00e5ff] text-black font-extrabold rounded-full hover:opacity-90 transition shadow-[0_0_20px_rgba(0,229,255,0.3)]">
              View on GitHub ↗
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

/* 3. Matter.js Tech Stack Card */
export function MatterStackCard() {
  const shields = [
    "https://img.shields.io/badge/React-18-007ACC.svg?style=for-the-badge&logo=react",
    "https://img.shields.io/badge/C++-00599C.svg?style=for-the-badge&logo=c%2B%2B",
    "https://img.shields.io/badge/Node.js-18-339933.svg?style=for-the-badge&logo=nodedotjs",
    "https://img.shields.io/badge/MongoDB-8-47A248.svg?style=for-the-badge&logo=mongodb",
    "https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=for-the-badge&logo=typescript"
  ];

  return (
    <OrbitCard className="p-3 lg:p-4 flex flex-col justify-between w-full h-full relative overflow-hidden group">
      <div className="z-10 pointer-events-none mb-1.5">
        <p className="font-mono-brand text-[9px] text-white/40 uppercase tracking-widest">Tech Stack</p>
      </div>
      
      <div className="flex-grow flex flex-wrap content-start gap-1.5 relative z-10 opacity-90 hover:opacity-100 transition-opacity">
        {shields.map((src, i) => (
          <img key={i} src={src} alt="tech shield" className="h-[20px] lg:h-[22px] rounded-[3px] shadow-md" />
        ))}
      </div>

      <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
        <span className="text-[9px] text-[#00e5ff] font-mono tracking-widest uppercase flex items-center gap-1">
          Play Hanoi <span className="animate-pulse">↗</span>
        </span>
      </div>
    </OrbitCard>
  );
}
export function MatterStackExpanded() {
  const [pegs, setPegs] = useState<number[][]>([[5, 4, 3, 2, 1], [], []]);
  const [selectedPeg, setSelectedPeg] = useState<number | null>(null);

  const handlePegClick = (e: React.MouseEvent, pegIndex: number) => {
    e.stopPropagation();
    if (selectedPeg === null) {
      if (pegs[pegIndex].length > 0) setSelectedPeg(pegIndex);
    } else {
      if (selectedPeg === pegIndex) {
        setSelectedPeg(null);
        return;
      }
      const sourcePeg = pegs[selectedPeg];
      const targetPeg = pegs[pegIndex];
      const disk = sourcePeg[sourcePeg.length - 1];
      const targetTop = targetPeg.length > 0 ? targetPeg[targetPeg.length - 1] : 999;
      if (disk < targetTop) {
        const newPegs = [...pegs];
        newPegs[selectedPeg] = sourcePeg.slice(0, -1);
        newPegs[pegIndex] = [...targetPeg, disk];
        setPegs(newPegs);
      }
      setSelectedPeg(null);
    }
  };

  const shields = [
    "https://img.shields.io/badge/React-18-007ACC.svg?style=for-the-badge&logo=react",
    "https://img.shields.io/badge/C++-00599C.svg?style=for-the-badge&logo=c%2B%2B",
    "https://img.shields.io/badge/Node.js-18-339933.svg?style=for-the-badge&logo=nodedotjs",
    "https://img.shields.io/badge/MongoDB-8-47A248.svg?style=for-the-badge&logo=mongodb",
    "https://img.shields.io/badge/TypeScript-5.0-3178C6.svg?style=for-the-badge&logo=typescript"
  ];

  return (
    <div className="w-full h-full p-8 lg:p-12 text-white flex flex-col items-center justify-center min-h-[500px]">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-bold mb-3 flex items-center justify-center gap-3">
          <span className="w-3 h-3 rounded-full bg-[#00e5ff] shadow-[0_0_15px_#00e5ff]" />
          Stack Simulator
        </h2>
        <p className="text-white/50 text-sm font-mono tracking-wider">Shift the entire stack to another peg.</p>
      </div>
      
      <div className="relative w-full max-w-4xl h-[300px] flex justify-between items-end gap-6 px-4">
        {[0, 1, 2].map((pegIndex) => (
          <div 
            key={pegIndex} 
            className={`relative flex flex-col-reverse items-center justify-start flex-1 h-full cursor-pointer transition-all duration-300 ${selectedPeg === pegIndex ? 'bg-white/10 rounded-t-3xl scale-105' : 'hover:bg-white/[0.03] rounded-t-3xl'}`}
            onClick={(e) => handlePegClick(e, pegIndex)}
          >
            {/* Minimal Peg Pole */}
            <div className="absolute bottom-3 w-2 h-[90%] bg-white/10 rounded-t-full pointer-events-none" />
            
            {/* Minimal Base */}
            <div className="w-full h-2 bg-white/20 rounded-full mt-auto mb-2" />

            {/* Shield Disks */}
            <div className="relative z-10 flex flex-col-reverse items-center w-full pb-0 gap-1.5">
              {pegs[pegIndex].map((diskId, idx) => {
                const isSelected = selectedPeg === pegIndex && idx === pegs[pegIndex].length - 1;
                return (
                  <motion.div 
                    key={diskId}
                    layoutId={`disk-large-${diskId}`}
                    animate={{ y: isSelected ? -40 : 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="flex items-center justify-center origin-bottom"
                    style={{ 
                      transform: `scale(${0.8 + diskId * 0.1})` 
                    }}
                  >
                    <img 
                      src={shields[diskId - 1]} 
                      alt="tech shield" 
                      className="h-[28px] rounded-md shadow-lg border border-black/20"
                    />
                  </motion.div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 4. Contact Card (Nokia homage) */
export function NokiaContactCard() {
  return (
    <OrbitCard className="p-0 flex flex-col items-center justify-center w-full h-full relative overflow-hidden bg-[#9CA085]">
      {/* Nokia Screen style */}
      <div className="absolute inset-1 border-[4px] border-[#2A2B26] rounded-xl flex flex-col items-center justify-center opacity-80 mix-blend-multiply">
        <p className="font-mono text-[#2A2B26] text-[10px] absolute top-2 right-2 animate-pulse">Avail</p>
        <div className="flex gap-1 mt-4">
          <div className="w-8 h-4 border-t-2 border-r-2 border-[#2A2B26] rounded-tr-xl transform -rotate-12" />
          <div className="w-8 h-4 border-t-2 border-l-2 border-[#2A2B26] rounded-tl-xl transform rotate-12" />
        </div>
        <p className="font-mono text-[#2A2B26] text-xs font-bold mt-2 uppercase tracking-wider">Connecting</p>
      </div>
    </OrbitCard>
  );
}
export function ContactExpanded() {
  return (
    <div className="w-full h-full p-12 text-white flex flex-col items-center justify-center relative overflow-hidden bg-transparent">
      <h2 className="text-4xl font-extrabold mb-2 text-transparent bg-clip-text bg-gradient-to-r from-[#7c6bff] to-[#00e5ff]">Let's Connect</h2>
      <p className="text-white/60 mb-8 max-w-md text-center">I'm currently looking for new opportunities. Whether you have a question or just want to say hi, I'll try my best to get back to you!</p>
      
      <div className="w-full max-w-md space-y-4">
        <input type="text" placeholder="Your Name" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7c6bff] transition" />
        <input type="email" placeholder="Your Email" className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7c6bff] transition" />
        <textarea placeholder="Message" rows={4} className="w-full p-4 rounded-xl bg-white/5 border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-[#7c6bff] transition" />
        <button className="w-full py-4 rounded-xl font-bold text-black bg-gradient-to-r from-[#7c6bff] to-[#00e5ff] hover:opacity-90 transition shadow-lg">Send Message</button>
      </div>
    </div>
  );
}

/* 5. Live Momentum (GitHub) */
export function MomentumCard() {
  return (
    <OrbitCard className="p-6 lg:p-8 flex flex-col justify-between w-full h-full relative overflow-hidden">
      <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest mb-3">Live Momentum</p>
      <div className="flex-grow flex flex-col justify-center">
        <p className="text-4xl font-bold text-white">12<span className="text-[#00e5ff]">↑</span></p>
        <p className="text-[10px] text-white/50 mt-1 uppercase tracking-wider">Commits this week</p>
      </div>
      <div className="w-full h-8 flex items-end gap-1 mt-4">
        {[2, 4, 3, 7, 5, 8, 12].map((h, i) => (
          <div key={i} className="flex-1 bg-[#00e5ff] rounded-t-sm transition-all" style={{ height: `${(h/12)*100}%` }} />
        ))}
      </div>
    </OrbitCard>
  );
}
export function MomentumExpanded() {
  return (
    <div className="w-full h-full p-12 text-white flex flex-col">
      <h2 className="text-3xl font-bold mb-6">Coding Momentum</h2>
      <div className="flex-1 bg-white/5 rounded-2xl border border-white/10 p-8 flex flex-col justify-end gap-4">
        {/* Mock Chart */}
        <div className="flex h-64 items-end gap-4 justify-between border-b border-white/10 pb-4">
          {[20, 35, 45, 30, 60, 85, 70, 90, 50, 40].map((h, i) => (
            <div key={i} className="w-full relative group flex justify-center">
              <div className="w-full bg-gradient-to-t from-[#00e5ff]/20 to-[#00e5ff] rounded-t-md transition-all hover:brightness-125 cursor-crosshair" style={{ height: `${h}%` }} />
              <div className="absolute -top-8 opacity-0 group-hover:opacity-100 font-mono text-xs text-[#00e5ff] transition-opacity">{h}h</div>
            </div>
          ))}
        </div>
        <div className="flex justify-between text-xs font-mono text-white/40">
          <span>Week 1</span>
          <span>Week 5</span>
          <span>Week 10</span>
        </div>
      </div>
    </div>
  );
}

export function SocialHubCard() {
  const socials = [
    { id: 'LinkedIn', icon: 'IN', color: '#0077b5', href: 'https://linkedin.com/in/jeet-chavan' },
    { id: 'Email', icon: '@', color: '#ec4899', href: 'mailto:jeetnchavan02@gmail.com' },
    { id: 'Resume', icon: 'CV', color: '#00e5ff', href: '/Jeet%20Chavan%20Resume%202026.pdf' }
  ];

  return (
    <OrbitCard className="p-3 lg:p-4 flex flex-col justify-center items-center w-full h-full relative overflow-hidden group">
      <div className="flex flex-col gap-1.5 w-full relative z-10 px-1">
        {socials.map((s) => (
          <a key={s.id} href={s.href} target="_blank" rel="noreferrer" className="w-full relative group/btn">
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              whileTap={{ scale: 0.95 }}
              className="w-full py-1.5 lg:py-2 rounded-lg bg-white/5 flex items-center justify-between px-4 border border-white/10 transition-all shadow-md overflow-hidden"
              style={{
                boxShadow: `inset 0 0 10px ${s.color}15, 0 2px 5px rgba(0,0,0,0.2)`
              }}
            >
              <div className="absolute inset-0 opacity-0 group-hover/btn:opacity-20 transition-opacity duration-300" style={{ backgroundColor: s.color }} />
              <span className="font-extrabold text-xs lg:text-sm tracking-wider transition-colors drop-shadow-md z-10" style={{ color: s.color }}>{s.icon}</span>
              <span className="text-[8px] lg:text-[9px] font-mono text-white/50 group-hover/btn:text-white transition-colors uppercase tracking-[0.2em] z-10">{s.id}</span>
            </motion.div>
          </a>
        ))}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-white/[0.02] to-transparent pointer-events-none" />

    </OrbitCard>
  );
}
export function SocialHubExpanded() {
  return (
    <div className="w-full h-full p-12 text-white overflow-y-auto">
      <h2 className="text-3xl font-bold mb-8 text-center">Digital Directory</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-2xl mx-auto">
        {[
          { n: "GitHub", url: "github.com/jeetchavan", icon: "🐙" },
          { n: "LinkedIn", url: "linkedin.com/in/jeetchavan", icon: "💼" },
          { n: "Twitter", url: "x.com/jeetchavan", icon: "🐦" },
          { n: "Resume", url: "jeetchavan.com/resume.pdf", icon: "📄" },
        ].map(link => (
          <a key={link.n} href={`https://${link.url}`} target="_blank" className="bg-white/5 p-6 rounded-2xl border border-white/10 flex items-center gap-4 hover:bg-white/10 transition-colors group">
            <div className="text-4xl">{link.icon}</div>
            <div>
              <p className="font-bold text-lg">{link.n}</p>
              <p className="text-sm text-[#7c6bff] group-hover:underline">{link.url}</p>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}

/* 7. Current Status / Spotify */
export function SpotifyEqualizerCard() {
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
export function SpotifyExpanded() {
  return (
    <div className="w-full h-full p-12 text-white flex flex-col bg-gradient-to-br from-[#1DB954]/20 to-transparent">
      <h2 className="text-3xl font-extrabold mb-8 flex items-center gap-4">
        <span className="w-8 h-8 bg-[#1DB954] rounded-full flex items-center justify-center text-black">▶</span>
        Top 5 Playlist
      </h2>
      <div className="space-y-4">
        {[
          { t: "Starboy", a: "The Weeknd, Daft Punk", d: "3:50" },
          { t: "Numb", a: "Linkin Park", d: "3:07" },
          { t: "Wonderwall", a: "Oasis", d: "4:18" },
          { t: "I Wonder", a: "Kanye West", d: "4:03" },
          { t: "SICKO MODE", a: "Travis Scott", d: "5:12" },
        ].map((s, i) => (
          <div key={i} className="flex justify-between items-center p-4 bg-white/5 rounded-xl hover:bg-white/10 transition cursor-pointer">
            <div className="flex items-center gap-4">
              <span className="text-white/40 font-mono w-4">{i+1}</span>
              <div>
                <p className="font-bold">{s.t}</p>
                <p className="text-sm text-white/60">{s.a}</p>
              </div>
            </div>
            <span className="text-white/40 font-mono text-sm">{s.d}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

/* 8. Restored Original Cards */
export function StatusCard() {
  return (
    <OrbitCard className="p-6 lg:p-8 flex flex-col justify-between w-full h-full">
      <div>
        <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest mb-3">Status</p>
        <div className="flex items-center gap-2">
          <motion.span
            animate={{ scale: [1, 1.25, 1], opacity: [1, 0.7, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="h-2.5 w-2.5 rounded-full"
            style={{ background: "#10B981", boxShadow: "0 0 8px #10B981" }}
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

export function QuickFactsCard() {
  const facts = [
    { color: "#00e5ff", text: "Computer Engineering ('28)" },
    { color: "#7c6bff", text: "TEDx Sponsorship & Budget Head" },
    { color: "#ec4899", text: "Full-Stack Developer & Tech Enthusiast" },
  ];
  return (
    <OrbitCard className="p-6 lg:p-8 flex flex-col justify-center w-full h-full relative overflow-hidden">
      <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest mb-4">Quick facts</p>
      <ul className="space-y-3">
        {facts.map((f) => (
          <li key={f.text} className="flex items-center gap-2.5 text-[11px] text-white/70 font-medium tracking-wide">
            <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: f.color, boxShadow: `0 0 8px ${f.color}` }} /> 
            {f.text}
          </li>
        ))}
      </ul>
    </OrbitCard>
  );
}

export function GithubCard() {
  // Generate a mock contribution graph pattern for the last 12 weeks (7 rows x 12 cols = 84 squares)
  const generateGraph = () => {
    const days = [];
    for (let i = 0; i < 84; i++) {
      // Randomize activity level: 0 (empty), 1 (light), 2 (med), 3 (high)
      // Bias towards lower activity to make it look realistic
      const rand = Math.random();
      let level = 0;
      if (rand > 0.6) level = 1;
      if (rand > 0.8) level = 2;
      if (rand > 0.92) level = 3;
      days.push(level);
    }
    return days;
  };

  // We memoize it conceptually (by doing it outside render) so it doesn't flicker on re-renders, 
  // but for simplicity in this component we'll just generate it once on mount.
  const [graph] = useState(() => generateGraph());

  return (
    <a href="https://github.com/Jeetchavan02" target="_blank" rel="noreferrer" className="w-full h-full group block cursor-pointer">
      <OrbitCard className="p-4 lg:p-5 flex flex-col justify-between w-full h-full relative overflow-hidden transition-colors group-hover:bg-white/[0.08]">
        <div className="flex justify-between items-start mb-2">
          <p className="font-mono-brand text-[10px] text-white/40 uppercase tracking-widest group-hover:text-[#00e5ff] transition-colors">GitHub Activity</p>
          <span className="text-white/20 group-hover:text-[#00e5ff] transition-colors">↗</span>
        </div>
        
        <div className="flex-grow flex flex-col justify-center gap-3">
          {/* Contribution Graph */}
          <div className="grid grid-rows-7 grid-flow-col gap-[3px] w-full max-w-full overflow-hidden opacity-80 group-hover:opacity-100 transition-opacity">
            {graph.map((level, i) => {
              let bg = "bg-white/5"; // Level 0
              if (level === 1) bg = "bg-[#00e5ff]/30";
              if (level === 2) bg = "bg-[#00e5ff]/60";
              if (level === 3) bg = "bg-[#00e5ff]";
              return (
                <div key={i} className={`w-2.5 h-2.5 lg:w-3 lg:h-3 rounded-[2px] ${bg} transition-colors`} />
              );
            })}
          </div>

          <div>
            <p className="text-xl font-bold text-white leading-none">86<span className="text-[#00e5ff] text-base">+</span></p>
            <p className="text-[9px] text-white/50 mt-1 uppercase tracking-wider group-hover:text-white/80 transition-colors">Contributions this year</p>
          </div>
        </div>
      </OrbitCard>
    </a>
  );
}

export function QuoteCard() {
  const [quote, setQuote] = useState({ text: "Loading...", author: "System" });

  useEffect(() => {
    fetch("https://type.fit/api/quotes")
      .then(res => res.json())
      .then(data => {
        const randomIndex = Math.floor(Math.random() * data.length);
        const q = data[randomIndex];
        // The API sometimes appends ", type.fit" to the author name
        const cleanAuthor = q.author ? q.author.replace(', type.fit', '') : "Unknown";
        setQuote({ text: q.text, author: cleanAuthor });
      })
      .catch(() => {
        setQuote({ text: "Talk is cheap. Show me the code.", author: "Linus Torvalds" });
      });
  }, []);

  return (
    <OrbitCard className="p-5 lg:p-6 flex flex-col justify-between w-full h-full relative overflow-hidden group" style={{ background: "linear-gradient(135deg, rgba(124, 107, 255, 0.05) 0%, rgba(255, 255, 255, 0.02) 100%)" }}>
      <div className="absolute -right-4 -bottom-4 text-[120px] text-white/[0.03] font-serif leading-none rotate-12 group-hover:scale-110 transition-transform duration-500 pointer-events-none">
        "
      </div>
      <div>
        <p className="font-mono-brand text-[10px] text-[#7c6bff] uppercase tracking-widest mb-1 relative z-10">Quote of the Session</p>
      </div>
      <div className="relative z-10">
        <p className="text-xs lg:text-sm font-medium text-white/90 italic mb-3 leading-snug">
          "{quote.text}"
        </p>
        <p className="text-[9px] text-[#00e5ff] font-mono tracking-widest uppercase">
          — {quote.author}
        </p>
      </div>
    </OrbitCard>
  );
}
