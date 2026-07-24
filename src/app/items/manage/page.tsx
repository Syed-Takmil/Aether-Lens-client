'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { toast } from 'react-toastify';
import { authClient } from '@/app/lib/auth-client';

interface Supplier {
  _id: string;
  title: string;
  riskRating: number;
  location: string;
  userId?: string;
}

export default function ManageSuppliersPage() {
  const { data: session } = authClient.useSession();
  const [suppliers, setSuppliers] = useState<Supplier[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSuppliers = async () => {
    if (!session?.user?.email) return;
    try {
      // Pass the user's email so backend can query the MongoDB _id
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers?userEmail=${encodeURIComponent(session.user.email)}`);
      const data = await res.json();
      if (res.ok) {
        setSuppliers(Array.isArray(data) ? data : (data.suppliers || []));
      } else {
        toast.error(data.error || 'Failed to fetch your suppliers.');
      }
    } catch (err) {
      toast.error('A network error occurred while loading suppliers.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (session?.user?.email) {
      fetchSuppliers();
    }
  }, [session]);

  const handleDelete = async (id: string, name: string) => {
    if (confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers/${id}`, {
          method: 'DELETE',
        });
        const data = await res.json();

        if (res.ok) {
          toast.success(data.message || 'Supplier records purged successfully.');
          setSuppliers(suppliers.filter(item => item._id !== id));
        } else {
          toast.error(data.error || 'Failed to delete supplier.');
        }
      } catch (err) {
        toast.error('A network error occurred during deletion.');
      }
    }
  };

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto my-12 p-6 bg-white rounded-xl border border-gray-200 shadow-sm text-center py-16">
        <p className="text-sm text-gray-500 animate-pulse">Loading your personal telemetry records...</p>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 bg-white rounded-xl border border-gray-200 shadow-sm">
      <h1 className="text-2xl font-bold text-slate-800 mb-2">Manage Your Added Suppliers</h1>
      <p className="text-sm text-gray-500 mb-6">Review and manage only the supplier profiles registered under your account.</p>

      {suppliers.length === 0 ? (
        <div className="text-center py-12 border border-dashed border-gray-200 rounded-lg">
          <p className="text-sm text-gray-500 mb-2">You haven't added any supplier profiles yet.</p>
          <Link href="/items/add" className="text-xs font-semibold text-teal-700 hover:underline">
            + Add your first supplier
          </Link>
        </div>
      ) : (
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
                <tr key={item._id} className="hover:bg-gray-50 transition-colors">
                  <td className="p-3 font-medium text-slate-800">{item.title}</td>
                  <td className="p-3 text-gray-600">{item.location}</td>
                  <td className="p-3">
                    <span className="bg-amber-100 text-amber-800 px-2 py-0.5 rounded text-xs font-bold">
                      Tier {item.riskRating}
                    </span>
                  </td>
                  <td className="p-3 text-right space-x-3">
                    <Link href={`/details/${item._id}`} className="text-teal-700 hover:underline font-medium">
                      View
                    </Link>
                    <button 
                      onClick={() => handleDelete(item._id, item.title)}
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
      )}
    </div>
  );
}