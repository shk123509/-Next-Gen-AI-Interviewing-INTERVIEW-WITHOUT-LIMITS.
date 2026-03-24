"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Mic, LogOut, User, LayoutDashboard, 
  Menu, X, ArrowRight, ChevronRight, Settings
} from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  const checkAuth = () => {
    const user = typeof window !== "undefined" ? localStorage.getItem("user") : null;
    setIsLoggedIn(!!user);
  };

  useEffect(() => {
    checkAuth();
    window.addEventListener("auth-change", checkAuth);
    window.addEventListener("storage", checkAuth); 
    return () => {
      window.removeEventListener("auth-change", checkAuth);
      window.removeEventListener("storage", checkAuth);
    };
  }, []);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    setIsMenuOpen(false);
  }, [pathname]);

  const handleLogout = async () => {
    try { await fetch('/api/logout', { method: 'POST' }); } catch (err) {}
    localStorage.removeItem("user");
    setIsLoggedIn(false);
    router.push("/login");
  };

  const navLinks = [
    { name: "Platform", href: "/platform" },
    { name: "AI-Voices", href: "/main" },
    { name: "Enterprise", href: "/enterprise" },
    { name: "Pricing", href: "/pricing" },
  ];

  return (
    <>
      <nav className="fixed top-0 w-full z-[100] border-b border-white/5 bg-[#020617]/80 backdrop-blur-xl px-6 py-4 antialiased transform-gpu">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          
          <Link href="/" className="flex items-center gap-2 font-bold text-xl md:text-2xl tracking-tighter text-white group z-[110]">
            <div className="w-9 h-9 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-500 transition-all duration-300">
              <Mic size={18} className="text-white" />
            </div>
            <span className="flex items-center group-hover:text-indigo-400 transition-colors uppercase">
              VOX<span className="text-indigo-500 font-black ml-1">INTERVIEW</span>
            </span>
          </Link>

          {/* Desktop Links */}
          <div className="hidden lg:flex gap-8 text-[11px] text-slate-400 font-black tracking-[0.2em]">
            {navLinks.map((link) => (
              <Link key={link.name} href={link.href} className="hover:text-white transition-colors uppercase italic transition-all">
                {link.name}
              </Link>
            ))}
          </div>

          {/* Top Actions (Visible on Mobile too if logged in) */}
          <div className="flex items-center gap-3 z-[110]">
            {isLoggedIn && (
               <Link href="/profile" className="lg:hidden w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center">
                 <User size={18} className="text-slate-300" />
               </Link>
            )}

            <div className="hidden lg:flex items-center gap-4">
              {isLoggedIn ? (
                <>
                  <Link href="/dashboard" className="text-[10px] font-black tracking-widest text-slate-300 hover:text-white">DASHBOARD</Link>
                  <Link href="/profile" className="w-10 h-10 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:border-indigo-500 transition-all">
                    <User size={18} />
                  </Link>
                  <button onClick={handleLogout} className="p-2 text-red-400 hover:text-red-500"><LogOut size={20} /></button>
                </>
              ) : (
                <Link href="/signup" className="bg-white text-black px-6 py-2 rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-indigo-600 hover:text-white transition-all shadow-lg">
                  Get Started
                </Link>
              )}
            </div>

            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="lg:hidden w-10 h-10 flex items-center justify-center rounded-xl bg-white/5 border border-white/10 text-white"
            >
              {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </nav>

      <AnimatePresence mode="wait">
        {isMenuOpen && (
          <motion.div 
            initial={{ x: "100%", opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: "100%", opacity: 0 }}
            transition={{ type: "tween", ease: [0.23, 1, 0.32, 1], duration: 0.4 }}
            className="fixed inset-0 z-[90] bg-[#020617] lg:hidden flex flex-col pt-24 px-6 pb-10 antialiased transform-gpu will-change-transform"
          >
            {/* User Profile Header (Inside Mobile Menu) */}
            {isLoggedIn && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-8 p-4 rounded-2xl bg-white/5 border border-white/5 flex items-center gap-4"
              >
                <div className="w-12 h-12 rounded-full bg-indigo-600/20 border border-indigo-500/20 flex items-center justify-center">
                  <User size={24} className="text-indigo-500" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-slate-500 uppercase tracking-widest">Account</p>
                  <Link href="/profile" className="text-lg font-bold text-white flex items-center gap-1 group">
                    View Profile <ChevronRight size={16} className="text-indigo-500 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </motion.div>
            )}

            <div className="flex-1 space-y-1">
              <p className="text-[10px] font-black text-indigo-500 tracking-[0.4em] uppercase mb-4 italic opacity-60">Navigation</p>
              {navLinks.map((link, i) => (
                <motion.div key={link.name} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.05 }}>
                  <Link href={link.href} className="flex items-center justify-between py-5 border-b border-white/5 group">
                    <span className="text-4xl font-black italic tracking-tighter uppercase text-white group-hover:text-indigo-400">
                      {link.name}
                    </span>
                    <ChevronRight size={24} className="text-slate-700" />
                  </Link>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mt-auto pt-8 border-t border-white/5">
              {isLoggedIn ? (
                <div className="grid grid-cols-1 gap-3">
                  <Link href="/dashboard" className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-indigo-600 font-black uppercase tracking-widest text-xs italic">
                    <LayoutDashboard size={16} /> Dashboard
                  </Link>
                  <button onClick={handleLogout} className="flex items-center justify-center gap-3 py-4 rounded-2xl bg-red-500/10 border border-red-500/20 text-red-500 font-black uppercase tracking-widest text-xs italic">
                    <LogOut size={16} /> Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link href="/signup" className="flex items-center justify-center gap-3 py-5 rounded-2xl bg-white text-black font-black uppercase tracking-widest text-xs italic shadow-2xl">
                    Get Started <ArrowRight size={18} />
                  </Link>
                  <Link href="/login" className="flex items-center justify-center py-5 rounded-2xl bg-white/5 border border-white/10 text-white font-black uppercase tracking-widest text-xs italic">
                    Already a Member? Login
                  </Link>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}