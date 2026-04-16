"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { 
  Mic, Brain, Zap, ShieldCheck, Globe, Users, 
  BarChart3, Play, CheckCircle2, MessageSquare, 
  ArrowRight, Sparkles, Command,  
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
  const yRange = useTransform(scrollYProgress, [0, 1], [0, -200]);

  // 🔥 DYNAMIC USER ID LOGIC (No Dummy)
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  useEffect(() => {
    // Login ke waqt jo ID save ki thi, wahan se uthayega
    const storedUser = localStorage.getItem("userId"); 
    if (storedUser) {
      setActiveUserId(storedUser);
    }
  }, []);

  return (
    <div ref={containerRef} className="bg-[#020617] text-white selection:bg-indigo-500 overflow-x-hidden antialiased">
      
      {/* 2. HERO SECTION */}
      <section className="relative min-h-screen flex items-center justify-center pt-24 md:pt-20 px-4 md:px-6">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(79,70,229,0.15),transparent_50%)]" />
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] md:text-xs font-bold uppercase tracking-widest mb-6">
              <Sparkles size={14} /> Next-Gen AI Interviewing
            </div>
          </FadeIn>
          
          <motion.h1 
            initial={{ opacity: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, filter: "blur(0px)" }}
            className="text-4xl sm:text-6xl md:text-9xl font-black tracking-tighter leading-[1.1] md:leading-[0.9] mb-8 uppercase"
          >
            INTERVIEW <br className="hidden md:block" /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">WITHOUT LIMITS.</span>
          </motion.h1>

          <FadeIn delay={0.2}>
            <p className="text-lg md:text-2xl text-slate-400 max-w-3xl mx-auto leading-relaxed px-2">
              Conduct thousands of live voice interviews simultaneously. Our AI doesn't just ask questions—it understands context, evaluates logic, and hires the best.
            </p>
          </FadeIn>

          <FadeIn delay={0.4}>
            <div className="mt-10 md:mt-12 flex flex-col md:flex-row gap-4 justify-center items-center px-4">
              
              {/* 🔥 DYNAMIC QUIZ LINK ADDED */}
              <Link href={activeUserId ? `/quiz/${activeUserId}` : '/login'} className="w-full md:w-auto">
                <button className="w-full md:w-auto group relative px-8 py-5 bg-indigo-600 rounded-2xl font-bold text-lg overflow-hidden transition-all hover:scale-105 active:scale-95">
                  <span className="relative z-10 flex items-center justify-center gap-2">
                    {activeUserId ? "Start Interviews" : "Start Free Pilot"} <ArrowRight size={20} />
                  </span>
                  <div className="absolute inset-0 bg-gradient-to-r from-indigo-400 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />
                </button>
              </Link>
              
              <Link href="/chat" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-8 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                  Candidate Dout Section
                </button>
              </Link>
            </div>
            <p className="text-slate-500 text-sm italic text-center mt-6">No credit card required. 10 free interviews included.</p>
          </FadeIn>
        </div>
      </section>

      {/* 3. BENTO GRID FEATURES */}
      <section className="py-20 md:py-32 px-4 md:px-6 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          
          <div className="md:col-span-8 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 border border-white/5 flex flex-col justify-between overflow-hidden relative group">
            <div className="relative z-10">
              <div className="w-12 h-12 bg-indigo-500/20 rounded-xl flex items-center justify-center mb-6 text-indigo-400">
                <Brain size={28} />
              </div>
              <h3 className="text-3xl md:text-4xl font-bold mb-4 tracking-tight">Deep Semantic <br className="hidden md:block" /> Understanding</h3>
              <p className="text-slate-400 text-base md:text-lg max-w-md">Our LLM-powered engine detects nuance, hesitation, and technical depth in real-time voice responses.</p>
            </div>
            <div className="absolute bottom-[-20%] right-[-10%] w-60 md:w-80 h-60 md:h-80 bg-indigo-600/20 blur-[100px] group-hover:bg-indigo-600/40 transition-all" />
          </div>

          <div className="md:col-span-4 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-indigo-600 border border-white/5 flex flex-col justify-between hover:rotate-1 transition-transform min-h-[250px] md:min-h-full">
             <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center text-white">
                <Zap size={28} />
              </div>
              <div>
                <h3 className="text-3xl font-bold text-white mb-2 italic">0.2s Latency</h3>
                <p className="text-indigo-100 font-medium">Near-instant response time for a natural, fluid conversation.</p>
              </div>
          </div>

          <div className="md:col-span-4 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 border border-white/5">
            <BarChart3 className="text-emerald-400 mb-6" size={40} />
            <h3 className="text-2xl font-bold mb-2 tracking-tight">Automated Scoring</h3>
            <p className="text-slate-400">Instant scorecards mapped to your specific job competencies.</p>
          </div>

          <div className="md:col-span-8 p-8 md:p-10 rounded-[2rem] md:rounded-[2.5rem] bg-slate-900 border border-white/5 overflow-hidden">
            <div className="flex flex-col lg:flex-row gap-8 items-start lg:items-center h-full">
              <div className="flex-1">
                <h3 className="text-2xl font-bold mb-4 tracking-tight">Integrate with your Tech Stack</h3>
                <p className="text-slate-400">One-click sync with Greenhouse, Lever, and Workday.</p>
              </div>
              <div className="flex flex-wrap gap-3">
                 {[1,2,3,4].map(i => <div key={i} className="w-12 h-12 md:w-16 md:h-16 bg-slate-800 rounded-2xl border border-white/5 flex items-center justify-center" ><Command size={20} className="md:size-24" /></div>)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. THE "LIVE AI" VISUALIZER SECTION */}
      <section className="py-20 md:py-40 bg-white text-black rounded-[2.5rem] md:rounded-[4rem]">
        <div className="max-w-7xl mx-auto px-4 md:px-6 grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-20 items-center">
          <div className="order-2 md:order-1">
            <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[1.1] md:leading-none uppercase">
              The AI that <span className="text-indigo-600 underline decoration-indigo-200 underline-offset-8">hears</span> what matters.
            </h2>
            <div className="space-y-6">
               {[
                 { t: "Multilingual Support", d: "Interviews in 50+ languages natively." },
                 { t: "Anti-Cheating Tech", d: "AI monitors eye movement and tab switching." },
                 { t: "Dynamic Follow-ups", d: "AI asks deeper questions based on candidate answers." }
               ].map((item, i) => (
                 <div key={i} className="flex gap-4">
                    <CheckCircle2 className="text-indigo-600 shrink-0 mt-1" size={24} />
                    <div>
                      <h4 className="font-bold text-xl tracking-tight">{item.t}</h4>
                      <p className="text-slate-600 text-sm md:text-base">{item.d}</p>
                    </div>
                 </div>
               ))}
            </div>
          </div>
          <div className="order-1 md:order-2 relative px-4 md:px-0">
            <div className="aspect-square bg-slate-100 rounded-[2rem] md:rounded-[3rem] border-4 md:border-8 border-slate-200 flex items-center justify-center overflow-hidden shadow-2xl relative">
                {/* Voice Wave Animation */}
                <div className="flex gap-1 md:gap-2">
                  {[...Array(10)].map((_, i) => (
                    <motion.div
                      key={i}
                      animate={{ height: [15, 60, 25, 80, 15] }}
                      transition={{ repeat: Infinity, duration: 1.5, delay: i * 0.1 }}
                      className="w-2 md:w-3 bg-indigo-600 rounded-full"
                    />
                  ))}
                </div>
                <div className="absolute bottom-6 left-6 right-6 bg-white p-3 md:p-4 rounded-xl md:rounded-2xl shadow-xl flex items-center gap-4 border border-slate-100">
                  <div className="w-8 h-8 md:w-10 md:h-10 rounded-full bg-slate-200 animate-pulse shrink-0" />
                  <div className="flex-1 space-y-2">
                    <div className="h-2.5 w-3/4 bg-slate-200 rounded" />
                    <div className="h-2.5 w-1/2 bg-slate-200 rounded" />
                  </div>
                </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. PRICING SECTION */}
      <section className="py-20 md:py-32 px-4 md:px-6">
        <div className="max-w-4xl mx-auto text-center mb-16 md:mb-20">
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6 uppercase italic">Scalable Pricing</h2>
            <p className="text-slate-400 text-lg md:text-xl">Hire 1 or 10,000. Our platform scales with you.</p>
        </div>
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
           {[
             { plan: "Starter", price: "$0", features: ["10 Interviews", "Basic Analytics", "Public Link"] },
             { plan: "Pro", price: "$499", features: ["500 Interviews", "ATS Integration", "Custom Persona", "Voice Customization"], highlight: true },
             { plan: "Enterprise", price: "Custom", features: ["Unlimited Interviews", "SSO/SAML", "Recruiter Support", "Full API Access"] }
           ].map((p, i) => (
             <div key={i} className={`p-8 md:p-10 rounded-3xl border border-white/10 transition-all ${p.highlight ? 'bg-indigo-600 md:scale-105 shadow-2xl shadow-indigo-500/20' : 'bg-slate-900'}`}>
                <h4 className="text-xl font-bold mb-2 uppercase tracking-tight">{p.plan}</h4>
                <div className="text-4xl md:text-5xl font-black mb-8 italic">{p.price}<span className="text-lg text-slate-400 font-normal ml-1">/mo</span></div>
                <ul className="space-y-4 mb-10 min-h-[160px]">
                  {p.features.map(f => <li key={f} className="flex items-start gap-3 text-sm opacity-90"><CheckCircle2 size={18} className="shrink-0 text-white md:text-inherit"/> {f}</li>)}
                </ul>
                <button className={`w-full py-4 rounded-xl font-black text-sm uppercase tracking-widest transition-all ${p.highlight ? 'bg-white text-black' : 'bg-slate-800 hover:bg-slate-700'}`}>Get Started</button>
             </div>
           ))}
        </div>
      </section>

      {/* 6. GIANT FOOTER */}
      <footer className="pt-20 pb-10 px-6 border-t border-white/5">
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-12 mb-16 md:mb-20">
          <div className="sm:col-span-2">
            <div className="flex items-center gap-2 font-black text-2xl mb-6 tracking-tighter italic">
              <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"><Mic size={18} /></div>
              VOXINTERVIEW
            </div>
            <p className="text-slate-500 max-w-xs font-medium leading-relaxed">Building the bridge between talent and opportunity using high-fidelity voice artificial intelligence.</p>
          </div>
          
          <div className="space-y-6">
            <h5 className="font-black text-white uppercase text-[11px] tracking-[0.3em] opacity-50">Product</h5>
            <ul className="space-y-4 text-slate-500 text-sm font-bold">
              <li><Link href="/features" className="hover:text-indigo-400 transition-all">Features</Link></li>
              <li><Link href="/integrations" className="hover:text-indigo-400 transition-all">Integrations</Link></li>
              <li><Link href="/security" className="hover:text-indigo-400 transition-all">Security</Link></li>
              <li><Link href="/roadmap" className="hover:text-indigo-400 transition-all">Roadmap</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="font-black text-white uppercase text-[11px] tracking-[0.3em] opacity-50">Company</h5>
            <ul className="space-y-4 text-slate-500 text-sm font-bold">
              <li><Link href="/about" className="hover:text-indigo-400 transition-all">About Us</Link></li>
              <li><Link href="/careers" className="hover:text-indigo-400 transition-all flex items-center gap-2">Careers <span className="bg-indigo-500/10 text-indigo-400 text-[9px] px-1.5 py-0.5 rounded border border-indigo-500/20">Hiring</span></Link></li>
              <li><Link href="/blog" className="hover:text-indigo-400 transition-all">Blog</Link></li>
              <li><Link href="/privacy" className="hover:text-indigo-400 transition-all">Privacy</Link></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h5 className="font-black text-white uppercase text-[11px] tracking-[0.3em] opacity-50">Support</h5>
            <ul className="space-y-4 text-slate-500 text-sm font-bold">
              <li><Link href="/docs" className="hover:text-indigo-400 transition-all">Docs</Link></li>
              <li><Link href="/help" className="hover:text-indigo-400 transition-all">Help Center</Link></li>
              <li><Link href="/contact" className="hover:text-[#4ade80] transition-all">Contact Us</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="max-w-7xl mx-auto pt-10 border-t border-white/5 text-center flex flex-col md:flex-row justify-between items-center gap-4 text-slate-600 text-[11px] font-black uppercase tracking-widest">
          <p>© 2026 VoxInterview AI Inc.</p>
          <p className="opacity-50 italic font-medium">Built with Next.js 15 & Framer Motion</p>
        </div>
      </footer>
    </div>
  );
}