'use client'
import type { Metadata } from "next";
import "./globals.css";

// Google Font Setup, We are using inter font face
import { Inter } from "next/font/google";
const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '700'], // optional
})
// Fontawesome configuration setup fo
import { config } from '@fortawesome/fontawesome-svg-core'
import '@fortawesome/fontawesome-svg-core/styles.css'
config.autoAddCss = false; // We are adding the autoAddClass to avoid the hydration page
// Desktop Navivation 
import DesktopNavigation from "@/components/ui/navigation/Desktop";
import Footer from "@/components/layout/Footer"
// SEO meta description
// export const metadata: Metadata = {
//   title: "Humber Learning APP",
//   description: "Learning through the online educational tech",
//   // viewport: "width=device-width, initial-scale=1.0",
// };
import Script from 'next/script'
import LoginPage from "@/components/ui/LoginPage";
import Home from "@/components/layout/Home";

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
          {/* <DesktopNavigation /> */}
          {/* <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-blue-200 p-4">Item 1</div>
          <div className="bg-green-200 p-4">Item 2</div>
          <div className="bg-red-200 p-4">Item 3</div>
        </div> */}
          <Home/>
          {children}
          {/* <LoginPage/> */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
