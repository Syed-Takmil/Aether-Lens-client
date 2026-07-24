'use client';

import React, { useState } from 'react';

const FAQ_ITEMS = [
  {
    question: "How do AI Agents identify localized vulnerabilities?",
    answer: "Our agentic intelligence parses continuous operational telemetry logs and compares them against historical production baselines, instantly flagging deviations, port bottlenecks, or sudden safety compliance anomalies."
  },
  {
    question: "Is my local warehouse data securely encrypted?",
    answer: "Yes. All data streams and inventory blocks utilize robust cryptographic signature verification and industry-standard security protocols before synchronization across multi-tier networks."
  },
  {
    question: "Can I automatically categorize and tag incoming supplier profiles?",
    answer: "Absolutely. Our built-in Gemini AI auto-classification engine reviews corporate descriptions and instantly maps them into structural categories (such as Electronics, Raw Materials, or Maritime Cargo) with dynamic hashtags."
  },
  {
    question: "What happens if the Gemini AI telemetry API encounters a high-demand spike?",
    answer: "Our backend is equipped with automatic failover routines and 503 fallback mechanisms, ensuring core supplier records save successfully while providing stable backup performance metrics until services resume."
  },
  {
    question: "How do I restrict unauthorized access to sensitive internal pages?",
    answer: "Next.js edge middleware intercepts incoming routing requests against secure server-side session cookies, preventing unauthenticated users from visiting operational nodes like /items/add or /items/manage."
  }
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0); // First item open by default

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="max-w-3xl mx-auto px-4">
      <div className="text-center mb-10">
        <span className="text-teal-500 font-mono text-xs uppercase tracking-widest bg-teal-500/10 px-3 py-1 rounded-full border border-teal-500/20">
          Knowledge Base
        </span>
        <h2 className="text-3xl font-bold mt-3 text-slate-900 tracking-tight">Frequently Asked Inquiries</h2>
        <p className="text-gray-600 text-sm mt-2">Deep dive into operational mechanics, agent protocols, and security layers.</p>
      </div>

      <div className="space-y-4">
        {FAQ_ITEMS.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div 
              key={index}
              className={`border transition-all duration-300 rounded-2xl overflow-hidden shadow-sm ${
                isOpen ? 'bg-white border-teal-500/40 shadow-md ring-1 ring-teal-500/20' : 'bg-white border-gray-200 hover:border-gray-300'
              }`}
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full flex items-center justify-between p-5 text-left font-semibold text-slate-900 transition-colors"
              >
                <span className="text-base">{item.question}</span>
                <span className={`w-7 h-7 rounded-full flex items-center justify-center bg-slate-100 text-slate-700 transition-transform duration-300 ${isOpen ? 'rotate-180 bg-teal-50 text-teal-700' : ''}`}>
                  ↓
                </span>
              </button>

              <div 
                className={`grid transition-all duration-300 ease-in-out ${
                  isOpen ? 'grid-rows-[1fr] opacity-100 pb-5 px-5' : 'grid-rows-[0fr] opacity-0 pb-0 px-5'
                }`}
              >
                <div className="overflow-hidden">
                  <p className="text-gray-600 text-sm leading-relaxed border-t border-gray-100 pt-3">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}