"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  Shield, Globe, Zap, Users, BarChart3, 
  Cpu, Lock, Search, Headphones, MessageSquare, 
  CheckCircle, ArrowUpRight, PlayCircle, Layers
} from 'lucide-react';

// --- Components ---

const SectionHeader = ({ title, subtitle, label }: { title: string, subtitle: string, label: string }) => (
  <div className="mb-16">
    <span className="text-indigo-400 font-bold tracking-[0.2em] uppercase text-xs">{label}</span>
    <h2 className="text-4xl md:text-6xl font-black mt-4 mb-6 tracking-tight">{title}</h2>
    <p className="text-slate-400 text-lg md:text-xl max-w-2xl">{subtitle}</p>
  </div>
);

export default function PlatformPage() {
  return (
    <div className="bg-[#020617] text-white font-sans overflow-x-hidden">
      
      {/* 1. HERO: THE PLATFORM CORE */}
      <section className="relative min-h-[90vh] flex flex-col justify-center items-center px-6 pt-20">
        <div className="absolute top-0 w-full h-full bg-[radial-gradient(ellipse_at_top,rgba(79,70,229,0.1),transparent)] pointer-events-none" />
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="max-w-7xl mx-auto text-center z-10"
        >
          <h1 className="text-7xl md:text-[120px] font-black leading-none tracking-tighter mb-8">
            THE GLOBAL <br /> <span className="text-indigo-500 italic">STANDARD</span>
          </h1>
          <p className="text-xl md:text-3xl text-slate-400 max-w-4xl mx-auto leading-relaxed">
            VoxInterview is more than a tool. It's a complete ecosystem for voice-first AI assessments, identity verification, and deep talent analytics.
          </p>
          <div className="mt-12 flex gap-6 justify-center">
            <button className="bg-white text-black px-10 py-5 rounded-2xl font-bold text-lg hover:bg-indigo-500 hover:text-white transition-all">Book Demo</button>
            <button className="border border-slate-700 px-10 py-5 rounded-2xl font-bold text-lg hover:bg-slate-800 transition-all flex items-center gap-2">
              <PlayCircle size={24}/> See Platform in Action
            </button>
          </div>
        </motion.div>
      </section>

      {/* 2. LOGO MARQUEE (Social Proof) */}
      <div className="py-20 border-y border-white/5 bg-slate-950/50">
        <p className="text-center text-slate-500 text-sm font-bold tracking-[0.3em] mb-10 uppercase">Trusted by Global Giants</p>
        <div className="flex overflow-hidden gap-12 group">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="flex-shrink-0 text-3xl font-bold opacity-20 grayscale hover:opacity-100 hover:grayscale-0 transition-all cursor-default flex items-center gap-2">
              <Globe size={30} /> COMPANY {i}
            </div>
          ))}
        </div>
      </div>

      {/* 3. THE "WHY" - PROBLEM & SOLUTION SECTION */}
      <section className="py-32 px-6 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-20 items-center">
          <div className="relative">
             <div className="absolute -inset-4 bg-indigo-500/20 blur-3xl rounded-full" />
             <div className="relative bg-slate-900 border border-white/10 p-8 rounded-[2rem]">
                <div className="flex gap-4 mb-6 border-b border-white/5 pb-6">
                  <div className="w-12 h-12 bg-indigo-600 rounded-full flex items-center justify-center font-bold">AI</div>
                  <div>
                    <p className="font-bold">Interviewer Bot</p>
                    <p className="text-xs text-emerald-400 font-mono italic">Status: Analyzing Logic...</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-slate-800 p-4 rounded-xl rounded-tl-none text-sm">"Can you explain how you'd scale a WebSocket server to handle 1M connections?"</div>
                  <div className="bg-indigo-600/20 border border-indigo-500/30 p-4 rounded-xl rounded-tr-none text-sm self-end text-right">"I would use Redis Pub/Sub for cross-node communication and a load balancer..."</div>
                  <div className="mt-4 pt-4 border-t border-white/5">
                    <p className="text-xs text-slate-500 uppercase font-bold mb-2">AI Insights:</p>
                    <div className="flex gap-2">
                      <span className="bg-emerald-500/10 text-emerald-500 text-[10px] px-2 py-1 rounded border border-emerald-500/20">High Tech Depth</span>
                      <span className="bg-blue-500/10 text-blue-500 text-[10px] px-2 py-1 rounded border border-blue-500/20">Confident Tone</span>
                    </div>
                  </div>
                </div>
             </div>
          </div>
          <div>
            <SectionHeader 
              label="Deep Intelligence"
              title="Beyond simple Q&A."
              subtitle="Our AI doesn't just read a script. It follows the candidate's logic, asks deep follow-up questions, and identifies true experts from pretenders."
            />
            <div className="space-y-8">
              <div className="flex gap-6">
                <div className="p-3 bg-slate-800 rounded-xl h-fit"><Layers className="text-indigo-400" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Multi-Model Orchestration</h4>
                  <p className="text-slate-400 text-sm">We use 3 different LLMs to cross-verify answers for 100% accuracy in technical grading.</p>
                </div>
              </div>
              <div className="flex gap-6">
                <div className="p-3 bg-slate-800 rounded-xl h-fit"><Lock className="text-indigo-400" /></div>
                <div>
                  <h4 className="text-xl font-bold mb-2">Zero-Trust Security</h4>
                  <p className="text-slate-400 text-sm">Built-in proctoring ensures the person on the call is who they say they are.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 4. PLATFORM PILLARS (3-Column Detailed) */}
      <section className="py-32 px-6 bg-slate-900/30">
        <div className="max-w-7xl mx-auto">
          <SectionHeader 
            label="Features"
            title="Everything you need <br/> to hire at scale."
            subtitle="One platform to manage the entire early-stage hiring pipeline across 40+ countries."
          />
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Search />, t: "Talent Discovery", d: "Scan and filter candidates before the interview even starts based on custom AI parameters." },
              { icon: <Headphones />, t: "Native Voice Engine", d: "Crystal clear audio with noise cancellation and accent-normalization built-in." },
              { icon: <BarChart3 />, t: "Unified Analytics", d: "Compare departments, roles, and regions with high-level hiring velocity dashboards." },
              { icon: <Shield />, t: "Global Compliance", d: "GDPR, SOC2, and HIPAA compliant. Your candidate data is encrypted and secure." },
              { icon: <Cpu />, t: "API-First Design", d: "Connect your existing ATS or build custom hiring workflows with our robust Webhooks." },
              { icon: <MessageSquare />, t: "Instant Feedback", d: "Candidates receive personalized, constructive feedback to improve their experience." }
            ].map((f, i) => (
              <motion.div 
                whileHover={{ scale: 1.02 }}
                key={i} 
                className="p-10 rounded-[2rem] bg-slate-800/40 border border-white/5 hover:border-indigo-500/50 transition-all"
              >
                <div className="mb-6 text-indigo-400">{f.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{f.t}</h3>
                <p className="text-slate-400 leading-relaxed">{f.d}</p>
                <button className="mt-6 flex items-center gap-2 text-indigo-400 text-sm font-bold group">
                  Learn more <ArrowUpRight className="group-hover:translate-x-1 transition-transform" size={16}/>
                </button>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. FOR RECRUITERS vs FOR CANDIDATES */}
      <section className="py-40 px-6 max-w-7xl mx-auto grid md:grid-cols-2 gap-4">
        <div className="bg-indigo-600 p-16 rounded-[3rem] text-white">
          <h3 className="text-4xl font-black mb-6">For Recruiters</h3>
          <ul className="space-y-4 mb-10 opacity-90">
            <li className="flex items-center gap-3"><CheckCircle /> Reduce screening time by 90%</li>
            <li className="flex items-center gap-3"><CheckCircle /> Eliminate 1st round scheduling</li>
            <li className="flex items-center gap-3"><CheckCircle /> Data-backed hiring decisions</li>
          </ul>
          <button className="bg-white text-indigo-600 px-8 py-4 rounded-xl font-bold">Start Hiring</button>
        </div>
        <div className="bg-slate-800 p-16 rounded-[3rem] text-white">
          <h3 className="text-4xl font-black mb-6">For Candidates</h3>
          <ul className="space-y-4 mb-10 opacity-80">
            <li className="flex items-center gap-3"><CheckCircle /> Interview anytime, anywhere</li>
            <li className="flex items-center gap-3"><CheckCircle /> Fair, unbiased evaluation</li>
            <li className="flex items-center gap-3"><CheckCircle /> Instant result transparency</li>
          </ul>
          <button className="bg-indigo-500 text-white px-8 py-4 rounded-xl font-bold">Take a Demo</button>
        </div>
      </section>

      {/* 6. MEGA FOOTER */}
      {/* <footer className="pt-40 pb-20 px-6 bg-slate-950">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-6 gap-12 mb-20">
            <div className="col-span-2">
              <h2 className="text-3xl font-bold mb-6 italic underline decoration-indigo-500">VOX INTERVIEW</h2>
              <p className="text-slate-500 mb-6">The future of human-AI collaboration in the workplace.</p>
              <div className="flex gap-4">
                <div className="w-10 h-10 bg-slate-900 rounded-full" />
                <div className="w-10 h-10 bg-slate-900 rounded-full" />
                <div className="w-10 h-10 bg-slate-900 rounded-full" />
              </div>
            </div>
            <div>
               <p className="font-bold mb-6">Platform</p>
               <ul className="text-slate-500 space-y-4 text-sm">
                 <li>AI Voice Engine</li>
                 <li>Interview Labs</li>
                 <li>Analytics Hub</li>
                 <li>Integrations</li>
               </ul>
            </div>
            <div>
               <p className="font-bold mb-6">Resources</p>
               <ul className="text-slate-500 space-y-4 text-sm">
                 <li>Documentation</li>
                 <li>API Docs</li>
                 <li>Case Studies</li>
                 <li>Webinars</li>
               </ul>
            </div>
            <div>
               <p className="font-bold mb-6">Legal</p>
               <ul className="text-slate-500 space-y-4 text-sm">
                 <li>Privacy Policy</li>
                 <li>Terms of Service</li>
                 <li>DPA</li>
                 <li>Subprocessors</li>
               </ul>
            </div>
            <div>
               <p className="font-bold mb-6">Support</p>
               <ul className="text-slate-500 space-y-4 text-sm">
                 <li>Help Center</li>
                 <li>Contact Us</li>
                 <li>Status Page</li>
                 <li>Security</li>
               </ul>
            </div>
          </div>
          <div className="pt-10 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-slate-600 text-xs">
            <p>© 2026 VOXINTERVIEW AI. ALL RIGHTS RESERVED.</p>
            <p>MADE FOR THE FUTURE OF WORK.</p>
          </div>
        </div>
      </footer> */}
    </div>
  );
}