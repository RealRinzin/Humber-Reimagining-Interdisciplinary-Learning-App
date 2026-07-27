"use client";
import Footer from "@/components/layout/Footer";
import Navigation from "@/components/layout/Navigation";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Navigation />
      <main className="min-h-screen bg-white">{children}</main>
      <Footer />
    </>
  );
}

// export default DashboardLayout;
