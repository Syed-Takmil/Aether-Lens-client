'use client';

import React, { useState } from 'react';
import Link from 'next/link'; // 🟩 FIXED: Correct Next.js router anchor route path
import { toast } from 'react-toastify';
import { authClient } from '../lib/auth-client';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Connecting registration data pipeline to your local backend server instance
      const response = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (response.ok) {
        toast.success(`Successfully compiled access permissions profile for: ${name}`);
        setName('');
        setEmail('');
        setPassword('');
      } else {
        const errData = await response.json();
        toast.error(errData.message || 'Credentials initialization handshake aborted.');
      }
    } catch (err) {
      toast.error('Network failure connecting to core validation cluster.');
    } finally {
      setLoading(false);
    }
  };

  // Google OAuth Social Registration Sequence
  const handleGoogleSignUp = async () => {
    try {
     const data = await authClient.signIn.social({
    provider: "google",
  });
    } catch (err) {
      toast.error('Google verification platform rejected credential link.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border rounded-xl shadow-sm text-slate-800">
      <h2 className="text-xl font-bold mb-1">Request Operator Protocol Credentials</h2>
      <p className="text-xs text-gray-500 mb-6">Create an official authenticated account to track international shipping pipelines.</p>

      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Full Legal Operator Name</label>
          <input 
            type="text" 
            required 
            className="w-full border p-2 text-sm rounded-md focus:outline-teal-700" 
            placeholder="Analyst John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Enterprise Email Address</label>
          <input 
            type="email" 
            required 
            className="w-full border p-2 text-sm rounded-md focus:outline-teal-700" 
            placeholder="j.doe@logistics-network.net"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Construct Master Access Password</label>
          <input 
            type="password" 
            required 
            className="w-full border p-2 text-sm rounded-md focus:outline-teal-700" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-teal-700 text-white text-sm font-medium py-2.5 rounded-md hover:bg-teal-800 transition disabled:bg-slate-400"
        >
          {loading ? 'Initializing Operator Node...' : 'Initialize Account Credentials'}
        </button>
      </form>

      <div className="relative my-6 border-b text-center">
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white px-2 text-xxs text-gray-400 uppercase font-bold">Or Register Via Provider</span>
      </div>

      <button 
        onClick={handleGoogleSignUp}
        className="w-full border bg-slate-50 text-gray-700 text-sm font-medium py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
      >
        🌐 Register via Google Account
      </button>

      <p className="text-xs text-center text-gray-400 mt-4">
        Already carry authorization records?{" "}
        <Link href="/login" className="text-teal-700 hover:underline">Return to Access Gateway</Link>
      </p>
    </div>
  );
}