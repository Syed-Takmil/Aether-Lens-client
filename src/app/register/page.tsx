'use client';

import React, { useState } from 'react';
import Link from 'next/next';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`Successfully compiled access permissions profile for: ${name}`);
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border rounded-unified shadow-sm text-slate-800">
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

        <button type="submit" className="w-full bg-teal-700 text-white text-sm font-medium py-2.5 rounded-md hover:bg-teal-800 transition">
          Initialize Account Credentials
        </button>
      </form>

      <p className="text-xs text-center text-gray-400 mt-4">
        Already carry authorization records?{" "}
        <a href="/login" className="text-teal-700 hover:underline">Return to Access Gateway</a>
      </p>
    </div>
  );
}