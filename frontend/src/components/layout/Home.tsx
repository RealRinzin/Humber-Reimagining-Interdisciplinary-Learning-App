"use client";
import { useRef } from "react";
import Script from "next/script";
import OnBoardingRegistration from "../ui/onboarding/Register";
import OnBoardingPersonalDetail from "../ui/onboarding/PersonalDetail";
export default function Home() {
  const ref = useRef<HTMLDivElement>(null);
  const initVanta = () => {
    if ((window as any).VANTA && ref.current) {
      (window as any).VANTA.NET({
        el: ref.current,
        color: 0xff3f81, // line/dot color
        backgroundColor: 0x0b1220, // background color
        points: 12, // number of points
        maxDistance: 20, // how far points connect
        spacing: 18, // spacing between points
        showDots: true, // show dots at intersections
        mouseControls: true,
        touchControls: true,
        gyroControls: false,
        scale: 1.0,
        scaleMobile: 1.0,
        // camera zoom
        minHeight: 200,
        minWidth: 200,
      });
    }
  };

  return (
    <>
      <Script
        src="https://cdnjs.cloudflare.com/ajax/libs/three.js/r134/three.min.js"
        strategy="beforeInteractive"
      />
      <Script
        src="https://cdn.jsdelivr.net/npm/vanta@latest/dist/vanta.net.min.js"
        strategy="afterInteractive"
        onLoad={initVanta}
      />
      <div ref={ref} style={{ width: "100%", height: "100vh" }}>
        <OnBoardingRegistration/>
        {/* <OnBoardingPersonalDetail/> */}
      </div>
    </>
  );
}
