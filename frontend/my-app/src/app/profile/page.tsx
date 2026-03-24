"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Lock, Settings, X, Save, Crown, 
  Loader2, Zap, KeyRound, Camera, ShieldCheck, 
  Activity, ArrowUpRight, Cpu, Globe, Timer, Sparkles
} from "lucide-react";

export default function ProfilePage() {
  const [userData, setUserData] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [isSyncing, setIsSyncing] = useState(false);
  const [statusMsg, setStatusMsg] = useState({ type: "", text: "" });

  const fetchProfile = async () => {
    try {
      const res = await fetch("/api/profile");
      const data = await res.json();
      if (data.success) {
        setUserData(data.user);
        setNewUsername(data.user.username);
        setNewEmail(data.user.email);
      }
    } catch (err) { console.error("Fetch Error:", err); } 
    finally { setLoading(false); }
  };

  useEffect(() => { fetchProfile(); }, []);

  const showStatus = (type: string, text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: "", text: "" }), 4000);
  };

  // --- IMAGE UPLOAD FIX ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setIsSyncing(true);
    try {
      const res = await fetch("/api/update-profile-pic", { 
        method: "POST", 
        body: formData 
      });
      const data = await res.json();
      
      if (data.success) {
        // Cache busting: naya timestamp add kiya hai taaki image turant refresh ho
        const updatedUrl = `${data.profilePic}?t=${Date.now()}`;
        setUserData((prev: any) => ({ ...prev, profilePic: updatedUrl }));
        showStatus("success", "AVATAR_SYNCED");
      } else {
        showStatus("error", data.message || "UPLOAD_FAILED");
      }
    } catch (err) { 
      showStatus("error", "NETWORK_ERROR"); 
    } finally { 
      setIsSyncing(false); 
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // --- UPDATED HANDLER: Fixed Name, Email & Password Update ---
  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);

    // Determine target based on active tab
    const endpoint = activeTab === "profile" ? "update" : "update-password";
    const method = activeTab === "profile" ? "POST" : "PUT";
    const body = activeTab === "profile" 
      ? { username: newUsername, email: newEmail } 
      : { oldPassword, newPassword };

    try {
      const res = await fetch(`/api/${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      const data = await res.json();

      if (data.success) {
        showStatus("success", "SYSTEM_UPDATED");
        
        if (activeTab === "profile") {
          // Sync local data immediately
          setUserData((prev: any) => ({ ...prev, username: newUsername, email: newEmail }));
        } else {
          // Clear password fields on success
          setOldPassword("");
          setNewPassword("");
        }
        
        // Refresh full profile to ensure backend consistency
        await fetchProfile();
        setTimeout(() => setIsModalOpen(false), 1500); // Close modal automatically after success
      } else { 
        showStatus("error", data.message || "ACCESS_DENIED"); 
      }
    } catch (err) { 
      showStatus("error", "CORE_ERROR"); 
    } finally { 
      setIsSyncing(false); 
    }
  };

  if (loading) return (
    <div className="h-screen bg-[#020617] flex flex-col items-center justify-center space-y-6">
      <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 1, ease: "linear" }}>
         <Loader2 className="text-indigo-500" size={40} />
      </motion.div>
      <p className="text-[10px] font-black tracking-[0.6em] text-indigo-400 uppercase italic">Neural Link Syncing...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-24 md:pt-44 pb-20 px-4 md:px-10 overflow-x-hidden antialiased">
      
      {/* --- STATUS TOAST (Visible during updates) --- */}
      <AnimatePresence>
        {statusMsg.text && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }}
            animate={{ y: 20, opacity: 1 }}
            exit={{ y: -100, opacity: 0 }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-[2000] px-6 py-3 rounded-full font-black text-[10px] tracking-widest uppercase shadow-2xl backdrop-blur-md border ${
              statusMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'
            }`}
          >
            {statusMsg.text}
          </motion.div>
        )}
      </AnimatePresence>

      {/* Background Decor */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      <div className="max-w-6xl mx-auto">
        {/* --- HERO CARD --- */}
        <motion.div initial={{ opacity: 0, scale: 0.98 }} animate={{ opacity: 1, scale: 1 }} className="relative rounded-[2.5rem] md:rounded-[4rem] p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent overflow-hidden">
          <div className="bg-[#0b1224]/80 backdrop-blur-3xl rounded-[2.4rem] md:rounded-[3.9rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-10 md:gap-16 relative">
            
            <div className="relative shrink-0 group">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative z-10 w-40 h-40 md:w-64 md:h-64 rounded-full p-1.5 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 cursor-pointer overflow-hidden shadow-2xl"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden relative">
                   {isSyncing && (
                    <div className="absolute inset-0 bg-black/70 z-20 flex items-center justify-center">
                      <Loader2 className="text-white animate-spin" size={32} />
                    </div>
                  )}
                  <motion.img 
                    key={userData?.profilePic}
                    src={userData?.profilePic || `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${userData?.username}`} 
                    className="w-full h-full object-cover group-hover:brightness-50 transition-all duration-500"
                    alt="profile"
                  />
                </div>
              </motion.div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-indigo-400 font-black text-[9px] md:text-[10px] tracking-[0.4em] uppercase bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 mb-6">
                Active Node
              </div>
              <h1 className="text-4xl sm:text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white leading-[1.1] mb-4 break-words">
                {userData?.username}
              </h1>
              <p className="text-slate-500 font-bold text-sm md:text-xl italic opacity-70">
                {userData?.email}
              </p>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="absolute top-6 right-6 md:static w-12 h-12 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all group"
            >
              <Settings size={22} className="group-hover:rotate-180 transition-transform duration-1000" />
            </button>
          </div>
        </motion.div>

        {/* --- STATS SECTION --- */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mt-10">
           <BentoStat icon={<Activity />} label="Health" value="Stable" delay={0.1} color="text-emerald-400" />
           <BentoStat icon={<Timer />} label="Up-Time" value="99.9%" delay={0.2} color="text-indigo-400" />
           <BentoStat icon={<ShieldCheck />} label="Security" value="Lvl 4" delay={0.3} color="text-purple-400" />
           <BentoStat icon={<Cpu />} label="Compute" value="Peak" delay={0.4} color="text-pink-400" />
        </div>
      </div>

      {/* --- SETTINGS MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/80 backdrop-blur-xl" />
            
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="relative w-full max-w-xl bg-[#0b1224] border-t md:border border-white/10 rounded-t-[3rem] md:rounded-[3rem] p-8 md:p-12 shadow-2xl overflow-hidden"
            >
              <div className="flex justify-between items-center mb-10">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase text-white">Settings</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 rounded-2xl hover:text-red-500 transition-all"><X size={20}/></button>
              </div>

              <div className="flex bg-black/40 rounded-2xl p-1.5 border border-white/5 mb-8">
                <button onClick={() => setActiveTab("profile")} className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Identity</button>
                <button onClick={() => setActiveTab("password")} className={`flex-1 py-4 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'password' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Security</button>
              </div>

              <form className="space-y-6" onSubmit={handleUpdate}>
                {activeTab === "profile" ? (
                  <>
                    <InputBox label="Alias" icon={<User size={18}/>} value={newUsername} onChange={setNewUsername} />
                    <InputBox label="Neural Link" icon={<Mail size={18}/>} value={newEmail} onChange={setNewEmail} />
                  </>
                ) : (
                  <>
                    <InputBox label="Current Key" type="password" icon={<Lock size={18}/>} value={oldPassword} onChange={setOldPassword} />
                    <InputBox label="New Key" type="password" icon={<KeyRound size={18}/>} value={newPassword} onChange={setNewPassword} />
                  </>
                )}
                
                <button 
                  type="submit"
                  disabled={isSyncing} 
                  className="w-full bg-white text-black py-6 rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
                >
                  {isSyncing ? <Loader2 className="animate-spin" size={18}/> : <Save size={18}/>} Sync Update
                </button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function BentoStat({ icon, label, value, delay, color }: any) {
  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }} className="bg-[#0b1224]/50 border border-white/5 backdrop-blur-2xl rounded-[2.5rem] p-8 h-[160px] flex flex-col justify-between group">
       <div className={`w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center ${color} group-hover:bg-indigo-600 transition-all`}>
         {icon}
       </div>
       <div>
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</p>
          <h4 className="text-2xl font-black italic text-white mt-1 uppercase">{value}</h4>
       </div>
    </motion.div>
  );
}

function InputBox({ label, icon, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-slate-500 tracking-[0.3em] ml-4">{label}</label>
      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
          {icon}
        </div>
        <input 
          type={type} value={value} onChange={(e) => onChange(e.target.value)}
          required
          className="w-full bg-black/40 border border-white/5 rounded-2xl px-8 py-5 pl-16 outline-none focus:border-indigo-500/50 font-bold transition-all text-sm text-white"
        />
      </div>
    </div>
  );
}