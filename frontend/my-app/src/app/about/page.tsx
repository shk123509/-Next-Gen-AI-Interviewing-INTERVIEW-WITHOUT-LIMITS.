"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Brain, Mic, Target, Users, Globe, ShieldCheck, 
  Sparkles, Zap, Rocket, CheckCircle2, Heart, Award,
  ChevronRight, ArrowRight
} from 'lucide-react';
import Link from 'next/link';

// --- FIXED ANIMATION VARIANTS ---
const fadeIn: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { 
      delay: i * 0.1, 
      duration: 0.8, 
      ease: [0.22, 1, 0.36, 1] // Fixed: Using cubic-bezier instead of string for better TS compatibility
    }
  })
};

// --- UNIQUE BACKGROUND COMPONENT ---
const AboutBackground = () => (
  <div className="fixed inset-0 -z-10 bg-[#020617] overflow-hidden">
    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full animate-pulse" />
    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 blur-[120px] rounded-full animate-pulse delay-700" />
    <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-50 contrast-150 mix-blend-overlay" />
    <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:60px_60px]" />
  </div>
);

export default function AboutPage() {
  return (
    <div className="text-white selection:bg-indigo-500 overflow-x-hidden">
      <AboutBackground />
      
      {/* 1. HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            custom={0} initial="hidden" animate="visible" variants={fadeIn}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Sparkles size={14} /> Our Mission
          </motion.div>
          
          <motion.h1 
            custom={1} initial="hidden" animate="visible" variants={fadeIn}
            className="text-6xl md:text-[9vw] font-black tracking-tighter mb-8 leading-[0.85] italic uppercase"
          >
            REDEFINING <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-emerald-400">
              POTENTIAL.
            </span>
          </motion.h1>
          
          <motion.p 
            custom={2} initial="hidden" animate="visible" variants={fadeIn}
            className="text-slate-400 text-lg md:text-2xl max-w-3xl mx-auto leading-relaxed italic font-medium"
          >
            &quot;VoxInterview was born from a simple question: Why is hiring still stuck in the 90s? We built an AI that doesn&apos;t just filter resumes, but actually hears the brilliance in every voice.&quot;
          </motion.p>
        </div>
      </section>

      {/* 2. STATS SECTION */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { label: "Interviews", val: "2M+", icon: Mic, color: "text-indigo-400" },
            { label: "Time Saved", val: "85%", icon: Zap, color: "text-amber-400" },
            { label: "Countries", val: "120+", icon: Globe, color: "text-emerald-400" },
            { label: "Accuracy", val: "99.2%", icon: Target, color: "text-rose-400" },
          ].map((stat, i) => (
            <motion.div 
              key={i} custom={i} initial="hidden" whileInView="visible" viewport={{ once: true }} variants={fadeIn}
              className="bg-white/[0.03] border border-white/5 p-10 rounded-[3rem] backdrop-blur-xl hover:bg-white/[0.07] transition-all group"
            >
              <div className={`mb-6 p-3 rounded-2xl bg-white/5 w-fit group-hover:scale-110 transition-transform`}>
                <stat.icon className={stat.color} size={24} />
              </div>
              <div className="text-5xl font-black italic mb-2 tracking-tighter">{stat.val}</div>
              <div className="text-slate-500 text-[10px] font-black uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CORE STORY */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <div className="grid lg:grid-cols-2 gap-24 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} className="space-y-10">
            <h2 className="text-5xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
              The Story <br /> <span className="text-indigo-500">Behind Vox.</span>
            </h2>
            <div className="space-y-6 text-slate-400 text-xl font-medium italic leading-relaxed">
              <p>
                Founded in 2024, our team realized that the biggest bottleneck in global growth was <span className="text-white">recruitment speed</span>. Traditional interviews are biased, slow, and expensive.
              </p>
              <p>
                We developed a proprietary <span className="text-emerald-400 font-bold">Voice-to-Logic Engine</span> that analyzes technical depth and cultural fit in real-time.
              </p>
            </div>
            <div className="flex items-center gap-6 p-6 rounded-[2.5rem] bg-white/5 border border-white/10 w-fit">
               <div className="flex -space-x-3">
                  {[1,2,3].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-[#020617] bg-slate-800" />)}
                  <div className="w-12 h-12 rounded-full border-4 border-[#020617] bg-indigo-600 flex items-center justify-center text-[10px] font-black">+50</div>
               </div>
               <div className="text-xs font-black uppercase tracking-widest">
                  <p className="text-white">Trusted by 500+ Teams</p>
                  <p className="text-indigo-400">Join the elite</p>
               </div>
            </div>
          </motion.div>
          
          <div className="relative">
             <div className="aspect-square bg-white/[0.02] rounded-[4rem] border border-white/10 flex items-center justify-center relative overflow-hidden group">
                <Brain size={250} className="text-indigo-500/10 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center">
                   <motion.div 
                    animate={{ y: [0, -20, 0] }}
                    transition={{ repeat: Infinity, duration: 4 }}
                    className="bg-slate-900/90 backdrop-blur-2xl border border-white/20 p-10 rounded-3xl shadow-[0_0_50px_rgba(79,70,229,0.3)] max-w-xs"
                   >
                      <div className="flex items-center gap-2 mb-4 text-indigo-400">
                        <div className="w-2 h-2 rounded-full bg-indigo-500 animate-pulse" />
                        <span className="font-mono text-[10px] font-black uppercase tracking-widest">Neural Syncing</span>
                      </div>
                      <div className="space-y-4">
                         <div className="h-1.5 w-full bg-white/10 rounded-full overflow-hidden">
                            <motion.div animate={{ x: [-100, 200] }} transition={{ repeat: Infinity, duration: 2 }} className="h-full w-24 bg-indigo-500" />
                         </div>
                         <div className="h-1.5 w-3/4 bg-white/10 rounded-full overflow-hidden">
                            <motion.div animate={{ x: [-100, 200] }} transition={{ repeat: Infinity, duration: 2.5, delay: 0.5 }} className="h-full w-12 bg-emerald-500" />
                         </div>
                      </div>
                   </motion.div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. VALUES SECTION (INDUSTRIAL STYLE) */}
      <section className="py-40 px-6 bg-white text-black rounded-[5rem]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row justify-between items-end mb-24 gap-10">
            <h2 className="text-6xl md:text-8xl font-black italic uppercase tracking-tighter leading-none">Our <br /> Core DNA.</h2>
            <p className="text-slate-500 text-xl font-bold italic max-w-sm">Built for the fast. Built for the bold.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Bias-Free", d: "AI focuses on merit. No names, no race, just skill.", icon: ShieldCheck },
              { t: "Human-First", d: "Super-powers for recruiters, not replacements.", icon: Heart },
              { t: "Hyper Scale", d: "Zero latency even at 100k concurrent interviews.", icon: Rocket },
            ].map((v, i) => (
              <div key={i} className="p-12 rounded-[3.5rem] bg-slate-50 border border-slate-200 hover:border-black transition-all group">
                <v.icon size={40} className="mb-8 text-indigo-600 group-hover:scale-110 transition-transform" />
                <h4 className="text-3xl font-black italic uppercase mb-4 tracking-tighter">{v.t}</h4>
                <p className="text-slate-600 font-bold italic leading-relaxed">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA */}
      <section className="py-60 px-6 text-center relative overflow-hidden">
        <div className="max-w-5xl mx-auto relative z-10">
          <h2 className="text-6xl md:text-[8vw] font-black mb-16 tracking-tighter italic uppercase leading-[0.8]">
            UPGRADE YOUR <br /> <span className="text-indigo-500 italic">PIPELINE.</span>
          </h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/main">
              <button className="group bg-indigo-600 text-white px-12 py-6 rounded-2xl font-black italic uppercase tracking-widest hover:bg-white hover:text-black transition-all flex items-center gap-3">
                Get Started <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </button>
            </Link>
            <Link href="/contact">
              <button className="px-12 py-6 rounded-2xl font-black italic uppercase tracking-widest border border-white/20 hover:bg-white/5 transition-all">
                Talk to Founders
              </button>
            </Link>
          </div>
        </div>
      </section>

      <footer className="py-20 text-center text-slate-700 text-[10px] font-black uppercase tracking-[1em]">
        VOXINTERVIEW AI // EST. 2024 // RECRUITMENT_PROTOCOL
      </footer>
    </div>
  );
}