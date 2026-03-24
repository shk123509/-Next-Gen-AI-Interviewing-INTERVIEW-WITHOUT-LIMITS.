"use client";
import React from 'react';
import { motion } from 'framer-motion';
import { 
  ShieldCheck, Globe, Zap, Users, BarChart3, 
  Lock, Server, Briefcase, ChevronRight, 
  Settings, Database, HeartHandshake 
} from 'lucide-react';

const FadeIn = ({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
  >
    {children}
  </motion.div>
);

export default function EnterprisePage() {
  return (
    <div className="bg-[#020617] text-white selection:bg-indigo-500 overflow-x-hidden pt-20">
      
      {/* --- 1. HERO SECTION (High End) --- */}
      <section className="relative min-h-[80vh] flex items-center justify-center px-6">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full -z-10" />
        
        <div className="max-w-7xl mx-auto text-center">
          <FadeIn>
            <span className="px-6 py-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest">
              Built for Fortune 500
            </span>
          </FadeIn>
          
          <motion.h1 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1 }}
            className="mt-8 text-6xl md:text-[100px] font-black tracking-tighter leading-[0.85]"
          >
            SCALE YOUR HIRING <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-white to-indigo-400">
              WORLDWIDE.
            </span>
          </motion.h1>

          <FadeIn delay={0.2}>
            <p className="mt-10 text-xl text-slate-400 max-w-3xl mx-auto leading-relaxed">
              VoxInterview Enterprise provides the security, compliance, and custom infrastructure required to interview 100,000+ candidates simultaneously.
            </p>
          </FadeIn>

          <FadeIn delay={0.3}>
            <div className="mt-12 flex flex-col md:flex-row gap-6 justify-center items-center">
              <button className="bg-white text-black px-12 py-5 rounded-2xl font-black text-lg hover:bg-indigo-600 hover:text-white transition-all shadow-2xl shadow-white/5">
                Talk to Sales
              </button>
              <button className="border border-slate-700 px-12 py-5 rounded-2xl font-black text-lg hover:bg-slate-800 transition-all">
                Download Whitepaper
              </button>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* --- 2. STATS SECTION (Trust Building) --- */}
      <section className="py-24 border-y border-white/5 bg-slate-900/20 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-12 text-center">
          {[
            { label: "Uptime SLA", val: "99.99%" },
            { label: "Languages", val: "65+" },
            { label: "Data Security", val: "SOC2 Type II" },
            { label: "Global Reach", val: "190+ Countries" }
          ].map((s, i) => (
            <div key={i}>
              <h2 className="text-4xl font-black text-indigo-500 mb-2">{s.val}</h2>
              <p className="text-slate-500 uppercase text-xs font-bold tracking-widest">{s.label}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- 3. THE "ENTERPRISE DIFFERENCE" (Bento Grid) --- */}
      <section className="py-40 px-6 max-w-7xl mx-auto">
        <FadeIn>
          <div className="mb-20">
            <h2 className="text-5xl font-black mb-6 tracking-tight italic">The Enterprise Difference.</h2>
            <p className="text-slate-400 text-xl">Beyond basic AI—we offer complete control over your talent pipeline.</p>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Card 1 */}
          <div className="md:col-span-2 p-12 rounded-[3rem] bg-gradient-to-br from-slate-900 to-indigo-950/30 border border-white/5 relative overflow-hidden group">
            <div className="relative z-10">
              <Server className="text-indigo-500 mb-6" size={40} />
              <h3 className="text-4xl font-black mb-4 leading-tight">Private Cloud <br /> Deployment</h3>
              <p className="text-slate-400 text-lg max-w-md">Keep your data within your own VPC. We support AWS, Azure, and Google Cloud private instances.</p>
            </div>
            <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-indigo-600/20 blur-[80px] group-hover:bg-indigo-600/40 transition-all" />
          </div>

          {/* Card 2 */}
          <div className="p-12 rounded-[3rem] bg-slate-900 border border-white/5 flex flex-col justify-between">
            <Globe className="text-cyan-400" size={40} />
            <div>
              <h3 className="text-3xl font-bold mb-2 tracking-tighter">Localized AI</h3>
              <p className="text-slate-400">AI that understands regional accents and cultural nuances in 65+ languages.</p>
            </div>
          </div>

          {/* Card 3 */}
          <div className="p-12 rounded-[3rem] bg-slate-900 border border-white/5 flex flex-col justify-between">
            <Database className="text-emerald-400" size={40} />
            <div>
              <h3 className="text-3xl font-bold mb-2 tracking-tighter">Custom LLMs</h3>
              <p className="text-slate-400">Train the AI on your specific technical stack and internal company culture.</p>
            </div>
          </div>

          {/* Card 4 */}
          <div className="md:col-span-2 p-12 rounded-[3rem] bg-slate-900 border border-white/5 flex flex-col md:flex-row gap-12 items-center overflow-hidden">
            <div className="flex-1">
              <Settings className="text-purple-500 mb-6" size={40} />
              <h3 className="text-4xl font-black mb-4 leading-tight">Advanced ATS <br /> Orchestration</h3>
              <p className="text-slate-400 text-lg">Deep bi-directional sync with Workday, Greenhouse, Lever, and SAP SuccessFactors.</p>
            </div>
            <div className="flex gap-4">
               {[1,2].map(i => <div key={i} className="w-24 h-24 bg-slate-800 rounded-[2rem] border border-white/5 flex items-center justify-center font-black">ATS</div>)}
            </div>
          </div>
        </div>
      </section>

      {/* --- 4. COMPLIANCE & SECURITY (Trust Section) --- */}
      <section className="py-40 bg-white text-black rounded-[4rem]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-6xl font-black tracking-tighter mb-8 leading-tight text-indigo-600">
                Security is our <br /> first priority.
              </h2>
              <div className="space-y-8">
                 {[
                   { icon: <Lock className="text-indigo-600" />, t: "End-to-End Encryption", d: "All audio and text data is encrypted at rest and in transit using AES-256." },
                   { icon: <ShieldCheck className="text-indigo-600" />, t: "GDPR & CCPA Compliant", d: "Automated data deletion and candidate privacy controls built-in." },
                   { icon: <HeartHandshake className="text-indigo-600" />, t: "Dedicated Support", d: "24/7 technical account manager for your global hiring teams." }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6">
                      <div className="p-4 bg-indigo-50 rounded-2xl h-fit">{item.icon}</div>
                      <div>
                        <h4 className="font-black text-xl mb-1 italic uppercase tracking-tighter">{item.t}</h4>
                        <p className="text-slate-600 leading-relaxed">{item.d}</p>
                      </div>
                   </div>
                 ))}
              </div>
            </div>
            <div className="relative">
               <div className="aspect-square bg-slate-100 rounded-[4rem] border-[16px] border-slate-200 flex items-center justify-center p-12 shadow-2xl">
                  <div className="grid grid-cols-2 gap-6 w-full">
                     {[1,2,3,4].map(i => (
                       <div key={i} className="aspect-video bg-white rounded-3xl border border-slate-200 shadow-sm p-4 flex flex-col justify-center items-center gap-2">
                          <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center text-indigo-600"><ShieldCheck size={16}/></div>
                          <div className="w-12 h-2 bg-slate-100 rounded-full" />
                       </div>
                     ))}
                  </div>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- 5. ENTERPRISE CTA --- */}
      <section className="py-40 px-6">
        <div className="max-w-7xl mx-auto bg-gradient-to-r from-indigo-600 to-indigo-800 rounded-[4rem] p-12 md:p-24 text-center relative overflow-hidden shadow-[0_0_100px_rgba(79,70,229,0.3)]">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 blur-[100px] rounded-full" />
          <h2 className="text-5xl md:text-[80px] font-black tracking-tighter leading-none mb-10">
            READY TO TRANSFORM <br /> YOUR TALENT ACQUISITION?
          </h2>
          <button className="bg-white text-black px-16 py-6 rounded-2xl font-black text-2xl hover:bg-slate-900 hover:text-white transition-all transform hover:scale-110 active:scale-95">
            Contact Enterprise Sales
          </button>
          <p className="mt-8 text-indigo-200 font-medium">Join 200+ global enterprises already using VoxInterview.</p>
        </div>
      </section>

    </div>
  );
}