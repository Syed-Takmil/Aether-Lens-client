import React from 'react';
import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="w-full bg-slate-50 text-slate-800">
      
      {/* SECTION 1: HERO SECTION (Height limited to ~65% viewport) */}
      <header className="h-[65vh] flex flex-col items-center justify-center text-center px-4 bg-gradient-to-b from-white to-slate-50 border-b">
        <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 tracking-tight max-w-3xl">
          Autonomous Risk Intelligence for Global Supply Infrastructures
        </h1>
        <p className="mt-4 text-base text-gray-600 max-w-xl">
          Deploy deep agentic systems tracking transit volatile delays, safety compliance vectors, and localized manufacturing anomalies instantly.
        </p>
        <div className="mt-8">
          <Link href="/explore" className="bg-teal-700 text-white font-medium px-6 py-3 rounded-md hover:bg-teal-800 transition">
            Explore Supplier Index
          </Link>
        </div>
      </header>

      {/* REMAINDER 6 MEANINGFUL SECTIONS FOR COMPLIANCE */}
      <div className="max-w-6xl mx-auto py-16 px-4 space-y-20">
        
        {/* SECTION 2: Core Platform Features */}
        <section className="text-center">
          <h2 className="text-2xl font-bold mb-4">Platform Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white p-6 rounded-xl border">📊 Machine Telemetry Logs</div>
            <div className="bg-white p-6 rounded-xl border">👁️ Multi-modal AI Inspections</div>
            <div className="bg-white p-6 rounded-xl border">🛡️ Secure Cryptographic Signatures</div>
          </div>
        </section>

        {/* SECTION 3: Live Ecosystem Metrics */}
        <section className="bg-teal-700 text-white p-8 rounded-xl text-center">
          <h2 className="text-2xl font-bold mb-2">Ecosystem Vital Statistics</h2>
          <p className="text-sm opacity-90 mb-4">Live continuous telemetry analysis operating globally.</p>
          <div className="grid grid-cols-3 gap-4 font-mono text-xl font-bold">
            <div>99.98%<br/><span className="text-xs font-sans font-normal opacity-75">Uptime Grid</span></div>
            <div>4.8k<br/><span className="text-xs font-sans font-normal opacity-75">Audited Hubs</span></div>
            <div>&lt; 2s<br/><span className="text-xs font-sans font-normal opacity-75">Agent Response</span></div>
          </div>
        </section>

        {/* SECTION 4: Operational Categories */}
        <section>
          <h2 className="text-2xl font-bold mb-4 text-center">Monitored Sectors</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm font-medium">
            <span className="bg-slate-200 px-4 py-2 rounded-full">Heavy Industrial</span>
            <span className="bg-slate-200 px-4 py-2 rounded-full">Aerospace Refining</span>
            <span className="bg-slate-200 px-4 py-2 rounded-full">Semiconductor Labs</span>
            <span className="bg-slate-200 px-4 py-2 rounded-full">Maritime Cargo</span>
          </div>
        </section>

        {/* SECTION 5: Core Services */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="text-2xl font-bold mb-3">Custom Agent Provisioning</h2>
            <p className="text-gray-600 text-sm">We provide tailored execution scripts parsing internal warehouse records, extracting real anomalies prior to transit processing.</p>
          </div>
          <div className="bg-white h-32 rounded-xl border border-dashed flex items-center justify-center text-gray-400">[Data Flow Visualization Pipeline]</div>
        </section>

        {/* SECTION 6: Frequently Asked Questions */}
        <section className="max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Inquiries</h2>
          <div className="space-y-4 text-sm">
            <div className="border-b pb-2">
              <h4 className="font-semibold">How do AI Agents identify localized vulnerabilities?</h4>
              <p className="text-gray-600">Agents parse telemetry logs looking for deviations from standard production baselines.</p>
            </div>
            <div className="border-b pb-2">
              <h4 className="font-semibold">Is my local warehouse data securely encrypted?</h4>
              <p className="text-gray-600">All data blocks use industry-standard JSON Web Token verification before processing.</p>
            </div>
          </div>
        </section>

        {/* SECTION 7: Call To Action Network */}
        <section className="bg-slate-950 text-white p-12 rounded-xl text-center space-y-4">
          <h2 className="text-3xl font-bold">Secure Your Pipeline Resilience Matrix</h2>
          <p className="text-sm text-gray-400 max-w-md mx-auto">Establish verified baseline profiles for external suppliers inside our decentralized network tracker.</p>
          <Link href="/register" className="inline-block bg-teal-600 px-6 py-2.5 rounded text-sm font-medium hover:bg-teal-700 transition">
            Initialize Free Operator Profile
          </Link>
        </section>

      </div>
    </div>
  );
}