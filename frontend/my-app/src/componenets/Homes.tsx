"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Code2, Brain, MessageSquare, Cpu, Loader2, Radar, Terminal, Activity, Zap, Shield
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export default function HyperAnimatedDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [jobRole, setJobRole] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  useEffect(() => {
    // Simulated Data fetch
    setTimeout(() => {
      setData({
        latestScores: { coding: 26, aptitude: 24, communication: 28 },
        stats: { level: "ELITE", percentage: 92 }
      });
      setLoading(false);
    }, 2000);
  }, []);

  if (loading) return (
    <div className="h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          rotate: [0, 180, 360],
          borderRadius: ["20%", "50%", "20%"]
        }}
        transition={{ duration: 2, repeat: Infinity }}
        className="w-20 h-20 border-2 border-blue-500 shadow-[0_0_50px_#3b82f6]"
      />
      <motion.p 
        animate={{ opacity: [0, 1, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
        className="mt-10 text-blue-500 font-mono tracking-[1em] text-xs"
      >
        BOOTING_SYSTEM...
      </motion.p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020202] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      
      {/* 🌌 Cyber Background */}
      <div className="fixed inset-0 z-0">
        <motion.div 
          animate={{ x: [-20, 20, -20], y: [-20, 20, -20] }}
          transition={{ duration: 10, repeat: Infinity }}
          className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full"
        />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay"></div>
      </div>

      <motion.main 
        initial={{ opacity: 0 }} 
        animate={{ opacity: 1 }}
        className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10"
      >
        {/* --- HEADER --- */}
        <motion.header 
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="flex flex-col md:flex-row justify-between items-end border-b border-white/5 pb-12 mb-20"
        >
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="w-2 h-2 bg-blue-500 rounded-full animate-ping" />
              <p className="text-[10px] font-mono tracking-[0.4em] text-blue-400">SESSION: ACTIVE_ROOT</p>
            </div>
            <h1 className="text-7xl md:text-9xl font-black italic tracking-tighter uppercase leading-none">
              NEXUS<span className="text-blue-600">.OS</span>
            </h1>
          </div>
          <div className="flex gap-4 mt-8 md:mt-0">
            <StatSmall label="CORE_RANK" val={data.stats.level} />
            <StatSmall label="SYSTEM_SYN" val={`${data.stats.percentage}%`} highlight />
          </div>
        </motion.header>

        {/* --- SCORE GRID --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-24">
          <ScoreCard icon={<Code2/>} label="CODING" val={data.latestScores.coding} color="blue" delay={0.1} />
          <ScoreCard icon={<Brain/>} label="LOGIC" val={data.latestScores.aptitude} color="purple" delay={0.2} />
          <ScoreCard icon={<MessageSquare/>} label="VERBAL" val={data.latestScores.communication} color="emerald" delay={0.3} />
        </section>

        {/* --- JOB ANALYZER --- */}
        <motion.section 
          initial={{ y: 50, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          className="space-y-10"
        >
          <div className="flex items-center gap-4">
            <Terminal className="text-blue-500" />
            <h3 className="text-3xl font-black italic uppercase tracking-tighter">Market_Intelligence</h3>
          </div>

          <div className="bg-white/[0.02] border border-white/5 rounded-[3rem] p-8 md:p-12 backdrop-blur-3xl shadow-2xl relative overflow-hidden">
             <div className="absolute top-0 right-0 p-8 opacity-20"><Zap size={100} className="text-blue-600" /></div>
             
             <div className="relative z-10 flex flex-col lg:flex-row gap-6 items-center">
                <input 
                  type="text" 
                  value={jobRole}
                  onChange={(e) => setJobRole(e.target.value)}
                  placeholder="INPUT TARGET_ROLE (e.g. SDE-1)"
                  className="w-full bg-black/50 border border-white/10 rounded-2xl py-6 px-8 text-xl outline-none focus:border-blue-500/50 transition-all font-mono"
                />
                <motion.button 
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-full lg:w-auto bg-blue-600 hover:bg-white hover:text-black text-white px-12 py-6 rounded-2xl font-black uppercase tracking-widest transition-colors flex items-center justify-center gap-3"
                >
                  {isAnalyzing ? <Loader2 className="animate-spin" /> : "EXECUTE"}
                </motion.button>
             </div>

             {/* Response Area */}
             <AnimatePresence>
               {analysis && (
                 <motion.div 
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    className="mt-12 pt-12 border-t border-white/5 prose prose-invert max-w-none"
                 >
                    <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysis}</ReactMarkdown>
                 </motion.div>
               )}
             </AnimatePresence>
          </div>
        </motion.section>
      </motion.main>

      <style jsx global>{`
        .prose h1, .prose h2, .prose h3 { color: #3b82f6; text-transform: uppercase; font-style: italic; font-weight: 900; }
        .prose p { color: #a1a1aa; font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace; }
        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-thumb { background: #3b82f6; border-radius: 10px; }
      `}</style>
    </div>
  );
}

// --- HELPER COMPONENTS ---

function ScoreCard({ icon, label, val, color, delay }: any) {
  const colors: any = {
    blue: "border-blue-500/20 text-blue-500 shadow-blue-500/5",
    purple: "border-purple-500/20 text-purple-500 shadow-purple-500/5",
    emerald: "border-emerald-500/20 text-emerald-500 shadow-emerald-500/5",
  };

  return (
    <motion.div 
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ delay, type: "spring", stiffness: 100 }}
      whileHover={{ y: -10, borderColor: "rgba(255,255,255,0.2)" }}
      className={`bg-white/[0.02] border p-10 rounded-[3rem] relative overflow-hidden group transition-all duration-500 ${colors[color]}`}
    >
      <div className="absolute -right-4 -top-4 opacity-[0.05] group-hover:opacity-10 transition-opacity">
        {React.cloneElement(icon, { size: 150 })}
      </div>
      
      <div className="relative z-10">
        <div className="mb-10 p-4 bg-white/5 w-fit rounded-2xl">{icon}</div>
        <p className="text-[10px] font-black tracking-[0.4em] text-gray-500 mb-2">{label}_DATA</p>
        <div className="flex items-baseline gap-2">
          <span className="text-8xl font-black italic tracking-tighter text-white">{val}</span>
          <span className="text-sm font-bold opacity-20">/30</span>
        </div>
      </div>
    </motion.div>
  );
}

function StatSmall({ label, val, highlight = false }: any) {
  return (
    <div className={`px-8 py-5 rounded-2xl border ${highlight ? 'bg-blue-600 border-transparent shadow-[0_0_30px_#3b82f644]' : 'bg-white/5 border-white/10'}`}>
      <p className={`text-[8px] font-black tracking-widest mb-1 ${highlight ? 'text-white/60' : 'text-blue-500'}`}>{label}</p>
      <h4 className="text-2xl font-black italic">{val}</h4>
    </div>
  );
}