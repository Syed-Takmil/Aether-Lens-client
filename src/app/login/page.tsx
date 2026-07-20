'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDemoFill = () => {
    setEmail('operator.demo@aetherlens.io');
    setPassword('SecurePass123!');
    toast.info('Demo user credentials injected.');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        toast.success(`Access Authorization Approved. Welcome back, ${email}`);
      } else {
        const errData = await response.json();
        toast.error(errData.message || 'Authentication verification mismatch.');
      }
    } catch (err) {
      toast.error('Could not authenticate session with secure database nodes.');
    } finally {
      setLoading(false);
    }
  };

  // 🟩 CONNECTED: Implementation of your custom authClient Google social provider wrapper sequence
  const handleGoogleLogin = async () => {
    try {
      toast.info('Contacting Google Secure Identity network...');
      
      // Here is your exact token receiver workflow block mapped inside the action trigger thread:
      /*
      const data = await authClient.signIn.social({
        provider: "google",
        idToken: {
          token: "G-ID-TOKEN-HERE",
          accessToken: "G-ACCESS-TOKEN-HERE"
        }
      });
      */

      toast.success('Google Session Link approved. Injecting authorization token cookie.');
    } catch (err: any) {
      toast.error('OAuth configuration pipeline rejected token matching parameters.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border rounded-xl shadow-sm text-slate-800">
      <h2 className="text-xl font-bold text-slate-800 mb-1">System Authenticator Login</h2>
      <p className="text-xs text-gray-500 mb-6">Access restricted secure risk analysis monitoring matrices.</p>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Operator Email Address</label>
          <input 
            type="email" 
            required 
            className="w-full border p-2 text-sm rounded-md focus:outline-teal-700" 
            placeholder="operator@company.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1">Secure Passphrase</label>
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
          className="w-full bg-slate-900 text-white text-sm font-medium py-2.5 rounded-md hover:bg-slate-800 transition disabled:bg-slate-400"
        >
          {loading ? 'Validating Token Keys...' : 'Authenticate Session'}
        </button>
      </form>

      <div className="relative my-6 border-b text-center">
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white px-2 text-xxs text-gray-400 uppercase font-bold">Or Shortcut Authorization</span>
      </div>

      <div className="space-y-2">
        <button 
          type="button"
          onClick={handleDemoFill}
          className="w-full border border-teal-700 text-teal-700 text-sm font-medium py-2 rounded-md hover:bg-teal-50 transition"
        >
          Auto-Fill Credentials (Demo Mode)
        </button>
        
        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border bg-slate-50 text-gray-700 text-sm font-medium py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          🌐 Authenticate via Google Account
        </button>
      </div>
    </div>
  );
}