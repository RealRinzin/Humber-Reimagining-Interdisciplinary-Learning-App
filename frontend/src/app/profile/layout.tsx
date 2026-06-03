// 'use client'
import Footer from "@/components/layout/Footer";
import DesktopNavigation from "@/components/ui/navigation/Desktop";
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "700"], // optional
});
import { Metadata } from "next";
import React from "react";
export const metadata: Metadata = {
  title: 'Profile Page | Humber College Gaming Department',
  description: 'Profile Page | Humber College Gaming Department',
}
export default function ProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (

    <>
      <DesktopNavigation />
      {children}
      <Footer />
    </>
  );
}
