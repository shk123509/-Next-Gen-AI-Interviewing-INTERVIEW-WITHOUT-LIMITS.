"use client";

import { useEffect, useState, useRef } from "react";
import { toPng } from "html-to-image"; // Much better than html2canvas
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

      // 1. Wait for fonts to be ready so text doesn't look weird
      await document.fonts.ready;

      // 2. Generate the image using html-to-image (supports 'lab' colors)
      const dataUrl = await toPng(element, {
        cacheBust: true,
        pixelRatio: 2, // High quality
        backgroundColor: "#ffffff",
        style: {
          transform: "scale(1)", // Ensure it captures at full size
          filter: "none",
          opacity: "1",
        },
      });

      // 3. Create the PDF
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "mm",
        format: "a4",
      });

      // A4 Landscape is 297x210mm. We add a small margin.
      pdf.addImage(dataUrl, "PNG", 10, 10, 277, 190);
      pdf.save(`${certificate.username || "certificate"}.pdf`);

    } catch (error) {
      console.error("Download error:", error);
      alert("Failed to generate certificate. Please try again.");
    }
  };

  if (!certificate) {
    return (
      <div className="flex items-center justify-center h-screen text-xl">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-10">
      <div className="relative">
        
        {/* CERTIFICATE AREA */}
        <div
          ref={certRef}
          className={`transition-all duration-700 transform ${
            !unlocked ? "opacity-50 scale-95" : "scale-100"
          } bg-white border-[12px] border-yellow-400 shadow-2xl rounded-xl p-14 w-[900px] text-center`}
          // We use inline styles for colors as a "safety net"
          style={{ backgroundColor: '#ffffff', borderColor: '#facc15' }}
        >
          <h1 className="text-5xl font-bold text-gray-800 mb-6" style={{ color: '#1f2937' }}>
            Certificate of Achievement
          </h1>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed max-w-2xl mx-auto">
  This certificate is proudly awarded to{" "}
  <span className="font-semibold text-indigo-600">
    {certificate.username}
  </span>{" "}
  in recognition of exceptional dedication, consistent performance, and
  successful completion of the{" "}
  <span className="font-semibold">
    AI Voice Interview Mastery Program
  </span>.
  
  <br /><br />
  
  This achievement reflects strong problem-solving ability, effective communication,
  and the confidence to excel in real-world AI-driven interview environments.
</p>

          <h2 className="text-6xl font-extrabold text-indigo-600 mb-10" style={{ color: '#4f46e5' }}>
            {certificate.username}
          </h2>

          <p className="text-gray-600 text-lg mb-6 leading-relaxed max-w-xl mx-auto">
            In recognition of outstanding dedication and successful completion
            of the{" "}
            <span className="font-semibold">
              AI Voice Interview Mastery Program
            </span>.
          </p>

          <h3 className="text-3xl font-semibold text-gray-800 mb-12">
            {certificate.course}
          </h3>

          <div className="flex justify-between items-center mt-12 text-gray-700">
            <div>
              <p className="text-sm text-gray-500">Issued Date</p>
              <p className="font-semibold">{certificate.issuedDate}</p>
            </div>

            <div className="text-center">
              <div className="border-t border-gray-300 w-40 mx-auto mb-2"></div>
              <p className="italic text-lg">{certificate.username}</p>
              <p className="text-sm text-gray-500">Authorized Signature</p>
            </div>

            <div>
              <p className="text-sm text-gray-500">Certificate ID</p>
              <p className="font-semibold">{certificate.certificateId}</p>
            </div>
          </div>
        </div>

        {/* LOCK OVERLAY */}
        {!unlocked && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 rounded-xl">
            <h2 className="text-white text-2xl font-semibold mb-6 text-center">
              🎓 Have you completed the AI Interview?
            </h2>
            <button
              onClick={() => setUnlocked(true)}
              className="bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg"
            >
              Yes, I Completed
            </button>
          </div>
        )}
      </div>

      {unlocked && (
        <button
          onClick={downloadCertificate}
          className="mt-10 bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg text-lg shadow-lg transition transform hover:scale-105"
        >
          ⬇ Download Certificate
        </button>
      )}
    </div>
  );
}