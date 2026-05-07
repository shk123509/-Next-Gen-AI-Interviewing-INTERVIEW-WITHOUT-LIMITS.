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
import * as random from "maath/random/dist/maath-random.esm";
import { motion, useScroll, useTransform } from "framer-motion";
// Saare icons check kar liye hain ab error nahi aayega
import { 
  EyeOff, Key, Database, Lock, ShieldCheck, 
  Globe, Cpu, Fingerprint, Activity, Zap, ShieldAlert 
} from "lucide-react";

// --- 1. 3D Stars (Particles) Background ---
function StarBackground() {
  const ref = useRef();
  const [sphere] = useState(() => random.inSphere(new Float32Array(5000), { radius: 1.5 }));
  
  useFrame((state, delta) => {
    ref.current.rotation.x -= delta / 15;
    ref.current.rotation.y -= delta / 20;
  });

  return (
    <group rotation={[0, 0, Math.PI / 4]}>
      <Points ref={ref} positions={sphere} stride={3} frustumCulled={false}>
        <PointMaterial transparent color="#ffffff" size={0.005} sizeAttenuation={true} depthWrite={false} />
      </Points>
    </group>
  );
}

// --- 2. 3D Cyber Crystal (Center Object) ---
function CyberCrystal() {
  return (
    <Float speed={4} rotationIntensity={1.5} floatIntensity={2}>
      <mesh>
        <octahedronGeometry args={[2, 0]} />
        <MeshDistortMaterial 
          color="#6366f1" 
          speed={3} 
          distort={0.4} 
          metalness={1} 
          roughness={0.1} 
        />
      </mesh>
    </Float>
  );
}

// --- 3. 3D Feature Card ---
const FeatureCard = ({ icon: Icon, title, desc, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 40 }}
    whileInView={{ opacity: 1, y: 0 }}
    transition={{ delay: index * 0.1 }}
    whileHover={{ scale: 1.05, rotateY: 10, rotateX: -5 }}
    className="group relative rounded-[2.5rem] border border-white/10 bg-white/5 p-8 backdrop-blur-2xl transition-all hover:bg-white/10"
    style={{ transformStyle: "preserve-3d" }}
  >
    <div className="mb-6 inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500 group-hover:text-white transition-all">
      <Icon size={28} />
    </div>
    <h3 className="mb-2 text-xl font-black text-white">{title}</h3>
    <p className="text-sm leading-relaxed text-gray-500 group-hover:text-gray-300">{desc}</p>
    {/* Internal Glow */}
    <div className="absolute inset-0 -z-10 bg-indigo-500/5 opacity-0 group-hover:opacity-100 blur-2xl transition-opacity" />
  </motion.div>
);

// --- 4. Main Page Component ---
export default function PrivacyPage() {
  const { scrollYProgress } = useScroll();
  const opacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);

  const features = [
    { icon: Lock, title: "Quantum Vault", desc: "Military-grade 4096-bit encryption for every user." },
    { icon: Fingerprint, title: "Biometric AI", desc: "Advanced pattern matching that never leaves your device." },
    { icon: Globe, title: "Proxy Mesh", desc: "Global decentralized nodes to keep your IP invisible." },
    { icon: Database, title: "Zero Logs", desc: "Hum data store nahi karte, isliye hum use bech bhi nahi sakte." },
    { icon: Cpu, title: "Neural Shield", desc: "AI-driven threat detection to block hackers in real-time." },
    { icon: ShieldAlert, title: "Auto Purge", desc: "Sensitive sessions are destroyed instantly after logout." }
  ];

  return (
    <div className="relative min-h-screen w-full bg-[#030308] text-white">
      
      {/* 3D Canvas Fixed Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <Canvas camera={{ position: [0, 0, 1] }}>
          <Suspense fallback={null}>
            <StarBackground />
            <ambientLight intensity={0.4} />
            <pointLight position={[10, 10, 10]} intensity={1.5} color="#4f46e5" />
            <PresentationControls 
              global config={{ mass: 2, tension: 500 }} 
              snap rotation={[0, 0.3, 0]}
            >
              <group position={[0, 0, -5]}>
                <CyberCrystal />
              </group>
            </PresentationControls>
          </Suspense>
        </Canvas>
      </div>

      {/* Content Layer */}
      <main className="relative z-10 mx-auto max-w-7xl px-6">
        
        {/* Hero Section */}
        <section className="flex min-h-screen flex-col items-center justify-center pt-20">
          <motion.div style={{ opacity }} className="text-center">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-[10px] font-bold uppercase tracking-[0.3em] text-indigo-400">
              <ShieldCheck size={14} className="animate-pulse" /> System v4.0 Active
            </div>
            <h1 className="mb-6 text-6xl font-black md:text-9xl tracking-tighter">
              VAULT <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-500">ENCRYPTED</span>
            </h1>
            <p className="mx-auto max-w-xl text-gray-400">
              Aapki privacy ko 3D layers mein secure kiya gaya hai. 
              Modern encryption aur decentralized architecture ka perfect mel.
            </p>
          </motion.div>
        </section>

        {/* Feature Grid Section */}
        <section className="py-20">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((f, i) => (
              <FeatureCard key={i} {...f} index={i} />
            ))}
          </div>
        </section>

        {/* New 3D "Security Status" Section */}
        <section className="py-40">
           <div className="relative overflow-hidden rounded-[4rem] border border-white/5 bg-gradient-to-br from-indigo-900/10 to-transparent p-12 backdrop-blur-3xl">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
                 <div>
                    <h2 className="text-5xl font-black mb-6 italic">Secure. Always.</h2>
                    <p className="text-gray-400 mb-8 leading-relaxed">
                       Humare servers 100% renewable energy par chalte hain aur aapke data ka ek bhi byte 
                       unencrypted format mein store nahi karte.
                    </p>
                    <div className="flex flex-wrap gap-4">
                       {["AES-256", "RSA-4096", "SHA-3"].map(t => (
                         <span key={t} className="rounded-lg bg-white/5 px-4 py-2 font-mono text-xs text-indigo-400">
                            {t}
                         </span>
                       ))}
                    </div>
                 </div>
                 {/* Visual HUD */}
                 <div className="rounded-3xl border border-white/10 bg-black/40 p-10 font-mono text-xs text-indigo-500">
                    <p className="mb-2 text-white font-bold">» INITIALIZING_SHIELD_V4...</p>
                    <p className="opacity-50">Checking Nodes... [OK]</p>
                    <p className="opacity-50">Syncing Quantum Keys... [OK]</p>
                    <p className="mt-4 text-green-400 animate-pulse">● SECURITY_LEVEL: MAXIMUM</p>
                 </div>
              </div>
           </div>
        </section>

        {/* Footer CTA */}
        <section className="pb-40 text-center">
           <motion.button 
             whileHover={{ scale: 1.1, boxShadow: "0px 0px 40px rgba(79, 70, 229, 0.4)" }}
             className="rounded-full bg-indigo-600 px-12 py-6 text-xl font-black text-white transition-all hover:bg-indigo-500"
           >
              Create Your Vault
           </motion.button>
        </section>

      </main>

      {/* Decorative Overlays */}
      <div className="fixed bottom-10 left-10 opacity-20 hidden lg:block">
         <Activity size={40} className="text-indigo-500 animate-pulse" />
         <p className="mt-2 font-mono text-[8px] uppercase tracking-widest">Global_Heartbeat</p>
      </div>
    </div>
  );
}