"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Lock, Settings, X, Save, 
  Loader2, ShieldCheck, Activity, Cpu, Timer
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
        const cachedImg = localStorage.getItem("user_avatar");
        const finalData = { ...data.user };
        if (cachedImg) finalData.profilePic = cachedImg;

        setUserData(finalData);
        setNewUsername(data.user.username);
        setNewEmail(data.user.email);
      }
    } catch (err) { 
      console.error("Fetch Error:", err); 
    } finally { 
      setLoading(false); 
    }
  };

  useEffect(() => { fetchProfile(); }, []);

  const showStatus = (type: string, text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: "", text: "" }), 4000);
  };

  // --- MOBILE OPTIMIZED IMAGE UPLOAD ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 1. Mobile par size check (Optional but good for performance)
    if (file.size > 5 * 1024 * 1024) {
      showStatus("error", "FILE_TOO_LARGE (MAX 5MB)");
      return;
    }

    // 2. Instant Local Preview (Works great on mobile)
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserData((prev: any) => ({ ...prev, profilePic: reader.result as string }));
    };
    reader.readAsDataURL(file);

    // 3. Actual Upload
    const formData = new FormData();
    formData.append("image", file);

    setIsSyncing(true);
    try {
      const res = await fetch("/api/update-profile-pic", { 
        method: "POST", 
        body: formData,
        // Mobile browsers need clear headers sometimes
        headers: {
            'Accept': 'application/json',
        }
      });
      
      const data = await res.json();
      
      if (data.success) {
        const updatedUrl = `${data.profilePic}?t=${Date.now()}`;
        localStorage.setItem("user_avatar", updatedUrl);
        setUserData((prev: any) => ({ ...prev, profilePic: updatedUrl }));
        showStatus("success", "AVATAR_SYNCED");
      } else {
        showStatus("error", data.message || "UPLOAD_FAILED");
        // Revert on failure
        fetchProfile();
      }
    } catch (err) { 
      showStatus("error", "MOBILE_SYNC_ERROR"); 
      fetchProfile();
    } finally { 
      setIsSyncing(false); 
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);

    const isProfile = activeTab === "profile";
    const endpoint = isProfile ? "/api/profile" : "/api/update-password";
    
    const body = isProfile 
      ? { username: newUsername, email: newEmail } 
      : { oldPassword, newPassword };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      
      const data = await res.json();

      if (data.success) {
        showStatus("success", "SYSTEM_UPDATED");
        if (isProfile) {
          setUserData((prev: any) => ({ ...prev, username: newUsername, email: newEmail }));
        } else {
          setOldPassword("");
          setNewPassword("");
        }
        setTimeout(() => setIsModalOpen(false), 1000); 
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
      <Loader2 className="text-indigo-500 animate-spin" size={40} />
      <p className="text-[10px] font-black tracking-[0.6em] text-indigo-400 uppercase italic">Neural Link Syncing...</p>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-24 md:pt-44 pb-20 px-4 md:px-10 overflow-x-hidden antialiased">
      <AnimatePresence>
        {statusMsg.text && (
          <motion.div 
            initial={{ y: -100, opacity: 0 }} animate={{ y: 20, opacity: 1 }} exit={{ y: -100, opacity: 0 }}
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-[2000] px-6 py-3 rounded-full font-black text-[10px] tracking-widest uppercase shadow-2xl backdrop-blur-md border ${
              statusMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'
            }`}
          >
            {statusMsg.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="relative rounded-[2.5rem] md:rounded-[4rem] p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent overflow-hidden">
          <div className="bg-[#0b1224]/80 backdrop-blur-3xl rounded-[2.4rem] md:rounded-[3.9rem] p-6 md:p-16 flex flex-col md:flex-row items-center gap-8 md:gap-16 relative">
            
            {/* Avatar Section */}
            <div className="relative shrink-0">
              <div 
                className="relative z-10 w-36 h-36 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-tr from-indigo-500 via-purple-500 to-pink-500 shadow-2xl overflow-hidden cursor-pointer"
                onClick={() => fileInputRef.current?.click()}
              >
                <div className="w-full h-full rounded-full bg-slate-950 overflow-hidden relative group">
                  {isSyncing && (
                    <div className="absolute inset-0 bg-black/70 z-20 flex items-center justify-center">
                      <Loader2 className="text-white animate-spin" size={30} />
                    </div>
                  )}
                  <img 
                    src={userData?.profilePic || `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${userData?.username}`} 
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    alt="profile"
                  />
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-opacity">
                    <span className="text-[10px] font-bold uppercase tracking-tighter">Change Photo</span>
                  </div>
                </div>
              </div>
              {/* Note: 'capture' attribute removed to allow both gallery and camera on mobile */}
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/*" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex items-center gap-2 text-indigo-400 font-black text-[9px] tracking-[0.4em] uppercase bg-indigo-500/10 px-4 py-2 rounded-full border border-indigo-500/20 mb-4">
                Active Node
              </div>
              <h1 className="text-3xl sm:text-5xl md:text-8xl font-black italic tracking-tighter uppercase text-white leading-[1.1] mb-2 break-words">
                {userData?.username}
              </h1>
              <p className="text-slate-500 font-bold text-xs md:text-xl italic opacity-70">
                {userData?.email}
              </p>
            </div>

            <button 
              onClick={() => setIsModalOpen(true)}
              className="absolute top-4 right-4 md:static w-10 h-10 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all group"
            >
              <Settings size={18} className="group-hover:rotate-90 transition-transform" />
            </button>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 mt-8">
           <BentoStat icon={<Activity size={20}/>} label="Health" value="Stable" color="text-emerald-400" />
           <BentoStat icon={<Timer size={20}/>} label="Up-Time" value="99.9%" color="text-indigo-400" />
           <BentoStat icon={<ShieldCheck size={20}/>} label="Security" value="Lvl 4" color="text-purple-400" />
           <BentoStat icon={<Cpu size={20}/>} label="Compute" value="Peak" color="text-pink-400" />
        </div>
      </div>

      {/* Modal Section */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            
            <motion.div 
              initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }}
              className="relative w-full max-w-xl bg-[#0b1224] border-t md:border border-white/10 rounded-t-[2.5rem] md:rounded-[3rem] p-6 md:p-12 shadow-2xl"
            >
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black italic uppercase text-white">Settings</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-xl hover:text-red-500"><X size={20}/></button>
              </div>

              <div className="flex bg-black/40 rounded-xl p-1 border border-white/5 mb-6">
                <button onClick={() => setActiveTab("profile")} className={`flex-1 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'profile' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Identity</button>
                <button onClick={() => setActiveTab("password")} className={`flex-1 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest transition-all ${activeTab === 'password' ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>Security</button>
              </div>

              <form className="space-y-4 md:space-y-6" onSubmit={handleUpdate}>
                {activeTab === "profile" ? (
                  <>
                    <InputBox label="Alias" icon={<User size={16}/>} value={newUsername} onChange={setNewUsername} />
                    <InputBox label="Neural Link" icon={<Mail size={16}/>} value={newEmail} onChange={setNewEmail} />
                  </>
                ) : (
                  <>
                    <InputBox label="Current Key" type="password" icon={<Lock size={16}/>} value={oldPassword} onChange={setOldPassword} />
                    <InputBox label="New Key" type="password" icon={<KeyRound size={16}/>} value={newPassword} onChange={setNewPassword} />
                  </>
                )}
                
                <button 
                  type="submit" disabled={isSyncing} 
                  className="w-full bg-white text-black py-5 md:py-6 rounded-2xl font-black text-[10px] uppercase tracking-[0.2em] active:scale-95 transition-all flex items-center justify-center gap-3 disabled:opacity-50"
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

function BentoStat({ icon, label, value, color }: any) {
  return (
    <div className="bg-[#0b1224]/50 border border-white/5 backdrop-blur-2xl rounded-[2rem] p-5 md:p-8 h-[130px] md:h-[160px] flex flex-col justify-between group">
       <div className={`w-10 h-10 md:w-12 md:h-12 rounded-xl md:rounded-2xl bg-white/5 flex items-center justify-center ${color} group-hover:bg-indigo-600 transition-all`}>
         {icon}
       </div>
       <div>
          <p className="text-[8px] md:text-[10px] font-black uppercase text-slate-500 tracking-widest">{label}</p>
          <h4 className="text-lg md:text-2xl font-black italic text-white mt-1 uppercase">{value}</h4>
       </div>
    </div>
  );
}

function InputBox({ label, icon, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-1 md:space-y-2">
      <label className="text-[8px] md:text-[10px] font-black uppercase text-slate-500 tracking-[0.2em] ml-3 md:ml-4">{label}</label>
      <div className="relative group">
        <div className="absolute left-4 md:left-6 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-indigo-500 transition-colors">
          {icon}
        </div>
        <input 
          type={type} value={value} onChange={(e) => onChange(e.target.value)}
          required
          className="w-full bg-black/40 border border-white/5 rounded-xl md:rounded-2xl px-5 md:px-8 py-4 md:py-5 pl-12 md:pl-16 outline-none focus:border-indigo-500/50 font-bold transition-all text-xs md:text-sm text-white"
        />
      </div>
    </div>
  );
}