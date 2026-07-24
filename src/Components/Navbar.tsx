'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { authClient } from '@/app/lib/auth-client';
import { toast } from 'react-toastify';
import Image from 'next/image';

export default function Navbar() {
  const router = useRouter();
  const { data: session } = authClient.useSession();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close the dropdown cleanly if clicking anywhere outside of it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSignOut = async () => {
    try {
      await authClient.signOut();
      toast.success('Successfully logged out.');
      router.push('/login');
    } catch (err) {
      toast.error('Failed to log out properly.');
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        <Link href="/" className="text-xl font-bold text-slate-800 tracking-tight flex items-center gap-1">
          <span>🛡️</span> AetherLens
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:flex gap-6 text-sm font-medium items-center text-gray-600">
          <Link href="/" className="hover:text-teal-700 transition">Home</Link>
          <Link href="/explore" className="hover:text-teal-700 transition">Explore Index</Link>
          <Link href="/about" className="hover:text-teal-700 transition">About</Link>
          <Link href="/contact" className="hover:text-teal-700 transition">Contact</Link>
          
          {!session ? (
            <>
              <div className="h-4 w-[1px] bg-gray-200 mx-1" />
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

              {/* Interactive User Dropdown Area */}
              <div className="relative" ref={dropdownRef}>
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none focus:ring-2 focus:ring-teal-600/20 rounded-full p-0.5 transition"
                >
                  {session.user.image ? (
                    <Image
                      width={32}
                      height={32}
                      src={session.user.image} 
                      alt={session.user.name || 'User'}
                      className="w-8 h-8 rounded-full object-cover border border-gray-200"
                    />
                  ) : (
                    <div className="w-8 h-8 rounded-full bg-slate-200 border border-slate-300 flex items-center justify-center text-slate-600 hover:bg-slate-300 transition">
                      <svg 
                        xmlns="http://www.w3.org/2000/svg" 
                        width="16" 
                        height="16" 
                        viewBox="0 0 24 24" 
                        fill="currentColor"
                        className="text-slate-500"
                      >
                        <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 4c1.93 0 3.5 1.57 3.5 3.5S13.93 13 12 13s-3.5-1.57-3.5-3.5S10.07 6 12 6zm0 14c-2.03 0-4.43-.82-6.14-2.88C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C16.43 19.18 14.03 20 12 20z"/>
                      </svg>
                    </div>
                  )}
                </button>

                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-lg shadow-lg py-2 text-slate-800 animate-in fade-in slide-in-from-top-1 duration-100">
                    <div className="px-4 py-2 border-b border-gray-100">
                      <p className="text-sm font-semibold truncate text-slate-900">{session.user.name || 'Operator Profile'}</p>
                      <p className="text-xs text-gray-500 truncate mt-0.5">{session.user.email}</p>
                    </div>
                    
                    <button
                      onClick={handleSignOut}
                      className="w-full text-left px-4 py-2 mt-1 text-sm text-red-600 hover:bg-red-50 transition flex items-center justify-between"
                    >
                      <span>Sign Out</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                        <polyline points="16 17 21 12 16 7" />
                        <line x1="21" y1="12" x2="9" y2="12" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </>
          )}
        </div>

        {/* Mobile Hamburger Button */}
        <div className="flex md:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-slate-700 hover:text-teal-700 focus:outline-none focus:ring-2 focus:ring-teal-600/20 rounded-md"
            aria-label="Toggle Menu"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden mt-4 pt-4 border-t border-gray-100 flex flex-col gap-3 text-sm font-medium text-gray-600 animate-in fade-in slide-in-from-top-2 duration-150">
          <Link href="/" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-700 transition py-1">Home</Link>
          <Link href="/explore" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-700 transition py-1">Explore Index</Link>
          <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-700 transition py-1">About</Link>
          <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-700 transition py-1">Contact</Link>

          {!session ? (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <Link href="/login" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 border border-gray-300 rounded-md text-slate-700 hover:bg-gray-50 transition">
                Sign In
              </Link>
              <Link href="/register" onClick={() => setMobileMenuOpen(false)} className="text-center py-2 bg-teal-700 text-white rounded-md hover:bg-teal-800 transition">
                Sign Up
              </Link>
            </div>
          ) : (
            <div className="flex flex-col gap-2 pt-2 border-t border-gray-100">
              <Link href="/items/add" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-700 transition py-1 flex items-center gap-1">
                ➕ Add Supplier
              </Link>
              <Link href="/items/manage" onClick={() => setMobileMenuOpen(false)} className="hover:text-teal-700 transition py-1 flex items-center gap-1">
                ⚙️ Manage Suppliers
              </Link>
              <div className="py-2 border-t border-gray-100 flex items-center justify-between mt-1">
                <div>
                  <p className="text-xs font-semibold text-slate-900">{session.user.name || 'Operator'}</p>
                  <p className="text-xs text-gray-500">{session.user.email}</p>
                </div>
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    handleSignOut();
                  }}
                  className="text-xs text-red-600 font-semibold px-3 py-1.5 bg-red-50 hover:bg-red-100 rounded-md transition"
                >
                  Sign Out
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
}