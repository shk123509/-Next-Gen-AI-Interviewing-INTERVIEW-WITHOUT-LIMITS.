"use client";
import React from 'react';
import { motion, Variants } from 'framer-motion';
import { 
  Zap, Slack, Github, Linkedin, MessageSquare, 
  ShieldCheck, Cpu, Sparkles, 
  ArrowUpRight, Share2, Layers
} from 'lucide-react';
import { LucideIcon } from 'lucide-react';

// --- Types for Props ---
interface IntegrationCardProps {
  icon: LucideIcon;
  name: string;
  category: string;
  desc: string;
  i: number;
  color: string;
}

// --- Animation Variants Fix ---
// 'as const' use karne se TS ko pata chalta hai ki ye cubic-bezier array hai
const cardVariant: Variants = {
  hidden: { opacity: 0, scale: 0.9, y: 20 },
  visible: (i: number) => ({
    opacity: 1, 
    scale: 1, 
    y: 0,
    transition: { 
      delay: i * 0.1, 
      duration: 0.5, 
      ease: [0.215, 0.61, 0.355, 1] as const // Fixed: Added 'as const'
    }
  })
};

const IntegrationCard = ({ icon: Icon, name, category, desc, i, color }: IntegrationCardProps) => (
  <motion.div
    custom={i}
    initial="hidden"
    whileInView="visible"
    viewport={{ once: true }}
    variants={cardVariant}
    whileHover={{ y: -12, backgroundColor: "rgba(255, 255, 255, 0.08)" }}
    className="group relative p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-xl transition-all cursor-pointer overflow-hidden"
  >
    <div className={`absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-10 group-hover:opacity-30 transition-opacity ${color}`} />
    
    <div className="flex justify-between items-start mb-8">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center border border-white/10 ${color} text-white shadow-xl`}>
        <Icon size={28} />
      </div>
      <div className="p-2 rounded-full bg-white/5 text-slate-500 group-hover:text-white group-hover:bg-indigo-500 transition-all">
        <ArrowUpRight size={16} />
      </div>
    </div>

    <div className="space-y-3 relative z-10">
      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-indigo-400 italic">{category}</span>
      <h3 className="text-2xl font-black italic uppercase tracking-tighter">{name}</h3>
      <p className="text-slate-400 text-sm font-medium leading-relaxed italic">
        {desc}
      </p>
    </div>

    <div className="mt-8 pt-6 border-t border-white/5 flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
       <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
       <span className="text-[10px] font-bold uppercase tracking-widest">Active Connection Ready</span>
    </div>
  </motion.div>
);

export default function IntegrationsPage() {
  const apps = [
    { name: "Slack", icon: Slack, category: "Communication", desc: "Get real-time interview scores and candidate alerts directly in your channels.", color: "bg-[#4A154B]" },
    { name: "LinkedIn", icon: Linkedin, category: "Sourcing", desc: "One-click invite candidates from LinkedIn Recruiter directly to VoxInterview.", color: "bg-[#0077B5]" },
    { name: "GitHub", icon: Github, category: "Technical", desc: "Automatically verify technical portfolios and past contributions during AI screening.", color: "bg-[#24292e]" },
    { name: "Zapier", icon: Zap, category: "Automation", desc: "Connect with 5000+ apps. Trigger workflows when a candidate passes an interview.", color: "bg-[#FF4A00]" },
    { name: "Discord", icon: MessageSquare, category: "Community", desc: "Automate technical screening for developer communities and hackathons.", color: "bg-[#5865F2]" },
    { name: "Stripe", icon: ShieldCheck, category: "Finance", desc: "Securely manage subscription billing and enterprise plan integrations.", color: "bg-[#635BFF]" },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500 overflow-x-hidden relative">
      
      {/* Background Neural Grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

      <section className="relative pt-32 pb-20 px-6 text-center">
        <div className="max-w-4xl mx-auto z-10 relative">
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10"
          >
            <Layers size={14} /> Unified Ecosystem
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.85] mb-10 italic uppercase"
          >
            CONNECT <br /> <span className="text-indigo-500">EVERYTHING.</span>
          </motion.h1>
          
          <p className="text-slate-400 text-xl md:text-2xl max-w-2xl mx-auto font-medium italic">
            "We don't live in a silo. VoxInterview plugs into your existing workflow like it was always there."
          </p>
        </div>
      </section>

      {/* Grid Section */}
      <section className="py-20 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {apps.map((app, index) => (
            <IntegrationCard key={app.name} {...app} i={index} />
          ))}
        </div>
      </section>

      {/* Center Connect Showcase */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-br from-indigo-950/50 to-slate-950/50 border border-white/5 rounded-[4rem] p-12 md:p-32 text-center relative overflow-hidden">
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 pointer-events-none" />
           
           <div className="relative z-10 space-y-12">
              <h2 className="text-4xl md:text-7xl font-black italic uppercase tracking-tighter leading-none">
                Missing a tool? <br /> Build a <span className="text-indigo-400 underline underline-offset-8">Custom Hook.</span>
              </h2>
              <p className="text-slate-500 max-w-xl mx-auto font-bold text-lg italic">
                Our ultra-flexible REST API and Webhooks allow you to connect any internal HR tool in minutes.
              </p>
              
              <div className="flex flex-col md:flex-row gap-6 justify-center pt-8">
                 <button className="bg-white text-black px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all shadow-2xl active:scale-95 flex items-center justify-center gap-3">
                    <Cpu size={20} /> Read API Docs
                 </button>
                 <button className="bg-white/5 border border-white/10 text-white px-12 py-5 rounded-2xl font-black uppercase tracking-widest hover:bg-white/10 transition-all flex items-center justify-center gap-3">
                    <Share2 size={20} /> Request Integration
                 </button>
              </div>
           </div>

           {/* Animated Glowing Orbs */}
           <motion.div animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-20 -left-20 w-96 h-96 bg-indigo-500/20 blur-[100px] rounded-full" />
           <motion.div animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.3, 0.1] }} transition={{ repeat: Infinity, duration: 6, delay: 1 }} className="absolute -bottom-20 -right-20 w-96 h-96 bg-emerald-500/20 blur-[100px] rounded-full" />
        </div>
      </section>

      <footer className="py-20 text-center">
        <div className="text-slate-700 text-[10px] font-black tracking-[0.5em] uppercase italic">
          VoxInterview // Seamless Logic // 2026
        </div>
      </footer>
    </div>
  );
}