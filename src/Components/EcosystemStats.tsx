export default function EcosystemStats() {
  return (
    <section className="bg-teal-700 text-white p-8 rounded-xl text-center shadow-md">
      <h2 className="text-2xl font-bold mb-2">Ecosystem Vital Statistics</h2>
      <p className="text-sm opacity-90 mb-6">Live continuous telemetry analysis operating globally.</p>
      <div className="grid grid-cols-3 gap-4 font-mono text-xl font-bold">
        <div>99.98%<br/><span className="text-xs font-sans font-normal opacity-75">Uptime Grid</span></div>
        <div>4.8k<br/><span className="text-xs font-sans font-normal opacity-75">Audited Hubs</span></div>
        <div>&lt; 2s<br/><span className="text-xs font-sans font-normal opacity-75">Agent Response</span></div>
      </div>
    </section>
  );
}
