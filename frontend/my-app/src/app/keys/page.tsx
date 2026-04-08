"use client";
import { useRouter } from "next/router";
import { useState } from "react";

export default function Page() {

    const router = useRouter();
    
  const [key, setKey] = useState("");
  const [loading, setLoading] = useState(false);

  const saveKey = async () => {
    setLoading(true);


    const res = await fetch("/api/save-key", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ geminiApiKey: key }),
    });

    const data = await res.json();

    if (data.success) {
      localStorage.setItem("geminiApiKey", data.key);
      alert("Key Saved ✅");
      setKey("");
      router.push("/")
    } else {

        console.log(data)
      alert("Error ❌");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 text-white">
      
      <div className="bg-gray-800 p-8 rounded-2xl shadow-lg w-full max-w-md">
        
        <h1 className="text-2xl font-bold mb-6 text-center">
          🔐 Save Gemini API Key
        </h1>

        <input
          type="text"
          placeholder="Enter your API key..."
          value={key}
          onChange={(e) => setKey(e.target.value)}
          className="w-full p-3 rounded-lg bg-gray-700 outline-none mb-4 focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={saveKey}
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 transition p-3 rounded-lg font-semibold"
        >
          {loading ? "Saving..." : "Save Key"}
        </button>

      </div>

    </div>
  );
}