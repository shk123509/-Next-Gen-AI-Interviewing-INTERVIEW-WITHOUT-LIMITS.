"use client";
import React, { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  MeshDistortMaterial, 
  PerspectiveCamera, 
  Points,
  PointMaterial,
  PresentationControls
} from "@react-three/drei";
// @ts-ignore
import * as random from "maath/random/dist/maath-random.esm";
import { motion, useScroll, useTransform } from "framer-motion";
import * as THREE from "three";

import { 
  Lock, ShieldCheck, Globe, Cpu, 
  Fingerprint, Activity, ShieldAlert, Terminal 
} from "lucide-react";

// --- 1. 3D Stars Background ---
function StarBackground() {
  const ref = useRef<any>(null!); 
  
  const [sphere] = useState(() => {
    try {
      return random.inSphere(new Float32Array(5000), { radius: 1.5 });
    } catch (e) {
      return new Float32Array(5000).fill(0);
    }
  });
  
  useFrame((state, delta) => {
    if (ref.current) {
      ref.current.rotation.x -= delta / 15;
      ref.current.rotation.y -= delta / 20;
    }
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial 
          transparent 
          color="#ffffff" 
          size={0.005} 
          sizeAttenuation={true} 
          depthWrite={false} 
        />
      </Points>
    </group>
  );
}

// --- 2. 3D Cyber Crystal ---
function CyberCrystal() {
  return (
    <Float speed={4} rotationIntensity={1.5} floatIntensity={2}>
      <mesh>
        <octahedronGeometry args={[2, 0]} />
        <MeshDistortMaterial 
          color="#4f46e5" 
          speed={3} 
          distort={0.4} 
          metalness={1} 
          roughness={0.1} 
        />
      </mesh>
    </Float>
  );
}

// --- 3. Feature Card ---
const FeatureCard = ({ icon: Icon, title, desc, index }: any) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05 }}
    className="group relative rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-3xl transition-all"
  >
    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/10 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
      <Icon size={28} />
    </div>
    <h3 className="mb-2 text-xl font-black text-white uppercase italic tracking-tighter">{title}</h3>
    <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-300">{desc}</p>
    <div className="absolute inset-0 -z-10 bg-indigo-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
  </motion.div>
);

export default function PrivacyPage() {
  const { scrollYProgress } = useScroll();
  const heroOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const features = [
    { icon: Lock, title: "Quantum Vault", desc: "Military-grade 4096-bit encryption for every single user session." },
    { icon: Fingerprint, title: "Biometric AI", desc: "Advanced neural pattern matching that stays on your local node." },
    { icon: Globe, title: "Proxy Mesh", desc: "Global decentralized routing to keep your digital identity invisible." },
    { icon: ShieldAlert, title: "Zero Logs", desc: "We don't store data, so there's nothing to steal or sell." },
    { icon: Cpu, title: "Neural Shield", desc: "Real-time threat detection powered by local AI processing." },
    { icon: Activity, title: "Auto Purge", desc: "Sessions are wiped from memory immediately upon termination." }
  ];

  return (
    <div className="relative min-h-screen bg-[#020205] text-white overflow-x-hidden">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas>
          <PerspectiveCamera makeDefault position={[0, 0, 8]} fov={50} />
          <Suspense fallback={null}>
            <StarBackground />
            <ambientLight intensity={0.5} />
            <pointLight position={[10, 10, 10]} intensity={2} color="#4f46e5" />
            
            {/* FIXED: Using 'any' cast to force-kill the config type error */}
            <PresentationControls
              {...( {
                global: true,
                snap: true,
                rotation: [0, 0.3, 0],
                config: { mass: 2, tension: 500 }
              } as any)}
            >
              <CyberCrystal />
            </PresentationControls>
          </Suspense>
        </Canvas>
      </div>

      <main className="relative z-10 max-w-7xl mx-auto px-6">
        <section className="h-screen flex flex-col items-center justify-center">
          <motion.div style={{ opacity: heroOpacity }} className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/20 bg-indigo-500/5 px-6 py-2 text-[10px] font-mono tracking-widest text-indigo-400 uppercase">
              <ShieldCheck size={14} /> Status: Core_Encrypted
            </div>
            <h1 className="text-7xl md:text-9xl font-black tracking-tighter uppercase italic leading-none mb-6">
              Privacy_<span className="text-indigo-500">Node</span>
            </h1>
            <p className="max-w-xl mx-auto text-gray-500 font-medium font-mono text-xs uppercase tracking-widest">
              Securing local node: mdshakib
            </p>
          </motion.div>
        </section>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-20">
          {features.map((f, i) => (
            <FeatureCard key={i} {...f} index={i} />
          ))}
        </div>

        <section className="py-40">
           <div className="bg-white/5 border border-white/10 rounded-[4rem] p-12 backdrop-blur-3xl relative overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
                 <div>
                    <h2 className="text-5xl font-black italic uppercase mb-6 underline decoration-indigo-500">Security_Protocol</h2>
                    <p className="text-gray-400 leading-relaxed mb-10 text-sm">
                       MDSHAKIB Node: Metadata stripping active. Session logs: PURGED. 
                       Your data is encrypted before it ever touches the wire.
                    </p>
                    <div className="flex gap-4">
                       <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-xl font-mono text-xs italic">SHA-512</span>
                       <span className="bg-indigo-500/10 text-indigo-400 border border-indigo-500/20 px-4 py-2 rounded-xl font-mono text-xs italic">ED25519</span>
                    </div>
                 </div>
                 <div className="bg-black/60 rounded-3xl p-8 border border-white/5 font-mono text-[10px] text-indigo-400 space-y-2">
                    <p className="text-white flex items-center gap-2 font-bold mb-4">
                      <Terminal size={14} /> SYSTEM_DIAGNOSTICS
                    </p>
                    <p className="opacity-40">» Establishing secure handshake...</p>
                    <p className="opacity-40">» AES-GCM Payload Encryption... [READY]</p>
                    <p className="text-indigo-300 mt-4 animate-pulse">● SHIELD_NOMINAL</p>
                 </div>
              </div>
           </div>
        </section>

        <footer className="py-20 text-center border-t border-white/5">
           <p className="font-mono text-[10px] text-gray-700 tracking-[1em] uppercase">
             SOLO_CODER // 2026
           </p>
        </footer>
      </main>
    </div>
  );
}