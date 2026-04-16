"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Code2, Brain, MessageSquare, Target, Activity, Cpu, Loader2, ShieldCheck, Radar, Terminal, Sparkles
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// --- FIXED ANIMATION VARIANTS (TYPE-SAFE) ---
const containerVar: Variants = {
  hidden: { opacity: 0 },
  visible: { 
    opacity: 1, 
    transition: { staggerChildren: 0.1, delayChildren: 0.3 } 
  }
};

const itemVar: Variants = {
  hidden: { y: 40, opacity: 0, scale: 0.9, filter: "blur(10px)" },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1, 
    filter: "blur(0px)",
    transition: { type: "spring", stiffness: 100, damping: 15 } 
  }
};

const glowVar: Variants = {
  animate: {
    scale: [1, 1.2, 1],
    opacity: [0.3, 0.6, 0.3],
    transition: { duration: 8, repeat: Infinity, ease: "easeInOut" }
  }
};

export default function UltimateDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [jobRole, setJobRole] = useState("");
  const [analysis, setAnalysis] = useState("");
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [isPredicting, setIsPredicting] = useState(false);
  const [predictionResult, setPredictionResult] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        const dummy = {
          latestScores: { coding: 24, aptitude: 22, communication: 26 },
          stats: { level: "Elite", percentage: 88 }
        };
        setData(json?.success ? json.data : dummy);
      } catch (err) { console.error(err); } 
      finally { setTimeout(() => setLoading(false), 1500); }
    };
    fetchData();
  }, []);

  const handleAnalyzeJob = async () => {
    if (!jobRole.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysis("");
    try {
      const response = await fetch("https://tool-call-1.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `Analyze: "${jobRole}". Structure: Roadmap, Skills, Salary.`, 
          api_key: localStorage.getItem("geminiApiKey") || "" 
        }),
      });
      const result = await response.json();
      setAnalysis(Array.isArray(result.reply) ? result.reply[0].text : result.reply);
    } catch (error) { setAnalysis("❌ Link Severed."); } 
    finally { setIsAnalyzing(false); }
  };

  const runPrediction = () => {
    if (!data) return;
    setIsPredicting(true);
    setPredictionResult(null);
    setTimeout(() => {
      const { coding, aptitude, communication } = data.latestScores;
      const avg = ((coding * 0.5) + (aptitude * 0.3) + (communication * 0.2)) / 30 * 100;
      setPredictionResult({ 
        percentage: avg.toFixed(1), 
        status: avg > 75 ? "Tier-1 Potential" : "Market Ready",
        color: avg > 75 ? "text-blue-500" : "text-emerald-500"
      });
      setIsPredicting(false);
    }, 2500);
  };

  if (loading) return (
    <div className="h-screen bg-[#020202] flex flex-col items-center justify-center">
      <motion.div 
        animate={{ scale: [1, 1.5, 1], rotate: 360 }} 
        transition={{ repeat: Infinity, duration: 2 }}
        className="w-16 h-16 border-t-2 border-blue-600 rounded-full shadow-[0_0_20px_#3b82f6]" 
      />
      <p className="mt-10 text-blue-500 font-black tracking-[0.5em] animate-pulse">INITIATING NEXUS.OS</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-32 pt-28 relative overflow-hidden">
      
      {/* 🌌 Animated Background Orbs */}
      <motion.div variants={glowVar} animate="animate" className="fixed -top-[10%] -left-[10%] w-[500px] h-[500px] bg-blue-600/10 blur-[120px] rounded-full -z-10" />
      <motion.div variants={glowVar} animate="animate" className="fixed -bottom-[10%] -right-[10%] w-[400px] h-[400px] bg-purple-600/10 blur-[120px] rounded-full -z-10" />

      <motion.main variants={containerVar} initial="hidden" animate="visible" className="max-w-7xl mx-auto px-6 space-y-20 relative z-10">
        
        {/* --- HEADER --- */}
        <motion.header variants={itemVar} className="flex flex-col lg:flex-row justify-between items-end gap-10 border-b border-white/5 pb-16">
          <div className="space-y-4">
            <h1 className="text-8xl font-black uppercase italic tracking-tighter leading-none">
              Nexus<span className="text-blue-600">.OS</span>
            </h1>
            <div className="flex items-center gap-2 text-blue-500/60 font-mono text-xs tracking-widest">
              <Activity size={14} className="animate-ping" /> SYSTEM STABLE // CORE_V4
            </div>
          </div>
          <div className="flex gap-4">
            <StatCardSmall label="RANK" val={data.stats.level} />
            <StatCardSmall label="EFFICIENCY" val={`${data.stats.percentage}%`} blue />
          </div>
        </motion.header>

        {/* --- MAIN STATS --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatBox icon={<Code2/>} label="CODING" val={data.latestScores.coding} color="blue" />
          <StatBox icon={<Brain/>} label="LOGIC" val={data.latestScores.aptitude} color="purple" />
          <StatBox icon={<MessageSquare/>} label="VERBAL" val={data.latestScores.communication} color="emerald" />
        </section>

        {/* --- PREDICTOR --- */}
        <motion.section variants={itemVar} className="space-y-10">
           <h3 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-4">
             <Cpu className="text-blue-500 animate-pulse"/> Placement Simulation
           </h3>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <motion.div 
                whileHover={{ y: -5, borderColor: "rgba(59,130,246,0.3)" }}
                className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-12 flex flex-col items-center gap-10 shadow-2xl transition-colors"
              >
                <div className="w-24 h-24 bg-blue-600/10 rounded-3xl flex items-center justify-center text-blue-500 border border-blue-500/20">
                   <Radar size={48} className={isPredicting ? "animate-spin" : ""} />
                </div>
                <button 
                  onClick={runPrediction} 
                  disabled={isPredicting}
                  className="w-full py-7 bg-white text-black font-black uppercase text-[12px] tracking-[0.4em] rounded-2xl hover:bg-blue-600 hover:text-white transition-all active:scale-95 disabled:opacity-50"
                >
                  {isPredicting ? "CALCULATING..." : "RUN NEURAL PREDICTION"}
                </button>
              </motion.div>

              <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-12 flex flex-col items-center justify-center min-h-[400px]">
                <AnimatePresence mode="wait">
                  {predictionResult && !isPredicting ? (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-6">
                      <div className={`text-9xl font-black italic tracking-tighter ${predictionResult.color}`}>
                        {predictionResult.percentage}%
                      </div>
                      <div className="px-8 py-2 border border-white/10 rounded-full font-black text-[10px] uppercase tracking-[0.3em]">
                        {predictionResult.status}
                      </div>
                    </motion.div>
                  ) : isPredicting ? (
                    <div className="flex flex-col items-center gap-4 opacity-50">
                      <Loader2 className="animate-spin" size={40} />
                      <p className="text-[10px] font-mono tracking-[0.5em]">ANALYZING VECTORS</p>
                    </div>
                  ) : (
                    <div className="opacity-10 font-black tracking-[0.5em] text-xs">AWAITING INPUT</div>
                  )}
                </AnimatePresence>
              </div>
           </div>
        </motion.section>

        {/* --- JOB ANALYZER --- */}
        <motion.section variants={itemVar} className="space-y-10 pb-20">
           <h3 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-4">
             <Terminal className="text-indigo-500"/> Market Decoder
           </h3>
           <div className="bg-[#0a0a0a] border border-white/5 rounded-[4rem] p-10 md:p-16 relative overflow-hidden shadow-2xl">
              <div className="relative z-10 space-y-12">
                <div className="relative flex items-center max-w-2xl mx-auto">
                  <input 
                    type="text" value={jobRole} onChange={(e)=>setJobRole(e.target.value)} 
                    placeholder="Enter Target Role..." 
                    className="w-full bg-black/50 border border-white/10 rounded-[2rem] py-8 pl-10 pr-40 outline-none focus:border-indigo-500/50 text-xl transition-all backdrop-blur-xl font-medium" 
                  />
                  <button onClick={handleAnalyzeJob} className="absolute right-4 bg-indigo-600 px-10 py-5 rounded-[1.5rem] font-black text-[10px] uppercase tracking-widest">{isAnalyzing ? <Loader2 className="animate-spin"/> : "DECODE"}</button>
                </div>
                <AnimatePresence>
                  {analysis && (
                    <motion.div 
                      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                      className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-10 md:p-14"
                    >
                      <div className="prose prose-invert max-w-none prose-headings:text-indigo-400 prose-headings:font-black prose-li:marker:text-indigo-500">
                        <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysis}</ReactMarkdown>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
           </div>
        </motion.section>
      </motion.main>
    </div>
  );
}

// --- SUB COMPONENTS ---

function StatBox({ icon, label, val, color }: any) {
  const styles: any = { 
    blue: "text-blue-500 border-blue-500/10", 
    purple: "text-purple-500 border-purple-500/10", 
    emerald: "text-emerald-500 border-emerald-500/10" 
  };
  return (
    <motion.div 
      variants={itemVar} whileHover={{ y: -10, scale: 1.02 }}
      className={`p-12 rounded-[3.5rem] border bg-[#0a0a0a] relative overflow-hidden group shadow-2xl ${styles[color]}`}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-current opacity-[0.03] blur-[60px] rounded-full" />
      <div className="p-5 rounded-2xl bg-white/[0.03] border border-white/5 w-fit mb-12 group-hover:rotate-12 transition-transform duration-500">{icon}</div>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.3em] mb-2">{label} PROFICIENCY</p>
      <div className="flex items-baseline gap-2">
        <span className="text-8xl font-black italic tracking-tighter text-white leading-none">{val}</span>
        <span className="text-xs font-black text-gray-800 uppercase tracking-tighter">/ 30</span>
      </div>
    </motion.div>
  );
}

function StatCardSmall({ label, val, blue = false }: any) {
  return (
    <div className={`px-10 py-6 rounded-[2rem] border border-white/5 ${blue ? 'bg-blue-600' : 'bg-[#0a0a0a]'}`}>
      <p className={`text-[8px] font-black uppercase mb-1 tracking-widest ${blue ? 'text-white/50' : 'text-blue-500'}`}>{label}</p>
      <h2 className="text-3xl font-black italic tracking-tighter leading-none">{val}</h2>
    </div>
  );
}