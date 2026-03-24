"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ArrowUpRight, 
  Cpu, Code2, Globe, Sparkles, Binary, 
  Database, Zap, Laptop, BrainCircuit, Terminal
} from 'lucide-react';
import Link from 'next/link';

// --- COMPONENT: GLOWING SKILL ORB ---
const SkillOrb = ({ icon: Icon, label, color }: any) => (
  <motion.div 
    whileHover={{ scale: 1.1, rotate: 5 }}
    className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl hover:border-indigo-500/50 transition-all group"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-lg group-hover:shadow-indigo-500/20`}>
      <Icon size={28} />
    </div>
    <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-50 group-hover:opacity-100">{label}</span>
  </motion.div>
);

export default function UltimatePortfolio() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <div ref={containerRef} className="min-h-screen bg-[#000] text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. THE VOID BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      </div>

      {/* 2. HYPER-MINIMAL NAV */}
      {/* <nav className="fixed top-0 w-full z-50 px-10 py-8 flex justify-between items-center backdrop-blur-sm">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-4">
          <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
            <div className="w-3 h-3 bg-black rounded-full" />
          </div>
          <span className="font-black tracking-tighter text-xl italic">SHAKIB<span className="text-indigo-500">_</span></span>
        </motion.div>
        <div className="flex gap-8 text-[10px] font-black uppercase tracking-[0.4em] text-slate-500">
          <Link href="#" className="hover:text-white transition-colors">Projects</Link>
          <Link href="#" className="hover:text-white transition-colors">Stack</Link>
          <Link href="#" className="text-indigo-400">Available for Hire</Link>
        </div>
      </nav> */}

      {/* 3. HERO: THE LIQUID TITLE */}
      <section className="relative h-screen flex flex-col justify-center px-10 md:px-20 z-10">
        <motion.div 
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">B.Tech AIDS // Gen-AI Engineer</span>
          </div>
          <h1 className="text-[15vw] md:text-[12vw] font-black leading-[0.75] tracking-tighter italic uppercase mb-10">
            CRAFTING <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-400 to-white/20">INTELLIGENCE.</span>
          </h1>
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center justify-between">
            <p className="max-w-xl text-slate-400 text-lg md:text-2xl font-medium italic leading-tight">
              I am Shakib Alam, a Full-Stack Architect and Data Scientist turning raw data into autonomous experiences.
            </p>
            <motion.div whileHover={{ scale: 1.1 }} className="relative group cursor-pointer">
              <div className="absolute inset-0 bg-indigo-500 blur-2xl opacity-20 group-hover:opacity-50 transition-opacity" />
              <div className="relative w-32 h-32 rounded-full border border-white/20 flex items-center justify-center group-hover:border-indigo-500 transition-colors">
                 <Terminal size={40} className="text-white group-hover:text-indigo-400 transition-colors" />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 4. THE BENTO MATRIX (Skills & Stats) */}
      <section className="py-20 px-10 md:px-20 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          {/* Main Skill Block */}
          <div className="md:col-span-8 p-12 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl overflow-hidden relative group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="space-y-4">
                <h3 className="text-5xl font-black italic uppercase tracking-tighter">THE CORE STACK.</h3>
                <p className="text-slate-500 max-w-sm font-medium">From Python-based backends to React-driven frontends, I engineer the full loop.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
                <SkillOrb icon={Code2} label="Next.js" color="bg-indigo-500/20 text-indigo-400" />
                <SkillOrb icon={BrainCircuit} label="Gen-AI" color="bg-emerald-500/20 text-emerald-400" />
                <SkillOrb icon={Database} label="Data Sci" color="bg-amber-500/20 text-amber-400" />
                <SkillOrb icon={Binary} label="Java DSA" color="bg-rose-500/20 text-rose-400" />
              </div>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-30 transition-opacity">
              <Cpu size={200} />
            </div>
          </div>

          {/* Social / Link Block */}
          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <Link href="#" className="p-10 rounded-[3rem] bg-indigo-600 hover:bg-indigo-500 transition-all flex flex-col justify-between group">
               <div className="flex justify-between items-start">
                  <Linkedin size={32} />
                  <ArrowUpRight className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
               </div>
               <h4 className="text-2xl font-black italic uppercase">Connect <br /> LinkedIn</h4>
            </Link>
            <div className="p-10 rounded-[3rem] bg-[#111] border border-white/5 flex flex-col justify-between hover:border-white/20 transition-all">
               <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/30" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/30" />
               </div>
               <div>
                  <h4 className="text-xl font-bold italic uppercase mb-1">Status</h4>
                  <p className="text-xs font-black tracking-widest text-slate-500 uppercase">Ready for Deployment</p>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PASSION IMAGE SHOWCASE (Horizontal) */}
      <section className="py-40 px-10 md:px-20 z-10 relative">
        <div className="grid md:grid-cols-2 gap-20 items-end mb-20">
           <h2 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter">
             BEYOND THE <br /> <span className="text-indigo-500">PIXELS.</span>
           </h2>
           <p className="text-slate-400 text-xl font-medium italic">"When I'm not training models, I'm analyzing the field. Cricket is my strategy. Solving problems is my fuel."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="relative h-[600px] rounded-[4rem] overflow-hidden group border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1905&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12">
                 <h4 className="text-4xl font-black italic uppercase tracking-tighter">CRICKET & STRATEGY</h4>
                 <p className="text-indigo-400 font-bold tracking-widest text-xs uppercase mt-2">Team Dynamics // Strategic Play</p>
              </div>
           </div>
           <div className="relative h-[600px] rounded-[4rem] overflow-hidden group border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12">
                 <h4 className="text-4xl font-black italic uppercase tracking-tighter">REAL WORLD IMPACT</h4>
                 <p className="text-emerald-400 font-bold tracking-widest text-xs uppercase mt-2">Problem Solving // Mission Driven</p>
              </div>
           </div>
        </div>
      </section>

      {/* 6. GIANT SCROLLING MARQUEE (The Hype) */}
      <div className="py-20 border-y border-white/5 bg-white/5 backdrop-blur-3xl overflow-hidden relative z-10">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap gap-20 text-7xl md:text-9xl font-black italic uppercase tracking-tighter opacity-10"
        >
          <span>Full Stack Architect</span>
          <span>Data Scientist</span>
          <span>Gen-AI Researcher</span>
          <span>Java Expert</span>
        </motion.div>
      </div>

      {/* 7. CTA: THE BIG CONTACT */}
      <section className="py-40 text-center relative z-10 px-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[12vw] font-black italic uppercase tracking-tighter leading-none mb-10">READY TO <br /> <span className="text-indigo-600">LAUNCH?</span></h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button onClick={() => window.location.href = "mailto:shakib1@gmail.com"} className="px-12 py-6 bg-white text-black rounded-full font-black text-xl uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-2xl">
              INITIATE_CONTACT
            </button>
            <div className="flex gap-4">
              <Link href="#" className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><Github /></Link>
              <Link href="#" className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><Mail /></Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/5 text-center text-slate-800 text-[10px] font-black tracking-[0.6em] uppercase italic">
        ARCHITECTING THE FUTURE // SHAKIB ALAM // EST. 2026
      </footer>

    </div>
  );
}