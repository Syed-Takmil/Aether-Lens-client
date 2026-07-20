'use client';

import React, { useState } from 'react';
import { toast } from 'react-toastify';

export default function ContactPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [sending, setSending] = useState(false);

  const handleMessageSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);

    setTimeout(() => {
      toast.success('Your message has been transmitted to our systems desk!');
      setEmail('');
      setMessage('');
      setSending(false);
    }, 800);
  };

  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white border border-gray-200 rounded-xl shadow-sm text-slate-800">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-950">Contact Systems Support</h1>
        <p className="text-sm text-gray-500 mt-1">Get in touch with an AetherLens communications engineer.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Direct Contact Metrics */}
        <div className="space-y-6 text-sm">
          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">Central Systems Desk</h3>
            <p className="text-gray-600">AetherLens Logistics Hub, Tower B</p>
            <p className="text-gray-600">Tech District, Suite 500</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">Direct Communications Line</h3>
            <p className="text-teal-700 hover:underline font-medium">+1 (555) 832-7475</p>
            <p className="text-gray-500 text-xs mt-0.5">Mon - Fri // 08:00 - 18:00 EST</p>
          </div>

          <div>
            <h3 className="font-bold text-slate-900 uppercase tracking-wide text-xs mb-1">Secure Mail Delivery</h3>
            <p className="text-teal-700 hover:underline font-medium">systems.support@aetherlens.io</p>
          </div>
        </div>

        {/* Messaging Interface Form */}
        <form onSubmit={handleMessageSubmit} className="space-y-4 border-t md:border-t-0 md:border-l border-gray-200 pt-6 md:pt-0 md:pl-8">
          <h3 className="text-sm font-bold text-slate-900">Transmit Secure Message</h3>
          
          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600">Your Email Address</label>
            <input 
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              placeholder="operator@company.com"
              className="w-full border border-gray-300 p-2 text-sm rounded-md focus:outline-teal-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold mb-1 text-gray-600">Message Description</label>
            <textarea 
              rows={4} required value={message} onChange={(e) => setMessage(e.target.value)}
              placeholder="Describe your technical request or asset pipeline incident details..."
              className="w-full border border-gray-300 p-2 text-sm rounded-md focus:outline-teal-700"
            />
          </div>

          <button 
            type="submit" disabled={sending}
            className="w-full bg-slate-950 text-white text-xs font-bold py-2.5 rounded-md hover:bg-slate-800 transition disabled:bg-gray-400"
          >
            {sending ? 'Transmitting Data...' : 'Send Message'}
          </button>
        </form>
      </div>
    </div>
  );
}