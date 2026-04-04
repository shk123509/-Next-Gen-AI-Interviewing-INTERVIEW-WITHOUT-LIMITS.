"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer 
} from "recharts";
import { 
  LayoutDashboard, Code2, Brain, MessageSquare, 
  Target, Activity, ChevronRight, Zap, Bell, User, LogOut, ShieldCheck
} from "lucide-react";

export default function UltimateDashboard() {
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  // Fetch Data from your API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("/api/dashboard");
        const json = await res.json();
        if (json.success) setData(json.data);
      } catch (err) {
        console.error("Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (loading) return (
    <div className="h-screen bg-[#050505] flex flex-col items-center justify-center gap-4">
      <div className="w-16 h-16 border-4 border-blue-600/20 border-t-blue-600 rounded-full animate-spin" />
      <p className="text-blue-500 font-mono text-xs tracking-[0.4em] uppercase animate-pulse">Initializing Nexus AI</p>
    </div>
  );

  const { latestScores, stats, counts, history } = data;

  // Real Graph Data from API
  const chartData = history?.coding?.length > 0 
    ? history.coding.map((val: number, i: number) => ({ name: `T${i+1}`, score: val }))
    : [];

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-blue-500/30">
      
      {/* 🚀 1. FLOATING NAVBAR (NO OVERLAP) */}
      <nav className="fixed top-0 left-0 right-0 z-[100] px-4 py-4 md:px-10">
        <div className="max-w-7xl mx-auto bg-black/40 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] px-6 py-3 flex justify-between items-center shadow-2xl">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-600 rounded-2xl shadow-[0_0_15px_rgba(37,99,235,0.5)]">
              <ShieldCheck size={22} className="text-white" />
            </div>
            <span className="font-black text-xl tracking-tighter uppercase italic hidden sm:block">
              Nexus<span className="text-blue-500">Dash</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 font-mono text-[10px] font-bold uppercase tracking-[0.2em] text-gray-500">
            <a href="#" className="text-blue-400">Overview</a>
            <a href="#" className="hover:text-white transition-colors">Labs</a>
            <a href="#" className="hover:text-white transition-colors">Records</a>
          </div>

          <div className="flex items-center gap-2 md:gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2.5 w-1.5 h-1.5 bg-blue-500 rounded-full" />
            </button>
            <div className="h-6 w-[1px] bg-white/10 mx-1" />
            <button className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 px-4 py-2 rounded-2xl transition-all">
              <User size={16} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase hidden sm:block tracking-widest">Profile</span>
            </button>
          </div>
        </div>
      </nav>

      {/* 🛠️ 2. MAIN CONTENT (With Correct Padding to avoid Navbar Overlap) */}
      <main className="pt-28 md:pt-36 pb-20 px-4 md:px-10 max-w-7xl mx-auto space-y-10">
        
        {/* --- WELCOME & LEVEL HERO --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter uppercase leading-none">
              Operational <br /> <span className="text-blue-600">Intelligence</span>
            </h1>
            <p className="text-gray-500 mt-4 font-mono text-xs tracking-widest flex items-center gap-2">
              <Zap size={14} className="text-yellow-500" /> SYSTEM STATUS: ACTIVE / SECURE
            </p>
          </motion.div>

          <motion.div 
            whileHover={{ scale: 1.02 }}
            className="w-full lg:w-auto bg-gradient-to-br from-blue-600 to-indigo-800 p-8 rounded-[3rem] shadow-[0_20px_50px_rgba(37,99,235,0.2)] flex items-center gap-8 relative overflow-hidden"
          >
            <div className="z-10">
              <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1 opacity-70">Current Skill Tier</p>
              <h2 className="text-4xl font-black italic tracking-tighter">{stats.level}</h2>
            </div>
            <div className="h-12 w-[1px] bg-white/20 z-10" />
            <div className="z-10 text-center">
               <p className="text-[10px] font-bold text-blue-200 uppercase tracking-widest mb-1 opacity-70">Aggregate</p>
               <h2 className="text-4xl font-black italic tracking-tighter">{stats.percentage}%</h2>
            </div>
            <div className="absolute -right-4 -top-4 w-24 h-24 bg-white/10 rounded-full blur-2xl" />
          </motion.div>
        </div>

        {/* --- SCORE CARDS GRID --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <StatBox icon={<Code2 className="text-blue-400" />} label="Coding Proficiency" val={latestScores.coding} count={counts.codingTests} />
          <StatBox icon={<Brain className="text-purple-400" />} label="Logical Aptitude" val={latestScores.aptitude} count={counts.aptiTests} />
          <div className="sm:col-span-2 lg:col-span-1">
            <StatBox icon={<MessageSquare className="text-emerald-400" />} label="Verbal Communication" val={latestScores.communication} count={counts.commTests} />
          </div>
        </div>

        {/* --- ANALYTICS SECTION --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Chart Area */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            className="lg:col-span-2 bg-[#0a0a0a] border border-white/5 p-6 md:p-10 rounded-[3rem] shadow-inner"
          >
            <div className="flex justify-between items-center mb-10">
              <h3 className="text-xs font-black uppercase tracking-[0.3em] text-gray-500 flex items-center gap-3">
                <Activity size={18} className="text-blue-500" /> Neural Growth History
              </h3>
              <div className="px-3 py-1 bg-white/5 rounded-full text-[9px] font-bold text-blue-400 border border-white/10">LIVE DATA</div>
            </div>

            <div className="h-[300px] w-full">
              {chartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="blueGrad" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#2563eb" stopOpacity={0.3}/>
                        <stop offset="95%" stopColor="#2563eb" stopOpacity={0}/>
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="name" stroke="#333" fontSize={10} tickLine={false} axisLine={false} />
                    <YAxis hide domain={[0, 35]} />
                    <Tooltip contentStyle={{ background: '#000', border: '1px solid #222', borderRadius: '15px', color: '#fff' }} />
                    <Area type="monotone" dataKey="score" stroke="#2563eb" strokeWidth={4} fill="url(#blueGrad)" dot={{ fill: '#2563eb', r: 4 }} activeDot={{ r: 8, stroke: '#fff' }} />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <div className="h-full flex flex-col items-center justify-center text-gray-700 gap-4 border-2 border-dashed border-white/5 rounded-[2rem]">
                  <Target size={48} className="opacity-20" />
                  <p className="text-[10px] font-bold uppercase tracking-widest">Awaiting First Test Assessment</p>
                </div>
              )}
            </div>
          </motion.div>

          {/* Right Sidebar Action */}
          <div className="space-y-6">
            <div className="bg-[#0a0a0a] border border-white/5 p-10 rounded-[3rem] text-center flex flex-col items-center justify-center min-h-[300px]">
                <div className="relative mb-6">
                  <svg className="w-40 h-40 transform -rotate-90">
                    <circle cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="6" fill="transparent" className="text-white/5" />
                    <motion.circle 
                      cx="80" cy="80" r="72" stroke="currentColor" strokeWidth="7" fill="transparent" 
                      strokeDasharray={452}
                      initial={{ strokeDashoffset: 452 }}
                      animate={{ strokeDashoffset: 452 - (452 * stats.percentage) / 100 }}
                      transition={{ duration: 2, ease: "easeOut" }}
                      className="text-blue-600 drop-shadow-[0_0_10px_rgba(37,99,235,0.5)]" 
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black italic tracking-tighter">{stats.percentage}%</span>
                    <span className="text-[9px] font-bold text-gray-600 uppercase tracking-widest mt-1">Efficiency</span>
                  </div>
                </div>
                <button className="w-full py-5 bg-white text-black font-black rounded-[1.5rem] flex items-center justify-center gap-3 hover:bg-blue-600 hover:text-white transition-all transform active:scale-95 text-xs tracking-widest shadow-xl">
                  NEW CHALLENGE <ChevronRight size={18} />
                </button>
            </div>
          </div>

        </div>
      </main>

      {/* 📱 MOBILE NAVIGATION BAR (Bottom Sticky for better UX) */}
      <div className="md:hidden fixed bottom-6 left-4 right-4 z-[100] bg-black/80 backdrop-blur-2xl border border-white/10 rounded-3xl p-4 flex justify-around shadow-2xl">
         <LayoutDashboard className="text-blue-500" size={24} />
         <Target className="text-gray-500" size={24} />
         <User className="text-gray-500" size={24} />
         <LogOut className="text-red-900" size={24} />
      </div>
    </div>
  );
}

/* --- REUSABLE COMPONENTS --- */

function StatBox({ icon, label, val, count }: any) {
  return (
    <motion.div 
      whileHover={{ y: -8, backgroundColor: "rgba(255,255,255,0.04)" }}
      className="bg-[#0a0a0a] border border-white/5 p-8 rounded-[2.5rem] transition-all group relative overflow-hidden"
    >
      <div className="flex justify-between items-start mb-6">
        <div className="p-4 bg-white/[0.03] rounded-2xl group-hover:scale-110 transition-transform duration-500">{icon}</div>
        <div className="flex flex-col items-end">
          <span className="text-[9px] font-black text-gray-600 uppercase tracking-widest">Tests Logged</span>
          <span className="text-lg font-mono font-bold text-white/40">{count}</span>
        </div>
      </div>
      <p className="text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-2">{label}</p>
      <div className="flex items-baseline gap-2">
        <span className="text-5xl font-black italic tracking-tighter group-hover:text-blue-500 transition-colors">{val}</span>
        <span className="text-xs font-bold text-gray-700 uppercase">/ 30</span>
      </div>
      {/* Decorative Gradient */}
      <div className="absolute -right-8 -bottom-8 w-24 h-24 bg-blue-600/5 rounded-full blur-2xl group-hover:bg-blue-600/10 transition-colors" />
    </motion.div>
  );
}