import Footer from "@/components/layout/Footer";
import DesktopNavigation from "@/components/ui/navigation/Desktop";
import React from "react";

export default function VideoLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <DesktopNavigation />
      {children}
      <Footer />
    </>
  );
}
