import Link from 'next/link';

export default function CallToAction() {
  return (
    <section className="bg-slate-950 text-white p-12 rounded-xl text-center space-y-4 shadow-xl">
      <h2 className="text-3xl font-bold">Secure Your Pipeline Resilience Matrix</h2>
      <p className="text-sm text-gray-400 max-w-md mx-auto">Establish verified baseline profiles for external suppliers inside our decentralized network tracker.</p>
      <Link href="/register" className="inline-block bg-teal-600 px-6 py-3 rounded text-sm font-medium hover:bg-teal-700 transition shadow-sm">
        Initialize Free Operator Profile
      </Link>
    </section>
  );
}
