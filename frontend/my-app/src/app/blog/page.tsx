"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Search, Rocket, Calendar, ArrowRight, Zap, Brain, Shield, Sparkles, ChevronRight } from "lucide-react";

// --- ADVANCED CONTENT DATA ---
const categories = ["All Insights", "AI Models", "Career Growth", "Engineering", "Case Studies"];

const blogPosts = [
  {
    id: 1,
    title: "The Neural Network of Modern Hiring: How Our AI Thinks",
    category: "AI Models",
    excerpt: "Exploring the multi-modal transformer architecture that analyzes human speech patterns and intent in under 100ms.",
    author: "Alex Rivera",
    date: "March 2026",
    imageUrl: "https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800",
    readTime: "12 min",
    featured: true,
  },
  {
    id: 2,
    title: "Cracking the Code: 2026 Salary Trends in AI Tech",
    category: "Career Growth",
    excerpt: "Data-driven insights into why prompt engineers and AI trainers are seeing a 40% salary hike this quarter.",
    author: "Sarah Chen",
    date: "Feb 2026",
    imageUrl: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800",
    readTime: "8 min",
  },
  {
    id: 3,
    title: "Why Traditional Interviews are Dying a Slow Death",
    category: "Case Studies",
    excerpt: "How automated simulation-based grading is replacing the awkward 1-on-1 zoom calls of the past decade.",
    author: "Marco V.",
    date: "Jan 2026",
    imageUrl: "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=800",
    readTime: "10 min",
  }
];

export default function BlogPage() {
  const [activeTab, setActiveTab] = useState("All Insights");

  return (
    <div className="min-h-screen bg-[#050505] text-white selection:bg-indigo-500/30">
      
      {/* --- 1. AMBIENT BACKGROUND GLOWS --- */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[10%] right-[-5%] w-[30%] h-[30%] bg-purple-600/10 blur-[100px] rounded-full" />
      </div>

      {/* --- 2. LUXURY NAVIGATION / HERO --- */}
      <header className="relative pt-32 pb-20 px-6 overflow-hidden">
        <div className="max-w-7xl mx-auto text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-8"
          >
            <Sparkles className="text-yellow-400 w-4 h-4" />
            <span className="text-sm font-medium tracking-wide text-gray-300">The Intelligence Ledger v2.0</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-7xl md:text-9xl font-black tracking-tighter mb-8 bg-gradient-to-b from-white to-gray-500 bg-clip-text text-transparent"
          >
            FUTURE <br /> <span className="italic font-serif">JOURNAL.</span>
          </motion.h1>

          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="max-w-2xl mx-auto text-gray-400 text-lg md:text-xl leading-relaxed mb-12"
          >
            Explore the intersection of human talent and artificial intelligence. Bhut jida high-quality content specifically for the next generation of top-tier candidates.
          </motion.p>
        </div>
      </header>

      {/* --- 3. STICKY GLASS CATEGORIES --- */}
      <nav className="sticky top-6 z-50 max-w-fit mx-auto mb-20 px-4 py-2 bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full shadow-2xl">
        <div className="flex items-center gap-1">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveTab(cat)}
              className={`px-6 py-2 rounded-full text-sm font-bold transition-all duration-300 ${
                activeTab === cat ? "bg-indigo-600 text-white shadow-[0_0_20px_rgba(79,70,229,0.4)]" : "text-gray-400 hover:text-white"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 pb-40">
        
        {/* --- 4. FEATURED "GIGANTIC" CARD --- */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="group relative grid lg:grid-cols-2 gap-0 rounded-[2.5rem] overflow-hidden border border-white/10 bg-white/[0.02] hover:bg-white/[0.04] transition-colors mb-32"
        >
          <div className="relative h-[500px] lg:h-full overflow-hidden">
            <img 
              src={blogPosts[0].imageUrl} 
              alt="Featured" 
              className="w-full h-full object-cover grayscale-[0.5] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-[#050505] via-transparent to-transparent lg:block hidden" />
          </div>
          <div className="p-12 lg:p-20 flex flex-col justify-center">
            <div className="flex items-center gap-4 mb-6">
              <span className="px-3 py-1 rounded-md bg-indigo-500/20 text-indigo-400 text-xs font-bold tracking-widest uppercase">Editor's Choice</span>
              <span className="text-gray-500 text-sm font-medium">12 Min Read</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-bold mb-6 leading-tight group-hover:text-indigo-400 transition">
              {blogPosts[0].title}
            </h2>
            <p className="text-gray-400 text-lg mb-10 leading-relaxed">
              {blogPosts[0].excerpt}
            </p>
            <div className="flex items-center gap-4">
              <button className="flex items-center gap-3 bg-white text-black px-8 py-4 rounded-full font-bold hover:scale-105 transition active:scale-95">
                Read Article <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </motion.div>

        {/* --- 5. CONTENT GRID (Animated) --- */}
        <div className="grid md:grid-cols-2 gap-8">
          <AnimatePresence mode="wait">
            {blogPosts.slice(1).map((post, idx) => (
              <motion.article
                key={post.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ delay: idx * 0.1 }}
                viewport={{ once: true }}
                className="group p-8 rounded-[2rem] bg-white/[0.03] border border-white/10 hover:border-indigo-500/50 transition-all shadow-2xl"
              >
                <div className="aspect-video rounded-2xl overflow-hidden mb-8 relative">
                  <img src={post.imageUrl} className="w-full h-full object-cover group-hover:scale-110 transition duration-700" />
                  <div className="absolute inset-0 bg-black/20" />
                </div>
                <div className="space-y-4">
                  <div className="flex justify-between items-center text-xs font-bold text-indigo-400 uppercase tracking-widest">
                    <span>{post.category}</span>
                    <span className="text-gray-500">{post.date}</span>
                  </div>
                  <h3 className="text-3xl font-bold leading-snug">{post.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{post.excerpt}</p>
                  <div className="pt-6 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-indigo-600 to-purple-600" />
                      <span className="text-sm font-medium">{post.author}</span>
                    </div>
                    <button className="p-3 rounded-full border border-white/10 group-hover:bg-white group-hover:text-black transition">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* --- 6. FUTURISTIC STATS (Bhut Jida Content) --- */}
        <section className="mt-40 grid md:grid-cols-4 gap-8">
            {[
                { icon: <Brain />, label: "Algorithms", val: "420+" },
                { icon: <Zap />, label: "Processing", val: "0.2ms" },
                { icon: <Shield />, label: "Security", val: "AES-256" },
                { icon: <Rocket />, label: "Hired", val: "12K+" },
            ].map((stat, i) => (
                <div key={i} className="p-8 rounded-[2rem] bg-indigo-600/5 border border-indigo-500/20 text-center group hover:bg-indigo-600/10 transition">
                    <div className="text-indigo-500 mb-4 flex justify-center">{stat.icon}</div>
                    <div className="text-3xl font-black mb-1">{stat.val}</div>
                    <div className="text-gray-500 text-xs font-bold uppercase tracking-widest">{stat.label}</div>
                </div>
            ))}
        </section>

        {/* --- 7. BOLD NEWSLETTER --- */}
        <section className="mt-40 relative rounded-[3rem] p-12 md:p-24 overflow-hidden border border-white/10">
          <div className="absolute inset-0 bg-indigo-600 opacity-5" />
          <div className="relative z-10 grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-bold mb-6">Stay ahead of the <br /> <span className="text-indigo-500 underline decoration-2 underline-offset-8">AI Curve.</span></h2>
              <p className="text-gray-400 text-lg">Join 50,000+ professionals receiving weekly intelligence on AI hiring behavior and engineering breakthroughs.</p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <input 
                type="email" 
                placeholder="Enter your enterprise email" 
                className="flex-1 px-8 py-5 rounded-2xl bg-white/5 border border-white/10 focus:outline-none focus:border-indigo-500 transition"
              />
              <button className="bg-indigo-600 px-10 py-5 rounded-2xl font-bold shadow-[0_0_30px_rgba(79,70,229,0.3)] hover:bg-indigo-500 transition">Subscribe</button>
            </div>
          </div>
        </section>
      </main>

      <footer className="py-20 border-t border-white/5 text-center text-gray-600">
        <p className="text-sm font-medium tracking-widest uppercase mb-4">AI Interview Intelligence Platform</p>
        <p className="text-xs">© 2026. Designed for the builders of tomorrow. Bhut aacha platform.</p>
      </footer>
    </div>
  );
}