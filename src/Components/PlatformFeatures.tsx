export default function PlatformFeatures() {
  return (
    <section className="text-center">
      <h2 className="text-2xl font-bold mb-6 text-slate-900">Platform Features</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-slate-700 font-medium">📊 Machine Telemetry Logs</div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-slate-700 font-medium">👁️ Multi-modal AI Inspections</div>
        <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm text-slate-700 font-medium">🛡️ Secure Cryptographic Signatures</div>
      </div>
    </section>
  );
}