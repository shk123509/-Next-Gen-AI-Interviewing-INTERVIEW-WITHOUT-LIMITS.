"use client";
import React, { Suspense, useRef, useState } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  PerspectiveCamera, 
  Float, 
  MeshDistortMaterial, 
  Environment, 
  Sparkles
} from "@react-three/drei";
import { motion } from "framer-motion";
import * as THREE from "three";
import { 
  Mail, Phone, MapPin, Globe, 
  Send, MessageSquare, Terminal, 
  Cpu, ShieldCheck, Zap, Server, 
  Headset, Code2, Coffee
} from 'lucide-react';

// --- 1. 3D BACKGROUND (Neural Mesh) ---
function NeuralBackground() {
  const meshRef = useRef<THREE.Mesh>(null!);
  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    meshRef.current.rotation.x = Math.sin(t / 4) * 0.2;
    meshRef.current.rotation.y = Math.cos(t / 2) * 0.2;
  });

  return (
    <group>
      <Sparkles count={300} scale={15} size={1.5} speed={0.5} color="#6366f1" />
      <Float speed={3} rotationIntensity={1} floatIntensity={1.5}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[4, 8]} />
          <MeshDistortMaterial 
            color="#4f46e5" 
            speed={3} 
            distort={0.45} 
            wireframe
            opacity={0.2}
            transparent
          />
        </mesh>
      </Float>
      <Environment preset="night" />
    </group>
  );
}

export default function ContactPage() {
  return (
    <div className="relative min-h-screen bg-[#010103] text-white selection:bg-indigo-500 overflow-x-hidden font-sans">
      
      {/* 3D ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <Suspense fallback={null}>
            <NeuralBackground />
          </Suspense>
        </Canvas>
      </div>

      {/* CONTENT LAYER */}
      <main className="relative z-10">
        
        {/* HERO SECTION */}
        <section className="pt-32 pb-20 px-6 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <h1 className="text-7xl md:text-[11vw] font-black tracking-tighter uppercase italic leading-[0.75] mb-6">
              SYSTEM_<span className="text-indigo-500 underline">UPLINK</span>
            </h1>
            <p className="text-indigo-400 font-mono text-[10px] tracking-[0.6em] uppercase">Ready to establish secure communication protocol.</p>
          </motion.div>
        </section>

        {/* MAIN GRID */}
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 pb-32">
          
          {/* FORM PANEL */}
          <div className="lg:col-span-7 bg-white/5 border border-white/10 p-10 md:p-16 rounded-[4rem] backdrop-blur-3xl relative overflow-hidden">
             <div className="relative z-10">
                <div className="flex items-center gap-3 mb-10">
                   <Terminal className="text-indigo-500" />
                   <h2 className="text-3xl font-black italic uppercase">Send_Transmission</h2>
                </div>

                <form className="space-y-8">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                      <div className="group space-y-2">
                         <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">User_Identity</label>
                         <input type="text" placeholder="MD_SHAKIB" className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 outline-none focus:border-indigo-500 focus:bg-indigo-500/5 transition-all font-mono" />
                      </div>
                      <div className="group space-y-2">
                         <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Return_Address</label>
                         <input type="email" placeholder="shakib@node.com" className="w-full bg-black/40 border border-white/5 rounded-2xl p-5 outline-none focus:border-indigo-500 focus:bg-indigo-500/5 transition-all font-mono" />
                      </div>
                   </div>
                   <div className="space-y-2">
                      <label className="text-[10px] font-mono text-gray-500 uppercase tracking-widest ml-2">Payload_Data</label>
                      <textarea rows={4} placeholder="Type your technical request here..." className="w-full bg-black/40 border border-white/5 rounded-[2.5rem] p-8 outline-none focus:border-indigo-500 focus:bg-indigo-500/5 transition-all font-mono resize-none" />
                   </div>
                   <button className="w-full bg-indigo-600 hover:bg-white hover:text-black py-6 rounded-2xl font-black text-xs tracking-[0.4em] uppercase transition-all shadow-[0_20px_50px_rgba(79,70,229,0.3)] flex items-center justify-center gap-4 group">
                      Initialize_Send <Send size={16} className="group-hover:translate-x-2 group-hover:-translate-y-2 transition-transform" />
                   </button>
                </form>
             </div>
          </div>

          {/* INFO STACK */}
          <aside className="lg:col-span-5 space-y-6">
             {/* PRIORITY SUPPORT */}
             <div className="bg-indigo-600 p-10 rounded-[3.5rem] shadow-xl">
                <h3 className="text-xl font-black italic uppercase mb-6 flex items-center gap-3">
                   <Headset /> Critical_Support
                </h3>
                <div className="space-y-4 font-mono text-[11px]">
                   <div className="flex justify-between border-b border-white/20 pb-3">
                      <span>L1 RESPONSIVE</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded italic">{'<'} 15 MIN</span>
                   </div>
                   <div className="flex justify-between border-b border-white/20 pb-3">
                      <span>L2 ENGINEER</span>
                      <span className="bg-white/20 px-2 py-0.5 rounded italic">{'<'} 2 HOURS</span>
                   </div>
                </div>
             </div>

             {/* NODES MAP */}
             <div className="bg-white/5 border border-white/10 p-10 rounded-[3.5rem] backdrop-blur-2xl">
                <h3 className="text-xl font-black italic uppercase mb-8 flex items-center gap-3">
                   <Server className="text-indigo-500" /> Data_Nodes
                </h3>
                <div className="space-y-8">
                   <div className="flex gap-4">
                      <div className="p-3 bg-white/5 rounded-xl h-fit"><MapPin size={20} className="text-indigo-400" /></div>
                      <div>
                         <p className="font-black uppercase tracking-tight text-sm">Central Node [Indore]</p>
                         <p className="text-xs text-gray-500 font-mono italic">TIT College, CSE-Block, MP</p>
                      </div>
                   </div>
                   <div className="flex gap-4">
                      <div className="p-3 bg-white/5 rounded-xl h-fit"><Globe size={20} className="text-indigo-400" /></div>
                      <div>
                         <p className="font-black uppercase tracking-tight text-sm">Neural Link [Global]</p>
                         <p className="text-xs text-gray-500 font-mono italic">support@vox-neural.ai</p>
                      </div>
                   </div>
                </div>
             </div>

             {/* ENCRYPTION BADGE */}
             <div className="p-8 border border-indigo-500/20 rounded-[2.5rem] bg-indigo-500/5 flex items-center gap-5">
                <ShieldCheck size={32} className="text-indigo-500 animate-pulse" />
                <p className="text-[10px] font-mono leading-tight uppercase tracking-tighter text-gray-400">
                   Packet encryption active: <span className="text-white">AES-256-GCM</span>. Transmission is secure.
                </p>
             </div>
          </aside>
        </div>

        {/* MORE CONTENT: DEPARTMENTS */}
        <section className="max-w-7xl mx-auto px-6 mb-32">
           <div className="flex items-center gap-4 mb-12">
              <Zap className="text-indigo-500" />
              <h2 className="text-4xl font-black italic uppercase tracking-tighter leading-none">Branch_Routing</h2>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { title: "Dev_Core", info: "SDK & API integration issues", icon: <Code2 /> },
                { title: "Node_Security", info: "Data privacy & GDPR audits", icon: <ShieldCheck /> },
                { title: "Business", info: "Licensing & Node expansion", icon: <MessageSquare /> },
                { title: "General", info: "Coffee chats & Feedback", icon: <Coffee /> }
              ].map((item, i) => (
                <div key={i} className="group p-8 bg-white/2 border border-white/5 rounded-[2.5rem] hover:bg-white/5 hover:border-indigo-500/50 transition-all">
                   <div className="text-indigo-500 mb-6 group-hover:scale-110 transition-transform">{item.icon}</div>
                   <h4 className="font-black uppercase italic mb-2 tracking-tighter">{item.title}</h4>
                   <p className="text-[11px] text-gray-500 font-mono leading-relaxed">{item.info}</p>
                </div>
              ))}
           </div>
        </section>

        {/* FOOTER */}
        <footer className="py-20 border-t border-white/5 text-center">
           <p className="text-[10px] font-mono text-gray-700 tracking-[1em] uppercase">
              SOLO_CODER // INDORE_NODE_MP // 2026
           </p>
        </footer>

      </main>
    </div>
  );
}