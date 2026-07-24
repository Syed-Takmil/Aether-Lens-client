'use client';

import React, { useState } from 'react';
import { authClient } from '@/app/lib/auth-client'; // 👈 Import auth client
import { toast } from 'react-toastify';

export default function AddSupplierPage() {
  const { data: session } = authClient.useSession(); // 👈 Get current session

  // Store form inputs in state
  const [title, setTitle] = useState('');
  const [shortDescription, setShortDescription] = useState('');
  const [fullDescription, setFullDescription] = useState('');
  const [riskRating, setRiskRating] = useState('1');
  const [location, setLocation] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  
  // AI Feature States (Requirement 11-E)
  const [category, setCategory] = useState('Electronics');
  const [tags, setTags] = useState<string[]>([]);
  const [classifying, setClassifying] = useState(false);

  // Requirement 11-E: Call AI Auto-Classification Engine
  const handleAutoClassify = async () => {
    if (!fullDescription || fullDescription.length < 15) {
      toast.error('Please write a bit more in the Full Detailed Analysis section so the AI has context to read.');
      return;
    }
    setClassifying(true);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agent/auto-classify`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ fullDescription }),
      });
      const data = await res.json();
      
      if (data.suggestedCategory) setCategory(data.suggestedCategory);
      if (data.generatedTags) setTags(data.generatedTags);
    } catch (err) {
      toast.error('Could not establish contact with the AI classification node.');
    } finally {
      setClassifying(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!session?.user?.email) {
      toast.success('Authentication required: Please log in to submit a supplier profile.');
      return;
    }

    const payload = {
      title,
      shortDescription,
      fullDescription,
      category,
      riskRating: parseInt(riskRating),
      location: location || "Global Grid",
      imageUrl,
      userEmail: session.user.email // 👈 Passed so backend can lookup DB user ObjectId
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers/add`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        toast.success(`Profile successfully deployed to system cluster: ${title}`);
        setTitle('');
        setShortDescription('');
        setFullDescription('');
        setLocation('');
        setImageUrl('');
        setTags([]);
        setCategory('Electronics');
      } else {
        toast.error('Failed to transmit records to core pipeline.');
      }
    } catch (err) {
      console.error('Network failure connecting to data node:', err);
    }
  };

  return (
    <div className="max-w-2xl mx-auto my-12 p-8 bg-white rounded-xl border border-gray-200 shadow-sm text-slate-800">
      <h1 className="text-2xl font-bold mb-2 text-slate-800">Add New Global Supplier Profile</h1>
      <p className="text-sm text-gray-500 mb-6">Register a new manufacturing facility or logistical cluster into the monitoring framework.</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-semibold mb-1">Supplier / Factory Name</label>
          <input 
            type="text" 
            required
            placeholder="e.g., Apex Microconductors Lab" 
            className="w-full border p-2 rounded-md focus:outline-teal-700"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Regional Base Location</label>
          <input 
            type="text" 
            required
            placeholder="e.g., Hsinchu, Taiwan" 
            className="w-full border p-2 rounded-md focus:outline-teal-700"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Short Description</label>
          <input 
            type="text" 
            required
            placeholder="One sentence summary of logistics operations..." 
            className="w-full border p-2 rounded-md focus:outline-teal-700"
            value={shortDescription}
            onChange={(e) => setShortDescription(e.target.value)}
          />
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Full Detailed Analysis</label>
          <textarea 
            rows={4}
            required
            placeholder="Provide deep structural logs regarding material sourcing, employee counts, and operating parameters..." 
            className="w-full border p-2 rounded-md focus:outline-teal-700"
            value={fullDescription}
            onChange={(e) => setFullDescription(e.target.value)}
          />
          
          <div className="mt-2 p-3 bg-slate-900 text-white rounded-md flex flex-col sm:flex-row sm:items-center justify-between gap-3 shadow-sm">
            <div className="text-xs">
              <span className="block font-bold text-emerald-400">🪄 AI Classification Assistant</span>
              Analyze this dossier layout to automatically categorize and generate database tracking tags.
            </div>
            <button
              type="button"
              disabled={classifying}
              onClick={handleAutoClassify}
              className="bg-emerald-600 hover:bg-emerald-500 text-white font-medium text-xs px-4 py-2 rounded transition disabled:bg-slate-700 shrink-0"
            >
              {classifying ? '⚡ Running Models...' : 'AI Classify Profile'}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 bg-slate-50 p-4 rounded-lg border border-dashed">
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Operational Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className="w-full text-sm border p-2 rounded-md bg-white outline-none"
            >
              <option value="Electronics">Electronics</option>
              <option value="Raw Materials">Raw Materials</option>
              <option value="Logistical Services">Logistical Services</option>
              <option value="Energy & Infrastructure">Energy & Infrastructure</option>
              <option value="Chemical Processing">Chemical Processing</option>
            </select>
          </div>
          <div>
            <label className="block text-xs font-bold uppercase text-gray-500 mb-1">Generated Tags</label>
            <div className="flex flex-wrap gap-1.5 p-2 bg-white rounded-md border min-h-[38px] items-center">
              {tags.length === 0 ? (
                <span className="text-xs text-gray-400 italic pl-1">No AI labels assigned</span>
              ) : (
                tags.map((tag, i) => (
                  <span key={i} className="text-xs bg-teal-50 text-teal-800 border border-teal-200 px-2 py-0.5 rounded-md font-medium">
                    {tag}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Operational Threat Level (Risk Metric)</label>
          <select 
            className="w-full border p-2 rounded-md focus:outline-teal-700"
            value={riskRating}
            onChange={(e) => setRiskRating(e.target.value)}
          >
            <option value="1">Tier 1 - Fully Compliant / Clear</option>
            <option value="2">Tier 2 - Minor Operational Friction</option>
            <option value="3">Tier 3 - Active Operational Vulnerability</option>
            <option value="4">Tier 4 - Severe Logistical Warning</option>
            <option value="5">Tier 5 - Critical Failure Impending</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-semibold mb-1">Facility Image URL (Optional)</label>
          <input 
            type="url" 
            placeholder="https://example.com/factory-photo.jpg" 
            className="w-full border p-2 rounded-md focus:outline-teal-700"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </div>

        <button 
          type="submit" 
          className="w-full bg-teal-700 text-white font-medium p-2.5 rounded-md hover:bg-teal-800 transition shadow-sm"
        >
          Add Supplier
        </button>
      </form>
    </div>
  );
}