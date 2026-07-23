export default function FAQSection() {
  return (
    <section className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <h2 className="text-2xl font-bold mb-6 text-center text-slate-900">Frequently Asked Inquiries</h2>
      <div className="space-y-4 text-sm">
        <div className="border-b border-gray-100 pb-3">
          <h4 className="font-semibold text-slate-900">How do AI Agents identify localized vulnerabilities?</h4>
          <p className="text-gray-600 mt-1">Agents parse telemetry logs looking for deviations from standard production baselines.</p>
        </div>
        <div className="pb-1">
          <h4 className="font-semibold text-slate-900">Is my local warehouse data securely encrypted?</h4>
          <p className="text-gray-600 mt-1">All data blocks use industry-standard JSON Web Token verification before processing.</p>
        </div>
      </div>
    </section>
  );
}