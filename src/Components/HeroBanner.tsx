'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

const ROTATING_TAGS = [
  "Global Supply Infrastructures",
  "Semiconductor Fabrication Labs",
  "Heavy Maritime Cargo Hubs",
  "Aerospace Component Chains"
];

export default function HeroBanner() {
  const [tagIndex, setTagIndex] = useState(0);

  // Smooth typing/rotating sub-header effect
  useEffect(() => {
    const interval = setInterval(() => {
      setTagIndex((prev) => (prev + 1) % ROTATING_TAGS.length);
    }, 3500);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="relative min-h-[70vh] flex flex-col items-center justify-center text-center p-5 overflow-hidden bg-slate-950 text-white border-b border-slate-800">
      
      {/* Background Cyber Grid Effect & Glow */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-25 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[250px] bg-teal-500/20 blur-[120px] rounded-full pointer-events-none" />

      {/* Live Indicator Pill */}
      <div className="relative z-10 inline-flex items-center gap-2 px-3.5 py-1.5 mb-6 rounded-full bg-teal-950/80 border border-teal-500/30 text-teal-300 text-xs font-medium shadow-inner backdrop-blur-md">
        <span className="w-2 h-2 rounded-full bg-teal-400 animate-ping" />
        <span className="w-2 h-2 rounded-full bg-teal-500 absolute" />
        <span className="ml-1 tracking-wide font-semibold">Autonomous Neural Risk Matrix v2.4 Active</span>
      </div>

      {/* Main Catchy Headline */}
      <h1 className="relative z-10 text-4xl sm:text-5xl md:text-6xl font-extrabold tracking-tight max-w-4xl leading-[1.15]">
        Autonomous Risk Intelligence for <br className="hidden sm:inline" />
        <span className="bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent transition-all duration-500">
          {ROTATING_TAGS[tagIndex]}
        </span>
      </h1>

      {/* Description */}
      <p className="relative z-10 mt-6 text-base md:text-lg text-slate-400 max-w-2xl font-light leading-relaxed">
        Deploy deep agentic systems tracking transit volatile delays, safety compliance vectors, and localized manufacturing anomalies instantly.
      </p>

      {/* Interactive CTA Action Group */}
      <div className="relative z-10 mt-9 flex flex-col sm:flex-row items-center gap-4 w-full sm:w-auto">
        <Link 
          href="/explore" 
          className="w-full sm:w-auto group relative inline-flex items-center justify-center bg-teal-600 hover:bg-teal-500 text-white font-medium px-8 py-3.5 rounded-xl transition-all shadow-lg shadow-teal-900/30 text-sm overflow-hidden active:scale-95"
        >
          <span className="absolute inset-0 bg-white/10 translate-y-full group-hover:translate-y-0 transition-transform duration-300" />
          <span className="relative flex items-center gap-2">
            Explore Supplier Index 
            <span className="group-hover:translate-x-1 transition-transform">→</span>
          </span>
        </Link>

        <Link 
          href="/items/add" 
          className="w-full sm:w-auto inline-flex items-center justify-center bg-slate-900/80 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 text-slate-200 font-medium px-8 py-3.5 rounded-xl transition-all shadow-sm text-sm backdrop-blur-sm active:scale-95"
        >
          Register Supplier Node
        </Link>
      </div>

      {/* Micro Status Footnote */}
      <div className="relative z-10 mt-12 flex items-center gap-6 text-xs text-slate-500 font-mono">
        <div className="flex items-center gap-1.5">
          <span className="text-teal-400">⚡</span> Sub-second telemetry sync
        </div>
        <div className="hidden sm:flex items-center gap-1.5">
          <span className="text-teal-400">🛡️</span> Cryptographically verified
        </div>
        <div className="flex items-center gap-1.5">
          <span className="text-teal-400">🤖</span> Multi-modal AI agent ready
        </div>
      </div>

    </header>
  );
}