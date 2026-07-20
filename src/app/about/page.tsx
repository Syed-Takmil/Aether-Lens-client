'use client';

import React from 'react';

export default function AboutPage() {
  return (
    <div className="max-w-4xl mx-auto my-12 p-8 bg-white border border-gray-200 rounded-xl shadow-sm text-slate-800">
      <div className="border-b pb-4 mb-6">
        <h1 className="text-3xl font-bold text-slate-950">About AetherLens</h1>
        <p className="text-sm text-gray-500 mt-1">Autonomous Supply Chain Risk Intelligence & Analysis.</p>
      </div>

      <div className="space-y-6 text-sm leading-relaxed text-gray-600">
        <p>
          <strong>AetherLens</strong> is a modern logistics asset tracking platform designed to evaluate, catalog, and mitigate operational risks across multi-tiered global supplier infrastructures. 
        </p>
        
        <div>
          <h2 className="text-lg font-bold text-slate-900 mb-2">How It Works</h2>
          <ul className="list-disc pl-5 space-y-2">
            <li><strong>Supplier Index Matrix:</strong> Organizes international factory centers, processing plants, and mineral extraction hubs within a structured repository.</li>
            <li><strong>Risk Threat Metrics:</strong> Evaluates facilities on a transparent Tier 1 to Tier 5 severity rating framework to isolate supply disruptions before they cascade.</li>
            <li><strong>Agentic AI Auditing:</strong> Leverages deep contextual AI models to instantly extract environmental data, regulatory shift impacts, and regional conflicts from supplier profiles.</li>
          </ul>
        </div>

        <div className="bg-slate-50 p-4 rounded-lg border border-gray-100">
          <p className="font-medium text-slate-900">System Parameters:</p>
          <p className="text-xs text-gray-500 mt-1">
            Running Engine Version: v2.4.0-Production // Core Client Architecture Node Stack // Node-Gemini Pipeline Enabled
          </p>
        </div>
      </div>
    </div>
  );
}