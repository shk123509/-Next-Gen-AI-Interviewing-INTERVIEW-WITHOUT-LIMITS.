"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, Brain, Zap, ShieldCheck, Globe, 
  BarChart, MessageSquare, Cpu, Sparkles, 
  Layers, Fingerprint, Activity, CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';

const FeatureCard = ({ icon: Icon, title, desc, delay, color }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.6, delay }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-md group hover:bg-white/10 transition-all cursor-default"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:rotate-12 ${color}`}>
      <Icon size={28} />
    </div>
    <h3 className="text-2xl font-black italic uppercase tracking-tighter mb-4 group-hover:text-indigo-400 transition-colors">
      {title}
    </h3>
    <p className="text-slate-400 leading-relaxed font-medium">
      {desc}
    </p>
  </motion.div>
);

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500 overflow-x-hidden">
      
      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 px-6 text-center">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px] bg-indigo-600/10 blur-[150px] rounded-full opacity-50 pointer-events-none" />
        
        <div className="max-w-5xl mx-auto relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-8"
          >
            <Sparkles size={14} /> Powering the Future of HR
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10 italic"
          >
            CORE <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 uppercase">Capabilities.</span>
          </motion.h1>
          
          <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto font-medium leading-relaxed italic">
            "We didn't just build an AI. We built a digital brain capable of hearing talent where others only hear noise."
          </p>
        </div>
      </section>

      {/* GRID SECTION */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard 
            icon={Brain} 
            title="Semantic Logic" 
            desc="Our AI evaluates the depth of technical answers, checking for logic, not just keywords."
            delay={0.1}
            color="bg-indigo-500/20 text-indigo-400"
          />
          <FeatureCard 
            icon={Mic} 
            title="Neural Voice" 
            desc="Ultra-realistic AI voices that sound human, making candidates feel engaged."
            delay={0.2}
            color="bg-amber-500/20 text-amber-400"
          />
          <FeatureCard 
            icon={Fingerprint} 
            title="Anti-Fraud" 
            desc="Real-time voice biometrics ensure the person interviewing is who they say they are."
            delay={0.3}
            color="bg-rose-500/20 text-rose-400"
          />
          <FeatureCard 
            icon={Globe} 
            title="Polyglot AI" 
            desc="Native support for 50+ languages. Interview globally without barriers."
            delay={0.4}
            color="bg-emerald-500/20 text-emerald-400"
          />
          <FeatureCard 
            icon={Activity} 
            title="Emotion Analysis" 
            desc="Detect confidence levels and stress patterns through vocal tonality changes."
            delay={0.5}
            color="bg-cyan-500/20 text-cyan-400"
          />
          <FeatureCard 
            icon={Cpu} 
            title="Instant Scoring" 
            desc="Get a detailed 360° scorecard within seconds of the interview completion."
            delay={0.6}
            color="bg-purple-500/20 text-purple-400"
          />
        </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 border-t border-white/5 text-center text-slate-600 text-[10px] font-black tracking-[0.4em] uppercase">
        VoxInterview // Intelligence Reimagined // 2026
      </footer>
    </div>
  );
}