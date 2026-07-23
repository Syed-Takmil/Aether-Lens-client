'use client';

import React, { useState } from 'react';
import Link from 'next/link';

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    setSubscribed(true);
    setEmail('');
    setTimeout(() => setSubscribed(false), 4000);
  };

  return (
    <footer className="bg-slate-900 border-t border-slate-800 text-slate-300 pt-16 pb-8 px-6 selection:bg-teal-500 selection:text-white">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-slate-800">
        
        {/* Column 1 & 2: Identity & Mission Overview */}
        <div className="lg:col-span-2 space-y-4">
          <div className="text-lg font-bold text-white tracking-tight flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-teal-500/10 text-teal-400 border border-teal-500/20">🛡️</span> 
            AetherLens Risk Engine
          </div>
          <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
            High-integrity autonomous framework engineered to monitor global manufacturing hubs, evaluate localized risk indexes, and secure multi-tier logistics pipelines.
          </p>
          
          {/* Functional Newsletter Subscription Box */}
          <div className="pt-2">
            <p className="text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">Subscribe to Telemetry Bulletins</p>
            <form onSubmit={handleSubscribe} className="flex gap-2 max-w-sm">
              <input 
                type="email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="operator@enterprise.com" 
                required
                className="bg-slate-800 border border-slate-700 text-sm text-white px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-teal-500 w-full placeholder:text-slate-500"
              />
              <button 
                type="submit" 
                className="bg-teal-600 hover:bg-teal-500 text-white font-medium text-xs px-4 py-2 rounded-md transition shadow-sm whitespace-nowrap"
              >
                Join Feed
              </button>
            </form>
            {subscribed && (
              <p className="text-xs text-emerald-400 mt-2 animate-fadeIn">✓ Successfully registered to telemetry notification stream.</p>
            )}
          </div>
        </div>

        {/* Column 3: Operational System Directories */}
        <div className="space-y-3 text-sm">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">System Indices</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li><Link href="/" className="hover:text-teal-400 transition">Home Terminal</Link></li>
            <li><Link href="/explore" className="hover:text-teal-400 transition">Explore Index</Link></li>
            <li><Link href="/items/add" className="hover:text-teal-400 transition">Register Supplier</Link></li>
            <li><Link href="/items/manage" className="hover:text-teal-400 transition">Manage Operations</Link></li>
          </ul>
        </div>

        {/* Column 4: Company & Support */}
        <div className="space-y-3 text-sm">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Command & Support</h4>
          <ul className="space-y-2 text-slate-400 text-xs">
            <li><Link href="/about" className="hover:text-teal-400 transition">About System</Link></li>
            <li><Link href="/contact" className="hover:text-teal-400 transition">Contact Secure Desk</Link></li>
            <li><a href="mailto:support@aetherlens.io" className="hover:text-teal-400 transition">Direct Incident Email</a></li>
            <li><Link href="/privacy" className="hover:text-teal-400 transition">Cryptographic Privacy Policy</Link></li>
          </ul>
        </div>

        {/* Column 5: Verified External Node Channels */}
        <div className="space-y-3 text-sm">
          <h4 className="font-bold text-white uppercase tracking-wider text-xs">Verified Channels</h4>
          <div className="flex flex-col gap-2.5 text-xs text-slate-400">
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition flex items-center gap-2">
              <span>💻</span> GitHub Repository
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition flex items-center gap-2">
              <span>💼</span> Network Updates (LinkedIn)
            </a>
            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-400 transition flex items-center gap-2">
              <span>🌐</span> Global Status Feed
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Disclaimer Base line */}
      <div className="max-w-6xl mx-auto pt-8 flex flex-col sm:flex-row justify-between items-center gap-4 text-xs font-mono text-slate-500">
        <p>© 2026 AetherLens Operational Matrix Group. All telemetry records secured.</p>
        
        {/* Functional Status Pill */}
        <div className="flex items-center gap-2 text-emerald-400 bg-emerald-950/40 px-3 py-1 rounded-full border border-emerald-800/60 font-sans font-medium text-xs shadow-inner">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
          <span>All Nodes Online & Synchronized</span>
        </div>
      </div>
    </footer>
  );
}