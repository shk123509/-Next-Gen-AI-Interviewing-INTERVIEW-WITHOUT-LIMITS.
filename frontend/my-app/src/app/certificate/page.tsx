"use client";

import { useEffect, useState, useRef } from "react";
import { toPng } from "html-to-image";
import jsPDF from "jspdf";

export default function CertificatePage() {
  const [certificate, setCertificate] = useState<any>(null);
  const [unlocked, setUnlocked] = useState(false);
  const certRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchCertificate = async () => {
      try {
        const res = await fetch("/api/certificate", { method: "POST" });
        const data = await res.json();
        if (data.success) setCertificate(data.certificate);
      } catch (err) {
        console.error("Fetch error:", err);
      }
    };
    fetchCertificate();
  }, []);

  const downloadCertificate = async () => {
    if (!certRef.current || !certificate || !unlocked) return;

    try {
      const element = certRef.current;
      await document.fonts.ready;

      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 3, // Increased for mobile clarity
        backgroundColor: "#ffffff",
        style: {
          transform: "scale(1)",
          filter: "none",
          opacity: "1",
        },
      });

      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      pdf.addImage(dataUrl, "PNG", 10, 10, 277, 190);
      pdf.save(`${certificate.username || "certificate"}.pdf`);

    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to generate certificate. Please try again.");
    }
  };

  if (!certificate) {
    return (
      <div className="flex items-center justify-center h-screen text-indigo-600 font-bold animate-pulse">
        Generating your achievement...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-4 md:p-10 overflow-x-hidden">
      
      {/* MOBILE WARNING / TIP */}
      <p className="md:hidden text-gray-400 text-[10px] mb-4 uppercase tracking-widest font-bold italic">
        Scroll horizontally to preview →
      </p>

      <div className="relative w-full max-w-[900px] overflow-x-auto pb-6 no-scrollbar">
        
        {/* CERTIFICATE AREA - Wrapped in a div that maintains width */}
        <div className="min-w-[850px] md:min-w-0 flex justify-center">
            <div
            ref={certRef}
            className={`transition-all duration-700 transform ${
                !unlocked ? "opacity-40 blur-sm scale-[0.98]" : "scale-100"
            } bg-white border-[8px] md:border-[12px] border-yellow-400 shadow-2xl rounded-xl p-8 md:p-14 w-[850px] md:w-[900px] text-center relative overflow-hidden`}
            style={{ backgroundColor: '#ffffff', borderColor: '#facc15' }}
            >
            
            {/* Decorative Background Element */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-400/10 rounded-bl-full -z-0" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-indigo-600/5 rounded-tr-full -z-0" />

            <h1 className="text-4xl md:text-5xl font-black text-gray-800 mb-6 uppercase tracking-tight" style={{ color: '#1f2937' }}>
                Certificate <span className="text-indigo-600">of Achievement</span>
            </h1>

            <div className="w-24 h-1 bg-yellow-400 mx-auto mb-8" />

            <p className="text-gray-600 text-base md:text-lg mb-8 leading-relaxed max-w-2xl mx-auto italic">
                This certificate is proudly awarded to
            </p>

            <h2 className="text-5xl md:text-7xl font-extrabold text-indigo-600 mb-8 drop-shadow-sm uppercase tracking-tighter" style={{ color: '#4f46e5' }}>
                {certificate.username}
            </h2>

            <p className="text-gray-600 text-sm md:text-base mb-10 leading-relaxed max-w-2xl mx-auto px-4">
                In recognition of exceptional dedication, consistent performance, and
                successful completion of the <br />
                <span className="font-bold text-gray-800 uppercase tracking-wide">
                AI Voice Interview Mastery Program
                </span>
            </p>

            <div className="flex justify-between items-end mt-16 text-gray-700 px-4 md:px-10">
                <div className="text-left">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Issued Date</p>
                <p className="font-bold text-sm md:text-base">{certificate.issuedDate}</p>
                </div>

                <div className="text-center pb-2">
                <div className="border-t-2 border-indigo-600 w-32 md:w-48 mx-auto mb-3"></div>
                <p className="font-serif italic text-xl md:text-2xl text-gray-800">{certificate.username}</p>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest mt-1">Authorized Signature</p>
                </div>

                <div className="text-right">
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-widest">Certificate ID</p>
                <p className="font-bold text-xs md:text-sm font-mono">{certificate.certificateId}</p>
                </div>
            </div>
            </div>
        </div>

        {/* LOCK OVERLAY */}
        {!unlocked && (
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-slate-900/80 backdrop-blur-md rounded-xl p-6 text-center">
            <div className="bg-white/10 p-4 rounded-full mb-6">
                <span className="text-4xl">🎓</span>
            </div>
            <h2 className="text-white text-xl md:text-2xl font-black mb-6 uppercase tracking-tighter italic">
              Interview Complete?
            </h2>
            <button
              onClick={() => setUnlocked(true)}
              className="bg-indigo-600 hover:bg-indigo-500 text-white px-10 py-4 rounded-2xl text-sm font-black uppercase tracking-widest shadow-2xl transition-all active:scale-95"
            >
              Unlock Certificate
            </button>
          </div>
        )}
      </div>

      {unlocked && (
        <button
          onClick={downloadCertificate}
          className="mt-8 bg-emerald-600 hover:bg-emerald-500 text-white px-10 py-5 rounded-2xl text-sm font-black uppercase tracking-[0.2em] shadow-xl transition transform hover:-translate-y-1 active:scale-95 flex items-center gap-3"
        >
          <span>⬇</span> Download High-Res PDF
        </button>
      )}

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </div>
  );
}