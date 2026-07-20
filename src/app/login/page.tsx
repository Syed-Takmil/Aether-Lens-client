'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authClient } from '../lib/auth-client';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleDemoFill = () => {
    setEmail('operator.demo@aetherlens.io');
    setPassword('SecurePass123!');
    toast.info('Demo credentials loaded.');
  };

  const handleLoginSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // 🟩 CONNECTED: Using your authClient email sign-in method
      const { data, error } = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
        callbackURL: "/", // Redirects back to homepage on success
      });

      if (error) {
        toast.error(error.message || 'Invalid email or password.');
      } else {
        toast.success('Logged in successfully!');
        setEmail('');
        setPassword('');
        router.push('/');
      }
    } catch (err) {
      toast.error('A network error occurred during login.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err: any) {
      toast.error('Google authentication failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border border-gray-200 rounded-xl shadow-sm text-slate-800">
      <h2 className="text-xl font-bold text-slate-900 mb-1">Log In</h2>
      <p className="text-xs text-gray-500 mb-6">Access your secure supply chain risk metrics dashboard.</p>

      <form onSubmit={handleLoginSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-700">Email Address</label>
          <input 
            type="email" 
            required 
            className="w-full border border-gray-300 p-2 text-sm rounded-md focus:outline-teal-700" 
            placeholder="john@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-700">Password</label>
          <input 
            type="password" 
            required 
            className="w-full border border-gray-300 p-2 text-sm rounded-md focus:outline-teal-700" 
            placeholder="••••••••"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          disabled={loading}
          className="w-full bg-slate-900 text-white text-sm font-medium py-2.5 rounded-md hover:bg-slate-800 transition disabled:bg-slate-400 font-sans"
        >
          {loading ? 'Logging In...' : 'Log In'}
        </button>
      </form>

      <div className="relative my-6 border-b border-gray-200 text-center">
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white px-2 text-xxs text-gray-400 uppercase font-bold tracking-wider">Or</span>
      </div>

      <div className="space-y-2">
        <button 
          type="button"
          onClick={handleDemoFill}
          className="w-full border border-teal-700 text-teal-700 text-sm font-medium py-2 rounded-md hover:bg-teal-50 transition font-sans"
        >
          Auto-Fill Credentials (Demo Mode)
        </button>
        
        <button 
          type="button"
          onClick={handleGoogleLogin}
          className="w-full border border-gray-300 bg-slate-50 text-gray-700 text-sm font-medium py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2 font-sans"
        >
          🌐 Sign in with Google
        </button>
      </div>
    </div>
  );
}