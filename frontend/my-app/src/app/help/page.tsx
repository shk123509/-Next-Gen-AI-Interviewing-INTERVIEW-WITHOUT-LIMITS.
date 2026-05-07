"use client";
import React, { Suspense, useRef } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  PerspectiveCamera, 
  MeshDistortMaterial, 
  Sphere, 
  Environment, 
  Sparkles,
  Stars
} from "@react-three/drei";
import { 
  Search, Book, Shield, Zap, 
  Mail, Phone, Terminal, HelpCircle,
  MessageSquare, ChevronRight, ArrowUpRight 
} from 'lucide-react';
import Link from 'next/link';

// --- 1. ONLY BACKGROUND (3D SCENE) ---
function CyberBackground() {
  const sphereRef = useRef<any>(null!);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    sphereRef.current.rotation.set(t * 0.1, t * 0.2, 0);
  });

  return (
    <group>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1.5} />
      <Sparkles count={200} scale={20} size={2} speed={0.3} color="#6366f1" />
      
      <Float speed={2} rotationIntensity={1} floatIntensity={1}>
        <Sphere ref={sphereRef} args={[4, 100, 100]} scale={2}>
          <MeshDistortMaterial
            color="#4f46e5"
            speed={2}
            distort={0.4}
            radius={1}
            emissive="#1e1b4b"
            emissiveIntensity={0.5}
            roughness={0.2}
            metalness={0.8}
          />
        </Sphere>
      </Float>
      
      <Environment preset="night" />
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} intensity={1} color="#6366f1" />
    </group>
  );
}

// --- 2. MAIN HELP PAGE UI ---
export default function HelpPage() {
  return (
    <div className="relative min-h-screen bg-[#020205] text-white selection:bg-indigo-500 overflow-x-hidden">
      
      {/* FIXED 3D BACKGROUND LAYER */}
      <div className="fixed inset-0 z-0">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 12]} fov={50} />
          <Suspense fallback={null}>
            <CyberBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* OVERLAY CONTENT (SCROLLABLE) */}
      <main className="relative z-10 px-6 py-20">
        
        {/* HEADER SECTION */}
        <section className="max-w-7xl mx-auto pt-20 pb-32 text-center">
          <h1 className="text-7xl md:text-[9vw] font-black tracking-tighter uppercase italic leading-none mb-10">
            HELP_<span className="text-indigo-500">CENTER</span>
          </h1>
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-6 top-1/2 -translate-y-1/2 text-gray-500" />
            <input 
              type="text" 
              placeholder="Search documentation, API logs, or troubleshooting..." 
              className="w-full bg-white/5 border border-white/10 rounded-2xl py-6 pl-16 pr-6 backdrop-blur-2xl outline-none focus:border-indigo-500 transition-all text-lg font-medium"
            />
          </div>
        </section>

        {/* CATEGORY GRID */}
        <section className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-6 mb-40">
          {[
            { icon: <Book />, title: "Technical Docs", link: "/docs", desc: "Complete API and SDK reference guides." },
            { icon: <Shield />, title: "Security Hub", link: "/security", desc: "Data encryption and compliance protocols." },
            { icon: <MessageSquare />, title: "Live Chat", link: "/chat", desc: "Real-time support from AI nodes." },
            { icon: <Zap />, title: "Integrations", link: "/integrations", desc: "Connect with Slack, Jira, and ATS." }
          ].map((cat, i) => (
            <Link href={cat.link} key={i}>
              <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 backdrop-blur-3xl hover:bg-white/10 transition-all group">
                <div className="w-14 h-14 bg-indigo-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-[0_0_20px_rgba(79,70,229,0.4)]">
                  {cat.icon}
                </div>
                <h3 className="text-2xl font-bold mb-3">{cat.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{cat.desc}</p>
              </div>
            </Link>
          ))}
        </section>

        {/* CONTENT HEAVY TROUBLESHOOTING */}
        <section className="max-w-5xl mx-auto mb-40">
           <div className="flex items-center gap-4 mb-12">
              <Terminal className="text-indigo-500" />
              <h2 className="text-4xl font-black uppercase italic tracking-tighter">System_Diagnostics</h2>
           </div>

           <div className="space-y-6">
              {[
                { q: "Mic Isolation Issues", a: "If the candidate audio stream is fragmented, navigate to Dashboard {'>'} Settings and set Neural Noise Suppression to 'Ultra'. Ensure the sample rate is 44.1kHz." },
                { q: "API Key Rotation", a: "For security, all session keys expire every 24 hours. Always pull the latest keys from your .env.production or Vault." },
                { q: "Real-time Transcription Lag", a: "Check your global latency metrics. If it exceeds 200ms, switch your edge location to the nearest available node in /roadmap." }
              ].map((faq, i) => (
                <div key={i} className="bg-white/5 border border-white/10 p-10 rounded-[2.5rem] backdrop-blur-xl">
                   <h4 className="text-xl font-bold mb-4 flex items-center gap-2">
                     <div className="w-2 h-2 bg-indigo-500 rounded-full" /> {faq.q}
                   </h4>
                   <p className="text-gray-400 leading-relaxed font-mono text-sm">{faq.a}</p>
                </div>
              ))}
           </div>
        </section>

        {/* FOOTER CONTACTS */}
        <section className="max-w-7xl mx-auto py-20 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-10">
           <div className="text-center md:text-left">
              <h3 className="text-3xl font-black italic uppercase tracking-tighter">Emergency_Support</h3>
              <p className="text-gray-500 text-xs font-mono uppercase tracking-[0.3em] mt-2">Available 24/7 for Enterprise Clients</p>
           </div>
           <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-2xl font-black cursor-pointer hover:bg-indigo-500 hover:text-white transition-all">
                 <Mail size={18} /> OPEN_TICKET
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-8 py-4 rounded-2xl font-black cursor-pointer hover:bg-white/10 transition-all">
                 <Phone size={18} /> CALL_CORE
              </div>
           </div>
        </section>

        <footer className="text-center pt-20 text-[10px] font-mono text-gray-700 tracking-[0.6em] uppercase">
           © 2026 VOXINTERVIEW_AI_SYSTEMS // SOLO_CODER
        </footer>

      </main>
    </div>
  );
}