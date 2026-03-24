"use client";
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Clock, TrendingUp, Play, Target, Brain, Activity, Star, AlertCircle, Search,
  LucideIcon // Isse import karna zaroori hai
} from 'lucide-react';

// --- Types & Interfaces ---
interface StatCardProps {
  icon: LucideIcon; // Icon component itself
  label: string;
  value: string;
  sub: string;
  color: 'blue' | 'green' | 'yellow' | 'purple';
}

interface SkillProgressProps {
  label: string;
  val: number;
  color: string;
}

interface SessionRowProps {
  role: string;
  date: string;
  time: string;
  score: string;
}

const performanceData = [
  { name: 'Mon', score: 65, avg: 60 }, { name: 'Tue', score: 72, avg: 62 },
  { name: 'Wed', score: 85, avg: 65 }, { name: 'Thu', score: 78, avg: 68 },
  { name: 'Fri', score: 92, avg: 70 }, { name: 'Sat', score: 88, avg: 72 },
  { name: 'Sun', score: 95, avg: 75 },
];

const pieData = [
  { name: 'Completed', value: 400 }, { name: 'Pending', value: 100 },
];
const COLORS = ['#6366f1', '#1e293b'];

export default function Dashboard() {
  return (
    <div className="min-h-screen bg-[#020617] text-white pt-24 pb-12 px-6">
      <div className="max-w-[1600px] mx-auto space-y-8">
        
        {/* --- Top Banner --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div>
            <h1 className="text-5xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent italic">
              COMMAND CENTER
            </h1>
            <p className="text-slate-400 font-medium mt-2 flex items-center gap-2">
              <Activity className="text-green-500 animate-pulse" size={18} />
              AI is currently analyzing your last 14 sessions. Readiness: 89%
            </p>
          </div>
          <div className="flex items-center gap-4 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
              <input type="text" placeholder="Search sessions..." className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-3 pl-12 pr-4 text-sm outline-none focus:border-indigo-500 transition-all text-white" />
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3 rounded-2xl font-black flex items-center gap-2 transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)]">
              <Play size={18} fill="currentColor" /> NEW MOCK
            </button>
          </div>
        </div>

        {/* --- Stats Row --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Note: Pass component reference, NOT <Brain /> */}
          <StatCard icon={Brain} label="IQ Index" value="142" sub="+4.2%" color="blue" />
          <StatCard icon={Target} label="Accuracy" value="94.2%" sub="High" color="green" />
          <StatCard icon={Star} label="Best Score" value="9.8" sub="/10" color="yellow" />
          <StatCard icon={Clock} label="Time Spent" value="128h" sub="Total" color="purple" />
        </div>

        {/* --- Main Grid --- */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          <div className="xl:col-span-8 bg-[#0f172a] border border-white/5 rounded-[2.5rem] p-8 shadow-2xl relative overflow-hidden">
             <div className="flex justify-between items-center mb-10">
              <h3 className="text-2xl font-bold tracking-tight">AI Progress Metric</h3>
            </div>
            <div className="h-[400px]">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={12} tickLine={false} axisLine={false} />
                  <Tooltip contentStyle={{backgroundColor: '#020617', borderRadius: '16px', border: '1px solid #1e293b'}} />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={4} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="xl:col-span-4 space-y-8">
            <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 rounded-[2.5rem] p-8">
              <h3 className="text-xl font-bold mb-6 italic">Skill Radar</h3>
              <div className="space-y-5">
                <SkillProgress label="Logic" val={90} color="bg-indigo-500" />
                <SkillProgress label="Grammar" val={75} color="bg-blue-500" />
                <SkillProgress label="Tone" val={85} color="bg-emerald-500" />
                <SkillProgress label="Body Language" val={60} color="bg-orange-500" />
              </div>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-[2.5rem] p-6 flex gap-4">
              <AlertCircle className="text-orange-500 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-orange-400">Critical Insight</h4>
                <p className="text-sm text-slate-300 mt-1">Practice pausing instead of using "Um".</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Recent Activity --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-[#0f172a] border border-white/5 rounded-[2.5rem] p-8">
            <h3 className="text-xl font-bold mb-6">Recent Sessions</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-slate-500 text-xs font-black uppercase tracking-widest">
                    <th className="pb-4">Role</th>
                    <th className="pb-4">Date</th>
                    <th className="pb-4 text-right">Score</th>
                  </tr>
                </thead>
                <tbody>
                  <SessionRow role="Frontend Engineer" date="Mar 12, 2024" time="24 mins" score="8.5" />
                  <SessionRow role="System Design" date="Mar 08, 2024" time="30 mins" score="7.8" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#0f172a] border border-white/5 rounded-[2.5rem] p-8 text-center">
            <h3 className="text-xl font-bold mb-4">Quota</h3>
            <div className="h-48">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={60} outerRadius={80} dataKey="value">
                    {pieData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
            </div>
            <p className="text-3xl font-black">40/50</p>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Fixed Helper Components ---

function StatCard({ icon: Icon, label, value, sub, color }: StatCardProps) {
  const colors = {
    blue: "text-blue-500 bg-blue-500/10",
    green: "text-emerald-500 bg-emerald-500/10",
    yellow: "text-amber-500 bg-amber-500/10",
    purple: "text-indigo-500 bg-indigo-500/10",
  };
  
  return (
    <div className="bg-[#0f172a] border border-white/5 p-8 rounded-[2rem] hover:border-white/20 transition-all shadow-xl group">
      <div className={`w-14 h-14 rounded-2xl flex items-center justify-center mb-6 ${colors[color]}`}>
        {/* Yahan direct component render ho raha hai, cloneElement ki zaroorat nahi */}
        <Icon size={28} />
      </div>
      <p className="text-slate-400 font-bold text-xs uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2 mt-2">
        <h4 className="text-4xl font-black">{value}</h4>
        <span className="text-xs text-slate-500 font-bold">{sub}</span>
      </div>
    </div>
  );
}

function SkillProgress({ label, val, color }: SkillProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-xs font-bold uppercase tracking-wider">
        <span className="text-slate-300">{label}</span>
        <span className="text-white">{val}%</span>
      </div>
      <div className="h-2 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color}`} style={{ width: `${val}%` }} />
      </div>
    </div>
  );
}

function SessionRow({ role, date, score }: SessionRowProps) {
  return (
    <tr className="border-b border-white/5 hover:bg-white/5 transition-colors">
      <td className="py-6 font-bold text-slate-200">{role}</td>
      <td className="py-6 text-slate-500">{date}</td>
      <td className="py-6 text-right">
        <span className="bg-indigo-600/20 text-indigo-400 font-black px-3 py-1.5 rounded-lg text-xs">{score}</span>
      </td>
    </tr>
  );
}