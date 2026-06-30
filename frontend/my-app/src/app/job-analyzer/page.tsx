"use client";

import { useState } from "react";

export default function JobAnalyzerPage() {
  const [file, setFile] = useState<File | null>(null);
  const [jobDescription, setJobDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const handleAnalyze = async () => {
    if (!jobDescription.trim()) {
      alert("Please enter Job Description");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append(
        "jobDescription",
        jobDescription
      );

      if (file) {
        formData.append("resume", file);
      }

      const res = await fetch(
        "/api/job-analyzer",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await res.json();

      if (!res.ok) {
        throw new Error(
          data.error || "Something went wrong"
        );
      }

      setResult(data);
    } catch (err: any) {
      alert(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white p-6">
      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold mb-2">
          AI Job Description Analyzer
        </h1>

        <p className="text-slate-400 mb-8">
          Upload Resume + Paste Job Description
        </p>

        {/* Upload Card */}

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800 mb-6">

          <label className="block text-lg font-semibold mb-3">
            Upload Resume PDF
          </label>

          <input
            type="file"
            accept=".pdf"
            onChange={(e) => {
              if (e.target.files?.[0]) {
                setFile(e.target.files[0]);
              }
            }}
            className="w-full"
          />

          {file && (
            <div className="mt-4 p-3 rounded-lg bg-green-900/20 border border-green-500">
              <p>
                📄 {file.name}
              </p>
            </div>
          )}
        </div>

        {/* JD */}

        <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

          <label className="block text-lg font-semibold mb-3">
            Job Description
          </label>

          <textarea
            value={jobDescription}
            onChange={(e) =>
              setJobDescription(
                e.target.value
              )
            }
            placeholder="Paste Job Description..."
            className="w-full h-60 rounded-xl bg-slate-800 p-4 outline-none"
          />
        </div>

        {/* Button */}

        <button
          onClick={handleAnalyze}
          disabled={loading}
          className="mt-6 px-6 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 font-semibold"
        >
          {loading
            ? "Analyzing..."
            : "Analyze Resume"}
        </button>

        {/* Results */}

        {result && (
          <div className="mt-10 space-y-6">

            {/* Score */}

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">

              <h2 className="text-xl font-bold mb-3">
                Match Score
              </h2>

              <div className="text-5xl font-bold text-green-400">
                {result.matchScore}%
              </div>

              <div className="w-full h-4 bg-slate-700 rounded-full mt-4 overflow-hidden">
                <div
                  className="h-full bg-green-500"
                  style={{
                    width: `${result.matchScore}%`,
                  }}
                />
              </div>
            </div>

            {/* Required Skills */}

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h2 className="text-xl font-bold mb-4">
                Required Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {result.requiredSkills?.map(
                  (
                    skill: string,
                    i: number
                  ) => (
                    <span
                      key={i}
                      className="px-3 py-2 rounded-full bg-blue-600"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Missing Skills */}

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h2 className="text-xl font-bold mb-4 text-red-400">
                Missing Skills
              </h2>

              <div className="flex flex-wrap gap-2">
                {result.missingSkills?.map(
                  (
                    skill: string,
                    i: number
                  ) => (
                    <span
                      key={i}
                      className="px-3 py-2 rounded-full bg-red-600"
                    >
                      {skill}
                    </span>
                  )
                )}
              </div>
            </div>

            {/* Strengths */}

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h2 className="text-xl font-bold mb-4 text-green-400">
                Strengths
              </h2>

              <ul className="space-y-2">
                {result.strengths?.map(
                  (
                    item: string,
                    i: number
                  ) => (
                    <li key={i}>
                      ✅ {item}
                    </li>
                  )
                )}
              </ul>
            </div>

            {/* Interview Questions */}

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h2 className="text-xl font-bold mb-4">
                Expected Interview Questions
              </h2>

              <ol className="space-y-3 list-decimal pl-5">
                {result.interviewQuestions?.map(
                  (
                    q: string,
                    i: number
                  ) => (
                    <li key={i}>
                      {q}
                    </li>
                  )
                )}
              </ol>
            </div>

            {/* Improvement Plan */}

            <div className="bg-slate-900 rounded-2xl p-6 border border-slate-800">
              <h2 className="text-xl font-bold mb-4">
                Improvement Plan
              </h2>

              <ul className="space-y-3">
                {result.improvementPlan?.map(
                  (
                    item: string,
                    i: number
                  ) => (
                    <li key={i}>
                      🚀 {item}
                    </li>
                  )
                )}
              </ul>
            </div>

          </div>
        )}
      </div>
    </div>
  );
}