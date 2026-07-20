'use client';

import React from 'react';
import Link from 'next/link';

export default function Navbar() {
  // Toggle this to null to review the clean Signed Out (Sign In / Sign Up) link layout
  const session = {
    user: {
      name: 'John Doe',
      avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80'
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between shadow-sm">
      <Link href="/" className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-1">
        <span>🛡️</span> AetherLens
      </Link>

      <div className="flex gap-6 text-sm font-medium items-center text-gray-600">
        <Link href="/" className="hover:text-teal-700 transition">Home</Link>
        <Link href="/explore" className="hover:text-teal-700 transition">Explore Index</Link>
        
        {!session ? (
          <>
            <Link href="/login" className="hover:text-teal-700 transition">Sign In</Link>
            <Link href="/register" className="bg-teal-700 text-white px-4 py-2 rounded-md hover:bg-teal-800 transition text-xs font-semibold">
              Sign Up
            </Link>
          </>
        ) : (
          <>
            <Link href="/items/add" className="hover:text-teal-700 transition flex items-center gap-1">
              ➕ Add Supplier
            </Link>
            <Link href="/items/manage" className="hover:text-teal-700 transition flex items-center gap-1">
              ⚙️ Manage Suppliers
            </Link>
            
            <div className="h-4 w-[1px] bg-gray-200 mx-2" />

            {/* Profile Avatar and Sign Out Row */}
            <div className="flex items-center gap-3">
              <img 
                src={session.user.avatarUrl} 
                alt={session.user.name}
                className="w-7 h-7 rounded-full object-cover border border-gray-200"
              />
              <button 
                onClick={() => alert('Logging out...')}
                className="text-gray-400 hover:text-red-600 transition p-1"
                title="Sign Out"
              >
                {/* Gravity UI ArrowSignOut Clean Inline Icon */}
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                  <polyline points="16 17 21 12 16 7" />
                  <line x1="21" y1="12" x2="9" y2="12" />
                </svg>
              </button>
            </div>
          </>
        )}
      </div>
    </nav>
  );
}