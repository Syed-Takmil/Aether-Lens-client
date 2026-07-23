'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';

const SLIDES = [
  {
    title: "Global Supply Resilience Tracking",
    description: "Monitor Tier-1 through Tier-5 facility pipelines with autonomous anomaly detection engines.",
    badge: "Active Telemetry Matrix",
    ctaText: "Review Live Index",
    ctaLink: "/explore"
  },
  {
    title: "Automated Agentic Risk Auditing",
    description: "Instantly parse environmental regulations, logistical disruptions, and port bottlenecks in real time.",
    badge: "Next-Gen AI Agent",
    ctaText: "Add Supplier Unit",
    ctaLink: "/items/add"
  },
  {
    title: "Decentralized Security Verification",
    description: "Protect sensitive inventory channels with robust cryptographic signature validation protocols.",
    badge: "High Integrity Node",
    ctaText: "Manage Operations",
    ctaLink: "/items/manage"
  }
];

export default function InteractiveSlider() {
  const [activeSlide, setActiveSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveSlide((prev) => (prev + 1) % SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="bg-slate-900 text-white p-8 md:p-12 rounded-2xl shadow-xl relative overflow-hidden">
      <div className="absolute top-0 right-0 p-8 opacity-10 text-8xl">🌐</div>
      <div className="max-w-2xl relative z-10 transition-all duration-500">
        <span className="inline-block px-3 py-1 rounded bg-teal-800 text-teal-200 text-xs font-bold uppercase tracking-wider mb-4">
          {SLIDES[activeSlide].badge}
        </span>
        <h3 className="text-2xl md:text-3xl font-bold mb-3">{SLIDES[activeSlide].title}</h3>
        <p className="text-gray-300 text-sm md:text-base mb-6 leading-relaxed">
          {SLIDES[activeSlide].description}
        </p>
        <Link href={SLIDES[activeSlide].ctaLink} className="inline-block bg-teal-600 text-white font-medium px-6 py-2.5 rounded-md hover:bg-teal-500 transition text-sm shadow-sm">
          {SLIDES[activeSlide].ctaText} →
        </Link>
      </div>
      <div className="flex gap-2 mt-8 relative z-10">
        {SLIDES.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveSlide(index)}
            className={`h-2 rounded-full transition-all ${activeSlide === index ? 'w-8 bg-teal-500' : 'w-2 bg-slate-700 hover:bg-slate-600'}`}
          />
        ))}
      </div>
    </section>
  );
}