"use client";
import React, { useRef, useState, useEffect } from 'react';
import { motion, useScroll, useSpring, AnimatePresence } from 'framer-motion';
import { 
  Github, Linkedin, Mail, ArrowUpRight, 
  Cpu, Code2, Globe, Sparkles, Binary, 
  Database, Zap, Laptop, BrainCircuit, Terminal, Loader2
} from 'lucide-react';
import Link from 'next/link';

// --- COMPONENT: GLOWING SKILL ORB ---
const SkillOrb = ({ icon: Icon, label, color }: any) => (
  <motion.div 
    whileHover={{ scale: 1.1, rotate: 5 }}
    className="flex flex-col items-center gap-3 p-6 rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl hover:border-indigo-500/50 transition-all group"
  >
    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${color} shadow-lg group-hover:shadow-indigo-500/20`}>
      <Icon size={28} />
    </div>
    <span className="text-[10px] font-black tracking-[0.3em] uppercase opacity-50 group-hover:opacity-100">{label}</span>
  </motion.div>
);

export default function UltimatePortfolio() {
  const containerRef = useRef(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  // --- STATE FOR REAL-TIME DYNAMIC PROFILE DATA ---
  const [userData, setUserData] = useState<{ username: string; email: string; profilePic?: string } | null>(null);
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const { scrollYProgress } = useScroll({ target: containerRef });
  const scaleProgress = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  // --- 1. FETCH USER PROFILE DATA ON LOAD ---
  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.success && data.user) {
        // Checking local cache for instant smooth load rendering
        const cachedImg = localStorage.getItem("user_avatar");
        const finalImg = (cachedImg && cachedImg !== "undefined" && cachedImg !== "null") 
          ? cachedImg 
          : data.user.profilePic;

        setUserData({ ...data.user, profilePic: finalImg });
      }
    } catch (err) {
      console.error("Failed to load user session stats", err);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  const showStatus = (type: string, text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: "", text: "" }), 4000);
  };

  // --- 2. IMAGE COMPRESSION HANDLER ---
  const compressImage = (file: File): Promise<Blob> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (e) => {
        const img = new Image();
        img.src = e.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800; 
          const scale = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scale;
          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);
          canvas.toBlob((blob) => { if (blob) resolve(blob); }, "image/jpeg", 0.7);
        };
      };
    });
  };

  // --- 3. DYNAMIC MULTIPART PHOTO UPLOAD HANDLER ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSyncing(true);
    try {
      const compressedBlob = await compressImage(file);
      const formData = new FormData();
      formData.append("image", compressedBlob, "avatar.jpg");

      // Hits your exact standard route configuration
      const res = await fetch("/api/profile", {
        method: "POST",
        body: formData, 
      });

      const data = await res.json();
      const finalImageUrl = data.profilePic || data.user?.profilePic || data.user?.avatar;

      if (data.success && finalImageUrl) {
        localStorage.setItem("user_avatar", finalImageUrl);
        setUserData((prev) => prev ? { ...prev, profilePic: finalImageUrl } : null);
        showStatus("success", "AVATAR_UPDATED");
      } else if (data.success) {
        showStatus("success", "SYSTEM_SYNCED");
        fetchProfile();
      } else {
        throw new Error(data.message || "UPLOAD_FAILED");
      }
    } catch (err) {
      console.error("Upload process crashed:", err);
      showStatus("error", "SYNC_ERROR");
    } finally {
      setIsSyncing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#000] text-white selection:bg-indigo-500 selection:text-white font-sans overflow-x-hidden">
      
      {/* STATUS ACTION NOTIFICATION BANNER */}
      <AnimatePresence>
        {statusMsg.text && (
          <motion.div initial={{ y: -100 }} animate={{ y: 20 }} exit={{ y: -100 }} className={`fixed top-5 left-1/2 -translate-x-1/2 z-[3000] px-6 py-3 rounded-full font-black text-[10px] tracking-widest uppercase border ${statusMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'}`}>
            {statusMsg.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* 1. THE VOID BACKGROUND */}
      <div className="fixed inset-0 z-0">
        <div className="absolute top-[-20%] left-[-10%] w-[800px] h-[800px] bg-indigo-600/20 blur-[150px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-20%] right-[-10%] w-[800px] h-[800px] bg-cyan-600/10 blur-[150px] rounded-full" />
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 pointer-events-none" />
      </div>

      {/* Hidden Native Input File Receiver */}
      <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />

      {/* 3. HERO: THE LIQUID TITLE WITH DYNAMIC PROFILE AVATAR INTEGRATION */}
      <section className="relative h-screen flex flex-col justify-center px-10 md:px-20 z-10">
        <motion.div 
          initial={{ y: 100, opacity: 0 }} 
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/5 border border-white/10 rounded-full">
            <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
            <span className="text-[10px] font-black uppercase tracking-widest text-emerald-400">B.Tech AIDS // Gen-AI Engineer</span>
          </div>
          <h1 className="text-[15vw] md:text-[12vw] font-black leading-[0.75] tracking-tighter italic uppercase mb-10">
            CRAFTING <br /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-indigo-400 to-white/20">INTELLIGENCE.</span>
          </h1>
          
          <div className="flex flex-col md:flex-row gap-10 items-start md:items-center justify-between">
            <p className="max-w-xl text-slate-400 text-lg md:text-2xl font-medium italic leading-tight">
              I am <span className="text-white font-black uppercase tracking-tight">{userData?.username || "Shakib Alam"}</span>, a Full-Stack Architect and Data Scientist turning raw data into autonomous experiences.
            </p>
            
            {/* 📸 INTERACTIVE AVATAR CORE - FIXED BLACK EFFECT LOOK */}
            <motion.div 
              whileHover={{ scale: 1.05 }} 
              onClick={() => fileInputRef.current?.click()}
              className="relative group cursor-pointer flex-shrink-0"
            >
              <div className="absolute inset-0 bg-indigo-500 blur-3xl opacity-20 group-hover:opacity-50 transition-opacity rounded-full" />
              <div className="relative w-36 h-36 md:w-44 md:h-44 rounded-full border-2 border-white/20 flex items-center justify-center overflow-hidden bg-slate-900/40 backdrop-blur-md group-hover:border-indigo-500 transition-colors">
                 
                 {isSyncing && (
                   <div className="absolute inset-0 bg-black/80 z-30 flex items-center justify-center">
                     <Loader2 className="animate-spin text-indigo-400" size={24} />
                   </div>
                 )}

                 {/* Premium dynamic hover overlay label prompt */}
                 <div className="absolute inset-0 bg-indigo-950/80 opacity-0 group-hover:opacity-100 z-20 flex flex-col items-center justify-center gap-1 transition-opacity duration-300">
                    <Terminal size={18} className="text-indigo-400 animate-bounce" />
                    <span className="text-[8px] font-black tracking-widest text-white uppercase">UPDATE_PIC</span>
                 </div>

                 <img 
                    src={userData?.profilePic && userData.profilePic !== "undefined" && userData.profilePic !== "null"
                      ? userData.profilePic 
                      : `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${userData?.username || 'user'}`}
                    className="w-full h-full object-cover block opacity-100 relative z-10 transition-transform duration-500 group-hover:scale-110"
                    alt="dynamic avatar"
                    loading="eager"
                    onError={(e: any) => {
                      e.target.onerror = null;
                      e.target.src = `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${userData?.username || 'fallback'}`;
                    }}
                 />
              </div>
            </motion.div>
          </div>
        </motion.div>
      </section>

      {/* 4. THE BENTO MATRIX (Skills & Stats) */}
      <section className="py-20 px-10 md:px-20 z-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6">
          
          <div className="md:col-span-8 p-12 rounded-[3rem] bg-white/[0.03] border border-white/10 backdrop-blur-3xl overflow-hidden relative group">
            <div className="relative z-10 flex flex-col h-full justify-between">
              <div className="space-y-4">
                <h3 className="text-5xl font-black italic uppercase tracking-tighter">THE CORE STACK.</h3>
                <p className="text-slate-500 max-w-sm font-medium">From Python-based backends to React-driven frontends, I engineer the full loop.</p>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-20">
                <SkillOrb icon={Code2} label="Next.js" color="bg-indigo-500/20 text-indigo-400" />
                <SkillOrb icon={BrainCircuit} label="Gen-AI" color="bg-emerald-500/20 text-emerald-400" />
                <SkillOrb icon={Database} label="Data Sci" color="bg-amber-500/20 text-amber-400" />
                <SkillOrb icon={Binary} label="Java DSA" color="bg-rose-500/20 text-rose-400" />
              </div>
            </div>
            <div className="absolute top-0 right-0 p-12 opacity-10 group-hover:opacity-30 transition-opacity">
              <Cpu size={200} />
            </div>
          </div>

          <div className="md:col-span-4 grid grid-rows-2 gap-6">
            <Link href="#" className="p-10 rounded-[3rem] bg-indigo-600 hover:bg-indigo-500 transition-all flex flex-col justify-between group">
               <div className="flex justify-between items-start">
                  <Linkedin size={32} />
                  <ArrowUpRight className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
               </div>
               <h4 className="text-2xl font-black italic uppercase">Connect <br /> LinkedIn</h4>
            </Link>
            <div className="p-10 rounded-[3rem] bg-[#111] border border-white/5 flex flex-col justify-between hover:border-white/20 transition-all">
               <div className="flex gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/30" />
                  <div className="w-2 h-2 rounded-full bg-emerald-500/30" />
               </div>
               <div>
                  <h4 className="text-xl font-bold italic uppercase mb-1">Status</h4>
                  <p className="text-xs font-black tracking-widest text-slate-500 uppercase">Ready for Deployment</p>
               </div>
            </div>
          </div>

        </div>
      </section>

      {/* 5. PASSION IMAGE SHOWCASE */}
      <section className="py-40 px-10 md:px-20 z-10 relative">
        <div className="grid md:grid-cols-2 gap-20 items-end mb-20">
           <h2 className="text-6xl md:text-8xl font-black italic uppercase leading-[0.8] tracking-tighter">
             BEYOND THE <br /> <span className="text-indigo-500">PIXELS.</span>
           </h2>
           <p className="text-slate-400 text-xl font-medium italic">"When I'm not training models, I'm analyzing the field. Cricket is my strategy. Solving problems is my fuel."</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
           <div className="relative h-[600px] rounded-[4rem] overflow-hidden group border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=1905&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                alt="Cricket Passion"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12">
                 <h4 className="text-4xl font-black italic uppercase tracking-tighter">CRICKET & STRATEGY</h4>
                 <p className="text-indigo-400 font-bold tracking-widest text-xs uppercase mt-2">Team Dynamics // Strategic Play</p>
              </div>
           </div>
           <div className="relative h-[600px] rounded-[4rem] overflow-hidden group border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?q=80&w=2070&auto=format&fit=crop" 
                className="w-full h-full object-cover grayscale brightness-50 group-hover:grayscale-0 group-hover:scale-110 transition-all duration-1000"
                alt="Cyber Matrix Tech Impact"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
              <div className="absolute bottom-12 left-12">
                 <h4 className="text-4xl font-black italic uppercase tracking-tighter">REAL WORLD IMPACT</h4>
                 <p className="text-emerald-400 font-bold tracking-widest text-xs uppercase mt-2">Problem Solving // Mission Driven</p>
              </div>
           </div>
        </div>
      </section>

      {/* 6. GIANT SCROLLING MARQUEE */}
      <div className="py-20 border-y border-white/5 bg-white/5 backdrop-blur-3xl overflow-hidden relative z-10">
        <motion.div 
          animate={{ x: [0, -1000] }} 
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
          className="flex whitespace-nowrap gap-20 text-7xl md:text-9xl font-black italic uppercase tracking-tighter opacity-10"
        >
          <span>Full Stack Architect</span>
          <span>Data Scientist</span>
          <span>Gen-AI Researcher</span>
          <span>Java Expert</span>
        </motion.div>
      </div>

      {/* 7. CTA: THE BIG CONTACT */}
      <section className="py-40 text-center relative z-10 px-10">
        <motion.div 
          initial={{ scale: 0.8, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-[12vw] font-black italic uppercase tracking-tighter leading-none mb-10">READY TO <br /> <span className="text-indigo-600">LAUNCH?</span></h2>
          <div className="flex flex-col md:flex-row justify-center gap-6">
            <button onClick={() => window.location.href = `mailto:${userData?.email || "shakib1@gmail.com"}`} className="px-12 py-6 bg-white text-black rounded-full font-black text-xl uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all active:scale-95 shadow-2xl">
              INITIATE_CONTACT
            </button>
            <div className="flex gap-4">
              <Link href="#" className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><Github /></Link>
              <Link href="#" className="w-20 h-20 rounded-full border border-white/10 flex items-center justify-center hover:bg-white/5 transition-all"><Mail /></Link>
            </div>
          </div>
        </motion.div>
      </section>

      {/* FOOTER */}
      <footer className="py-10 border-t border-white/5 text-center text-slate-800 text-[10px] font-black tracking-[0.6em] uppercase italic">
        ARCHITECTING THE FUTURE // {userData?.username || "SHAKIB ALAM"} // EST. 2026
      </footer>

    </div>
  );
}