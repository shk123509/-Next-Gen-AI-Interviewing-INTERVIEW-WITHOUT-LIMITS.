"use client";
import React, { Suspense, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { MeshDistortMaterial, Sphere, Float, PerspectiveCamera } from "@react-three/drei";
import { motion } from "framer-motion";
import { ShieldCheck, Lock, Fingerprint, Cpu } from "lucide-react";

// --- 1. 3D Background Element ---
function AnimatedBackground() {
  return (
    <div className="absolute inset-0 -z-10 bg-[#020617]">
      <Canvas>
        <PerspectiveCamera makeDefault position={[0, 0, 5]} />
        <ambientLight intensity={0.5} />
        <pointLight position={[10, 10, 10]} intensity={1} />
        <spotLight position={[-10, 10, 10]} angle={0.15} penumbra={1} />
        
        <Float speed={3} rotationIntensity={2} floatIntensity={2}>
          <Sphere args={[1, 100, 200]} scale={2.2}>
            <MeshDistortMaterial
              color="#3b82f6"
              attach="material"
              distort={0.4}
              speed={2}
              roughness={0.2}
              metalness={0.8}
            />
          </Sphere>
        </Float>
      </Canvas>
    </div>
  );
}

// --- 2. Main Page Component ---
export default function SecurityPage() {
  return (
    <div className="relative min-h-screen w-full overflow-hidden font-sans selection:bg-blue-500/30">
      
      {/* 3D Canvas Layer */}
      <AnimatedBackground />

      {/* UI Overlay */}
      <div className="relative z-10 flex min-h-screen items-center justify-center p-4">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-lg overflow-hidden rounded-3xl border border-white/10 bg-black/40 p-8 backdrop-blur-2xl shadow-[0_0_50px_-12px_rgba(59,130,246,0.5)]"
        >
          {/* Header */}
          <div className="mb-8 text-center">
            <motion.div 
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-500/20 text-blue-400 shadow-inner"
            >
              <ShieldCheck size={40} />
            </motion.div>
            <h1 className="text-3xl font-extrabold tracking-tight text-white">Quantum Auth</h1>
            <p className="mt-2 text-sm text-blue-200/60 uppercase tracking-widest">Secure Terminal Access</p>
          </div>

          {/* Form Section */}
          <div className="space-y-6">
            <div className="space-y-2">
              <label className="text-xs font-semibold text-blue-300 uppercase ml-1">Identity Token</label>
              <div className="relative">
                <Fingerprint className="absolute left-3 top-3.5 h-5 w-5 text-blue-400/50" />
                <input 
                  type="text" 
                  placeholder="Enter UserID"
                  className="w-full rounded-xl border border-white/5 bg-white/5 py-3.5 pl-12 pr-4 text-white outline-none ring-1 ring-white/10 transition-all focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-semibold text-blue-300 uppercase ml-1">Encrypted Key</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3.5 h-5 w-5 text-blue-400/50" />
                <input 
                  type="password" 
                  placeholder="••••••••"
                  className="w-full rounded-xl border border-white/5 bg-white/5 py-3.5 pl-12 pr-4 text-white outline-none ring-1 ring-white/10 transition-all focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="group relative w-full overflow-hidden rounded-xl bg-blue-600 py-4 font-bold text-white transition-all hover:bg-blue-500"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                Initialize Verification <Cpu size={18} className="animate-pulse" />
              </span>
              <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
            </motion.button>
          </div>

          {/* Footer Info */}
          <div className="mt-10 grid grid-cols-2 gap-4 border-t border-white/5 pt-6 text-[10px] text-gray-500 uppercase tracking-tighter">
            <div className="flex flex-col border-r border-white/5">
              <span>Security Level</span>
              <span className="font-mono text-blue-400 text-[12px]">Class-4 / High</span>
            </div>
            <div className="flex flex-col pl-2">
              <span>Encryption</span>
              <span className="font-mono text-blue-400 text-[12px]">RSA-4096 / SHA</span>
            </div>
          </div>
        </motion.div>

        {/* Decorative Elements */}
        <div className="absolute bottom-10 left-10 hidden lg:block">
           <div className="h-32 w-[1px] bg-gradient-to-t from-blue-500 to-transparent opacity-20" />
           <p className="mt-2 -rotate-90 text-[10px] text-blue-500/40 font-mono">SYSTEM_STABLE_V2.0</p>
        </div>
      </div>
    </div>
  );
}