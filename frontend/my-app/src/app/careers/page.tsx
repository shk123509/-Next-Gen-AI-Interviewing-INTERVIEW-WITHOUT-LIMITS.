"use client";
import React, { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, useMotionValue, useSpring, useTransform } from 'framer-motion';
import { 
  ArrowUpRight, Globe, Cpu, Zap, Rocket, X, 
  Upload, Send, Fingerprint, User, Mail, 
  FileText, CheckCircle2, ChevronDown, Sparkles
} from 'lucide-react';

// --- UNIQUE BACKGROUND: THE GRID WARP ---
const WarpGrid = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      mouseX.set(e.clientX / window.innerWidth - 0.5);
      mouseY.set(e.clientY / window.innerHeight - 0.5);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, [mouseX, mouseY]);

  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [10, -10]));
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-10, 10]));

  return (
    <div className="fixed inset-0 -z-10 bg-[#020202] overflow-hidden perspective-1000">
      <motion.div 
        style={{ rotateX, rotateY }}
        className="absolute inset-[-10%] opacity-20 bg-[linear-gradient(to_right,#312e81_1px,transparent_1px),linear-gradient(to_bottom,#312e81_1px,transparent_1px)] bg-[size:50px_50px]"
      />
      <div className="absolute inset-0 bg-gradient-to-t from-[#020202] via-transparent to-[#020202]" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-indigo-600/10 blur-[180px] rounded-full" />
    </div>
  );
};

// --- MODAL WITH REAL RESUME UPLOAD ---
const ApplicationPortal = ({ job, onClose }: any) => {
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 z-[100] flex items-center justify-center px-6 backdrop-blur-3xl bg-black/90">
      <motion.div initial={{ scale: 0.8, y: 100 }} animate={{ scale: 1, y: 0 }} className="relative w-full max-w-5xl bg-[#080808] border border-white/10 rounded-[3rem] overflow-hidden shadow-2xl">
        <div className="grid md:grid-cols-5 h-full">
          {/* Left: Info (2 cols) */}
          <div className="md:col-span-2 bg-indigo-600 p-12 text-black flex flex-col justify-between relative overflow-hidden">
             <Fingerprint size={400} className="absolute -bottom-20 -left-20 opacity-10" />
             <div className="relative z-10">
                <h3 className="text-5xl font-black italic uppercase leading-none tracking-tighter mb-6">Start Your <br /> Mission.</h3>
                <p className="font-bold italic text-black/70 mb-8 uppercase tracking-widest text-xs leading-relaxed">Position: {job.title} // ID_{job.id}</p>
                <ul className="space-y-4">
                  {['AI Core Access', 'Global Payroll', 'Vested Equity'].map(item => (
                    <li key={item} className="flex items-center gap-2 font-black text-[10px] uppercase italic tracking-widest"><CheckCircle2 size={14} /> {item}</li>
                  ))}
                </ul>
             </div>
             <button onClick={onClose} className="p-4 bg-black text-white rounded-full w-fit hover:scale-110 transition-transform"><X size={20} /></button>
          </div>

          {/* Right: Form (3 cols) */}
          <div className="md:col-span-3 p-12 space-y-8 max-h-[80vh] overflow-y-auto custom-scrollbar">
             <div className="space-y-2">
                <h4 className="text-2xl font-black italic uppercase">Candidate Data</h4>
                <p className="text-slate-500 text-xs font-medium italic">Complete the protocol to initialize AI screening.</p>
             </div>
             
             <div className="grid gap-4">
                <input type="text" placeholder="NAME" className="bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-500 font-black italic text-xs uppercase tracking-widest" />
                <input type="email" placeholder="EMAIL" className="bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-indigo-500 font-black italic text-xs uppercase tracking-widest" />
                
                {/* REAL FILE UPLOAD AREA */}
                <div 
                  onClick={() => fileInputRef.current?.click()}
                  className={`p-10 border-2 border-dashed rounded-[2rem] text-center transition-all cursor-pointer ${file ? 'border-emerald-500 bg-emerald-500/5' : 'border-white/10 hover:border-indigo-500 bg-white/5'}`}
                >
                  <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                  {file ? (
                    <div className="flex flex-col items-center gap-2">
                       <FileText className="text-emerald-400" size={40} />
                       <span className="text-xs font-black italic uppercase text-emerald-400">{file.name}</span>
                       <span className="text-[10px] text-slate-500 italic">Click to change file</span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center gap-2">
                       <Upload className="text-slate-700" size={40} />
                       <span className="text-xs font-black italic uppercase text-slate-500 tracking-widest">Drop PDF Resume Here</span>
                    </div>
                  )}
                </div>
             </div>

             <button className="w-full py-6 bg-white text-black font-black uppercase italic tracking-[0.3em] rounded-2xl hover:bg-indigo-600 hover:text-white transition-all flex items-center justify-center gap-4">
                DEPLOY APPLICATION <Send size={20} />
             </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

export default function DeepCareers() {
  const [activeTab, setActiveTab] = useState('All');
  const [selectedJob, setSelectedJob] = useState<any>(null);

  const jobs = [
    { id: 'NR-01', category: 'Engineering', title: "Neural Architect", loc: "Remote", type: "Full-time", desc: "Building the next-gen LLM fine-tuning pipelines." },
    { id: 'UI-02', category: 'Design', title: "Kinetic UI Designer", loc: "Bengaluru", type: "Hybrid", desc: "Creating interfaces that feel like living organisms." },
    { id: 'BE-03', category: 'Infrastructure', title: "Core Engine Lead", loc: "Remote", type: "Full-time", desc: "Scaling systems to handle millions of voice tokens." }
  ];

  return (
    <div className="min-h-screen text-white font-sans selection:bg-indigo-500">
      <WarpGrid />

      {/* 1. HERO RE-IMAGINED */}
      <section className="pt-40 pb-20 px-6 md:px-20 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}>
           <div className="flex items-center gap-3 mb-12">
              <span className="w-2 h-2 rounded-full bg-indigo-500 animate-ping" />
              <span className="text-[10px] font-black uppercase tracking-[0.6em] text-indigo-400">Recruitment Active // 2026</span>
           </div>
           <h1 className="text-[12vw] font-black italic uppercase leading-[0.75] tracking-tighter mb-12">
              BEYOND <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 via-white to-indigo-500">HIRED.</span>
           </h1>
           <div className="flex flex-wrap gap-10 mt-20 opacity-30">
              {['React 19', 'Next.js 16', 'PyTorch', 'Rust', 'WebRTC'].map(s => (
                <span key={s} className="text-xs font-black italic uppercase tracking-widest">{s}</span>
              ))}
           </div>
        </motion.div>
      </section>

      {/* 2. DYNAMIC JOB BOARD */}
      <section className="py-20 px-6 md:px-20 max-w-7xl mx-auto">
        <div className="flex flex-wrap gap-4 mb-20 bg-white/5 p-2 rounded-[2.5rem] border border-white/5 w-fit backdrop-blur-md">
          {['All', 'Engineering', 'Design', 'Infrastructure'].map(tab => (
            <button key={tab} onClick={() => setActiveTab(tab)} className={`px-10 py-4 rounded-3xl font-black text-[10px] uppercase tracking-widest transition-all ${activeTab === tab ? 'bg-white text-black' : 'text-slate-500 hover:text-white'}`}>
              {tab}
            </button>
          ))}
        </div>

        <div className="grid gap-6">
          <AnimatePresence mode="popLayout">
            {jobs.filter(j => activeTab === 'All' || j.category === activeTab).map((job) => (
              <motion.div 
                key={job.id} layout initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                className="p-12 rounded-[4rem] bg-white/[0.02] border border-white/5 backdrop-blur-3xl hover:bg-white/[0.05] hover:border-indigo-500/50 transition-all group"
              >
                <div className="flex flex-col md:flex-row justify-between items-center gap-10">
                   <div className="space-y-4 flex-1">
                      <div className="flex items-center gap-4">
                        <span className="text-indigo-500 font-black italic tracking-widest">[{job.id}]</span>
                        <h3 className="text-4xl font-black italic uppercase tracking-tighter group-hover:text-indigo-400 transition-colors">{job.title}</h3>
                      </div>
                      <p className="text-slate-500 italic font-medium max-w-xl">{job.desc}</p>
                   </div>
                   <button onClick={() => setSelectedJob(job)} className="px-12 py-6 bg-white text-black rounded-3xl font-black uppercase italic tracking-widest flex items-center gap-3 hover:bg-indigo-600 hover:text-white transition-all transform hover:scale-105 active:scale-95 group">
                      Initialize Application <ArrowUpRight className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                   </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </section>

      {/* 3. NEW SECTION: ENGINEERING STACK */}
      <section className="py-40 px-6 md:px-20 max-w-7xl mx-auto border-t border-white/5">
         <div className="grid md:grid-cols-2 gap-20">
            <div className="space-y-10">
               <h2 className="text-6xl font-black italic uppercase tracking-tighter">THE STACK <br /> WE BREATHE.</h2>
               <p className="text-slate-500 text-xl font-medium italic">We don&apos;t use legacy. We build with the fastest, most scalable tools available in 2026.</p>
            </div>
            <div className="grid grid-cols-2 gap-6">
               {[
                 { t: "Frontend", d: "React 19 + Framer" },
                 { t: "Backend", d: "Rust + Node Turbo" },
                 { t: "AI Core", d: "PyTorch + Gemini 3" },
                 { t: "Infra", d: "Vercel Edge + AWS" }
               ].map(item => (
                 <div key={item.t} className="p-8 bg-white/5 rounded-[2.5rem] border border-white/5 hover:bg-white/10 transition-colors">
                    <span className="text-[10px] font-black uppercase text-indigo-400 tracking-widest block mb-2">{item.t}</span>
                    <span className="text-xl font-black italic uppercase">{item.d}</span>
                 </div>
               ))}
            </div>
         </div>
      </section>

      {/* 4. NEW SECTION: FAQ */}
      <section className="py-40 px-6 md:px-20 max-w-5xl mx-auto">
         <h2 className="text-center text-5xl font-black italic uppercase mb-20">Protocol FAQ</h2>
         <div className="space-y-4">
            {[
              { q: "Is it really 100% remote?", a: "Yes. From Tokyo to New York, we work where we want." },
              { q: "What is the Vox-Screening?", a: "Our own AI agent will talk to you for 10 minutes to assess technical depth." },
              { q: "Do you offer equity?", a: "Every employee is an owner. Period." }
            ].map((faq, i) => (
              <details key={i} className="group p-8 rounded-[2rem] bg-white/5 border border-white/5 cursor-pointer">
                 <summary className="flex items-center justify-between font-black uppercase italic tracking-widest text-sm list-none">
                    {faq.q} <ChevronDown className="group-open:rotate-180 transition-transform" />
                 </summary>
                 <p className="mt-6 text-slate-500 italic font-medium">{faq.a}</p>
              </details>
            ))}
         </div>
      </section>

      <AnimatePresence>
        {selectedJob && <ApplicationPortal job={selectedJob} onClose={() => setSelectedJob(null)} />}
      </AnimatePresence>

      <footer className="py-20 text-center opacity-10 font-black italic uppercase tracking-[1em] text-[10px]">
        SHAKIB ALAM // MISSION_CONTROL // 2026
      </footer>
    </div>
  );
}