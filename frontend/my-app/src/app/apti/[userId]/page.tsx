"use client";
import { useState, useEffect, useCallback } from "react";
import { useRouter, useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { Timer, ChevronRight, ChevronLeft, Shield } from "lucide-react";

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
  const [timeLeft, setTimeLeft] = useState(600);

  // 1. Fetch Data
  useEffect(() => {
    if (!userId) return;
    const startSecureTest = async () => {
      try {
        const apiKey = localStorage.getItem("geminiApiKey"); 
        const res = await fetch(`/api/aptitute/start/${userId}`, { 
          method: "POST",
          body: JSON.stringify({ apiKey }),
        });

        const data = await res.json();
        if (data.questions) {
          setQuestions(data.questions);
          setTestId(data.testId);
          setAnswers(new Array(data.questions.length).fill(""));
          if(data.duration) setTimeLeft(data.duration);
        }
      } catch (err) {
        console.error("Connection Error:", err);
      } finally {
        setLoading(false);
      }
    };
    startSecureTest();
  }, [userId]);

  // 2. Final Submit
  const handleFinalSubmit = useCallback(async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const apiKey = localStorage.getItem("geminiApiKey");
      const res = await fetch(`/api/aptitutes/sumbit/${testId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ answers, apiKey }),
      });
      const result = await res.json();
      router.push(`/main`);
    } catch (err) {
      alert("Submission failed. Check connection.");
      setIsSubmitting(false);
    }
  }, [testId, answers, router, isSubmitting]);

  // 3. Timer Effect
  useEffect(() => {
    if (loading || isSubmitting) return;
    if (timeLeft <= 0) {
      handleFinalSubmit();
      return;
    }
    const timer = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    return () => clearInterval(timer);
  }, [timeLeft, loading, isSubmitting, handleFinalSubmit]);

  // 4. Anti-Cheat
  // useEffect(() => {
  //   const handleSecurityBreach = () => {
  //     if (document.hidden) {
  //       alert("🚨 SECURITY ALERT: Tab switching detected.");
  //       router.push("/dashboard?status=failed_by_cheat");
  //     }
  //   };
  //   document.addEventListener("visibilitychange", handleSecurityBreach);
  //   return () => document.removeEventListener("visibilitychange", handleSecurityBreach);
  // }, [router]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  if (loading) {
    return (
      <div className="h-screen bg-[#050505] flex flex-col items-center justify-center p-6 text-center">
        <div className="w-12 h-12 border-4 border-blue-500/20 border-t-blue-500 rounded-full animate-spin mb-4" />
        <p className="text-blue-500 font-mono tracking-widest text-xs uppercase">Initializing Secure Protocol</p>
      </div>
    );
  }

  const currentQ = questions[currentIdx];

  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center p-4 md:p-6 lg:p-10">
      
      {/* ⚡ Top Navigation Bar - FIXED OVERLAP */}
      <div className="w-full max-w-5xl flex flex-col sm:flex-row justify-between items-center gap-4 mb-6 bg-white/5 p-4 rounded-2xl border border-white/10 backdrop-blur-md">
        <div className="flex items-center gap-3 w-full sm:w-auto justify-start">
          <div className="p-2 bg-blue-500/20 rounded-lg shrink-0">
            <Shield className="text-blue-400 w-5 h-5" />
          </div>
          <span className="font-mono text-[10px] sm:text-xs text-gray-400 truncate tracking-tighter">
            ENCRYPTED: {testId.slice(0, 12)}...
          </span>
        </div>

        {/* Dynamic Timer UI - responsive padding & font */}
        <div className={`flex items-center gap-3 px-4 py-2 rounded-xl border transition-all shrink-0 ${timeLeft < 60 ? "bg-red-500/20 border-red-500 animate-pulse" : "bg-white/5 border-white/10"}`}>
          <Timer className={`w-4 h-4 ${timeLeft < 60 ? "text-red-500" : "text-blue-400"}`} />
          <span className={`font-mono text-lg sm:text-xl font-bold ${timeLeft < 60 ? "text-red-500" : "text-white"}`}>
            {formatTime(timeLeft)}
          </span>
        </div>
      </div>

      {/* 📝 Main Quiz Card */}
      <motion.div 
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        className="w-full max-w-5xl bg-[#0a0a0a] border border-white/10 p-5 md:p-10 rounded-[2rem] shadow-2xl"
      >
        {/* Header Section */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="space-y-1">
            <span className="text-blue-500 font-bold text-[10px] tracking-widest uppercase">System Assessment</span>
            <h1 className="text-2xl md:text-3xl font-light">
              Challenge <span className="font-bold">{currentIdx + 1}</span> 
              <span className="text-gray-500 text-lg ml-2">/ {questions.length}</span>
            </h1>
          </div>
          <div className="w-full md:w-48">
            <div className="flex justify-between text-[10px] text-gray-500 uppercase mb-2 tracking-widest">
              <span>Progress</span>
              <span>{Math.round(((currentIdx + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
               <motion.div 
                 initial={{ width: 0 }}
                 animate={{ width: `${((currentIdx + 1) / questions.length) * 100}%` }}
                 className="h-full bg-gradient-to-r from-blue-600 to-cyan-400"
               />
            </div>
          </div>
        </div>

        {/* Question Area */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIdx}
            initial={{ opacity: 0, x: 10 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -10 }}
            className="space-y-8 min-h-[250px]"
          >
            <h2 className="text-xl md:text-2xl font-medium text-gray-100 leading-snug">
              {currentQ?.question}
            </h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 md:gap-4">
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
                    className={`flex items-center text-left p-4 md:p-5 rounded-2xl border-2 transition-all duration-200 ${
                      isSelected 
                      ? "bg-blue-600 border-blue-400 text-white shadow-lg" 
                      : "bg-white/[0.03] border-white/5 hover:border-white/20 text-gray-400"
                    }`}
                  >
                    <span className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-xl mr-4 font-bold text-sm transition-colors ${isSelected ? "bg-white text-blue-600" : "bg-white/5"}`}>
                      {label}
                    </span>
                    <span className="text-sm md:text-base font-medium leading-tight">{opt}</span>
                  </button>
                );
              })}
            </div>
          </motion.div>
        </AnimatePresence>

        {/* 🎮 Controls - Responsive Button Stack */}
        <div className="flex flex-col-reverse sm:flex-row justify-between items-center mt-12 pt-6 border-t border-white/5 gap-4">
          <button 
            disabled={currentIdx === 0}
            onClick={() => setCurrentIdx(currentIdx - 1)}
            className="w-full sm:w-auto flex items-center justify-center gap-2 text-gray-500 hover:text-white font-semibold py-2 transition-all disabled:opacity-0"
          >
            <ChevronLeft className="w-5 h-5" /> Previous
          </button>

          <div className="flex w-full sm:w-auto gap-3">
            {currentIdx === questions.length - 1 ? (
              <button 
                onClick={handleFinalSubmit}
                disabled={isSubmitting}
                className="w-full sm:px-8 py-4 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-500 transition-all disabled:opacity-50"
              >
                {isSubmitting ? "SUBMITTING..." : "FINISH TEST"}
              </button>
            ) : (
              <button 
                onClick={() => {
                  if (!answers[currentIdx]) return alert("Select an option!");
                  setCurrentIdx(currentIdx + 1);
                }}
                className="w-full sm:px-8 py-4 bg-white text-black font-bold rounded-xl hover:bg-gray-200 transition-all flex items-center justify-center gap-2"
              >
                Next <ChevronRight className="w-5 h-5" />
              </button>
            )}
          </div>
        </div>
      </motion.div>
      
      <p className="mt-8 text-gray-600 text-[10px] font-mono tracking-widest uppercase text-center">
        Secure Protocol v4.0 • Active Monitoring
      </p>
    </div>
  );
}