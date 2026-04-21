import type { ReactNode } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";

export default function MainLayout({ children }: { children: ReactNode }) {
  return (
    <div dir="rtl" className="min-h-screen flex flex-col font-sans bg-gray-50 text-gray-800">
      <Navbar />
      <main className="flex-1">
        {children}
      </main>
      <Footer />
    </div>
  );
}
