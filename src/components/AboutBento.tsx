import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SandboxCanvas } from "./SandboxCanvas";
import { 
  BioCard, BioExpanded,
  HeroCard, HeroExpanded,
  MatterStackCard, MatterStackExpanded,
  MomentumCard, MomentumExpanded,
  SocialHubCard, SocialHubExpanded,
  SpotifyEqualizerCard, SpotifyExpanded,
  StatusCard, QuickFactsCard, GithubCard, QuoteCard,
  ContactExpanded
} from "./BentoCards";

const sectionVariant = {
  hidden: { opacity: 0, y: 40 },
  show:   {
    opacity: 1, y: 0,
    transition: { duration: 0.7, ease: "easeOut" as const, staggerChildren: 0.1 },
  },
};

export function AboutBento() {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const cards = [
    { id: 'status', component: <StatusCard />, expanded: <ContactExpanded />, classes: 'lg:col-start-1 lg:row-start-1' },
    { id: 'quickfacts', component: <QuickFactsCard />, expanded: null, classes: 'lg:col-start-2 lg:row-start-1' },
    { id: 'stack', component: <MatterStackCard />, expanded: <MatterStackExpanded />, classes: 'lg:col-start-3 lg:row-start-1' },
    { id: 'social', component: <SocialHubCard />, expanded: null, classes: 'lg:col-start-4 lg:row-start-1' },
    
    { id: 'bio', component: <BioCard />, expanded: null, classes: 'lg:col-start-2 lg:col-span-2 lg:row-start-2 lg:row-span-2 order-first lg:order-none row-span-2' },
    
    { id: 'hero', component: <HeroCard />, expanded: <HeroExpanded />, classes: 'lg:col-start-1 lg:row-start-2' },
    { id: 'spotify', component: <SpotifyEqualizerCard />, expanded: <SpotifyExpanded />, classes: 'lg:col-start-1 lg:row-start-3' },
    
    { id: 'github', component: <GithubCard />, expanded: null, classes: 'lg:col-start-4 lg:row-start-2' },
    { id: 'leadership', component: <QuoteCard />, expanded: null, classes: 'lg:col-start-4 lg:row-start-3' },
    
    { id: 'sandbox', component: <SandboxCanvas />, expanded: <SandboxCanvas />, classes: 'lg:col-start-1 lg:col-span-4 lg:row-start-4' },
  ];

  return (
    <section id="about" className="relative px-4 py-24 bg-[#0A0A0F] overflow-hidden min-h-screen flex items-center">
      <div className="absolute inset-0 z-0 opacity-75 pointer-events-none blur-xl" style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}>
        <video autoPlay loop muted playsInline className="w-full h-full object-cover">
          <source src="/hero-bg.mp4" type="video/mp4" />
        </video>
      </div>

      <div className="relative z-10 mx-auto max-w-6xl w-full">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="mb-10 text-center lg:text-left"
        >
          <p className="font-mono-brand text-xs text-white/40 uppercase tracking-widest mb-2">01 — Explore</p>
          <h2 className="text-4xl font-extrabold text-white">
            Welcome to <span className="text-[#7c6bff]">My World</span>.
          </h2>
        </motion.div>

        <motion.div
          variants={sectionVariant}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
          className="grid grid-cols-1 lg:grid-cols-4 lg:grid-rows-4 gap-5 auto-rows-[160px] lg:auto-rows-[1fr] lg:aspect-[16/10]"
        >
          {cards.map((card) => (
            <motion.div
              key={card.id}
              layoutId={`card-${card.id}`}
              onClick={() => card.expanded ? setExpandedId(card.id) : null}
              className={`${card.classes} ${expandedId === card.id ? "opacity-0" : card.expanded ? "cursor-pointer" : ""} ${card.id.startsWith('empty') ? 'pointer-events-none' : ''}`}
            >
              {card.component}
            </motion.div>
          ))}
        </motion.div>
      </div>

      <AnimatePresence>
        {expandedId && (
          <div className="fixed inset-0 z-[999] flex items-center justify-center p-4 lg:p-12 pointer-events-auto">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setExpandedId(null)}
              className="absolute inset-0 bg-black/60 backdrop-blur-md"
            />
            <motion.div
              layoutId={`card-${expandedId}`}
              className={`relative rounded-[40px] overflow-hidden z-10 flex flex-col ${
                expandedId === 'sandbox' ? 'w-full h-full rounded-none' : 'w-full max-w-5xl h-auto max-h-[90vh]'
              }`}
              style={{
                background: expandedId === 'sandbox' ? '#0A0A0F' : "rgba(255, 255, 255, 0.05)",
                backdropFilter: expandedId === 'sandbox' ? 'none' : "blur(40px)",
                boxShadow: "0 25px 50px -12px rgba(0, 0, 0, 0.5)",
                border: "none",
              }}
            >
              <button
                onClick={(e) => { e.stopPropagation(); setExpandedId(null); }}
                className="absolute top-6 right-6 z-50 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors backdrop-blur-md"
              >
                ✕
              </button>
              <div className="flex-1 w-full min-h-0 relative overflow-hidden">
                {cards.find(c => c.id === expandedId)?.expanded}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
