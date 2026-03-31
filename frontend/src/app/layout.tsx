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
const steps = [
  { number: 1, label: "Personal\nDetails" },
  { number: 2, label: "Select\nContent" },
  { number: 3, label: "Learning\nPath" },
  { number: 4, label: "Show\nProgress" },
];

const currentStep = 1;
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
        <div ref={ref} style={{ width: '100%', height: '100vh' }} >
          <div className="flex justify-center-safe items-center h-screen">
            <div className="w-full max-w-xl rounded-2xl bg-slate-300/60 backdrop-blur-md p-10 shadow-xl">

              {/* Step Indicator */}
              <div className="flex items-start justify-between mb-10">
                {steps.map((step, i) => {
                  const isActive = step.number === currentStep;
                  const isCompleted = step.number < currentStep;
                  const isLast = i === steps.length - 1;

                  return (
                    <div key={step.number} className="flex items-start flex-1">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                    ${isActive ? "bg-slate-700 text-white" : "bg-slate-400/60 text-slate-500"}`}
                        >
                          {step.number}
                        </div>
                        <span className="text-[10px] text-center text-slate-500 leading-tight whitespace-pre-line">
                          {step.label}
                        </span>
                      </div>

                      {/* Connector line */}
                      {!isLast && (
                        <div className="flex-1 mt-3.5 mx-1">
                          <div className={`h-px border-t border-dashed ${isCompleted ? "border-slate-600" : "border-slate-400/70"}`} />
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Title */}
              <div className="mb-6">
                <h2 className="text-xl font-bold text-slate-800 text-center">Personal Details</h2>
                <div className="mt-2 border-t border-slate-400/50" />
              </div>

              {/* Fields */}
              <div className="space-y-5">
                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Name</label>
                  <input
                    type="text"
                    placeholder="Full Name"
                    className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-sm font-medium text-slate-700">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    className="w-full rounded-lg bg-white/70 border border-slate-300 px-4 py-2.5 text-sm text-slate-700 placeholder-slate-400 outline-none focus:ring-2 focus:ring-slate-400"
                  />
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-end gap-4 mt-8">
                <button className="text-sm text-slate-500 underline underline-offset-2 hover:text-slate-700">
                  Return
                </button>
                <button className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
                  Next
                </button>
              </div>

            </div>

          </div>


          {/* <DesktopNavigation /> */}
          {/* <div className="flex flex-col md:flex-row gap-4">
          <div className="bg-blue-200 p-4">Item 1</div>
          <div className="bg-green-200 p-4">Item 2</div>
          <div className="bg-red-200 p-4">Item 3</div>
        </div> */}
          {/* {children} */}
        </div>
        {/* <Footer /> */}
      </body>
    </html>
  );
}
