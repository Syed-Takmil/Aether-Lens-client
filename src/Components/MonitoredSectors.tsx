export default function MonitoredSectors() {
  return (
    <section className="text-center">
      <h2 className="text-2xl font-bold mb-4 text-slate-900">Monitored Sectors</h2>
      <div className="flex flex-wrap justify-center gap-4 text-sm font-medium text-slate-700">
        <span className="bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">Heavy Industrial</span>
        <span className="bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">Aerospace Refining</span>
        <span className="bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">Semiconductor Labs</span>
        <span className="bg-white border border-gray-200 px-4 py-2 rounded-full shadow-sm">Maritime Cargo</span>
      </div>
    </section>
  );
}