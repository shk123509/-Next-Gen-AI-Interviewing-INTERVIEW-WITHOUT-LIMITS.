"use client";
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShieldCheck, Lock, CreditCard, Zap, 
  ChevronRight, ArrowLeft, CheckCircle2, 
  Globe, Info, Cpu, Sparkles 
} from 'lucide-react';
import Link from 'next/link';

export default function CheckoutPage() {
  const [paymentStep, setPaymentStep] = useState(1);
  const [isProcessing, setIsProcessing] = useState(false);

  // Mock Data (Ye tumhare URL params ya state se aayega)
  const orderData = {
    plan: "Pro Professional",
    price: 49,
    interviews: 500,
    features: ["Deep Logic Evaluation", "Custom AI Voice", "ATS Sync"]
  };

  const handlePayment = () => {
    setIsProcessing(true);
    // Simulate API call
    setTimeout(() => {
      setPaymentStep(3);
      setIsProcessing(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white selection:bg-indigo-500 overflow-x-hidden">
      
      {/* Background Glows */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[600px] h-[600px] bg-indigo-600/10 blur-[150px] rounded-full" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[600px] h-[600px] bg-cyan-600/10 blur-[150px] rounded-full" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 py-12 lg:py-24">
        
        {/* Back Button */}
        <Link href="/pricing" className="inline-flex items-center gap-2 text-slate-500 hover:text-white transition-colors mb-12 group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          <span className="font-bold uppercase tracking-widest text-xs italic">Return to Plans</span>
        </Link>

        <div className="grid lg:grid-cols-12 gap-16 items-start">
          
          {/* LEFT COLUMN: Payment Form */}
          <div className="lg:col-span-7 space-y-8">
            <AnimatePresence mode="wait">
              {paymentStep < 3 ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  className="space-y-8"
                >
                  <div className="space-y-2">
                    <h1 className="text-4xl md:text-5xl font-black tracking-tighter italic uppercase">Complete <span className="text-indigo-500">Upgrade</span></h1>
                    <p className="text-slate-400 font-medium italic">Empower your hiring engine with Next-Gen AI.</p>
                  </div>

                  {/* Payment Details Card */}
                  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 md:p-12 backdrop-blur-md relative overflow-hidden group">
                    <div className="absolute top-0 right-0 p-8 opacity-10 group-hover:opacity-20 transition-opacity">
                      <Cpu size={120} />
                    </div>

                    <div className="space-y-6 relative z-10">
                      <div className="flex items-center gap-3 mb-4">
                        <div className="w-10 h-10 bg-indigo-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-indigo-500/20">
                          <CreditCard size={20} />
                        </div>
                        <h3 className="text-xl font-bold uppercase tracking-tight">Secure Payment Method</h3>
                      </div>

                      {/* Card Input Mockup */}
                      <div className="space-y-4">
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Card Holder Name</label>
                            <input type="text" placeholder="SHAKIB ALAM" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all font-mono tracking-widest uppercase placeholder:opacity-30" />
                         </div>
                         <div className="space-y-2">
                            <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Card Number</label>
                            <div className="relative">
                               <input type="text" placeholder="**** **** **** 4242" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all font-mono tracking-widest placeholder:opacity-30" />
                               <div className="absolute right-6 top-1/2 -translate-y-1/2 flex gap-2">
                                  <div className="w-8 h-5 bg-blue-600 rounded" />
                                  <div className="w-8 h-5 bg-amber-500 rounded" />
                               </div>
                            </div>
                         </div>
                         <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-slate-500 ml-1">Expiry</label>
                               <input type="text" placeholder="MM / YY" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all font-mono placeholder:opacity-30" />
                            </div>
                            <div className="space-y-2">
                               <label className="text-[10px] font-black uppercase text-slate-500 ml-1">CVV</label>
                               <input type="text" placeholder="***" className="w-full bg-slate-950 border border-white/10 rounded-2xl px-6 py-4 focus:outline-none focus:border-indigo-500 transition-all font-mono placeholder:opacity-30" />
                            </div>
                         </div>
                      </div>

                      <button 
                        onClick={handlePayment}
                        disabled={isProcessing}
                        className="w-full bg-indigo-600 hover:bg-indigo-500 text-white py-5 rounded-2xl font-black text-lg tracking-[0.2em] uppercase transition-all shadow-2xl shadow-indigo-600/30 flex items-center justify-center gap-3 relative overflow-hidden active:scale-95 disabled:opacity-50"
                      >
                        {isProcessing ? (
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Verifying...</span>
                          </div>
                        ) : (
                          <>
                            <Lock size={18} /> Confirm Payment
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-6 pt-4 grayscale opacity-30">
                         <ShieldCheck size={20} />
                         <span className="text-[10px] font-black uppercase tracking-widest">PCI-DSS Compliant // 256-bit AES Encryption</span>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                /* SUCCESS STATE */
                <motion.div 
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-20 text-center space-y-6"
                >
                  <div className="w-24 h-24 bg-emerald-500/20 border border-emerald-500 rounded-full flex items-center justify-center shadow-[0_0_50px_rgba(16,185,129,0.3)]">
                    <CheckCircle2 size={48} className="text-emerald-500" />
                  </div>
                  <h2 className="text-5xl font-black italic uppercase tracking-tighter">Access Granted</h2>
                  <p className="text-slate-400 max-w-sm font-medium">Your engine is now firing on all cylinders. Prepare to hire at scale.</p>
                  <Link href="/dashboard">
                    <button className="bg-white text-black px-12 py-4 rounded-2xl font-black uppercase tracking-widest hover:bg-indigo-500 hover:text-white transition-all">Enter Dashboard</button>
                  </Link>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* RIGHT COLUMN: Order Summary */}
          <div className="lg:col-span-5">
             <motion.div 
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               className="bg-indigo-600 rounded-[2.5rem] p-10 shadow-2xl shadow-indigo-600/20 sticky top-12"
             >
                <div className="flex items-center gap-2 text-indigo-200 text-xs font-black uppercase tracking-[0.3em] mb-8">
                   <Sparkles size={14} /> Order Summary
                </div>
                
                <div className="space-y-6 border-b border-white/10 pb-8 mb-8">
                   <div className="flex justify-between items-start">
                      <div>
                        <h4 className="text-3xl font-black italic leading-none">{orderData.plan}</h4>
                        <p className="text-indigo-200 text-sm mt-1 uppercase font-bold">{orderData.interviews} Interviews / Month</p>
                      </div>
                      <div className="text-3xl font-black italic">${orderData.price}</div>
                   </div>
                   
                   <div className="space-y-3">
                      {orderData.features.map(f => (
                        <div key={f} className="flex items-center gap-2 text-sm font-bold text-indigo-100">
                           <Zap size={14} className="text-amber-300" /> {f}
                        </div>
                      ))}
                   </div>
                </div>

                <div className="space-y-4">
                   <div className="flex justify-between text-indigo-200 font-bold uppercase text-xs">
                      <span>Service Fee</span>
                      <span>$0.00</span>
                   </div>
                   <div className="flex justify-between text-indigo-200 font-bold uppercase text-xs">
                      <span>VAT (Tax)</span>
                      <span>Included</span>
                   </div>
                   <div className="flex justify-between items-center pt-4 border-t border-white/10 mt-4">
                      <span className="text-lg font-black italic uppercase">Total Due</span>
                      <span className="text-4xl font-black tracking-tighter italic">${orderData.price}.00</span>
                   </div>
                </div>

                {/* Promo Code Input */}
                <div className="mt-10 relative">
                   <input type="text" placeholder="PROMO CODE" className="w-full bg-indigo-700/50 border border-white/20 rounded-xl px-4 py-3 text-xs font-black tracking-widest placeholder:text-indigo-300/50 focus:outline-none" />
                   <button className="absolute right-2 top-1/2 -translate-y-1/2 text-[10px] font-black uppercase bg-white text-indigo-600 px-3 py-1 rounded-lg">Apply</button>
                </div>
             </motion.div>
             
             {/* Trust Badges */}
             <div className="mt-8 flex justify-center gap-8 opacity-40">
                <Globe size={24} />
                <ShieldCheck size={24} />
                <Info size={24} />
             </div>
          </div>

        </div>
      </div>

    </div>
  );
}