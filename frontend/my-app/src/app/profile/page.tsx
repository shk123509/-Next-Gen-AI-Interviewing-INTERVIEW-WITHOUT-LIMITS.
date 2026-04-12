"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, Mail, Lock, Settings, X, Save, 
  Loader2, ShieldCheck, Activity, Cpu, Timer, KeyRound
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
    } catch (err) { console.error(err); } finally { setLoading(false); }
  };

  useEffect(() => { fetchProfile(); }, []);

  const showStatus = (type: string, text: string) => {
    setStatusMsg({ type, text });
    setTimeout(() => setStatusMsg({ type: "", text: "" }), 4000);
  };

  // --- BUG FIX: IMAGE COMPRESSION & ROBUST UPLOAD ---
  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsSyncing(true);

    try {
      // 1. Compress Image (Mobile Fix)
      const compressedFile = await compressImage(file);
      
      // 2. Local Preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData((prev: any) => ({ ...prev, profilePic: reader.result as string }));
      };
      reader.readAsDataURL(compressedFile);

      // 3. Upload with Retry Logic
      const formData = new FormData();
      formData.append("image", compressedFile);

      const res = await fetch("/api/update-profile-pic", {
        method: "POST",
        body: formData, // No manual headers, let browser handle boundary
      });

      const data = await res.json();
      if (data.success) {
        const updatedUrl = `${data.profilePic}?t=${Date.now()}`;
        localStorage.setItem("user_avatar", updatedUrl);
        setUserData((prev: any) => ({ ...prev, profilePic: updatedUrl }));
        showStatus("success", "AVATAR_SYNCED");
      } else {
        throw new Error(data.message || "UPLOAD_FAILED");
      }
    } catch (err: any) {
      console.error("Upload Error:", err);
      showStatus("error", "UPLOAD_FAILED_TRY_AGAIN");
      fetchProfile(); // Revert preview
    } finally {
      setIsSyncing(false);
      if (fileInputRef.current) fileInputRef.current.value = "";
    }
  };

  // Helper function to compress image
  const compressImage = (file: File): Promise<File> => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target?.result as string;
        img.onload = () => {
          const canvas = document.createElement("canvas");
          const MAX_WIDTH = 800; // Resize for mobile
          const scaleSize = MAX_WIDTH / img.width;
          canvas.width = MAX_WIDTH;
          canvas.height = img.height * scaleSize;

          const ctx = canvas.getContext("2d");
          ctx?.drawImage(img, 0, 0, canvas.width, canvas.height);

          canvas.toBlob((blob) => {
            if (blob) {
              const compressedFile = new File([blob], file.name, { type: "image/jpeg", lastModified: Date.now() });
              resolve(compressedFile);
            }
          }, "image/jpeg", 0.7); // 70% Quality
        };
      };
    });
  };

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSyncing(true);
    const isProfile = activeTab === "profile";
    const body = isProfile ? { username: newUsername, email: newEmail } : { oldPassword, newPassword };

    try {
      const res = await fetch(isProfile ? "/api/profile" : "/api/update-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });
      const data = await res.json();
      if (data.success) {
        showStatus("success", "SYSTEM_UPDATED");
        if (isProfile) setUserData((prev: any) => ({ ...prev, username: newUsername, email: newEmail }));
        setTimeout(() => setIsModalOpen(false), 1000);
      } else { showStatus("error", data.message); }
    } catch (err) { showStatus("error", "CORE_ERROR"); } 
    finally { setIsSyncing(false); }
  };

  if (loading) return (
    <div className="h-screen bg-[#020617] flex flex-col items-center justify-center">
      <Loader2 className="text-indigo-500 animate-spin" size={40} />
    </div>
  );

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-24 pb-20 px-4 antialiased">
      <AnimatePresence>
        {statusMsg.text && (
          <motion.div initial={{ y: -100 }} animate={{ y: 20 }} exit={{ y: -100 }} className={`fixed top-5 left-1/2 -translate-x-1/2 z-[2000] px-6 py-3 rounded-full font-black text-[10px] tracking-widest uppercase border ${statusMsg.type === 'success' ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/20' : 'bg-red-500/20 text-red-400 border-red-500/20'}`}>
            {statusMsg.text}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-6xl mx-auto">
        <div className="relative rounded-[2.5rem] md:rounded-[4rem] p-[1px] bg-gradient-to-b from-white/20 via-white/5 to-transparent">
          <div className="bg-[#0b1224]/80 backdrop-blur-3xl rounded-[2.4rem] md:rounded-[3.9rem] p-6 md:p-16 flex flex-col md:flex-row items-center gap-8 relative">
            <div className="relative">
              <div onClick={() => fileInputRef.current?.click()} className="w-36 h-36 md:w-64 md:h-64 rounded-full p-1 bg-gradient-to-tr from-indigo-500 to-pink-500 cursor-pointer overflow-hidden">
                <div className="w-full h-full rounded-full bg-slate-950 relative group">
                  {isSyncing && <div className="absolute inset-0 bg-black/70 z-10 flex items-center justify-center"><Loader2 className="animate-spin" /></div>}
                  <img src={userData?.profilePic || `https://api.dicebear.com/8.x/bottts-neutral/svg?seed=${userData?.username}`} className="w-full h-full object-cover" alt="profile" />
                </div>
              </div>
              <input type="file" ref={fileInputRef} onChange={handleImageUpload} className="hidden" accept="image/jpeg,image/png,image/jpg" />
            </div>

            <div className="flex-1 text-center md:text-left">
              <div className="inline-flex px-4 py-2 rounded-full border border-indigo-500/20 mb-4 text-[9px] font-black uppercase tracking-widest text-indigo-400">Active Node</div>
              <h1 className="text-3xl md:text-7xl font-black italic uppercase text-white leading-tight">{userData?.username}</h1>
              <p className="text-slate-500 font-bold text-sm md:text-xl italic">{userData?.email}</p>
            </div>

            <button onClick={() => setIsModalOpen(true)} className="absolute top-4 right-4 md:static w-10 h-10 md:w-20 md:h-20 bg-white/5 border border-white/10 rounded-full flex items-center justify-center hover:bg-white hover:text-black transition-all">
              <Settings size={20} />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
           <BentoStat icon={<Activity size={20}/>} label="Health" value="Stable" color="text-emerald-400" />
           <BentoStat icon={<Timer size={20}/>} label="Up-Time" value="99.9%" color="text-indigo-400" />
           <BentoStat icon={<ShieldCheck size={20}/>} label="Security" value="Lvl 4" color="text-purple-400" />
           <BentoStat icon={<Cpu size={20}/>} label="Compute" value="Peak" color="text-pink-400" />
        </div>
      </div>

      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-[1000] flex items-end md:items-center justify-center p-4">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setIsModalOpen(false)} className="absolute inset-0 bg-black/90 backdrop-blur-md" />
            <motion.div initial={{ y: "100%" }} animate={{ y: 0 }} exit={{ y: "100%" }} className="relative w-full max-w-xl bg-[#0b1224] border border-white/10 rounded-[2.5rem] p-6 md:p-12 shadow-2xl">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-2xl font-black italic uppercase text-white">Settings</h2>
                <button onClick={() => setIsModalOpen(false)} className="p-2 bg-white/5 rounded-xl"><X size={20}/></button>
              </div>

              <div className="flex bg-black/40 rounded-xl p-1 border border-white/5 mb-6">
                {["profile", "password"].map((tab) => (
                  <button key={tab} onClick={() => setActiveTab(tab as any)} className={`flex-1 py-3 rounded-lg text-[9px] font-black uppercase tracking-widest ${activeTab === tab ? 'bg-indigo-600 text-white' : 'text-slate-500'}`}>{tab}</button>
                ))}
              </div>

              <form className="space-y-4" onSubmit={handleUpdate}>
                {activeTab === "profile" ? (
                  <><InputBox label="Alias" icon={<User size={16}/>} value={newUsername} onChange={setNewUsername} />
                  <InputBox label="Neural Link" icon={<Mail size={16}/>} value={newEmail} onChange={setNewEmail} /></>
                ) : (
                  <><InputBox label="Current Key" type="password" icon={<Lock size={16}/>} value={oldPassword} onChange={setOldPassword} />
                  <InputBox label="New Key" type="password" icon={<KeyRound size={16}/>} value={newPassword} onChange={setNewPassword} /></>
                )}
                <button type="submit" disabled={isSyncing} className="w-full bg-white text-black py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest active:scale-95 transition-all flex items-center justify-center gap-3">
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
    <div className="bg-[#0b1224]/50 border border-white/5 backdrop-blur-2xl rounded-[2rem] p-5 h-[130px] flex flex-col justify-between">
       <div className={`w-10 h-10 rounded-xl bg-white/5 flex items-center justify-center ${color}`}>{icon}</div>
       <div>
          <p className="text-[8px] font-black uppercase text-slate-500 tracking-widest">{label}</p>
          <h4 className="text-lg font-black italic text-white mt-1 uppercase">{value}</h4>
       </div>
    </div>
  );
}

function InputBox({ label, icon, value, onChange, type = "text" }: any) {
  return (
    <div className="space-y-1">
      <label className="text-[8px] font-black uppercase text-slate-500 tracking-widest ml-3">{label}</label>
      <div className="relative">
        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500">{icon}</div>
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} required className="w-full bg-black/40 border border-white/5 rounded-xl px-5 py-4 pl-12 outline-none focus:border-indigo-500/50 font-bold text-xs text-white" />
      </div>
    </div>
  );
}