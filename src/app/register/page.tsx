'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import { authClient } from '../lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleRegisterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await authClient.signUp.email({
        name,
        email,
        password,
        image: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
        callbackURL: "/",
      });

      if (error) {
        toast.error(error.message || 'Failed to create your account.');
      } else {
        toast.success('Account created successfully!');
        setName('');
        setEmail('');
        setPassword('');
        // Immediately forward user flow back to home screen context
        router.push('/');
      }
    } catch (err) {
      toast.error('A network error occurred during registration.');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    try {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: "/",
      });
    } catch (err) {
      toast.error('Google registration failed.');
    }
  };

  return (
    <div className="max-w-md mx-auto my-16 p-8 bg-white border border-gray-200 rounded-xl shadow-sm text-slate-800">
      <h2 className="text-xl font-bold mb-1 text-slate-900">Create Account</h2>
      <p className="text-xs text-gray-500 mb-6">Sign up to start monitoring your global supplier channels.</p>

      <form onSubmit={handleRegisterSubmit} className="space-y-4">
        <div>
          <label className="block text-xs font-semibold mb-1 text-slate-700">Full Name</label>
          <input 
            type="text" 
            required 
            className="w-full border border-gray-300 p-2 text-sm rounded-md focus:outline-teal-700" 
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
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
          className="w-full bg-teal-700 text-white text-sm font-medium py-2.5 rounded-md hover:bg-teal-800 transition disabled:bg-slate-400 font-sans"
        >
          {loading ? 'Creating Account...' : 'Create Account'}
        </button>
      </form>

      <div className="relative my-6 border-b border-gray-200 text-center">
        <span className="absolute transform -translate-x-1/2 -translate-y-1/2 left-1/2 bg-white px-2 text-xxs text-gray-400 uppercase font-bold tracking-wider">Or</span>
      </div>

      <button 
        type="button"
        onClick={handleGoogleSignUp}
        className="w-full border border-gray-300 bg-slate-50 text-gray-700 text-sm font-medium py-2 rounded-md hover:bg-gray-100 transition flex items-center justify-center gap-2 font-sans"
      >
        🌐 Sign up with Google
      </button>

      <p className="text-xs text-center text-gray-400 mt-4">
        Already have an account?{" "}
        <Link href="/login" className="text-teal-700 hover:underline font-medium">Log In</Link>
      </p>
    </div>
  );
}