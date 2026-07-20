'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SupplierItem {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  riskRating: number;
  costEfficiency: number;
  location: string;
  imageUrl?: string;
}

export default function ExplorePage() {
  const [items, setItems] = useState<SupplierItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  
  // Advanced Filter state variables
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');
  const [sortBy, setSortBy] = useState('title');

  useEffect(() => {
    // Simulated operational loading cycle
    setTimeout(() => {
      setItems([
        { _id: '1', title: 'Apex Microconductors', shortDescription: 'High-precision silicon wafer distribution network.', category: 'Electronics', riskRating: 2, costEfficiency: 94, location: 'Taiwan', imageUrl: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=400&q=80' },
        { _id: '2', title: 'Valo Heavy Logistics', shortDescription: 'Maritime transport cluster for deep-sea resource shifting.', category: 'Logistics', riskRating: 4, costEfficiency: 81, location: 'Rotterdam', imageUrl: 'https://images.unsplash.com/photo-1494412574643-ff11b0a5c1c3?auto=format&fit=crop&w=400&q=80' },
        { _id: '3', title: 'Titanium Smelting Corp', shortDescription: 'Aerospace grade raw titanium refining matrix.', category: 'Raw Materials', riskRating: 1, costEfficiency: 88, location: 'Reykjavik', imageUrl: 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80' },
        { _id: '4', title: 'Quantum Optoelectronics', shortDescription: 'Fiber optic laser routing matrices for industrial setups.', category: 'Electronics', riskRating: 3, costEfficiency: 76, location: 'Tokyo', imageUrl: 'https://images.unsplash.com/photo-1509023467864-1593060a3be9?auto=format&fit=crop&w=400&q=80' }
      ]);
      setLoading(false);
    }, 1200);
  }, []);

  // Filtering Matrix Logic
  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === '' || item.category === categoryFilter;
    const matchesRisk = riskFilter === '' || item.riskRating.toString() === riskFilter;
    return matchesSearch && matchesCategory && matchesRisk;
  }).sort((a, b) => {
    if (sortBy === 'risk') return b.riskRating - a.riskRating;
    if (sortBy === 'efficiency') return b.costEfficiency - a.costEfficiency;
    return a.title.localeCompare(b.title);
  });

  return (
    <div className="min-h-screen bg-neutralCanvas p-8 text-brandPrimary">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Global Supplier Risk Index</h1>
        
        {/* Filtering & Controls Suite */}
        <div className="bg-white p-6 rounded-unified shadow-sm mb-8 grid grid-cols-1 md:grid-cols-4 gap-4 border border-gray-100">
          <input 
            type="text" 
            placeholder="Search suppliers..." 
            className="border p-2 rounded-md focus:outline-brandSecondary"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="border p-2 rounded-md" 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Logistics">Logistics</option>
            <option value="Raw Materials">Raw Materials</option>
          </select>
          <select 
            className="border p-2 rounded-md" 
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="">All Risk Tiers</option>
            <option value="1">Tier 1 - Minimal Risk</option>
            <option value="2">Tier 2 - Operational Friction</option>
            <option value="3">Tier 3 - Monitored Vulnerability</option>
            <option value="4">Tier 4 - High Systemic Threat</option>
          </select>
          <select 
            className="border p-2 rounded-md" 
            value={sortBy} 
            onChange={(e) => setSortBy(e.target.value)}
          >
            <option value="title">Sort by Designation</option>
            <option value="risk">Sort by Risk Severity</option>
            <option value="efficiency">Sort by Efficiency Metrics</option>
          </select>
        </div>

        {/* Unified Cards Grid Render */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map(n => (
              <div key={n} className="bg-white h-96 animate-pulse rounded-unified border border-gray-100 p-4">
                <div className="bg-gray-200 h-48 w-full rounded-md mb-4" />
                <div className="h-6 bg-gray-200 w-3/4 mb-2 rounded" />
                <div className="h-4 bg-gray-200 w-full mb-2 rounded" />
                <div className="h-4 bg-gray-200 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div key={item._id} className="bg-white rounded-unified overflow-hidden border border-gray-100 flex flex-col justify-between shadow-sm transition hover:shadow-md">
                <div>
                  <img src={item.imageUrl} alt={item.title} className="w-full h-48 object-cover" />
                  <div className="p-5">
                    <span className="text-xs font-semibold uppercase tracking-wider text-brandSecondary">{item.category}</span>
                    <h3 className="text-lg font-bold mt-1 mb-2 text-brandPrimary truncate">{item.title}</h3>
                    <p className="text-sm text-gray-600 line-clamp-3 mb-4">{item.shortDescription}</p>
                    <div className="space-y-1 text-xs text-gray-500 border-t pt-3">
                      <div>🏢 Base: **{item.location}**</div>
                      <div>⚠️ Risk Indicator: <span className="font-bold text-brandAlert">{item.riskRating}/5</span></div>
                      <div>📈 Core Efficiency: <span className="font-bold text-brandSecondary">{item.costEfficiency}%</span></div>
                    </div>
                  </div>
                </div>
                <div className="p-5 pt-0">
                  <Link href={`/details/${item._id}`} className="block text-center text-sm font-medium bg-brandPrimary border text-black py-2 rounded-md hover:bg-opacity-90 transition">
                    View Strategic Matrix
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}