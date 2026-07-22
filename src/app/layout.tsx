



import Navbar from "../Components/Navbar";
import Footer from "../Components/Footer";
import "./globals.css";
import { ToastContainer } from "react-toastify";

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="flex flex-col min-h-screen bg-slate-50 antialiased text-slate-800">
        
        {/* Navigation Layer */}
        <Navbar/>

        {/* Dynamic Page Workspace Views */}
        <main className="flex-1 bg-slate-50">
          {children}
        </main>

        {/* Footer Layer */}
        <Footer />
<ToastContainer/>
      </body>
    </html>
  );
}