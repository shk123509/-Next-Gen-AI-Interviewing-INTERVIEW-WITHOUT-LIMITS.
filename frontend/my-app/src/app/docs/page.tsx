"use client";
import React, { useRef, Suspense, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  PerspectiveCamera, 
  MeshTransmissionMaterial,
  ScrollControls,
  useScroll,
  Environment,
  ContactShadows,
  Sparkles
} from "@react-three/drei";
import { motion, AnimatePresence } from "framer-motion";
import * as THREE from "three";
import { 
  Terminal, Shield, Zap, Cpu, 
  Database, GitBranch, LucideIcon 
} from "lucide-react";

// --- 1. MORPHING 3D CORE (Logic Fixed) ---
function MorphingCore() {
  const scroll = useScroll();
  const meshRef = useRef<THREE.Mesh>(null!);

  useFrame((state, delta) => {
    // Scroll offset ranges from 0 to 1
    const offset = scroll.offset; 
    
    if (meshRef.current) {
      // Rotation logic
      meshRef.current.rotation.y += delta * 0.4;
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, offset * Math.PI, 0.1);
      
      // Floating & Scale logic
      const s = 1 + offset * 1.2;
      meshRef.current.scale.set(s, s, s);
      meshRef.current.position.y = Math.sin(state.clock.elapsedTime) * 0.2;
    }
  });

  return (
    <group>
      <Sparkles count={150} scale={15} size={2} speed={0.3} color="#6366f1" />
      <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[2.2, 1]} /> 
          <MeshTransmissionMaterial 
            backside 
            samples={10} 
            thickness={1.5} 
            chromaticAberration={0.05} 
            anisotropy={0.1} 
            distortion={0.5} 
            distortionScale={0.2} 
            temporalDistortion={0.1}
            color="#4f46e5"
            roughness={0.1}
          />
        </mesh>
      </Float>
    </group>
  );
}

// --- 2. DOCUMENTATION CARD (UI Polished) ---
interface DocSectionProps {
  title: string;
  desc: string;
  icon: LucideIcon;
  step: string;
  tags: string[];
}

const DocCard: React.FC<DocSectionProps> = ({ title, desc, icon: Icon, step, tags }) => (
  <motion.div 
    initial={{ opacity: 0, y: 50 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ margin: "-100px" }}
    transition={{ duration: 0.8, ease: "easeOut" }}
    className="relative mb-[30vh] last:mb-0"
  >
    <div className="relative overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] p-10 md:p-16 backdrop-blur-2xl transition-all hover:border-indigo-500/30 group">
      <div className="flex flex-col lg:flex-row gap-12 items-start">
        <div className="flex-1">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-500 mb-8 group-hover:scale-110 transition-transform">
            <Icon size={28} />
          </div>
          <p className="font-mono text-[10px] font-bold text-indigo-500 uppercase tracking-[0.4em] mb-4">
            Module_Sequence // {step}
          </p>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-6 uppercase italic">
            {title}
          </h2>
          <p className="text-lg text-gray-500 max-w-2xl leading-relaxed mb-8">
            {desc}
          </p>
          
          <div className="flex flex-wrap gap-3">
            {tags.map(tag => (
              <span key={tag} className="px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[9px] font-mono text-gray-400 uppercase tracking-widest">
                {tag}
              </span>
            ))}
          </div>
        </div>

        <div className="hidden lg:flex flex-col gap-4 w-48 pt-10">
           <div className="h-[1px] w-full bg-gradient-to-r from-indigo-500 to-transparent" />
           <p className="text-[9px] font-mono text-indigo-400 uppercase tracking-tighter">Integrity: Verified</p>
           <p className="text-[9px] font-mono text-gray-600 uppercase tracking-tighter">Status: Active Node</p>
        </div>
      </div>
    </div>
  </motion.div>
);

// --- 3. MAIN PAGE ---
export default function Ultra3DDocs() {
  const sections: DocSectionProps[] = [
    { 
      icon: Cpu, step: "01", title: "Neural Logic", 
      tags: ["AI-Engine", "Vector-Sync", "Edge"],
      desc: "Humara core engine complex multi-threaded data ko parse karta hai, jisse aapki application ko milti hai superhuman speed." 
    },
    { 
      icon: Database, step: "02", title: "Vault Storage", 
      tags: ["FAISS", "Qdrant", "RAG"],
      desc: "Vector storage architecture jo millions of data points ko microseconds mein retrieve karne ki capability rakhta hai." 
    },
    { 
      icon: GitBranch, step: "03", title: "Mesh Routing", 
      tags: ["Failover", "Node-Link"],
      desc: "Dynamic routing protocols jo traffic ko automatically manage karte hain, zero downtime ensure karne ke liye." 
    },
    { 
      icon: Shield, step: "04", title: "Quantum Auth", 
      tags: ["AES-256", "Bio-Key"],
      desc: "End-to-end encryption aur proprietary biometric auth layers jo aapke sensitive data ko military-grade protection dete hain." 
    }
  ];

  return (
    <div className="relative min-h-screen bg-[#020205] text-white selection:bg-indigo-500/50">
      
      {/* BACKGROUND GRID */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-20">
         <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:60px_60px]" />
         <div className="absolute inset-0 bg-radial-gradient from-indigo-500/10 via-transparent to-transparent" />
      </div>

      {/* 3D RENDER ENGINE */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={45} />
          <Suspense fallback={null}>
            <ScrollControls pages={5} damping={0.2}>
              <MorphingCore />
            </ScrollControls>
            <Environment preset="night" />
            <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} />
          </Suspense>
        </Canvas>
      </div>

      {/* OVERLAY UI */}
      <nav className="fixed top-0 left-0 w-full p-8 z-50 flex justify-between items-center">
         <div className="flex items-center gap-4 font-black text-xl italic tracking-tighter uppercase">
            <div className="h-10 w-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white shadow-[0_0_20px_rgba(79,70,229,0.5)]">
               <Terminal size={18} />
            </div>
            Vault.OS / <span className="text-indigo-500">Docs</span>
         </div>
         <div className="hidden md:flex gap-8 font-mono text-[9px] uppercase tracking-[0.3em] text-gray-500">
            <span className="text-indigo-400 animate-pulse">● System_Online</span>
            <span className="hover:text-white cursor-pointer transition-colors underline underline-offset-8">Manual</span>
            <span className="hover:text-white cursor-pointer transition-colors">API_Reference</span>
         </div>
      </nav>

      <main className="relative z-10 px-6 max-w-6xl mx-auto">
        {/* HERO */}
        <section className="h-screen flex flex-col justify-center items-center text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 1 }}>
            <h1 className="text-[14vw] md:text-[10vw] font-black leading-[0.8] tracking-tighter italic uppercase">
              CORE_<span className="text-indigo-600">DECRYPT</span>
            </h1>
            <p className="mt-10 font-mono text-[10px] text-indigo-400/60 uppercase tracking-[1em]">
              Establishing High-Fidelity Connection...
            </p>
          </motion.div>
        </section>

        {/* CONTENT SECTIONS */}
        <div className="pb-40">
          {sections.map((sec, i) => (
            <DocCard key={i} {...sec} />
          ))}
        </div>

        {/* FINAL CTA */}
        <section className="h-[80vh] flex flex-col items-center justify-center">
           <motion.button 
             whileHover={{ scale: 1.05 }}
             whileTap={{ scale: 0.95 }}
             className="px-16 py-8 rounded-full bg-white text-black font-black text-2xl uppercase italic tracking-tighter hover:bg-indigo-500 hover:text-white transition-all shadow-[0_0_50px_rgba(255,255,255,0.1)]"
           >
             Initialize Interface
           </motion.button>
           <p className="mt-12 font-mono text-[9px] text-gray-700 tracking-[0.5em] uppercase">
             Design by MDSHAKIB // Solo Coder Protocol 2026
           </p>
        </section>
      </main>
    </div>
  );
}