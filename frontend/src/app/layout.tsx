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
import Footer from "@/components/layout/Footer";

// SEO meta description
// export const metadata: Metadata = {
//   title: "Humber Learning APP",
//   description: "Learning through the online educational tech",
//   // viewport: "width=device-width, initial-scale=1.0",
// };
import { useEffect, useRef } from 'react'
import Script from 'next/script'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  const ref = useRef<HTMLDivElement>(null)
  const initVanta = () => {
    if ((window as any).VANTA && ref.current) {
      ; (window as any).VANTA.NET({
        el: ref.current,
        color: 0xff3f81,         // line/dot color
        backgroundColor: 0x0b1220, // background color
        points: 12,              // number of points
        maxDistance: 20,         // how far points connect
        spacing: 18,             // spacing between points
        showDots: true,          // show dots at intersections
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.0,
        scaleMobile: 1.0,
        // camera zoom
        minHeight: 200,
        minWidth: 200,
      })
    }
  }

  return (
    <html lang="en" className={inter.className}>
      <link rel="icon" href="/img/logo/favicon-32x32.png" />
      <body>
        <Script
          src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
          strategy="beforeInteractive"
        />
        <Script
          src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
          strategy="afterInteractive"
          onLoad={initVanta}
        />
        <div ref={ref} style={{ width: '100%', height: '100vh' }} />
        {/* <DesktopNavigation /> */}
        {/* <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-blue-200 p-4">Item 1</div>
          <div className="bg-green-200 p-4">Item 2</div>
          <div className="bg-red-200 p-4">Item 3</div>
        </div> */}
        {/* {children} */}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
