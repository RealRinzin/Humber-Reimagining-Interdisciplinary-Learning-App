"use client";

import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";

function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">{children}</div>
      </main>
      <Footer />
    </>
  );
}

export default DashboardLayout;
