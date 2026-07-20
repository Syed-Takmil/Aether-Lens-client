'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleDemoFill = () => {
    setEmail('operator.demo@aetherlens.io');
    setPassword('SecurePass123!');
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Logging in system profile: ${email}`);
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border rounded-xl shadow-sm">
      <h2 className="text-xl font-bold text-slate-800 mb-1">System Authenticator Login</h2>
      <p className="text-xs text-gray-500 mb-6">Access restricted secure risk analysis monitoring matrices.</p>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold mb-1">Operator Email Address</label>
          <input 
            type="email" 
            required 
            className="w-full border p-2 text-sm rounded-md" 
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
            className="w-full border p-2 text-sm rounded-md" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="w-full bg-slate-900 text-white text-sm font-medium py-2.5 rounded-md hover:bg-slate-800 transition">
          Authenticate Session
        </button>
      </form>

      <div className="relative my-6 border-b text-center">
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white px-2 text-xxs text-gray-400 uppercase font-bold">Or Shortcut Authorization</span>
      </div>

      <div className="space-y-2">
        <button 
          onClick={handleDemoFill}
          className="w-full border border-teal-700 text-teal-700 text-sm font-medium py-2 rounded-md hover:bg-teal-50 transition"
        >
          Auto-Fill Credentials (Demo Mode)
        </button>
        <button 
          onClick={() => alert('Redirecting interface handshake to Google secure OAuth networks.')}
          className="w-full border bg-slate-50 text-gray-700 text-sm font-medium py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2"
        >
          🌐 Authenticate via Google Account
        </button>
      </div>
    </div>
  );
}