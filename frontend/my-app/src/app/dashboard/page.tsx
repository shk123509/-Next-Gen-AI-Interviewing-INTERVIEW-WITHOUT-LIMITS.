"use client";
import React from 'react';
import { 
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, 
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import { 
  Clock, TrendingUp, Play, Target, Brain, Activity, Star, AlertCircle, Search,
  LucideIcon
} from 'lucide-react';

// --- Types & Interfaces ---
interface StatCardProps {
  icon: LucideIcon;
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
    <div className="min-h-screen bg-[#020617] text-white pt-20 md:pt-28 pb-12 px-4 md:px-8 antialiased">
      <div className="max-w-[1600px] mx-auto space-y-6 md:space-y-10">
        
        {/* --- Top Banner --- */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6">
          <div className="w-full">
            <h1 className="text-4xl md:text-6xl font-black tracking-tighter bg-gradient-to-r from-white to-slate-500 bg-clip-text text-transparent italic">
              COMMAND CENTER
            </h1>
            <p className="text-slate-400 text-sm md:text-base font-medium mt-2 flex items-center gap-2">
              <Activity className="text-green-500 animate-pulse shrink-0" size={18} />
              <span className="truncate">AI Readiness: 89% based on last 14 sessions</span>
            </p>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center gap-4 w-full lg:w-auto">
            <div className="relative w-full sm:w-72 lg:w-80">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
              <input 
                type="text" 
                placeholder="Search..." 
                className="w-full bg-[#0f172a] border border-white/5 rounded-2xl py-3 pl-11 pr-4 text-sm outline-none focus:border-indigo-500 transition-all text-white" 
              />
            </div>
            <button className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-500 text-white px-8 py-3.5 rounded-2xl font-black flex items-center justify-center gap-2 transition-all shadow-[0_0_30px_rgba(79,70,229,0.3)] active:scale-95">
              <Play size={18} fill="currentColor" /> <span className="tracking-widest text-xs">NEW MOCK</span>
            </button>
          </div>
        </div>

        {/* --- Stats Row --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
          <StatCard icon={Brain} label="IQ Index" value="142" sub="+4.2%" color="blue" />
          <StatCard icon={Target} label="Accuracy" value="94.2%" sub="High" color="green" />
          <StatCard icon={Star} label="Best Score" value="9.8" sub="/10" color="yellow" />
          <StatCard icon={Clock} label="Time Spent" value="128h" sub="Total" color="purple" />
        </div>

        {/* --- Main Grid (Chart & Radar) --- */}
        <div className="grid grid-cols-1 xl:grid-cols-12 gap-6 md:gap-8">
          <div className="xl:col-span-8 bg-[#0f172a] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-8 shadow-2xl overflow-hidden">
             <div className="flex justify-between items-center mb-6 md:mb-10">
              <h3 className="text-xl md:text-2xl font-bold tracking-tight">AI Progress Metric</h3>
            </div>
            <div className="h-[250px] md:h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={performanceData}>
                  <defs>
                    <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.3}/>
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
                  <XAxis dataKey="name" stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <YAxis stroke="#475569" fontSize={10} tickLine={false} axisLine={false} />
                  <Tooltip 
                    contentStyle={{backgroundColor: '#020617', borderRadius: '12px', border: '1px solid #1e293b', fontSize: '12px'}} 
                  />
                  <Area type="monotone" dataKey="score" stroke="#6366f1" strokeWidth={3} fill="url(#colorScore)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="xl:col-span-4 flex flex-col gap-6 md:gap-8">
            <div className="bg-gradient-to-br from-indigo-900/20 to-slate-900 border border-indigo-500/20 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-bold mb-6 italic tracking-widest">SKILL RADAR</h3>
              <div className="space-y-5">
                <SkillProgress label="Logic" val={90} color="bg-indigo-500" />
                <SkillProgress label="Grammar" val={75} color="bg-blue-500" />
                <SkillProgress label="Tone" val={85} color="bg-emerald-500" />
                <SkillProgress label="Body Language" val={60} color="bg-orange-500" />
              </div>
            </div>
            
            <div className="bg-orange-500/10 border border-orange-500/20 rounded-[1.5rem] md:rounded-[2rem] p-5 flex gap-4">
              <AlertCircle className="text-orange-500 shrink-0" size={24} />
              <div>
                <h4 className="font-bold text-orange-400 text-sm md:text-base">Critical Insight</h4>
                <p className="text-xs md:text-sm text-slate-300 mt-1 leading-relaxed">Practice pausing instead of using "Um" or "Like" too often.</p>
              </div>
            </div>
          </div>
        </div>

        {/* --- Recent Activity & Quota --- */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
          <div className="lg:col-span-2 bg-[#0f172a] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8">
            <h3 className="text-xl font-bold mb-6">Recent Sessions</h3>
            <div className="w-full">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b border-white/5 text-slate-500 text-[10px] font-black uppercase tracking-[0.2em]">
                    <th className="pb-4">Role</th>
                    <th className="pb-4 hidden sm:table-cell">Date</th>
                    <th className="pb-4 text-right">Score</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-white/5">
                  <SessionRow role="Frontend Engineer" date="Mar 12, 2026" time="24m" score="8.5" />
                  <SessionRow role="System Design" date="Mar 08, 2026" time="30m" score="7.8" />
                  <SessionRow role="Backend Java" date="Mar 02, 2026" time="45m" score="9.2" />
                </tbody>
              </table>
            </div>
          </div>

          <div className="bg-[#0f172a] border border-white/5 rounded-[2rem] md:rounded-[2.5rem] p-8 flex flex-col items-center justify-center text-center">
            <h3 className="text-lg font-bold mb-2 tracking-widest uppercase opacity-50">Quota Usage</h3>
            <div className="h-40 w-full relative">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie data={pieData} innerRadius={50} outerRadius={70} dataKey="value" startAngle={90} endAngle={450}>
                    {pieData.map((_, index) => <Cell key={index} fill={COLORS[index % COLORS.length]} stroke="none" />)}
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <div className="absolute inset-0 flex items-center justify-center flex-col pt-2">
                 <p className="text-3xl font-black">40</p>
                 <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">/ 50 left</p>
              </div>
            </div>
            <button className="mt-4 text-indigo-400 text-xs font-black tracking-widest hover:text-white transition-colors">UPGRADE PLAN →</button>
          </div>
        </div>
      </div>
    </div>
  );
}

// --- Helper Components ---

function StatCard({ icon: Icon, label, value, sub, color }: StatCardProps) {
  const colors = {
    blue: "text-blue-500 bg-blue-500/10",
    green: "text-emerald-500 bg-emerald-500/10",
    yellow: "text-amber-500 bg-amber-500/10",
    purple: "text-indigo-500 bg-indigo-500/10",
  };
  
  return (
    <div className="bg-[#0f172a] border border-white/5 p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] hover:border-indigo-500/30 transition-all group relative overflow-hidden">
      <div className={`w-12 h-12 md:w-14 md:h-14 rounded-2xl flex items-center justify-center mb-4 md:mb-6 ${colors[color]}`}>
        <Icon size={24} className="md:size-7" />
      </div>
      <p className="text-slate-500 font-black text-[10px] uppercase tracking-widest">{label}</p>
      <div className="flex items-baseline gap-2 mt-1">
        <h4 className="text-3xl md:text-4xl font-black">{value}</h4>
        <span className="text-[10px] text-slate-500 font-bold uppercase">{sub}</span>
      </div>
    </div>
  );
}

function SkillProgress({ label, val, color }: SkillProgressProps) {
  return (
    <div className="space-y-2">
      <div className="flex justify-between text-[10px] font-black uppercase tracking-widest">
        <span className="text-slate-400 italic">{label}</span>
        <span className="text-white">{val}%</span>
      </div>
      <div className="h-1.5 bg-white/5 rounded-full overflow-hidden">
        <div className={`h-full ${color} rounded-full`} style={{ width: `${val}%` }} />
      </div>
    </div>
  );
}

function SessionRow({ role, date, score }: SessionRowProps) {
  return (
    <tr className="group hover:bg-white/[0.02] transition-colors">
      <td className="py-5 pr-2">
        <div className="font-bold text-slate-200 text-sm md:text-base">{role}</div>
        <div className="text-[10px] text-slate-500 sm:hidden mt-1 font-bold">{date}</div>
      </td>
      <td className="py-5 text-slate-500 text-xs hidden sm:table-cell font-medium">{date}</td>
      <td className="py-5 text-right">
        <span className="bg-indigo-500/10 text-indigo-400 font-black px-3 py-1.5 rounded-xl text-[10px] tracking-widest border border-indigo-500/10 group-hover:bg-indigo-500 group-hover:text-white transition-all">
          {score}
        </span>
      </td>
    </tr>
  );
}