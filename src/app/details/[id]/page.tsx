'use client';

import React from 'react';
import Link from 'next/link';

export default function SupplierDetailsPage({ params }: { params: { id: string } }) {
  // Mock data representing a detailed single supplier snapshot fetched from the database
  const supplierMockData = {
    id: params.id,
    title: "Apex Microconductors Lab",
    category: "Electronics Manufacturing",
    location: "Hsinchu Science Park, Taiwan",
    imageUrl: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80",
    riskRating: 2,
    costEfficiency: 94,
    shortDescription: "High-precision silicon wafer fabrication and distribution matrix serving global aerospace markets.",
    fullDescription: "Apex Microconductors operates key tier-1 lithography architectures. The plant specializes in processing ultra-thin layers under cleanroom standards. Our autonomous agent tracking matrix currently flags minor localized delays due to shipping lane adjustments, but overall structural output integrity remains within acceptable operational baselines.",
    specifications: [
      { key: "Lead Time Baseline", value: "14 Days standard delivery" },
      { key: "Cleanroom Standard", value: "ISO Class 1 Certification" },
      { key: "Primary Raw Material Focus", value: "99.999% Pure Polycrystalline Silicon" },
      { key: "Carbon Compliance Index", value: "88% Eco-efficiency ranking" }
    ],
    relatedSuppliers: [
      { id: "3", title: "Titanium Smelting Corp", location: "Iceland", risk: 1 },
      { id: "4", title: "Quantum Optoelectronics", location: "Japan", risk: 3 }
    ]
  };

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 md:p-8 bg-white rounded-unified border border-gray-200 shadow-sm text-slate-800">
      
      {/* Visual Header Block */}
      <div className="relative h-64 md:h-96 w-full rounded-lg overflow-hidden mb-8 border">
        <img 
          src={supplierMockData.imageUrl} 
          alt={supplierMockData.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 bg-brandPrimary text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-slate-900">
          {supplierMockData.category}
        </div>
      </div>

      {/* Main Structural Layout Split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Core Content: Description & Specifications */}
        <div className="md:col-span-2 space-y-6">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900 mb-2">{supplierMockData.title}</h1>
            <p className="text-sm text-gray-500 font-medium">📍 Regional Base: {supplierMockData.location}</p>
          </div>

          {/* Section A: Description Overview */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-bold mb-2">Operational Overview</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-3">{supplierMockData.shortDescription}</p>
            <p className="text-sm text-gray-600 leading-relaxed">{supplierMockData.fullDescription}</p>
          </div>

          {/* Section B: Key Specifications */}
          <div className="border-t pt-4">
            <h3 className="text-lg font-bold mb-3">Technical Specifications Matrix</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {supplierMockData.specifications.map((spec, index) => (
                <div key={index} className="bg-neutralCanvas p-3 rounded-md border border-gray-100">
                  <span className="block text-xs font-semibold uppercase text-gray-400">{spec.key}</span>
                  <span className="text-sm font-medium text-slate-800">{spec.value}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Data: Metrics & Related Items */}
        <div className="space-y-6">
          <div className="bg-neutralCanvas p-5 rounded-unified border border-gray-200 space-y-4">
            <h4 className="text-sm font-bold uppercase tracking-wider text-gray-500">Live Risk Telemetry</h4>
            
            <div className="border-b pb-3">
              <span className="block text-xs text-gray-500">System Threats Index</span>
              <span className="text-2xl font-black text-brandAlert text-amber-600">{supplierMockData.riskRating} / 5</span>
              <span className="block text-xxs text-gray-400 mt-1">Tier 2 indicates manageable ambient logistical frictions.</span>
            </div>

            <div>
              <span className="block text-xs text-gray-500">Cost Performance</span>
              <span className="text-2xl font-black text-brandSecondary text-teal-700">{supplierMockData.costEfficiency}%</span>
            </div>
          </div>

          {/* Section C: Related Items */}
          <div className="border p-4 rounded-unified bg-white">
            <h4 className="text-sm font-bold text-slate-900 mb-3">Adjacent Supply Assets</h4>
            <div className="space-y-3">
              {supplierMockData.relatedSuppliers.map((item) => (
                <div key={item.id} className="text-xs border-b pb-2 last:border-b-0 last:pb-0">
                  <Link href={`/details/${item.id}`} className="font-semibold text-teal-700 hover:underline block truncate">
                    {item.title}
                  </Link>
                  <span className="text-gray-400">Hub Location: {item.location} • Risk Tier {item.risk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}