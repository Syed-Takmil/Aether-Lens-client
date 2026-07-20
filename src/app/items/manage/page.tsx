'use client';

import React, { useState } from 'react';
import Link from 'next/link';

interface Supplier {
  id: string;
  title: string;
  riskRating: number;
  location: string;
}

export default function ManageSuppliersPage() {
  // Mock data representing items inside your database
  const [suppliers, setSuppliers] = useState<Supplier[]>([
    { id: '1', title: 'Apex Microconductors', riskRating: 2, location: 'Taiwan' },
    { id: '2', title: 'Valo Heavy Logistics', riskRating: 4, location: 'Rotterdam' },
    { id: '3', title: 'Titanium Smelting Corp', riskRating: 1, location: 'Reykjavik' },
  ]);

  const handleDelete = (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      setSuppliers(suppliers.filter(item => item.id !== id));
    }
  };

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Manage System Profiles</h1>
      <p className="text-sm text-gray-500 mb-6">View operational status grids or permanently terminate legacy supplier connections.</p>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b bg-gray-50 text-gray-700 text-sm font-semibold">
              <th className="p-3">Supplier Name</th>
              <th className="p-3">Base Location</th>
              <th className="p-3">Risk Tier</th>
              <th className="p-3 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y text-sm">
            {suppliers.map((item) => (
              <tr key={item.id} className="hover:bg-gray-50 transition-colors">
                <td className="p-3 font-medium text-slate-800">{item.title}</td>
                <td className="p-3 text-gray-600">{item.location}</td>
                <td className="p-3">
                  <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-bold">
                    Tier {item.riskRating}
                  </span>
                </td>
                <td className="p-3 text-right space-x-3">
                  <Link href={`/details/${item.id}`} className="text-teal-700 hover:underline font-medium">
                    View
                  </Link>
                  <button 
                    onClick={() => handleDelete(item.id, item.title)}
                    className="text-red-600 hover:underline font-medium"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}