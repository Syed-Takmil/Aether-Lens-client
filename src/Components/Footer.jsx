'use client';

import React from 'react';
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-200 pt-10 pb-6 px-6 text-gray-600">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 pb-8 border-b border-gray-100">
        
        {/* Identity block */}
        <div className="space-y-2">
          <div className="text-md font-bold text-slate-900 tracking-tight flex items-center gap-1">
            <span>🛡️</span> AetherLens Risk Engine
          </div>
          <p className="text-xs text-gray-500 leading-normal max-w-xs">
            High-integrity supply framework designed to monitor global production hubs and calculate environmental infrastructure vulnerability indexes.
          </p>
        </div>

        {/* Operational Directory links */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xxs">System Indices</h4>
          <div className="grid grid-cols-2 gap-2">
            <Link href="/" className="hover:text-teal-700 transition">Home Terminal</Link>
            <Link href="/explore" className="hover:text-teal-700 transition">Explore Index</Link>
            <Link href="/about" className="hover:text-teal-700 transition">About System</Link>
            <Link href="/contact" className="hover:text-teal-700 transition">Contact Desk</Link>
          </div>
        </div>

        {/* Social Platforms / Repository Connections */}
        <div className="space-y-2 text-xs">
          <h4 className="font-bold text-slate-900 uppercase tracking-wider text-xxs">External Nodes</h4>
          <div className="flex flex-col gap-2">
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-teal-700 transition flex items-center gap-1">
              💼 Network Updates (LinkedIn)
            </a>
          </div>
        </div>

      </div>

      {/* Copyright Disclaimer Base line */}
      <div className="max-w-6xl mx-auto pt-6 flex flex-col sm:flex-row justify-between items-center gap-2 text-xxs font-mono text-gray-400">
        <p>© 2026 AetherLens Operational Matrix Group. .</p>
        <div className="flex items-center gap-2 text-emerald-700 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-100 font-sans font-medium">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span>All Nodes Online</span>
        </div>
      </div>
    </footer>
  );
}