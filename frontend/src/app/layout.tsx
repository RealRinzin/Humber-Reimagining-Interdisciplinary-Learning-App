
import type { Metadata } from "next";
import "./globals.css";

// Google Font Setup, We are using inter font face
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // optional
})
// Fontawesome configuration setup fo
// 
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false; // We are adding the autoAddClass to avoid the hydration page
// Desktop Navivation 
import DesktopNavigation from "@/components/ui/navigation/Desktop";
import Footer from "@/components/layout/Footer"
// SEO meta description
export const metadata: Metadata = {
  title: "Humber Space Project - Gaming Department",
  description: "Learning through the online educational tech",
  // viewport: "width=device-width, initial-scale=1.0",
};
const currentStep = 1;
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={inter.className}>
      <title>Humber Space Project </title>
      <link rel="icon" href="/img/logo/favicon-32x32.png" />
      <body>
          {children}
      </body>
    </html>
  );
}
