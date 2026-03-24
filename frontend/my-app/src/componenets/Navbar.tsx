"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { useRouter, usePathname } from "next/navigation";
import { Mic, LogOut, User, LayoutDashboard } from "lucide-react";

export default function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const pathname = usePathname(); // Active link check karne ke liye

  const checkAuth = () => {
    const user = localStorage.getItem("user");
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

  const handleLogout = async () => {
  try {
    await fetch('/api/logout', { method: 'POST' }); // correct api
  } catch (err) {
    console.error("Logout error:", err);
  }

  localStorage.removeItem("user");
  setIsLoggedIn(false);

  router.push("/login");
};

  return (
    <nav className="fixed top-0 w-full z-50 border-b border-white/5 bg-[#020617]/80 backdrop-blur-md px-6 py-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        
        {/* Logo Section */}
        <Link href="/" className="flex items-center gap-2 font-bold text-2xl tracking-tighter text-white group">
          <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center shadow-lg shadow-indigo-500/20 group-hover:bg-indigo-500 transition-all duration-300">
            <Mic size={20} className="text-white" />
          </div>
          <span className="flex items-center group-hover:text-indigo-400 transition-colors">
            VOX<span className="text-indigo-500 font-black ml-1">INTERVIEW</span>
          </span>
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-8 text-sm text-slate-400 font-semibold tracking-wide">
          <Link href="/platform" className="hover:text-white transition-colors">PLATFORM</Link>
          <Link href="/main" className="hover:text-white transition-colors">AI-VOICES</Link>
          <Link href="/enterprise" className="hover:text-white transition-colors">ENTERPRISE</Link>
          <Link href="/pricing" className="hover:text-white transition-colors">PRICING</Link>
        </div>

        {/* Dynamic Action Buttons */}
        <div className="flex items-center gap-4">
          {isLoggedIn ? (
            <div className="flex items-center gap-3">
              
              {/* Dashboard Link */}
              <Link 
                href="/dashboard" 
                className={`hidden sm:flex items-center gap-2 px-4 py-2 rounded-xl transition-all ${
                  pathname === "/dashboard" 
                  ? "bg-indigo-600/10 text-indigo-400 border border-indigo-500/20" 
                  : "text-slate-300 hover:bg-white/5"
                }`}
              >
                <LayoutDashboard size={16} />
                <span className="text-sm font-bold tracking-wide">DASHBOARD</span>
              </Link>
              
              {/* Profile Link (User Icon) */}
              <Link 
                href="/profile" 
                className={`w-10 h-10 rounded-full flex items-center justify-center border transition-all ${
                  pathname === "/profile"
                  ? "border-indigo-500 bg-indigo-600/20 text-indigo-400"
                  : "border-white/10 bg-slate-800 text-slate-300 hover:border-white/30"
                }`}
                title="Your Profile"
              >
                <User size={18} />
              </Link>
              
              {/* Logout Button */}
              <button 
                onClick={handleLogout}
                className="flex items-center justify-center w-10 h-10 sm:w-auto sm:px-5 sm:h-10 rounded-xl bg-red-500/10 text-red-500 border border-red-500/20 font-black hover:bg-red-500 hover:text-white transition-all duration-300 group"
              >
                <LogOut size={16} className="sm:mr-2" />
                <span className="hidden sm:inline text-[10px] tracking-widest uppercase">LOGOUT</span>
              </button>

            </div>
          ) : (
            <div className="flex items-center gap-3">
              <Link 
                href="/login" 
                className="text-slate-400 hover:text-white text-sm font-bold px-4 transition-colors"
              >
                Login
              </Link>
              <Link 
                href="/signup"
                className="bg-white text-black px-6 py-2.5 rounded-full text-sm font-black hover:bg-indigo-600 hover:text-white transition-all duration-300 shadow-xl shadow-white/5 active:scale-95"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

      </div>
    </nav>
  );
}