"use client";
import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { 
  Mic, Brain, Zap, Sparkles as SparkleIcon, ArrowRight, CheckCircle2 
} from 'lucide-react';
import Link from 'next/link';

export default function PremiumNormalHomePage() {
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId"); 
    if (storedUser) setActiveUserId(storedUser);
  }, []);

  return (
    <div className="relative w-full bg-[#020617] text-white selection:bg-indigo-500 overflow-x-hidden min-h-screen font-sans">
      
      {/* --- PREMIUM HIGH-END BACKDROP (No GPU Lag) --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Top Floating Glow */}
        <div className="absolute top-[-10%] left-[-10%] w-[50vw] h-[50vw] rounded-full bg-gradient-to-br from-indigo-600/20 to-transparent blur-[120px]" />
        {/* Center/Right Ambient Glow */}
        <div className="absolute top-[30%] right-[-5%] w-[45vw] h-[45vw] rounded-full bg-gradient-to-tl from-cyan-500/10 via-purple-500/10 to-transparent blur-[140px]" />
        {/* Bottom Glow */}
        <div className="absolute bottom-[10%] left-[10%] w-[40vw] h-[40vw] rounded-full bg-gradient-to-tr from-emerald-500/10 to-transparent blur-[100px]" />
        
        {/* Subtle Cyber Grid Line Overlay */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff03_1px,transparent_1px),linear-gradient(to_bottom,#ffffff03_1px,transparent_1px)] bg-[size:4rem_4rem]" />
      </div>

      {/* --- UI CONTENT LAYER --- */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20 relative">
          <motion.div 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-5xl z-10"
          >
            {/* Animated Pill Badge */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-semibold uppercase tracking-widest mb-8 backdrop-blur-md shadow-[0_0_20px_rgba(99,102,241,0.15)]"
            >
              <SparkleIcon size={14} className="animate-pulse text-cyan-400" /> Next-Gen AI Interviewing
            </motion.div>

            {/* Premium Typographic Header */}
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-[0.95] mb-8 uppercase">
              INTERVIEW <br /> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400 drop-shadow-[0_2px_20px_rgba(99,102,241,0.3)]">
                WITHOUT LIMITS.
              </span>
            </h1>
            
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12 font-medium">
               Conduct thousands of live voice interviews simultaneously with context-aware AI.
            </p>

            {/* Interactive Call-to-Actions */}
            <div className="flex flex-col sm:flex-row gap-5 justify-center items-center">
              {/* Primary Premium Button */}
              <Link href={activeUserId ? `/quiz/${activeUserId}` : '/login'} className="w-full sm:w-auto">
                <button className="w-full sm:w-auto group relative px-10 py-5 bg-gradient-to-r from-indigo-600 to-violet-600 rounded-2xl font-bold text-lg shadow-[0_4px_30px_rgba(79,70,229,0.4)] hover:shadow-[0_4px_40px_rgba(79,70,229,0.6)] hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 overflow-hidden">
                  <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite]" />
                  <span className="relative flex items-center justify-center gap-2">
                    {activeUserId ? "Start Interviews" : "Start Free Pilot"}
                    <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                  </span>
                </button>
              </Link>
              
              {/* Secondary Luxury Glass Button */}
              <Link href="/chat" className="w-full sm:w-auto">
                <button className="w-full sm:w-auto px-10 py-5 bg-white/[0.03] border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/[0.08] hover:border-white/20 active:scale-[0.98] backdrop-blur-md transition-all duration-300">
                  Candidate Doubt Section
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* BENTO GRID */}
        <section className="py-24 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6 relative">
          
          {/* Big Bento Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-8 p-10 rounded-[2.5rem] bg-gradient-to-br from-slate-900/80 to-slate-950/80 border border-white/5 backdrop-blur-2xl shadow-2xl relative overflow-hidden group"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-3xl group-hover:bg-indigo-500/20 transition-all duration-500" />
            <Brain className="text-indigo-400 mb-6 group-hover:scale-110 transition-transform duration-300" size={44} />
            <h3 className="text-4xl font-bold mb-4 tracking-tight">Semantic Understanding</h3>
            <p className="text-slate-400 text-lg max-w-md leading-relaxed">Our LLM-powered engine detects nuance and technical depth in real-time voice responses.</p>
          </motion.div>
          
          {/* Accent Bento Card */}
          <motion.div 
            whileHover={{ y: -5 }}
            transition={{ duration: 0.3 }}
            className="md:col-span-4 p-10 rounded-[2.5rem] bg-gradient-to-br from-indigo-600 to-indigo-700 border border-indigo-500/50 flex flex-col justify-between shadow-[0_10px_40px_rgba(79,70,229,0.3)] relative overflow-hidden group"
          >
            <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-2xl" />
            <Zap size={44} className="animate-bounce" />
            <div>
              <h3 className="text-4xl font-black italic tracking-tighter mb-1">0.2s LATENCY</h3>
              <p className="text-indigo-200 text-sm font-medium tracking-wide uppercase">Ultra Low Latency Streaming</p>
            </div>
          </motion.div>
        </section>

        {/* PRICING TABLE */}
        <section className="py-24 px-6 max-w-7xl mx-auto relative">
          <h2 className="text-5xl font-black text-center mb-16 uppercase italic tracking-tight">Pricing Plans</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { plan: "Starter", price: "$0", link: "/features" },
              { plan: "Pro", price: "$499", link: "/integrations", highlight: true },
              { plan: "Enterprise", price: "Custom", link: "/security" }
            ].map((p, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -8 }}
                transition={{ duration: 0.3 }}
                className={`p-10 rounded-[2.5rem] border backdrop-blur-2xl transition-all duration-300 shadow-2xl relative overflow-hidden ${
                  p.highlight 
                    ? 'bg-gradient-to-b from-indigo-600 to-indigo-800 border-indigo-400/50 shadow-[0_15px_50px_rgba(79,70,229,0.3)]' 
                    : 'bg-slate-900/60 border-white/5 hover:border-white/10'
                }`}
              >
                {p.highlight && (
                  <span className="absolute top-5 right-5 bg-white text-indigo-700 text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-full">
                    POPULAR
                  </span>
                )}
                <h4 className="font-bold mb-2 uppercase tracking-widest text-sm opacity-80">{p.plan}</h4>
                <div className="text-5xl font-black mb-8 italic tracking-tight">{p.price}</div>
                
                <ul className="space-y-4 mb-8 text-sm text-slate-300">
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Real-time Evaluation</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Voice Dashboard Access</li>
                  <li className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400 shrink-0" /> Standard Analytics</li>
                </ul>

                <Link href={p.link}>
                  <button className={`w-full py-4 rounded-xl font-bold transition-all duration-300 ${
                    p.highlight 
                      ? 'bg-white text-indigo-900 hover:bg-slate-100 shadow-lg' 
                      : 'bg-white/5 border border-white/10 hover:bg-white hover:text-black'
                  }`}>
                    CONFIGURE
                  </button>
                </Link>
              </motion.div>
            ))}
          </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 px-10 border-t border-white/5 bg-slate-950/80 backdrop-blur-3xl relative">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 font-black text-2xl mb-6 italic tracking-tight">
                <div className="w-9 h-9 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md">
                  <Mic size={18} className="text-white" />
                </div>
                VOXINTERVIEW
              </div>
              <p className="text-slate-500 text-xs tracking-widest font-bold">© 2026 VOXINTERVIEW AI INC.</p>
            </div>
            
            <div className="flex flex-col gap-4 text-sm text-slate-400 font-semibold">
              <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold">Product</span>
              <Link href="/features" className="hover:text-indigo-400 transition-colors">Features</Link>
              <Link href="/integrations" className="hover:text-indigo-400 transition-colors">Integrations</Link>
              <Link href="/security" className="hover:text-indigo-400 transition-colors">Security</Link>
              <Link href="/roadmap" className="hover:text-indigo-400 transition-colors">Roadmap</Link>
            </div>

            <div className="flex flex-col gap-4 text-sm text-slate-400 font-semibold">
              <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold">Company</span>
              <Link href="/about" className="hover:text-indigo-400 transition-colors">About Us</Link>
              <Link href="/careers" className="hover:text-indigo-400 transition-colors">Careers</Link>
              <Link href="/blog" className="hover:text-indigo-400 transition-colors">Blog</Link>
              <Link href="/privacy" className="hover:text-indigo-400 transition-colors">Privacy</Link>
            </div>

            <div className="flex flex-col gap-4 text-sm text-slate-400 font-semibold">
              <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-40 font-bold">Support</span>
              <Link href="/docs" className="hover:text-indigo-400 transition-colors">Docs</Link>
              <Link href="/help" className="hover:text-indigo-400 transition-colors">Help Center</Link>
              <Link href="/contact" className="hover:text-indigo-400 transition-colors">Contact Us</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}