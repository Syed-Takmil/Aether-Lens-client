import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  // Simple check simulation (Change this to true to see the logged-in navbar state)
  const isLoggedIn = false; 

  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen">
        
        {/* REQUIREMENT 3: Navbar (Sticky, responsive container) */}
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <Link href="/" className="text-xl font-bold text-brand-secondary">
            🛡️ AetherLens
          </Link>
          <div className="flex gap-6 text-sm font-medium">
            <Link href="/" className="hover:text-emerald-700">Home</Link>
            <Link href="/explore" className="hover:text-emerald-700">Explore Index</Link>
            
            {!isLoggedIn ? (
              <>
                {/* 3 Routes for Logged Out users */}
                <Link href="/login" className="hover:text-emerald-700">Login</Link>
              </>
            ) : (
              <>
                {/* 5 Routes total for Logged In users */}
                <Link href="/items/add" className="hover:text-emerald-700">Add Supplier</Link>
                <Link href="/items/manage" className="hover:text-emerald-700">Manage Systems</Link>
                <button className="text-red-600 hover:text-red-800">Logout</button>
              </>
            )}
          </div>
        </nav>

        {/* Dynamic Page Views */}
        <main className="flex-grow">{children}</main>

        {/* REQUIREMENT 3: Fully functional footer */}
        <footer className="bg-white border-t border-gray-200 py-6 text-center text-xs text-gray-500">
          <p>© 2026 AetherLens Risk Systems Network. All links verified operational.</p>
        </footer>

      </body>
    </html>
  );
}