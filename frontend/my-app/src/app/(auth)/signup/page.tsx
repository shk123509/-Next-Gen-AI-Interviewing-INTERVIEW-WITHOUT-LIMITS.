"use client";
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Signup() {
  const [form, setForm] = useState({ username: '', email: '', password: '' });
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSignup = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      console.log("Sending data:", form); // Debugging ke liye

      const res = await fetch('http://localhost:3000/api/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username: form.username,
          email: form.email,
          password: form.password
        }),
      });

      const data = await res.json(); // Backend se message pakdo

      if (res.status === 200 || res.status === 201) {
        // Data save karo
        localStorage.setItem('user', JSON.stringify({ email: form.email }));
        
        // Navbar ko dhakka maro update hone ke liye
        window.dispatchEvent(new Event("auth-change"));
        
        // Redirect
        router.push('/');
        router.refresh();
      } else {
        // Agar backend error message de raha hai toh wahi dikhao
        alert(data.message || "Signup failed! Try another email.");
      }
    } catch (err) {
      console.error("Signup Error:", err);
      alert("Server connect nahi ho raha mc!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-6 text-white font-sans">
      <div className="max-w-md w-full bg-[#0f0f0f] border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
        <h2 className="text-4xl font-black mb-2 tracking-tighter">JOIN THE CLUB</h2>
        <p className="text-gray-500 mb-8 font-medium">New email, new vibes. No bugs allowed.</p>

        <form onSubmit={handleSignup} className="space-y-5">
          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Username</label>
            <input 
              required
              className="w-full bg-[#161616] border border-white/5 p-4 rounded-2xl outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
              placeholder=""
              onChange={(e) => setForm({...form, username: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Email</label>
            <input 
              required
              type="email" 
              className="w-full bg-[#161616] border border-white/5 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all"
              placeholder=""
              onChange={(e) => setForm({...form, email: e.target.value})}
            />
          </div>

          <div className="space-y-2">
            <label className="text-[10px] font-bold uppercase tracking-widest text-gray-500 ml-1">Password</label>
            <input 
              required
              type="password" 
              className="w-full bg-[#161616] border border-white/5 p-4 rounded-2xl outline-none focus:border-blue-500 transition-all"
              placeholder=""
              onChange={(e) => setForm({...form, password: e.target.value})}
            />
          </div>

          <button 
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-500 py-4 mt-4 rounded-2xl font-black text-lg transition-all shadow-xl shadow-blue-600/10 active:scale-95"
          >
            {loading ? "CHECKING..." : "CREATE ACCOUNT →"}
          </button>
        </form>
      </div>
    </div>
  );
}