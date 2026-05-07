"use client";
import React, { useRef, useState, useEffect, Suspense } from 'react';
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  PerspectiveCamera, 
  MeshTransmissionMaterial,
  ScrollControls,
  useScroll,
  Environment,
  Sparkles,
  ContactShadows
} from "@react-three/drei";
import { motion } from 'framer-motion';
import * as THREE from "three";
import { 
  Mic, Brain, Zap, CheckCircle2, 
  ArrowRight, Sparkles as SparkleIcon, Command 
} from 'lucide-react';
import Link from 'next/link';

// --- 3D Background Element ---
function SceneCore() {
  const meshRef = useRef<THREE.Mesh>(null!);
  const scroll = useScroll();

  useFrame((state) => {
    const offset = scroll.offset;
    meshRef.current.rotation.y = offset * Math.PI * 4;
    meshRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.3;
  });

  return (
    <group>
      <Float speed={1.5} rotationIntensity={2} floatIntensity={2}>
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[2, 0.6, 128, 32]} />
          <MeshTransmissionMaterial 
            backside 
            samples={10} 
            thickness={1.5} 
            chromaticAberration={0.06} 
            anisotropy={0.3} 
            distortion={0.5} 
            color="#4f46e5"
          />
        </mesh>
      </Float>
      <Sparkles count={150} scale={15} size={1.5} speed={0.4} color="#6366f1" />
      <Environment preset="night" />
    </group>
  );
}

export default function Mega3DHomePage() {
  const [activeUserId, setActiveUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("userId"); 
    if (storedUser) setActiveUserId(storedUser);
  }, []);

  return (
    <div className="relative w-full bg-[#020617] text-white selection:bg-indigo-500 overflow-x-hidden">
      
      {/* 1. THE 3D LAYER */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas shadows>
          <PerspectiveCamera makeDefault position={[0, 0, 10]} fov={50} />
          <Suspense fallback={null}>
            <ScrollControls pages={6} damping={0.1}>
              <SceneCore />
            </ScrollControls>
          </Suspense>
          <ContactShadows position={[0, -4, 0]} opacity={0.4} scale={20} blur={2.5} />
        </Canvas>
      </div>

      {/* 2. UI CONTENT LAYER */}
      <main className="relative z-10">
        
        {/* HERO */}
        <section className="min-h-screen flex flex-col items-center justify-center px-4 pt-20">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center max-w-5xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-[10px] font-bold uppercase tracking-widest mb-6">
              <SparkleIcon size={14} /> Next-Gen AI Interviewing
            </div>
            <h1 className="text-5xl md:text-8xl font-black tracking-tighter leading-none mb-8 uppercase">
              INTERVIEW <br /> <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-cyan-400 to-emerald-400">WITHOUT LIMITS.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-400 max-w-2xl mx-auto mb-12">
               Conduct thousands of live voice interviews simultaneously with context-aware AI.
            </p>

            <div className="flex flex-col md:flex-row gap-4 justify-center items-center">
              {/* ORIGINAL LINK 1 */}
              <Link href={activeUserId ? `/quiz/${activeUserId}` : '/login'} className="w-full md:w-auto">
                <button className="w-full md:w-auto group relative px-10 py-5 bg-indigo-600 rounded-2xl font-bold text-lg hover:scale-105 transition-all">
                  {activeUserId ? "Start Interviews" : "Start Free Pilot"}
                </button>
              </Link>
              {/* ORIGINAL LINK 2 */}
              <Link href="/chat" className="w-full md:w-auto">
                <button className="w-full md:w-auto px-10 py-5 bg-white/5 border border-white/10 rounded-2xl font-bold text-lg hover:bg-white/10 transition-all">
                  Candidate Dout Section
                </button>
              </Link>
            </div>
          </motion.div>
        </section>

        {/* BENTO GRID */}
        <section className="py-32 px-6 max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-12 gap-6">
          <div className="md:col-span-8 p-10 rounded-[2.5rem] bg-slate-900/50 border border-white/5 backdrop-blur-3xl">
            <Brain className="text-indigo-400 mb-6" size={40} />
            <h3 className="text-4xl font-bold mb-4 tracking-tight">Semantic Understanding</h3>
            <p className="text-slate-400 text-lg max-w-md">Our LLM-powered engine detects nuance and technical depth in real-time voice responses.</p>
          </div>
          <div className="md:col-span-4 p-10 rounded-[2.5rem] bg-indigo-600 border border-white/5 flex flex-col justify-between">
            <Zap size={40} />
            <h3 className="text-3xl font-black italic">0.2s LATENCY</h3>
          </div>
        </section>

        {/* PRICING TABLE (WITH ORIGINAL LINKS) */}
        <section className="py-32 px-6 max-w-7xl mx-auto">
          <h2 className="text-5xl font-black text-center mb-16 uppercase italic">Pricing</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { plan: "Starter", price: "$0", link: "/features" },
              { plan: "Pro", price: "$499", link: "/integrations", highlight: true },
              { plan: "Enterprise", price: "Custom", link: "/security" }
            ].map((p, i) => (
              <div key={i} className={`p-10 rounded-[2.5rem] border border-white/10 backdrop-blur-2xl ${p.highlight ? 'bg-indigo-600' : 'bg-slate-900/50'}`}>
                <h4 className="font-bold mb-2 uppercase tracking-widest">{p.plan}</h4>
                <div className="text-5xl font-black mb-8 italic">{p.price}</div>
                <Link href={p.link}>
                  <button className="w-full py-4 rounded-xl bg-white/10 hover:bg-white hover:text-black font-bold transition-all">
                    CONFIGURE
                  </button>
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* FOOTER (ALL ORIGINAL LINKS) */}
        <footer className="py-20 px-10 border-t border-white/5 bg-black/40 backdrop-blur-3xl">
          <div className="max-w-7xl mx-auto grid grid-cols-2 lg:grid-cols-5 gap-12">
            <div className="col-span-2">
              <div className="flex items-center gap-2 font-black text-2xl mb-6 italic">
                <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center"><Mic size={18} /></div>
                VOXINTERVIEW
              </div>
              <p className="text-slate-500 text-xs tracking-widest font-bold">© 2026 VOXINTERVIEW AI INC.</p>
            </div>
            
            {/* LINK GROUPS (RESTORED FROM YOUR CODE) */}
            <div className="flex flex-col gap-4 text-sm text-slate-500 font-bold">
              <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-50">Product</span>
              <Link href="/features" className="hover:text-indigo-400">Features</Link>
              <Link href="/integrations" className="hover:text-indigo-400">Integrations</Link>
              <Link href="/security" className="hover:text-indigo-400">Security</Link>
              <Link href="/roadmap" className="hover:text-indigo-400">Roadmap</Link>
            </div>

            <div className="flex flex-col gap-4 text-sm text-slate-500 font-bold">
              <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-50">Company</span>
              <Link href="/about" className="hover:text-indigo-400">About Us</Link>
              <Link href="/careers" className="hover:text-indigo-400">Careers</Link>
              <Link href="/blog" className="hover:text-indigo-400">Blog</Link>
              <Link href="/privacy" className="hover:text-indigo-400">Privacy</Link>
            </div>

            <div className="flex flex-col gap-4 text-sm text-slate-500 font-bold">
              <span className="text-white text-[10px] tracking-[0.3em] uppercase opacity-50">Support</span>
              <Link href="/docs" className="hover:text-indigo-400">Docs</Link>
              <Link href="/help" className="hover:text-indigo-400">Help Center</Link>
              <Link href="/contact" className="hover:text-indigo-400">Contact Us</Link>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}