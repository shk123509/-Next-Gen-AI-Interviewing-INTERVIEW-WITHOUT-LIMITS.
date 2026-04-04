"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, AlertTriangle, ChevronRight, ChevronLeft, Shield } from "lucide-react";

export default function SecureQuizPage() {
  const params = useParams();
  const userId = params.userId;
  const router = useRouter();

  const [questions, setQuestions] = useState<any[]>([]);
  const [testId, setTestId] = useState("");
  const [currentIdx, setCurrentIdx] = useState(0);
  const [answers, setAnswers] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // ⏱️ Timer State (e.g., 600 seconds = 10 minutes)
  const [timeLeft, setTimeLeft] = useState(600);

  // 1. Fetch Data
  useEffect(() => {
    if (!userId) return;
    const startSecureTest = async () => {
      try {
        const res = await fetch(`/api/coding/start/${userId}`, { method: "POST" });
        const data = await res.json();
        if (data.questions) {
          setQuestions(data.questions);
          setTestId(data.testId);
          setAnswers(new Array(data.questions.length).fill(""));
          if(data.duration) setTimeLeft(data.duration); // If backend sends duration
        }
      } catch (err) {
        console.error("Connection Error:", err);
      } finally {
        setLoading(false);
      }
    };
    startSecureTest();
  }, [userId]);

  // 2. Final Submit Logic (Memoized for use in Timer)
  const handleFinalSubmit = useCallback(async () => {
    setIsSubmitting(true);
    try {
      const res = await fetch(`/api/codings/summit/${testId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers }),
      });
      const result = await res.json();
      router.push(`/dashboard?score=${result.score}&pass=${result.pass}&testId=${testId}`);
    } catch (err) {
      alert("Auto-submission failed. Please check connection.");
    } finally {
      setIsSubmitting(false);
    }
  }, [testId, answers, router]);

  // 3. Timer Effect
  useEffect(() => {
    if (loading || isSubmitting) return;

    if (timeLeft <= 0) {
      alert("Time is up! Submitting your responses...");
      handleFinalSubmit();
      return;
    }

    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading, isSubmitting, handleFinalSubmit]);

  // 4. Anti-Cheat
  useEffect(() => {
    const handleSecurityBreach = () => {
      if (document.hidden) {
        alert("🚨 SECURITY ALERT: Tab switching detected.");
        router.push("/dashboard?status=failed_by_cheat");
      }
    };
    document.addEventListener("visibilitychange", handleSecurityBreach);
    return () => document.removeEventListener("visibilitychange", handleSecurityBreach);
  }, [router]);

  // Format Time (MM:SS)
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center">
        <div className="w-16 h-16 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
        <div className="text-blue-500 font-mono animate-pulse tracking-[0.2em] text-sm uppercase">
          Initializing Secure Protocol
        </div>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-4 md:p-10">
      
      {/* ⚡ Top Navigation Bar */}
      <div className="w-full max-w-6xl flex justify-between items-center mb-8 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/20 rounded-lg">
                <Shield className="text-blue-400 w-5 h-5" />
            </div>
            <span className="font-mono text-xs text-gray-400 tracking-tighter uppercase">Encrypted Session: {testId.slice(0,8)}</span>
        </div>

        {/* ⏱️ Dynamic Timer UI */}
        <div className={`flex items-center gap-3 px-5 py-2 rounded-xl border transition-all ${timeLeft < 60 ? "bg-red-500/20 border-red-500 animate-pulse" : "bg-white/5 border-white/10"}`}>
          <Timer className={`w-5 h-5 ${timeLeft < 60 ? "text-red-500" : "text-blue-400"}`} />
          <span className={`font-mono text-xl font-bold ${timeLeft < 60 ? "text-red-500" : "text-white"}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* 📝 Main Quiz Card */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl"
      >
        <div className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div>
            <span className="text-blue-500 font-bold text-xs tracking-widest uppercase">System Assessment</span>
            <h1 className="text-3xl font-light mt-1">Challenge <span className="font-bold">{currentIdx + 1}</span> <span className="text-gray-500 text-xl italic">/ {questions.length}</span></h1>
          </div>
          <div className="flex flex-col items-end">
            <span className="text-[10px] text-gray-500 uppercase mb-2 tracking-widest">Overall Progress</span>
            <div className="w-48 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                 className="h-full bg-gradient-to-r from-blue-600 to-cyan-400 shadow-[0_0_15px_#3b82f6]"
               />
            </div>
          </div>
        </div>

        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-12"
          >
            <h2 className="text-2xl md:text-4xl font-medium text-gray-100 leading-snug">
              {currentQ?.question}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              {currentQ?.options.map((opt: string, i: number) => {
                const label = String.fromCharCode(65 + i);
                const isSelected = answers[currentIdx] === label;

                return (
                  <button
                    key={i}
                    onClick={() => {
                        const updated = [...answers];
                        updated[currentIdx] = label;
                        setAnswers(updated);
                    }}
                    className={`group flex items-center text-left p-6 rounded-[2rem] border-2 transition-all duration-300 ${
                      isSelected 
                      ? "bg-blue-600 border-blue-400 text-white shadow-xl shadow-blue-900/20" 
                      : "bg-white/[0.03] border-white/5 hover:border-white/20 text-gray-400 hover:text-gray-200"
                    }`}
                  >
                    <span className={`w-12 h-12 flex items-center justify-center rounded-2xl mr-5 font-black text-lg transition-colors ${isSelected ? "bg-white text-blue-600" : "bg-white/5 group-hover:bg-white/10"}`}>
                      {label}
                    </span>
                    <span className="text-lg font-medium">{opt}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 🎮 Controls */}
        <div className="flex justify-between items-center mt-16 pt-8 border-t border-white/5">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="flex items-center gap-2 text-gray-500 hover:text-white font-semibold transition-all disabled:opacity-0"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>

          <div className="flex gap-4">
            {currentIdx === questions.length - 1 ? (
              <button 
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="px-10 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-2xl hover:brightness-110 transition-all shadow-lg shadow-blue-900/40 disabled:grayscale"
              >
                {isSubmitting ? "SYNCING..." : "COMPLETE ASSESSMENT"}
              </button>
            ) : (
              <button 
                onClick={() => {
                  if (!answers[currentIdx]) return alert("Select an option to proceed.");
                  setCurrentIdx(currentIdx + 1);
                }}
                className="flex items-center gap-2 px-10 py-4 bg-white text-black font-bold rounded-2xl hover:bg-blue-50 transition-all"
              >
                Next Step <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
      
      <p className="mt-8 text-gray-600 text-xs font-mono tracking-widest uppercase">
        Continuous Monitoring Active &bull; Secure Protocol v4.0
      </p>
    </div>
  );
}