import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-50 antialiased text-slate-800">
        
        {/* Navigation Layer */}
        <Navbar />

        {/* Dynamic Page Workspace Views */}
        <main className="flex-grow bg-slate-50">
          {children}
        </main>

        {/* Footer Layer */}
        <Footer />

      </body>
    </html>
  );
}