"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleLogin = async (e:any) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: "include",   // ✅ important for cookie
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (data.success) {

        localStorage.setItem('user', JSON.stringify({ email: form.email }));

        // Navbar update signal
        window.dispatchEvent(new Event("auth-change"));
        localStorage.setItem("userId", data.userId);
        window.location.href = "/";

        router.push('/dashboard'); // login ke baad dashboard
      } 
      else {
        alert(data.message || "Invalid credentials");
      }

    } catch (err) {
      console.error(err);
      alert("Server error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6">
      <div className="max-w-md w-full bg-[#0f0f0f] border border-white/5 p-10 rounded-[2.5rem] shadow-2xl relative overflow-hidden">
        
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-blue-600/20 blur-[80px]"></div>
        
        <div className="relative z-10">
          <h2 className="text-4xl font-black text-white mb-2">Welcome Back</h2>
          <p className="text-gray-500 mb-10">Enter your credentials to continue</p>

          <form onSubmit={handleLogin} className="space-y-6">

            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-500 ml-1 group-focus-within:text-blue-500 transition-colors">
                Email Address
              </label>

              <input
                required
                type="email"
                className="w-full bg-[#161616] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="shakib@gmail.com"
                onChange={(e) => setForm({...form, email: e.target.value})}
              />
            </div>

            <div className="space-y-2 group">
              <label className="text-[10px] font-black uppercase tracking-[2px] text-gray-500 ml-1 group-focus-within:text-blue-500 transition-colors">
                Password
              </label>

              <input
                required
                type="password"
                className="w-full bg-[#161616] border border-white/5 p-4 rounded-2xl text-white outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                placeholder="••••••••"
                onChange={(e) => setForm({...form, password: e.target.value})}
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-500 text-white py-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-900/10 active:scale-[0.98]"
            >
              {loading ? "Authenticating..." : "LOGIN TO SYSTEM"}
            </button>

          </form>
        </div>
      </div>
    </div>
  );
}