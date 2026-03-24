"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { 
  Zap, Code2, Database, Terminal, Sparkles, 
  Target, Flame, ChevronRight, Trophy, 
  ShieldAlert, Cpu, Timer, ArrowDownCircle, Layers
} from 'lucide-react';

const PhaseCard = ({ phase, title, duration, content, goal, color, index }: any) => {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 100 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="relative mb-40 last:mb-0 group"
    >
      {/* Dynamic Numbering Backdrop */}
      <div className="absolute -top-20 -left-10 text-[20vw] font-black italic opacity-[0.03] select-none pointer-events-none uppercase tracking-tighter">
        Phase_0{index + 1}
      </div>

      <div className="relative grid md:grid-cols-12 gap-10 items-start">
        {/* Left: Indicator & Line */}
        <div className="md:col-span-1 flex flex-col items-center gap-6">
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center border-2 shadow-2xl transition-all duration-500 group-hover:scale-110 ${color.border}`}>
            <span className="font-black italic">0{index + 1}</span>
          </div>
          <div className="w-[2px] h-64 bg-gradient-to-b from-white/20 to-transparent" />
        </div>

        {/* Right: Content Glass-Card */}
        <div className="md:col-span-11 p-8 md:p-14 rounded-[4rem] bg-gradient-to-br from-white/[0.05] to-transparent border border-white/10 backdrop-blur-3xl overflow-hidden relative group-hover:border-white/20 transition-all">
          <div className={`absolute top-0 right-0 w-96 h-96 blur-[120px] opacity-10 group-hover:opacity-20 transition-opacity ${color.bg}`} />
          
          <div className="flex flex-col md:flex-row justify-between items-start gap-8 relative z-10">
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                 <div className="px-4 py-1 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400">
                    <Timer size={12} className="inline mr-2" /> {duration}
                 </div>
              </div>
              <h2 className="text-5xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">
                {title.split(' ')[0]} <br /> 
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">{title.split(' ')[1]}</span>
              </h2>
            </div>
            
            <div className="max-w-sm p-6 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-md">
              <div className="flex items-center gap-2 mb-3 text-emerald-400">
                 <Target size={18} />
                 <span className="text-[10px] font-black uppercase tracking-widest">Target Objective</span>
              </div>
              <p className="text-slate-300 font-medium italic leading-relaxed text-sm">
                &quot;{goal}&quot;
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-16 mt-20 relative z-10">
            {content.map((item: any, idx: number) => (
              <div key={idx} className="space-y-6">
                <div className="flex items-center gap-4 border-b border-white/5 pb-4">
                  <div className="p-3 rounded-xl bg-white/5"><item.icon size={20} className="text-indigo-400" /></div>
                  <h4 className="text-2xl font-black italic uppercase tracking-tighter">{item.subheading}</h4>
                </div>
                <ul className="space-y-4">
                  {item.points.map((p: string, i: number) => (
                    <motion.li 
                      key={i} 
                      whileHover={{ x: 10 }}
                      className="text-slate-500 hover:text-white transition-colors flex items-center gap-3 font-medium italic text-lg cursor-default"
                    >
                      <div className="w-1.5 h-1.5 rounded-full bg-indigo-500/50" /> {p}
                    </motion.li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default function LuxuryRoadmap() {
  const roadmapData = [
    {
      title: "FOUNDATION STRONG",
      duration: "0–2 Months",
      color: { border: "border-blue-500 text-blue-500", bg: "bg-blue-500" },
      goal: "Problem-solving mindset build. Concepts samajh, ratta nahi.",
      content: [
        { subheading: "DSA CORE", icon: Code2, points: ["Arrays, Strings, Hashing", "Sliding Window Patterns", "2-3 Daily Problems"] },
        { subheading: "COMPUTER SCI", icon: Database, points: ["DBMS Fundamentals", "OS Basics", "Computer Networks"] }
      ]
    },
    {
      title: "STRONG BUILDER",
      duration: "2–5 Months",
      color: { border: "border-emerald-500 text-emerald-500", bg: "bg-emerald-500" },
      goal: "300+ Problems total. Build real-world projects from scratch.",
      content: [
        { subheading: "DSA UPGRADE", icon: Zap, points: ["Recursion & Backtracking", "Linked List / Stacks", "Binary Search Mastery"] },
        { subheading: "FULL STACK", icon: Layers, points: ["React 19 + Tailwind", "Node.js & Express", "Auth (JWT / OAuth)"] }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#020202] text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* 1. CINEMATIC HERO */}
      <section className="relative h-screen flex flex-col justify-center items-center px-10 text-center">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-500/10 via-transparent to-transparent pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="z-10"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-xl mb-12">
            <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-[0.5em] italic">The 20 LPA Protocol</span>
          </div>
          
          <h1 className="text-[14vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-12">
            ASCEND <br /> <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-white/10">BEYOND.</span>
          </h1>
          
          <p className="max-w-2xl mx-auto text-slate-500 text-xl md:text-2xl font-medium italic mb-16 uppercase tracking-tight">
             &quot;Consistency {">"} Talent. Stop waiting for the perfect time.&quot;
          </p>
          
          <motion.div 
            animate={{ y: [0, 20, 0] }}
            transition={{ repeat: Infinity, duration: 2.5 }}
            className="flex flex-col items-center gap-4 text-slate-600"
          >
            <span className="text-[10px] font-black uppercase tracking-[0.3em]">Scroll to Deploy</span>
            <ArrowDownCircle size={30} strokeWidth={1} />
          </motion.div>
        </motion.div>
      </section>

      {/* 2. THE MAIN JOURNEY */}
      <section className="relative py-40 px-6 md:px-20 max-w-7xl mx-auto">
        {roadmapData.map((data, index) => (
          <PhaseCard key={index} {...data} index={index} />
        ))}
      </section>

      {/* 3. REALITY CHECK - INDUSTRIAL UI */}
      <section className="py-60 px-6">
        <div className="max-w-5xl mx-auto bg-white text-black p-12 md:p-32 rounded-[5rem] relative overflow-hidden group">
           <div className="absolute top-0 right-0 p-20 opacity-5 group-hover:scale-110 transition-transform duration-700">
              <ShieldAlert size={300} strokeWidth={0.5} />
           </div>
           
           <div className="relative z-10 space-y-20">
              <div className="space-y-6">
                <h2 className="text-6xl md:text-9xl font-black italic uppercase tracking-tighter leading-none">THE HARD <br /> <span className="text-indigo-600">TRUTH.</span></h2>
                <p className="max-w-md text-slate-500 font-bold italic text-xl">20 LPA is not a gift. It&apos;s earned through grit, projects, and problem solving.</p>
              </div>

              <div className="grid md:grid-cols-2 gap-10">
                 <div className="p-10 border-2 border-slate-100 rounded-[3rem] space-y-6 hover:bg-slate-50 transition-colors">
                    <Trophy size={40} className="text-indigo-600" />
                    <h4 className="text-3xl font-black italic uppercase tracking-tighter">Proof of skill</h4>
                    <p className="text-slate-500 font-medium italic">Your GitHub should scream quality. 3-4 deep projects beat 100 tutorials.</p>
                 </div>
                 <div className="p-10 border-2 border-slate-100 rounded-[3rem] space-y-6 hover:bg-slate-50 transition-colors">
                    <Flame size={40} className="text-orange-600" />
                    <h4 className="text-3xl font-black italic uppercase tracking-tighter">Consistency</h4>
                    <p className="text-slate-500 font-medium italic">2 HR DSA + 2 HR Dev. Every single day. No excuses.</p>
                 </div>
              </div>
           </div>
        </div>
      </section>

      <footer className="py-20 text-center opacity-10 font-black italic uppercase tracking-[1em] text-[10px]">
        SHAKIB ALAM // MISSION_CONTROL // 2026
      </footer>

    </div>
  );
}