'use client';

import React, { useState, useEffect, use } from 'react';
import Link from 'next/link';

interface SupplierData {
  _id: string;
  title: string;
  shortDescription: string;
  fullDescription: string;
  category: string;
  riskRating: number;
  location: string;
  imageUrl?: string;
  createdAt?: string;
}

export default function SupplierDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const targetId = resolvedParams.id;

  // React State Hooks
  const [supplier, setSupplier] = useState<SupplierData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');
  
  // AI Agent States
  const [aiReport, setAiReport] = useState<string>('');
  const [analyzing, setAnalyzing] = useState<boolean>(false);

  // Fetch real supplier info from MongoDB on mount
  useEffect(() => {
    fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/suppliers/${targetId}`)
      .then((res) => {
        if (!res.ok) throw new Error('Could not retrieve supplier records from backend.');
        return res.json();
      })
      .then((data) => {
        setSupplier(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  }, [targetId]);

  // Requirement 11-D: Trigger AI Agent Telemetry Analyzer
  const runAgentAudit = async () => {
    if (!supplier) return;
    setAnalyzing(true);
    setAiReport('');

    const telemetryPayload = {
      supplierName: supplier.title,
      declaredRiskScore: supplier.riskRating,
      industryCategory: supplier.category,
      geographicalBase: supplier.location,
      systemCheckTimestamp: new Date().toISOString()
    };

    try {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/agent/analyze-telemetry`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ dataPayload: telemetryPayload }),
      });
      const data = await response.json();
      setAiReport(data.analysisReport || 'Agent returned an empty report pipeline.');
    } catch (err) {
      setAiReport('System failure contacting the autonomous intelligence node.');
    } finally {
      setAnalyzing(false);
    }
  };

// REQUIREMENT 11-D: High-Fidelity Client-Side PDF Generation via CDN Injection
const downloadPDFReport = () => {
  if (!aiReport || !supplier) return;

  // 1. Create a clean container off-screen to hold the stylized printable report content
  const element = document.createElement('div');
  element.style.padding = '40px';
  element.style.color = '#334155';
  element.style.fontFamily = 'Arial, sans-serif';
  element.style.backgroundColor = '#ffffff';

  // 2. Format raw markdown text into beautiful semantic HTML for the document engine
  const cleanHtml = aiReport
    .replace(/^### (.*$)/gim, '<h3 style="font-size: 16px; margin-top: 24px; color: #0f172a; border-bottom: 1px solid #e2e8f0; padding-bottom: 6px; font-weight: bold;">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 style="font-size: 20px; color: #0f172a; margin-top: 28px; font-weight: bold;">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 style="font-size: 26px; color: #0f172a; margin-bottom: 12px; font-weight: bold;">$1</h1>')
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/- (.*$)/gim, '<li style="margin-bottom: 6px; margin-left: 16px;">$1</li>')
    .replace(/\n/g, '<br />');

  element.innerHTML = `
    <div style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #0d9488; font-weight: bold; margin-bottom: 20px; border-bottom: 2px solid #0d9488; padding-bottom: 4px;">
      🛡️ AetherLens Global Risk Telemetry Report
    </div>
    <div style="margin-bottom: 15px; font-size: 13px; color: #64748b;">
      <strong>Target Profile Node:</strong> ${supplier.title} <br />
      <strong>Regional Base Operations:</strong> ${supplier.location}
    </div>
    ${cleanHtml}
  `;

  // 3. Inject the external html2pdf compilation script dynamically if not already loaded
  if (typeof window !== 'undefined' && !(window as any).html2pdf) {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js';
    script.onload = () => executePdfDownload(element);
    document.head.appendChild(script);
  } else {
    executePdfDownload(element);
  }
};

// Internal utility to fire the file configuration saver directly
const executePdfDownload = (htmlElement: HTMLElement) => {
  if (!supplier) return;
  const safeFilename = supplier.title.toLowerCase().replace(/[^a-z0-9]/g, '-');
  
  const options = {
    margin: 15,
    filename: `risk-audit-${safeFilename}.pdf`,
    image: { type: 'jpeg', quality: 0.98 },
    html2canvas: { scale: 2, useCORS: true },
    jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  // Convert HTML element straight to a downloaded PDF file on the fly
  (window as any).html2pdf().set(options).from(htmlElement).save();
};

  if (loading) {
    return (
      <div className="max-w-5xl mx-auto my-12 p-8 space-y-6">
        <div className="bg-gray-200 h-64 w-full rounded-xl animate-pulse" />
        <div className="h-8 bg-gray-200 w-1/3 rounded animate-pulse" />
        <div className="h-4 bg-gray-200 w-full rounded animate-pulse" />
      </div>
    );
  }

  if (error || !supplier) {
    return (
      <div className="max-w-5xl mx-auto my-12 p-6 text-center">
        <div className="bg-red-50 text-red-700 p-6 rounded-xl border border-red-200">
          <p className="font-semibold">Data Retrieval Failure</p>
          <p className="text-sm mt-1">{error || 'Requested profile could not be matched.'}</p>
        </div>
        <Link href="/explore" className="inline-block mt-4 text-sm text-teal-700 hover:underline">
          ← Return to Supplier Index
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto my-12 p-6 md:p-8 bg-white rounded-xl border border-gray-200 shadow-sm text-slate-800">
      
      {/* Visual Header Banner - Hidden during PDF compilation print mode */}
      <div className="print:hidden relative h-64 md:h-80 w-full rounded-lg overflow-hidden mb-8 border border-gray-100">
        <img 
          src={supplier.imageUrl || 'https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&w=800&q=80'} 
          alt={supplier.title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-4 left-4 text-white text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-teal-800">
          {supplier.category}
        </div>
      </div>

      {/* Grid Layout Split */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Core Profile Context - Hidden during PDF output stream execution */}
        <div className="md:col-span-2 space-y-6 print:w-full print:col-span-3">
          <div className="print:block">
            <h1 className="text-3xl font-extrabold text-slate-900 mb-1">{supplier.title}</h1>
            <p className="text-sm text-gray-500 font-medium">📍 Regional Base Operations: {supplier.location}</p>
          </div>

          <div className="border-t pt-4 print:hidden">
            <h3 className="text-lg font-bold mb-2">Operational Context Summary</h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4">{supplier.shortDescription}</p>
            <h4 className="text-sm font-semibold text-slate-800 mb-2">Full Structural Dossier</h4>
            <p className="text-sm text-gray-600 leading-relaxed bg-slate-50 p-4 rounded-lg border">
              {supplier.fullDescription}
            </p>
          </div>

          {/* REQUIREMENT 11-D: Agent Data Interface Widget Container */}
          <div className="border-t pt-6 print:border-none print:pt-2">
            <div className="bg-slate-900 text-white p-6 rounded-xl space-y-4 print:bg-white print:text-slate-900 print:p-0">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 print:hidden">
                <div>
                  <h3 className="text-lg font-bold text-emerald-400">🛡️ Agentic AI Risk Evaluator</h3>
                  <p className="text-xs text-slate-400">Asynchronously queries Gemini to parse this profile metrics for active supply vulnerabilities.</p>
                </div>
                <div className="flex gap-2">
                  {aiReport && (
                    <button
                      onClick={downloadPDFReport}
                      className="bg-emerald-600 text-white font-medium text-xs px-4 py-2.5 rounded hover:bg-emerald-500 transition shadow"
                    >
                      📄 Download PDF Report
                    </button>
                  )}
                  <button
                    onClick={runAgentAudit}
                    disabled={analyzing}
                    className="bg-teal-600 text-white font-medium text-xs px-4 py-2.5 rounded hover:bg-teal-500 transition disabled:bg-slate-700"
                  >
                    {analyzing ? '🔄 Processing Telemetry...' : 'Run Autonomous Audit'}
                  </button>
                </div>
              </div>

              {aiReport && (
                <div className="bg-slate-950 p-5 rounded-lg border border-slate-800 text-sm font-mono text-slate-200 overflow-x-auto whitespace-pre-wrap print:bg-white print:text-slate-900 print:border-none print:p-0">
                  {aiReport}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sidebar Meta Info Metrics Container - Hidden in print setup layout */}
        <div className="space-y-6 print:hidden">
          <div className="bg-slate-50 p-5 rounded-xl border border-gray-200 space-y-4">
            <h4 className="text-xs font-bold uppercase tracking-wider text-gray-400">Live Database Ingestion</h4>
            
            <div className="border-b pb-3">
              <span className="block text-xs text-gray-500">Threat Declaration Index</span>
              <span className="text-2xl font-black text-amber-600">Tier {supplier.riskRating}</span>
            </div>

            <div>
              <span className="block text-xs text-gray-500">Record Instantiation</span>
              <span className="text-sm font-medium text-slate-700">
                {supplier.createdAt ? new Date(supplier.createdAt).toLocaleDateString() : 'Active Node'}
              </span>
            </div>
          </div>
        </div>

      </div>

      {/* Global Print Modifier Stylesheet CSS Formula Block */}
      <style jsx global>{`
        @media print {
          body {
            background: white !important;
            color: black !important;
          }
          .print\:hidden {
            display: none !important;
          }
          .print\:block {
            display: block !important;
          }
          .print\:p-0 {
            padding: 0 !important;
          }
          .print\:w-full {
            width: 100% !important;
          }
        }
      `}</style>
    </div>
  );
}