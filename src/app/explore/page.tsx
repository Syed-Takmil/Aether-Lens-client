'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';

interface SupplierItem {
  _id: string;
  title: string;
  shortDescription: string;
  category: string;
  riskRating: number;
  location: string;
  imageUrl?: string;
}

export default function ExplorePage() {
  const [items, setItems] = useState<SupplierItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  const [search, setSearch] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('');
  const [riskFilter, setRiskFilter] = useState('');

  // Fetch real data from your Node server engine
  useEffect(() => {
    fetch('http://localhost:5000/api/suppliers')
      .then((res) => {
        if (!res.ok) throw new Error('Network configuration discrepancy detected.');
        return res.json();
      })
      .then((data) => {
        setItems(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const filteredItems = items.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(search.toLowerCase()) || 
                          item.shortDescription.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = categoryFilter === '' || item.category === categoryFilter;
    const matchesRisk = riskFilter === '' || item.riskRating.toString() === riskFilter;
    return matchesSearch && matchesCategory && matchesRisk;
  });

  return (
    <div className="min-h-screen bg-slate-50 p-8 text-slate-800">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-8">Global Supplier Risk Index</h1>
        
        {/* Search & Filters Suite */}
        <div className="bg-white p-6 rounded-xl shadow-sm mb-8 grid grid-cols-1 md:grid-cols-3 gap-4 border border-gray-100">
          <input 
            type="text" 
            placeholder="Search active hubs..." 
            className="border p-2 rounded-md focus:outline-teal-700 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select 
            className="border p-2 rounded-md text-sm" 
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="">All Categories</option>
            <option value="Electronics">Electronics</option>
            <option value="Logistics">Logistics</option>
            <option value="Raw Materials">Raw Materials</option>
          </select>
          <select 
            className="border p-2 rounded-md text-sm" 
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
          >
            <option value="">All Risk Tiers</option>
            <option value="1">Tier 1 - Clear</option>
            <option value="2">Tier 2 - Minor Friction</option>
            <option value="3">Tier 3 - Monitored Risk</option>
          </select>
        </div>

        {error && <div className="p-4 mb-4 text-sm text-red-700 bg-red-100 rounded-lg">{error}</div>}

        {/* REQUIREMENT 4: Card Grid View with Skeleton Loading fallback */}
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="bg-white h-96 animate-pulse rounded-xl border p-4 space-y-4">
                <div className="bg-gray-200 h-48 w-full rounded-md" />
                <div className="h-6 bg-gray-200 w-3/4 rounded" />
                <div className="h-4 bg-gray-200 w-full rounded" />
                <div className="h-4 bg-gray-200 w-1/2 rounded" />
              </div>
            ))}
          </div>
        ) : items.length === 0 ? (
          <div className="text-center py-12 text-gray-500 bg-white rounded-xl border border-dashed">
            No supplier profiles found in database. Use /items/add to register one.
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredItems.map(item => (
              <div key={item._id} className="bg-white rounded-xl overflow-hidden border flex flex-col justify-between shadow-sm transition hover:shadow-md h-96">
                <div>
                  <img 
                    src={item.imageUrl || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=400&q=80'} 
                    alt={item.title} 
                    className="w-full h-40 object-cover" 
                  />
                  <div className="p-4">
                    <span className="text-xs font-semibold uppercase tracking-wider text-teal-700">{item.category}</span>
                    <h3 className="text-base font-bold mt-1 text-slate-900 truncate">{item.title}</h3>
                    <p className="text-xs text-gray-500 line-clamp-2 mt-1">{item.shortDescription}</p>
                    <div className="mt-3 text-xs space-y-1 text-gray-600 border-t pt-2">
                      <div>📍 Base: **{item.location}**</div>
                      <div>⚠️ Risk Score: <span className="font-bold text-amber-600">{item.riskRating}/5</span></div>
                    </div>
                  </div>
                </div>
                <div className="p-4 pt-0">
                  <Link href={`/details/${item._id}`} className="block text-center text-xs font-medium bg-slate-900 text-white py-2 rounded-md hover:bg-slate-800 transition">
                    View Details
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