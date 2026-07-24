'use client';

import React from 'react';
import Link from 'next/link';

const SECTORS = [
  {
    title: "Heavy Industrial",
    icon: "🏗️",
    nodes: "1,240 Nodes",
    riskIndex: "Low Volatility",
    description: "Automated real-time oversight of manufacturing assembly pipelines and heavy machinery yards."
  },
  {
    title: "Aerospace Refining",
    icon: "🛰️",
    nodes: "850 Nodes",
    riskIndex: "Tier-1 Secure",
    description: "Rigorous compliance and material stress telemetry mapping for space and aviation supply chains."
  },
  {
    title: "Semiconductor Labs",
    icon: "🔬",
    nodes: "620 Nodes",
    riskIndex: "High Precision",
    description: "Micro-environment thermal and supply chain tracking for advanced chip fabrication facilities."
  },
  {
    title: "Maritime Cargo",
    icon: "⚓",
    nodes: "2,100 Nodes",
    riskIndex: "Active Tracking",
    description: "Global port bottleneck forecasting and transit anomaly detection across international shipping routes."
  }
];

export default function MonitoredSectors() {
  return (
    <section className="py-4">
      <div className="text-center mb-10">
        <span className="text-teal-600 font-mono text-xs uppercase tracking-widest bg-teal-50 px-3 py-1 rounded-full border border-teal-100">
          Global Coverage
        </span>
        <h2 className="text-3xl font-bold mt-3 text-slate-900 tracking-tight">Monitored Industrial Sectors</h2>
        <p className="text-gray-600 text-sm mt-2">Continuous autonomous risk tracking spanning critical worldwide infrastructure tiers.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {SECTORS.map((sector, index) => (
          <div 
            key={index}
            className="group bg-white p-6 rounded-2xl border border-gray-200/80 shadow-sm hover:shadow-xl hover:border-teal-500/40 transition-all duration-300 flex flex-col justify-between relative overflow-hidden"
          >
            {/* Top Glow Accent on Hover */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-teal-500 to-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <span className="text-3xl p-3 bg-slate-50 rounded-xl border border-gray-100 group-hover:scale-110 transition-transform">
                  {sector.icon}
                </span>
                <span className="text-xs font-mono font-medium text-teal-700 bg-teal-50 px-2.5 py-1 rounded-full border border-teal-100">
                  {sector.nodes}
                </span>
              </div>

              <h3 className="text-lg font-bold text-slate-900 group-hover:text-teal-700 transition-colors">
                {sector.title}
              </h3>
              
              <p className="text-xs text-gray-500 mt-2 leading-relaxed">
                {sector.description}
              </p>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-100 flex items-center justify-between text-xs font-medium">
              <span className="text-slate-500 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {sector.riskIndex}
              </span>
              <Link href="/explore" className="text-teal-600 group-hover:translate-x-1 transition-transform font-semibold">
                Audit →
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}