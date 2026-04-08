"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Mic, Brain, Square, Sparkles, Loader2, ChevronRight, Video, VideoOff, Award } from "lucide-react";
import Link from "next/link"; // Link import kiya redirect ke liye

export default function InterviewPage() {
  // ... (Baaki saara state aur logic same rahega)
  const [hasStarted, setHasStarted] = useState(false);
  const [messages, setMessages] = useState<{ role: string, text: string }[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [isAiSpeaking, setIsAiSpeaking] = useState(false);
  const [camEnabled, setCamEnabled] = useState(true);

  const videoRef = useRef<HTMLVideoElement>(null);
  const audioRef = useRef<HTMLAudioElement>(null);
  const recognitionRef = useRef<any>(null);

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
      if (videoRef.current) { videoRef.current.srcObject = stream; }
    } catch (err) { console.error("Camera access denied", err); }
  };

  useEffect(() => { if (hasStarted) startCamera(); }, [hasStarted]);

  useEffect(() => {
    const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';
      recognitionRef.current.onresult = (e: any) => {
        handleAIInteraction(e.results[0][0].transcript);
        stopMic();
      };
      recognitionRef.current.onend = () => setIsListening(false);
    }
  }, []);

  const startMic = () => { if (!isAiSpeaking && !isLoading) { setIsListening(true); recognitionRef.current?.start(); } };
  const stopMic = () => { setIsListening(false); recognitionRef.current?.stop(); };

  const handleAIInteraction = async (userText: string | null = null) => {
    setIsLoading(true);
    try {
      const apiKey = localStorage.getItem("geminiApiKey");
      const res = await fetch("http://127.0.0.1:8000/interview", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          message: userText,
          apiKey: apiKey, // 👈 ADD THIS
        }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: 'ai', text: data.text }]);
      if (data.audio) {
        const blob = new Blob([Uint8Array.from(atob(data.audio), c => c.charCodeAt(0))], { type: 'audio/wav' });
        if (audioRef.current) {
          audioRef.current.src = URL.createObjectURL(blob);
          setIsAiSpeaking(true);
          audioRef.current.play();
        }
      }
    } catch (err) { console.error(err); } finally { setIsLoading(false); }
  };

  return (
    <div className="min-h-screen bg-[#020617] text-white overflow-y-auto">
      <audio ref={audioRef} onEnded={() => setIsAiSpeaking(false)} />

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <motion.div
            key="intro"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0, y: -20 }}
            className="flex flex-col items-center justify-center min-h-screen p-6 text-center pt-32"
          >
            <motion.div animate={{ scale: [1, 1.1, 1] }} transition={{ repeat: Infinity, duration: 3 }} className="w-20 h-20 bg-indigo-600 rounded-2xl flex items-center justify-center mb-8">
              <Brain size={40} />
            </motion.div>
            <h1 className="text-5xl md:text-6xl font-black mb-6 tracking-tighter">AI TECHNICAL ROUND</h1>
            <p className="text-slate-400 max-w-md mb-10 italic">"Please ensure your environment is quiet before starting."</p>
            <button
              onClick={() => { setHasStarted(true); handleAIInteraction(); }}
              className="bg-white text-black px-12 py-4 rounded-2xl font-black text-lg hover:bg-indigo-500 hover:text-white transition-all shadow-xl shadow-white/5"
            >
              START INTERVIEW
            </button>
          </motion.div>
        ) : (
          <motion.div
            key="room"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            className="max-w-7xl mx-auto p-6 pt-28 grid grid-cols-1 lg:grid-cols-12 gap-8"
          >
            {/* LEFT SIDE (Video & Transcript) */}
            <div className="lg:col-span-8 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="relative aspect-video bg-slate-900 rounded-[2rem] overflow-hidden border border-white/10 group">
                  <video ref={videoRef} autoPlay playsInline muted className="w-full h-full object-cover -scale-x-100" />
                  <div className="absolute top-4 left-4 flex gap-2">
                    <div className="bg-red-500 w-2 h-2 rounded-full animate-ping mt-1.5" />
                    <span className="text-[10px] font-bold uppercase tracking-widest">Candidate Feed</span>
                  </div>
                </div>

                <div className="relative aspect-video bg-indigo-950/10 rounded-[2rem] border border-indigo-500/20 flex flex-col items-center justify-center">
                  <div className="flex items-center gap-1.5 h-12">
                    {[...Array(10)].map((_, i) => (
                      <motion.div
                        key={i}
                        animate={isAiSpeaking ? { height: [10, 40, 10] } : { height: 4 }}
                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.05 }}
                        className="w-1.5 bg-indigo-500 rounded-full"
                      />
                    ))}
                  </div>
                  <p className="mt-4 text-[10px] font-black text-indigo-400 uppercase tracking-widest">AI Interviewer</p>
                </div>
              </div>

              <div className="bg-slate-900/50 backdrop-blur-md border border-white/5 p-8 md:p-12 rounded-[2.5rem] min-h-[250px] shadow-2xl relative">
                <div className="absolute -top-3 left-10 bg-indigo-600 px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest">Question</div>
                {isLoading ? (
                  <div className="flex items-center gap-3 text-indigo-400 font-bold"><Loader2 className="animate-spin" /> Thinking...</div>
                ) : (
                  <p className="text-xl md:text-3xl font-medium leading-relaxed text-slate-100">
                    {messages[messages.length - 1]?.text || "Initializing session..."}
                  </p>
                )}
              </div>
            </div>

            {/* RIGHT SIDE (Controls & NEW CERTIFICATE BUTTON) */}
            <div className="lg:col-span-4 flex flex-col gap-6">
              <div className="bg-slate-900/80 rounded-[2.5rem] border border-white/5 p-8 flex flex-col items-center justify-center text-center flex-1">
                <motion.button
                  whileTap={{ scale: 0.9 }}
                  onClick={isListening ? stopMic : startMic}
                  disabled={isAiSpeaking || isLoading}
                  className={`w-24 h-24 rounded-full flex items-center justify-center transition-all shadow-2xl ${isListening ? 'bg-red-500 shadow-red-500/20 animate-pulse' : 'bg-indigo-600 shadow-indigo-500/20 hover:bg-indigo-500'}`}
                >
                  {isListening ? <Square size={32} fill="white" /> : <Mic size={32} />}
                </motion.button>
                <p className="mt-6 font-bold text-slate-400 uppercase text-xs tracking-widest">
                  {isListening ? "I'm listening..." : "Tap to answer"}
                </p>
              </div>

              {/* --- CERTIFICATE REDIRECT BUTTON (NEW) --- */}
              <Link href="/certificate">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="bg-gradient-to-r from-amber-500/10 via-amber-500/20 to-amber-500/10 border border-amber-500/30 p-6 rounded-[2rem] flex items-center gap-4 cursor-pointer group shadow-lg shadow-amber-500/5"
                >
                  <div className="w-12 h-12 bg-amber-500/20 rounded-xl flex items-center justify-center text-amber-500">
                    <Award size={24} />
                  </div>
                  <div className="flex-1">
                    <p className="text-[10px] font-black text-amber-500 uppercase tracking-widest">Achievement Unlocked</p>
                    <p className="text-sm font-bold text-slate-200">CLAIM CERTIFICATE</p>
                  </div>
                  <ChevronRight className="text-amber-500 group-hover:translate-x-1 transition-transform" size={20} />
                </motion.div>
              </Link>

              {/* FINISH BUTTON */}
              <div className="bg-indigo-600 p-8 rounded-[2.5rem] flex items-center justify-between group cursor-pointer active:scale-95 transition-all">
                <div>
                  <p className="text-[10px] font-black uppercase opacity-60 tracking-widest">Status</p>
                  <p className="text-xl font-black">FINISH INTERVIEW</p>
                </div>
                <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center group-hover:bg-white/30 transition-all">
                  <ChevronRight />
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}