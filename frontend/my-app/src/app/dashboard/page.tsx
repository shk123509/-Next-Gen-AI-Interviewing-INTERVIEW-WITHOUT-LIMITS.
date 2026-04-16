"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, Variants } from "framer-motion";
import { 
  Code2, Brain, MessageSquare, Target, Activity, Cpu, Loader2, ShieldCheck, Radar, Layers, Sparkles, Terminal
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

// --- FIXED ANIMATION VARIANTS (TYPE ERROR RESOLVED) ---
const containerVar: Variants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1, transition: { staggerChildren: 0.15 } }
};

const itemVar: Variants = {
  hidden: { y: 30, opacity: 0, scale: 0.95 },
  visible: { 
    y: 0, 
    opacity: 1, 
    scale: 1, 
    transition: { 
      type: "spring", 
      stiffness: 100, 
      damping: 12 
    } 
  }
};

const responseContainerVar: Variants = {
  hidden: { opacity: 0, y: 20 },
  visible: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.6, staggerChildren: 0.08 } 
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
      finally { setTimeout(() => setLoading(false), 1000); }
    };
    fetchData();
  }, []);

  const handleAnalyzeJob = async () => {
    if (!jobRole.trim() || isAnalyzing) return;
    setIsAnalyzing(true);
    setAnalysis(""); 
    const apiKey = localStorage.getItem("geminiApiKey") || "";
    try {
      const response = await fetch("https://tool-call-1.onrender.com/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ 
          message: `Analyze the job role: "${jobRole}". Provide a detailed roadmap, essential skills, and salary expectations in a structured way.`, 
          api_key: apiKey 
        }),
      });
      const result = await response.json();
      const text = Array.isArray(result.reply) ? result.reply[0].text : result.reply;
      setAnalysis(text);
    } catch (error) { setAnalysis("❌ Critical Error: Neural Link Failed."); } 
    finally { setIsAnalyzing(false); }
  };

  const runPlacementPrediction = () => {
    if (!data?.latestScores) return;
    setIsPredicting(true);
    setPredictionResult(null);
    setTimeout(() => {
      const { coding, aptitude, communication } = data.latestScores;
      const avg = ((coding * 0.5) + (aptitude * 0.3) + (communication * 0.2)) / 30 * 100;
      let status = "Low", color = "text-red-500", suggestion = "Focus on DSA.";
      if (avg > 75) { status = "Tier-1 Ready"; color = "text-emerald-400"; suggestion = "Ready for top product companies."; }
      else if (avg > 60) { status = "Moderate"; color = "text-blue-400"; suggestion = "Improve communication."; }
      setPredictionResult({ status, percentage: avg.toFixed(1), color, suggestion });
      setIsPredicting(false);
    }, 2500);
  };

  if (loading || !data) return (
    <div className="h-screen bg-[#020202] flex items-center justify-center">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2 }} className="w-12 h-12 border-t-2 border-blue-500 rounded-full" />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans pb-32 pt-28 overflow-x-hidden relative">
      <motion.main variants={containerVar} initial="hidden" animate="visible" className="max-w-7xl mx-auto px-6 space-y-20 relative z-10">
        
        {/* --- HEADER --- */}
        <motion.header variants={itemVar} className="flex flex-col lg:flex-row justify-between items-end gap-8 border-b border-white/5 pb-12">
          <div className="space-y-4">
             <div className="flex items-center gap-3">
                <span className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                <p className="text-[10px] text-blue-400 font-black uppercase tracking-[0.4em]">Operational Terminal v4.0</p>
             </div>
             <h1 className="text-7xl md:text-8xl font-black uppercase italic tracking-tighter leading-tight">Nexus<span className="text-blue-600">.Core</span></h1>
          </div>
          <div className="flex gap-6">
            <div className="px-10 py-7 rounded-[2.5rem] border border-white/5 bg-[#0a0a0a]"><h2 className="text-3xl font-black italic">{data.stats.level}</h2></div>
            <div className="px-10 py-7 rounded-[2.5rem] bg-blue-600"><h2 className="text-3xl font-black italic">{data.stats.percentage}%</h2></div>
          </div>
        </motion.header>

        {/* --- STAT CARDS --- */}
        <section className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <StatBox icon={<Code2/>} label="Coding" val={data.latestScores.coding} color="blue" />
          <StatBox icon={<Brain/>} label="Logic" val={data.latestScores.aptitude} color="purple" />
          <StatBox icon={<MessageSquare/>} label="Verbal" val={data.latestScores.communication} color="emerald" />
        </section>

        {/* --- PREDICTOR --- */}
        <motion.section variants={itemVar} className="space-y-8">
           <h3 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-4"><Cpu className="text-blue-500"/> Placement Engine</h3>
           <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
              <div className="bg-[#0a0a0a] border border-blue-500/10 rounded-[3rem] p-12 flex flex-col items-center gap-10 relative">
                <button onClick={runPlacementPrediction} disabled={isPredicting} className="w-full py-7 bg-white text-black font-black uppercase text-[12px] tracking-[0.4em] rounded-2xl active:scale-95 disabled:opacity-50">
                  {isPredicting ? "SYCHRONIZING..." : "EXECUTE PREDICTION"}
                </button>
              </div>
              <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-12 flex flex-col items-center justify-center min-h-[400px]">
                <AnimatePresence mode="wait">
                  {predictionResult && !isPredicting && (
                    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center space-y-8">
                      <div className={`text-9xl font-black italic tracking-tighter ${predictionResult.color}`}>{predictionResult.percentage}%</div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
           </div>
        </motion.section>

        {/* --- MARKET INTELLIGENCE (JOB UI) --- */}
        <motion.section variants={itemVar} className="space-y-8 pb-20">
           <h3 className="text-3xl font-black uppercase italic tracking-tighter flex items-center gap-4"><Terminal className="text-indigo-500"/> Market Intelligence</h3>
           <div className="bg-[#0a0a0a] border border-white/5 rounded-[3rem] p-10 md:p-14 shadow-2xl relative overflow-hidden">
              <div className="relative flex items-center max-w-3xl mx-auto mb-10">
                <input type="text" value={jobRole} onChange={(e)=>setJobRole(e.target.value)} placeholder="Target job role..." className="w-full bg-black/80 border border-white/10 rounded-[2rem] py-8 pl-10 pr-40 outline-none text-xl transition-all" />
                <button onClick={handleAnalyzeJob} className="absolute right-3 bg-indigo-600 px-10 py-5 rounded-[1.5rem] font-black text-[11px] uppercase">{isAnalyzing ? <Loader2 size={18} className="animate-spin"/> : "Execute"}</button>
              </div>
              <AnimatePresence mode="wait">
                {analysis && (
                  <motion.div variants={responseContainerVar} initial="hidden" animate="visible" className="bg-white/[0.02] border border-white/5 rounded-[2.5rem] p-8 md:p-12">
                    <div className="prose prose-invert max-w-none prose-headings:text-indigo-400 prose-headings:font-black prose-li:marker:text-indigo-500">
                      <ReactMarkdown remarkPlugins={[remarkGfm]}>{analysis}</ReactMarkdown>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
           </div>
        </motion.section>
      </motion.main>
    </div>
  );
}

function StatBox({ icon, label, val, color }: any) {
  const styles: any = { blue: "text-blue-500", purple: "text-purple-500", emerald: "text-emerald-500" };
  return (
    <motion.div variants={itemVar} className={`p-12 rounded-[3.5rem] border border-white/5 bg-[#0a0a0a] relative group`}>
      <div className={`p-6 rounded-2xl bg-white/[0.03] mb-12 ${styles[color]}`}>{icon}</div>
      <p className="text-[11px] font-bold text-gray-500 uppercase tracking-widest">{label}</p>
      <div className="text-8xl font-black italic text-white tracking-tighter leading-none">{val}</div>
    </motion.div>
  );
}