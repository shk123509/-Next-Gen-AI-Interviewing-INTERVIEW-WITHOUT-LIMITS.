"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Brain, Mic, Target, Users, Globe, ShieldCheck, 
  Sparkles, Zap, Rocket, CheckCircle2, Heart, Award
} from 'lucide-react';
import Link from 'next/link';

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.8, ease: "easeOut" }
  })
};

export default function AboutPage() {
  return (
    <div className="bg-[#020617] text-white selection:bg-indigo-500 overflow-hidden">
      
      {/* 1. HERO SECTION: The Vision */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[500px] bg-indigo-600/10 blur-[120px] rounded-full opacity-50" />
        
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            custom={0} initial="hidden" animate="visible" variants={fadeIn}
            className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-[0.2em] mb-8"
          >
            <Sparkles size={14} /> Our Mission
          </motion.div>
          
          <motion.h1 
            custom={1} initial="hidden" animate="visible" variants={fadeIn}
            className="text-5xl md:text-8xl font-black tracking-tighter mb-8 leading-[0.9]"
          >
            WE ARE REDEFINING <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">
              HUMAN POTENTIAL.
            </span>
          </motion.h1>
          
          <motion.p 
            custom={2} initial="hidden" animate="visible" variants={fadeIn}
            className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed italic"
          >
            "VoxInterview was born from a simple question: Why is hiring still stuck in the 90s? We built an AI that doesn't just filter resumes, but actually hears the brilliance in every voice."
          </motion.p>
        </div>
      </section>

      {/* 2. STATS SECTION (Glassmorphism) */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { label: "Interviews Conducted", val: "2M+", icon: <Mic className="text-indigo-400" /> },
            { label: "Time Saved/Hire", val: "85%", icon: <Zap className="text-amber-400" /> },
            { label: "Global Reach", val: "120+", icon: <Globe className="text-emerald-400" /> },
            { label: "AI Accuracy", val: "99.2%", icon: <Target className="text-rose-400" /> },
          ].map((stat, i) => (
            <motion.div 
              key={i} custom={i} initial="hidden" whileInView="visible" variants={fadeIn}
              className="bg-white/5 border border-white/10 p-8 rounded-[2rem] backdrop-blur-sm hover:bg-white/10 transition-all text-center"
            >
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <div className="text-4xl font-black mb-1">{stat.val}</div>
              <div className="text-slate-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* 3. CORE STORY (Image + Text) */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <motion.div initial={{ opacity: 0, x: -50 }} whileInView={{ opacity: 1, x: 0 }} className="space-y-8">
            <h2 className="text-4xl md:text-6xl font-bold tracking-tight">The Story Behind <br /> <span className="text-indigo-500">VoxInterview AI.</span></h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Founded in 2024, our team of Full Stack Developers and AI Researchers realized that the biggest bottleneck in global growth was <b>recruitment speed</b>. Traditional interviews are biased, slow, and expensive.
            </p>
            <p className="text-slate-400 text-lg leading-relaxed">
              We developed a proprietary <b>Voice-to-Logic Engine</b> that analyzes technical depth, soft skills, and cultural fit in real-time, allowing companies to scale their teams from 10 to 1,000 without breaking a sweat.
            </p>
            <div className="flex gap-4 pt-4">
               <div className="flex -space-x-4">
                  {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 rounded-full border-4 border-[#020617] bg-slate-800" />)}
               </div>
               <div className="text-sm font-medium">
                  <p className="text-white">Built by Developers</p>
                  <p className="text-slate-500 text-xs tracking-tighter italic">"For the next generation of talent"</p>
               </div>
            </div>
          </motion.div>
          
          <div className="relative">
             <div className="aspect-square bg-gradient-to-br from-indigo-600/20 to-emerald-600/20 rounded-[3rem] border border-white/10 flex items-center justify-center relative overflow-hidden group">
                <Brain size={200} className="text-indigo-500/20 group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute inset-0 flex items-center justify-center p-10">
                   <div className="bg-slate-900/80 backdrop-blur-md border border-white/10 p-8 rounded-2xl shadow-2xl">
                      <p className="text-indigo-400 font-mono text-sm mb-2"># Processing Signal...</p>
                      <div className="space-y-3">
                         <div className="h-2 w-48 bg-indigo-500/20 rounded-full overflow-hidden">
                            <motion.div animate={{ x: [-100, 200] }} transition={{ repeat: Infinity, duration: 1.5 }} className="h-full w-20 bg-indigo-500" />
                         </div>
                         <div className="h-2 w-32 bg-emerald-500/20 rounded-full overflow-hidden">
                            <motion.div animate={{ x: [-100, 200] }} transition={{ repeat: Infinity, duration: 2, delay: 0.5 }} className="h-full w-10 bg-emerald-500" />
                         </div>
                      </div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>

      {/* 4. VALUES SECTION (Bento Style) */}
      <section className="py-32 px-6 bg-white text-black rounded-[4rem]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-20">
            <h2 className="text-5xl font-black tracking-tight mb-4">Values that Drive Us</h2>
            <p className="text-slate-600 text-xl font-medium">Why thousands of enterprises trust our AI.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { t: "Bias-Free Hiring", d: "Our AI focuses on what you say, not who you are. Ensuring 100% meritocracy.", icon: <ShieldCheck className="text-indigo-600" /> },
              { t: "Human-First AI", d: "We don't replace humans; we give them super-powers to make better decisions.", icon: <Heart className="text-rose-500" /> },
              { t: "Scale Without End", d: "From 1 to 100,000 interviews. No latency, no complaints, just results.", icon: <Rocket className="text-emerald-600" /> },
            ].map((v, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-slate-50 border border-slate-200 hover:shadow-xl transition-all">
                <div className="mb-6">{v.icon}</div>
                <h4 className="text-2xl font-bold mb-4 italic uppercase">{v.t}</h4>
                <p className="text-slate-600 leading-relaxed font-medium">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. CTA: Join the Revolution */}
      <section className="py-40 px-6 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-indigo-600/5 -z-10" />
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-7xl font-black mb-10 tracking-tighter">READY TO UPGRADE <br /> YOUR TALENT PIPELINE?</h2>
          <div className="flex flex-col md:flex-row gap-6 justify-center items-center">
            <Link href="/main">
              <button className="bg-indigo-600 text-white px-10 py-5 rounded-2xl font-black text-xl hover:bg-indigo-500 transition-all shadow-2xl shadow-indigo-600/30">
                GET STARTED NOW
              </button>
            </Link>
            <Link href="/contact">
              <button className="border border-white/20 px-10 py-5 rounded-2xl font-bold text-xl hover:bg-white hover:text-black transition-all">
                Talk to Founders
              </button>
            </Link>
          </div>
          <p className="mt-8 text-slate-500 font-medium">Join 500+ teams hiring with VoxInterview AI.</p>
        </div>
      </section>

      {/* FOOTER (Simplified for About Page) */}
      <footer className="py-10 border-t border-white/5 text-center text-slate-600 text-xs tracking-[0.3em] font-bold">
        VOXINTERVIEW AI // EST. 2024 // ALL RIGHTS RESERVED
      </footer>

    </div>
  );
}