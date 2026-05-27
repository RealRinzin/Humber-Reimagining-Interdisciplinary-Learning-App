"use client";
import OnBoardingLearningPath from "@/components/ui/onboarding/LearningPath";
import OnBoardingPersonalDetail from "@/components/ui/onboarding/PersonalDetail";
import OnBoardingSelectContent from "@/components/ui/onboarding/SelectContent";
import OnBoardingShowProgress from "@/components/ui/onboarding/ShowProgress";
import {
  OnboardPersonalDetailType,
  OnboardSelectContentType,
  OnboardStepsType,
  OnboardLearningPathType,
  OnboardShowProgressType,
} from "@/types/onboard/onboard-types";
import Script from "next/script";
import { useRef, useState } from "react";

export default function OnboardingPage() {
  const [formData, setFormData] = useState<{
    personalDetail: OnboardPersonalDetailType; // or Partial<>
    selectContent: OnboardSelectContentType;
    learningPath: OnboardLearningPathType;
    showProgress: OnboardShowProgressType;
  }>({
    personalDetail: { name: "", username: "", password: "" }, // or a default object with empty strings
    selectContent: {
      video: false,
      interactive: false,
      code: false,
      quiz: false,
      rambling: false,
    },
    learningPath: { explore_mode: false, guide_path: false },
    showProgress: { progress: false },
  });
  // Data pass
  const [currentStep, setCurrentStep] = useState(0);
  // Next Handle
  const handleNext = (stepKey: string, data: any) => {
    setFormData((prev) => ({ ...prev, [stepKey]: data }));
    if (currentStep < onBoardingForm.length - 1) {
      setCurrentStep((prev) => prev + 1);
    }
  };
  // back button
  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const components = [
    <OnBoardingPersonalDetail
      onSuccess={(data) => handleNext("personalDetail", data)}
      values={formData.personalDetail}
    />,
    <OnBoardingSelectContent
      onSuccess={(data) => handleNext("selectContent", data)}
      values={formData.selectContent}
    />,
    <OnBoardingLearningPath
      onSuccess={(data) => handleNext("learningPath", data)}
      values={formData.learningPath}
    />,
    <OnBoardingShowProgress
      onSuccess={(data) => handleNext("showProgress", data)}
      values={formData.showProgress}
      personalDetail={formData.personalDetail}
      selectContent={formData.selectContent}
      learningPath={formData.learningPath}

    />,
  ];
  // Page Return Layout
  const [onBoardingForm, setOnBoardingForm] = useState<OnboardStepsType[]>([
    {
      number: 1,
      label: "Personal\nDetails",
      component: "OnBoardingPersonalDetail",
      status: true,
    },
    {
      number: 2,
      label: "Select\nContent",
      component: "OnBoardingSelectContent",
      status: false,
    },
    {
      number: 3,
      label: "Learning\nPath",
      component: "OnBoardingLearningPath",
      status: false,
    },
    {
      number: 4,
      label: "Show\nProgress",
      component: "OnBoardingShowProgress",
      status: false,
    },
  ]);

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

  // Return Div
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
              {onBoardingForm.map((step, i) => {
                const isLast = i === onBoardingForm.length - 1;
                return (
                  <div key={step.number} className="flex items-start flex-1">
                    <div className="flex flex-col items-center gap-1">
                      <div
                        className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-semibold
                      ${step.component === components[currentStep].type.name ? "bg-slate-700 text-white" : "bg-slate-400/60 text-slate-500"}`}
                      >
                        {step.number}
                      </div>
                      <span className="text-[10px] text-center text-slate-600  leading-tight whitespace-pre-line">
                        {step.label}
                      </span>
                    </div>

                    {/* Connector line */}
                    {!isLast && (
                      <div className="flex-1 mt-3.5 mx-1">
                        <div
                          className={`h-px border-t border-dashed ${onBoardingForm.length < 4 ? "border-slate-400" : "border-slate-300/70"}`}
                        />
                      </div>
                    )}
                  </div>
                );
              })}
            </div>

            {components[currentStep]}

            <div className="flex items-center justify-end gap-4 mt-8">
              <button
                onClick={handleBack}
                disabled={currentStep === 0}
                className="bg-slate-700 hover:bg-slate-800 disabled:opacity-50 text-white text-sm font-medium px-6 py-2.5 rounded-lg transition-colors"
              >
                Back
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
