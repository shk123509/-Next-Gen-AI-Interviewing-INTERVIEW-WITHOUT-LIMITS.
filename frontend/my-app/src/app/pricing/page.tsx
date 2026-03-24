"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Check, Zap, Crown, Rocket, Sparkles, 
  ArrowRight, Star, ShieldCheck, HelpCircle 
} from 'lucide-react';
import Link from 'next/link';

export default function PricingPage() {
  const [isYearly, setIsYearly] = useState(false);

  const plans = [
    {
      name: "Starter",
      icon: <Rocket size={24} className="text-blue-400" />,
      monthlyPrice: 0,
      yearlyPrice: 0,
      desc: "Perfect for students & small projects.",
      features: ["10 AI Interviews / mo", "Standard Voice Engine", "Basic Analytics Dashboard", "Public Interview Link", "Email Support"],
      button: "Start Free",
      color: "border-slate-800 bg-slate-900/50",
      highlight: false
    },
    {
      name: "Pro Professional",
      icon: <Zap size={24} className="text-indigo-400" />,
      monthlyPrice: 49,
      yearlyPrice: 39,
      desc: "Best for growing startups & recruiters.",
      features: ["500 AI Interviews / mo", "Premium Neural Voices", "Deep Logic Evaluation", "Custom Branding", "ATS Integration", "Priority Support"],
      button: "Get Pro Access",
      color: "border-indigo-500 bg-indigo-500/10 shadow-[0_0_40px_rgba(79,70,229,0.2)]",
      highlight: true
    },
    {
      name: "Enterprise",
      icon: <Crown size={24} className="text-amber-400" />,
      monthlyPrice: 999,
      yearlyPrice: 799,
      desc: "For large scale hiring powerhouses.",
      features: ["Unlimited Interviews", "Dedicated AI Training", "API Access (Full)", "SSO & SAML Security", "24/7 Dedicated Manager", "White-label Solution"],
      button: "Contact Sales",
      color: "border-slate-800 bg-slate-900/50",
      highlight: false
    }
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-white py-32 px-6 overflow-hidden relative">
      
      {/* Background Glows */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[500px] h-[500px] bg-emerald-600/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto relative z-10 text-center">
        
        {/* Header */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-16"
        >
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-indigo-500/30 bg-indigo-500/10 text-indigo-400 text-xs font-bold uppercase tracking-widest mb-6">
            <Sparkles size={14} /> Pricing that scales with you
          </div>
          <h1 className="text-5xl md:text-8xl font-black tracking-tighter mb-6">
            Simple. <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-cyan-400">Transparent.</span>
          </h1>
          <p className="text-slate-400 text-xl max-w-2xl mx-auto">
            No hidden fees. No complicated tiers. Choose the plan that fits your hiring needs.
          </p>
        </motion.div>

        {/* Toggle Switch */}
        <div className="flex items-center justify-center gap-4 mb-20">
          <span className={`text-sm font-bold ${!isYearly ? 'text-white' : 'text-slate-500'}`}>Monthly</span>
          <button 
            onClick={() => setIsYearly(!isYearly)}
            className="w-16 h-8 bg-slate-800 rounded-full p-1 relative transition-all"
          >
            <motion.div 
              animate={{ x: isYearly ? 32 : 0 }}
              className="w-6 h-6 bg-indigo-500 rounded-full shadow-lg" 
            />
          </button>
          <span className={`text-sm font-bold ${isYearly ? 'text-white' : 'text-slate-500'}`}>
            Yearly <span className="text-emerald-400 text-[10px] bg-emerald-400/10 px-2 py-0.5 rounded-full ml-1 uppercase">Save 20%</span>
          </span>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 items-end">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -10 }}
              className={`relative p-8 md:p-10 rounded-[2.5rem] border-2 flex flex-col h-full transition-all ${plan.color}`}
            >
              {plan.highlight && (
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gradient-to-r from-indigo-500 to-cyan-500 text-white text-[10px] font-black px-6 py-1.5 rounded-full uppercase tracking-[0.2em] shadow-xl">
                  Most Popular
                </div>
              )}

              <div className="mb-8">
                <div className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center mb-6">
                  {plan.icon}
                </div>
                <h3 className="text-2xl font-bold mb-2 uppercase italic">{plan.name}</h3>
                <p className="text-slate-500 text-sm leading-relaxed">{plan.desc}</p>
              </div>

              <div className="mb-8">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black italic">
                    ${isYearly ? plan.yearlyPrice : plan.monthlyPrice}
                  </span>
                  <span className="text-slate-500 font-bold uppercase text-xs tracking-widest">/ month</span>
                </div>
                {isYearly && plan.monthlyPrice !== 0 && (
                  <p className="text-emerald-400 text-xs font-bold mt-2">Billed yearly at ${plan.yearlyPrice * 12}</p>
                )}
              </div>

              <div className="space-y-4 mb-10 flex-1">
                {plan.features.map((feature) => (
                  <div key={feature} className="flex items-center gap-3 text-sm text-slate-300">
                    <Check size={16} className="text-emerald-400 shrink-0" />
                    <span className="font-medium tracking-tight">{feature}</span>
                  </div>
                ))}
              </div>

              <Link href={plan.monthlyPrice === 0 ? "/main" : "/checkout"}>
                <button className={`w-full py-4 rounded-2xl font-black text-sm uppercase tracking-widest transition-all flex items-center justify-center gap-2 group ${
                  plan.highlight 
                  ? 'bg-white text-black hover:bg-indigo-500 hover:text-white shadow-xl shadow-white/5' 
                  : 'bg-slate-800 text-white hover:bg-slate-700'
                }`}>
                  {plan.button}
                  <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
                </button>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* FAQ Preview (Extra UI Juice) */}
        <div className="mt-32 pt-20 border-t border-white/5">
          <div className="flex flex-col md:flex-row justify-between items-center gap-10 text-left">
            <div className="max-w-md">
              <h2 className="text-4xl font-bold mb-4 italic">HAVE QUESTIONS?</h2>
              <p className="text-slate-500">Check our <Link href="/help" className="text-indigo-400 underline underline-offset-4">Help Center</Link> or talk to our AI assistant in the bottom right corner.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
               {["Any setup fees?", "Can I cancel anytime?", "Do you offer custom voices?", "How secure is my data?"].map(q => (
                 <div key={q} className="bg-white/5 border border-white/5 p-4 rounded-xl flex items-center gap-3 hover:bg-white/10 transition-all cursor-pointer">
                    <HelpCircle size={18} className="text-slate-500" />
                    <span className="text-sm font-bold text-slate-300">{q}</span>
                 </div>
               ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}