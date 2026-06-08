import Footer from "@/components/layout/Footer";
import DesktopNavigation from "@/components/ui/navigation/Desktop";
import { serverFetch } from "@/lib/fetch";
import React from "react";

export default async function VideoLayout({
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
