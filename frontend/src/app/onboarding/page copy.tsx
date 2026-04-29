"use client";
import OnBoardingLearningPath from "@/components/ui/onboarding/LearningPath";
import OnBoardingPersonalDetail from "@/components/ui/onboarding/PersonalDetail";
import OnBoardingSelectContent from "@/components/ui/onboarding/SelectContent";
import OnBoardingShowProgress from "@/components/ui/onboarding/ShowProgress";
import { OnboardStepsType } from "@/types/onboard/onboard-types";
import dynamic from "next/dynamic";
import Script from "next/script";
import { useRef, useState } from "react";

export default function OnboardingPage() {
  // Activated and Deactive form components
  const [onBoardingForm, setOnBoardingForm] = useState<OnboardStepsType[]>([
    { number: 1, label: "Personal\nDetails", status: true },
    { number: 2, label: "Select\nContent", status: true },
    { number: 3, label: "Learning\nPath", status: false },
    { number: 4, label: "Show\nProgress", status: false },
  ]);

  // setDetail(prev =>
  //   prev.map(item =>
  //     item.number === 2 ? { ...item, selectContent: true } : item
  //   )
  // )
  // const handleNext = () => {
  //   setOnBoardingForm((prev) =>
  //     prev.map((item) =>
  //       item.number === 2 ? { ...item, selectContentForm: true } : item,
  //     ),
  //   );
  // };
  // console.log(onBoardingForm);

  //Select Content
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

  //
  const steps = [
    { number: 1, label: "Personal\nDetails" },
    { number: 2, label: "Select\nContent" },
    { number: 3, label: "Learning\nPath" },
    { number: 4, label: "Show\nProgress" },
  ];
  const currentStep = 1;
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
        <div className="flex justify-center-safe items-center-safe h-screen">
          <div className="w-full max-w-xl rounded-2xl bg-slate-300/60 backdrop-blur-md p-10 shadow-xl">
            {/* Step Indicator */}
            <div className="flex items-start justify-between mb-10">
              {onBoardingForm.map((step) => (
                <div key={step.number} className="flex items-start flex-1">
                  <div className="flex flex-col items-center gap-1">
                    <div
                      className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                    ${ step.status? "bg-slate-700 text-white" : "bg-slate-400/60 text-slate-500"}`}
                    >
                      {step.number}
                    </div>
                    <span className="text-[10px] text-center text-slate-600  leading-tight whitespace-pre-line">
                      {step.label}
                    </span>
                  </div>

                  {/* Connector line */}
                  {/* {!step.status && ( */}
                    <div className="flex-1 mt-3.5 mx-1">
                      <div
                        className={`h-px border-t border-dashed ${step.status ? "border-slate-400" : "border-slate-300/70"}`}
                      />
                    </div>
                  {/* )} */}
                </div>
              ))}


{/* 
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
                      <span className="text-[10px] text-center text-slate-600  leading-tight whitespace-pre-line">
                        {step.label}
                      </span>
                    </div> */}

                    {/* Connector line */}
                    {/* {!isLast && (
                      <div className="flex-1 mt-3.5 mx-1">
                        <div
                          className={`h-px border-t border-dashed ${isCompleted ? "border-slate-400" : "border-slate-300/70"}`}
                        />
                      </div>
                    )} */}
                  {/* </div>
                );
              })} */}
            </div>

            {/* Individual */}
            {onBoardingForm[0].status && (
              <OnBoardingPersonalDetail />
            )}
  
            {onBoardingForm[1].status && <OnBoardingSelectContent />}
            {onBoardingForm[2].status && <OnBoardingLearningPath />}
            {onBoardingForm[3].status && <OnBoardingShowProgress />}

            {/* Actions */}
            <div className="flex items-center justify-end gap-4 mt-8">
              <button className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
                Back
              </button>
              <button className="bg-slate-700 hover:bg-slate-800 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors">
                Next
              </button>
            </div>
            <p className="text-gray-800 text-xs mt-4 pt-2 flex">
              Already have account?
              <a
                href="/"
                className="text-slate-900 font-extrabold hover:text-slate-900 px-2 underline"
              >
                Login here
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
