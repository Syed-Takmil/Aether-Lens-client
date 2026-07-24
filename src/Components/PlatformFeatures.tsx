export default function PlatformFeatures() {
  const features = [
    {
      icon: "📊",
      title: "Machine Telemetry Logs",
      description: "Real-time ingestion of IoT sensor data, tracking predictive maintenance anomalies, uptime performance, and industrial throughput metrics."
    },
    {
      icon: "👁️",
      title: "Multi-modal AI Inspections",
      description: "Automated computer vision and generative telemetry analysis powered by advanced Gemini models to surface hidden supply chain risks instantly."
    },
    {
      icon: "🛡️",
      title: "Secure Cryptographic Signatures",
      description: "Verifiable supplier profiles and tamper-proof audit trails backed by native database security and cryptographic tracking."
    }
  ];

  return (
    <section className="py-12 px-4 max-w-7xl mx-auto text-center">
      <div className="mb-10">
        <span className="text-xs font-semibold uppercase tracking-wider text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full">
          Industrial Intelligence
        </span>
        <h2 className="text-3xl font-extrabold mt-3 text-slate-900 tracking-tight">
          Platform Features & Capabilities
        </h2>
        <p className="text-slate-600 mt-2 max-w-2xl mx-auto text-sm">
          Built for modern supply chain management, offering deep automated insight and rigorous risk oversight.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {features.map((feature, index) => (
          <div 
            key={index} 
            className="bg-white p-8 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300 text-left flex flex-col justify-between group"
          >
            <div>
              <div className="text-3xl mb-4 p-3 bg-slate-50 w-fit rounded-xl group-hover:scale-110 transition-transform duration-300">
                {feature.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
            
            <div className="mt-6 pt-4 border-t border-gray-50 flex items-center text-xs font-semibold text-indigo-600">
              <span>Explore module</span>
              <span className="ml-1 group-hover:translate-x-1 transition-transform duration-200">→</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}