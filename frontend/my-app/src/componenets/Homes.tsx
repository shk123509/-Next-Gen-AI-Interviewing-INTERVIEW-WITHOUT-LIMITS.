"use client";
import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Mic, Brain, Zap, ShieldCheck, Globe, Users, 
  BarChart3, Play, CheckCircle2, MessageSquare, 
  ArrowRight, Sparkles, Command, 
  Cpu // Fixed: Changed from CPU to Cpu
} from 'lucide-react';

import Link from 'next/link';

// --- Reusable Animation Wrapper ---
const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

export default function MegaHomePage() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef });
  // Parallax effect for the hero/background
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200]);

  return (
    <div ref={containerRef} className="bg-[#020617] text-white selection:bg-indigo-500 overflow-x-hidden">
      
      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-20 px-6">
        <motion.div style={{ y: yRange }} className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.15),transparent_50%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} /> Next-Gen AI Interviewing
            </div>
          </FadeIn>
          
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            className="text-6xl md:text-9xl font-black tracking-tighter leading-[0.9] mb-8"
          >
            INTERVIEW <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">WITHOUT LIMITS.</span>
          </motion.h1>

          <FadeIn delay={0.2}>
            <p className="text-xl md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              Conduct thousands of live voice interviews simultaneously. Our AI doesn't just ask questions—it understands context, evaluates logic, and hires the best.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-12 flex flex-col md:flex-row gap-4 justify-center items-center">
              <Link href={'/main'}>
                <button className="group relative px-8 py-5 bg-indigo-600 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105">
                  <span className="relative z-10 flex items-center gap-2">Start Free Pilot <ArrowRight /></span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
              <p className="text-slate-500 text-sm italic">No credit card required. 10 free interviews included.</p>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* 3. BENTO GRID FEATURES */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <div className="md:col-span-8 p-10 rounded-[2.5rem] bg-slate-900 border border-white/5 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 text-indigo-400">
                <Brain size={28} />
              </div>
              <h3 className="text-4xl font-bold mb-4">Deep Semantic <br /> Understanding</h3>
              <p className="text-slate-400 text-lg max-w-md">Our LLM-powered engine detects nuance, hesitation, and technical depth in real-time voice responses.</p>
            </div>
            <div className="absolute bottom-[-20%] right-[-10%] w-80 h-80 bg-indigo-600/20 blur-[100px] group-hover:bg-indigo-600/40 transition-all" />
          </div>

          <div className="md:col-span-4 p-10 rounded-[2.5rem] bg-indigo-600 border border-white/5 flex flex-col justify-between hover:rotate-1 transition-transform">
             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <Zap size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2">0.2s Latency</h3>
                <p className="text-indigo-100">Near-instant response time for a natural, fluid conversation.</p>
              </div>
          </div>

          <div className="md:col-span-4 p-10 rounded-[2.5rem] bg-slate-900 border border-white/5">
            <BarChart3 className="text-emerald-400 mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-2">Automated Scoring</h3>
            <p className="text-slate-400">Instant scorecards mapped to your specific job competencies.</p>
          </div>

          <div className="md:col-span-8 p-10 rounded-[2.5rem] bg-slate-900 border border-white/5 overflow-hidden">
            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4">Integrate with your Tech Stack</h3>
                <p className="text-slate-400">One-click sync with Greenhouse, Lever, and Workday.</p>
              </div>
              <div className="flex gap-4">
                 {[1,2,3,4].map(i => (
                    <div key={i} className="w-16 h-16 bg-slate-800 rounded-2xl border border-white/5 flex items-center justify-center">
                        {/* Using Cpu icon reference or Command based on context */}
                        {i === 1 ? <Cpu size={24} /> : <Command size={24} />}
                    </div>
                 ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. LIVE AI VISUALIZER SECTION */}
      <section className="py-40 bg-white text-black rounded-[4rem]">
        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-20 items-center">
          <div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8 leading-none">
              The AI that <span className="text-indigo-600 underline">hears</span> what matters.
            </h2>
            <div className="space-y-6">
               {[
                 { t: "Multilingual Support", d: "Interviews in 50+ languages natively." },
                 { t: "Anti-Cheating Tech", d: "AI monitors eye movement and tab switching." },
                 { t: "Dynamic Follow-ups", d: "AI asks deeper questions based on candidate answers." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4">
                    <CheckCircle2 className="text-indigo-600 mt-1" />
                    <div>
                      <h4 className="font-bold text-xl">{item.t}</h4>
                      <p className="text-slate-600">{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="relative">
            <div className="aspect-square bg-slate-100 rounded-[3rem] border-8 border-slate-200 flex items-center justify-center overflow-hidden shadow-2xl">
                <div className="flex gap-2">
                  {[...Array(15)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [20, 100, 40, 120, 20] }}
                      transition={{ repeat: Infinity, duration: 2, delay: i * 0.1 }}
                      className="w-3 bg-indigo-600 rounded-full"
                    />
                  ))}
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center mb-20">
            <h2 className="text-5xl font-bold mb-6">Simple, Scalable Pricing</h2>
            <p className="text-slate-400 text-xl">Hire 1 or 10,000. Our platform scales with your growth.</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
           {[
             { plan: "Starter", price: "$0", features: ["10 Interviews", "Basic Analytics", "Public Link"] },
             { plan: "Pro", price: "$499", features: ["500 Interviews", "ATS Integration", "Custom Persona", "Voice Customization"], highlight: true },
             { plan: "Enterprise", price: "Custom", features: ["Unlimited Interviews", "SSO/SAML", "Dedicated Recruiter Support", "Full API Access"] }
           ].map((p, i) => (
             <div key={i} className={`p-10 rounded-3xl border border-white/10 ${p.highlight ? 'bg-indigo-600 scale-105 shadow-2xl shadow-indigo-500/20' : 'bg-slate-900'}`}>
                <h4 className="text-xl mb-2">{p.plan}</h4>
                <div className="text-5xl font-bold mb-8">{p.price}<span className="text-lg text-slate-400 font-normal">/mo</span></div>
                <ul className="space-y-4 mb-10">
                  {p.features.map(f => <li key={f} className="flex items-center gap-2 text-sm opacity-80"><CheckCircle2 size={16}/> {f}</li>)}
                </ul>
                <button className={`w-full py-4 rounded-xl font-bold transition-all ${p.highlight ? 'bg-white text-black' : 'bg-slate-800 hover:bg-slate-700'}`}>Get Started</button>
             </div>
           ))}
        </div>
      </section>

      {/* 6. GIANT FOOTER */}
      <footer className="pt-32 pb-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-2 md:grid-cols-5 gap-12 mb-20">
          <div className="col-span-2">
            <div className="flex items-center gap-2 font-bold text-2xl mb-6">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"><Mic size={18} /></div>
              VOXINTERVIEW
            </div>
            <p className="text-slate-500 max-w-xs">Building the bridge between talent and opportunity using high-fidelity voice artificial intelligence.</p>
          </div>
          <div>
            <h5 className="font-bold mb-6 text-white font-serif tracking-tight">Product</h5>
            <ul className="space-y-4 text-slate-500 text-sm font-medium">
              <li><Link href="/features" className="hover:text-indigo-400 transition-all flex items-center gap-1 group">Features <Zap size={12} className="opacity-0 group-hover:opacity-100 transition-all text-amber-400" /></Link></li>
              <li><Link href="/integrations" className="hover:text-indigo-400 transition-all flex items-center gap-1 group">Integrations <Command size={12} className="opacity-0 group-hover:opacity-100 transition-all" /></Link></li>
              <li><Link href="/security" className="hover:text-indigo-400 transition-all flex items-center gap-1 group">Security <ShieldCheck size={12} className="opacity-0 group-hover:opacity-100 transition-all text-emerald-400" /></Link></li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center text-slate-600 text-sm">
          © 2026 VoxInterview AI Inc. Built with Next.js 15 & Framer Motion.
        </div>
      </footer>
    </div>
  );
}