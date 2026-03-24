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
      const res = await fetch("http://localhost:3000/api/profile");
      const data = await res.json();
      if (data.success) {
        setUserData(data.user);
        setNewUsername(data.user.username);
        setNewEmail(data.user.email);
      }
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchProfile(); }, []);

  const showStatus = (type: string, text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: "", text: "" }), 4000);
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    setIsSyncing(true);
    try {
      const res = await fetch("http://localhost:3000/api/update-profile-pic", { 
        method: "POST", 
        body: formData 
      });
      const data = await res.json();
      
      if (data.success) {
        const newImageUrl = `${data.profilePic}?t=${new Date().getTime()}`;
        setUserData((prev: any) => ({ ...prev, profilePic: newImageUrl }));
        showStatus("success", "AVATAR_SYNCED");
      } else {
        showStatus("error", "UPLOAD_FAILED");
      }
    } catch (err) { 
      showStatus("error", "NETWORK_ERROR"); 
    } finally { 
      setIsSyncing(false); 
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUpdate = async (e: React.FormEvent, endpoint: string, method: string, body: object) => {
    e.preventDefault();
    setIsSyncing(true);
    try {
      const res = await fetch(`http://localhost:3000/api/${endpoint}`, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        showStatus("success", "SYSTEM_UPDATED");
        if (endpoint === "update") await fetchProfile();
        if (endpoint === "update-password") { setOldPassword(""); setNewPassword(""); }
      } else { showStatus("error", "ACCESS_DENIED"); }
    } catch (err) { showStatus("error", "CORE_ERROR"); } 
    finally { setIsSyncing(false); }
  };

  if (loading) return (
    <div className="h-screen bg-[#020617] flex flex-col items-center justify-center space-y-6">
      <div className="relative">
        <motion.div animate={{ rotate: 360 }} transition={{ repeat: Infinity, duration: 2, ease: "linear" }} className="w-20 h-20 border-t-2 border-indigo-500 rounded-full" />
        <Cpu className="absolute inset-0 m-auto text-indigo-500 animate-pulse" size={30} />
      </div>
      <p className="text-[10px] font-black tracking-[0.6em] text-indigo-400 uppercase">Loading System...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 selection:bg-indigo-500/40 relative pt-44 pb-20 px-4 sm:px-10">
      
      {/* --- BG ANIMATION --- */}
      <div className="fixed inset-0 z-[-1] overflow-hidden">
        <div className="absolute top-[-10%] left-[-5%] w-full h-full bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-indigo-900/20 via-transparent to-transparent opacity-50" />
        <motion.div 
          animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 8, repeat: Infinity }}
          className="absolute top-1/4 right-0 w-96 h-96 bg-purple-600/10 blur-[120px] rounded-full" 
        />
      </div>

      <div className="max-w-6xl mx-auto">
        
        {/* --- HERO CARD --- */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
          className="relative rounded-[3.5rem] p-1 md:p-1.5 overflow-hidden bg-gradient-to-br from-indigo-500/20 via-white/5 to-purple-500/20 shadow-2xl"
        >
          <div className="bg-[#0b1224]/90 backdrop-blur-2xl rounded-[3.4rem] p-8 md:p-16 flex flex-col md:flex-row items-center gap-12 relative overflow-hidden">
            
            {/* Liquid Avatar */}
            <div className="relative">
              <motion.div 
                whileHover={{ scale: 1.05 }}
                className="relative z-10 w-48 h-48 md:w-56 md:h-56 rounded-full p-2 bg-gradient-to-tr from-indigo-500 to-purple-500 cursor-pointer overflow-hidden group shadow-[0_0_50px_rgba(79,70,229,0.3)]"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-full h-full rounded-full bg-slate-900 overflow-hidden relative">
                  <img 
                    key={userData?.profilePic}
                    src={userData?.profilePic || `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${userData?.username}`} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 group-hover:brightness-50"
                  />
                  <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-all">
                    <Camera size={30} className="mb-1" />
                    <span className="text-[8px] font-black uppercase tracking-tighter">Sync Photo</span>
                  </div>
                </div>
              </motion.div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
              
              {/* Float Badge */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ repeat: Infinity, duration: 4 }} className="absolute -top-2 -right-2 z-20 bg-indigo-600 p-4 rounded-full border-4 border-[#0b1224] shadow-xl">
                <Crown size={20} className="text-white" />
              </motion.div>
            </div>

            {/* Profile Info */}
            <div className="flex-1 text-center md:text-left space-y-4">
              <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.2 }}>
                <span className="text-indigo-400 font-black text-[10px] tracking-[0.3em] uppercase bg-indigo-500/10 px-4 py-1.5 rounded-full border border-indigo-500/20">Authorized User</span>
                <h1 className="text-6xl md:text-8xl font-black italic tracking-tighter uppercase text-white mt-4 drop-shadow-2xl">
                  {userData?.username}
                </h1>
                <p className="text-slate-400 font-medium text-lg mt-2 underline decoration-indigo-500/30 underline-offset-8 decoration-2">{userData?.email}</p>
              </motion.div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.1, rotate: 180 }}
              onClick={() => setIsModalOpen(true)}
              className="w-24 h-24 bg-white/5 border border-white/10 rounded-full flex items-center justify-center backdrop-blur-md hover:bg-white hover:text-black transition-all group shadow-xl"
            >
              <Settings size={36} className="group-hover:animate-spin-slow" />
            </motion.button>
          </div>
        </motion.div>

        {/* --- STATS GRID --- */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mt-12">
           <BentoStat icon={<Activity />} label="Security" value="Level 4" delay={0.1} />
           <BentoStat icon={<Timer />} label="Session" value="4h 22m" delay={0.2} />
           <BentoStat icon={<Globe />} label="Node" value="Mainnet" delay={0.3} />
           
           <motion.div 
             initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
             className="bg-indigo-600 rounded-[2.5rem] p-8 group cursor-pointer relative overflow-hidden"
           >
             <Sparkles className="absolute top-[-10%] right-[-10%] text-white/20 w-32 h-32" />
             <div className="flex flex-col h-full justify-between relative z-10">
               <ArrowUpRight className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
               <div>
                  <p className="text-[10px] font-black uppercase text-white/60 tracking-widest">Reports</p>
                  <h3 className="text-2xl font-black italic tracking-tighter text-white uppercase">Analytics</h3>
               </div>
             </div>
           </motion.div>
        </div>
      </div>

      {/* --- MODERN GLASS MODAL --- */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-[#020617]/90 backdrop-blur-xl" />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }} animate={{ opacity: 1, scale: 1, y: 0 }} exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-xl bg-slate-900 border border-white/5 rounded-[3.5rem] p-10 md:p-14 shadow-[0_0_100px_rgba(79,70,229,0.2)] overflow-hidden"
            >
              {/* Status Bar */}
              {statusMsg.text && (
                <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className={`absolute top-0 left-0 w-full py-4 text-center font-black text-[10px] tracking-[0.3em] uppercase ${statusMsg.type === 'success' ? 'bg-green-500/20 text-green-400' : 'bg-red-500/20 text-red-400'}`}>
                   {statusMsg.text}
                </motion.div>
              )}

              <div className="flex justify-between items-center mb-10 mt-4">
                <h2 className="text-3xl font-black italic tracking-tighter uppercase">System Settings</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-3 bg-white/5 rounded-2xl hover:bg-red-500/20 hover:text-red-500 transition-all"><X size={20}/></button>
              </div>

              {/* Tabs */}
              <div className="flex bg-black/40 rounded-3xl p-1.5 border border-white/5 mb-10">
                <button onClick={() => setActiveTab("profile")} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}>Identity</button>
                <button onClick={() => setActiveTab("password")} className={`flex-1 py-4 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === 'password' ? 'bg-indigo-600 text-white shadow-lg' : 'text-slate-500'}`}>Security</button>
              </div>

              <div className="min-h-[300px]">
                {activeTab === "profile" ? (
                  <form className="space-y-6" onSubmit={(e) => handleUpdate(e, "update", "POST", { username: newUsername, email: newEmail })}>
                    <InputBox label="Alias" icon={<User />} value={newUsername} onChange={setNewUsername} />
                    <InputBox label="E-Mail" icon={<Mail />} value={newEmail} onChange={setNewEmail} />
                    <button disabled={isSyncing} className="w-full bg-white text-black py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3">
                      {isSyncing ? <Loader2 className="animate-spin" /> : <Save size={18} />} Update Protocol
                    </button>
                  </form>
                ) : (
                  <form className="space-y-6" onSubmit={(e) => handleUpdate(e, "update-password", "PUT", { oldPassword, newPassword })}>
                    <InputBox label="Old Password" type="password" icon={<Lock />} value={oldPassword} onChange={setOldPassword} />
                    <InputBox label="New Password" type="password" icon={<KeyRound />} value={newPassword} onChange={setNewPassword} />
                    <button disabled={isSyncing} className="w-full bg-indigo-600 text-white py-6 rounded-3xl font-black text-xs uppercase tracking-[0.2em] shadow-xl active:scale-95 transition-all flex items-center justify-center gap-3">
                       {isSyncing ? <Loader2 className="animate-spin" /> : <Zap size={18} />} Refresh Key
                    </button>
                  </form>
                )}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}

// --- SUB-COMPONENTS ---
function BentoStat({ icon, label, value, delay }: any) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay }}
      whileHover={{ y: -5 }}
      className="bg-[#0b1224]/50 border border-white/5 backdrop-blur-xl rounded-[2.5rem] p-8 shadow-xl flex flex-col justify-between group"
    >
       <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-indigo-400 group-hover:bg-indigo-600 group-hover:text-white transition-all shadow-inner">
         {icon}
       </div>
       <div className="mt-6">
          <p className="text-[10px] font-black uppercase text-slate-500 tracking-[0.2em]">{label}</p>
          <h4 className="text-3xl font-black italic tracking-tighter uppercase text-white">{value}</h4>
       </div>
    </motion.div>
  );
}

function InputBox({ label, icon, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-2">
      <label className="text-[10px] font-black uppercase text-slate-500 tracking-widest ml-4">{label}</label>
      <div className="relative group">
        <div className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
          {icon}
        </div>
        <input 
          type={type} value={value} onChange={(e) => onChange(e.target.value)}
          className="w-full bg-black/50 border border-white/5 rounded-[1.5rem] px-8 py-5 pl-16 outline-none focus:border-indigo-500/50 focus:ring-4 focus:ring-indigo-500/5 font-bold transition-all"
        />
      </div>
    </div>
  );
}